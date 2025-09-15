import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'invalid-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCodeModule, FormsModule, IftaLabelModule, InputTextModule],
    template: `
        <app-docsectiontext>
            <p>When the form element is invalid, the label is also highlighted.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-iftalabel>
                <input pInputText id="username" [(ngModel)]="value" [invalid]="!value" autocomplete="off" />
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
    <input pInputText id="username" [(ngModel)]="value" [invalid]="!value" />
    <label for="username">Username</label>
</p-iftalabel>`,

        html: `<div class="card flex justify-center">
    <p-iftalabel>
        <input pInputText id="username" [(ngModel)]="value" [invalid]="!value" />
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
