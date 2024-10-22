import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'quarter-circle-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>type</i> is defined as <i>quarter-circle</i>, items are displayed in a half-circle around the button.</p>
        </app-docsectiontext>
        <div class="card">
            <div style="height: 500px; position: relative;" class="speeddial-circle-demo">
                <p-toast />
                <p-speedDial [model]="items" radius="120" direction="top-start" type="quarter-circle" buttonClassName="p-button-success" />
                <p-speedDial [model]="items" radius="120" direction="top-end" type="quarter-circle" buttonClassName="p-button-success" />
                <p-speedDial [model]="items" radius="120" direction="bottom-start" type="quarter-circle" buttonClassName="p-button-success" />
                <p-speedDial [model]="items" radius="120" direction="bottom-end" type="quarter-circle" buttonClassName="p-button-success" />
            </div>
        </div>
        <app-code [code]="code" selector="speed-dial-quarter-circle-demo"></app-code>
    `,
    providers: [MessageService]
})
export class QuarterCircleDoc implements OnInit {
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
    radius="120"
    direction="top-start"
    type="quarter-circle"
    buttonClassName="p-button-success" />
<p-speedDial
    [model]="items"
    radius="120"
    direction="top-end"
    type="quarter-circle"
    buttonClassName="p-button-success" />
<p-speedDial
    [model]="items"
    radius="120"
    direction="bottom-start"
    type="quarter-circle"
    buttonClassName="p-button-success" />
<p-speedDial
    [model]="items"
    radius="120"
    direction="bottom-end"
    type="quarter-circle"
    buttonClassName="p-button-success" />`,

        html: `<div class="card">
    <div style="height: 500px; position: relative;" class="speeddial-circle-demo">
        <p-toast />
        <p-speedDial
            [model]="items"
            radius="120"
            direction="top-start"
            type="quarter-circle"
            buttonClassName="p-button-success" />
        <p-speedDial
            [model]="items"
            radius="120"
            direction="top-end"
            type="quarter-circle"
            buttonClassName="p-button-success" />
        <p-speedDial
            [model]="items"
            radius="120"
            direction="bottom-start"
            type="quarter-circle"
            buttonClassName="p-button-success" />
        <p-speedDial
            [model]="items"
            radius="120"
            direction="bottom-end"
            type="quarter-circle"
            buttonClassName="p-button-success" />
    </div>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'speed-dial-quarter-circle-demo',
    templateUrl: './speed-dial-quarter-circle-demo.html',
    styles: [
        \`:host ::ng-deep {
            .speeddial-circle-demo {
                .p-speeddial-quarter-circle {
                    &.p-speeddial-direction-top-start {
                        inset-inline-end: 0;
                        bottom: 0;
                    }

                    &.p-speeddial-direction-top-end {
                        inset-inline-start: 0;
                        bottom: 0;
                    }

                    &.p-speeddial-direction-bottom-start {
                        inset-inline-end: 0;
                        top: 0;
                    }

                    &.p-speeddial-direction-bottom-end {
                        inset-inline-start: 0;
                        top: 0;
                    }
                }
            }
        }\`
    ],
    standalone: true,
    imports: [SpeedDialModule, ToastModule],
    providers: [MessageService]
})
export class SpeedDialQuarterCircleDemo implements OnInit {
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
    .speeddial-circle-demo {
        .p-speeddial-quarter-circle {
            &.p-speeddial-direction-top-start {
                inset-inline-end: 0;
                bottom: 0;
            }

            &.p-speeddial-direction-top-end {
                inset-inline-start: 0;
                bottom: 0;
            }

            &.p-speeddial-direction-bottom-start {
                inset-inline-end: 0;
                top: 0;
            }

            &.p-speeddial-direction-bottom-end {
                inset-inline-start: 0;
                top: 0;
            }
        }
    }
}`
    };
}
