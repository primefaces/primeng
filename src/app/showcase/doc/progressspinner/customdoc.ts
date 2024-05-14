import { Component, Input } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'custom-doc',
    template: `
        <app-docsectiontext>
            <p>ProgressSpinner can be customized with styling property like <i>styleClass</i>, <i>strokeWidth</i> and <i>fill</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-progressSpinner styleClass="w-4rem h-4rem" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
        </div>
        <app-code [code]="code" selector="progress-spinner-custom-demo"></app-code>
    `
})
export class CustomDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `<p-progressSpinner 
    styleClass="w-4rem h-4rem" 
    strokeWidth="8" 
    fill="var(--surface-ground)" 
    animationDuration=".5s" />`,
        html: `<div class="card flex justify-content-center">
    <p-progressSpinner 
        styleClass="w-4rem h-4rem" 
        strokeWidth="8" 
        fill="var(--surface-ground)" 
        animationDuration=".5s" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'progress-spinner-custom-demo',
    templateUrl: './progress-spinner-custom-demo.html',
    standalone: true,
    imports: [ProgressSpinnerModule]
})
export class ProgressSpinnerCustomDemo {}`
    };
}
