# Angular SplitButton Component

SplitButton groups a set of commands in an overlay with a default action item.

## Accessibility

Screen Reader SplitButton component renders two native button elements, main button uses the label property to define aria-label by default which can be customized with buttonProps . Dropdown button requires an explicit definition to describe it using menuButtonProps option and also includes aria-haspopup , aria-expanded for states along with aria-controls to define the relation between the popup and the button. The popup overlay uses menu role on the list and each action item has a menuitem role with an aria-label as the menuitem label. The id of the menu refers to the aria-controls of the dropdown button.

## Basic

SplitButton has a default action button and a collection of additional options defined by the model property based on MenuModel API.

```html
<p-toast />
<p-splitbutton label="Save" (onClick)="save()" [model]="items" />
```

## Disabled

When the disabled attribute is present, the element is uneditable and unfocused. Additionally, the disabled states of the button and menu button can be handled independently. The button is disabled when buttonDisabled is present, and the menu button is disabled when menuButtonDisabled is present.

```html
<p-toast />
<p-splitbutton label="Save" icon="pi pi-plus" (onClick)="save('info')" [model]="items" [disabled]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-toast />
            <p-splitbutton label="Save" icon="pi pi-plus" (onClick)="save('info')" [model]="items" [disabled]="true" />
        </div>
    `,
    standalone: true,
    imports: [SplitButtonModule, ToastModule],
    providers: [MessageService]
})
export class SplitbuttonDisabledDemo {
    constructor(private messageService: MessageService) {
        this.items = [
                    {
                        label: 'Update',
                        command: () => {
                            this.update();
                        }
                    },
                    {
                        label: 'Delete',
                        command: () => {
                            this.delete();
                        }
                    },
                    { label: 'Angular.dev', url: 'https://angular.dev' },
                    { separator: true },
                    { label: 'Upload', routerLink: ['/fileupload'] }
                ];
    }

    save(severity: string) {
        this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
    }

    update() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
    }

    delete() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Deleted' });
    }
}
```
</details>

## Icons

The buttons and menuitems have support to display icons.

```html
<p-toast />
<p-splitbutton label="Save" icon="pi pi-check" dropdownIcon="pi pi-cog" [model]="items" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-toast />
            <p-splitbutton label="Save" icon="pi pi-check" dropdownIcon="pi pi-cog" [model]="items" />
        </div>
    `,
    standalone: true,
    imports: [SplitButtonModule, ToastModule],
    providers: [MessageService]
})
export class SplitbuttonIconsDemo {
    items: MenuItem[];

    constructor(private messageService: MessageService) {
        this.items = [
                    {
                        label: 'Update',
                        icon: 'pi pi-refresh',
                        command: () => {
                            this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
                        }
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-times',
                        command: () => {
                            this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
                        }
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'Quit',
                        icon: 'pi pi-power-off',
                        command: () => {
                            window.open('https://angular.io/', '_blank');
                        }
                    }
                ];
    }
}
```
</details>

## Nested

SplitButton has a default action button and a collection of additional options defined by the model property based on MenuModel API.

```html
<p-toast />
<p-splitbutton label="Save" (onClick)="save('info')" [model]="items" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-toast />
            <p-splitbutton label="Save" (onClick)="save('info')" [model]="items" />
        </div>
    `,
    standalone: true,
    imports: [SplitButtonModule, ToastModule],
    providers: [MessageService]
})
export class SplitbuttonNestedDemo {
    items: MenuItem[];

