import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>ProgressBar is used with the <i>value</i> property.</p>
        </app-docsectiontext>
        <div class="card">
            <p-progressBar [value]="50" />
        </div>
        <app-code [code]="code" selector="progress-bar-basic-demo"></app-code>
    `
})
export class BasicDoc {
    code: Code = {
        basic: `<p-progressBar [value]="50" />`,
        html: `<div class="card">
    <p-progressBar [value]="50" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
    selector: 'progress-bar-basic-demo',
    templateUrl: './progress-bar-basic-demo.html',
    standalone: true,
    imports: [ProgressBarModule]
})
export class ProgressBarBasicDemo {}`
    };
}
