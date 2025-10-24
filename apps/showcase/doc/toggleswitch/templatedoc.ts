import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'template-doc',
    standalone: true,
    imports: [CommonModule, FormsModule, ToggleSwitchModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The <i>handle</i> template is available to display custom content.</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-4">
            <p-toggleswitch [(ngModel)]="checked">
                <ng-template #handle let-checked="checked">
                    <i [ngClass]="['!text-xs', 'pi', checked ? 'pi-check' : 'pi-times']"></i>
                </ng-template>
            </p-toggleswitch>
        </div>
        <app-code [code]="code" selector="toggle-switch-basic-demo"></app-code>
    `
})
export class TemplateDoc {
    checked: boolean = false;

    code: Code = {
        basic: `<p-toggleswitch [(ngModel)]="checked">
    <ng-template #handle let-checked="checked">
        <i [ngClass]="['!text-xs', 'pi', checked ? 'pi-check' : 'pi-times']"></i>
    </ng-template>
</p-toggleswitch>`,

        html: `<div class="card flex justify-center gap-4">
    <p-toggleswitch [(ngModel)]="checked">
        <ng-template #handle let-checked="checked">
            <i [ngClass]="['!text-xs', 'pi', checked ? 'pi-check' : 'pi-times']"></i>
        </ng-template>
    </p-toggleswitch>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'toggle-switch-template-demo',
    templateUrl: './toggle-switch-template-demo.html',
    standalone: true,
    imports: [FormsModule, ToggleSwitch]
})
export class ToggleSwitchTemplateDemo {
    checked: boolean = false;
}`
    };
}
