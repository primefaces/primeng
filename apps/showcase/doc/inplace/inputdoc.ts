import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'input-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>The <i>closeCallback</i> switches the state back to display mode when called from an event.</p>
        </app-docsectiontext>
        <div class="card">
            <p-inplace>
                <ng-template #display>
                    <span>Click to Edit</span>
                </ng-template>
                <ng-template #content let-closeCallback="closeCallback">
                    <span class="inline-flex gap-2">
                        <input type="text" pInputText [pAutoFocus]="true" />
                        <button type="button" pButton (click)="closeCallback($event)" variant="text" severity="danger">
                            <i class="pi pi-times" pButtonIcon></i>
                        </button>
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
    <ng-template #display>
        <span>Click to Edit</span>
    </ng-template>
    <ng-template #content let-closeCallback="closeCallback">
        <span class="inline-flex gap-2">
            <input type="text" pInputText [pAutoFocus]="true" />
            <button type="button" pButton (click)="closeCallback($event)" variant="text" severity="danger">
                <i class="pi pi-times" pButtonIcon></i>
            </button>
        </span>
    </ng-template>
</p-inplace>`,
        html: `<div class="card">
    <p-inplace>
        <ng-template #display>
            <span>Click to Edit</span>
        </ng-template>
        <ng-template #content let-closeCallback="closeCallback">
            <span class="inline-flex gap-2">
                <input type="text" pInputText [pAutoFocus]="true" />
                <button type="button" pButton (click)="closeCallback($event)" variant="text" severity="danger">
                    <i class="pi pi-times" pButtonIcon></i>
                </button>
            </span>
        </ng-template>
    </p-inplace>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { InplaceModule } from 'primeng/inplace';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AutoFocusModule } from 'primeng/autofocus';

@Component({
    selector: 'inplace-input-demo',
    templateUrl: './inplace-input-demo.html',
    standalone: true,
    imports: [InplaceModule, InputTextModule, ButtonModule, AutoFocusModule]
})
export class InplaceInputDemo {}`
    };
}
