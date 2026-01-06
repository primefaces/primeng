# Angular Speed Dial Component

SpeedDial is a floating button with a popup menu.

## Accessibility

Screen Reader SpeedDial component renders a native button element that implicitly includes any passed prop. Text to describe the button can be defined with the aria-labelledby or aria-label props. Addititonally the button includes includes aria-haspopup , aria-expanded for states along with aria-controls to define the relation between the popup and the button. The popup overlay uses menu role on the list and each action item has a menuitem role with an aria-label as the menuitem label. The id of the menu refers to the aria-controls of the button.

## Circle

Items can be displayed around the button when type is set to circle . Additional radius property defines the radius of the circle.

```html
<p-toast />
<p-speeddial [model]="items" [radius]="80" type="circle" [style]="{ position: 'absolute' }" [buttonProps]="{ severity: 'warn', rounded: true }" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    template: `
        <div class="card">
            <div style="position:relative; height: 500px;" class="flex items-center justify-center">
                <p-toast />
                <p-speeddial [model]="items" [radius]="80" type="circle" [style]="{ position: 'absolute' }" [buttonProps]="{ severity: 'warn', rounded: true }" />
            </div>
        </div>
    `,
    standalone: true,
    imports: [SpeedDialModule, ToastModule],
    providers: [MessageService]
})
export class SpeeddialCircleDemo implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.items = [
            {
                icon: 'pi pi-pencil',
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                }
            },
            {
                icon: 'pi pi-refresh',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
                }
            },
            {
                icon: 'pi pi-trash',
                command: () => {
                    this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
                }
            },
            {
                icon: 'pi pi-upload',
                routerLink: ['/fileupload']
            },
            {
                icon: 'pi pi-external-link',
                target: '_blank',
                url: 'https://angular.dev'
            }
        ];
    }
}
```
</details>

## Linear

SpeedDial items are defined with the model property based on MenuModel API. Default orientation of the items is linear and direction property is used to define the position of the items related to the button.

```html
<div style="height: 500px; position: relative;">
    <p-toast />
    <p-speeddial [model]="items" direction="up" [style]="{ position: 'absolute', left: 'calc(50% - 2rem)', bottom: 0 }" />
    <p-speeddial [model]="items" direction="down" [style]="{ position: 'absolute', left: 'calc(50% - 2rem)', top: 0 }" />
    <p-speeddial [model]="items" direction="left" [style]="{ position: 'absolute', top: 'calc(50% - 2rem)', right: 0 }" />
    <p-speeddial [model]="items" direction="right" [style]="{ position: 'absolute', top: 'calc(50% - 2rem)', left: 0 }" />
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    template: `
        <div class="card">
            <div style="height: 500px; position: relative;">
                <p-toast />
                <p-speeddial [model]="items" direction="up" [style]="{ position: 'absolute', left: 'calc(50% - 2rem)', bottom: 0 }" />
                <p-speeddial [model]="items" direction="down" [style]="{ position: 'absolute', left: 'calc(50% - 2rem)', top: 0 }" />
                <p-speeddial [model]="items" direction="left" [style]="{ position: 'absolute', top: 'calc(50% - 2rem)', right: 0 }" />
                <p-speeddial [model]="items" direction="right" [style]="{ position: 'absolute', top: 'calc(50% - 2rem)', left: 0 }" />
            </div>
        </div>
    `,
    standalone: true,
    imports: [SpeedDialModule, ToastModule],
    providers: [MessageService]
})
export class SpeeddialLinearDemo implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.items = [
            {
                icon: 'pi pi-pencil',
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                }
            },
            {
                icon: 'pi pi-refresh',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
                }
            },
            {
                icon: 'pi pi-trash',
                command: () => {
                    this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
                }
            },
            {
                icon: 'pi pi-upload',
                routerLink: ['/fileupload']
            },
            {
                icon: 'pi pi-external-link',
                target: '_blank',
                url: 'https://angular.dev'
            }
        ];
    }
}
```
</details>

## Mask

Adding mask property displays a modal layer behind the popup items.

