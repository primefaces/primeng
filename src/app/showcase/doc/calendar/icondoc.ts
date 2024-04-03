import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'calendar-icon-demo',
    template: `
        <app-docsectiontext>
            <p>An additional icon is displayed next to the input field when <i>showIcon</i> is present.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 p-fluid">
            <div class="flex-auto">
                <label for="buttondisplay" class="font-bold block mb-2"> Button </label>
                <p-calendar [(ngModel)]="date1" [showIcon]="true" inputId="buttondisplay" [showOnFocus]="false"/>
            </div>

            <div class="flex-auto">
                <label for="icondisplay" class="font-bold block mb-2"> Default Icon </label>
                <p-calendar [(ngModel)]="date2" [iconDisplay]="'input'" [showIcon]="true" inputId="icondisplay"/>
            </div>

            <div class="flex-auto">
                <label for="templatedisplay" class="font-bold block mb-2"> Custom Icon </label>
                <p-calendar [(ngModel)]="date3" [iconDisplay]="'input'" [showIcon]="true" [timeOnly]="true" inputId="templatedisplay">
                    <ng-template pTemplate="inputicon" let-clickCallBack="clickCallBack">
                        <i class="pi pi-clock pointer-events-none pointer-events-none" (click)="clickCallBack($event)"></i>
                    </ng-template>
                </p-calendar>
            </div>
        </div>
        <app-code [code]="code" selector="calendar-icon-demo"></app-code>
    `
})
export class IconDoc {
    date1: Date | undefined;

    date2: Date | undefined;

    date3: Date | undefined;

    code: Code = {
        basic: `<p-calendar 
    [(ngModel)]="date1" 
    [showIcon]="true" 
    [showOnFocus]="false" 
    inputId="buttondisplay"/>

<p-calendar 
    [(ngModel)]="date2" 
    [iconDisplay]="'input'" 
    [showIcon]="true" 
    inputId="icondisplay"/>

<p-calendar 
    [(ngModel)]="date3" 
    [iconDisplay]="'input'" 
    [showIcon]="true" 
    [timeOnly]="true" 
    inputId="templatedisplay">
        <ng-template pTemplate="inputicon" let-clickCallBack="clickCallBack">
            <i class="pi pi-user pointer-events-none" (click)="clickCallBack($event)"></i>
        </ng-template>
</p-calendar>`,

        html: `<div class="card flex flex-wrap gap-3 p-fluid">
<div class="flex-auto">
    <label for="buttondisplay" class="font-bold block mb-2"> Button </label>
    <p-calendar 
        [(ngModel)]="date1" 
        [showIcon]="true" 
        inputId="buttondisplay" 
        [showOnFocus]="false"/>
</div>

<div class="flex-auto">
    <label for="icondisplay" class="font-bold block mb-2"> Default Icon </label>
    <p-calendar 
        [(ngModel)]="date2" 
        [iconDisplay]="'input'" 
        [showIcon]="true" 
        inputId="icondisplay"/>
</div>

<div class="flex-auto">
    <label for="templatedisplay" class="font-bold block mb-2"> Custom Icon </label>
        <p-calendar 
            [(ngModel)]="date3" 
            [iconDisplay]="'input'" 
            [showIcon]="true" 
            [timeOnly]="true" 
            inputId="templatedisplay">
                <ng-template pTemplate="inputicon" let-clickCallBack="clickCallBack">
                    <i 
                        class="pi pi-clock pointer-events-none pointer-events-none" 
                        (click)="clickCallBack($event)"></i>
                </ng-template>
        </p-calendar>
</div>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'calendar-icon-demo',
    templateUrl: './calendar-icon-demo.html',
    standalone: true,
    imports: [CalendarModule, FormsModule]
})
export class CalendarIconDemo {
    date1: Date | undefined;

    date2: Date | undefined;

    date3: Date | undefined;
}`
    };
}
