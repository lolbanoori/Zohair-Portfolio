@echo off
title Portfolio Website
cd /d "%~dp0"
echo Starting Portfolio Website...

:: Check if npm is available
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo Error: 'npm' is not found in your PATH.
    echo.
    echo Please ensure Node.js is installed and added to your PATH.
    echo You can download it from: https://nodejs.org/
    echo.
    echo If you have installed it, try restarting your computer or reinstalling Node.js.
    echo.
    pause
    exit /b
)

:: Check if node_modules exists
if not exist "node_modules" (
    echo.
    echo Dependencies not found. Installing them now...
    echo This may take a few minutes.
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo Error: Failed to install dependencies.
        pause
        exit /b
    )
)

call npm run dev
pause
