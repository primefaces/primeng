import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'sizes-doc',
    template: `
        <app-docsectiontext>
            <p>Password provides <i>small</i> and <i>large</i> sizes as alternatives to the base.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4">
            <p-password [(ngModel)]="value1" type="text" size="small" placeholder="Small" />
            <p-password [(ngModel)]="value2" type="text" placeholder="Normal" />
            <p-password [(ngModel)]="value3" type="text" size="large" placeholder="Large" />
        </div>
        <app-code [code]="code" selector="password-sizes-demo"></app-code>
    `
})
export class SizesDoc {
    value1: string;

    value2: string;

    value3: string;

    code: Code = {
        basic: `<p-password [(ngModel)]="value1" type="text" size="small" placeholder="Small" />
<p-password [(ngModel)]="value2" type="text" placeholder="Normal" />
<p-password [(ngModel)]="value3" type="text" size="large" placeholder="Large" />`,

        html: `<div class="card flex flex-col items-center gap-4">
    <p-password [(ngModel)]="value1" type="text" size="small" placeholder="Small" />
    <p-password [(ngModel)]="value2" type="text" placeholder="Normal" />
    <p-password [(ngModel)]="value3" type="text" size="large" placeholder="Large" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'password-sizes-demo',
    templateUrl: './password-sizes-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule]
})
export class PasswordSizesDemo {
    value1: string;

    value2: string;

    value3: string;
}`
    };
}