```html
<div [style]="{ position: 'relative', height: '350px' }">
    <p-toast />
    <p-speeddial [model]="items" direction="up" mask [style]="{ position: 'absolute', right: '1rem', bottom: '1rem' }" />
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    template: `
        <div class="card p-4">
            <div [style]="{ position: 'relative', height: '350px' }">
                <p-toast />
                <p-speeddial [model]="items" direction="up" mask [style]="{ position: 'absolute', right: '1rem', bottom: '1rem' }" />
            </div>
        </div>
    `,
    standalone: true,
    imports: [SpeedDialModule, ToastModule],
    providers: [MessageService]
})
export class SpeeddialMaskDemo implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.items = [
            {
                icon: 'pi pi-pencil',
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                }
            },
            {
                icon: 'pi pi-refresh',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
                }
            },
            {
                icon: 'pi pi-trash',
                command: () => {
                    this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
                }
            },
            {
                icon: 'pi pi-upload',
                routerLink: ['/fileupload']
            },
            {
                icon: 'pi pi-external-link',
                target: '_blank',
                url: 'https://angular.dev'
            }
        ];
    }
}
```
</details>

## Quarter Circle

When type is defined as quarter-circle , items are displayed in a half-circle around the button.

```html
<div style="position: relative; height: 500px">
    <p-toast />
    <p-speeddial [model]="items" [radius]="120" type="quarter-circle" direction="up-left" [style]="{ position: 'absolute', right: 0, bottom: 0 }" />
    <p-speeddial [model]="items" [radius]="120" type="quarter-circle" direction="up-right" [style]="{ position: 'absolute', left: 0, bottom: 0 }" />
    <p-speeddial [model]="items" [radius]="120" type="quarter-circle" direction="down-left" [style]="{ position: 'absolute', right: 0, top: 0 }" />
    <p-speeddial [model]="items" [radius]="120" type="quarter-circle" direction="down-right" [style]="{ position: 'absolute', left: 0, top: 0 }" />
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    template: `
        <div class="card">
            <div style="position: relative; height: 500px">
                <p-toast />
                <p-speeddial [model]="items" [radius]="120" type="quarter-circle" direction="up-left" [style]="{ position: 'absolute', right: 0, bottom: 0 }" />
                <p-speeddial [model]="items" [radius]="120" type="quarter-circle" direction="up-right" [style]="{ position: 'absolute', left: 0, bottom: 0 }" />
                <p-speeddial [model]="items" [radius]="120" type="quarter-circle" direction="down-left" [style]="{ position: 'absolute', right: 0, top: 0 }" />
                <p-speeddial [model]="items" [radius]="120" type="quarter-circle" direction="down-right" [style]="{ position: 'absolute', left: 0, top: 0 }" />
            </div>
        </div>
    `,
    standalone: true,
    imports: [SpeedDialModule, ToastModule],
    providers: [MessageService]
})
export class SpeeddialQuartercircleDemo implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.items = [
            {
                icon: 'pi pi-pencil',
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                }
            },
            {
                icon: 'pi pi-refresh',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
                }
            },
            {
                icon: 'pi pi-trash',
                command: () => {
                    this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
                }
            },
            {
                icon: 'pi pi-upload',
                routerLink: ['/fileupload']
            },
            {
                icon: 'pi pi-external-link',
                target: '_blank',
                url: 'https://angular.dev'
            }
        ];
    }
}
```
</details>

## Semi Circle

When type is defined as semi-circle , items are displayed in a half-circle around the button.

```html
<div style="position: relative; height: 500px">
    <p-toast />
    <p-speeddial [model]="items" [radius]="80" type="semi-circle" direction="down" [style]="{ position: 'absolute', left: 'calc(50% - 2rem)', top: 0 }" />
    <p-speeddial [model]="items" [radius]="80" type="semi-circle" direction="right" [style]="{ position: 'absolute', top: 'calc(50% - 2rem)', left: 0 }" />
    <p-speeddial [model]="items" [radius]="80" type="semi-circle" direction="left" [style]="{ position: 'absolute', top: 'calc(50% - 2rem)', right: 0 }" />
    <p-speeddial [model]="items" [radius]="80" type="semi-circle" direction="up" [style]="{ position: 'absolute', left: 'calc(50% - 2rem)', bottom: 0 }" />
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    template: `
        <div class="card">
            <div style="position: relative; height: 500px">
                <p-toast />
                <p-speeddial [model]="items" [radius]="80" type="semi-circle" direction="down" [style]="{ position: 'absolute', left: 'calc(50% - 2rem)', top: 0 }" />
                <p-speeddial [model]="items" [radius]="80" type="semi-circle" direction="right" [style]="{ position: 'absolute', top: 'calc(50% - 2rem)', left: 0 }" />
                <p-speeddial [model]="items" [radius]="80" type="semi-circle" direction="left" [style]="{ position: 'absolute', top: 'calc(50% - 2rem)', right: 0 }" />
                <p-speeddial [model]="items" [radius]="80" type="semi-circle" direction="up" [style]="{ position: 'absolute', left: 'calc(50% - 2rem)', bottom: 0 }" />
            </div>
        </div>
    `,
    standalone: true,
    imports: [SpeedDialModule, ToastModule],
    providers: [MessageService]
})
export class SpeeddialSemicircleDemo implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.items = [
            {
                icon: 'pi pi-pencil',
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                }
            },
            {
                icon: 'pi pi-refresh',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
                }
            },
            {
                icon: 'pi pi-trash',
                command: () => {
                    this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
                }
            },
            {
                icon: 'pi pi-upload',
                routerLink: ['/fileupload']
            },
            {
                icon: 'pi pi-external-link',
                target: '_blank',
                url: 'https://angular.dev'
            }
        ];
    }
}
```
</details>

