import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface DashboardSummary {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  spendingByCategory: { category: string; total: number }[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    DecimalPipe,
    MatIconModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  @ViewChild('barChart') barChartRef!: ElementRef;
  @ViewChild('pieChart') pieChartRef!: ElementRef;

  summary: DashboardSummary = {
    totalIncome: 0,
    totalExpenses: 0,
    netBalance: 0,
    spendingByCategory: []
  };

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
  this.http.get<DashboardSummary>('http://localhost:5289/api/Dashboard/summary')
    .subscribe({
      next: (data) => {
        console.log('Dashboard data: ', data);
        this.summary = { ...data };
        console.log('Updated summary: ', this.summary);

        this.cdr.detectChanges();

        setTimeout(() => {
          this.renderBarChart(data);
        }, 100);

        if (data.spendingByCategory.length > 0) {
          setTimeout(() => {
            if (this.pieChartRef) {
              this.renderPieChart(data);
            }
          }, 200);
        }
      },
      error: (err) => console.error('Failed to load dashboard', err)
    });
}

  renderBarChart(data: DashboardSummary) {
    new Chart(this.barChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['This Month'],
        datasets: [
          { label: 'Income', data: [data.totalIncome], backgroundColor: '#4caf50' },
          { label: 'Expenses', data: [data.totalExpenses], backgroundColor: '#f44336' }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'top' } }
      }
    });
  }

  renderPieChart(data: DashboardSummary) {
    new Chart(this.pieChartRef.nativeElement, {
      type: 'pie',
      data: {
        labels: data.spendingByCategory.map(s => s.category),
        datasets: [{
          data: data.spendingByCategory.map(s => s.total),
          backgroundColor: ['#3f51b5', '#f44336', '#ff9800', '#4caf50', '#9c27b0']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }
}