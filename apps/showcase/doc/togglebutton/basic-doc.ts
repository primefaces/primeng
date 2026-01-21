import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [FormsModule, ToggleButtonModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Two-way binding to a boolean property is defined using the standard <i>ngModel</i> directive.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-togglebutton [(ngModel)]="checked" onLabel="On" offLabel="Off" class="w-24" />
        </div>
        <app-code></app-code>
    `
})
export class BasicDoc {
    checked: boolean = false;
}
