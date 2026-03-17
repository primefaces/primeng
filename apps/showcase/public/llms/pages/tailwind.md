# Tailwind CSS

Integration between PrimeNG and Tailwind CSS.

## Animations-

The plugin also adds extended animation utilities that can be used with the styleclass and animateonscroll directives.

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
    template: `
        <div class="card">
            <p-select [(ngModel)]="animation" [options]="animations" placeholder="Select One" class="w-full sm:w-44" />
            <div class="py-8 overflow-hidden">
                <div [ngClass]="dynamicAnimationClasses"></div>
            </div>
        </div>
        <h3>Animations</h3>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Property</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>animate-fadein</td>
                        <td>fadein 0.15s linear</td>
                    </tr>
                    <tr>
                        <td>animate-fadeout</td>
                        <td>fadeout 0.15s linear</td>
                    </tr>
                    <tr>
                        <td>animate-slidedown</td>
                        <td>slidedown 0.45s ease-in-out</td>
                    </tr>
                    <tr>
                        <td>animate-slideup</td>
                        <td>slideup 0.45s cubic-bezier(0, 1, 0, 1)</td>
                    </tr>
                    <tr>
                        <td>animate-scalein</td>
                        <td>scalein 0.15s linear</td>
                    </tr>
                    <tr>
                        <td>animate-fadeinleft</td>
                        <td>fadeinleft 0.15s linear</td>
                    </tr>
                    <tr>
                        <td>animate-fadeoutleft</td>
                        <td>fadeoutleft 0.15s linear</td>
                    </tr>
                    <tr>
                        <td>animate-fadeinright</td>
                        <td>fadeinright 0.15s linear</td>
                    </tr>
                    <tr>
                        <td>animate-fadeoutright</td>
                        <td>fadeoutright 0.15s linear</td>
                    </tr>
                    <tr>
                        <td>animate-fadeinup</td>
                        <td>fadeinup 0.15s linear</td>
                    </tr>
                    <tr>
                        <td>animate-fadeoutup</td>
                        <td>fadeoutup 0.15s linear</td>
                    </tr>
                    <tr>
                        <td>animate-fadeindown</td>
                        <td>fadeindown 0.15s linear</td>
                    </tr>
                    <tr>
                        <td>animate-fadeoutup</td>
                        <td>fadeoutup 0.15s linear</td>
                    </tr>
                    <tr>
                        <td>animate-width</td>
                        <td>width 0.15s linear</td>
                    </tr>
                    <tr>
                        <td>animate-flip</td>
                        <td>flip 0.15s linear</td>
                    </tr>
                    <tr>
                        <td>animate-flipup</td>
                        <td>flipup 0.15s linear</td>
                    </tr>
                    <tr>
                        <td>animate-flipleft</td>
                        <td>fadein 0.15s linear</td>
                    </tr>
                    <tr>
                        <td>animate-flipright</td>
                        <td>flipright 0.15s linear</td>
                    </tr>
                    <tr>
                        <td>animate-zoomin</td>
                        <td>zoomin 0.15s linear</td>
                    </tr>
                    <tr>
                        <td>animate-zoomindown</td>
                        <td>zoomindown 0.15s linear</td>
                    </tr>
                    <tr>
                        <td>animate-zoominleft</td>
                        <td>zoominleft 0.15s linear</td>
                    </tr>
                    <tr>
                        <td>animate-zoominright</td>
                        <td>zoominright 0.15s linear</td>
                    </tr>
                    <tr>
                        <td>animate-zoominup</td>
                        <td>zoominup 0.15s linear</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Animation Duration</h3>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Property</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>animate-duration-0</td>
                        <td>animation-duration: 0s</td>
                    </tr>
                    <tr>
                        <td>animate-duration-75</td>
                        <td>animation-duration: 75ms</td>
                    </tr>
                    <tr>
                        <td>animate-duration-100</td>
                        <td>animation-duration: 100ms</td>
                    </tr>
                    <tr>
                        <td>animate-duration-200</td>
                        <td>animation-duration: 200ms</td>
                    </tr>
                    <tr>
                        <td>animate-duration-300</td>
                        <td>animation-duration: 300ms</td>
                    </tr>
                    <tr>
                        <td>animate-duration-400</td>
                        <td>animation-duration: 400ms</td>
                    </tr>
                    <tr>
                        <td>animate-duration-500</td>
                        <td>animation-duration: 500ms</td>
                    </tr>
                    <tr>
                        <td>animate-duration-700</td>
                        <td>animation-duration: 700ms</td>
                    </tr>
                    <tr>
                        <td>animate-duration-1000</td>
                        <td>animation-duration: 1000ms</td>
                    </tr>
                    <tr>
                        <td>animate-duration-2000</td>
                        <td>animation-duration: 2000ms</td>
                    </tr>
                    <tr>
                        <td>animate-duration-3000</td>
                        <td>animation-duration: 300ms</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Animation Delay</h3>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Property</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>animate-delay-none</td>
                        <td>animation-duration: 0s</td>
                    </tr>
                    <tr>
                        <td>animate-delay-75</td>
                        <td>animation-delay: 75ms</td>
                    </tr>
                    <tr>
                        <td>animate-delay-100</td>
                        <td>animation-delay: 100ms</td>
                    </tr>
                    <tr>
                        <td>animate-delay-150</td>
                        <td>animation-delay: 150ms</td>
                    </tr>
                    <tr>
                        <td>animate-delay-200</td>
                        <td>animation-delay: 200ms</td>
                    </tr>
                    <tr>
                        <td>animate-delay-300</td>
                        <td>animation-delay: 300ms</td>
                    </tr>
                    <tr>
                        <td>animate-delay-400</td>
                        <td>animation-delay: 400ms</td>
                    </tr>
                    <tr>
                        <td>animate-delay-500</td>
                        <td>animation-delay: 500ms</td>
                    </tr>
                    <tr>
                        <td>animate-delay-700</td>
                        <td>animation-delay: 700ms</td>
                    </tr>
                    <tr>
                        <td>animate-delay-1000</td>
                        <td>animation-delay: 1000ms</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Iteration Count</h3>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Property</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>animate-infinite</td>
                        <td>animation-iteration-count: infinite</td>
                    </tr>
                    <tr>
                        <td>animate-once</td>
                        <td>animation-iteration-count: 1</td>
                    </tr>
                    <tr>
                        <td>animate-twice</td>
                        <td>animation-iteration-count: 2</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Direction</h3>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Property</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>animate-normal</td>
                        <td>animation-direction: normal</td>
                    </tr>
                    <tr>
                        <td>animate-reverse</td>
                        <td>animation-direction: reverse</td>
                    </tr>
                    <tr>
                        <td>animate-alternate</td>
                        <td>animation-direction: alternate</td>
                    </tr>
                    <tr>
                        <td>animate-alternate-reverse</td>
                        <td>animation-direction: alternate-reverse</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Timing Function</h3>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Property</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>animate-ease-linear</td>
                        <td>animation-timing-function: linear</td>
                    </tr>
                    <tr>
                        <td>animate-ease-in</td>
                        <td>animation-timing-function: cubic-bezier(0.4, 0, 1, 1)</td>
                    </tr>
                    <tr>
                        <td>animate-ease-out</td>
                        <td>animation-timing-function: cubic-bezier(0, 0, 0.2, 1)</td>
                    </tr>
                    <tr>
                        <td>animate-ease-in-out</td>
                        <td>animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1)</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Fill Mode</h3>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Property</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>animate-fill-none</td>
                        <td>animation-fill-mode: normal</td>
                    </tr>
                    <tr>
                        <td>animate-fill-forwards</td>
                        <td>animation-fill-mode: forwards</td>
                    </tr>
                    <tr>
                        <td>animate-fill-backwards</td>
                        <td>animation-fill-mode: backwards</td>
                    </tr>
                    <tr>
                        <td>animate-fill-both</td>
                        <td>animation-fill-mode: both</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Play State</h3>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Property</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>animate-running</td>
                        <td>animation-play-state: running</td>
                    </tr>
                    <tr>
                        <td>animate-paused</td>
                        <td>animation-play-state: paused</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Backface Visibility State</h3>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Property</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>backface-visible</td>
                        <td>backface-visibility: visible</td>
                    </tr>
                    <tr>
                        <td>backface-hidden</td>
                        <td>backface-visibility: hidden</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    standalone: true,
    imports: [SelectModule, FormsModule]
})
export class TailwindAnimationsDemo implements OnInit {
    animation: any = null;

    ngOnInit() {
        this.animations = [
            'fadein',
            'fadeout',
            'slideup',
            'scalein',
            'fadeinleft',
            'fadeoutleft',
            'fadeinright',
            'fadeoutright',
            'fadeinup',
            'fadeoutup',
            'width',
            'flipup',
            'flipleft',
            'flipright',
            'zoomin',
            'zoomindown',
            'zoominleft',
            'zoominright',
            'zoominup'
        ];
    }
}
```

