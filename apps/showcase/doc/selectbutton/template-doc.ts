import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'template-doc',
    standalone: true,
    imports: [FormsModule, SelectButton, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>For custom content support define a template named <i>item</i> where the default local template variable refers to an option.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-selectbutton [options]="justifyOptions" [(ngModel)]="value" optionLabel="justify">
                    <ng-template #item let-item>
                        <i [class]="item.icon"></i>
                    </ng-template>
                </p-selectbutton>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class TemplateDoc {
    value: any;

    justifyOptions: any[] = [
        { icon: 'pi pi-align-left', justify: 'Left' },
        { icon: 'pi pi-align-right', justify: 'Right' },
        { icon: 'pi pi-align-center', justify: 'Center' },
        { icon: 'pi pi-align-justify', justify: 'Justify' }
    ];
}
