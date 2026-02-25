<!--
Downloaded via https://llm.codes by @steipete on February 23, 2026 at 11:44 AM
Source URL: https://workmux.raine.dev/guide/
Total pages processed: 24
URLs filtered: Yes
Content de-duplicated: Yes
Availability strings filtered: Yes
Code blocks only: No
-->

# https://workmux.raine.dev/guide/

Skip to content

On this page

Copy page

# What is workmux? ​

workmux is a giga opinionated zero-friction workflow tool for managing git worktrees and tmux windows as isolated development environments. Also supports kitty and WezTerm (experimental). Perfect for running multiple AI agents in parallel without conflict.

**Philosophy:** Do one thing well, then compose. Your terminal handles windowing and layout, git handles branches and worktrees, your agent executes, and workmux ties it all together.

New to workmux?

Read the introduction blog post for a quick overview.

## Why workmux? ​

**Parallel workflows.** Work on multiple features or hotfixes at the same time, each with its own AI agent. No stashing, no branch switching, no conflicts.

**One window per task.** A natural mental model. Each has its own terminal state, editor session, dev server, and AI agent. Context switching is switching tabs.

**Automated setup.** New worktrees start broken (no `.env`, no `node_modules`, no dev server). workmux can copy config files, symlink dependencies, and run install commands on creation. Configure once, reuse everywhere.

**One-command cleanup.**`workmux merge` handles the full lifecycle: merge the branch, delete the worktree, close the tmux window, remove the local branch. Or go next level and use the `/merge` skill to let your agent commit, rebase, and merge autonomously.

**Terminal workflow.** Build on your familiar terminal setup instead of yet another agentic GUI that won't exist next year. If you don't have one yet, tmux is worth picking up. Also supports Kitty and WezTerm.

Terminal

## Features ​

- Create git worktrees with matching tmux windows (or kitty/WezTerm tabs) in a single command (`add`)
- Merge branches and clean up everything (worktree, tmux window, branches) in one command (`merge`)
- Dashboard for monitoring agents, reviewing changes, and sending commands
- Delegate tasks to worktree agents with a `/worktree` skill
- Display Claude agent status in tmux window names
- Automatically set up your preferred tmux pane layout (editor, shell, watchers, etc.)
- Run post-creation hooks (install dependencies, setup database, etc.)
- Copy or symlink configuration files (`.env`, `node_modules`) into new worktrees
- Sandbox agents in containers or VMs for enhanced security
- Automatic branch name generation from prompts using LLM
- Shell completions

## Before and after ​

workmux turns a multi-step manual workflow into simple commands, making parallel development workflows practical.

### Without workmux ​

bash

# 1. Manually create the worktree and environment
git worktree add ../worktrees/user-auth -b user-auth
cd ../worktrees/user-auth
cp ../../project/.env.example .env
ln -s ../../project/node_modules .
npm install
# ... and other setup steps

# 2. Manually create and configure the tmux window
tmux new-window -n user-auth
tmux split-window -h 'npm run dev'
tmux send-keys -t 0 'claude' C-m
# ... repeat for every pane in your desired layout

# 3. When done, manually merge and clean everything up
cd ../../project
git switch main && git pull
git merge --no-ff user-auth
tmux kill-window -t user-auth
git worktree remove ../worktrees/user-auth
git branch -d user-auth

### With workmux ​

# Create the environment
workmux add user-auth

# ... work on the feature ...

# Merge and clean up
workmux merge

## Why git worktrees? ​

Git worktrees let you have multiple branches checked out at once in the same repository, each in a separate directory. This provides two main advantages over a standard single-directory setup:

- **Painless context switching**: Switch between tasks just by changing directories (`cd ../other-branch`). There's no need to `git stash` or make temporary commits. Your work-in-progress, editor state, and command history remain isolated and intact for each branch.

- **True parallel development**: Work on multiple branches simultaneously without interference. You can run builds, install dependencies (`npm install`), or run tests in one worktree while actively coding in another. This isolation is perfect for running multiple AI agents in parallel on different tasks.

In a standard Git setup, switching branches disrupts your flow by requiring a clean working tree. Worktrees remove this friction. `workmux` automates the entire process and pairs each worktree with a dedicated tmux window, creating fully isolated development environments.

## Requirements ​

- Git 2.5+ (for worktree support)
- tmux (or WezTerm or kitty)

## Inspiration and related tools ​

workmux is inspired by wtp, an excellent git worktree management tool. While wtp streamlines worktree creation and setup, workmux takes this further by tightly coupling worktrees with tmux window management.

For managing multiple AI agents in parallel, tools like claude-squad and vibe-kanban offer dedicated interfaces, like a TUI or kanban board. In contrast, workmux adheres to its philosophy that **tmux is the interface**, providing a native tmux experience for managing parallel workflows without requiring a separate interface to learn.

## Related projects ​

- tmux-tools — Collection of tmux utilities including file picker, smart sessions, and more
- tmux-file-picker — Pop up fzf in tmux to quickly insert file paths, perfect for AI coding assistants
- tmux-bro — Smart tmux session manager that sets up project-specific sessions automatically
- claude-history — Search and view Claude Code conversation history with fzf
- consult-llm-mcp — MCP server that lets Claude Code consult stronger AI models (o3, Gemini, GPT-5.1 Codex)

---

# https://workmux.raine.dev/guide/installation

Skip to content

On this page

Copy page

# Installation ​

## Bash YOLO ​

bash

curl -fsSL | bash

## Homebrew (macOS/Linux) ​

brew install raine/workmux/workmux

## Cargo ​

Requires Rust. Install via rustup if you don't have it.

cargo install workmux

## Nix ​

Requires Nix with flakes enabled.

nix profile install github:raine/workmux

Or try without installing:

nix run github:raine/workmux -- --help

See Nix guide for flake integration and home-manager setup.

* * *

For manual installation, see pre-built binaries.

## Shell alias (recommended) ​

For faster typing, alias `workmux` to `wm`:

alias wm='workmux'

Add this to your `.bashrc`, `.zshrc`, or equivalent shell configuration file.

## Shell completions ​

To enable tab completions for commands and branch names, add the following to your shell's configuration file.

BashZshFish

# Add to ~/.bashrc
eval "$(workmux completions bash)"

# Add to ~/.zshrc
eval "$(workmux completions zsh)"

# Add to ~/.config/fish/config.fish
workmux completions fish | source

---

# https://workmux.raine.dev/guide/sandbox/features

Skip to content

On this page

Copy page

# Shared features ​

These features work with both the container and Lima sandbox backends.

## Extra mounts ​

The `extra_mounts` option lets you mount additional host directories into the sandbox. Mounts are read-only by default for security.

`extra_mounts` is a **global-only** setting. If set in a project's `.workmux.yaml`, it is ignored and a warning is logged. This prevents a malicious repository from mounting arbitrary host paths into the sandbox.

Each entry can be a simple path string (read-only, mirrored into the guest at the same path) or a detailed spec with `host_path`, optional `guest_path`, and optional `writable` flag.

yaml

# ~/.config/workmux/config.yaml
sandbox:
extra_mounts:
# Simple: read-only, same path in guest
- ~/Screenshots

# Detailed: writable with custom guest path
- host_path: ~/shared-data
guest_path: /mnt/shared
writable: true

Paths starting with `~` are expanded to the user's home directory. When `guest_path` is omitted, the expanded host path is used as the guest mount point.

**Note:** For the Lima backend, mount changes only take effect when the VM is created. To apply changes to an existing VM, recreate it with `workmux sandbox prune`.

## Host command proxying ​

The `host_commands` option lets agents inside the sandbox run specific commands on the host machine. It's useful for project toolchain commands (build tools, task runners, linters) that are available on the host but would be slow or complex to install inside the sandbox. Running builds on the host is also faster since both backends use virtualization on macOS, and filesystem I/O through mount sharing adds overhead for build-heavy workloads.

Evaluate your threat model

Host command proxying is primarily a convenience feature that exists so you don't have to install your entire build toolchain inside each container or VM. It should not necessarily be expected to provide airtight confinement.

Any allowed command can execute code from project files. For example, an agent could write a malicious `justfile` and run `just`. The filesystem sandbox blocks access to host secrets and restricts writes, but proxied commands still have network access and run on the host. If your threat model requires strict isolation with no host execution, don't enable `host_commands`.

sandbox:
host_commands: ["just", "cargo", "npm"]

`host_commands` is only read from your global config. If set in a project's `.workmux.yaml`, it is ignored and a warning is logged. This ensures that only you control which commands get host access, not the projects you clone.

When configured, workmux creates shim scripts inside the sandbox that transparently forward these commands to the host via RPC. The host runs them in the project's toolchain environment (Devbox/Nix if available), streams stdout/stderr

Host-exec applies several layers of defense to limit what a compromised agent inside the sandbox can do:

- **Allowed commands**: Only commands explicitly listed in `host_commands` (or built-in) can be executed. This is enforced on the host side.
- **Strict command names**: Command names must match `^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$`. No path separators, shell metacharacters, or special names (`.`, `..`) are accepted.
- **No shell injection**: When toolchain wrapping is active (devbox/nix), command arguments are passed as positional parameters to bash (`"$@"`), never interpolated into a shell string. Without toolchain wrapping, commands are executed directly via the OS with no shell involved.
- **Environment isolation**: Child processes run with a sanitized environment. Only essential variables (`PATH`, `HOME`, `TERM`, etc.) are passed through. Host secrets like API keys are not inherited. `PATH` is normalized to absolute entries only to prevent relative-path hijacking.
- **Filesystem sandbox**: On macOS, child processes run under `sandbox-exec` (Seatbelt), which denies access to sensitive directories (including `~/.ssh`, `~/.aws`, `~/.gnupg`, `~/.kube`, `~/.docker`, `~/.claude`, `~/.config/gh`, `~/.password-store`, keychains, browser data) and credential files (including `~/.gitconfig`, `~/.vault-token`, shell histories), and denies writes to `$HOME` except toolchain caches (`.cache`, `.cargo`, `.rustup`, `.npm`). On Linux, `bwrap` (Bubblewrap) provides similar isolation with a read-only root filesystem, tmpfs over secret directories, and a writable worktree bind mount. If `bwrap` is not installed on Linux, host-exec commands are refused (fail closed).
- **Global-only config**: `host_commands` is only read from global config (`~/.config/workmux/config.yaml`). Project-level `.workmux.yaml` cannot set it. A warning is logged if it tries.
- **Global-only RPC host**: `rpc_host` is only read from global config. A malicious project config cannot redirect RPC traffic to attacker infrastructure.
- **Worktree-locked**: All commands execute with the project worktree as the working directory.

