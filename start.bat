@echo off
echo 🎬 Netflix Login Clone — Starting...

echo Installing backend dependencies...
cd backend
call npm install
start "Netflix Backend" cmd /k "npm start"
cd ..

echo Installing frontend dependencies...
cd frontend
call npm install
start "Netflix Frontend" cmd /k "npm run dev"
cd ..

echo.
echo ✅ Both servers starting!
echo    Backend:  http://localhost:5000
echo    Frontend: http://localhost:5173
echo.
pause