## Template

SpeedDial offers item customization with the item template that receives the menuitem instance from the model as a parameter. The button has its own button template, additional template named icon is provided to embed icon content for default button.

```html
<div class="flex items-end justify-center" style="position: 'relative'; height: '400px'">
    <p-toast />
    <p-speeddial [model]="items" direction="up" [transitionDelay]="80" style="position: 'absolute'">
        <ng-template #button let-toggleCallback="toggleCallback">
            <p-button outlined styleClass="border" (click)="toggleCallback($event)">
                <svg width="31" height="33" viewBox="0 0 31 33" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            </p-button>
        </ng-template>
        <ng-template #item let-item let-toggleCallback="toggleCallback">
            <div class="flex flex-col items-center justify-between gap-2 p-2 border rounded border-surface-200 dark:border-surface-700 w-20 cursor-pointer" (click)="toggleCallback($event, item)">
                <span [class]="item.icon"></span>
                <span>
                    {{ item.label }}
                </span>
            </div>
        </ng-template>
    </p-speeddial>
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    template: `
        <div class="card">
            <div class="flex items-end justify-center" style="position: 'relative'; height: '400px'">
                <p-toast />
                <p-speeddial [model]="items" direction="up" [transitionDelay]="80" style="position: 'absolute'">
                    <ng-template #button let-toggleCallback="toggleCallback">
                        <p-button outlined styleClass="border" (click)="toggleCallback($event)">
                            <svg width="31" height="33" viewBox="0 0 31 33" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                        </p-button>
                    </ng-template>
                    <ng-template #item let-item let-toggleCallback="toggleCallback">
                        <div class="flex flex-col items-center justify-between gap-2 p-2 border rounded border-surface-200 dark:border-surface-700 w-20 cursor-pointer" (click)="toggleCallback($event, item)">
                            <span [class]="item.icon"></span>
                            <span>
                                {{ item.label }}
                            </span>
                        </div>
                    </ng-template>
                </p-speeddial>
            </div>
        </div>
    `,
    standalone: true,
    imports: [ButtonModule, SpeedDialModule, ToastModule],
    providers: [MessageService]
})
export class SpeeddialTemplateDemo implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Add',
                icon: 'pi pi-pencil',
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                }
            },
            {
                label: 'Update',
                icon: 'pi pi-refresh',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
                }
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => {
                    this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
                }
            },
            {
                label: 'Upload',
                icon: 'pi pi-upload',
                command: () => {
                    this.router.navigate(['/fileupload']);
                }
            },
            {
                label: 'Website',
                icon: 'pi pi-external-link',
                command: () => {
                    window.open('https://angular.io/', '_blank');
                }
            }
        ];
    }
}
```
</details>

## Tooltip

Items display a tooltip on hover when a standalone Tooltip is present with a target that matches the items.

