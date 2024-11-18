import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'sizes-doc',
    template: `
        <app-docsectiontext>
            <p>SelectButton provides <i>small</i> and <i>large</i> sizes as alternatives to the base.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4">
            <p-selectbutton [(ngModel)]="value1" [options]="options" size="small" />
            <p-selectbutton [(ngModel)]="value2" [options]="options" />
            <p-selectbutton [(ngModel)]="value3" [options]="options" size="large" />
        </div>
        <app-code [code]="code" selector="select-button-sizes-demo"></app-code>
    `
})
export class SizesDoc {
    value1!: string;

    value2: string = 'Beginner';

    value3: string = 'Expert';

    options: any[] = [
        { label: 'Beginner', value: 'Beginner' },
        { label: 'Expert', value: 'Expert' }
    ];

    code: Code = {
        basic: `<p-selectbutton [(ngModel)]="value1" [options]="options" size="small" />
<p-selectbutton [(ngModel)]="value2" [options]="options" />
<p-selectbutton [(ngModel)]="value3" [options]="options" size="large" />`,

        html: `<div class="card flex flex-col items-center gap-4">
    <p-selectbutton [(ngModel)]="value1" [options]="options" size="small" />
    <p-selectbutton [(ngModel)]="value2" [options]="options" />
    <p-selectbutton [(ngModel)]="value3" [options]="options" size="large" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';

@Component({
    selector: 'select-button-sizes-demo',
    templateUrl: './select-button-sizes-demo.html',
    standalone: true,
    imports: [FormsModule, SelectButton]
})
export class SelectButtonSizesDemo {
    value1! : string;

    value2 : string = 'Beginner';

    value3 : string = 'Expert';

    options: any[] = [
        { label: 'Beginner', value: 'Beginner' },
        { label: 'Expert', value: 'Expert' },
    ];
}`
    };
}
