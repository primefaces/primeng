import {AppModule} from './application';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';

//enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);