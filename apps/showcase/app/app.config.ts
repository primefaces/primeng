import { routes } from '@/router/app.routes';
import { DesignerService } from '@/service/designerservice';
import Noir from '@/themes/app-theme';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';

// TODO: will be removed later
const rootPT = ({ instance }) => {
    return {
        class: {
            'ROOTPT-CONFIG': instance.collapsed,
            'p-4': true
        }
    };
};

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })), // withEnabledBlockingInitialNavigation()
        provideHttpClient(withFetch()),
        provideAnimationsAsync(),
        providePrimeNG({
            theme: Noir,
            ripple: false,
            // TODO: will be removed later
            pt: {
                panel: {
                    root: rootPT,
                    header: 'PANELHEADER'
                }
            }
        }),
        MessageService,
        DesignerService,
        ConfirmationService
    ]
};
