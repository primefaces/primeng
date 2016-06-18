import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {AppComponent} from './app.component'
import {APP_ROUTER_PROVIDERS} from './app.routes';
import {enableProdMode} from '@angular/core';
import {LocationStrategy,HashLocationStrategy} from '@angular/common';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import 'rxjs/Rx';

//enableProdMode();
bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  disableDeprecatedForms(),
  provideForms(),
  provide(LocationStrategy, {useClass: HashLocationStrategy})
]);