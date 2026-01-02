import { Component } from '@angular/core';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'cascade-select-disabled-demo',
    standalone: true,
    imports: [CascadeSelectModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-cascadeselect [disabled]="true" placeholder="Disabled" [style]="{ minWidth: '14rem' }" />
        </div>
        <app-code selector="cascade-select-disabled-demo"></app-code>
    `
})
export class DisabledDoc {}
