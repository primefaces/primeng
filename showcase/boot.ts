import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {AppComponent} from './app.component'
import {ROUTER_PROVIDERS,LocationStrategy,HashLocationStrategy} from 'angular2/router';
import 'rxjs/Rx';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
]);