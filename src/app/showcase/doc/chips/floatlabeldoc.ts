import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'chips-float-label-demo',
    template: `
        <app-docsectiontext>
            <p>A floating label appears on top of the input field when focused. Visit <a [routerLink]="'/floatlabel'">FloatLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card p-fluid">
            <p-floatLabel>
                <p-chips id="chips" [(ngModel)]="values" />
                <label for="chips">Chips</label>
            </p-floatLabel>
        </div>
        <app-code [code]="code" selector="chips-float-label-demo"></app-code>
    `
})
export class FloatLabelDoc {
    values: string[] | undefined;

    code: Code = {
        basic: `<p-floatLabel>
    <p-chips id="chips" [(ngModel)]="values" />
    <label for="chips">Chips</label>
</p-floatLabel>`,

        html: `<div class="card p-fluid">
    <p-floatLabel>
        <p-chips id="chips" [(ngModel)]="values" />
        <label for="chips">Chips</label>
    </p-floatLabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
    selector: 'chips-float-label-demo',
    templateUrl: './chips-float-label-demo.html',
    standalone: true,
    imports: [FormsModule, ChipsModule, FloatLabelModule]
})
export class ChipsFloatLabelDemo {
    values: string[] | undefined;
}`
    };
}