    constructor(private messageService: MessageService) {
        this.items = [
                    {
                        label: 'File',
                        icon: 'pi pi-fw pi-file',
                        items: [
                            {
                                label: 'New',
                                icon: 'pi pi-fw pi-plus',
                                items: [
                                    {
                                        label: 'Bookmark',
                                        icon: 'pi pi-fw pi-bookmark'
                                    },
                                    {
                                        label: 'Video',
                                        icon: 'pi pi-fw pi-video'
                                    }
                                ]
                            },
                            {
                                label: 'Delete',
                                icon: 'pi pi-fw pi-trash'
                            },
                            {
                                separator: true
                            },
                            {
                                label: 'Export',
                                icon: 'pi pi-fw pi-external-link'
                            }
                        ]
                    },
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            {
                                label: 'Left',
                                icon: 'pi pi-fw pi-align-left'
                            },
                            {
                                label: 'Right',
                                icon: 'pi pi-fw pi-align-right'
                            },
                            {
                                label: 'Center',
                                icon: 'pi pi-fw pi-align-center'
                            },
                            {
                                label: 'Justify',
                                icon: 'pi pi-fw pi-align-justify'
                            }
                        ]
                    },
                    {
                        label: 'Users',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'New',
                                icon: 'pi pi-fw pi-user-plus'
                            },
                            {
                                label: 'Delete',
                                icon: 'pi pi-fw pi-user-minus'
                            },
                            {
                                label: 'Search',
                                icon: 'pi pi-fw pi-users',
                                items: [
                                    {
                                        label: 'Filter',
                                        icon: 'pi pi-fw pi-filter',
                                        items: [
                                            {
                                                label: 'Print',
                                                icon: 'pi pi-fw pi-print'
                                            }
                                        ]
                                    },
                                    {
                                        icon: 'pi pi-fw pi-bars',
                                        label: 'List'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Events',
                        icon: 'pi pi-fw pi-calendar',
                        items: [
                            {
                                label: 'Edit',
                                icon: 'pi pi-fw pi-pencil',
                                items: [
                                    {
                                        label: 'Save',
                                        icon: 'pi pi-fw pi-calendar-plus'
                                    },
                                    {
                                        label: 'Delete',
                                        icon: 'pi pi-fw pi-calendar-minus'
                                    }
                                ]
                            },
                            {
                                label: 'Archieve',
                                icon: 'pi pi-fw pi-calendar-times',
                                items: [
                                    {
                                        label: 'Remove',
                                        icon: 'pi pi-fw pi-calendar-minus'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'Quit',
                        icon: 'pi pi-fw pi-power-off'
                    }
                ];
    }

    save(severity: string) {
        this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
    }
}
```
</details>

## Outlined

Outlined buttons display a border without a background initially.

```html
<p-toast />
<p-splitbutton label="Primary" [model]="items" (onClick)="save('info')" outlined />
<p-splitbutton label="Secondary" [model]="items" (onClick)="save('info')" outlined severity="secondary" />
<p-splitbutton label="Success" [model]="items" (onClick)="save('info')" outlined severity="success" />
<p-splitbutton label="Info" [model]="items" (onClick)="save('info')" outlined severity="info" />
<p-splitbutton label="Warning" [model]="items" (onClick)="save('info')" outlined severity="warn" />
<p-splitbutton label="Help" [model]="items" (onClick)="save('info')" outlined severity="help" />
<p-splitbutton label="Danger" [model]="items" (onClick)="save('info')" outlined severity="danger" />
<p-splitbutton label="Contrast" [model]="items" (onClick)="save('info')" outlined severity="contrast" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    template: `
        <div class="card flex justify-center flex-wrap gap-4">
            <p-toast />
            <p-splitbutton label="Primary" [model]="items" (onClick)="save('info')" outlined />
            <p-splitbutton label="Secondary" [model]="items" (onClick)="save('info')" outlined severity="secondary" />
            <p-splitbutton label="Success" [model]="items" (onClick)="save('info')" outlined severity="success" />
            <p-splitbutton label="Info" [model]="items" (onClick)="save('info')" outlined severity="info" />
            <p-splitbutton label="Warning" [model]="items" (onClick)="save('info')" outlined severity="warn" />
            <p-splitbutton label="Help" [model]="items" (onClick)="save('info')" outlined severity="help" />
            <p-splitbutton label="Danger" [model]="items" (onClick)="save('info')" outlined severity="danger" />
            <p-splitbutton label="Contrast" [model]="items" (onClick)="save('info')" outlined severity="contrast" />
        </div>
    `,
    standalone: true,
    imports: [SplitButtonModule, ToastModule],
    providers: [MessageService]
})
export class SplitbuttonOutlinedDemo {
    items: MenuItem[];

    constructor(private messageService: MessageService) {
        this.items = [
                    {
                        label: 'Update',
                        command: () => {
                            this.update();
                        }
                    },
                    {
                        label: 'Delete',
                        command: () => {
                            this.delete();
                        }
                    },
                    { label: 'Angular.dev', url: 'https://angular.dev' },
                    { separator: true },
                    { label: 'Upload', routerLink: ['/fileupload'] }
                ];
    }

    save(severity: string) {
        this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
    }

    update() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
    }

    delete() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Deleted' });
    }
}
```
</details>

## Raised

Raised buttons display a shadow to indicate elevation.

```html
<p-toast />
<p-splitbutton label="Primary" [model]="items" (onClick)="save('info')" raised />
<p-splitbutton label="Secondary" [model]="items" (onClick)="save('info')" raised severity="secondary" />
<p-splitbutton label="Success" [model]="items" (onClick)="save('info')" raised severity="success" />
<p-splitbutton label="Info" [model]="items" (onClick)="save('info')" raised severity="info" />
<p-splitbutton label="Warning" [model]="items" (onClick)="save('info')" raised severity="warn" />
<p-splitbutton label="Help" [model]="items" (onClick)="save('info')" raised severity="help" />
<p-splitbutton label="Danger" [model]="items" (onClick)="save('info')" raised severity="danger" />
<p-splitbutton label="Contrast" (onClick)="save('info')" [model]="items" severity="contrast" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    template: `
        <div class="card flex justify-center flex-wrap gap-4">
            <p-toast />
            <p-splitbutton label="Primary" [model]="items" (onClick)="save('info')" raised />
            <p-splitbutton label="Secondary" [model]="items" (onClick)="save('info')" raised severity="secondary" />
            <p-splitbutton label="Success" [model]="items" (onClick)="save('info')" raised severity="success" />
            <p-splitbutton label="Info" [model]="items" (onClick)="save('info')" raised severity="info" />
            <p-splitbutton label="Warning" [model]="items" (onClick)="save('info')" raised severity="warn" />
            <p-splitbutton label="Help" [model]="items" (onClick)="save('info')" raised severity="help" />
            <p-splitbutton label="Danger" [model]="items" (onClick)="save('info')" raised severity="danger" />
            <p-splitbutton label="Contrast" (onClick)="save('info')" [model]="items" severity="contrast" />
        </div>
    `,
    standalone: true,
    imports: [SplitButtonModule, ToastModule],
    providers: [MessageService]
})
export class SplitbuttonRaisedDemo {
    items: MenuItem[];

