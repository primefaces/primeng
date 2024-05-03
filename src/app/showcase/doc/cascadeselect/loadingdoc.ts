import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'cascade-select-loading-demo',
    template: `
        <app-docsectiontext>
            <p>Loading state can be used <i>loading</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-cascadeSelect [loading]="true" [style]="{ minWidth: '14rem' }" placeholder="Loading..." />
        </div>
        <app-code [code]="code" selector="cascade-select-loading-demo"></app-code>
    `
})
export class LoadingDoc {
    code: Code = {
        basic: `<p-cascadeSelect 
    [loading]="true" 
    [style]="{ minWidth: '14rem' }"
    placeholder="Loading..." />`,

        html: `<div class="card flex justify-content-center">
    <p-cascadeSelect 
        [loading]="true"
        [style]="{ minWidth: '14rem' }" 
        placeholder="Loading..." />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';

@Component({
    selector: 'cascade-select-loading-demo',
    templateUrl: './cascade-select-loading-demo.html',
    standalone: true,
    imports: [FormsModule, CascadeSelectModule]
})
export class CascadeSelectLoadingDemo {}`
    };
}
