import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'size-doc',
    standalone: true,
    imports: [FormsModule, ToggleSwitchModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>ToggleSwitch provides <i>small</i> and <i>large</i> sizes as alternatives to the standard.</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-4 items-center">
            <p-toggleswitch [(ngModel)]="checked1" size="small" />
            <p-toggleswitch [(ngModel)]="checked2" />
            <p-toggleswitch [(ngModel)]="checked3" size="large" />
        </div>
        <app-code></app-code>
    `
})
export class SizeDoc {
    checked1: boolean = false;

    checked2: boolean = false;

    checked3: boolean = false;
}
