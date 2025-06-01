import { Component, OnInit } from '@angular/core';
import { ExchangeRateAPIService } from '../../services/exchange-rate-api.service';
import { ConversionHistoryService } from '../../services/conversion-history.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
  
  
})
export class HomePage {
  currencies: string[] = []; 
  fromCurrency: string = 'BRL'; 
  toCurrency: string = 'USD'; 
  amount: number = 0; 
  convertedAmount: number | null = null; 

  constructor(
    private exchangeRateService: ExchangeRateAPIService,
    private historyService: ConversionHistoryService
  ) {}

  ngOnInit() {
    this.exchangeRateService.getAvailableCurrencies().subscribe({
      next: (data) => {
        console.log('API currencies:', data);
        this.currencies = data.supported_codes.map((code: any) => code[0]);
        this.fromCurrency = this.currencies.includes('BRL') ? 'BRL' : this.currencies[0];
        this.toCurrency = this.currencies.includes('USD') ? 'USD' : this.currencies[1];
      },
      error: (err) => {
        console.error('Erro ao buscar moedas:', err);
      }
    });
  }

  convertCurrency() {
    this.exchangeRateService.convertCurrency(this.fromCurrency, this.toCurrency, this.amount).subscribe((data) => {
      this.convertedAmount = data.conversion_result;
      this.historyService.addConversion({
        from: this.fromCurrency,
        to: this.toCurrency,
        amount: this.amount,
        result: this.convertedAmount,
        date: new Date()
      });
    });
  }

  swapCurrencies() {
    const temp = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = temp;
  }
}
