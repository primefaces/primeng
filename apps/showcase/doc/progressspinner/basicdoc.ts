import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>An infinite spin animation is displayed by default.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-progress-spinner ariaLabel="loading" />
        </div>
        <app-code [code]="code" selector="progress-spinner-basic-demo"></app-code>
    `
})
export class BasicDoc {
    code: Code = {
        basic: `<p-progress-spinner ariaLabel="loading" />`,
        html: `<div class="card flex justify-center">
    <p-progress-spinner ariaLabel="loading" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
    selector: 'progress-spinner-basic-demo',
    templateUrl: './progress-spinner-basic-demo.html',
    standalone: true,
    imports: [ProgressSpinner]
})
export class ProgressSpinnerBasicDemo {}`
    };
}
