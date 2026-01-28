# Installation

Setting up PrimeNG in an Angular CLI project.

## Download-

PrimeNG is available for download on the npm registry .

```bash
# Using npm
npm install primeng @primeuix/themes

# Using yarn
yarn add primeng @primeuix/themes

# Using pnpm
pnpm add primeng @primeuix/themes
```

## Examples-

An example starter with Angular CLI is available at GitHub .

## Nextsteps-

Welcome to the Prime UI Ecosystem! Once you have PrimeNG up and running, we recommend exploring the following resources to gain a deeper understanding of the library. Global configuration Customization of styles Getting support

## Provider-

Add providePrimeNG to the list of providers in your app.config.ts and use the theme property to configure a theme such as Aura.

```typescript
import { ApplicationConfig } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
    providers: [
        providePrimeNG({
            theme: {
                preset: Aura
            }
        })
    ]
};
```

## Theme-

Configure PrimeNG to use a theme like Aura.

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimationsAsync(),
        providePrimeNG({
            theme: Aura
        })
    ]
};
```

## Verify-

Verify your setup by adding a component such as Button. Each component can be imported and registered individually so that you only include what you use for bundle optimization. Import path is available in the documentation of the corresponding component.

## Videos

Angular CLI is the recommended way to build Angular applications with PrimeNG.

