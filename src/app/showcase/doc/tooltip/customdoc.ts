import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'custom-doc',
    template: `
        <app-docsectiontext>
            <p>Tooltip can use either a <i>string</i> or a <i>TemplateRef</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-button [pTooltip]="tooltipContent" severity="secondary" tooltipPosition="bottom" label="Button" />
            <ng-template #tooltipContent>
                <div class="flex align-items-center">
                    <span> <b>PrimeNG</b> rocks! </span>
                </div>
            </ng-template>
        </div>
        <app-code [code]="code" selector="tooltip-custom-demo"></app-code>
    `
})
export class CustomDoc {
    code: Code = {
        basic: `<p-button 
    [pTooltip]="tooltipContent" 
    severity="secondary" 
    tooltipPosition="bottom" 
    label="Button" />
<ng-template #tooltipContent>
    <div class="flex align-items-center">
        <span> <b>PrimeNG</b> rocks! </span>
    </div>
</ng-template>`,

        html: `<div class="card flex justify-content-center">
    <p-button 
        [pTooltip]="tooltipContent"
        severity="secondary" 
        tooltipPosition="bottom" 
        label="Button" />
            <ng-template #tooltipContent>
                <div class="flex align-items-center">
                    <span> <b>PrimeNG</b> rocks! </span>
                </div>
            </ng-template>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'tooltip-custom-demo',
    templateUrl: './tooltip-custom-demo.html',
    standalone: true,
    imports: [TooltipModule, ButtonModule]
})
export class TooltipCustomDemo {
  
}`
    };
}
