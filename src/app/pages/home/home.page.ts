import { Component, OnInit } from '@angular/core';
import { ExchangeRateAPIService } from '../../services/exchange-rate-api.service';
import { ConversionHistoryService } from '../../services/conversion-history.service';
import { AlertController } from '@ionic/angular';

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
  amount: number | null = null; 
  convertedAmount: number | null = null; 

  constructor(
    private exchangeRateService: ExchangeRateAPIService,
    private historyService: ConversionHistoryService,
    private alertController: AlertController
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

  async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Erro',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async convertCurrency() {
    if (this.amount === null || this.amount === undefined || this.amount <= 0) {
      const alert = await this.alertController.create({
        header: 'Valor inválido',
        message: 'O valor para conversão deve ser maior que zero.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.exchangeRateService.convertCurrency(this.fromCurrency, this.toCurrency, this.amount).subscribe((data) => {
      if (data.error) {
        this.showErrorAlert(data.error);
        return;
      }
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
