# Angular Drawer Component

Drawer is a container component displayed as an overlay.

## Accessibility

Screen Reader Drawer component uses complementary role by default, since any attribute is passed to the root element aria role can be changed depending on your use case and additional attributes like aria-labelledby can be added. In addition aria-modal is added since focus is kept within the drawer when opened. It is recommended to use a trigger component that can be accessed with keyboard such as a button, if not adding tabIndex would be necessary. Trigger element also requires aria-expanded and aria-controls to be handled explicitly. Overlay Keyboard Support Key Function tab Moves focus to the next the focusable element within the drawer. shift + tab Moves focus to the previous the focusable element within the drawer. escape Closes the dialog if closeOnEscape is true. Close Button Keyboard Support Key Function enter Closes the drawer. space Closes the drawer.

## Basic

Drawer is used as a container and visibility is controlled with a binding to visible .

```html
<p-drawer [(visible)]="visible" header="Drawer">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
    </p>
</p-drawer>
<p-button (click)="visible = true" icon="pi pi-arrow-right" />
```

## Full Screen

Drawer can cover the whole page when fullScreen property is enabled.

```html
<p-drawer header="Drawer" [(visible)]="visible" [fullScreen]="true">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
    </p>
</p-drawer>
<p-button (click)="visible = true" icon="pi pi-window-maximize" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-drawer header="Drawer" [(visible)]="visible" [fullScreen]="true">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>
            </p-drawer>
            <p-button (click)="visible = true" icon="pi pi-window-maximize" />
        </div>
    `,
    standalone: true,
    imports: [ButtonModule, DrawerModule]
})
export class DrawerFullscreenDemo {
    visible: boolean = false;
}
```
</details>

## Headless

Headless mode allows you to customize the entire user interface instead of the default elements.

```html
<p-drawer #drawerRef [(visible)]="visible">
    <ng-template #headless>
        <div class="flex flex-col h-full">
            <div class="flex items-center justify-between px-6 pt-4 shrink-0">
                <span class="inline-flex items-center gap-2">
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
                    <span class="font-semibold text-2xl text-primary">Your Logo</span>
                </span>
                <span>
                    <p-button type="button" (click)="closeCallback($event)" icon="pi pi-times" rounded="true" outlined="true" styleClass="h-8 w-8"></p-button>
                </span>
            </div>
            <div class="overflow-y-auto">
                <ul class="list-none p-4 m-0">
                    <li>
                        <div
                            pRipple
                            pStyleClass="@next"
                            enterFromClass="hidden"
                            enterActiveClass="animate-slidedown"
                            leaveToClass="hidden"
                            leaveActiveClass="animate-slideup"
                            class="p-4 flex items-center justify-between text-surface-600 dark:text-surface-200 cursor-pointer p-ripple"
                        >
                            <span class="font-medium">FAVORITES</span>
                            <i class="pi pi-chevron-down"></i>
                        </div>
                        <ul class="list-none p-0 m-0 overflow-hidden">
                            <li>
                                <a pRipple class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple">
                                    <i class="pi pi-home mr-2"></i>
                                    <span class="font-medium">Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a pRipple class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple">
                                    <i class="pi pi-bookmark mr-2"></i>
                                    <span class="font-medium">Bookmarks</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    pRipple
                                    pStyleClass="@next"
                                    enterFromClass="hidden"
                                    enterActiveClass="animate-slidedown"
                                    leaveToClass="hidden"
                                    leaveActiveClass="animate-slideup"
                                    class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple"
                                >
                                    <i class="pi pi-chart-line mr-2"></i>
                                    <span class="font-medium">Reports</span>
                                    <i class="pi pi-chevron-down ml-auto"></i>
                                </a>
                                <ul class="list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all duration-[400ms] ease-in-out">
                                    <li>
                                        <a
                                            pRipple
                                            pStyleClass="@next"
                                            enterFromClass="hidden"
                                            enterActiveClass="animate-slidedown"
                                            leaveToClass="hidden"
                                            leaveActiveClass="animate-slideup"
                                            class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple"
                                        >
                                            <i class="pi pi-chart-line mr-2"></i>
                                            <span class="font-medium">Revenue</span>
                                            <i class="pi pi-chevron-down ml-auto"></i>
                                        </a>
                                        <ul class="list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all duration-[400ms] ease-in-out">
                                            <li>
                                                <a
                                                    pRipple
                                                    class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple"
                                                >
                                                    <i class="pi pi-table mr-2"></i>
                                                    <span class="font-medium">View</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    pRipple
                                                    class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple"
                                                >
                                                    <i class="pi pi-search mr-2"></i>
                                                    <span class="font-medium">Search</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a pRipple class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple">
                                            <i class="pi pi-chart-line mr-2"></i>
                                            <span class="font-medium">Expenses</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a pRipple class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple">
                                    <i class="pi pi-users mr-2"></i>
                                    <span class="font-medium">Team</span>
                                </a>
                            </li>
                            <li>
                                <a pRipple class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple">
                                    <i class="pi pi-comments mr-2"></i>
                                    <span class="font-medium">Messages</span>
                                    <span class="inline-flex items-center justify-center ml-auto bg-primary text-primary-contrast rounded-full" style="min-width: 1.5rem; height: 1.5rem">3</span>
                                </a>
                            </li>
                            <li>
                                <a pRipple class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple">
                                    <i class="pi pi-calendar mr-2"></i>
                                    <span class="font-medium">Calendar</span>
                                </a>
                            </li>
                            <li>
                                <a pRipple class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple">
                                    <i class="pi pi-cog mr-2"></i>
                                    <span class="font-medium">Settings</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="list-none p-4 m-0">
                    <li>
                        <div
                            pRipple
                            pStyleClass="@next"
                            enterFromClass="hidden"
                            enterActiveClass="animate-slidedown"
                            leaveToClass="hidden"
                            leaveActiveClass="animate-slideup"
                            class="p-4 flex items-center justify-between text-surface-600 dark:text-surface-200 cursor-pointer p-ripple"
                        >
                            <span class="font-medium">APPLICATION</span>
                            <i class="pi pi-chevron-down"></i>
                        </div>
                        <ul class="list-none p-0 m-0 overflow-hidden">
                            <li>
                                <a pRipple class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple">
                                    <i class="pi pi-folder mr-2"></i>
                                    <span class="font-medium">Projects</span>
                                </a>
                            </li>
                            <li>
                                <a pRipple class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple">
                                    <i class="pi pi-chart-bar mr-2"></i>
                                    <span class="font-medium">Performance</span>
                                </a>
                            </li>
                            <li>
                                <a pRipple class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple">
                                    <i class="pi pi-cog mr-2"></i>
                                    <span class="font-medium">Settings</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="mt-auto">
                <hr class="mb-4 mx-4 border-t border-0 border-surface" />
                <a pRipple class="m-4 flex items-center cursor-pointer p-4 gap-2 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple">
                    <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" />
                    <span class="font-bold">Amy Elsner</span>
                </a>
            </div>
        </div>
    </ng-template>