    constructor(private messageService: MessageService) {
        this.items = [
                    {
                        label: 'Update',
                        command: () => {
                            this.update();
                        }
                    },
                    {
                        label: 'Delete',
                        command: () => {
                            this.delete();
                        }
                    },
                    { label: 'Angular.dev', url: 'https://angular.dev' },
                    { separator: true },
                    { label: 'Upload', routerLink: ['/fileupload'] }
                ];
    }

    save(severity: string) {
        this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
    }

    update() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
    }

    delete() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Deleted' });
    }
}
```
</details>

## Raised Text

Text buttons can be displayed as raised as well for elevation.

```html
<p-toast />
<p-splitbutton label="Primary" [model]="items" (onClick)="save('info')" raised text />
<p-splitbutton label="Secondary" [model]="items" (onClick)="save('info')" raised text severity="secondary" />
<p-splitbutton label="Success" [model]="items" (onClick)="save('info')" raised text severity="success" />
<p-splitbutton label="Info" [model]="items" (onClick)="save('info')" raised text severity="info" />
<p-splitbutton label="Warning" [model]="items" (onClick)="save('info')" raised text severity="warn" />
<p-splitbutton label="Help" [model]="items" (onClick)="save('info')" raised text severity="help" />
<p-splitbutton label="Danger" [model]="items" (onClick)="save('info')" raised text severity="danger" />
<p-splitbutton label="Contrast" [model]="items" (onClick)="save('info')" raised text severity="contrast" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    template: `
        <div class="card flex justify-center flex-wrap gap-4">
            <p-toast />
            <p-splitbutton label="Primary" [model]="items" (onClick)="save('info')" raised text />
            <p-splitbutton label="Secondary" [model]="items" (onClick)="save('info')" raised text severity="secondary" />
            <p-splitbutton label="Success" [model]="items" (onClick)="save('info')" raised text severity="success" />
            <p-splitbutton label="Info" [model]="items" (onClick)="save('info')" raised text severity="info" />
            <p-splitbutton label="Warning" [model]="items" (onClick)="save('info')" raised text severity="warn" />
            <p-splitbutton label="Help" [model]="items" (onClick)="save('info')" raised text severity="help" />
            <p-splitbutton label="Danger" [model]="items" (onClick)="save('info')" raised text severity="danger" />
            <p-splitbutton label="Contrast" [model]="items" (onClick)="save('info')" raised text severity="contrast" />
        </div>
    `,
    standalone: true,
    imports: [SplitButtonModule, ToastModule],
    providers: [MessageService]
})
export class SplitbuttonRaisedtextDemo {
    items: MenuItem[];

