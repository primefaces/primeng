import { routes } from '@/router/app.routes';
import { DesignerService } from '@/service/designerservice';
import Noir from '@/themes/app-theme';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })), // withEnabledBlockingInitialNavigation()
        provideHttpClient(withFetch()),
        providePrimeNG({
            theme: Noir,
            ripple: false
        }),
        MessageService,
        DesignerService,
        ConfirmationService
    ]
};
