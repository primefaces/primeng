import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'floatlabel-doc',
    template: `
        <app-docsectiontext>
            <p>FloatLabel visually integrates a label with its form element. Visit <a routerLink="/floatlabel">FloatLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center items-end gap-4">
            <p-floatlabel>
                <p-inputmask id="over_label" [(ngModel)]="value1" mask="999-99-9999" />
                <label for="over_label">Over Label</label>
            </p-floatlabel>

            <p-floatlabel variant="in">
                <p-inputmask id="in_label" [(ngModel)]="value2" mask="999-99-9999" />
                <label for="in_label">In Label</label>
            </p-floatlabel>

            <p-floatlabel variant="on">
                <p-inputmask id="on_label" [(ngModel)]="value3" mask="999-99-9999" />
                <label for="on_label">On Label</label>
            </p-floatlabel>
        </div>
        <app-code [code]="code" selector="input-mask-floatlabel-demo"></app-code>
    `
})
export class FloatlabelDoc {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;

    code: Code = {
        basic: `<p-floatlabel>
    <p-inputmask id="over_label" [(ngModel)]="value1" mask="999-99-9999" />
    <label for="over_label">Over Label</label>
</p-floatlabel>

<p-floatlabel variant="in">
    <p-inputmask id="in_label" [(ngModel)]="value2" mask="999-99-9999" />
    <label for="in_label">In Label</label>
</p-floatlabel>

<p-floatlabel variant="on">
    <p-inputmask id="on_label" [(ngModel)]="value3" mask="999-99-9999" />
    <label for="on_label">On Label</label>
</p-floatlabel>`,

        html: `<div class="card flex flex-wrap justify-center items-end gap-4">
    <p-floatlabel>
        <p-inputmask id="over_label" [(ngModel)]="value1" mask="999-99-9999" />
        <label for="over_label">Over Label</label>
    </p-floatlabel>

    <p-floatlabel variant="in">
        <p-inputmask id="in_label" [(ngModel)]="value2" mask="999-99-9999" />
        <label for="in_label">In Label</label>
    </p-floatlabel>

    <p-floatlabel variant="on">
        <p-inputmask id="on_label" [(ngModel)]="value3" mask="999-99-9999" />
        <label for="on_label">On Label</label>
    </p-floatlabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputMask } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from "primeng/floatlabel"

@Component({
    selector: 'input-mask-floatlabel-demo',
    templateUrl: './input-mask-floatlabel-demo.html',
    standalone: true,
    imports: [FormsModule, InputMask, FloatLabel]
})
export class InputMaskFloatlabelDemo {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;
}`
    };
}