    constructor(private messageService: MessageService) {
        this.items = [
                    {
                        label: 'Update',
                        command: () => {
                            this.update();
                        }
                    },
                    {
                        label: 'Delete',
                        command: () => {
                            this.delete();
                        }
                    },
                    { label: 'Angular.dev', url: 'https://angular.dev' },
                    { separator: true },
                    { label: 'Upload', routerLink: ['/fileupload'] }
                ];
    }

    save(severity: string) {
        this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
    }

    update() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
    }

    delete() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Deleted' });
    }
}
```
</details>

## reversedkeys-doc

Following keys are reserved in the preset scheme and cannot be used as a token name; primitive , semantic , components , directives , colorscheme , light , dark , common , root , states and extend .

## Rounded

Rounded buttons have a circular border radius.

```html
<p-toast />
<p-splitbutton label="Primary" [model]="items" (onClick)="save('info')" rounded />
<p-splitbutton label="Secondary" [model]="items" (onClick)="save('info')" rounded severity="secondary" />
<p-splitbutton label="Success" [model]="items" (onClick)="save('info')" rounded severity="success" />
<p-splitbutton label="Info" [model]="items" (onClick)="save('info')" rounded severity="info" />
<p-splitbutton label="Warning" [model]="items" (onClick)="save('info')" rounded severity="warn" />
<p-splitbutton label="Help" [model]="items" (onClick)="save('info')" rounded severity="help" />
<p-splitbutton label="Danger" [model]="items" (onClick)="save('info')" rounded severity="danger" />
<p-splitbutton label="Contrast" [model]="items" (onClick)="save('info')" rounded severity="contrast" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    template: `
        <div class="card flex justify-center flex-wrap gap-4">
            <p-toast />
            <p-splitbutton label="Primary" [model]="items" (onClick)="save('info')" rounded />
            <p-splitbutton label="Secondary" [model]="items" (onClick)="save('info')" rounded severity="secondary" />
            <p-splitbutton label="Success" [model]="items" (onClick)="save('info')" rounded severity="success" />
            <p-splitbutton label="Info" [model]="items" (onClick)="save('info')" rounded severity="info" />
            <p-splitbutton label="Warning" [model]="items" (onClick)="save('info')" rounded severity="warn" />
            <p-splitbutton label="Help" [model]="items" (onClick)="save('info')" rounded severity="help" />
            <p-splitbutton label="Danger" [model]="items" (onClick)="save('info')" rounded severity="danger" />
            <p-splitbutton label="Contrast" [model]="items" (onClick)="save('info')" rounded severity="contrast" />
        </div>
    `,
    standalone: true,
    imports: [SplitButtonModule, ToastModule],
    providers: [MessageService]
})
export class SplitbuttonRoundedDemo {
    items: MenuItem[];

