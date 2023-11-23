import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'material-doc',
    template: ` 
        <app-docsectiontext>
            <p><a href="https://fonts.google.com/icons">Material icons</a> is the official icon library based on Google Material Design.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class MaterialDoc {

    code: Code = {
        basic: `<p-dropdown>
    <ng-template pTemplate="dropdownicon">
        <span class="material-icons">arrow_drop_down</span>
    </ng-template>
</p-dropdown>`
    };

}
