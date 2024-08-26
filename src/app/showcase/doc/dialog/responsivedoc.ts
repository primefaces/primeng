import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'dialog-responsive-demo',
    template: `
        <app-docsectiontext>
            <p>
                Dialog width can be adjusted per screen size with the <i>breakpoints</i> option where a key defines the max-width for the breakpoint and value for the corresponding width. When no breakpoint matches width defined in
                <i>style</i> property is used.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-button (click)="showDialog()" label="Show" />
            <p-dialog header="Header" [(visible)]="visible" [modal]="true" [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }" [style]="{ width: '50vw' }" [draggable]="false" [resizable]="false">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </p-dialog>
        </div>
        <app-code [code]="code" selector="dialog-responsive-demo"></app-code>
    `
})
export class ResponsiveDoc {
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    code: Code = {
        basic: `<p-button (click)="showDialog()" label="Show" />
<p-dialog 
    header="Header" 
    [(visible)]="visible" 
    [modal]="true" 
    [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }" 
    [style]="{ width: '50vw' }" 
    [draggable]="false" 
    [resizable]="false">
        <p>
            Lorem ipsum dolor sit amet...
        </p>
</p-dialog>`,

        html: `<div class="card flex justify-center">
    <p-button (click)="showDialog()" label="Show" />
    <p-dialog 
        header="Header" 
        [(visible)]="visible" 
        [modal]="true" 
        [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }" 
        [style]="{ width: '50vw' }" 
        [draggable]="false" 
        [resizable]="false">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
    </p-dialog>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'dialog-responsive-demo',
    templateUrl: './dialog-responsive-demo.html',
    standalone: true,
    imports: [DialogModule, ButtonModule]
})
export class DialogResponsiveDemo {
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
}`
    };
}
