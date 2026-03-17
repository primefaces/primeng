import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'template-doc',
    standalone: true,
    imports: [CommonModule, FormsModule, ToggleSwitchModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The <i>handle</i> template is available to display custom content.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center gap-4">
                <p-toggleswitch [(ngModel)]="checked">
                    <ng-template #handle let-checked="checked">
                        <i [ngClass]="['text-xs!', 'pi', checked ? 'pi-check' : 'pi-times']"></i>
                    </ng-template>
                </p-toggleswitch>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class TemplateDoc {
    checked: boolean = false;
}
