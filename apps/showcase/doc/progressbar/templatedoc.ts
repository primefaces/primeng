import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p><i>content</i> template allows displaying custom content inside the progressbar.</p>
        </app-docsectiontext>
        <div class="card">
            <p-progressbar [value]="50">
                <ng-template pTemplate="content" let-value>
                    <span>{{ value }}/100</span>
                </ng-template>
            </p-progressbar>
        </div>
        <app-code [code]="code" selector="progress-bar-template-demo"></app-code>
    `
})
export class TemplateDoc {
    code: Code = {
        basic: `<p-progressbar [value]="50">
    <ng-template pTemplate="content" let-value>
        <span>{{value}}/100</span>
    </ng-template>
</p-progressbar>`,
        html: `<div class="card">
     <p-progressbar [value]="50">
         <ng-template pTemplate="content" let-value>
            <span>{{value}}/100</span>
         </ng-template>
     </p-progressbar>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { ProgressBar } from 'primeng/progressbar';

@Component({
    selector: 'progress-bar-template-demo',
    templateUrl: './progress-bar-template-demo.html',
    standalone: true,
    imports: [ProgressBar]
})
export class ProgressBarTemplateDemo {}`
    };
}