**Known limitations**:

- Allowlisted commands that read project files (build tools like `just`, `cargo`, `make`) effectively act as code interpreters. A compromised agent can write a malicious `justfile` and then invoke `just`. The filesystem sandbox mitigates this by blocking access to host secrets and restricting writes, but the child process still has network access (required for package managers).
- `sandbox-exec` is deprecated on macOS but remains functional. Apple has not announced a replacement for CLI tools.
- On Linux, `bwrap` must be installed separately (`apt install bubblewrap`). Without it, host-exec commands are refused.
- Setting `sandbox.dangerously_allow_unsandboxed_host_exec: true` in your global config skips the filesystem sandbox entirely on both macOS and Linux. Only environment sanitization is applied. This is a global-only setting; project config cannot enable it.

## Sound notifications ​

Claude Code hooks often use `afplay` to play notification sounds (e.g., when an agent finishes). Since `afplay` is a macOS-only binary, it doesn't exist inside the Linux guest. workmux includes `afplay` as a built-in host-exec shim that forwards sound play

The sandbox does not mount your `~/.gitconfig` because it may contain credential helpers, shell aliases, or other sensitive configuration. Instead, workmux automatically extracts your `user.name` and `user.email` from the host's git config and injects them into the sandbox via environment variables (`GIT_CONFIG_COUNT`/`GIT_CONFIG_KEY_*`/`GIT_CONFIG_VALUE_*`).

This means git commits inside the sandbox use your identity without exposing the rest of your git config. The extraction respects all git config scopes (system, global, conditional includes) by running from the worktree directory, so directory-specific identities work correctly.

No configuration is needed. If the host has no `user.name` or `user.email` configured, the injection is silently skipped.

## Credentials ​

Both sandbox backends mount agent-specific credential directories from the host. The mounted directory depends on the configured `agent`:

| Agent | Host directory | Container mount | Lima mount |
| --- | --- | --- | --- |
| `claude` | `~/.claude/` | `/tmp/.claude/` | `$HOME/.claude/` |
| `gemini` | `~/.gemini/` | `/tmp/.gemini/` | `$HOME/.gemini/` |
| `codex` | `~/.codex/` | `/tmp/.codex/` | `$HOME/.codex/` |
| `opencode` | `~/.local/share/opencode/` | `/tmp/.local/share/opencode/` | `$HOME/.local/share/opencode/` |

Key behaviors:

- Gemini, Codex, and OpenCode store credentials in files. If you've authenticated on the host, the sandbox automatically has access.
- Claude stores auth in macOS Keychain, which isn't accessible from containers or Linux VMs. You need to authenticate Claude separately inside the sandbox.
- Authentication done inside the sandbox writes

By default, each agent's standard config directory is mounted into the sandbox (see table above). To use a separate directory, keeping sandbox config isolated from the host:

sandbox:
agent_config_dir: ~/sandbox-config/{agent}

The `{agent}` placeholder is replaced with the active agent name (e.g. `claude`, `gemini`). The directory is auto-created if it doesn't exist.

This is useful when you want different MCP servers, project configs, or settings for sandboxed sessions without affecting your host configuration. `agent_config_dir` is a **global-only** setting.

## Coordinator agents ​

What is a coordinator agent?

A coordinator agent sits on the main branch, plans work, and delegates tasks to worktree agents via `/worktree`. See Workflows for more on this pattern.

Coordinator agents can run inside a sandbox using `workmux sandbox agent`. When the coordinator calls `workmux add` from inside the sandbox, the command is automatically routed through RPC to the host, where sub-agents are created normally (and sandboxed if the project config enables it).

Alternatively, coordinators can run on the host (unsandboxed) and only sandbox leaf agents.

## RPC protocol ​

The supervisor and guest communicate via JSON-lines over TCP. Each request is a single JSON object on one line.

**Supported requests:**

- `SetStatus` \- updates the tmux pane status icon (working/waiting/done/clear)
- `SetTitle` \- renames the tmux window
- `Heartbeat` \- health check, returns Ok
- `SpawnAgent` \- runs `workmux add` on the host to create a new worktree and pane
- `Exec` \- runs a command on the host and streams stdout/stderr back (used by host-exec shims, including built-in `afplay`)
- `Merge` \- runs `workmux merge` on the host with all flags forwarded

Requests are authenticated with a per-session token passed via the `WM_RPC_TOKEN` environment variable.

## Troubleshooting ​

### Agent can't find credentials ​

Claude stores auth in macOS Keychain, so it must authenticate separately inside containers and VMs. Other agents (Gemini, Codex, OpenCode) use file-based credentials that are shared with the host automatically.

If credentials are missing, start a shell in the sandbox with `workmux sandbox shell` and run the agent to trigger authentication. Credentials written inside the sandbox persist to the host.

## Installing local builds ​

During development, the macOS host binary cannot run inside Linux containers or VMs. Use `install-dev` to cross-compile and install your local workmux build:

bash

# First time: install prerequisites
rustup target add aarch64-unknown-linux-gnu
brew install messense/macos-cross-toolchains/aarch64-unknown-linux-gnu

# Cross-compile and install into containers and running VMs
workmux sandbox install-dev

# After code changes, rebuild and reinstall

# Use --release for optimized builds
workmux sandbox install-dev --release

# Skip rebuild if binary hasn't changed
workmux sandbox install-dev --skip-build

---

# https://workmux.raine.dev/guide/workflows

Skip to content

On this page

Copy page

# Workflows ​

Common patterns for working with workmux and AI agents.

## Starting work ​

### From the terminal ​

When starting a new task from scratch, use `workmux add -A` (`--auto-name`):

bash

workmux add -A

This opens your `$EDITOR` where you describe the task. After saving, workmux generates a branch name from your prompt and creates the worktree with the prompt passed to the agent.

TIP

The `-A` flag requires the `llm` CLI tool to be installed and configured. See Automatic branch name generation for setup.

Combine with `-b` (`--background`) to launch the worktree without switching to it.

You can also pass the prompt inline or from a file:

# Inline prompt
workmux add -A -p "Add pagination to the /users endpoint"

# From a file
workmux add -A -P task-spec.md

### From an ongoing agent session ​

When you're already working with an agent and want to spin off a task into a separate worktree, use the `/worktree` skill. The agent has context on what you've discussed, so it can write a detailed prompt for the new worktree agent.

The main agent writes a prompt file with all the relevant context and runs `workmux add` to create the worktree. This is useful when:

- The agent already understands the task from your conversation
- You want to parallelize work while continuing in the main window
- You're delegating multiple related tasks from a plan

This pattern naturally leads to a **coordinator agent** workflow: an agent on the main branch that plans work and delegates tasks to worktree agents via `/worktree`. The coordinator stays on main and doesn't write code itself; it breaks down a larger goal into parallel tasks and spins up worktree agents to handle each one.

See Skills for the skill setup.

### Coordinating multiple agents ​

For multi-step plans where you want the agent to manage the full lifecycle (spawning, monitoring, and merging), use the `/coordinator` skill.

1. Extract session logic into its own module
2. Add OAuth provider support
3. Write integration tests for the new auth flow

The coordinator agent writes prompt files for each task, spawns worktree agents in the background, waits for them to finish, reviews their output, and merges results sequentially. You stay hands-off while it runs.

This is useful when:

- You have a plan with multiple independent tasks
- Tasks should be merged in a specific order
- You want the agent to send follow-up instructions based on results
- You want full automation without checking in on each agent manually

See Skills for more details on the coordinator pattern.

## Finishing work ​

How you finish depends on whether you merge locally or use pull requests.

### Direct merge ​

When you want to merge directly without a pull request, use `/merge` to commit, rebase, and merge in one step:

This slash command handles the full workflow: committing staged changes, rebasing onto main, resolving conflicts if needed, and running `workmux merge` to clean up.

If you need to sync with main before you're ready to merge (e.g., to pick up changes from other merged branches), use `/rebase`:

### PR-based ​

If your team uses pull requests for code review, the merge happens on the remote after review. Push your branch and clean up after the PR is merged.

After committing your changes, push and create a PR. If you're working with an agent, consider using a slash command like `/open-pr` that can write the PR description using the conversation context:

See `skills/open-pr` for an example skill you can adapt.

Or manually:

git push -u origin feature-123
gh pr create

Once your PR is merged on GitHub, use `workmux remove` to clean up:

# Remove a specific worktree
workmux remove feature-123

# Or clean up all worktrees whose remote branches were deleted
workmux rm --gone

The `--gone` flag is particularly useful - it automatically finds worktrees whose upstream branches no longer exist (because the PR was merged and the branch was deleted on GitHub) and removes them.

---

# https://workmux.raine.dev/guide/skills

Skip to content

On this page

Copy page

# Skills ​

Claude Code skills extend what Claude can do. Create a `SKILL.md` file with instructions, and Claude adds it to its toolkit. Claude uses skills when relevant, or you can invoke one directly with `/skill-name`.

TIP

This documentation uses Claude Code's skill support as example, but other agents implement similar features. For example, OpenCode skills. Adapt to your favorite agent as needed.

## Using with workmux ​

Skills unlock the full potential of workmux. While you can run workmux commands directly, skills let agents handle the complete workflow - committing with context-aware messages, resolving conflicts intelligently, and delegating tasks to parallel worktrees.

- **`/merge`** \- Commit, rebase, and merge the current branch
- **`/rebase`** \- Rebase with flexible target and smart conflict resolution
- **`/worktree`** \- Delegate tasks to parallel worktree agents
- **`/coordinator`** \- Orchestrate multiple agents with full lifecycle control
- **`/open-pr`** \- Write a PR description using conversation context

You can trigger `/merge` from the dashboard using the `m` keybinding:

yaml

dashboard:
merge: "/merge"

## Installation ​

Copy the skills you want from `skills/` to your skills directory:

**Claude Code**: `~/.claude/skills/` (or project `.claude/skills/`)

## `/merge` ​

Handles the complete merge workflow:

1. Commit staged changes using a specific commit style
2. Rebase onto the base branch with smart conflict resolution
3. Run `workmux merge` to merge, clean up, and send a notification when complete

