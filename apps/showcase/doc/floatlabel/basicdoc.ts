import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>FloatLabel is used by wrapping the input and its label.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-floatlabel>
                <input id="username" pInputText [(ngModel)]="value" autocomplete="off" />
                <label for="username">Username</label>
            </p-floatlabel>
        </div>
        <app-code [code]="code" selector="float-label-basic-demo"></app-code>
    `
})
export class BasicDoc {
    value: string | undefined;

    code: Code = {
        basic: `<p-floatlabel>
    <input id="username" pInputText [(ngModel)]="value" />
    <label for="username">Username</label>
</p-floatlabel>`,

        html: `<div class="card flex justify-center">
    <p-floatlabel>
        <input id="username" pInputText [(ngModel)]="value" />
        <label for="username">Username</label>
    </p-floatlabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FloatLabelModule } from "primeng/floatlabel"
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'float-label-basic-demo',
    templateUrl: './float-label-basic-demo.html',
    standalone: true,
    imports: [FloatLabelModule, InputTextModule, FormsModule]
})
export class FloatLabelBasicDemo {
    value: string | undefined;
}`
    };
}