## Colorpalette-

PrimeNG color palette as utility classes.

```typescript
import { Component } from '@angular/core';

@Component({
    template: `
        <div class="card">
            <div class="flex flex-col gap-12">
                <ul class="p-0 m-0 list-none flex sm:flex-col gap-4 flex-wrap sm:flex-nowrap">
                    @for (color of colors; track color) {
                        <li [ngStyle]="{ 'min-width': '6rem' }" class="flex-auto">
                            <span class="font-medium capitalize block mb-2 text-center sm:text-left">{{ color }}</span>
                            <div class="flex gap-4 flex-auto flex-col sm:flex-row">
                                @for (shade of shades; track shade) {
                                    <div [ngClass]="{ invisible: color === 'primary' && shade === 0 }" class="flex flex-col items-center gap-1 flex-1">
                                        <div class="rounded-sm h-8 w-full" [ngStyle]="{ 'background-color': 'var(--p-' + color + '-' + shade + ')' }"></div>
                                        <span class="text-sm text-surface-500 dark:text-surface-400 font-medium">{{ shade }}</span>
                                    </div>
                                }
                            </div>
                        </li>
                    }
                </ul>
                <div class="flex gap-6 flex-wrap">
                    <div class="rounded-border p-4 border border-transparent flex items-center justify-center bg-primary hover:bg-primary-emphasis text-primary-contrast font-medium flex-auto transition-colors">primary</div>
                    <div class="rounded-border p-4 border border-transparent flex items-center justify-center bg-highlight hover:bg-highlight-emphasis font-medium flex-auto transition-colors">highlight</div>
                    <div class="rounded-border p-4 border border-surface flex items-center justify-center text-muted-color hover:text-color hover:bg-emphasis font-medium flex-auto transition-colors">box</div>
                </div>
            </div>
        </div>
    `,
    standalone: true,
    imports: []
})
export class TailwindColorPaletteDemo {
    shades: number[] = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    colors: string[] = ['primary', 'surface'];
}
```

