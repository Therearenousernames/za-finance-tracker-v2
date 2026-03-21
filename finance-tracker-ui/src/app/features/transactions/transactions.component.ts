import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { TransactionService, Transaction } from '../../core/transaction';
import { CategoryService, Category } from '../../core/category';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-transactions',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    MatDialogModule
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  categories: Category[] = [];
  displayedColumns = ['date', 'description', 'category', 'amount', 'actions'];
  showForm = false;
  isEditing = false;
  selectedId: number | null = null;

  form: Transaction = {
    categoryId: 0,
    amount: 0,
    description: '',
    date: new Date().toISOString().split('T')[0]
  };

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadTransactions();
    this.loadCategories();
  }

  loadTransactions() {
    this.transactionService.getAll().subscribe({
      next: (data) => {
        this.transactions = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to load transactions', err)
    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to load categories', err)
    });
  }

  openForm() {
    this.showForm = true;
    this.isEditing = false;
    this.form = {
      categoryId: 0,
      amount: 0,
      description: '',
      date: new Date().toISOString().split('T')[0]
    };
  }

  editTransaction(transaction: Transaction) {
    this.showForm = true;
    this.isEditing = true;
    this.selectedId = transaction.id!;
    this.form = {
      categoryId: transaction.categoryId,
      amount: transaction.amount,
      description: transaction.description,
      date: transaction.date.split('T')[0]
    };
  }

  saveTransaction() {
  const payload = {
    ...this.form,
    date: new Date(this.form.date).toISOString()
  };

  if (this.isEditing && this.selectedId) {
    this.transactionService.update(this.selectedId, payload).subscribe({
      next: () => {
        setTimeout(() => {
          this.showForm = false;
          this.loadTransactions();
        });
      }
    });
  } else {
    this.transactionService.create(payload).subscribe({
      next: () => {
        setTimeout(() => {
          this.showForm = false;
          this.loadTransactions();
        });
      }
    });
  }
}

  deleteTransaction(id: number) {
    this.transactionService.delete(id).subscribe({
      next: () => this.loadTransactions()
    });
  }

  cancelForm() {
    this.showForm = false;
  }

  getCategoryName(categoryId: number): string {
    const cat = this.categories.find(c => c.id === categoryId);
    return cat ? cat.name : 'Unknown';
  }
}