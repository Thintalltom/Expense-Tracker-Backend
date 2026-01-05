Expense Tracker Application
A full-stack Expense Tracker that helps users monitor their finances by tracking income
sources, expense categories, and spending, with automatic balance calculations. The application
features secure authentication and authorization, a Django REST backend, and a Next.js frontend, using Supabase as the NoSQL database.

Features
1. User authentication and authorization
2. Create and manage expense categories
3. Add multiple sources of income
4. Track expenses by category
5. Automatic calculation of remaining balance
6. Secure API endpoints
7. Clean and responsive user interface

Tech Stack
Backend
1. Python
2. Django
3. Django REST Framework
4. Supabase (NoSQL database)
5. JWT / Token-based authentication

Frontend
1. Next.js
2. React
3. TypeScript
4. Tailwind CSS

Project Structure 
expense-tracker/
│
├── Expense-VM/              # Virtual environment
│
├── Expense_Api/             # Backend-related files (root)
│
├── expense_tracker_api/     # Django project & apps
│   ├── manage.py
│   ├── apps/
│   └── ...
│
├── Frontend/                # Frontend root
│   └── my-app/              # Next.js application
│       ├── app/
│       ├── components/
│       └── ...
│
└── README.md

