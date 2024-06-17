import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'checkbox-label-demo',
    template: `
        <app-docsectiontext>
            <p>The label attribute provides a label text for the checkbox. This label is also clickable and toggles the checked state.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center gap-3">
            <p-checkbox name="groupname" value="val1" label="Value 1" [(ngModel)]="selectedValues"></p-checkbox>
            <p-checkbox name="groupname" value="val2" label="Value 2" [(ngModel)]="selectedValues"></p-checkbox>
        </div>
        <app-code [code]="code" selector="checkbox-label-demo"></app-code>
    `
})
export class LabelDoc {
    selectedValues: string[] = [];

    code: Code = {
        basic: `<p-checkbox name="groupname" value="val1" label="Value 1" [(ngModel)]="selectedValues"></p-checkbox>
<p-checkbox name="groupname" value="val2" label="Value 2" [(ngModel)]="selectedValues"></p-checkbox>`,

        html: `
<div class="card flex justify-content-center gap-3">
    <p-checkbox name="groupname" value="val1" label="Value 1" [(ngModel)]="selectedValues"></p-checkbox>
    <p-checkbox name="groupname" value="val2" label="Value 2" [(ngModel)]="selectedValues"></p-checkbox>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'checkbox-label-demo',
    templateUrl: './checkbox-label-demo.html'
})
export class CheckboxLabelDemo {
    selectedValues: string[] = [];
}`
    };
}