    constructor(private messageService: MessageService) {
        this.items = [
                    {
                        label: 'Update',
                        command: () => {
                            this.update();
                        }
                    },
                    {
                        label: 'Delete',
                        command: () => {
                            this.delete();
                        }
                    },
                    { label: 'Angular.dev', url: 'https://angular.dev' },
                    { separator: true },
                    { label: 'Upload', routerLink: ['/fileupload'] }
                ];
    }

    save(severity: string) {
        this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
    }

    update() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
    }

    delete() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Deleted' });
    }
}
```
</details>

## Severity

The severity property defines the type of button.

```html
<p-toast />
<p-splitbutton label="Save" (onClick)="save()" [model]="items" />
<p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="secondary" />
<p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="success" />
<p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="info" />
<p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="warn" />
<p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="help" />
<p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="danger" />
<p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="contrast" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    template: `
        <div class="card flex justify-center flex-wrap gap-4">
            <p-toast />
            <p-splitbutton label="Save" (onClick)="save()" [model]="items" />
            <p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="secondary" />
            <p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="success" />
            <p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="info" />
            <p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="warn" />
            <p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="help" />
            <p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="danger" />
            <p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="contrast" />
        </div>
    `,
    standalone: true,
    imports: [SplitButtonModule, ToastModule],
    providers: [MessageService]
})
export class SplitbuttonSeverityDemo {
    items: MenuItem[];

    constructor(private messageService: MessageService) {
        this.items = [
                    {
                        label: 'Update',
                        command: () => {
                            this.update();
                        }
                    },
                    {
                        label: 'Delete',
                        command: () => {
                            this.delete();
                        }
                    },
                    { label: 'Angular.dev', url: 'https://angular.dev' },
                    { separator: true },
                    { label: 'Upload', routerLink: ['/fileupload'] }
                ];
    }

    save() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Saved' });
    }

    update() {
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated' });
    }

    delete() {
        this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
    }
}
```
</details>

## Sizes

SplitButton provides small and large sizes as alternatives to the standard.

```html
<p-toast />
<p-splitbutton label="Small" [model]="items" (onClick)="save('info')" size="small" />
<p-splitbutton label="Normal" [model]="items" (onClick)="save('info')" />
<p-splitbutton label="Large" [model]="items" (onClick)="save('info')" size="large" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    template: `
        <div class="card flex flex-wrap justify-center items-center gap-4">
            <p-toast />
            <p-splitbutton label="Small" [model]="items" (onClick)="save('info')" size="small" />
            <p-splitbutton label="Normal" [model]="items" (onClick)="save('info')" />
            <p-splitbutton label="Large" [model]="items" (onClick)="save('info')" size="large" />
        </div>
    `,
    standalone: true,
    imports: [SplitButtonModule, ToastModule],
    providers: [MessageService]
})
export class SplitbuttonSizesDemo {
    constructor(private messageService: MessageService) {
        this.items = [
                    {
                        label: 'Update',
                        command: () => {
                            this.update();
                        }
                    },
                    {
                        label: 'Delete',
                        command: () => {
                            this.delete();
                        }
                    },
                    { label: 'Angular.dev', url: 'https://angular.dev' },
                    { separator: true },
                    { label: 'Upload', routerLink: ['/fileupload'] }
                ];
    }

