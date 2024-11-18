import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'input-doc',
    template: `
        <app-docsectiontext>
            <p>
                Inplace can be used within a form to display a value as read only before making it editable. The
                <i>closable</i> property adds a close button next to the content to switch back to read only mode.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-inplace>
                <ng-template pTemplate="display">
                    <span>Click to Edit</span>
                </ng-template>
                <ng-template pTemplate="content" let-closeCallback="closeCallback">
                    <span class="inline-flex items-center gap-2">
                        <input type="text" pInputText [pAutoFocus]="true" />
                        <button (click)="closeCallback($event)" pButton icon="pi pi-times" text severity="danger"></button>
                    </span>
                </ng-template>
            </p-inplace>
        </div>
        <app-code [code]="code" selector="inplace-input-demo"></app-code>
    `
})
export class InputDoc {
    code: Code = {
        basic: `<p-inplace>
    <ng-template pTemplate="display">
        <span>Click to Edit</span>
    </ng-template>
    <ng-template pTemplate="content" let-closeCallback="closeCallback">
        <span class="inline-flex items-center gap-2">
            <input type="text" pInputText autofocus />
            <button (click)="closeCallback($event)" pButton icon="pi pi-times" text severity="danger"></button>
        </span>
    </ng-template>
</p-inplace>`,
        html: `<div class="card">
    <p-inplace>
        <ng-template pTemplate="display">
            <span>Click to Edit</span>
        </ng-template>
        <ng-template pTemplate="content" let-closeCallback="closeCallback">
            <span class="inline-flex items-center gap-2">
                <input type="text" pInputText autofocus />
                <button (click)="closeCallback($event)" pButton icon="pi pi-times" text severity="danger"></button>
            </span>
        </ng-template>
    </p-inplace>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { InplaceModule } from 'primeng/inplace';
import { InputTextModule } from 'primeng/inputtext';
import { AutoFocusModule } from 'primeng/autofocus';

@Component({
    selector: 'inplace-input-demo',
    templateUrl: './inplace-input-demo.html',
    standalone: true,
    imports: [InplaceModule, InputTextModule, AutoFocusModule]
})
export class InplaceInputDemo {}`
    };
}
