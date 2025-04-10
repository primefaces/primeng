import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'float-label-doc',
    template: `
        <app-docsectiontext>
            <p>
                FloatLabel visually integrates a label with its form element. Visit
                <a routerLink="/floatlabel">FloatLabel</a> documentation for more information.
            </p>
        </app-docsectiontext>
        <div class="card flex flex-col md:items-end md:flex-row gap-4">
            <p-inputgroup>
                <p-inputgroup-addon>
                    <i class="pi pi-user"></i>
                </p-inputgroup-addon>
                <p-floatlabel>
                    <input pInputText id="over_label" [(ngModel)]="value1" />
                    <label for="over_label">Over Label</label>
                </p-floatlabel>
            </p-inputgroup>

            <p-inputgroup>
                <p-inputgroup-addon>$</p-inputgroup-addon>
                <p-floatlabel variant="in">
                    <input pInputText id="in_label" [(ngModel)]="value2" />
                    <label for="in_label">In Label</label>
                </p-floatlabel>
                <p-inputgroup-addon>.00</p-inputgroup-addon>
            </p-inputgroup>

            <p-inputgroup>
                <p-inputgroup-addon>www</p-inputgroup-addon>
                <p-floatlabel variant="on">
                    <input pInputText id="on_label" [(ngModel)]="value3" />
                    <label for="on_label">On Label</label>
                </p-floatlabel>
            </p-inputgroup>
        </div>
        <app-code [code]="code" selector="input-group-float-label-demo"></app-code>
    `
})
export class FloatLabelDoc {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;

    code: Code = {
        basic: `<p-inputgroup>
    <p-inputgroup-addon>
        <i class="pi pi-user"></i>
    </p-inputgroup-addon>
    <p-floatlabel>
        <input pInputText id="over_label" [(ngModel)]="value1" />
        <label for="over_label">Over Label</label>
    </p-floatlabel>
</p-inputgroup>

<p-inputgroup>
    <p-inputgroup-addon>$</p-inputgroup-addon>
    <p-floatlabel variant="in">
        <input pInputText id="in_label" [(ngModel)]="value2" />
        <label for="in_label">In Label</label>
    </p-floatlabel>
    <p-inputgroup-addon>.00</p-inputgroup-addon>
</p-inputgroup>

<p-inputgroup>
    <p-inputgroup-addon>www</p-inputgroup-addon>
    <p-floatlabel variant="on">
        <input pInputText id="on_label" [(ngModel)]="value3" />
        <label for="on_label">On Label</label>
    </p-floatlabel>
</p-inputgroup>`,

        html: `<div class="card flex flex-col md:items-end md:flex-row gap-4">
    <p-inputgroup>
        <p-inputgroup-addon>
            <i class="pi pi-user"></i>
        </p-inputgroup-addon>
        <p-floatlabel>
            <input pInputText id="over_label" [(ngModel)]="value1" />
            <label for="over_label">Over Label</label>
        </p-floatlabel>
    </p-inputgroup>

    <p-inputgroup>
        <p-inputgroup-addon>$</p-inputgroup-addon>
        <p-floatlabel variant="in">
            <input pInputText id="in_label" [(ngModel)]="value2" />
            <label for="in_label">In Label</label>
        </p-floatlabel>
        <p-inputgroup-addon>.00</p-inputgroup-addon>
    </p-inputgroup>

    <p-inputgroup>
        <p-inputgroup-addon>www</p-inputgroup-addon>
        <p-floatlabel variant="on">
            <input pInputText id="on_label" [(ngModel)]="value3" />
            <label for="on_label">On Label</label>
        </p-floatlabel>
    </p-inputgroup>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
    selector: 'input-group-float-label-demo',
    templateUrl: './input-group-float-label-demo.html',
    standalone: true,
    imports: [FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, FloatLabelModule]
})
export class InputGroupFloatLabelDemo {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;
}`
    };
}
