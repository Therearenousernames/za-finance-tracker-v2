# ZA Finance Tracker

A full-stack personal finance tracking application built for South African users. Track income and expenses, set budgets, and monitor live ZAR exchange rates.

## Live Demo
Coming soon after deployment.

## Tech Stack

**Back-End**
- C# / .NET 10 Web API
- Entity Framework Core
- PostgreSQL
- JWT Authentication
- BCrypt password hashing

**Front-End**
- Angular 21
- Angular Material
- Chart.js
- TypeScript

**Integrations**
- Frankfurter API (live exchange rates)

## Features
- User registration and login with JWT authentication
- Track income and expense transactions by category
- Set monthly budgets with real-time progress tracking
- Live ZAR exchange rates with currency converter
- Dashboard with income vs expenses bar chart and spending breakdown pie chart

## Architecture
The back-end follows a clean separation of concerns with Controllers, Services, and Repositories. The database schema is normalised to 4NF. The Angular front-end uses standalone components with lazy loading for optimal performance.

## Getting Started

### Prerequisites
- .NET 10 SDK
- Node.js 20+
- PostgreSQL 16

### Back-End Setup
```bash
cd finance-tracker-api
dotnet restore
dotnet ef database update
dotnet run
```

### Front-End Setup
```bash
cd finance-tracker-ui
npm install
ng serve
```

API runs on `http://localhost:5289`
Angular app runs on `http://localhost:4200`

## API Endpoints
- `POST /api/Auth/register` — Register a new user
- `POST /api/Auth/login` — Login and receive JWT token
- `GET/POST/PUT/DELETE /api/Transactions` — Manage transactions
- `GET/POST/DELETE /api/Categories` — Manage categories
- `GET/POST/PUT/DELETE /api/Budgets` — Manage budgets
- `GET /api/Dashboard/summary` — Get monthly summary
- `GET /api/ExchangeRates` — Get live ZAR exchange rates
- `GET /api/ExchangeRates/convert` — Convert between currencies