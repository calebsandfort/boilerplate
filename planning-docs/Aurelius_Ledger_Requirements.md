# High-Level Requirements Document: Aurelius Ledger

## Project Overview

The Aurelius Ledger is a lightweight web application for logging futures trades during live trading sessions. The core workflow is frictionless: the trader types a natural-language description of a completed trade, and an AI agent extracts structured data from it — including direction, outcome, P&L, setup, and behavioral scores — then persists that data to the database. The dashboard surfaces the current day's trade data as time-series charts and auto-generated AI insights, giving the trader a real-time view of their session performance and behavior patterns without interrupting their workflow.

---

## Core Functionality

### Trade Entry

- A persistent text input at the bottom of the dashboard accepts free-form natural language descriptions of completed trades
- Submission triggers the AI extraction agent; the input clears on successful submission
- No required format or structure — the trader writes however feels natural
- The system auto-populates the timestamp at the moment of submission

### AI Trade Extraction

- On submission, an AI agent parses the trade description and extracts the following fields:

| Field | Type | Notes |
|---|---|---|
| `direction` | `long` \| `short` | Required |
| `outcome` | `win` \| `loss` \| `breakeven` | Inferred from P&L sign or explicit language |
| `pnl` | Decimal | Dollar value; positive = win, negative = loss |
| `timestamp` | Timestamp | Auto-populated at submission time |
| `setup_description` | String | Natural language summary of the setup |
| `discipline_score` | `-1` \| `0` \| `1` | `1` = disciplined execution, `-1` = undisciplined, `0` = ambiguous or not inferable |
| `agency_score` | `-1` \| `0` \| `1` | `1` = intentional action, `-1` = reactive/uncontrolled, `0` = ambiguous or not inferable |

- **Discipline score inference:** Language indicating patience and intentional execution (e.g., "waited for," "held for confirmation") maps to `1`. Language indicating reactive or impulsive execution (e.g., "chased," "fomo'd in") maps to `-1`. Score defaults to `0` when signals are absent or ambiguous.
- **Agency score inference:** Acting with discipline is treated as a strong positive signal for agency. Explicit statements of acting against one's own judgment (e.g., "revenge trade," "knew it was a bad entry but...") map to `-1`. Score defaults to `0` when not determinable.
- Extracted data is returned as structured JSON and written to the `trades` table
- If extraction fails or required fields cannot be inferred, the system surfaces an error and does not write a partial record

[SME:AIWorkflow] What's the optimal prompt structure for reliable extraction across varied natural language inputs? Should few-shot examples be included in the system prompt, and if so, how many? How should the agent handle ambiguous P&L (e.g., "small winner" with no dollar amount)?

[SME:AIWorkflow] Should extraction run as a single structured-output LLM call, or as a LangGraph node with a validation step that retries on schema mismatch?

### Data Model

**`trades` table**

Stores one record per completed trade with all extracted fields plus a foreign key to the trading day.

**`trading_days` table**

Created automatically when the first trade of a calendar day is logged. Maintains running aggregates updated after each trade insertion:

- Total P&L
- Win count, loss count
- Running sum of discipline scores
- Running sum of agency scores

No manual session management is required.

### Dashboard

The dashboard displays current-day data only and updates in real time after each trade is logged. It consists of four components:

**P&L Time Series Chart**
Cumulative P&L plotted over the course of the session, with one data point per trade. Shows running total, not individual trade P&L.

**Discipline Score Chart**
Running sum of discipline scores over the session, plotted per trade. Positive trend indicates a disciplined session; negative trend indicates a pattern of impulsive execution.

**Agency Score Chart**
Running sum of agency scores over the session, plotted per trade. Mirrors the discipline chart in format.

**AI Insights Panel**
After each trade is logged, the system feeds the full session's trade data to a "Trading Expert" agent and regenerates a short insights summary. The panel displays the most recent analysis. Insights may include: behavioral patterns emerging across trades, consistency of setup execution, emotional state inferred from score trends, and any flags worth the trader's attention.

[SME:AIWorkflow] What context should be passed to the insights agent — raw trade records, aggregated session stats, or both? Should insights be streamed or returned as a complete block?

[SME:BehavioralCoach] What insight categories are most actionable for a trader mid-session? Suggestions to consider: setup consistency, discipline trend, risk of tilt based on score trajectory, patterns in winning vs. losing trade descriptions.

[SME:DataScientist] What would be an effective way to organize the dashboard to make it visually appealing, and ensure the trader can quickly assess their session state?
---

## Success Criteria

- Trade entry to confirmed database write completes in under 3 seconds under normal conditions
- Extraction accuracy is high enough that the trader rarely needs to manually correct a logged trade (subjectively validated)
- Discipline and agency scores feel fair and consistent to the trader — not over-penalizing ambiguous descriptions
- AI insights feel relevant and specific to the session, not generic
- The UI stays out of the way during live trading — minimal clicks, no required navigation

---

## Out of Scope for Phase 1

- Editing or deleting logged trades after submission
- Multi-day historical views, trend analysis across sessions, or calendar views
- Manual session start/end controls
- Trade tagging or session notes
- Broker API integration or actual trade data import
- P&L correlation with mental state data
- Mobile app or responsive mobile layout
- Export functionality
- User authentication and multi-user support

---

## Technical Constraints

- Trade entry to dashboard update must complete in under 3 seconds end-to-end
- The AI extraction agent must return a valid, schema-conformant JSON response or surface a recoverable error — no silent partial writes
- The dashboard must reflect the newly logged trade without requiring a page refresh

---

## Assumptions

- The trader enters one trade at a time after it closes — not mid-trade or speculatively
- P&L is always expressed in dollar terms in the trade description; the system does not handle points, ticks, or percentage-based P&L without a dollar equivalent
- The trader is the sole user; no authentication or multi-user data isolation is required in Phase 1
- A "trading day" maps to a calendar day in the user's local timezone
- The trader's natural language descriptions will contain enough signal for reliable extraction on the majority of entries; edge cases are acceptable with a graceful fallback to `0` scores
