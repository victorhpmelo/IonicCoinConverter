import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConversionHistoryService {
  private key = 'conversion_history';

  addConversion(conversion: any) {
    const history = this.getHistory();
    history.unshift(conversion);
    localStorage.setItem(this.key, JSON.stringify(history.slice(0, 20))); 
  }

  getHistory(): any[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  clearHistory() {
    localStorage.removeItem(this.key);
  }
}
