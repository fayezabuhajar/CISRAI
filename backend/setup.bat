@echo off
REM CISRAI Backend Setup Script for Windows

echo ================================
echo CISRAI Backend Setup Script
echo ================================
echo.

REM Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo X Node.js is not installed
    exit /b 1
)

echo + Node.js is installed
for /f "tokens=*" %%i in ('node --version') do echo   Version: %%i

REM Check npm
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo X npm is not installed
    exit /b 1
)

echo + npm is installed
for /f "tokens=*" %%i in ('npm --version') do echo   Version: %%i

REM Create .env if not exists
if not exist .env (
    echo.
    echo Creating .env file...
    copy .env.example .env
    echo + .env file created
    echo WARNING: Please edit .env with your configuration
) else (
    echo + .env file already exists
)

REM Install dependencies
echo.
echo Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo X Failed to install dependencies
    exit /b 1
)

echo + Dependencies installed

REM Build TypeScript
echo.
echo Building TypeScript...
call npm run build

if %errorlevel% neq 0 (
    echo X Build failed
    exit /b 1
)

echo + Build successful

echo.
echo ================================
echo Setup completed!
echo ================================
echo.
echo Next steps:
echo 1. Edit .env with your configuration
echo 2. Ensure MongoDB is running
echo 3. Run: npm run dev (development)
echo 4. Or run: npm start (production)
echo.
pause
