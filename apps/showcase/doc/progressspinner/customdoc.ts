import { Code } from '@/domain/code';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'custom-doc',
    template: `
        <app-docsectiontext>
            <p>ProgressSpinner can be customized with styling property like <i>styleClass</i>, <i>strokeWidth</i> and <i>fill</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-progress-spinner strokeWidth="8" fill="transparent" animationDuration=".5s" [style]="{ width: '50px', height: '50px' }" />
        </div>
        <app-code [code]="code" selector="progress-spinner-custom-demo"></app-code>
    `
})
export class CustomDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `<p-progress-spinner strokeWidth="8" fill="transparent" animationDuration=".5s" [style]="{ width: '50px', height: '50px' }" />`,
        html: `<div class="card flex justify-center">
    <p-progress-spinner strokeWidth="8" fill="transparent" animationDuration=".5s" [style]="{ width: '50px', height: '50px' }" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
    selector: 'progress-spinner-custom-demo',
    templateUrl: './progress-spinner-custom-demo.html',
    standalone: true,
    imports: [ProgressSpinner]
})
export class ProgressSpinnerCustomDemo {}`
    };
}
