import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'datepicker-invalid-demo',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>The invalid state is applied using the <i>⁠invalid</i> property to indicate failed validation, which can be integrated with Angular Forms.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center gap-4">
            <p-datepicker [(ngModel)]="date1" [invalid]="!date1" placeholder="Date" />
            <p-datepicker [(ngModel)]="date2" [invalid]="!date2" variant="filled" placeholder="Date" />
        </div>
        <app-code [code]="code" selector="datepicker-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    date1: Date | undefined;

    date2: Date | undefined;

    code: Code = {
        basic: `<p-datepicker [(ngModel)]="date1" [invalid]="!date1" placeholder="Date" />
<p-datepicker [(ngModel)]="date2" [invalid]="!date2" variant="filled" placeholder="Date" />`,

        html: `<div class="card flex flex-wrap justify-center gap-4">
    <p-datepicker [(ngModel)]="date1" [invalid]="!date1" placeholder="Date" />
    <p-datepicker [(ngModel)]="date2" [invalid]="!date2" variant="filled" placeholder="Date" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';

@Component({
    selector: 'datepicker-invalid-demo',
    templateUrl: './datepicker-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerInvalidDemo {
    date1: Date | undefined;
    
    date2: Date | undefined;
}`
    };
}
