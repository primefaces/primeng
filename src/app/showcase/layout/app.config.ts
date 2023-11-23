
import { Router, createUrlTreeFromSnapshot, provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {
    ApplicationConfig,
    inject,
    provideZoneChangeDetection,
  } from '@angular/core';
  import {DOCUMENT} from '@angular/common';
import { InjectionToken } from '@angular/core';

const WINDOW = new InjectionToken<Window>('WINDOW');
function windowProvider(document: Document) {
    return document.defaultView;
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes,
            withInMemoryScrolling({anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'}),
        ), 
        provideHttpClient(withFetch()), 
        provideAnimationsAsync(),
        {
            provide: WINDOW,
            useFactory: (document: Document) => windowProvider(document),
            deps: [DOCUMENT],
        },
        provideZoneChangeDetection({eventCoalescing: true})
    ]
};