</p-drawer>
<p-button (click)="visible = true" icon="pi pi-bars" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { RippleModule } from 'primeng/ripple';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-drawer #drawerRef [(visible)]="visible">
                <ng-template #headless>
                    <div class="flex flex-col h-full">
                        <div class="flex items-center justify-between px-6 pt-4 shrink-0">
                            <span class="inline-flex items-center gap-2">
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
                                <span class="font-semibold text-2xl text-primary">Your Logo</span>
                            </span>
                            <span>
                                <p-button type="button" (click)="closeCallback($event)" icon="pi pi-times" rounded="true" outlined="true" styleClass="h-8 w-8"></p-button>
                            </span>
                        </div>
                        <div class="overflow-y-auto">
                            <ul class="list-none p-4 m-0">
                                <li>
                                    <div
                                        pRipple
                                        pStyleClass="@next"
                                        enterFromClass="hidden"
                                        enterActiveClass="animate-slidedown"
                                        leaveToClass="hidden"
                                        leaveActiveClass="animate-slideup"
                                        class="p-4 flex items-center justify-between text-surface-600 dark:text-surface-200 cursor-pointer p-ripple"
                                    >
                                        <span class="font-medium">FAVORITES</span>
                                        <i class="pi pi-chevron-down"></i>
                                    </div>
                                    <ul class="list-none p-0 m-0 overflow-hidden">
                                        <li>
                                            <a pRipple class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple">
                                                <i class="pi pi-home mr-2"></i>
                                                <span class="font-medium">Dashboard</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a pRipple class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple">
                                                <i class="pi pi-bookmark mr-2"></i>
                                                <span class="font-medium">Bookmarks</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                pRipple
                                                pStyleClass="@next"
                                                enterFromClass="hidden"
                                                enterActiveClass="animate-slidedown"
                                                leaveToClass="hidden"
                                                leaveActiveClass="animate-slideup"
                                                class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple"
                                            >
                                                <i class="pi pi-chart-line mr-2"></i>
                                                <span class="font-medium">Reports</span>
                                                <i class="pi pi-chevron-down ml-auto"></i>
                                            </a>
                                            <ul class="list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all duration-[400ms] ease-in-out">
                                                <li>
                                                    <a
                                                        pRipple
                                                        pStyleClass="@next"
                                                        enterFromClass="hidden"
                                                        enterActiveClass="animate-slidedown"
                                                        leaveToClass="hidden"
                                                        leaveActiveClass="animate-slideup"
                                                        class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple"
                                                    >
                                                        <i class="pi pi-chart-line mr-2"></i>
                                                        <span class="font-medium">Revenue</span>
                                                        <i class="pi pi-chevron-down ml-auto"></i>
                                                    </a>
                                                    <ul class="list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all duration-[400ms] ease-in-out">
                                                        <li>
                                                            <a
                                                                pRipple
                                                                class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple"
                                                            >
                                                                <i class="pi pi-table mr-2"></i>
                                                                <span class="font-medium">View</span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                pRipple
                                                                class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple"
                                                            >
                                                                <i class="pi pi-search mr-2"></i>
                                                                <span class="font-medium">Search</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <a pRipple class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple">
                                                        <i class="pi pi-chart-line mr-2"></i>
                                                        <span class="font-medium">Expenses</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a pRipple class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple">
                                                <i class="pi pi-users mr-2"></i>
                                                <span class="font-medium">Team</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a pRipple class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple">
                                                <i class="pi pi-comments mr-2"></i>
                                                <span class="font-medium">Messages</span>
                                                <span class="inline-flex items-center justify-center ml-auto bg-primary text-primary-contrast rounded-full" style="min-width: 1.5rem; height: 1.5rem">3</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a pRipple class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple">
                                                <i class="pi pi-calendar mr-2"></i>
                                                <span class="font-medium">Calendar</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a pRipple class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple">
                                                <i class="pi pi-cog mr-2"></i>
                                                <span class="font-medium">Settings</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <ul class="list-none p-4 m-0">
                                <li>
                                    <div
                                        pRipple
                                        pStyleClass="@next"
                                        enterFromClass="hidden"
                                        enterActiveClass="animate-slidedown"
                                        leaveToClass="hidden"
                                        leaveActiveClass="animate-slideup"
                                        class="p-4 flex items-center justify-between text-surface-600 dark:text-surface-200 cursor-pointer p-ripple"
                                    >
                                        <span class="font-medium">APPLICATION</span>
                                        <i class="pi pi-chevron-down"></i>
                                    </div>
                                    <ul class="list-none p-0 m-0 overflow-hidden">
                                        <li>
                                            <a pRipple class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple">
                                                <i class="pi pi-folder mr-2"></i>
                                                <span class="font-medium">Projects</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a pRipple class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple">
                                                <i class="pi pi-chart-bar mr-2"></i>
                                                <span class="font-medium">Performance</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a pRipple class="flex items-center cursor-pointer p-4 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple">
                                                <i class="pi pi-cog mr-2"></i>
                                                <span class="font-medium">Settings</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div class="mt-auto">
                            <hr class="mb-4 mx-4 border-t border-0 border-surface" />
                            <a pRipple class="m-4 flex items-center cursor-pointer p-4 gap-2 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple">
                                <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" />
                                <span class="font-bold">Amy Elsner</span>
                            </a>
                        </div>
                    </div>
                </ng-template>
            </p-drawer>
            <p-button (click)="visible = true" icon="pi pi-bars" />
        </div>
    `,
    standalone: true,
    imports: [AvatarModule, ButtonModule, DrawerModule, RippleModule]
})
export class DrawerHeadlessDemo {
    visible: boolean = false;

    closeCallback(e): void {
        this.drawerRef.close(e);
    }
}
```
</details>

