#!/bin/bash

echo "🚀 Building Rajasthan Green Energy Solar Website for Netlify..."
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Build successful!"
  echo ""
  echo "📁 Build output is in the 'dist' folder"
  echo ""
  echo "🌐 To deploy to Netlify:"
  echo "   1. Run: netlify deploy --prod"
  echo "   2. Or push to GitHub and connect via Netlify dashboard"
  echo ""
  echo "📖 See DEPLOYMENT.md for detailed instructions"
else
  echo ""
  echo "❌ Build failed. Please check the errors above."
  exit 1
fi
