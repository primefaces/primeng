import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [ProgressBarModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>ProgressBar is used with the <i>value</i> property.</p>
        </app-docsectiontext>
        <div class="card">
            <p-progressbar [value]="50" />
        </div>
        <app-code [code]="code" selector="progress-bar-basic-demo"></app-code>
    `
})
export class BasicDoc {
    code: Code = {
        basic: `<p-progressbar [value]="50" />`,
        html: `<div class="card">
    <p-progressbar [value]="50" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { ProgressBar } from 'primeng/progressbar';

@Component({
    selector: 'progress-bar-basic-demo',
    templateUrl: './progress-bar-basic-demo.html',
    standalone: true,
    imports: [ProgressBar]
})
export class ProgressBarBasicDemo {}`
    };
}
