import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {

  siteName = 'FreshChoice';

  constructor(private _title: Title) { }

  setTitle(pageTitle: string) {
    this._title.setTitle(`${this.siteName} - ${pageTitle}`);
  }
}
