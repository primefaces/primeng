import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>A simple Panel is created with a <i>header</i> property along with the content as children.</p>
        </app-docsectiontext>
        <div class="card flex flex-column">
            <p-panel #panel [toggleable]="true">
                <ng-template pTemplate="header">
                    <div class="flex align-items-center gap-2">
                        <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" size="large" shape="circle" />
                        <span class="font-bold"> Amy Elsner </span>
                        <p-button (onClick)="toggle($event)" class="mt-3" label="TogglePanel Works!"></p-button>
                    </div>
                </ng-template>
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </p-panel>
            <p-button (onClick)="toggle($event)" class="mt-3" label="TogglePanel does not Work!"></p-button>
        </div>

        <app-code [code]="code" selector="panel-basic-demo"></app-code>
    `
})
export class BasicDoc {
    @ViewChild('panel') panelEl: any;
    constructor(private cd: ChangeDetectorRef) {}
    toggle(e) {
        this.panelEl.toggle(e);
        this.cd.markForCheck();
    }

    code: Code = {
        basic: `<p-panel header="Header">
    <p>
        Lorem ipsum dolor sit amet...
    </p>
</p-panel>`,

        html: `<div class="card flex justify-content-center">
    <p-panel header="Header">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </p-panel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'panel-basic-demo',
    templateUrl: './panel-basic-demo.html',
    standalone: true,
    imports: [PanelModule]
})
export class PanelBasicDemo {}`
    };
}