## Darkmode-

In styled mode, PrimeNG uses the system as the default darkModeSelector in theme configuration. If you have a dark mode switch in your application, ensure that darkModeSelector is aligned with the Tailwind dark variant for seamless integration. Note that, this particular configuration isn't required if you're utilizing the default system color scheme. Suppose that, the darkModeSelector is set as my-app-dark in PrimeNG. Tailwind v4 Add a custom variant for dark with a custom selector. Tailwind v3 Use the plugins option in your Tailwind config file to configure the plugin.

## Extensions-

The plugin extends the default configuration with a new set of utilities. All variants and breakpoints are supported e.g. dark:sm:hover:bg-primary . Color Palette Class Property primary-[50-950] Primary color palette. surface-[0-950] Surface color palette. primary Default primary color. primary-contrast Default primary contrast color. primary-emphasis Default primary emphasis color. border-surface Default primary emphasis color. bg-emphasis Emphasis background e.g. hovered element. bg-highlight Highlight background. bg-highlight-emphasis Highlight background with emphasis. rounded-border Border radius. text-color Text color with emphasis. text-color-emphasis Default primary emphasis color. text-muted-color Secondary text color. text-muted-color-emphasis Secondary text color with emphasis.

## Form-

Using Tailwind utilities for the responsive layout of a form with PrimeNG components.

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { Country } from '@/domain/customer';

