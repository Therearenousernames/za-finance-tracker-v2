import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BudgetService, Budget } from '../../core/budget';
import { CategoryService, Category } from '../../core/category';
import { TransactionService, Transaction } from '../../core/transaction';


@Component({
  selector: 'app-budgets',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatProgressBarModule
  ],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.css',
})
export class BudgetsComponent implements OnInit {
  budgets: Budget[] = [];
  categories: Category[] = []
  transactions: Transaction[] = [];
  displayedColumns = ['category', 'amount', 'spent', 'progress', 'actions'];
  showForm = false;

  form: Budget = {
    categoryId: 0,
    amount: 0,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  };

  constructor(
    private budgetService: BudgetService,
    private categoryService: CategoryService,
    private transactionService: TransactionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
      this.loadAll();
  }

  loadAll() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
        this.cdr.detectChanges();
      }
    });

    this.transactionService.getAll().subscribe({
      next: (data) => {
        this.transactions = data;
        this.cdr.detectChanges();
      }
    });

    this.budgetService.getAll().subscribe({
      next: (data) => {
        this.budgets = data;
        this.cdr.detectChanges();
      }
    });
  }

  getSpent(budget: Budget): number {
    return this.transactions
    .filter(t => t.categoryId === budget.categoryId)
    .reduce((sum, t) => sum + t.amount, 0);
  }

  getProgress(budget: Budget) : number {
    const spent = this.getSpent(budget);
    return Math.min((spent / budget.amount) * 100, 100);
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  }

  openForm() {
    this.showForm = true;
    this.form = {
      categoryId: 0,
      amount: 0,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    };
  }

  saveBudget() {
    this.budgetService.create(this.form).subscribe({
      next: () => {
        setTimeout(() => {
          this.showForm = false;
          this.loadAll();
        });
      }
    });
  }

  deleteBudget(id: number) {
    this.budgetService.delete(id).subscribe({
      next: () => this.loadAll()
    });
  }

  cancelForm() {
    this.showForm = false;
  }

}
