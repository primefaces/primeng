import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { Footer } from './footer';
import { ProductListDemo } from './productlistdemo';

@Component({
    selector: 'example-doc',
    standalone: true,
    imports: [ToastModule, ButtonModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                Dynamic dialogs require an instance of a <i>DialogService</i> that is responsible for displaying a dialog with a component as its content. Calling <i>open</i> method of <i>DialogService</i> will display dynamic dialog. First parameter
                of <i>open</i> method is the type of component to load and the second parameter is the configuration of the Dialog such as <i>header</i>, <i>width</i> and more.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-toast />
            <p-button (click)="show()" icon="pi pi-search" label="Select a Product" />
        </div>
        <app-code [code]="code" [extFiles]="['Product']" [routeFiles]="['ProductListDemo', 'InfoDemo', 'Footer']"></app-code>
    `,
    providers: [DialogService, MessageService]
})
export class ExampleDoc implements OnDestroy {
    constructor(
        public dialogService: DialogService,
        public messageService: MessageService
    ) {}

    ref: DynamicDialogRef | undefined;

    code: Code = {
        basic: `<p-toast />
<p-button (click)="show()" icon="pi pi-search" label="Select a Product" />`,

        html: `<div class="card flex justify-center">
    <p-toast />
    <p-button (click)="show()" icon="pi pi-search" label="Select a Product" />
</div>`,

        typescript: `import { Component, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductListDemo } from './demo/productlistdemo';
import { Footer } from './demo/footer';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'dynamic-dialog-example-demo',
    template: \`
        <p-toast />
        <p-button (click)="show()" icon="pi pi-search" label="Select a Product" />
    \`,
    imports: [DynamicDialogModule, ToastModule, ButtonModule],
    providers: [DialogService, MessageService],
    standalone: true,
})
export class DynamicDialogExampleDemo implements OnDestroy {

    constructor(public dialogService: DialogService, public messageService: MessageService) {}

    ref: DynamicDialogRef | undefined;

    show() {
        this.ref = this.dialogService.open(ProductListDemo, {
            header: 'Product List',
            width: '50vw',
            modal: true,
            contentStyle: { overflow: 'auto' },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            templates: {
                footer: Footer
            }
        });

        this.ref.onClose.subscribe((data: any) => {
            let summary_and_detail;
            if (data) {
                const buttonType = data?.buttonType;
                summary_and_detail = buttonType ? { summary: 'No Product Selected', detail: \`Pressed '\${buttonType}' button\` } : { summary: 'Product Selected', detail: data?.name };
            } else {
                summary_and_detail = { summary: 'No Product Selected', detail: 'Pressed Close button' };
            }
            this.messageService.add({ severity: 'info', ...summary_and_detail, life: 3000 });
        });

        this.ref.onMaximize.subscribe((value) => {
            this.messageService.add({ severity: 'info', summary: 'Maximized', detail: \`maximized: \${value.maximized}\` });
        });
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }
}`,

        service: ['ProductService']
    };

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }

    show() {
        this.ref = this.dialogService.open(ProductListDemo, {
            header: 'Product List',
            modal: true,
            width: '50vw',
            closable: true,
            contentStyle: { overflow: 'auto' },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            templates: {
                footer: Footer
            }
        });

        this.ref.onClose.subscribe((data: any) => {
            let summary_and_detail;
            if (data) {
                const buttonType = data?.buttonType;
                summary_and_detail = buttonType ? { summary: 'No Product Selected', detail: `Pressed '${buttonType}' button` } : { summary: 'Product Selected', detail: data?.name };
            } else {
                summary_and_detail = { summary: 'No Product Selected', detail: 'Pressed Close button' };
            }
            this.messageService.add({ severity: 'info', ...summary_and_detail, life: 3000 });
        });

        this.ref.onMaximize.subscribe((value) => {
            this.messageService.add({
                severity: 'info',
                summary: 'Maximized',
                detail: `maximized: ${value.maximized}`
            });
        });
    }
}