```html
<div [style]="{ position: 'relative', height: '350px' }">
    <p-toast />
    <p-speeddial [model]="items" direction="up" [style]="{ position: 'absolute', right: 0, bottom: 0 }" [buttonProps]="{ severity: 'help', rounded: true }" [tooltipOptions]="{ tooltipPosition: 'left' }" />
    <p-speeddial [model]="items" direction="up" [style]="{ position: 'absolute', left: 0, bottom: 0 }" [buttonProps]="{ severity: 'danger', rounded: true }" [tooltipOptions]="{ tooltipPosition: 'right' }" />
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    template: `
        <div class="card">
            <div [style]="{ position: 'relative', height: '350px' }">
                <p-toast />
                <p-speeddial [model]="items" direction="up" [style]="{ position: 'absolute', right: 0, bottom: 0 }" [buttonProps]="{ severity: 'help', rounded: true }" [tooltipOptions]="{ tooltipPosition: 'left' }" />
                <p-speeddial [model]="items" direction="up" [style]="{ position: 'absolute', left: 0, bottom: 0 }" [buttonProps]="{ severity: 'danger', rounded: true }" [tooltipOptions]="{ tooltipPosition: 'right' }" />
            </div>
        </div>
    `,
    standalone: true,
    imports: [SpeedDialModule, ToastModule],
    providers: [MessageService]
})
export class SpeeddialTooltipDemo implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Add',
                icon: 'pi pi-pencil',
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                }
            },
            {
                label: 'Update',
                icon: 'pi pi-refresh',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
                }
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => {
                    this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
                }
            },
            {
                label: 'Upload',
                icon: 'pi pi-upload',
                command: () => {
                    this.router.navigate(['/fileupload']);
                }
            },
            {
                label: 'Angular.dev',
                icon: 'pi pi-external-link',
                target: '_blank',
                url: 'https://angular.dev'
            }
        ];
    }
}
```
</details>

## Speed Dial

When pressed, a floating action button can display multiple primary actions that can be performed on a page.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<SpeedDialPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| id | string | - | List of items id. |
| model | MenuItem[] | null | MenuModel instance to define the action items. |
| visible | boolean | - | Specifies the visibility of the overlay. |
| style | { [klass: string]: any } | - | Inline style of the element. |
| className | string | - | Style class of the element. |
| transitionDelay | number | 30 | Transition delay step for each action item. |
| type | "circle" \| "linear" \| "semi-circle" \| "quarter-circle" | linear | Specifies the opening type of actions. |
| radius | number | 0 | Radius for *circle types. |
| mask | boolean | false | Whether to show a mask element behind the speeddial. |
| disabled | boolean | false | Whether the component is disabled. |
| hideOnClickOutside | boolean | true | Whether the actions close when clicked outside. |
| buttonStyle | { [klass: string]: any } | - | Inline style of the button element. |
| buttonClassName | string | - | Style class of the button element. |
| maskStyle | { [klass: string]: any } | - | Inline style of the mask element. |
| maskClassName | string | - | Style class of the mask element. |
| showIcon | string | - | Show icon of the button element. |
| hideIcon | string | - | Hide icon of the button element. |
| rotateAnimation | boolean | true | Defined to rotate showIcon when hideIcon is not present. |
| ariaLabel | string | - | Defines a string value that labels an interactive element. |
| ariaLabelledBy | string | - | Identifier of the underlying input element. |
| tooltipOptions | TooltipOptions | - | Whether to display the tooltip on items. The modifiers of Tooltip can be used like an object in it. Valid keys are 'event' and 'position'. |
| buttonProps | ButtonProps | - | Used to pass all properties of the ButtonProps to the Button component. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onVisibleChange | value: boolean | Fired when the visibility of element changed. |
| visibleChange | value: boolean | Fired when the visibility of element changed. |
| onClick | event: MouseEvent | Fired when the button element clicked. |
| onShow | event: Event | Fired when the actions are visible. |
| onHide | event: Event | Fired when the actions are hidden. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| button | TemplateRef<SpeedDialButtonTemplateContext> | Custom button template. |
| item | TemplateRef<SpeedDialItemTemplateContext> | Custom item template. |
| icon | TemplateRef<void> | Custom icon template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| pcButton | ButtonPassThrough | Used to pass attributes to the Button component. |
| list | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the list's DOM element. |
| item | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the item's DOM element. |
| pcAction | ButtonPassThrough | Used to pass attributes to the action's Button component. |
| actionIcon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the action icon's DOM element. |
| mask | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the mask's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-speeddial | Class name of the root element |
| p-speeddial-button | Class name of the button element |
| p-speeddial-list | Class name of the list element |
| p-speeddial-item | Class name of the item element |
| p-speeddial-action | Class name of the action element |
| p-speeddial-action-icon | Class name of the action icon element |
| p-speeddial-mask | Class name of the mask element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| speeddial.gap | --p-speeddial-gap | Gap of root |
| speeddial.transition.duration | --p-speeddial-transition-duration | Transition duration of root |