## Position

Drawer location is configured with the position property that can take left , right , top and bottom as a value.

```html
<p-drawer header="Left Drawer" [(visible)]="visible1" position="left">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
    </p>
</p-drawer>
<p-drawer header="Right Drawer" [(visible)]="visible2" position="right">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
    </p>
</p-drawer>
<p-drawer header="Top Drawer" [(visible)]="visible3" position="top" [style]="{ height: 'auto' }">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
    </p>
</p-drawer>
<p-drawer header="Bottom Drawer" [(visible)]="visible4" position="bottom" [style]="{ height: 'auto' }">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
    </p>
</p-drawer>
<div class="flex gap-2 justify-center">
    <p-button type="button" (click)="visible1 = true" icon="pi pi-arrow-right" />
    <p-button type="button" (click)="visible2 = true" icon="pi pi-arrow-left" />
    <p-button type="button" (click)="visible3 = true" icon="pi pi-arrow-down" />
    <p-button type="button" (click)="visible4 = true" icon="pi pi-arrow-up" />
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Drawer, DrawerModule } from 'primeng/drawer';

@Component({
    template: `
        <div class="card">
            <p-drawer header="Left Drawer" [(visible)]="visible1" position="left">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>
            </p-drawer>
            <p-drawer header="Right Drawer" [(visible)]="visible2" position="right">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>
            </p-drawer>
            <p-drawer header="Top Drawer" [(visible)]="visible3" position="top" [style]="{ height: 'auto' }">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>
            </p-drawer>
            <p-drawer header="Bottom Drawer" [(visible)]="visible4" position="bottom" [style]="{ height: 'auto' }">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>
            </p-drawer>
            <div class="flex gap-2 justify-center">
                <p-button type="button" (click)="visible1 = true" icon="pi pi-arrow-right" />
                <p-button type="button" (click)="visible2 = true" icon="pi pi-arrow-left" />
                <p-button type="button" (click)="visible3 = true" icon="pi pi-arrow-down" />
                <p-button type="button" (click)="visible4 = true" icon="pi pi-arrow-up" />
            </div>
        </div>
    `,
    standalone: true,
    imports: [ButtonModule, DrawerModule]
})
export class DrawerPositionDemo {
    visible1: boolean = false;
    visible2: boolean = false;
    visible3: boolean = false;
    visible4: boolean = false;
}
```
</details>

