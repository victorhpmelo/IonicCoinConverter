import { Component } from '@angular/core';
import { ConversionHistoryService } from '../../services/conversion-history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: false,
})
export class HistoryPage {
  history: any[] = [];

  constructor(private historyService: ConversionHistoryService) {}

  ionViewWillEnter() {
    this.history = this.historyService.getHistory();
  }

  clearHistory() {
    this.historyService.clearHistory();
    this.history = [];
  }
}
