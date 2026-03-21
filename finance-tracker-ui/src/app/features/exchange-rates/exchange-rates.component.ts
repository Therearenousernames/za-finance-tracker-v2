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
import { ExchangeRateService, ExchangeRateResponse, ConversionResult } from '../../core/exchange-rate';

@Component({
  selector: 'app-exchange-rates',
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
  templateUrl: './exchange-rates.component.html',
  styleUrl: './exchange-rates.component.css',
})
export class ExchangeRatesComponent {
  rates: ExchangeRateResponse | null = null;
  ratesList: { currency: string; rate: number }[] = [];
  displayedColumns = ['currency', 'rate'];

  amount = 1000;
  fromCurrency = 'ZAR';
  toCurrency = 'USD';
  conversionResult: ConversionResult | null = null;
  isLoading = false;

  constructor(private exchangeRateService: ExchangeRateService, private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
    this.loadRates();
  }

  loadRates() {
    this.exchangeRateService.getRates('ZAR')
    .subscribe({
      next: (data) => {
        this.rates = data;
        this.ratesList = Object.entries(data.rates).map(([currency, rate]) => ({
          currency,
          rate,
        }));
        this.cdr.detectChanges(); 
      }
    })
  }

  convert() {
    this.isLoading = true;
    this.exchangeRateService.convert(this.amount, this.fromCurrency, this.toCurrency).subscribe({
      next: (result) => {
        this.conversionResult = result;
        this.isLoading = false;
        this.cdr.detectChanges();
      }, 
      error: (err) => {
        console.error('Conversion failed', err);
        this.isLoading = false;
      }
    })
  }
}

  
