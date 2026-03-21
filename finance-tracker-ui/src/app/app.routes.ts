import { Routes } from '@angular/router';
import { authGuard } from './core/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [authGuard] },
  { path: 'transactions', loadComponent: () => import('./features/transactions/transactions.component').then(m => m.TransactionsComponent), canActivate: [authGuard] },
  { path: 'categories', loadComponent: () => import('./features/categories/categories.component').then(m => m.CategoriesComponent), canActivate: [authGuard] },
  { path: 'budgets', loadComponent: () => import('./features/budgets/budgets.component').then(m => m.BudgetsComponent), canActivate: [authGuard] },
  { path: 'exchange-rates', loadComponent: () => import('./features/exchange-rates/exchange-rates.component').then(m => m.ExchangeRatesComponent), canActivate: [authGuard] },
  { path: '**', redirectTo: 'dashboard' }
];