    save(severity: string) {
        this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
    }

    update() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
    }

    delete() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Deleted' });
    }
}
```
</details>

## Template

SplitButton has a default action button and a collection of additional options defined by the model property based on MenuModel API.

```html
<p-toast />
<p-splitbutton label="Save" (onClick)="save()" severity="contrast" [model]="items">
    <ng-template #content>
        <span class="flex items-center font-bold">
            <img alt="logo" src="https://primefaces.org/cdn/primeng/images/logo.svg" style="height: 1rem; margin-right: 0.5rem" />
            <span>PrimeNG</span>
        </span>
    </ng-template>
</p-splitbutton>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-toast />
            <p-splitbutton label="Save" (onClick)="save()" severity="contrast" [model]="items">
                <ng-template #content>
                    <span class="flex items-center font-bold">
                        <img alt="logo" src="https://primefaces.org/cdn/primeng/images/logo.svg" style="height: 1rem; margin-right: 0.5rem" />
                        <span>PrimeNG</span>
                    </span>
                </ng-template>
            </p-splitbutton>
        </div>
    `,
    standalone: true,
    imports: [SplitButtonModule, ToastModule],
    providers: [MessageService]
})
export class SplitbuttonTemplateDemo {
    items: MenuItem[];

    constructor(private messageService: MessageService) {
        this.items = [
                    {
                        label: 'Update',
                        command: () => {
                            this.update();
                        }
                    },
                    {
                        label: 'Delete',
                        command: () => {
                            this.delete();
                        }
                    },
                    { label: 'Angular.dev', url: 'https://angular.dev' },
                    { separator: true },
                    { label: 'Upload', routerLink: ['/fileupload'] }
                ];
    }

    save() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Saved' });
    }

    update() {
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated' });
    }

    delete() {
        this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
    }
}
```
</details>

## Text

Text buttons are displayed as textual elements.

```html
<p-toast />
<p-splitbutton label="Primary" [model]="items" (onClick)="save('info')" text />
<p-splitbutton label="Secondary" [model]="items" (onClick)="save('info')" text severity="secondary" />
<p-splitbutton label="Success" [model]="items" (onClick)="save('info')" text severity="success" />
<p-splitbutton label="Info" [model]="items" (onClick)="save('info')" text severity="info" />
<p-splitbutton label="Warning" [model]="items" (onClick)="save('info')" text severity="warn" />
<p-splitbutton label="Help" [model]="items" (onClick)="save('info')" text severity="help" />
<p-splitbutton label="Danger" [model]="items" (onClick)="save('info')" text severity="danger" />
<p-splitbutton label="Contrast" [model]="items" (onClick)="save('info')" text severity="contrast" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    template: `
        <div class="card flex justify-center flex-wrap gap-4">
            <p-toast />
            <p-splitbutton label="Primary" [model]="items" (onClick)="save('info')" text />
            <p-splitbutton label="Secondary" [model]="items" (onClick)="save('info')" text severity="secondary" />
            <p-splitbutton label="Success" [model]="items" (onClick)="save('info')" text severity="success" />
            <p-splitbutton label="Info" [model]="items" (onClick)="save('info')" text severity="info" />
            <p-splitbutton label="Warning" [model]="items" (onClick)="save('info')" text severity="warn" />
            <p-splitbutton label="Help" [model]="items" (onClick)="save('info')" text severity="help" />
            <p-splitbutton label="Danger" [model]="items" (onClick)="save('info')" text severity="danger" />
            <p-splitbutton label="Contrast" [model]="items" (onClick)="save('info')" text severity="contrast" />
        </div>
    `,
    standalone: true,
    imports: [SplitButtonModule, ToastModule],
    providers: [MessageService]
})
export class SplitbuttonTextDemo {
    items: MenuItem[];

    constructor(private messageService: MessageService) {
        this.items = [
                    {
                        label: 'Update',
                        command: () => {
                            this.update();
                        }
                    },
                    {
                        label: 'Delete',
                        command: () => {
                            this.delete();
                        }
                    },
                    { label: 'Angular.dev', url: 'https://angular.dev' },
                    { separator: true },
                    { label: 'Upload', routerLink: ['/fileupload'] }
                ];
    }

    save(severity: string) {
        this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
    }

    update() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
    }

    delete() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Deleted' });
    }
}
```
</details>

