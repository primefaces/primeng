import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'dialog-maximizable-demo',
    template: `
        <app-docsectiontext>
            <p>Setting <i>maximizable</i> property to <i>true</i> enables the full screen mode.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-button (onClick)="showDialog()" label="Show" />
            <p-dialog header="Header" [modal]="true" [(visible)]="visible" [style]="{ width: '50rem' }" [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }" [maximizable]="true">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </p-dialog>
        </div>
        <app-code [code]="code" selector="dialog-maximizable-demo"></app-code>
    `
})
export class MaximizableDoc {
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    code: Code = {
        basic: `<p-button (onClick)="showDialog()" label="Show" />
<p-dialog 
    header="Header" 
    [modal]="true"
    [(visible)]="visible" 
    [style]="{ width: '50rem' }" 
    [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }" 
    [maximizable]="true">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
</p-dialog>`,

        html: `<div class="card flex justify-content-center">
    <p-button (onClick)="showDialog()" label="Show" />
    <p-dialog 
        header="Header" 
        [modal]="true" 
        [(visible)]="visible" 
        [style]="{ width: '50rem' }" 
        [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }" 
        [maximizable]="true">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
    </p-dialog>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'dialog-maximizable-demo',
    templateUrl: './dialog-maximizable-demo.html',
    standalone: true,
    imports: [DialogModule, ButtonModule]
})
export class DialogMaximizableDemo {
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
}`
    };
}
