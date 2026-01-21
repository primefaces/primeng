import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { TextareaModule } from 'primeng/textarea';

@Component({
    selector: 'filled-doc',
    standalone: true,
    imports: [FormsModule, AppCode, AppDocSectionText, TextareaModule],
    template: `
        <app-docsectiontext>
            <p>Specify the <i>variant</i> property as <i>filled</i> to display the component with a higher visual emphasis than the default <i>outlined</i> style.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <textarea [(ngModel)]="value" [variant]="'filled'" rows="5" cols="30" pTextarea></textarea>
        </div>
        <app-code></app-code>
    `
})
export class FilledDoc {
    value!: string;
}
