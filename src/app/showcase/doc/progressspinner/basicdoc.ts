import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>An infinite spin animation is displayed by default.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-progressSpinner ariaLabel="loading" />
        </div>
        <app-code [code]="code" selector="progress-spinner-basic-demo"></app-code>
    `
})
export class BasicDoc {
    code: Code = {
        basic: `<p-progressSpinner ariaLabel="loading" />`,
        html: `<div class="card flex justify-content-center">
    <p-progressSpinner ariaLabel="loading" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'progress-spinner-basic-demo',
    templateUrl: './progress-spinner-basic-demo.html',
    standalone: true,
    imports: [ProgressSpinnerModule]
})
export class ProgressSpinnerBasicDemo {}`
    };
}
