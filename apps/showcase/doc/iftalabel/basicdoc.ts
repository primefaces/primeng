import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>IftaLabel is used by wrapping the input and its label.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-iftalabel>
                <input pInputText id="username" [(ngModel)]="value" autocomplete="off" />
                <label for="username">Username</label>
            </p-iftalabel>
        </div>
        <app-code [code]="code" selector="ifta-label-basic-demo"></app-code>
    `
})
export class BasicDoc {
    value: string | undefined;

    code: Code = {
        basic: `<p-iftalabel>
    <input pInputText id="username" [(ngModel)]="value" />
    <label for="username">Username</label>
</p-iftalabel>`,

        html: `<div class="card flex justify-center">
    <p-iftalabel>
        <input pInputText id="username" [(ngModel)]="value" />
        <label for="username">Username</label>
    </p-iftalabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'ifta-label-basic-demo',
    templateUrl: './ifta-label-basic-demo.html',
    standalone: true,
    imports: [IftaLabelModule, InputTextModule, FormsModule]
})
export class IftaLabelBasicDemo {
    value: string | undefined;
}`
    };
}
