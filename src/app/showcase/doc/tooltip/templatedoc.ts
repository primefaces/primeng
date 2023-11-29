import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'options-doc',
    template: `
        <app-docsectiontext>
            <p>Tooltip can use either a <i>string</i> or a <i>TemplateRef</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <input type="text" pInputText [pTooltip]="tooltipContent" placeholder="hover to display tooltip" />
            <ng-template #tooltipContent>
                <div class="flex align-items-center">
                    <img src="https://primefaces.org/cdn/primeng/images/primeng.svg" height="20" class="mr-2" />
                    <span> <b>PrimeNG</b> rocks! </span>
                </div>
            </ng-template>
        </div>
        <app-code [code]="code" selector="tooltip-template-demo"></app-code>
    `
})
export class TemplateDoc {
    code: Code = {
        basic: `<input type="text" pInputText [pTooltip]="tooltipContent" placeholder="hover to display tooltip">

<ng-template #tooltipContent>
    <div class="flex align-items-center">
        <img src="https://primefaces.org/cdn/primeng/images/primeng.svg" height="20" class="mr-2" />
        <span>
            <b>PrimeNG</b> rocks!
        </span>
    </div>
</ng-template>`,

        html: `
<input type="text" pInputText [pTooltip]="tooltipContent" placeholder="hover to display tooltip">

<ng-template #tooltipContent>
    <div class="flex align-items-center">
        <img src="https://primefaces.org/cdn/primeng/images/primeng.svg" height="20" class="mr-2" />
        <span>
            <b>PrimeNG</b> rocks!
        </span>
    </div>
</ng-template>`
    };
}
