@echo off
echo Starting Backend Server...
cd backend
start "Backend Server" npm run dev
cd ..

echo Starting Frontend Application...
cd frontend
start "Frontend App" npm run dev
cd ..

echo Waiting for services to initialize...
timeout /t 5 /nobreak >nul

echo Opening application in default browser...
start http://localhost:5173
