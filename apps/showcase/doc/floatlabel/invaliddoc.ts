import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'invalid-doc',
    template: `
        <app-docsectiontext>
            <p>When the form element is invalid, the label is also highlighted.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center items-end gap-4">
            <p-floatlabel>
                <input pInputText id="value1" [(ngModel)]="value1" class="ng-dirty ng-invalid" autocomplete="off" />
                <label for="value1">Username</label>
            </p-floatlabel>

            <p-floatlabel variant="in">
                <input pInputText id="value2" [(ngModel)]="value2" class="ng-dirty ng-invalid" autocomplete="off" />
                <label for="value2">Username</label>
            </p-floatlabel>

            <p-floatlabel variant="on">
                <input pInputText id="value3" [(ngModel)]="value3" class="ng-dirty ng-invalid" autocomplete="off" />
                <label for="value3">Username</label>
            </p-floatlabel>
        </div>
        <app-code [code]="code" selector="float-label-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;

    code: Code = {
        basic: `<p-floatlabel>
    <input pInputText id="value1" [(ngModel)]="value1" class="ng-dirty ng-invalid" />
    <label for="value1">Username</label>
</p-floatlabel>

<p-floatlabel variant="in">
    <input pInputText id="value2" [(ngModel)]="value2" class="ng-dirty ng-invalid" />
    <label for="value2">Username</label>
</p-floatlabel>

<p-floatlabel variant="on">
    <input pInputText id="value3" [(ngModel)]="value3" class="ng-dirty ng-invalid" />
    <label for="value3">Username</label>
</p-floatlabel>`,

        html: `<div class="card flex flex-wrap justify-center items-end gap-4">
    <p-floatlabel>
        <input pInputText id="value1" [(ngModel)]="value1" class="ng-dirty ng-invalid" />
        <label for="value1">Username</label>
    </p-floatlabel>

    <p-floatlabel variant="in">
        <input pInputText id="value2" [(ngModel)]="value2" class="ng-dirty ng-invalid" />
        <label for="value2">Username</label>
    </p-floatlabel>

    <p-floatlabel variant="on">
        <input pInputText id="value3" [(ngModel)]="value3" class="ng-dirty ng-invalid" />
        <label for="value3">Username</label>
    </p-floatlabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FloatLabelModule } from "primeng/floatlabel"
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'float-label-invalid-demo',
    templateUrl: './float-label-invalid-demo.html',
    standalone: true,
    imports: [FloatLabelModule, InputTextModule, FormsModule]
})
export class FloatLabelInvalidDemo {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;
}`
    };
}
