import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ExchangeRateResponse {
  base: string;
  date: string;
  rates: { [key: string]: number };
}

export interface ConversionResult {
  from: string;
  to: string;
  originalAmount: number;
  convertedAmount: number;
  rate: number;
}

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private apiUrl = 'https://za-finance-tracker.onrender.com/api/ExchangeRates';
  
  constructor(private http: HttpClient) {}

  getRates(baseCurrency: string = 'ZAR'): Observable<ExchangeRateResponse> {
    return this.http.get<ExchangeRateResponse>(`${this.apiUrl}?base=${baseCurrency}`);
  }

  convert(amount: number, from: string, to: string): Observable<ConversionResult> {
    return this.http.get<ConversionResult>(`${this.apiUrl}/convert?amount=${amount}&from=${from}&to=${to}`);
  }

}
