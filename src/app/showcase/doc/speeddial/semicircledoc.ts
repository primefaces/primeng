import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primengrtl/api';
import { Code } from '@domain/code';

@Component({
    selector: 'semi-circle-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>type</i> is defined as <i>semi-circle</i>, items are displayed in a half-circle around the button.</p>
        </app-docsectiontext>
        <div class="card">
            <div style="height: 500px; position: relative;" class="speeddial-linear-demo">
                <p-toast />
                <p-speedDial [model]="items" direction="top" [radius]="80" type="semi-circle" />
                <p-speedDial [model]="items" direction="bottom" [radius]="80" type="semi-circle" />
                <p-speedDial [model]="items" direction="start" [radius]="80" type="semi-circle" />
                <p-speedDial [model]="items" direction="end" [radius]="80" type="semi-circle" />
            </div>
        </div>
        <app-code [code]="code" selector="speed-dial-semi-circle-demo"></app-code>
    `,
    providers: [MessageService]
})
export class SemiCircleDoc implements OnInit {
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
                url: 'http://angular.io'
            }
        ];
    }

    code: Code = {
        basic: `<p-speedDial
    [model]="items"
    direction="top"
    [radius]="80"
    type="semi-circle" />
<p-speedDial
    [model]="items"
    direction="bottom"
    [radius]="80"
    type="semi-circle" />
<p-speedDial
    [model]="items"
    direction="start"
    [radius]="80"
    type="semi-circle" />
<p-speedDial
    [model]="items"
    direction="end"
    [radius]="80"
    type="semi-circle" />`,

        html: `<div class="card">
    <div style="height: 500px; position: relative;" class="speeddial-linear-demo">
        <p-toast />
        <p-speedDial
            [model]="items"
            direction="top"
            [radius]="80"
            type="semi-circle" />
        <p-speedDial
            [model]="items"
            direction="bottom"
            [radius]="80"
            type="semi-circle" />
        <p-speedDial
            [model]="items"
            direction="start"
            [radius]="80"
            type="semi-circle" />
        <p-speedDial
            [model]="items"
            direction="end"
            [radius]="80"
            type="semi-circle" />
    </div>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primengrtl/api';
import { SpeedDialModule } from 'primengrtl/speeddial';
import { ToastModule } from 'primengrtl/toast';

@Component({
    selector: 'speed-dial-semi-circle-demo',
    templateUrl: './speed-dial-semi-circle-demo.html',
    styles: [
        \`:host ::ng-deep {
            .speeddial-linear-demo {
                .p-speeddial-direction-top {
                    inset-inline-start: calc(50% - 2rem);
                    bottom: 0;
                }

                .p-speeddial-direction-bottom {
                    inset-inline-start: calc(50% - 2rem);
                    top: 0;
                }

                .p-speeddial-direction-start {
                    inset-inline-end: 0;
                    top: calc(50% - 2rem);
                }

                .p-speeddial-direction-end {
                    inset-inline-start: 0;
                    top: calc(50% - 2rem);
                }
            }
        }\`
    ],
    standalone: true,
    imports: [SpeedDialModule, ToastModule],
    providers: [MessageService]
})
export class SpeedDialSemiCircleDemo implements OnInit {
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
                url: 'http://angular.io'
            }
        ];
    }
}`,

        scss: `:host ::ng-deep {
    .speeddial-linear-demo {
        .p-speeddial-direction-top {
            inset-inline-start: calc(50% - 2rem);
            bottom: 0;
        }

        .p-speeddial-direction-bottom {
            inset-inline-start: calc(50% - 2rem);
            top: 0;
        }

        .p-speeddial-direction-start {
            inset-inline-end: 0;
            top: calc(50% - 2rem);
        }

        .p-speeddial-direction-end {
            inset-inline-start: 0;
            top: calc(50% - 2rem);
        }
    }
}`
    };
}
