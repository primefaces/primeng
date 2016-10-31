import {AppModule} from './app.module';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';

//enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);