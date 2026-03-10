import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'invalid-doc',
    standalone: true,
    imports: [FormsModule, DatePickerModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The invalid state is applied using the <i>⁠invalid</i> property to indicate failed validation, which can be integrated with Angular Forms.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-wrap justify-center gap-4">
                <p-datepicker [(ngModel)]="date1" [invalid]="!date1" placeholder="Date" />
                <p-datepicker [(ngModel)]="date2" [invalid]="!date2" variant="filled" placeholder="Date" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class InvalidDoc {
    date1: Date | undefined;

    date2: Date | undefined;
}
