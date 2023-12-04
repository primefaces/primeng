import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
        <p><i>content</i> template allows displaying custom content inside the progressbar.</p>
        </app-docsectiontext>
        <div class="card">
            <p-progressBar [value]="50">
                <ng-template pTemplate="content" let-value> 
                <span>{{value}}/100</span>       
            </ng-template>
            </p-progressBar>
        </div>
        <app-code [code]="code" selector="progress-bar-template-demo"></app-code>
    `
})
export class TemplateDoc {
    code: Code = {
        basic: `<p-progressBar [value]="50">
    <ng-template pTemplate="content" let-value> 
    <span>{{value}}/100</span>    
    </ng-template>
</p-progressBar>`,
        html: `<div class="card">
     <p-progressBar [value]="50">
         <ng-template pTemplate="content" let-value> 
         <span>{{value}}/100</span>        
         </ng-template>
     </p-progressBar>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'progress-bar-template-demo',
    templateUrl: './progress-bar-template-demo.html'
})
export class ProgressBarTemplateDemo {}`
    };
}
