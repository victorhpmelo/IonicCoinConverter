import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone:false,
})
export class TabsPage implements OnInit {
  pageTitle = 'Conversor';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const url = this.router.url;
      if (url.includes('home')) {
        this.pageTitle = 'Conversor';
      } else if (url.includes('history')) {
        this.pageTitle = 'Histórico';
      } else {
        this.pageTitle = '';
      }
    });
  }

  ngOnInit() {
  }

}
