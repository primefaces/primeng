import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'label-doc',
    standalone: true,
    imports: [FormsModule, CheckboxModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The label attribute provides a label text for the checkbox. This label is also clickable and toggles the checked state.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center gap-4">
                <p-checkbox name="groupname" value="val1" label="Value 1" [(ngModel)]="selectedValues"></p-checkbox>
                <p-checkbox name="groupname" value="val2" label="Value 2" [(ngModel)]="selectedValues"></p-checkbox>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class LabelDoc {
    selectedValues: string[] = [];
}
