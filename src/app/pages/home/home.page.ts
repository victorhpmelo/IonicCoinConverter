import { Component } from '@angular/core';
import { ExchangeRateAPIService } from '../../services/exchange-rate-api.service';
import { IonHeader } from "@ionic/angular/standalone";
import { RouterModule } from '@angular/router';

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

  constructor(private exchangeRateService: ExchangeRateAPIService) {}

  
  ionViewDidEnter() {
    this.exchangeRateService.getAvailableCurrencies().subscribe((data) => {
      this.currencies = data.supported_codes.map((code: any) => code[0]); 
    });
  }

  
  convertCurrency() {
    this.exchangeRateService.convertCurrency(this.fromCurrency, this.toCurrency, this.amount).subscribe((data) => {
      this.convertedAmount = data.conversion_result; 
    });
  }

  
  swapCurrencies() {
    const temp = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = temp;
  }
}
