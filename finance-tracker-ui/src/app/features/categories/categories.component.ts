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
import { MatDialogModule } from '@angular/material/dialog';
//import { MatChipsModule } from '@angular/material/chips';
import { CategoryService, Category } from '../../core/category';


@Component({
  selector: 'app-categories',
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
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  categories: Category[] = [];
  displayedColumns = ['name', 'type', 'actions'];
  showForm = false;

  form: Category = {
    name: '',
    type: 'Expense',
  }

  constructor(private categoryService: CategoryService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
        this.cdr.detectChanges();
      }
    });
  }

  openForm() {
    this.showForm = true;
    this.form = {
      name: '',
      type: 'Expense',
    };
  }

  saveCategory() {
    this.categoryService.create(this.form).subscribe({
      next: () => {
        setTimeout(() => {
          this.showForm = false;
          this.loadCategories();
        });
      }
    });
  }

  deleteCategory(id: number) {
    this.categoryService.delete(id).subscribe({
      next: () => this.loadCategories()
    });
  }

  cancelForm() {
    this.showForm = false;
  }

}
