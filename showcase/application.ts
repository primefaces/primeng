
// import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

// import { AppModule } from './app.module';

// //enableProdMode();
// platformBrowserDynamic().bootstrapModule(AppModule);


import {platformBrowser} from '@angular/platform-browser';

import { AppModuleNgFactory } from '../compiled/showcase/app.module.ngfactory';

//enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);

