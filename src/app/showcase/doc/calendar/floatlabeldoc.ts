import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'calendar-float-label-demo',
    template: `
        <app-docsectiontext>
            <p>A floating label appears on top of the input field when focused. Visit <a routerLink="/floatlabel">FloatLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-floatLabel>
                <p-calendar [(ngModel)]="date" inputId="birth_date" />
                <label for="birth_date">Birth Date</label>
            </p-floatLabel>
        </div>
        <app-code [code]="code" selector="calendar-float-label-demo"></app-code>
    `
})
export class FloatLabelDoc {
    date: Date | undefined;

    code: Code = {
        basic: `<p-floatLabel>
    <p-calendar 
        [(ngModel)]="date" 
        inputId="birth_date" />
    <label for="birth_date">Birth Date</label>
</p-floatLabel>`,

        html: `<div class="card flex justify-content-center">
    <p-floatLabel>
        <p-calendar 
            [(ngModel)]="date" 
            inputId="birth_date" />
        <label for="birth_date">Birth Date</label>
    </p-floatLabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
    selector: 'calendar-float-label-demo',
    templateUrl: './calendar-float-label-demo.html',
    standalone: true,
    imports: [FormsModule, CalendarModule, FloatLabelModule]
})
export class CalendarFloatLabelDemo {
    date: Date | undefined;
}`
    };
}