@Component({
    template: `
        <div class="card flex sm:justify-center">
            <div class="flex flex-col gap-6 w-full sm:w-auto">
                <div class="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div class="flex-auto">
                        <label for="firstname" class="block font-semibold mb-2">Firstname</label>
                        <input type="text" pInputText id="firstname" class="w-full" />
                    </div>
                    <div class="flex-auto">
                        <label for="lastname" class="block font-semibold mb-2">Lastname</label>
                        <input type="text" pInputText id="lastname" class="w-full" />
                    </div>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div class="flex-1">
                        <label for="date" class="block font-semibold mb-2">Date</label>
                        <p-datepicker inputId="date" class="w-full" />
                    </div>
                    <div class="flex-1">
                        <label for="country" class="block font-semibold mb-2">Country</label>
                        <p-select [options]="countries" [(ngModel)]="selectedCountry" optionLabel="name" [showClear]="true" placeholder="Select a Country">
                            <ng-template #selectedItem>
                                @if (selectedCountry) {
                                    <div class="flex items-center gap-2">
                                        <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + selectedCountry.code.toLowerCase()" style="width: 18px" />
                                        <div>{{ selectedCountry.name }}</div>
                                    </div>
                                }
                            </ng-template>
                            <ng-template #item let-country>
                                <div class="flex items-center gap-2">
                                    <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" style="width: 18px" />
                                    <div>{{ country.name }}</div>
                                </div>
                            </ng-template>
                        </p-select>
                    </div>
                </div>
                <div class="flex-auto">
                    <label for="message" class="block font-semibold mb-2">Message</label>
                    <textarea pTextarea id="message" class="w-full" rows="4"></textarea>
                </div>
            </div>
        </div>
    `,
    standalone: true,
    imports: [DatePickerModule, SelectModule, InputTextModule, FormsModule]
})
export class TailwindFormDemo implements OnInit {
    countries: any[] | undefined;
    selectedCountry: string | undefined;

