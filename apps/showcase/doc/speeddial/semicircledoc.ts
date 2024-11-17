import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    selector: 'semi-circle-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>type</i> is defined as <i>semi-circle</i>, items are displayed in a half-circle around the button.</p>
        </app-docsectiontext>
        <div class="card">
            <div style="position: relative; height: 500px">
                <p-toast />
                <p-speeddial [model]="items" [radius]="80" type="semi-circle" direction="down" [style]="{ position: 'absolute', left: 'calc(50% - 2rem)', top: 0 }" />
                <p-speeddial [model]="items" [radius]="80" type="semi-circle" direction="right" [style]="{ position: 'absolute', top: 'calc(50% - 2rem)', left: 0 }" />
                <p-speeddial [model]="items" [radius]="80" type="semi-circle" direction="left" [style]="{ position: 'absolute', top: 'calc(50% - 2rem)', right: 0 }" />
                <p-speeddial [model]="items" [radius]="80" type="semi-circle" direction="up" [style]="{ position: 'absolute', left: 'calc(50% - 2rem)', bottom: 0 }" />
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
        basic: `<p-speeddial [model]="items" [radius]="80" type="semi-circle" direction="down" [style]="{ position: 'absolute', left: 'calc(50% - 2rem)', top: 0 }" />
<p-speeddial [model]="items" [radius]="80" type="semi-circle" direction="right" [style]="{ position: 'absolute', top: 'calc(50% - 2rem)', left: 0 }" />
<p-speeddial [model]="items" [radius]="80" type="semi-circle" direction="left" [style]="{ position: 'absolute', top: 'calc(50% - 2rem)', right: 0 }" />
<p-speeddial [model]="items" [radius]="80" type="semi-circle" direction="up" [style]="{ position: 'absolute', left: 'calc(50% - 2rem)', bottom: 0 }" />`,

        html: `<div class="card">
    <div style="position: relative; height: 500px">
        <p-toast />
        <p-speeddial [model]="items" [radius]="80" type="semi-circle" direction="down" [style]="{ position: 'absolute', left: 'calc(50% - 2rem)', top: 0 }" />
        <p-speeddial [model]="items" [radius]="80" type="semi-circle" direction="right" [style]="{ position: 'absolute', top: 'calc(50% - 2rem)', left: 0 }" />
        <p-speeddial [model]="items" [radius]="80" type="semi-circle" direction="left" [style]="{ position: 'absolute', top: 'calc(50% - 2rem)', right: 0 }" />
        <p-speeddial [model]="items" [radius]="80" type="semi-circle" direction="up" [style]="{ position: 'absolute', left: 'calc(50% - 2rem)', bottom: 0 }" />
    </div>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { SpeedDial } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'speed-dial-semi-circle-demo',
    templateUrl: './speed-dial-semi-circle-demo.html',
    standalone: true,
    imports: [SpeedDial, ToastModule],
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
        .p-speeddial-direction-up {
            left: calc(50% - 2rem);
            bottom: 0;
        }

        .p-speeddial-direction-down {
            left: calc(50% - 2rem);
            top: 0;
        }

        .p-speeddial-direction-left {
            right: 0;
            top: calc(50% - 2rem);
        }

        .p-speeddial-direction-right {
            left: 0;
            top: calc(50% - 2rem);
        }
    }
}`
    };
}