## Size

Drawer dimension can be defined with style or class properties, this responsive example utilizes Tailwind.

```html
<p-drawer header="Drawer" [(visible)]="visible" styleClass="!w-full md:!w-80 lg:!w-[30rem]">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
    </p>
</p-drawer>
<p-button (click)="visible = true" icon="pi pi-arrow-right" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-drawer header="Drawer" [(visible)]="visible" styleClass="!w-full md:!w-80 lg:!w-[30rem]">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>
            </p-drawer>
            <p-button (click)="visible = true" icon="pi pi-arrow-right" />
        </div>
    `,
    standalone: true,
    imports: [ButtonModule, DrawerModule]
})
export class DrawerSizeDemo {
    visible: boolean = false;
}
```
</details>

## Template

Drawer is customizable by header , content , footer templates.

```html
<p-drawer [(visible)]="visible" [closable]="false">
    <ng-template #header>
        <div class="flex items-center gap-2">
            <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" />
            <span class="font-bold">Amy Elsner</span>
        </div>
    </ng-template>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
    </p>
    <ng-template #footer>
        <div class="flex items-center gap-2">
            <button pButton label="Account" icon="pi pi-user" class="w-full" outlined></button>
            <button pButton label="Logout" icon="pi pi-sign-out" class="w-full" severity="danger" text></button>
        </div>
    </ng-template>
