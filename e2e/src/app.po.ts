import { browser, by, element } from 'protractor';

export class PrimengPage {
  navigateTo() {
    return browser.get('/');
  }

  getPROText() {
    return element(by.css('.pro-title')).getText();
  }
}