## Split Button

SplitButton groups a set of commands in an overlay with a default command.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<SplitButtonPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| model | MenuItem[] | - | MenuModel instance to define the overlay items. |
| severity | "success" \| "info" \| "warn" \| "danger" \| "help" \| "primary" \| "secondary" \| "contrast" | - | Defines the style of the button. |
| raised | boolean | false | Add a shadow to indicate elevation. |
| rounded | boolean | false | Add a circular border radius to the button. |
| text | boolean | false | Add a textual class to the button without a background initially. |
| outlined | boolean | false | Add a border class without a background initially. |
| size | "small" \| "large" | null | Defines the size of the button. |
| plain | boolean | false | Add a plain textual class to the button without a background initially. |
| icon | string | - | Name of the icon. |
| iconPos | SplitButtonIconPosition | left | Position of the icon. |
| label | string | - | Text of the button. |
| tooltip | string | - | Tooltip for the main button. |
| tooltipOptions | TooltipOptions | - | Tooltip options for the main button. |
| styleClass | string | - | Class of the element. **(Deprecated)** |
| menuStyle | { [klass: string]: any } | - | Inline style of the overlay menu. |
| menuStyleClass | string | - | Style class of the overlay menu. |
| dropdownIcon | string | - | Name of the dropdown icon. |
| appendTo | InputSignal<any> | 'body' | Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |
| dir | string | - | Indicates the direction of the element. |
| expandAriaLabel | string | - | Defines a string that labels the expand button for accessibility. |
| showTransitionOptions | string | .12s cubic-bezier(0, 0, 0.2, 1) | Transition options of the show animation. **(Deprecated)** |
| hideTransitionOptions | string | .1s linear | Transition options of the hide animation. **(Deprecated)** |
| motionOptions | InputSignal<MotionOptions> | ... | The motion options. |
| autofocus | boolean | false | When present, it specifies that the component should automatically get focus on load. |
| disabled | boolean | - | When present, it specifies that the element should be disabled. |
| tabindex | number | - | Index of the element in tabbing order. |
| menuButtonDisabled | boolean | false | When present, it specifies that the menu button element should be disabled. |
| buttonDisabled | boolean | false | When present, it specifies that the button element should be disabled. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onClick | event: MouseEvent | Callback to invoke when default command button is clicked. |
| onMenuHide | value: any | Callback to invoke when overlay menu is hidden. |
| onMenuShow | value: any | Callback to invoke when overlay menu is shown. |
| onDropdownClick | event: MouseEvent | Callback to invoke when dropdown button is clicked. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| content | TemplateRef<void> | Custom content template. |
| dropdownicon | TemplateRef<void> | Custom dropdown icon template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| pcButton | ButtonPassThrough | Used to pass attributes to the Button component. |
| pcDropdown | ButtonPassThrough | Used to pass attributes to the dropdown Button component. |
| pcMenu | MenuPassThrough | Used to pass attributes to the TieredMenu component. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-splitbutton | Class name of the root element |
| p-splitbutton-button | Class name of the button element |
| p-splitbutton-dropdown | Class name of the dropdown element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| splitbutton.border.radius | --p-splitbutton-border-radius | Border radius of root |
| splitbutton.rounded.border.radius | --p-splitbutton-rounded-border-radius | Rounded border radius of root |
| splitbutton.raised.shadow | --p-splitbutton-raised-shadow | Raised shadow of root |

