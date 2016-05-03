import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {AppComponent} from './app.component'
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {enableProdMode} from '@angular/core';
import {LocationStrategy,HashLocationStrategy} from '@angular/common';
import 'rxjs/Rx';

//enableProdMode();
bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
]);