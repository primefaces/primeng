# Configuration

Application wide configuration for PrimeNG.

## Csp-

The nonce value to use on dynamically generated style elements in core.

```typescript
providePrimeNG({ 
    csp: {
        nonce: '...'
    }
})
```

## Dynamic-

Inject the PrimeNG to your application to update the initial configuration at runtime.

```typescript
import { Component, OnInit } from '@angular/core';
import { PrimeNG } from 'primeng/config';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primeng: PrimeNG) {}

    ngOnInit() {
        this.primeng.ripple.set(true);
    }
}
```

## Filtermode-

Default filter modes to display on DataTable filter menus.

```typescript
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
        primengConfig.filterMatchModeOptions = {
            text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
            numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
            date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
        };
    }
}
```

## Inputvariant-

Input fields come in two styles, default is outlined with borders around the field whereas filled alternative adds a background color to the field. A theme such as Material may add more additional design changes per each variant.

## Api

Locale Options

## Repository

Ready to use settings for locales are available at the community supported PrimeLocale repository. We'd appreciate if you could contribute to this repository with pull requests and share it with the rest of the community.

## Runtime

The translations can be changed dynamically at runtime, here is an example with ngx-translate.

```typescript
import { Component, OnInit } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private config: PrimeNG, private translateService: TranslateService) {}

    ngOnInit() {
        this.translateService.setDefaultLang('en');
    }

    translate(lang: string) {
        this.translateService.use(lang);
        this.translateService.get('primeng').subscribe(res => this.primeng.setTranslation(res));
    }
}
```

## Translation

A translation is specified using the translation property during initialization.

```typescript
providePrimeNG({ 
    translation: {
        accept: 'Aceptar',
        reject: 'Rechazar',
        //translations
    }
})
```

## Overlayappendto-

Defines the default location of the overlays; self refers to the host element and body targets the document body. Defaults to self .

## Provider-

The initial configuration is defined by the providePrimeNG provider during application startup.

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimationsAsync(),
        providePrimeNG({ /* options */ })
    ]
};
```

## Ripple-

Ripple is an optional animation for the supported components such as buttons. It is disabled by default.

```typescript
providePrimeNG({ 
    ripple: true
})
```

## Theme-

PrimeNG provides 4 predefined themes out of the box; Aura, Material, Lara and Nora. See the theming documentation for details.

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    prefix: 'p',
                    darkModeSelector: 'system',
                    cssLayer: false
                }
            }
        })
    ]
};
```

## Zindex-

ZIndexes are managed automatically to make sure layering of overlay components work seamlessly when combining multiple components. Still there may be cases where you'd like to configure the configure default values such as a custom layout where header section is fixed. In a case like this, dropdown needs to be displayed below the application header but a modal dialog should be displayed above. PrimeNG configuration offers the zIndex property to customize the default values for components categories. Default values are described below and can be customized when setting up PrimeNG.

```typescript
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
        this.primengConfig.zIndex = {
            modal: 1100,    // dialog, sidebar
            overlay: 1000,  // dropdown, overlaypanel
            menu: 1000,     // overlay menus
            tooltip: 1100   // tooltip
        };
    }
}
```

