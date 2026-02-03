#!/bin/bash

echo "================================"
echo "CISRAI Backend Setup Script"
echo "================================"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi

echo "✓ Node.js $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

echo "✓ npm $(npm --version)"

# Create .env if not exists
if [ ! -f .env ]; then
    echo ""
    echo "Creating .env file..."
    cp .env.example .env
    echo "✓ .env file created"
    echo "⚠️  Please edit .env with your configuration"
else
    echo "✓ .env file already exists"
fi

# Install dependencies
echo ""
echo "Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✓ Dependencies installed"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Build TypeScript
echo ""
echo "Building TypeScript..."
npm run build

if [ $? -eq 0 ]; then
    echo "✓ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

echo ""
echo "================================"
echo "✨ Setup completed!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Edit .env with your configuration"
echo "2. Ensure MongoDB is running"
echo "3. Run: npm run dev (development)"
echo "4. Or run: npm start (production)"
echo ""
