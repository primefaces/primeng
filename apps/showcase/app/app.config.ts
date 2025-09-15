import { routes } from '@/router/app.routes';
import Noir from '@/themes/app-theme';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { DesignerService } from '@/service/designerservice';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })), // withEnabledBlockingInitialNavigation()
        provideHttpClient(withFetch()),
        provideAnimationsAsync(),
        providePrimeNG({ theme: Noir, ripple: false }),
        MessageService,
        DesignerService,
        ConfirmationService
    ]
};
