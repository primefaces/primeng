import { routes } from '@/router/app.routes';
import Noir from '@/themes/app-theme';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { providePrimeNgConfig } from 'primeng/api';

export const appConfig: ApplicationConfig = {
    providers: [
        providePrimeNgConfig({ theme: Noir, ripple: true, inputStyle: 'outlined' }),
        provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withFetch()),
        provideAnimationsAsync()
    ]
};