    ngOnInit() {
        this.countries = [
            { name: 'Australia', code: 'AU' },
            { name: 'Brazil', code: 'BR' },
            { name: 'China', code: 'CN' },
            { name: 'Egypt', code: 'EG' },
            { name: 'France', code: 'FR' },
            { name: 'Germany', code: 'DE' },
            { name: 'India', code: 'IN' },
            { name: 'Japan', code: 'JP' },
            { name: 'Spain', code: 'ES' },
            { name: 'United States', code: 'US' }
        ];
    }
}
```

## Headless-

A headless PrimeNG dialog with a custom UI.

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-button (click)="showDialog()" icon="pi pi-user" label="Login" />
            <p-dialog maskStyleClass="backdrop-blur-xs" [(visible)]="visible" styleClass="border-0! bg-transparent!">
                <ng-template #headless>
                    <div class="flex flex-col px-8 py-8 gap-6 rounded-2xl" style="border-radius: 12px; background-image: radial-gradient(circle at left top, var(--p-primary-400), var(--p-primary-700))">
                        <svg width="31" height="33" viewBox="0 0 31 33" fill="none" xmlns="http://www.w3.org/2000/svg" class="block mx-auto">
                            <path d="M15.1934 0V0V0L0.0391235 5.38288L2.35052 25.3417L15.1934 32.427V32.427V32.427L28.0364 25.3417L30.3478 5.38288L15.1934 0Z" fill="var(--p-primary-color)" />
                            <mask id="mask0_1_52" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="31" height="33">
                                <path d="M15.1934 0V0V0L0.0391235 5.38288L2.35052 25.3417L15.1934 32.427V32.427V32.427L28.0364 25.3417L30.3478 5.38288L15.1934 0Z" fill="var(--ground-background)" />
                            </mask>
                            <g mask="url(#mask0_1_52)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1935 0V3.5994V3.58318V20.0075V20.0075V32.427V32.427L28.0364 25.3417L30.3478 5.38288L15.1935 0Z" fill="var(--p-primary-color)" />
                            </g>
                            <path d="M19.6399 15.3776L18.1861 15.0547L19.3169 16.6695V21.6755L23.1938 18.4458V12.9554L21.4169 13.6013L19.6399 15.3776Z" fill="var(--ground-background)" />
                            <path d="M10.5936 15.3776L12.0474 15.0547L10.9166 16.6695V21.6755L7.03966 18.4458V12.9554L8.81661 13.6013L10.5936 15.3776Z" fill="var(--ground-background)" />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M11.3853 16.9726L12.6739 15.0309L13.4793 15.5163H16.7008L17.5061 15.0309L18.7947 16.9726V24.254L17.8283 25.7103L16.7008 26.843H13.4793L12.3518 25.7103L11.3853 24.254V16.9726Z"
                                fill="var(--ground-background)"
                            />
                            <path d="M19.3168 24.7437L21.4168 22.6444V20.5451L19.3168 22.3214V24.7437Z" fill="var(--ground-background)" />
                            <path d="M10.9166 24.7437L8.81662 22.6444V20.5451L10.9166 22.3214V24.7437Z" fill="var(--ground-background)" />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M13.0167 5.68861L11.7244 8.7568L13.8244 14.8932H14.7936V5.68861H13.0167ZM15.4397 5.68861V14.8932H16.5706L18.5091 8.7568L17.2167 5.68861H15.4397Z"
                                fill="var(--ground-background)"
                            />
                            <path d="M13.8244 14.8932L6.87813 12.3094L5.90888 8.27235L11.8859 8.7568L13.9859 14.8932H13.8244Z" fill="var(--ground-background)" />
                            <path d="M16.5706 14.8932L23.5169 12.3094L24.4861 8.27235L18.3476 8.7568L16.4091 14.8932H16.5706Z" fill="var(--ground-background)" />
                            <path d="M18.8321 8.27235L22.2245 7.94938L19.9629 5.68861H17.7013L18.8321 8.27235Z" fill="var(--ground-background)" />
                            <path d="M11.4013 8.27235L8.00893 7.94938L10.2705 5.68861H12.5321L11.4013 8.27235Z" fill="var(--ground-background)" />
                        </svg>
                        <div class="inline-flex flex-col gap-2">
                            <label for="username" class="text-primary-50 font-semibold">Username</label>
                            <input pInputText id="username" class="bg-white/20! border-0! p-4! text-primary-50! w-80" />
                        </div>
                        <div class="inline-flex flex-col gap-2">
                            <label for="password" class="text-primary-50 font-semibold">Password</label>
                            <input pInputText id="password" class="bg-white/20! border-0! p-4! text-primary-50! w-80" type="password" />
                        </div>
                        <div class="flex items-center gap-4">
                            <p-button label="Cancel" (click)="closeDialog()" [text]="true" styleClass="p-4! w-full text-primary-50! border! border-white/30! hover:bg-white/10!" class="w-full" />
                            <p-button label="Sign-In" (click)="closeDialog()" [text]="true" styleClass="p-4! w-full text-primary-50! border! border-white/30! hover:bg-white/10!" class="w-full" />
                        </div>
                    </div>
                </ng-template>
            </p-dialog>
        </div>
    `,
    standalone: true,
    imports: [ButtonModule, DialogModule, InputTextModule]
})
export class TailwindHeadlessDemo {
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    closeDialog() {
        this.visible = false;
    }
}
```

## Override-

Tailwind utilities may not be able to override the default styling of components due to css specificity, there are two possible solutions; Import and CSS Layer. Important Use the ! as a prefix to enforce the styling. This is not the recommend approach, and should be used as last resort to avoid adding unnecessary style classes to your bundle. Tailwind v4 Tailwind v3 CSS Layer CSS Layer provides control over the css specificity so that Tailwind utilities can safely override components. Tailwind v4 Ensure primeng layer is after theme and base , but before the other Tailwind layers such as utilities . No change in the CSS configuration is required. Tailwind v3 The primeng layer should be between base and utilities. Tailwind v3 does not use native layer so needs to be defined with CSS.

## Overview-

Tailwind CSS is a popular CSS framework based on a utility-first design. The core provides flexible CSS classes with predefined CSS rules to build your own UI elements. For example, instead of an opinionated btn class as in Bootstrap, Tailwind offers primitive classes like bg-blue-500 , rounded and p-4 to apply a button. A set of reusable classes can also be grouped as a Tailwind CSS component and there are even a couple of libraries that take this approach to build components specifically for Tailwind. Tailwind is an outstanding CSS library, however it lacks a true comprehensive UI suite when combined with Angular, this is where PrimeNG comes in by providing a wide range of highly accessible and feature rich UI component library. The core of PrimeNG does not depend on Tailwind CSS.

## Plugin-

The tailwindcss-primeui is an official plugin by PrimeTek to provide first class integration between a Prime UI library like PrimeNG and Tailwind CSS. It is designed to work both in styled and unstyled modes. In styled mode, for instance the semantic colors such as primary and surfaces are provided as Tailwind utilities e.g. bg-primary , text-surface-500 , text-muted-color . If you haven't already done so, start by integrating Tailwind into your project. Detailed steps for this process can be found in the Tailwind documentation . After successfully installing Tailwind, proceed with the installation of the PrimeUI plugin. This single npm package comes with two libraries: the CSS version is compatible with Tailwind v4, while the JS version is designed for Tailwind v3. Tailwind v4 In the CSS file that contains the tailwindcss import, add the tailwindcss-primeui import as well. For a comprehensive starter guide, review the primeng-quickstart-tailwind repository which demonstrates the integration. Tailwind v3 Use the plugins option in your Tailwind config file to configure the plugin.

