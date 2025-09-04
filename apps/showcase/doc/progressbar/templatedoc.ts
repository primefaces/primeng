import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'template-doc',
    standalone: true,
    imports: [ProgressBarModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p><i>content</i> template allows displaying custom content inside the progressbar.</p>
        </app-docsectiontext>
        <div class="card">
            <p-progressbar [value]="50">
                <ng-template #content let-value>
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
    <ng-template #content let-value>
        <span>{{value}}/100</span>
    </ng-template>
</p-progressbar>`,
        html: `<div class="card">
     <p-progressbar [value]="50">
         <ng-template #content let-value>
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