</p-drawer>
<button pButton (click)="visible = true" icon="pi pi-plus"></button>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-drawer [(visible)]="visible" [closable]="false">
                <ng-template #header>
                    <div class="flex items-center gap-2">
                        <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" />
                        <span class="font-bold">Amy Elsner</span>
                    </div>
                </ng-template>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>
                <ng-template #footer>
                    <div class="flex items-center gap-2">
                        <button pButton label="Account" icon="pi pi-user" class="w-full" outlined></button>
                        <button pButton label="Logout" icon="pi pi-sign-out" class="w-full" severity="danger" text></button>
                    </div>
                </ng-template>
            </p-drawer>
            <button pButton (click)="visible = true" icon="pi pi-plus"></button>
        </div>
    `,
    standalone: true,
    imports: [AvatarModule, DrawerModule, ButtonModule]
})
export class DrawerTemplateDemo {
    visible: boolean = false;
}
```
</details>

## Drawer

Sidebar is a panel component displayed as an overlay at the edges of the screen.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<DrawerPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| appendTo | InputSignal<any> | 'self' | Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |
| motionOptions | InputSignal<MotionOptions> | ... | The motion options. |
| blockScroll | boolean | false | Whether to block scrolling of the document when drawer is active. |
| style | { [klass: string]: any } | - | Inline style of the component. |
| styleClass | string | - | Style class of the component. |
| ariaCloseLabel | string | - | Aria label of the close icon. |
| autoZIndex | boolean | true | Whether to automatically manage layering. |
| baseZIndex | number | 0 | Base zIndex value to use in layering. |
| modal | boolean | true | Whether an overlay mask is displayed behind the drawer. |
| closeButtonProps | ButtonProps | ... | Used to pass all properties of the ButtonProps to the Button component. |
| dismissible | boolean | true | Whether to dismiss drawer on click of the mask. |
| showCloseIcon | boolean | true | Whether to display the close icon. **(Deprecated)** |
| closeOnEscape | boolean | true | Specifies if pressing escape key should hide the drawer. |
| transitionOptions | string | 150ms cubic-bezier(0, 0, 0.2, 1) | Transition options of the animation. **(Deprecated)** |
| visible | boolean | - | The visible property is an input that determines the visibility of the component. |
| position | InputSignal<"right" \| "left" \| "top" \| "bottom" \| "full"> | 'left' | Specifies the position of the drawer, valid values are "left", "right", "bottom" and "top". |
| fullScreen | InputSignal<boolean> | false | Adds a close icon to the header to hide the dialog. |
| header | string | - | Title content of the dialog. |
| maskStyle | { [klass: string]: any } | - | Style of the mask. |
| closable | boolean | true | Whether to display close button. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onShow | value: any | Callback to invoke when dialog is shown. |
| onHide | value: any | Callback to invoke when dialog is hidden. |
| visibleChange | value: boolean | Callback to invoke when dialog visibility is changed. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| header | TemplateRef<void> | Custom header template. |
| footer | TemplateRef<void> | Custom footer template. |
| content | TemplateRef<void> | Custom content template. |
| closeicon | TemplateRef<void> | Custom close icon template. |
| headless | TemplateRef<void> | Custom headless template to replace the entire drawer content. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| header | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the header's DOM element. |
| title | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the title's DOM element. |
| pcCloseButton | ButtonPassThrough | Used to pass attributes to the close Button component. |
| content | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content's DOM element. |
| footer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the footer's DOM element. |
| motion | MotionOptions | Used to pass options to the motion component/directive. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-drawer-mask | Class name of the mask element |
| p-drawer | Class name of the root element |
| p-drawer-header | Class name of the header element |
| p-drawer-title | Class name of the title element |
| p-drawer-close-button | Class name of the close button element |
| p-drawer-content | Class name of the content element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| drawer.background | --p-drawer-background | Background of root |
| drawer.border.color | --p-drawer-border-color | Border color of root |
| drawer.color | --p-drawer-color | Color of root |
| drawer.shadow | --p-drawer-shadow | Shadow of root |
| drawer.header.padding | --p-drawer-header-padding | Padding of header |
| drawer.title.font.size | --p-drawer-title-font-size | Font size of title |
| drawer.title.font.weight | --p-drawer-title-font-weight | Font weight of title |
| drawer.content.padding | --p-drawer-content-padding | Padding of content |
| drawer.footer.padding | --p-drawer-footer-padding | Padding of footer |

