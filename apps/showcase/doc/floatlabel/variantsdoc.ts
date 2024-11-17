import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'variants-doc',
    template: `
        <app-docsectiontext>
            <p>The <i>variant</i> property defines the position of the label. Default value is <i>over</i>, whereas <i>in</i> and <i>on</i> are the alternatives.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center items-end gap-4">
            <p-floatlabel variant="in">
                <input pInputText id="in_label" [(ngModel)]="value1" autocomplete="off" />
                <label for="in_label">In Label</label>
            </p-floatlabel>

            <p-floatlabel variant="on">
                <input pInputText id="on_label" [(ngModel)]="value2" autocomplete="off" />
                <label for="on_label">On Label</label>
            </p-floatlabel>
        </div>
        <app-code [code]="code" selector="float-label-variants-demo"></app-code>
    `
})
export class VariantsDoc {
    value1: string | undefined;

    value2: string | undefined;

    code: Code = {
        basic: `<p-floatlabel variant="in">
    <input pInputText id="in_label" [(ngModel)]="value1" autocomplete="off" />
    <label for="in_label">In Label</label>
</p-floatlabel>

<p-floatlabel variant="on">
    <input pInputText id="on_label" [(ngModel)]="value2" autocomplete="off" />
    <label for="on_label">On Label</label>
</p-floatlabel>`,

        html: `<div class="card flex flex-wrap justify-center items-end gap-4">
    <p-floatlabel variant="in">
        <input pInputText id="in_label" [(ngModel)]="value1" autocomplete="off" />
        <label for="in_label">In Label</label>
    </p-floatlabel>

    <p-floatlabel variant="on">
        <input pInputText id="on_label" [(ngModel)]="value2" autocomplete="off" />
        <label for="on_label">On Label</label>
    </p-floatlabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FloatLabelModule } from "primeng/floatlabel"
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'float-label-variants-demo',
    templateUrl: './float-label-variants-demo.html',
    standalone: true,
    imports: [FloatLabelModule, InputTextModule, FormsModule]
})
export class FloatLabelVariantsDemo {
    value1: string | undefined;

    value2: string | undefined;
}`
    };
}
