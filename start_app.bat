@echo off
echo Starting College Agency Project...

:: Start Backend
start "Backend Server" cmd /c "cd backend && npm run dev"

:: Start Frontend
start "Frontend (Vite)" cmd /c "cd frontend && npm run dev"

echo Waiting for servers to start...
timeout /t 5

:: Open the website in the default browser
start http://localhost:5173

echo All systems are running! You can close this window.
pause
