import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'basic-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>SelectButton requires a value to bind and a collection of options.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-selectbutton [options]="options" [(ngModel)]="selection" />

            <p-selectbutton [options]="options" [(ngModel)]="selection">
                <ng-template #item let-item>
                    <i [class]="item.icon"></i>
                </ng-template>
            </p-selectbutton>

            <p-selectbutton [options]="options" [(ngModel)]="value" optionLabel="label" optionValue="value" aria-labelledby="basic" />
        </div>
        <app-code [code]="code" selector="select-button-basic-demo"></app-code>
    `
})
export class BasicDoc {
    readonly options = [
        { label: 'Left', icon: 'pi pi-caret-left', value: '1' },
        { label: 'Down', icon: 'pi pi-caret-down', value: '2' },
        { label: 'Right', icon: 'pi pi-caret-right', value: '3' }
    ];
    selection: (typeof this.options)[number] | undefined;
    value: string = '2';
    code: Code = {
        basic: `<p-selectbutton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value" aria-labelledby="basic" />`,

        html: `<div class="card flex justify-center">
    <p-selectbutton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value" aria-labelledby="basic" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';

@Component({
    selector: 'select-button-basic-demo',
    templateUrl: './select-button-basic-demo.html',
    standalone: true,
    imports: [FormsModule, SelectButton]
})
export class SelectButtonBasicDemo {
    stateOptions: any[] = [{ label: 'One-Way', value: 'one-way' },{ label: 'Return', value: 'return' }];

    value: string = 'off';
}`
    };
}