**View skill →**

Instead of just running `workmux merge`, this skill:

- Commits staged changes first - the agent has full context on the work done and can write a meaningful commit message
- Reviews base branch changes before resolving conflicts - the agent understands both sides and can merge intelligently
- Asks for guidance on complex conflicts

## `/rebase` ​

Rebases with flexible target selection and smart conflict resolution.

Usage: `/rebase`, `/rebase origin`, `/rebase origin/develop`, `/rebase feature-branch`

See Resolve merge conflicts with Claude Code for more on this approach.

## `/worktree` ​

Delegates tasks to parallel worktree agents. A main agent on the main branch can act as a coordinator: planning work and delegating tasks to worktree agents.

See the blog post on delegating tasks for a detailed walkthrough.

Usage:

bash

### Customization ​

You can customize the skill to add additional instructions for worktree agents. For example, to have agents review their changes with a subagent before finishing, or run `workmux merge` after completing their task.

## `/coordinator` ​

Orchestrates the full lifecycle of multiple worktree agents: spawning, monitoring, communicating, and merging. Unlike `/worktree` which dispatches tasks and returns, `/coordinator` turns the agent into a persistent orchestrator that manages agents through completion.

The coordinator agent does not implement tasks itself. It writes prompt files, spawns worktree agents, monitors their status, sends follow-up instructions, and triggers merges.

### Key commands used ​

| Command | Purpose |
| --- | --- |

| `workmux status` | Check agent statuses |
| `workmux wait` | Block until agents reach a target status |
| `workmux capture` | Read terminal output from an agent |
| `workmux send` | Send instructions or skill commands to an agent |
| `workmux run` | Run shell commands in an agent's worktree |

### Fan-out / fan-in pattern ​

The typical coordinator workflow:

1. Write prompt files with full context for each task
2. Spawn all agents in the background
3. Confirm agents started with `workmux wait --status working`
4. Wait for completion with `workmux wait`
5. Review results with `workmux capture`
6. Merge one at a time by sending `/merge` to each agent sequentially

### When to use `/coordinator` vs `/worktree` ​

- **`/worktree`**: fire and forget. Spawn agents and return control to you. Good for delegating tasks you will review later yourself.
- **`/coordinator`**: full automation. The agent manages the entire lifecycle, including waiting, reviewing output, sending follow-ups, and merging. Good for multi-step plans where tasks depend on each other.

## `/open-pr` ​

Writes a PR description using the conversation context and opens the PR creation page in browser. This is the recommended way to finish work in repos that use pull requests.

The skill is opinionated: it opens the PR creation page in your browser rather than creating the PR directly. This lets you review and edit the description before submitting.

The agent knows what it built and why, so it can write a PR description that captures that context.

---

# https://workmux.raine.dev/guide/dashboard/

Skip to content

On this page

Copy page

# Dashboard ​

When running agents in multiple worktrees across many projects, it's helpful to have a centralized view of what each agent is doing. The dashboard provides a TUI for monitoring agents, reviewing their changes, staging hunks, and sending commands.

Optional feature

The dashboard is entirely optional. It becomes especially useful when running multiple agents across several projects, but workmux's core workflow works great on its own.

## Setup ​

Prerequisites

The dashboard requires status tracking hooks to be configured. Without them, no agents will appear.

Add this binding to your `~/.tmux.conf`:

bash

bind C-s display-popup -h 30 -w 100 -E "workmux dashboard"

Then press `prefix + Ctrl-s` to open the dashboard as a tmux popup. Feel free to adjust the keybinding and popup dimensions (`-h` and `-w`) as needed.

Quick access

Consider binding the dashboard to a key you can press without the tmux prefix, such as `Cmd+E` or `Ctrl+E` in your terminal emulator. This makes it easy to check on your agents at any time.

See command reference for CLI options.

## Keybindings ​

| Key | Action |
| --- | --- |
| `1`-`9` | Quick jump to agent (closes dashboard) |
| `Tab` | Toggle between current and last agent |
| `d` | View diff (opens WIP view) |
| `p` | Peek at agent (dashboard stays open) |
| `s` | Cycle sort mode |
| `f` | Toggle stale filter (show/hide stale) |
| `i` | Enter input mode (type to agent) |
| `Ctrl+u` | Scroll preview up |
| `Ctrl+d` | Scroll preview down |
| `+`/`-` | Resize preview pane |
| `Enter` | Go to selected agent (closes dashboard) |
| `j`/`k` | Navigate up/down |
| `q`/`Esc` | Quit |
| `Ctrl+c` | Quit (works from any view) |

## Columns ​

- **#**: Quick jump key (1-9)
- **Project**: Project name (from `__worktrees` path or directory name)
- **Agent**: Worktree/window name
- **Git**: Diff stats showing branch changes (dim) and uncommitted changes (bright)
- **Status**: Agent status icon (🤖 working, 💬 waiting, ✅ done, or "stale")
- **Time**: Time since last status change
- **Title**: Claude Code session title (auto-generated summary)

## Live preview ​

The bottom half of the dashboard shows a live preview of the selected agent's terminal output. The preview auto-scrolls to show the latest output, but you can scroll through history with `Ctrl+u`/`Ctrl+d`.

## Input mode ​

Press `i` to enter input mode, which forwards your keystrokes directly to the selected agent's pane. This lets you respond to agent prompts without leaving the dashboard. Press `Esc` to exit input mode and

Press `s` to cycle through sort modes:

- **Project**: Group by project name, then by priority within each project
- **Recency**: Most recently updated first
- **Natural**: Original tmux order (by pane creation)

Your sort preference persists in the tmux session.

## Stale filter ​

Press `f` to toggle between showing all agents or hiding stale ones. The filter state persists across dashboard sessions within the same tmux server.

---

# https://workmux.raine.dev/guide/dashboard/configuration

Skip to content

On this page

Copy page

# Configuration ​

The dashboard can be customized in your `.workmux.yaml`:

yaml

dashboard:
commit: "Commit staged changes with a descriptive message"
merge: "!workmux merge"
preview_size: 60

The `commit` and `merge` values are text sent to the agent's pane. Use the `!` prefix to run shell commands (supported by Claude, Gemini, and other agents).

## Defaults ​

| Option | Default value | Description |
| --- | --- | --- |
| `commit` | `Commit staged changes with a descriptive message` | Natural language prompt |
| `merge` | `!workmux merge` | Shell command via agent |
| `preview_size` | `60` | Preview pane height as percentage (10-90) |

## Preview size ​

The `preview_size` option controls the height of the preview pane as a percentage of the terminal height. A higher value means more space for the preview and less for the table.

You can also adjust the preview size interactively with `+`/`-` keys. These adjustments persist across dashboard sessions via tmux variables.

The CLI flag `--preview-size` (`-P`) overrides both the config and saved preference for that session.

## Examples ​

# Use Claude skill for merge (see skills guide)
dashboard:
merge: "/merge"

# Custom shell commands
dashboard:
merge: "!workmux merge --rebase --notification"

# Natural language prompts
dashboard:
commit: "Create a commit with a conventional commit message"
merge: "Rebase onto main and run workmux merge"

## Using skills ​

For complex workflows, skills are more powerful than simple prompts or shell commands. A skill can encode detailed, multi-step instructions that the agent follows intelligently.

See the skills guide for the `/merge` skill you can copy.

---

# https://workmux.raine.dev/guide/quick-start

Skip to content

On this page

Copy page

# Quick start ​

Prerequisites

workmux requires a terminal multiplexer. Make sure you have tmux (or WezTerm / Kitty) installed and running before you start. See My tmux setup if you need a starting point.

## 1\. Install ​

bash

curl -fsSL | bash

See Installation for other methods (Homebrew, Cargo, Nix).

## 2\. Initialize configuration (optional) ​

workmux init

This creates a `.workmux.yaml` file to customize your workflow (pane layouts, setup commands, file operations, etc.). workmux works out of the box with sensible defaults, so this step is optional.

## 3\. Create a new worktree and tmux window ​

workmux add new-feature

This will:

- Copy config files and symlink dependencies (if configured)
- Run any `post_create` setup commands
- Create a tmux window named `wm-new-feature` (the prefix is configurable)
- Set up your configured or the default tmux pane layout
- Automatically switch your tmux client to the new window

## 4\. Do your thing ​

Work on your feature, fix a bug, or let an AI agent handle it.

## 5\. Finish and clean up ​

**Local merge:** Run `workmux merge` to merge into the base branch and clean up in one step.

**PR workflow:** Use `/open-pr` to push and open a PR. After it's merged, run `workmux remove` to clean up.

See Workflows for more patterns including delegating tasks from agent sessions.

## Directory structure ​

Here's how workmux organizes your worktrees by default:

~/projects/
├── my-project/ <-- Main project directory
│ ├── src/
│ ├── package.json
│ └── .workmux.yaml
│
└── my-project__worktrees/ <-- Worktrees created by workmux
├── feature-A/ <-- Isolated workspace for 'feature-A' branch
│ ├── src/
│ └── package.json
│
└── bugfix-B/ <-- Isolated workspace for 'bugfix-B' branch
├── src/
└── package.json

Each worktree is a separate working directory for a different branch, all sharing the same git repository. This allows you to work on multiple branches simultaneously without conflicts.

You can customize the worktree directory location using the `worktree_dir` configuration option (see Configuration).

## Workflow example ​

Here's a complete workflow:

# Start a new feature
workmux add user-auth

# Work on your feature...
# (workmux automatically sets up your configured panes and environment)

# When ready, merge and clean up
workmux merge user-auth

# Start another feature
workmux add api-endpoint

# List all active worktrees
workmux list

## The parallel AI workflow ​

Run multiple AI agents simultaneously, each in its own worktree. No conflicts, no branch switching, no stashing.

# Spin up two agents working on different tasks
workmux add refactor-user-model -p "Refactor the User model to use composition"
workmux add add-search-endpoint -p "Add a /search endpoint with pagination"

# Each agent works in isolation. Check progress via tmux windows or the dashboard
workmux dashboard

# Merge completed work from your prompt, so you don't have to think of one.

See AI Agents for details on prompts, multi-agent generation, and agent status tracking.

---

# https://workmux.raine.dev/guide/monorepos

Skip to content

On this page

Copy page

# Monorepos ​

Tips for using workmux with monorepos containing multiple services.

## Nested configuration ​

