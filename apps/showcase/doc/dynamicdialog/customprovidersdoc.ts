import { Code, RouteFile } from '@/domain/code';
import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomProvidersDemo, VALUE_TOKEN } from './customprovidersdemo';

@Component({
    selector: 'dynamic-dialog-custom-providers-demo',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>You can setup custom providers for the target component.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-button (click)="show()" icon="pi pi-search" label="Open Dialog" />
        </div>
        <app-code [code]="code" selector="dynamic-dialog-custom-providers-demo" [routeFiles]="routeFiles"></app-code>
    `,
    providers: [DialogService]
})
export class CustomProvidersDoc {
    ref: DynamicDialogRef | undefined;

    constructor(public dialogService: DialogService) {}

    show() {
        this.ref = this.dialogService.open(CustomProvidersDemo, {
            header: 'Provider',
            width: '50vw',
            modal: true,
            closable: true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            providers: [
                {
                    provide: VALUE_TOKEN,
                    useValue: 'Hey'
                }
            ]
        });
    }

    code: Code = {
        basic: `<p-button (click)="show()" icon="pi pi-search" label="Select a Product" />`,
        html: `<div class="card flex justify-center">
    <p-button (click)="show()" icon="pi pi-search" label="Select a Product" />
</div>`,
        typescript: `
import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomProvidersDemo, VALUE_TOKEN } from './demo/customprovidersdemo';

@Component({
    selector: 'dynamic-dialog-custom-providers-demo',
    templateUrl: './dynamic-dialog-custom-providers-demo.html',
    imports: [DynamicDialogModule, ImportsModule],
    providers: [DialogService],
    standalone: true
})
export class DynamicDialogCustomProvidersDemo {

    ref: DynamicDialogRef | undefined;

    constructor(public dialogService: DialogService) {}

    show() {
        this.ref = this.dialogService.open(CustomProvidersDemo, {
            header: 'Provider',
            width: '50vw',
            modal: true,
            closable: true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            providers: [
                {
                    provide: VALUE_TOKEN,
                    useValue: 'Hey'
                }
            ]
        });
    }
}`
    };

    routeFiles: RouteFile[] = [
        {
            path: 'src/app/demo/customprovidersdemo.ts',
            name: 'CustomProvidersDemo',
            content: `import { Component, inject, InjectionToken } from '@angular/core';
            
export const VALUE_TOKEN = new InjectionToken<any>('VALUE_TOKEN');

@Component({
    standalone: false,
    template: \` <p>{{ value }}</p> \`
})
export class CustomProvidersDemo {
    protected readonly value = inject(VALUE_TOKEN);
}
            `
        }
    ];
}
