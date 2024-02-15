import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>ProgressBar is used with the <i>value</i> property.</p>
        </app-docsectiontext>
        <div class="card">
            <p-progressBar [value]="50"></p-progressBar>
        </div>
        <app-code [code]="code" selector="progress-bar-basic-demo"></app-code>
    `
})
export class BasicDoc {
    code: Code = {
        basic: `<p-progressBar [value]="50"></p-progressBar>`,
        html: `
<div class="card">
    <p-progressBar [value]="50"></p-progressBar>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'progress-bar-basic-demo',
    templateUrl: './progress-bar-basic-demo.html'
})
export class ProgressBarBasicDemo {}`
    };
}
