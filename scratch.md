1. docker compose up db -d -- TimescaleDB starts, healthcheck passes                                                             
2. cd frontend && pnpm drizzle-kit push -- schema pushed to DB                                                                   
3. cd backend && uv run uvicorn src.main:app --reload --port 8000 -- curl localhost:8000/health returns {"status":"ok"}          
4. cd frontend && pnpm dev -- opens on localhost:3000                                                                            
5. Sign up at /sign-up, sign in at /sign-in, verify redirect to /dashboard                                                       
6. Navigate to /chat, send a message, verify AI response streams back                                                            
7. cd frontend && pnpm vitest run -- tests pass                                                                                  
8. cd backend && uv run pytest -- tests pass                                                                                     
9. docker compose up --build -- all 3 services start and work together    