Place a `.workmux.yaml` in any subdirectory to configure that project independently. When you run workmux from a subdirectory, it walks upward to find the nearest config:

monorepo/
├── .workmux.yaml # Root config (used from monorepo/)
├── backend/
│ ├── .workmux.yaml # Backend config (used from backend/)
│ └── src/
└── frontend/
├── .workmux.yaml # Frontend config (used from frontend/)
└── src/

bash

cd monorepo/backend
workmux add api-feature # Uses backend/.workmux.yaml

When using a nested config:

- **Working directory**: The tmux window opens in the subdirectory (e.g., `backend/`) within the new worktree, not the worktree root
- **File operations**: `files.copy` and `files.symlink` paths are relative to the config directory
- **Hooks**: Run with the subdirectory as the working directory

### Example nested config ​

yaml

# backend/.workmux.yaml
agent: claude

files:
copy:
- .env # Copies backend/.env to worktree's backend/.env

post_create:
- cargo build # Runs in worktree's backend/ directory

### Environment variables ​

Hooks receive `WM_CONFIG_DIR` pointing to the config directory in the new worktree:

post_create:
- echo "Config dir: $WM_CONFIG_DIR" # /path/to/worktree/backend
- echo "Worktree root: $WM_WORKTREE_PATH" # /path/to/worktree

## Port isolation ​

When running multiple services (API, web app, database) in a monorepo, each worktree needs unique ports to avoid conflicts. For example, if your `.env` has hardcoded ports like `API_PORT=3001` and `VITE_PORT=3000`, running two worktrees simultaneously would fail because both would try to bind to the same ports.

One strategy is to generate a `.env.local` file with unique ports for each worktree. Many frameworks (Vite, Next.js, CRA) automatically load `.env.local` and merge it with `.env`, with `.env.local` taking precedence.

### Example ​

Create a script at `scripts/worktree-env`:

#!/usr/bin/env bash
set -euo pipefail

port_in_use() {

}

find_port() {
local port=$1
while port_in_use "$port"; do
((port++))
done
echo "$port"
}

