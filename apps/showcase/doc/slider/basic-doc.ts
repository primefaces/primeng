import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [FormsModule, SliderModule, AppDocSectionText, AppCode, AppDemoWrapper],
    template: `
        <app-docsectiontext>
            <p>Two-way binding is defined using the standard <i>ngModel</i> directive.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-slider [(ngModel)]="value" class="w-56" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class BasicDoc {
    value!: number;
}
