import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateAPIService {
  private apiUrl = `https://v6.exchangerate-api.com/v6/${environment.exchangeRateApiKey}`;

  constructor(private http: HttpClient) {}

  getAvailableCurrencies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/codes`);
  }

  getExchangeRates(baseCurrency: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/latest/${baseCurrency}`);
  }

  convertCurrency(baseCurrency: string, targetCurrency: string, amount: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pair/${baseCurrency}/${targetCurrency}/${amount}`);
  }
}
