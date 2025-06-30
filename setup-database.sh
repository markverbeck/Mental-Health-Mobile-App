#!/bin/bash

# Mental Health App Database Setup Script
echo "🗄️  Mental Health App Database Setup"
echo "===================================="
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found! Please run ./setup-env.sh first."
    exit 1
fi

# Load environment variables
source .env

echo "📋 Database Setup Options:"
echo "1. Manual setup (copy/paste SQL in Supabase dashboard)"
echo "2. Use Supabase CLI (recommended)"
echo "3. View the schema file"
echo ""

read -p "Choose an option (1-3): " choice

case $choice in
    1)
        echo ""
        echo "📝 Manual Setup Instructions:"
        echo "1. Go to your Supabase dashboard: https://supabase.com/dashboard"
        echo "2. Select your project: $SUPABASE_URL"
        echo "3. Go to 'SQL Editor' in the left sidebar"
        echo "4. Copy the SQL from: docs/DATABASE_SCHEMA.md"
        echo "5. Paste and run the SQL commands"
        echo ""
        echo "✅ Your database will be set up with all tables, policies, and functions!"
        ;;
    2)
        echo ""
        echo "🔧 Supabase CLI Setup:"
        echo "1. Install Supabase CLI: npm install -g supabase"
        echo "2. Login to Supabase: supabase login"
        echo "3. Link your project: supabase link --project-ref $(echo $SUPABASE_URL | sed 's|https://||' | sed 's|.supabase.co||')"
        echo "4. Run the schema: supabase db push"
        echo ""
        echo "Would you like me to help you install the Supabase CLI?"
        read -p "Install Supabase CLI? (y/N): " install_cli
        if [[ $install_cli =~ ^[Yy]$ ]]; then
            echo "Installing Supabase CLI..."
            npm install -g supabase
            echo "✅ Supabase CLI installed!"
            echo "Next: supabase login"
        fi
        ;;
    3)
        echo ""
        echo "📄 Schema file location: docs/DATABASE_SCHEMA.md"
        echo "This file contains:"
        echo "• All table definitions"
        echo "• Row Level Security policies"
        echo "• Functions and triggers"
        echo "• Indexes and constraints"
        echo ""
        echo "You can view it with: cat docs/DATABASE_SCHEMA.md"
        ;;
    *)
        echo "❌ Invalid option. Please choose 1, 2, or 3."
        exit 1
        ;;
esac

echo ""
echo "🎉 Database setup instructions provided!"
echo ""
echo "📚 After setting up the database:"
echo "   1. Test the connection"
echo "   2. Start building your app components"
echo "   3. Run: npx react-native run-ios"
echo "" 