# Hash the handle to get a deterministic port offset (0-99)
hash=$(echo -n "$WM_HANDLE" | md5 | cut -c1-4)
offset=$((16#$hash % 100))

# Find available ports starting from the hash-based offset
api_port=$(find_port $((3001 + offset * 10)))
vite_port=$(find_port $((3000 + offset * 10)))

# Generate .env.local with port overrides

API_PORT=$api_port
VITE_PORT=$vite_port
VITE_PUBLIC_API_URL=http://localhost:$api_port
EOF

echo "Created .env.local with ports: API=$api_port, VITE=$vite_port"

Configure workmux to copy `.env` and generate `.env.local`:

# .workmux.yaml
files:
copy:
- .env # Copy secrets (DATABASE_URL, API keys, etc.)

post_create:
- ./scripts/worktree-env # Generate .env.local with unique ports

### Plain Node.js ​

For Node.js without framework support, load both files with later overriding earlier:

json

{
"scripts": {
"api": "node --env-file=.env --env-file=.env.local api/server.js",
"web": "node --env-file=.env --env-file=.env.local web/server.js"
}
}

### Using direnv ​

You can also use direnv to load the generated `.env.local`:

# .envrc
dotenv
dotenv_if_exists .env.local

Use the same `worktree-env` script to generate `.env.local`. When you enter the directory, direnv automatically loads `.env` and `.env.local`, with the latter taking precedence.

files:
copy:
- .envrc
- .env

post_create:
- ./scripts/worktree-env

### How it works ​

The worktree handle is hashed to get a deterministic starting port, so `feature-auth` always starts at the same offset. If that port is taken, `lsof` finds the next available one.

$ workmux add feature-auth
Running setup commands...
Created .env.local with ports: API=3471, VITE=3470
✓ Setup complete
✓ Successfully created worktree and tmux window for 'feature-auth'

---

# https://workmux.raine.dev/guide/sandbox/container

Skip to content

On this page

Copy page

# Container backend ​

The container sandbox runs agents in isolated Docker or Podman containers, providing lightweight, ephemeral environments that reset after every session.

## Setup ​

### 1\. Install a container runtime ​

bash

# macOS
brew install --cask docker # Docker Desktop
# or
brew install --cask orbstack # OrbStack (Docker-compatible)
brew install podman # Podman

### 2\. Enable sandbox in config ​

Add to your global or project config:

yaml

# ~/.config/workmux/config.yaml or .workmux.yaml
sandbox:
enabled: true

The pre-built image (`ghcr.io/raine/workmux-sandbox:{agent}`) is pulled automatically on first run based on your configured agent. No manual build step is needed, but possible if required (see custom images).

To pull the latest image explicitly:

workmux sandbox pull

## Configuration ​

| Option | Default | Description |
| --- | --- | --- |
| `enabled` | `false` | Enable container sandboxing |
| `container.runtime` | auto-detect | Container runtime: `docker` or `podman`. Auto-detected from PATH when not set (prefers docker). |
| `target` | `agent` | Which panes to sandbox: `agent` or `all` |
| `image` | `ghcr.io/raine/workmux-sandbox:{agent}` | Container image name (auto-resolved from configured agent). **Global config only.** |
| `rpc_host` | auto | Override hostname for guest-to-host RPC. Defaults to `host.docker.internal` (Docker) or `host.containers.internal` (Podman). Useful for non-standard networking setups. **Global config only.** |
| `env_passthrough` | `[]` | Environment variables to pass through. **Global config only.** |
| `extra_mounts` | `[]` | Additional host paths to mount (see shared features). **Global config only.** |
| `agent_config_dir` | per-agent default | Custom host directory for agent config. Supports `{agent}` placeholder. Overrides default mounts (e.g. `~/.claude/`). Auto-created if missing. **Global config only.** |
| `network.policy` | `allow` | Network restriction policy: `allow` (no restrictions) or `deny` (block all except allowed domains). See network restrictions. **Global config only.** |
| `network.allowed_domains` | `[]` | Allowed outbound HTTPS domains when policy is `deny`. Supports exact matches and `*.` wildcard prefixes. **Global config only.** |

### Example configurations ​

**Minimal:**

**With Podman and custom env:**

sandbox:
enabled: true
image: my-sandbox:latest
env_passthrough:
- GITHUB_TOKEN
- ANTHROPIC_API_KEY
container:
runtime: podman

**Sandbox all panes (not just agent):**

sandbox:
enabled: true
target: all

## How it works ​

When you run `workmux add feature-x`, the agent command is wrapped:

# Without sandbox:
claude -- "$(cat .workmux/PROMPT-feature-x.md)"

# With sandbox:
docker run --rm -it \
--user 501:20 \
--env HOME=/tmp \
--mount type=bind,source=/path/to/worktree,target=/path/to/worktree \
--mount type=bind,source=/path/to/main/.git,target=/path/to/main/.git \
--mount type=bind,source=/path/to/main,target=/path/to/main \
--mount type=bind,source=~/.claude-sandbox.json,target=/tmp/.claude.json \
--mount type=bind,source=~/.claude,target=/tmp/.claude \
--workdir /path/to/worktree \
workmux-sandbox:claude \
sh -c 'claude -- "$(cat .workmux/PROMPT-feature-x.md)"'

### What's mounted ​

| Mount | Access | Purpose |
| --- | --- | --- |
| Worktree directory | read-write | Source code |
| Main worktree | read-write | Symlink resolution (e.g., CLAUDE.md) |
| Main `.git` | read-write | Git operations |
| Agent credentials | read-write | Auth and settings (see Credentials) |
| `extra_mounts` entries | read-only\* | User-configured paths |

\\* Extra mounts are read-only by default. Set `writable: true` to allow writes.

For Claude specifically, `~/.claude-sandbox.json` is also mounted to `/tmp/.claude.json` as a separate config file.

### Networking ​

By default, containers have unrestricted network access. To restrict outbound connections to only approved domains, configure network restrictions. When enabled, all outbound HTTPS is routed through a host-resident proxy that enforces a domain allowlist, and iptables rules inside the container block any direct connections.

### Debugging with `sandbox shell` ​

Start an interactive shell inside a container for debugging:

# Start a new container with the same mounts
workmux sandbox shell

# Exec into the currently running container for this worktree
workmux sandbox shell --exec

The `--exec` flag attaches to an existing running container instead of starting a new one. This is useful for inspecting the state of a running agent's environment.

## Network restrictions ​

Network restrictions block outbound connections from sandboxed containers, only allowing traffic to domains you explicitly whitelist. This prevents agents from accessing your local network, exfiltrating data to unauthorized services, or making unintended API calls.

### Configuration ​

Add to global config (`~/.config/workmux/config.yaml`):

sandbox:
enabled: true
network:
policy: deny
allowed_domains:
# Claude Code (adjust for your agent)
- "api.anthropic.com"
- "platform.claude.com"

`network` is a global-only setting. If set in a project's `.workmux.yaml`, it is ignored and a warning is logged. This ensures that project config cannot weaken network restrictions set by the user.

Domain entries support exact matches (`github.com`) and wildcard prefixes (`*.github.com`). Wildcards match subdomains only, not the base domain itself (e.g., `*.github.com` matches `api.github.com` but not `github.com`).

### How it works ​

Two layers enforce the restrictions:

1. **iptables firewall** inside the container blocks all direct outbound connections, forcing traffic through a host-resident proxy.
2. **CONNECT proxy** on the host checks each domain against the allowlist and rejects connections to private/internal IPs.

This means agents cannot bypass restrictions by ignoring proxy environment variables.

Only HTTPS (port 443) to allowed domains gets through. The proxy also rejects connections to private/internal IP ranges (RFC1918, link-local, loopback), so allowed domains cannot be used to reach local network services. Non-HTTPS protocols like `git+ssh` are blocked; use HTTPS git remotes instead. IPv6 is blocked to prevent bypassing the IPv4 firewall.

### Known limitations ​

- **Non-HTTP protocols**: Protocols like `git+ssh` are blocked. Use HTTPS git remotes (`git clone instead of SSH (`git clone git@...`).
- **Podman rootless**: Network restrictions require `CAP_NET_ADMIN` for iptables. On rootless Podman, this may require additional configuration depending on your setup.

## Custom images ​

To add tools or customize the sandbox environment, export the Dockerfile and modify it:

workmux sandbox init-dockerfile # creates Dockerfile.sandbox
vim Dockerfile.sandbox # customize
docker build -t my-sandbox -f Dockerfile.sandbox .

To build the default image locally instead of pulling from the registry:

workmux sandbox build

Then set the image in your config:

sandbox:
enabled: true
image: my-sandbox

## Security: hooks in sandbox ​

Pre-merge and pre-remove hooks are always skipped for RPC-triggered merges (`--no-verify --no-hooks` is forced by the host). This prevents a compromised guest from injecting malicious hooks via `.workmux.yaml` and triggering them on the host. Similarly, `SpawnAgent` RPC forces `--no-hooks` to skip post-create hooks.

---

# https://workmux.raine.dev/guide/sandbox/lima

Skip to content

On this page

Copy page

# Lima VM backend ​

workmux can use Lima VMs for sandboxing, where each project runs in its own virtual machine with a separate kernel.

## Setup ​

### 1\. Install Lima ​

bash

brew install lima

### 2\. Enable in config ​

yaml

# ~/.config/workmux/config.yaml or .workmux.yaml
sandbox:
enabled: true
backend: lima

## Configuration ​

Lima-specific settings are nested under `sandbox.lima`:

sandbox:
enabled: true
backend: lima
env_passthrough:
- GITHUB_TOKEN
- ANTHROPIC_API_KEY
lima:
isolation: project # default: one VM per git repository
cpus: 8
memory: 8GiB
provision: |
sudo apt-get install -y ripgrep fd-find jq

| Option | Default | Description |
| --- | --- | --- |
| `backend` | `container` | Set to `lima` for VM sandboxing |
| `lima.isolation` | `project` | `project` (one VM per repo) or `shared` (single global VM) |
| `lima.projects_dir` | - | Required for `shared` isolation: parent directory of all projects |
| `image` | Debian 12 | Custom qcow2 image URL or `file://` path. **Global config only.** |
| `lima.skip_default_provision` | `false` | Skip built-in provisioning (system deps + tool install) |
| `lima.cpus` | `4` | Number of CPUs for Lima VMs |
| `lima.memory` | `4GiB` | Memory for Lima VMs |
| `lima.disk` | `100GiB` | Disk size for Lima VMs |
| `lima.provision` | - | Custom user-mode shell script run once at VM creation after built-in steps |
| `toolchain` | `auto` | Toolchain mode: `auto` (detect devbox.json/flake.nix), `off`, `devbox`, or `flake` |
| `host_commands` | `[]` | Commands to proxy from guest to host via RPC (see shared features) |
| `env_passthrough` | `["GITHUB_TOKEN"]` | Environment variables to pass through to the VM. **Global config only.** |
| `extra_mounts` | `[]` | Additional host paths to mount (see shared features). **Global config only.** |

VM resource and provisioning settings (`isolation`, `projects_dir`, `cpus`, `memory`, `disk`, `provision`, `skip_default_provision`) are nested under `lima`. Settings shared by both backends (`toolchain`, `host_commands`, `env_passthrough`, `image`, `target`) remain at the `sandbox` level. Container-specific settings (`runtime`) are nested under `container`.

## How it works ​

When using the Lima backend, each sandboxed pane runs a supervisor process (`workmux sandbox run`) that:

1. Ensures the Lima VM is running (creates it on first use)
2. Starts a TCP RPC server on a random port
3. Runs the agent command inside the VM via `limactl shell`
4. Handles RPC requests from the guest workmux binary

The guest VM connects

VMs are named deterministically based on the isolation level:

### Auto-start behavior ​

VMs are created on first use and started automatically when needed. If a VM already exists but is stopped, workmux restarts it. You don't need to manage VM lifecycle manually during normal use.

## Provisioning ​

### Default provisioning ​

When a VM is first created, workmux runs two built-in provisioning steps:

**System provision** (as root):

- Installs `curl`, `ca-certificates`, `git`, `xz-utils`

**User provision:**

- Installs the configured agent CLI (based on the `agent` setting)
- Installs workmux
- Installs Nix and Devbox (only when the project has `devbox.json` or `flake.nix`, or `toolchain` is explicitly set to `devbox` or `flake`)

The agent CLI installed depends on your `agent` configuration:

| Agent | What gets installed |
| --- | --- |
| `claude` (default) | Claude Code CLI via `claude.ai/install.sh` |
| `codex` | Codex CLI binary from GitHub releases |
| `gemini` | Node.js + Gemini CLI via npm |
| `opencode` | OpenCode binary via `opencode.ai/install` |

Changing the `agent` setting after VM creation has no effect on existing VMs. Recreate the VM with `workmux sandbox prune` to provision with a different agent.

### Authentication ​

Agent credentials are shared between the host and VM. See Credentials for the per-agent mount table.

**Lima-specific notes:**

- Claude stores auth in macOS Keychain, which is not accessible from the Linux VM. You need to authenticate Claude separately inside the VM.
- Gemini, Codex, and OpenCode use file-based credentials that work automatically if you've authenticated on the host.

- The credential mount is determined by the `agent` setting at VM creation time. If you switch agents, recreate the VM with `workmux sandbox prune` to get the correct mount.

### Custom provisioning ​

The `provision` field accepts a shell script that runs as a third provisioning step during VM creation, after the built-in steps. Use it to customize the VM environment for your project.

The script runs in `user` mode. Use `sudo` for system-level commands.

sandbox:
backend: lima
lima:
provision: |
# Install extra CLI tools
sudo apt-get install -y ripgrep fd-find jq

# Install Node.js via nvm
curl -o- | bash
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm install 22

**Important:**

- Provisioning only runs when the VM is first created. Changing the `agent` setting or provision script has no effect on existing VMs. Recreate the VM with `workmux sandbox prune` to apply changes.
- With `lima.isolation: shared`, only the first project to create the VM gets its agent installed and provision script run. Use `lima.isolation: project` (default) if different projects use different agents or need different provisioning.
- The built-in system step runs `apt-get update` before the custom script, so package lists are already available.

### Custom images ​

You can use a pre-built qcow2 image to skip provisioning entirely, reducing VM creation time from minutes to seconds. This is useful when you want every VM to start from an identical, known-good state.

sandbox:
backend: lima
image: file:///Users/me/.lima/images/workmux-golden.qcow2
lima:
skip_default_provision: true

When `image` is set, it replaces the default Debian 12 genericcloud image. The value can be a `file://` path to a local qcow2 image or an HTTP(S) URL.

When `skip_default_provision` is true, the built-in provisioning steps are skipped:

- System provision (apt-get install of curl, ca-certificates, git)
- User provision (agent CLI, workmux, Nix/Devbox)

Custom `provision` scripts still run even when `skip_default_provision` is true, so you can layer additional setup on top of a pre-built image.

#### Creating a pre-built image ​

1. Create a VM with default provisioning and let it fully provision:

sandbox:
backend: lima
lima:
provision: |
sudo apt-get install -y ripgrep fd-find jq

2. After the VM is running, stop it:

limactl stop wm-yourproject-abc12345

3. Export the disk image (flattens base + changes into a single file):

mkdir -p ~/.lima/images
qemu-img convert -O qcow2 \
~/.lima/wm-yourproject-abc12345/diffdisk \
~/.lima/images/workmux-golden.qcow2

4. Update your config to use the pre-built image:

New VMs will now boot from the snapshot with everything pre-installed.

## Nix and Devbox toolchain ​

The Lima backend has built-in support for Nix and Devbox to provide declarative, cached toolchain management inside VMs. For the container backend, use a custom Dockerfile to install project-specific tools, or use `host_commands` to proxy commands from the container to the host's toolchain environment.

By default (`toolchain: auto`), workmux checks for `devbox.json` or `flake.nix` in the project root and wraps agent commands in the appropriate environment:

If both `devbox.json` and `flake.nix` exist, Devbox takes priority.

### Example: Rust project with Devbox ​

Add a `devbox.json` to your project root:

json

{
"packages": ["rustc@latest", "cargo@latest", "just@latest", "ripgrep@latest"]
}

When workmux creates a sandbox, the agent automatically has access to `rustc`, `cargo`, `just`, and `rg` without any provisioning scripts.

### Example: Node.js project with Devbox ​

{
"packages": ["nodejs@22", "yarn@latest"],
"shell": {
"init_hook": ["echo 'Node.js environment ready'"]
}
}

### Disabling toolchain integration ​

To disable auto-detection (e.g., if your project has a `devbox.json` that should not be used in the sandbox):

sandbox:
backend: lima
toolchain: off

This skips Nix and Devbox installation during provisioning and disables runtime toolchain wrapping.

To force a specific toolchain mode regardless of which config files exist:

sandbox:
backend: lima
toolchain: devbox # or: flake

### How it works ​

Nix and Devbox are installed during VM provisioning only when needed (when `devbox.json` or `flake.nix` exists in the project, or `toolchain` is explicitly set). Tools declared in these files are downloaded as pre-built binaries from the Nix binary cache, so no compilation is needed.

The `/nix/store` persists inside the VM across sessions, so subsequent activations are instant. If the VM is pruned with `workmux sandbox prune`, packages will be re-downloaded on next use.

### Toolchain vs provisioning ​

Use **toolchain** (`devbox.json`/`flake.nix`) for project-specific development tools like compilers, linters, and build tools. Changes take effect on the next sandboxed session without recreating the VM.

Use **provisioning** for one-time VM setup like system packages, shell configuration, or services that need to run as root. Provisioning only runs on VM creation.

## VM management ​

### Cleaning up unused VMs ​

Use the `prune` command to delete unused Lima VMs created by workmux:

workmux sandbox prune

This command:

- Lists all Lima VMs with the `wm-` prefix (workmux VMs)
- Shows details for each VM: name, status, size, age, and last accessed time
- Displays total disk space used
- Prompts for confirmation before deletion

**Force deletion without confirmation:**

workmux sandbox prune --force

**Example output:**

Found 2 workmux Lima VM(s):

1. wm-myproject-bbeb2cbf (Running)
Age: 2 hours ago
Last accessed: 5 minutes ago

2. wm-another-proj-d1370a2a (Stopped)
Age: 1 day ago
Last accessed: 1 day ago

Delete all these VMs? [y/N]

### Stopping VMs ​

When using the Lima backend, you can stop running VMs to free up system resources:

# Interactive mode - shows list of running VMs
workmux sandbox stop

# Stop a specific VM
workmux sandbox stop wm-myproject-abc12345

# Stop all workmux VMs
workmux sandbox stop --all

# Skip confirmation (useful for scripts)
workmux sandbox stop --all --yes

This is useful when you want to:

- Free up CPU and memory resources
- Reduce battery usage on laptops
- Clean up after finishing work

The VMs will automatically restart when needed for new worktrees.

---

# https://workmux.raine.dev/guide/dashboard/diff-view

Skip to content

On this page

Copy page

# Diff view ​

Press `d` to view the diff for the selected agent. The diff view has two modes:

- **WIP** \- Shows uncommitted changes (`git diff HEAD`)
- **review** \- Shows all changes on the branch vs main (`git diff main...HEAD`)

Press `Tab` while in diff view to toggle between modes. The footer displays which mode is active along with diff statistics showing lines added (+) and removed (-).

When delta is installed, diffs are rendered with syntax highlighting for better readability. Without delta, basic diff coloring is used as a fallback.

Diff view showing WIP changes across multiple files

If there are no changes to show, a message is displayed instead:

- WIP mode: "No uncommitted changes"
- Review mode: "No commits on this branch yet"

## Keybindings ​

| Key | Action |
| --- | --- |
| `Tab` | Toggle WIP / review |
| `a` | Enter patch mode (WIP only) |
| `j`/`k` | Scroll down/up |
| `Ctrl+d` | Page down |
| `Ctrl+u` | Page up |
| `c` | Send commit action to agent |
| `m` | Send merge action to agent |
| `q`/`Esc` | Close diff view |
| `Ctrl+c` | Quit dashboard |

The `c` and `m` actions can be configured to run custom commands or prompts.

---

# https://workmux.raine.dev/guide/configuration

Skip to content

On this page

Copy page

# Configuration ​

workmux uses a two-level configuration system:

- **Global** (`~/.config/workmux/config.yaml`): Personal defaults for all projects. Run `workmux config edit` to open it in your editor.
- **Project** (`.workmux.yaml`): Project-specific overrides

## Global configuration example ​

`~/.config/workmux/config.yaml`:

yaml

nerdfont: true # Enable nerdfont icons (prompted on first run)
merge_strategy: rebase # Make workmux merge do rebase by default
agent: claude

panes:

focus: true
- split: horizontal # Second pane with default shell

## Project configuration example ​

`.workmux.yaml`:

post_create:

- mise use

files:
symlink:

- .pnpm-store # Add project-specific symlink

panes:
- command: pnpm install
focus: true

- command: pnpm run dev
split: vertical

For a real-world example, see workmux's own `.workmux.yaml`.

## Configuration options ​

Most options have sensible defaults. You only need to configure what you want to customize.

### Basic options ​

| Option | Description | Default |
| --- | --- | --- |
| `main_branch` | Branch to merge into | Auto-detected |

| `nerdfont` | Enable nerdfont icons (prompted on first run) | Prompted |
| `window_prefix` | Override tmux window/session prefix | Icon or `wm-` |

| `layouts` | Named pane layouts, selectable with `-l/--layout` | -- |
| `merge_strategy` | Default merge strategy (`merge`, `rebase`, `squash`) | `merge` |
| `theme` | Dashboard color theme (`dark`, `light`) | `dark` |
| `mode` | Tmux mode (`window` or `session`). See session mode. | `window` |

### Naming options ​

| Option | Description | Default |
| --- | --- | --- |
| `worktree_naming` | How to derive names from branches | `full` |
| `worktree_prefix` | Prefix for worktree directories and windows | none |

`worktree_naming` strategies:

- `full`: Use the full branch name (slashes become dashes)
- `basename`: Use only the part after the last `/` (e.g., `prj-123/feature` → `feature`)

### Panes ​

Define your tmux pane layout with the `panes` array. For multiple windows in session mode, use windows instead (they are mutually exclusive).

- command: npm run dev
split: horizontal
size: 15

Each pane supports:

| Option | Description | Default |
| --- | --- | --- |
| `command` | Command to run (see agent placeholders below) | Shell |
| `focus` | Whether this pane receives focus | `false` |
| `split` | Split direction (`horizontal` or `vertical`) | \-\-\- |
| `size` | Absolute size in lines/cells | 50% |
| `percentage` | Size as percentage (1-100) | 50% |

#### Agent placeholders ​

panes:
- command: "claude --dangerously-skip-permissions"
focus: true
- command: "codex --yolo"
split: vertical

Each agent receives the prompt (via `-p`/`-P`/`-e`) using the correct format for that agent. Auto-detection matches the executable name regardless of flags or path.

### Windows ​

When using session mode, you can configure multiple windows per session using the `windows` array. This is mutually exclusive with the top-level `panes` config. See multiple windows per session for full details.

mode: session
windows:
- name: editor
panes:

- split: horizontal
size: 20
- name: tests
panes:
- command: just test --watch

### File operations ​

New worktrees are clean checkouts with no gitignored files (`.env`, `node_modules`, etc.). Use `files` to automatically copy or symlink what each worktree needs:

files:
copy:
- .env
symlink:
- .next/cache # Share build cache across worktrees

Both `copy` and `symlink` accept glob patterns.

### Lifecycle hooks ​

Run commands at specific points in the worktree lifecycle, such as installing dependencies or running database migrations. All hooks run with the **worktree directory** as the working directory (or the nested config directory for nested configs) and receive environment variables: `WM_HANDLE`, `WM_WORKTREE_PATH`, `WM_PROJECT_ROOT`, `WM_CONFIG_DIR`.

| Hook | When it runs | Additional env vars |
| --- | --- | --- |
| `post_create` | After worktree creation, before tmux window opens | — |
| `pre_merge` | Before merging (aborts on failure) | `WM_BRANCH_NAME`, `WM_TARGET_BRANCH` |
| `pre_remove` | Before worktree removal (aborts on failure) | — |

`WM_CONFIG_DIR` points to the directory containing the `.workmux.yaml` that was used, which may differ from `WM_WORKTREE_PATH` when using nested configs.

Example:

post_create:
- direnv allow

pre_merge:
- just check

### Agent status icons ​

Customize the icons shown in tmux window names:

status_icons:
working: "🤖" # Agent is processing
waiting: "💬" # Agent needs input (auto-clears on focus)
done: "✅" # Agent finished (auto-clears on focus)

Set `status_format: false` to disable automatic tmux format modification.

### Auto-name configuration ​

Configure LLM-based branch name generation for the `--auto-name` (`-A`) flag:

auto_name:
model: "gemini-2.5-flash-lite"
background: true
system_prompt: "Generate a kebab-case git branch name."

| Option | Description | Default |
| --- | --- | --- |
| `model` | LLM model to use with the `llm` CLI | `llm`'s default |
| `background` | Always run in background when using `--auto-name` | `false` |
| `system_prompt` | Custom system prompt for branch name generation | Built-in prompt |

See `workmux add --auto-name` for usage details.

## Default behavior ​

- If no `panes` configuration is defined, workmux provides opinionated defaults:
- For projects with a `CLAUDE.md` file: Opens the configured agent (see `agent` option) in the first pane, defaulting to `claude` if none is set.
- For all other projects: Opens your default shell.
- Both configurations include a second pane split horizontally
- `post_create` commands are optional and only run if you configure them

## Automatic setup with panes ​

Use the `panes` configuration to automate environment setup. Unlike `post_create` hooks which must finish before the tmux window opens, pane commands execute immediately _within_ the new window.

This can be used for:

- **Installing dependencies**: Run `npm install` or `cargo build` in a focused pane to monitor progress.
- **Starting services**: Launch dev servers, database containers, or file watchers automatically.
- **Running agents**: Initialize AI agents with specific context.

Since these run in standard tmux panes, you can interact with them (check logs, restart servers) just like a normal terminal session.

TIP

Running dependency installation (like `pnpm install`) in a pane command rather than `post_create` has a key advantage: you get immediate access to the tmux window while installation runs in the background. With `post_create`, you'd have to wait for the install to complete before the window even opens. This also means AI agents can start working immediately in their pane while dependencies install in parallel.

# Pane 1: Install dependencies, then start dev server
panes:
- command: pnpm install && pnpm run dev

# Pane 2: AI agent

focus: true

---

# https://workmux.raine.dev/guide/status-tracking

Skip to content

On this page

Copy page

# Status tracking ​

Workmux can display the status of the agent in your tmux window list, giving you at-a-glance visibility into what the agent in each window is doing.

## Agent support ​

| Agent | Status |
| --- | --- |
| Claude Code | ✅ Supported |
| OpenCode | ✅ Supported |
| Gemini CLI | In progress |
| Codex | Tracking issue |

## Status icons ​

- 🤖 = agent is working
- 💬 = agent is waiting for user input
- ✅ = agent finished (auto-clears on window focus)

## Automated setup ​

Run `workmux setup` to automatically detect your agent CLIs and install status tracking hooks:

bash

workmux setup

This detects Claude Code and OpenCode by checking for their configuration directories, then offers to install the appropriate hooks. Workmux will also prompt you on first run if it detects an agent without status tracking configured.

Workmux automatically modifies your tmux `window-status-format` to display the status icons. This happens once per session and only affects the current tmux session (not your global config).

## Claude Code setup ​

If you prefer manual setup, install the workmux status plugin:

claude plugin marketplace add raine/workmux
claude plugin install workmux-status

Alternatively, you can manually add the hooks to `~/.claude/settings.json`. See .claude-plugin/plugin.json for the hook configuration.

## OpenCode setup ​

If you prefer manual setup, download the workmux status plugin to your global OpenCode plugin directory:

mkdir -p ~/.config/opencode/plugin
curl -o ~/.config/opencode/plugin/workmux-status.ts \

Restart OpenCode for the plugin to take effect.

## Customization ​

You can customize the icons in your config:

yaml

# ~/.config/workmux/config.yaml
status_icons:
working: "🔄"
waiting: "⏸️"
done: "✔️"

If you prefer to manage the tmux format yourself, disable auto-modification and add the status variable to your `~/.tmux.conf`:

status_format: false

# ~/.tmux.conf
set -g window-status-format '#I:#W#{?@workmux_status, #{@workmux_status},}#{?window_flags,#{window_flags}, }'
set -g window-status-current-format '#I:#W#{?@workmux_status, #{@workmux_status},}#{?window_flags,#{window_flags}, }'

## Jump to completed agents ​

Use `workmux last-done` to quickly switch to the agent that most recently finished its task. Repeated invocations cycle through all completed agents in reverse chronological order (most recent first).

Add a tmux keybinding for quick access:

bind l run-shell "workmux last-done"

Then press `prefix + l` to jump to the last completed agent, press again to cycle to the next oldest, and so on. This is useful when you have multiple agents running and want to review their work in the order they finished.

## Toggle between agents ​

Use `workmux last-agent` to toggle between your current agent and the last one you visited. This works like vim's `Ctrl+^` or tmux's `last-window` \- it remembers which agent you came from and switches .

bind Tab run-shell "workmux last-agent"

Then press `prefix + Tab` to toggle between your two most recent agents.

---

# https://workmux.raine.dev/guide/kitty

Skip to content

On this page

Copy page

# Kitty ​

Experimental

The kitty backend is new and experimental. Expect rough edges and potential issues.

kitty can be used as an alternative to tmux. Detected automatically via `$KITTY_WINDOW_ID`.

## Differences from tmux ​

| Feature | tmux | kitty |
| --- | --- | --- |
| Agent status in tabs | Yes (window names) | Yes (custom tab title) |
| Tab ordering | Insert after current | Appends to end |
| Scope | tmux session | OS window |

- **Tab ordering**: New tabs appear at the end of the tab bar (no "insert after" support like tmux)
- **OS window isolation**: workmux operates within the current OS window. Tabs in other OS windows are not affected.
- **Terminology note**: What workmux calls a "pane" is called a "window" in kitty, and what workmux calls a "window" (tab) is called a "tab" in kitty

## Requirements ​

- kitty with remote control enabled (`kitten @` must work)
- Unix-like OS (named pipes for handshakes)
- Windows is **not supported**
- **Required kitty configuration** (see below)

## Required kitty configuration ​

workmux relies on kitty's remote control API. Add these settings to your `kitty.conf`:

bash

# REQUIRED: Enable remote control
allow_remote_control yes

# REQUIRED: Set up socket for remote control
# The socket path can be customized, but using kitty_pid ensures uniqueness
listen_on unix:/tmp/kitty-{kitty_pid}

# RECOMMENDED: Enable splits layout for pane splitting
enabled_layouts splits,stack

## Agent status display ​

workmux stores agent status in kitty user variables (`workmux_status`), which can be displayed in tab titles using kitty's `{custom}` template placeholder.

Agent setup

Copy this page as markdown and paste it to your coding agent to have it set up the configuration files for you.

### Setup ​

1. Create `~/.config/kitty/tab_bar.py`:

python

from kitty.fast_data_types import get_boss

def draw_title(data):
tab = get_boss().tab_for_id(data['tab'].tab_id)
if tab:
for window in tab:
status = window.user_vars.get('workmux_status', '')
if status:
return ' ' + status
return ''

2. Create `~/.config/kitty/workmux_watcher.py` for live status updates and auto-clear on focus:

from kitty.boss import Boss
from kitty.window import Window

if not data.get('focused'):
return
if window.user_vars.get('workmux_auto_clear') == '1':
boss.call_remote_control(window, (
'set-user-vars', f'--match=id:{window.id}',
'workmux_status=', 'workmux_auto_clear=',
))

if data.get('key') == 'workmux_status':
tm = boss.os_window_map.get(window.os_window_id)
if tm is not None:
tm.update_tab_bar_data()
tm.mark_tab_bar_dirty()

3. Add to your `kitty.conf`:

tab_title_template "{title}{custom}"
watcher workmux_watcher.py

The `{custom}` placeholder calls the `draw_title` function, which checks each window in the tab for a `workmux_status` user variable and appends it to the title. The watcher refreshes the tab bar when status changes and auto-clears "waiting" and "done" statuses when the tab receives focus.

## Known limitations ​

- Windows is not supported (requires Unix-specific features)
- Agent status icons require a small config change (see above)
- Cross-OS-window operations are not supported
- Some edge cases may not be as thoroughly tested as the tmux backend
- Tab insertion ordering is not supported (new tabs always appear at the end)

---

# https://workmux.raine.dev/guide/git-worktree-caveats

Skip to content

On this page

Copy page

# Git worktree caveats ​

While powerful, git worktrees have nuances that are important to understand. workmux is designed to automate solutions to these, but awareness of the underlying mechanics helps.

## Gitignored files require configuration ​

When `git worktree add` creates a new working directory, it's a clean checkout. Files listed in your `.gitignore` (e.g., `.env` files, `node_modules`, IDE configuration) will not exist in the new worktree by default. Your application will be broken in the new worktree until you manually create or link these necessary files.

This is a primary feature of workmux. Use the `files` section in your `.workmux.yaml` to automatically copy or symlink these files on creation:

yaml

# .workmux.yaml
files:
copy:
- .env # Copy environment variables
symlink:
- .next/cache # Share Next.js build cache

WARNING

Symlinking `node_modules` can be efficient but only works if all worktrees share identical dependencies. If different branches have different dependency versions, each worktree needs its own installation.

For dependency installation, consider using a pane command instead of `post_create` hooks - this runs the install in the background without blocking the worktree and window creation:

panes:
- command: npm install
focus: true
- split: horizontal

## Conflicts ​

Worktrees isolate your filesystem, but they do not prevent merge conflicts. If you modify the same area of code on two different branches (in two different worktrees), you will still have a conflict when you merge one into the other.

The best practice is to work on logically separate features in parallel worktrees. When conflicts are unavoidable, use standard git tools to resolve them. You can also leverage an AI agent within the worktree to assist with the conflict resolution.

## Package manager considerations (pnpm, yarn) ​

Modern package managers like `pnpm` use a global store with symlinks to `node_modules`. Each worktree typically needs its own `pnpm install` to set up the correct dependency versions for that branch.

If your worktrees always have identical dependencies (e.g., working on multiple features from the same base), you could potentially symlink `node_modules` between worktrees. However, this breaks as soon as branches diverge in their dependencies, so it's generally safer to run a fresh install in each worktree.

INFO

In large monorepos, cleaning up `node_modules` during worktree removal can take significant time. workmux has a special cleanup mechanism that moves `node_modules` to a temporary location and deletes it in the background, making the `remove` command return almost instantly.

## Rust projects ​

Unlike `node_modules`, Rust's `target/` directory should **not** be symlinked between worktrees. Cargo locks the `target` directory during builds, so sharing it would block parallel builds and defeat the purpose of worktrees.

Instead, use sccache to share compiled dependencies across worktrees:

bash

brew install sccache

Add to `~/.cargo/config.toml`:

toml

[build]
rustc-wrapper = "sccache"

This caches compiled dependencies globally, so new worktrees benefit from cached artifacts without any lock contention.

## Symlinks and `.gitignore` trailing slashes ​

If your `.gitignore` uses a trailing slash to ignore directories (e.g., `tests/venv/`), symlinks to that path in the created worktree will **not** be ignored and will show up in `git status`. This is because `venv/` only matches directories, not files (symlinks).

To ignore both directories and symlinks, remove the trailing slash:

diff

- tests/venv/
+ tests/venv

## Local git ignores are not shared ​

The local git ignore file, `.git/info/exclude`, is specific to the main worktree's git directory and is not respected in other worktrees. Personal ignore patterns for your editor or temporary files may not apply in new worktrees, causing them to appear in `git status`.

For personal ignores, use a global git ignore file. For project-specific ignores that are safe to share with your team, add them to the project's main `.gitignore` file.

---

# https://workmux.raine.dev/guide/agents

Skip to content

On this page

Copy page

# AI agents ​

workmux is designed with AI agent workflows in mind. Run multiple agents in parallel, each in their own isolated environment.

## Agent integration ​

When you provide a prompt via `--prompt`, `--prompt-file`, or `--prompt-editor`, workmux automatically injects the prompt into panes running the configured agent command (e.g., `claude`, `codex`, `opencode`, `gemini`, or whatever you've set via the `agent` config or `--agent` flag) without requiring any `.workmux.yaml` changes:

- Panes with a command matching the configured agent are automatically started with the given prompt.

This means you can launch AI agents with task-specific prompts without modifying your project configuration for each task.

### Examples ​

bash

# Create a worktree with an inline prompt
workmux add feature/auth -p "Implement user authentication with OAuth"

# Create a worktree with a prompt from a file
workmux add feature/refactor --prompt-file task-description.md

# Open your editor to write a prompt interactively
workmux add feature/new-api --prompt-editor

# Override the default agent for a specific worktree
workmux add feature/caching -a gemini -p "Add caching layer for API responses"

# Use -A to generate branch name from the prompt automatically
workmux add -A -p "Fix race condition in payment handler"

# Use -A alone to open editor for prompt, then generate branch name from it
workmux add -A

TIP

The `-A` (`--auto-name`) flag uses an LLM to generate a branch name from your prompt, so you don't have to think of one.

## Per-pane agents ​

yaml

panes:
- command: "claude --dangerously-skip-permissions"
focus: true
- command: "codex --yolo"
split: vertical

Each agent receives the prompt using its native format (e.g., Claude uses `--`, Gemini uses `-i`). Auto-detection matches the executable name regardless of flags or path. Just provide a prompt via `-p`, `-P`, or `-e`.

See pane configuration for details.

## Parallel workflows ​

workmux can generate multiple worktrees from a single `add` command, which is ideal for running parallel experiments or delegating tasks to multiple AI agents.

### Multi-agent example ​

# Create one worktree for claude and one for gemini with a focused prompt
workmux add my-feature -a claude -a gemini -p "Implement the new search API integration"
# Generates worktrees: my-feature-claude, my-feature-gemini

# Create 2 instances of the default agent
workmux add my-feature -n 2 -p "Implement task #{{ num }} in TASKS.md"
# Generates worktrees: my-feature-1, my-feature-2

See the add command reference for all parallel workflow options.

---

# https://workmux.raine.dev/guide/session-mode

Skip to content

On this page

Copy page

# Session mode ​

By default, workmux creates tmux **windows** within your current session. With session mode, each worktree gets its own **tmux session** instead.

This is useful when you want each worktree to have multiple windows, or when you prefer the isolation of separate sessions (each with its own window list, history, and layout).

## Enabling session mode ​

Per-project via config:

yaml

# .workmux.yaml
mode: session

Globally via config:

# ~/.config/workmux/config.yaml

Or per-worktree via flag:

bash

workmux add feature-branch --session

The `--session` flag overrides the config for that specific worktree. This lets you use window mode by default but create individual worktrees as sessions when needed.

## How it works ​

- **Persistence**: The mode is stored per-worktree in git config. Once a worktree is created with session mode, `open`, `close`, `remove`, and `merge` automatically use the correct mode.
- **Navigation**: `workmux add` switches your client to the new session. `merge` and `remove` switch you

Use the `windows` config to create multiple windows in each session. Each window can have its own pane layout. This is mutually exclusive with the top-level `panes` config.

mode: session
windows:
- name: editor
panes:

- split: horizontal
size: 20
- name: tests
panes:
- command: just test --watch
- panes:
- command: tail -f app.log

Each window supports:

| Option | Description | Default |
| --- | --- | --- |
| `name` | Window name (if omitted, tmux auto-names from command) | Auto |
| `panes` | Pane layout (same syntax as top-level `panes`) | Single shell |

Named windows keep their name permanently. Unnamed windows use tmux's automatic naming based on the running command.

`focus: true` works across windows -- the last pane with focus set determines which window is active when the session opens.

## Limitations ​

- **tmux only**: Session mode is only supported for the tmux backend. WezTerm and kitty do not support sessions.
- **No duplicates**: Unlike window mode which supports opening multiple windows for the same worktree (with `-2`, `-3` suffixes), session mode creates one session per worktree.

---

# https://workmux.raine.dev/guide/dashboard/patch-mode

Skip to content

On this page

Copy page

# Patch mode ​

Patch mode (`a` from WIP diff) allows staging individual hunks like `git add -p`. This is useful for selectively staging parts of an agent's work.

When delta is installed, hunks are rendered with syntax highlighting for better readability.

## Keybindings ​

| Key | Action |
| --- | --- |
| `y` | Stage current hunk |
| `n` | Skip current hunk |
| `u` | Undo last staged hunk |
| `s` | Split hunk (if splittable) |
| `o` | Comment on hunk (sends to agent) |
| `j`/`k` | Navigate to next/previous hunk |
| `q`/`Esc` | Exit patch mode |
| `Ctrl+c` | Quit dashboard |

## Staging hunks ​

Press `y` to stage the current hunk (adds it to the git index) and advance to the next. Press `n` to skip without staging. The counter in the header shows your progress through all hunks (e.g., `[3/10]`).

After staging or skipping all hunks, the diff refreshes to show any remaining unstaged changes.

## Splitting hunks ​

Press `s` to split the current hunk into smaller pieces. This works when there are context lines (unchanged lines) between separate changes within a hunk. If the hunk cannot be split further, nothing happens.

## Undo ​

Press `u` to undo the last staged hunk. This uses `git apply --cached --reverse` to unstage it. You can undo multiple times to unstage several hunks.

## Commenting on hunks ​

Press `o` to enter comment mode. Type your message and press `Enter` to send it to the agent. The comment includes:

- File path and line number
- The diff hunk as context (in a code block)
- Your comment text

Press `Esc` to cancel without sending.

This is useful for giving the agent feedback about specific changes, like "This function should handle the error case" or "Can you add a test for this?"

---

# https://workmux.raine.dev/guide/nix

Skip to content

On this page

Copy page

# Nix ​

Requires Nix with flakes enabled.

## Quick start ​

Run workmux without installing:

bash

nix run github:raine/workmux -- --help

## Flake input ​

nix

inputs.workmux.url = "github:raine/workmux";

## Installation ​

### Home Manager ​

Install the package and write the config file directly:

{ inputs, pkgs, ... }:

{
home.packages = [ inputs.workmux.packages.${pkgs.system}.default ];

xdg.configFile."workmux/config.yaml".text = ''
merge_strategy: rebase
agent: claude
panes:

- split: horizontal
'';
}

See Configuration for all config options.

### NixOS ​

{
environment.systemPackages = [\
inputs.workmux.packages.${pkgs.system}.default\
];
}

## Shell completions ​

The flake automatically installs completions for Bash, Zsh, and Fish. Do not add the manual `eval "$(workmux completions ...)"` lines from the Installation guide.

---

# https://workmux.raine.dev/guide/direnv

Skip to content

If your project uses direnv for environment management, you can configure workmux to automatically set it up in new worktrees:

yaml

# .workmux.yaml
post_create:
- direnv allow

files:
symlink:
- .envrc

See also Using direnv for port isolation in monorepos.

---

# https://workmux.raine.dev/guide/sandbox/alternatives

Skip to content

On this page

Copy page

# Alternatives ​

## Claude Code's built-in sandbox ​

Scope

Based on testing Claude Code v2.1.39 on macOS with sandbox auto-allow mode (February 2026). Behavior may change in future releases. See Claude Code's sandbox documentation for the latest details.

Claude Code has a native sandbox that uses OS-level primitives (Seatbelt on macOS, bubblewrap on Linux) to restrict bash commands. It is a useful guardrail, but it operates on a fundamentally different security model than container/VM sandbox.

**Claude Code** uses _process-level restriction_. It wraps the `bash` tool process with OS sandbox rules while the agent itself runs directly on your host.

**workmux sandbox** uses Docker/Podman containers or Lima VMs for _environment isolation_. The entire agent runs inside a separate container or VM. Host files that are not explicitly mounted do not exist inside the sandbox.

### Comparison ​

| | workmux sandbox | Claude Code sandbox |
| --- | --- | --- |
| **Isolation** | Full environment (container/VM). The entire agent runs in a separate OS instance. | Process restriction (Seatbelt/bwrap). Only the Bash tool is sandboxed by the OS; Read, Edit, Write, and other tools run in the unsandboxed parent process. |
| **Sensitive files** | Not present in the guest. `~/.ssh`, `~/.aws`, `~/.gnupg` simply do not exist. | Readable by default. Only `.env*` files are denied. Protection for `~/.ssh` and similar paths relies on model-level refusal, not OS enforcement. |
| **Unsandboxed fallback** | No automatic retry path outside the sandbox. | Failed sandboxed commands can be retried unsandboxed by default (`dangerouslyDisableSandbox`). Retries go through the normal permission flow, but in auto-allow mode the prompt is easy to miss. Can be disabled with `allowUnsandboxedCommands: false`. |
| **Hooks** | Run inside the sandbox. | Run in the unsandboxed Node.js parent process with full host access. |

Claude's sandbox can be hardened (`allowUnsandboxedCommands: false` and custom deny rules), but the scope remains Bash-only. If your threat model requires that a compromised agent cannot touch host secrets, a container or VM boundary is a stronger guarantee.

---

# https://workmux.raine.dev/guide/sandbox/

Skip to content

On this page

Copy page

# Sandbox ​

workmux provides first-class sandboxing for agents in containers or VMs. Agents are isolated from host secrets like SSH keys, AWS credentials, and other sensitive files. That makes YOLO mode safe to use without risking your host.

Status indicators, the dashboard, spawning agents, and merging all work the same with or without a sandbox. A built-in RPC bridge keeps host-side workmux features in sync with agent activity inside the sandbox.

## Security model ​

When sandbox is enabled, agents have access to:

- The current worktree directory (read-write)
- The main worktree directory (read-write, for symlink resolution like `CLAUDE.local.md`)
- The shared `.git` directory (read-write, for git operations)
- Agent settings and credentials (see credentials)

Host secrets like SSH keys, AWS credentials, and GPG keys are not accessible. Additional directories can be mounted via `extra_mounts`.

Outbound network access can be restricted to only approved domains using network restrictions (container backend). When enabled, a CONNECT proxy and iptables firewall work together to block unauthorized connections and prevent access to internal networks.

## Choosing a backend ​

workmux supports two sandboxing backends:

| | Container (Docker/Podman) | Lima VM |
| --- | --- | --- |
| **Isolation** | Process-level (namespaces) | Machine-level (virtual machine) |
| **Persistence** | Ephemeral (new container per session) | Persistent (stateful VMs) |
| **Toolchain** | Custom Dockerfile or host commands | Built-in Nix & Devbox support |
| **Credential model** | Shared with host (see credentials) | Shared with host (see credentials) |
| **Network** | Optional restrictions (domain allowlist) | Unrestricted |
| **Platform** | macOS, Linux | macOS, Linux |

Container is a good default: it's simple to set up and ephemeral, so no state accumulates between sessions. Choose Lima if you want persistent VMs with built-in Nix/Devbox toolchain support.

## Adding tools to the sandbox ​

Agents often need project tooling (compilers, linters, build tools) available inside the sandbox. There are several ways to provide this depending on your backend:

| Approach | Container | Lima | Details |
| --- | --- | --- | --- |
| **Host commands** | Yes | Yes | Proxy specific commands to the host via RPC. See host command proxying. |
| **Nix / Devbox toolchain** | No | Yes | Declare tools in `devbox.json` or `flake.nix` and they're available automatically. See toolchain. |
| **Custom provisioning** | No | Yes | Run a shell script at VM creation to install packages. See custom provisioning. |
| **Custom Dockerfile** | Yes | No | Build a custom container image with your tools baked in. See custom images. |

## Quick start ​

### Container backend ​

Install Docker or Podman, then enable in config:

yaml

# ~/.config/workmux/config.yaml or .workmux.yaml
sandbox:
enabled: true

The pre-built image is pulled automatically on first run. See the container backend page for details.

### Lima VM backend ​

Install Lima (`brew install lima`), then enable in config:

sandbox:
enabled: true
backend: lima

The VM is created and provisioned automatically on first run. See the Lima VM backend page for details.

---

# https://workmux.raine.dev/guide/claude-code

Skip to content

On this page

Copy page

# Claude Code ​

## Permissions ​

By default, Claude Code prompts for permission before running commands. There are several ways to handle this in worktrees:

### Share permissions across worktrees ​

To keep permission prompts but share granted permissions across worktrees:

yaml

files:
symlink:
- .claude/settings.local.json

Add this to your global config (`~/.config/workmux/config.yaml`) or project's `.workmux.yaml`. Since this file contains user-specific permissions, also add it to `.gitignore`:

.claude/settings.local.json

### Skip permission prompts (yolo mode) ​

To skip prompts entirely, either configure the agent with the flag:

agent: "claude --dangerously-skip-permissions"

This only affects workmux-created worktrees. Alternatively, use a global shell alias:

bash

alias claude="claude --dangerously-skip-permissions"

---

