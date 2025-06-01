import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
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
    if (!navigator.onLine) {

      const cached = localStorage.getItem('rates_' + baseCurrency);
      return of(cached ? JSON.parse(cached) : null);
    }
    return this.http.get(`${this.apiUrl}/latest/${baseCurrency}`).pipe(
      tap(data => localStorage.setItem('rates_' + baseCurrency, JSON.stringify(data)))
    );
  }

  convertCurrency(baseCurrency: string, targetCurrency: string, amount: number): Observable<any> {
    if (!navigator.onLine) {
      const cached = localStorage.getItem('rates_' + baseCurrency);
      if (cached) {
        const rates = JSON.parse(cached);
        const rate = rates.conversion_rates[targetCurrency];
        if (rate) {
          return of({
            conversion_result: amount * rate,
            usedOfflineRate: true
          });
        }
      }
      return of({
        error: 'Sem conexão e sem taxa salva para esta moeda.'
      });
    }
    return this.http.get(`${this.apiUrl}/pair/${baseCurrency}/${targetCurrency}/${amount}`).pipe(
      tap(() => {
        this.getExchangeRates(baseCurrency).subscribe();
      })
    );
  }
}
