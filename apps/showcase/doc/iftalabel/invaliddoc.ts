import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'invalid-doc',
    template: `
        <app-docsectiontext>
            <p>When the form element is invalid, the label is also highlighted.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-iftalabel>
                <input pInputText id="username" [(ngModel)]="value" class="ng-dirty ng-invalid" autocomplete="off" />
                <label for="username">Username</label>
            </p-iftalabel>
        </div>
        <app-code [code]="code" selector="ifta-label-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    value: string | undefined;

    code: Code = {
        basic: `<p-iftalabel>
    <input pInputText id="username" [(ngModel)]="value" class="ng-dirty ng-invalid" />
    <label for="username">Username</label>
</p-iftalabel>`,

        html: `<div class="card flex justify-center">
    <p-iftalabel>
        <input pInputText id="username" [(ngModel)]="value" class="ng-dirty ng-invalid" />
        <label for="username">Username</label>
    </p-iftalabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'ifta-label-invalid-demo',
    templateUrl: './ifta-label-invalid-demo.html',
    standalone: true,
    imports: [IftaLabelModule, InputTextModule, FormsModule]
})
export class IftaLabelInvalidDemo {
    value: string | undefined;
}`
    };
}
