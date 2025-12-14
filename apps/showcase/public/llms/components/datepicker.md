# Angular DatePicker Component

DatePicker is an input component to select a date.

## Accessibility

Screen Reader Value to describe the component can either be provided via label tag combined with inputId prop or using aria-labelledby , aria-label props. The input element has combobox role in addition to aria-autocomplete as "none", aria-haspopup as "dialog" and aria-expanded attributes. The relation between the input and the popup is created with aria-controls attribute that refers to the id of the popup. The optional DatePicker button requires includes aria-haspopup , aria-expanded for states along with aria-controls to define the relation between the popup and the button. The value to read is retrieved from the chooseDate key of the aria property from the locale API. This label is also used for the aria-label of the popup as well. When there is a value selected, it is formatted and appended to the label to be able to notify users about the current value. Popup has a dialog role along with aria-modal and aria-label . The navigation buttons at the header has an aria-label retrieved from the prevYear , nextYear , prevMonth , nextMonth , prevDecade and nextDecade keys of the locale aria API. Similarly month picker button uses the chooseMonth and year picker button uses the chooseYear keys. Main date table uses grid role that contains th elements with col as the scope along with abbr tag resolving to the full name of the month. Each date cell has an aria-label referring to the full date value. Buttons at the footer utilize their readable labels as aria-label as well. Selected date also receives the aria-selected attribute. Timepicker spinner buttons get their labels for aria-label from the aria locale API using the prevHour , nextHour , prevMinute , nextMinute , prevSecond , nextSecond , am and pm keys. DatePicker also includes a hidden section that is only available to screen readers with aria-live as "polite". This element is updated when the selected date changes to instruct the user about the current date selected.

```html
<label for="date1">Date</label>
<p-datepicker inputId="date1"/>

<span id="date2">Date</span>
<p-datepicker ariaLabelledBy="date2"/>

<p-datepicker ariaLabel="Date"/>
```

## Basic

Two-way value binding is defined using the standard ngModel directive referencing to a Date property.

```html
<p-datepicker [(ngModel)]="date" />
```

## Button Bar

When showButtonBar is present, today and clear buttons are displayed at the footer. The content can be fully customized with the buttonbar template as well.

```html
<p-datepicker [(ngModel)]="date" [showButtonBar]="true" placeholder="Basic" />
<p-datepicker [(ngModel)]="dates" [showButtonBar]="true" placeholder="Customized" selectionMode="range" [readonlyInput]="true">
    <ng-template #buttonbar let-todayCallback="todayCallback" let-clearCallback="clearCallback">
        <div class="flex justify-between w-full">
            <div class="flex gap-2">
                <p-button size="small" label="Exact" severity="secondary" />
                <p-button size="small" label="Flexible" severity="secondary" />
            </div>
            <div class="flex gap-2">
                <p-button size="small" label="Today" (click)="todayCallback($event)" variant="outlined" />
                <p-button size="small" icon="pi pi-times" severity="danger" variant="text" (click)="clearCallback($event)" />
            </div>
        </div>
    </ng-template>
</p-datepicker>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'date-picker-buttonbar-demo',
    templateUrl: './date-picker-buttonbar-demo.html',
    standalone: true,
    imports: [FormsModule, DatePickerModule, ButtonModule]
})
export class DatePickerButtonbarDemo {
    date: Date | undefined;

    dates: Date[] | undefined;
}
```
</details>

## Clear Icon

When showClear is enabled, a clear icon is displayed to clear the value.

```html
<p-datepicker [(ngModel)]="date" [showClear]="true" inputStyleClass="w-56" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'date-picker-clear-icon-demo',
    templateUrl: './date-picker-clear-icon-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerClearIconDemo {
    date: Date | undefined;
}
```
</details>

## Date Template

Custom content can be placed inside date cells with the ng-template property that takes a Date as a parameter.

```html
<p-datepicker [(ngModel)]="date">
    <ng-template #date let-date>
        <strong *ngIf="date.day > 10 && date.day < 15; else elseBlock" style="text-decoration: line-through">{{ date.day }}</strong>
        <ng-template #elseBlock>{{ date.day }}</ng-template>
    </ng-template>
</p-datepicker>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'date-picker-datetemplate-demo',
    templateUrl: './date-picker-datetemplate-demo.html',
    standalone: true,
    imports: [FormsModule, DatePickerModule]
})
export class DatePickerDatetemplateDemo {
    date: Date[] | undefined;
}
```
</details>

## Disabled

When disabled is present, the element cannot be edited and focused.

```html
<p-datepicker [(ngModel)]="date" [disabled]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';

@Component({
    selector: 'date-picker-disabled-demo',
    templateUrl: './date-picker-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerDisabledDemo {
    date: Date | undefined;
}
```
</details>

## Filled

Specify the variant property as filled to display the component with a higher visual emphasis than the default outlined style.

```html
<p-datepicker [(ngModel)]="date" variant="filled" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';

@Component({
    selector: 'date-picker-filled-demo',
    templateUrl: './date-picker-filled-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerFilledDemo {
    date: Date[] | undefined;
}
```
</details>

## Float Label

A floating label appears on top of the input field when focused. Visit FloatLabel documentation for more information.

```html
<p-floatlabel>
    <p-datepicker [(ngModel)]="value1" inputId="over_label" showIcon iconDisplay="input" />
    <label for="over_label">Over Label</label>
</p-floatlabel>

<p-floatlabel variant="in">
    <p-datepicker [(ngModel)]="value2" inputId="in_label" showIcon iconDisplay="input" />
    <label for="in_label">In Label</label>
</p-floatlabel>

<p-floatlabel variant="on">
    <p-datepicker [(ngModel)]="value3" inputId="on_label" showIcon iconDisplay="input" />
    <label for="on_label">On Label</label>
</p-floatlabel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
    selector: 'date-picker-float-label-demo',
    templateUrl: './date-picker-float-label-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker, FloatLabel]
})
export class DatePickerFloatLabelDemo {
    value1: Date | undefined;

    value2: Date | undefined;

    value3: Date | undefined;
}
```
</details>

## Fluid

The fluid prop makes the component take up the full width of its container when set to true.

```html
<p-datepicker [(ngModel)]="date" fluid />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'date-picker-fluid-demo',
    templateUrl: './date-picker-fluid-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerFluidDemo {
    date: Date | undefined;
}
```
</details>

## Format

Default date format is mm/dd/yy which can be customized using the dateFormat property. Following options can be a part of the format. d - day of month (no leading zero) dd - day of month (two digit) o - day of the year (no leading zeros) oo - day of the year (three digit) D - day name short DD - day name long m - month of year (no leading zero) mm - month of year (two digit) M - month name short MM - month name long y - year (two digit) yy - year (four digit) &#64; - Unix timestamp (ms since 01/01/1970) ! - Windows ticks (100ns since 01/01/0001) '...' - literal text '' - single quote anything else - literal text

```html
<p-datepicker [(ngModel)]="date" dateFormat="dd.mm.yy" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';

@Component({
    selector: 'date-picker-format-demo',
    templateUrl: './date-picker-format-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerFormatDemo {
    date: Date | undefined;
}
```
</details>

## Icon

An additional icon is displayed next to the input field when showIcon is present.

```html
<p-datepicker [(ngModel)]="date1" [showIcon]="true" inputId="buttondisplay" [showOnFocus]="false" />

<p-datepicker [(ngModel)]="date2" [iconDisplay]="'input'" [showIcon]="true" inputId="icondisplay" />

<p-datepicker [(ngModel)]="date3" [iconDisplay]="'input'" [showIcon]="true" [timeOnly]="true" inputId="templatedisplay">
    <ng-template #inputicon let-clickCallBack="clickCallBack">
        <i class="pi pi-clock" (click)="clickCallBack($event)"></i>
    </ng-template>
</p-datepicker>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { FluidModule } from 'primeng/fluid';

@Component({
    selector: 'date-picker-icon-demo',
    templateUrl: './date-picker-icon-demo.html',
    standalone: true,
    imports: [DatePickerModule, FormsModule, FluidModule]
})
export class DatePickerIconDemo {
    date1: Date | undefined;

    date2: Date | undefined;

    date3: Date | undefined;
}
```
</details>

## Ifta Label

IftaLabel is used to create infield top aligned labels. Visit IftaLabel documentation for more information.

```html
<p-iftalabel>
    <p-datepicker [(ngModel)]="value" inputId="date" showIcon iconDisplay="input" />
    <label for="date">Date</label>
</p-iftalabel>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
    selector: 'date-picker-ifta-label-demo',
    templateUrl: './date-picker-ifta-label-demo.html',
    standalone: true,
    imports: [FormsModule, DatePickerModule, IftaLabelModule]
})
export class DatepickerIftaLabelDemo {
    value: Date | undefined;
}
```
</details>

## Inline

DatePicker is displayed as a popup by default, add inline property to customize this behavior.

```html
<p-datepicker class="max-w-full" [(ngModel)]="date" [inline]="true" [showWeek]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';

@Component({
    selector: 'date-picker-inline-demo',
    templateUrl: './date-picker-inline-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerInlineDemo {
    date: Date[] | undefined;
}
```
</details>

## Invalid

The invalid state is applied using the ⁠invalid property to indicate failed validation, which can be integrated with Angular Forms.

```html
<p-datepicker [(ngModel)]="date1" [invalid]="!date1" placeholder="Date" />
<p-datepicker [(ngModel)]="date2" [invalid]="!date2" variant="filled" placeholder="Date" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';

@Component({
    selector: 'date-picker-invalid-demo',
    templateUrl: './date-picker-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerInvalidDemo {
    date1: Date | undefined;
    
    date2: Date | undefined;
}
```
</details>

## Locale

Locale for different languages and formats is defined globally, refer to the PrimeNG Locale configuration for more information.

## minmaxdox

Boundaries for the permitted dates that can be entered are defined with minDate and maxDate properties.

```html
<p-datepicker [(ngModel)]="date" [minDate]="minDate" [maxDate]="maxDate" [readonlyInput]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';

@Component({
    selector: 'date-picker-minmax-demo',
    templateUrl: './date-picker-minmax-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerMinmaxDemo implements OnInit {
    date: Date | undefined;

    minDate: Date | undefined;

    maxDate: Date | undefined;

    ngOnInit() {
        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = (month === 0) ? 11 : month -1;
        let prevYear = (prevMonth === 11) ? year - 1 : year;
        let nextMonth = (month === 11) ? 0 : month + 1;
        let nextYear = (nextMonth === 0) ? year + 1 : year;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.minDate.setFullYear(prevYear);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
        this.maxDate.setFullYear(nextYear);
    }
}
```
</details>

## monthdoc

Month only picker is enabled by specifying view as month in addition to a suitable dateFormat .

```html
<p-datepicker [(ngModel)]="date" view="month" dateFormat="mm/yy" [readonlyInput]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';

@Component({
    selector: 'date-picker-month-demo',
    templateUrl: './date-picker-month-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerMonthDemo {
    date: Date[] | undefined;
}
```
</details>

## Multiple

In order to choose multiple dates, set selectionMode as multiple . In this mode, the value binding should be an array.

```html
<p-datepicker [(ngModel)]="dates" selectionMode="multiple" [readonlyInput]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';

@Component({
    selector: 'date-picker-multiple-demo',
    templateUrl: './date-picker-multiple-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerMultipleDemo {
    dates: Date[] | undefined;
}
```
</details>

## multiplemonths.doc

Number of months to display is configured with the numberOfMonths property.

```html
<p-datepicker [(ngModel)]="date" [numberOfMonths]="2" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';

@Component({
    selector: 'date-picker-multiplemonths-demo',
    templateUrl: './date-picker-multiplemonths-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerMultiplemonthsDemo {
    date: Date[] | undefined;
}
```
</details>

## Range

A range of dates can be selected by defining selectionMode as range , in this case the bound value would be an array with two values where first date is the start of the range and second date is the end.

```html
<p-datepicker [(ngModel)]="rangeDates" selectionMode="range" [readonlyInput]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';

@Component({
    selector: 'date-picker-range-demo',
    templateUrl: './date-picker-range-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerRangeDemo {
    rangeDates: Date[] | undefined;
}
```
</details>

## reactiveformsdoc

DatePicker can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

```html
<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
        <p-datepicker formControlName="selectedDate" [invalid]="isInvalid('selectedDate')" />
        @if (isInvalid('selectedDate')) {
            <p-message severity="error" size="small" variant="simple">Date is required.</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'date-picker-reactive-forms-demo',
    templateUrl: './date-picker-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, DatePickerModule, MessageModule, ToastModule, ButtonModule]
})
export class DatePickerReactiveFormsDemo {
    messageService = inject(MessageService);

    exampleForm: FormGroup | undefined;

    formSubmitted: boolean = false;

    constructor(private fb: FormBuilder) {
        this.exampleForm = this.fb.group({
            selectedDate: ['', Validators.required]
        });
    }

    onSubmit() {
        this.formSubmitted = true;
        if (this.exampleForm.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form is submitted', life: 3000 });
            this.exampleForm.reset();
            this.formSubmitted = false;
        }
    }

    isInvalid(controlName: string) {
        const control = this.exampleForm.get(controlName);
        return control?.invalid && (control.touched || this.formSubmitted);
    }
}
```
</details>

## Sizes

DatePicker provides small and large sizes as alternatives to the base.

```html
<p-datepicker [(ngModel)]="value1" size="small" placeholder="Small" showIcon iconDisplay="input" />
<p-datepicker [(ngModel)]="value2" placeholder="Normal" showIcon iconDisplay="input" />
<p-datepicker [(ngModel)]="value3" size="large" placeholder="Large" showIcon iconDisplay="input" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'date-picker-sizes-demo',
    templateUrl: './date-picker-sizes-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerSizesDemo {
    value1: Date | undefined;

    value2: Date | undefined;

    value3: Date | undefined;
}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## templatedoc

Calendar UI accepts custom content using header and footer templates.

```html
<p-calendar [(ngModel)]="date">
    <ng-template #header>Header</ng-template>
    <ng-template #footer>Footer</ng-template>
</p-calendar>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'calendar-template-demo',
    templateUrl: './calendar-template-demo.html'
})
export class CalendarTemplateDemo {
    date: Date[] | undefined;
}
```
</details>

## templatedrivenformsdoc

```html
<form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex justify-center flex-col gap-4">
    <div class="flex flex-col gap-1">
        <p-datepicker name="date" [invalid]="dateModel.invalid && (dateModel.touched || exampleForm.submitted)" #dateModel="ngModel" [(ngModel)]="date" required />
        @if (dateModel.invalid && (dateModel.touched || exampleForm.submitted)) {
            <p-message severity="error" size="small" variant="simple">Date is required.</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, inject } from '@angular/core';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'date-picker-template-driven-forms-demo',
    templateUrl: './date-picker-template-driven-forms-demo.html',
    standalone: true,
    imports: [FormsModule, DatePickerModule, MessageModule, ToastModule, ButtonModule]
})
export class DatePickerTemplateDrivenFormsDemo {
    messageService = inject(MessageService);

    date: Date | undefined;

    onSubmit(form: any) {
        if (form.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form is submitted', life: 3000 });
            form.resetForm();
        }
    }
}
```
</details>

## Time

A time picker is displayed when showTime is enabled where 12/24 hour format is configured with hourFormat property. In case, only time needs to be selected, add timeOnly to hide the date section.

```html
<p-datepicker inputId="calendar-12h" [(ngModel)]="datetime12h" [showTime]="true" [hourFormat]="12" />

<p-datepicker inputId="calendar-24h" [(ngModel)]="datetime24h" [showTime]="true" [hourFormat]="24" />

<p-datepicker inputId="calendar-timeonly" [(ngModel)]="time" [timeOnly]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { Fluid } from 'primeng/fluid';

@Component({
    selector: 'date-picker-time-demo',
    templateUrl: './date-picker-time-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker, Fluid]
})
export class DatePickerTimeDemo {

    datetime12h: Date[] | undefined;

    datetime24h: Date[] | undefined;

    time: Date[] | undefined;
}
```
</details>

## touchuidoc

When touchUI is enabled, overlay is displayed as optimized for touch devices.

```html
<p-datepicker
    [(ngModel)]="date"
    [touchUI]="true"
    [readonlyInput]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';

@Component({
    selector: 'date-picker-touchui-demo',
    templateUrl: './date-picker-touchui-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerTouchuiDemo {
    date: Date[] | undefined;
}
```
</details>

## yeardoc

Specifying view as year in addition to a suitable dateFormat enables the year picker.

```html
<p-datepicker [(ngModel)]="date" view="year" dateFormat="yy" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';

@Component({
    selector: 'date-picker-year-demo',
    templateUrl: './date-picker-year-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerYearDemo {
    date: Date[] | undefined;
}
```
</details>

## Date Picker

DatePicker is a form component to work with dates.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<DatePickerPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| required | InputSignalWithTransform<boolean, unknown> | false | There must be a value (if set). |
| invalid | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have invalid state style. |
| disabled | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have disabled state style. |
| name | InputSignal<string> | undefined | When present, it specifies that the name of the input. |
| fluid | InputSignalWithTransform<boolean, unknown> | false | Spans 100% width of the container when enabled. |
| variant | InputSignal<"outlined" \| "filled"> | 'outlined' | Specifies the input variant of the component. |
| size | InputSignal<"small" \| "large"> | undefined | Specifies the size of the component. |
| inputSize | InputSignal<number> | undefined | Specifies the visible width of the input element in characters. |
| pattern | InputSignal<string> | undefined | Specifies the value must match the pattern. |
| min | InputSignal<number> | undefined | The value must be greater than or equal to the value. |
| max | InputSignal<number> | undefined | The value must be less than or equal to the value. |
| step | InputSignal<number> | undefined | Unless the step is set to the any literal, the value must be min + an integral multiple of the step. |
| minlength | InputSignal<number> | undefined | The number of characters (code points) must not be less than the value of the attribute, if non-empty. |
| maxlength | InputSignal<number> | undefined | The number of characters (code points) must not exceed the value of the attribute. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |
| inputStyle | { [klass: string]: any } | - | Inline style of the input field. |
| inputId | string | - | Identifier of the focus input to match a label defined for the component. |
| inputStyleClass | string | - | Style class of the input field. |
| placeholder | string | - | Placeholder text for the input. |
| ariaLabelledBy | string | - | Establishes relationships between the component and label(s) where its value should be one or more element IDs. |
| ariaLabel | string | - | Defines a string that labels the input for accessibility. |
| iconAriaLabel | string | - | Defines a string that labels the icon button for accessibility. |
| dateFormat | string | - | Format of the date which can also be defined at locale settings. |
| multipleSeparator | string | , | Separator for multiple selection mode. |
| rangeSeparator | string | - | Separator for joining start and end dates on range selection mode. |
| inline | boolean | false | When enabled, displays the datepicker as inline. Default is false for popup mode. |
| showOtherMonths | boolean | true | Whether to display dates in other months (non-selectable) at the start or end of the current month. To make these days selectable use the selectOtherMonths option. |
| selectOtherMonths | boolean | false | Whether days in other months shown before or after the current month are selectable. This only applies if the showOtherMonths option is set to true. |
| showIcon | boolean | false | When enabled, displays a button with icon next to input. |
| icon | string | - | Icon of the datepicker button. |
| readonlyInput | boolean | false | When specified, prevents entering the date manually with keyboard. |
| shortYearCutoff | any | +10 | The cutoff year for determining the century for a date. |
| hourFormat | string | - | Specifies 12 or 24 hour format. |
| timeOnly | boolean | false | Whether to display timepicker only. |
| stepHour | number | 1 | Hours to change per step. |
| stepMinute | number | 1 | Minutes to change per step. |
| stepSecond | number | 1 | Seconds to change per step. |
| showSeconds | boolean | false | Whether to show the seconds in time picker. |
| showOnFocus | boolean | true | When disabled, datepicker will not be visible with input focus. |
| showWeek | boolean | false | When enabled, datepicker will show week numbers. |
| startWeekFromFirstDayOfYear | boolean | false | When enabled, datepicker will start week numbers from first day of the year. |
| showClear | boolean | false | When enabled, a clear icon is displayed to clear the value. |
| dataType | string | date | Type of the value to write back to ngModel, default is date and alternative is string. |
| selectionMode | "multiple" \| "single" \| "range" | single | Defines the quantity of the selection, valid values are "single", "multiple" and "range". |
| maxDateCount | number | - | Maximum number of selectable dates in multiple mode. |
| showButtonBar | boolean | false | Whether to display today and clear buttons at the footer |
| todayButtonStyleClass | string | - | Style class of the today button. |
| clearButtonStyleClass | string | - | Style class of the clear button. |
| autofocus | boolean | false | When present, it specifies that the component should automatically get focus on load. |
| autoZIndex | boolean | true | Whether to automatically manage layering. |
| baseZIndex | number | 0 | Base zIndex value to use in layering. |
| panelStyleClass | string | - | Style class of the datetimepicker container element. |
| panelStyle | any | - | Inline style of the datetimepicker container element. |
| keepInvalid | boolean | false | Keep invalid value when input blur. |
| hideOnDateTimeSelect | boolean | true | Whether to hide the overlay on date selection. |
| touchUI | boolean | false | When enabled, datepicker overlay is displayed as optimized for touch devices. |
| timeSeparator | string | : | Separator of time selector. |
| focusTrap | boolean | true | When enabled, can only focus on elements inside the datepicker. |
| showTransitionOptions | string | .12s cubic-bezier(0, 0, 0.2, 1) | Transition options of the show animation. **(Deprecated)** |
| hideTransitionOptions | string | .1s linear | Transition options of the hide animation. **(Deprecated)** |
| tabindex | number | - | Index of the element in tabbing order. |
| minDate | Date | - | The minimum selectable date. |
| maxDate | Date | - | The maximum selectable date. |
| disabledDates | Date[] | - | Array with dates that should be disabled (not selectable). |
| disabledDays | number[] | - | Array with weekday numbers that should be disabled (not selectable). |
| showTime | boolean | - | Whether to display timepicker. |
| responsiveOptions | DatePickerResponsiveOptions[] | - | An array of options for responsive design. |
| numberOfMonths | number | - | Number of months to display. |
| firstDayOfWeek | number | - | Defines the first of the week for various date calculations. |
| view | DatePickerTypeView | - | Type of view to display, valid values are "date" for datepicker and "month" for month picker. |
| defaultDate | Date | - | Set the date to highlight on first opening if the field is blank. |
| appendTo | InputSignal<any> | 'self' | Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |
| motionOptions | InputSignal<MotionOptions> | ... | The motion options. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onFocus | event: Event | Callback to invoke on focus of input field. |
| onBlur | event: Event | Callback to invoke on blur of input field. |
| onClose | value: HTMLElement | Callback to invoke when date panel closed. |
| onSelect | value: Date | Callback to invoke on date select. |
| onClear | value: any | Callback to invoke when input field cleared. |
| onInput | value: any | Callback to invoke when input field is being typed. |
| onTodayClick | value: Date | Callback to invoke when today button is clicked. |
| onClearClick | value: any | Callback to invoke when clear button is clicked. |
| onMonthChange | event: DatePickerMonthChangeEvent | Callback to invoke when a month is changed using the navigators. |
| onYearChange | event: DatePickerYearChangeEvent | Callback to invoke when a year is changed using the navigators. |
| onClickOutside | value: any | Callback to invoke when clicked outside of the date panel. |
| onShow | value: HTMLElement | Callback to invoke when datepicker panel is shown. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| date | TemplateRef<DatePickerDateTemplateContext> | Custom template for date cells. |
| header | TemplateRef<void> | Custom template for header section. |
| footer | TemplateRef<void> | Custom template for footer section. |
| disableddate | TemplateRef<DatePickerDisabledDateTemplateContext> | Custom template for disabled date cells. |
| decade | TemplateRef<DatePickerDecadeTemplateContext> | Custom template for decade view. |
| previousicon | TemplateRef<void> | Custom template for previous month icon. |
| nexticon | TemplateRef<void> | Custom template for next month icon. |
| triggericon | TemplateRef<void> | Custom template for trigger icon. |
| clearicon | TemplateRef<void> | Custom template for clear icon. |
| decrementicon | TemplateRef<void> | Custom template for decrement icon. |
| incrementicon | TemplateRef<void> | Custom template for increment icon. |
| inputicon | TemplateRef<DatePickerInputIconTemplateContext> | Custom template for input icon. |
| buttonbar | TemplateRef<DatePickerButtonBarTemplateContext> | Custom template for button bar. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the root's DOM element. |
| pcInputText | InputTextPassThrough | Used to pass attributes to the InputText component. |
| dropdown | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the dropdown button's DOM element. |
| dropdownIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the dropdown icon's DOM element. |
| inputIconContainer | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the input icon container's DOM element. |
| inputIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the input icon's DOM element. |
| panel | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the panel's DOM element. |
| calendarContainer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the calendar container's DOM element. |
| calendar | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the calendar's DOM element. |
| header | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the header's DOM element. |
| pcPrevButton | ButtonPassThrough | Used to pass attributes to the previous button component. |
| title | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the title's DOM element. |
| selectMonth | PassThroughOption<HTMLSelectElement, I> | Used to pass attributes to the select month's DOM element. |
| selectYear | PassThroughOption<HTMLSelectElement, I> | Used to pass attributes to the select year's DOM element. |
| decade | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the decade's DOM element. |
| pcNextButton | ButtonPassThrough | Used to pass attributes to the next button component. |
| dayView | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the day view's DOM element. |
| table | PassThroughOption<HTMLTableElement, I> | Used to pass attributes to the table's DOM element. |
| tableHeader | PassThroughOption<HTMLTableSectionElement, I> | Used to pass attributes to the table header's DOM element. |
| tableHeaderRow | PassThroughOption<HTMLTableRowElement, I> | Used to pass attributes to the table header row's DOM element. |
| weekHeader | PassThroughOption<HTMLTableCellElement, I> | Used to pass attributes to the week header's DOM element. |
| weekHeaderLabel | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the week header label's DOM element. |
| tableHeaderCell | PassThroughOption<HTMLTableCellElement, I> | Used to pass attributes to the table header cell's DOM element. |
| weekDayCell | PassThroughOption<HTMLTableCellElement, I> | Used to pass attributes to the week day cell's DOM element. |
| weekDay | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the week day's DOM element. |
| tableBody | PassThroughOption<HTMLTableSectionElement, I> | Used to pass attributes to the table body's DOM element. |
| tableBodyRow | PassThroughOption<HTMLTableRowElement, I> | Used to pass attributes to the table body row's DOM element. |
| weekNumber | PassThroughOption<HTMLTableCellElement, I> | Used to pass attributes to the week number's DOM element. |
| weekLabelContainer | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the week label container's DOM element. |
| dayCell | PassThroughOption<HTMLTableCellElement, I> | Used to pass attributes to the day cell's DOM element. |
| day | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the day's DOM element. |
| monthView | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the month view's DOM element. |
| month | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the month's DOM element. |
| yearView | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the year view's DOM element. |
| year | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the year's DOM element. |
| timePicker | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the time picker's DOM element. |
| hourPicker | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the hour picker's DOM element. |
| hour | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the hour's DOM element. |
| separatorContainer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the separator container's DOM element. |
| separator | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the separator's DOM element. |
| minutePicker | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the minute picker's DOM element. |
| minute | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the minute's DOM element. |
| secondPicker | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the second picker's DOM element. |
| second | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the second's DOM element. |
| ampmPicker | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the ampm picker's DOM element. |
| ampm | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the ampm's DOM element. |
| buttonbar | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the buttonbar's DOM element. |
| pcIncrementButton | ButtonPassThrough | Used to pass attributes to the increment button component. |
| pcDecrementButton | ButtonPassThrough | Used to pass attributes to the decrement button component. |
| pcTodayButton | ButtonPassThrough | Used to pass attributes to the today button component. |
| pcClearButton | ButtonPassThrough | Used to pass attributes to the clear button component. |
| hiddenSelectedDay | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the hidden selected day's DOM element. |
| hiddenMonth | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the hidden month's DOM element. |
| hiddenYear | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the hidden year's DOM element. |
| motion | MotionOptions | Used to pass options to the motion component/directive. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-datepicker | Class name of the root element |
| p-datepicker-input | Class name of the input element |
| p-datepicker-dropdown | Class name of the dropdown element |
| p-datepicker-input-icon-container | Class name of the input icon container element |
| p-datepicker-input-icon | Class name of the input icon element |
| p-datepicker-panel | Class name of the panel element |
| p-datepicker-calendar-container | Class name of the calendar container element |
| p-datepicker-calendar | Class name of the calendar element |
| p-datepicker-header | Class name of the header element |
| p-datepicker-prev-button | Class name of the previous button element |
| p-datepicker-title | Class name of the title element |
| p-datepicker-select-month | Class name of the select month element |
| p-datepicker-select-year | Class name of the select year element |
| p-datepicker-decade | Class name of the decade element |
| p-datepicker-next-button | Class name of the next button element |
| p-datepicker-day-view | Class name of the day view element |
| p-datepicker-weekheader | Class name of the week header element |
| p-datepicker-weeknumber | Class name of the week number element |
| p-datepicker-weeklabel-container | Class name of the week label container element |
| p-datepicker-weekday-cell | Class name of the week day cell element |
| p-datepicker-weekday | Class name of the week day element |
| p-datepicker-day-cell | Class name of the day cell element |
| p-datepicker-day | Class name of the day element |
| p-datepicker-month-view | Class name of the month view element |
| p-datepicker-month | Class name of the month element |
| p-datepicker-year-view | Class name of the year view element |
| p-datepicker-year | Class name of the year element |
| p-datepicker-time-picker | Class name of the time picker element |
| p-datepicker-hour-picker | Class name of the hour picker element |
| p-datepicker-increment-button | Class name of the increment button element |
| p-datepicker-decrement-button | Class name of the decrement button element |
| p-datepicker-separator | Class name of the separator element |
| p-datepicker-minute-picker | Class name of the minute picker element |
| p-datepicker-second-picker | Class name of the second picker element |
| p-datepicker-ampm-picker | Class name of the ampm picker element |
| p-datepicker-buttonbar | Class name of the buttonbar element |
| p-datepicker-today-button | Class name of the today button element |
| p-datepicker-clear-button | Class name of the clear button element |
| p-datepicker-clear-icon | Class name of the clear icon |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| datepicker.transition.duration | --p-datepicker-transition-duration | Transition duration of root |
| datepicker.panel.background | --p-datepicker-panel-background | Background of panel |
| datepicker.panel.border.color | --p-datepicker-panel-border-color | Border color of panel |
| datepicker.panel.color | --p-datepicker-panel-color | Color of panel |
| datepicker.panel.border.radius | --p-datepicker-panel-border-radius | Border radius of panel |
| datepicker.panel.shadow | --p-datepicker-panel-shadow | Shadow of panel |
| datepicker.panel.padding | --p-datepicker-panel-padding | Padding of panel |
| datepicker.header.background | --p-datepicker-header-background | Background of header |
| datepicker.header.border.color | --p-datepicker-header-border-color | Border color of header |
| datepicker.header.color | --p-datepicker-header-color | Color of header |
| datepicker.header.padding | --p-datepicker-header-padding | Padding of header |
| datepicker.title.gap | --p-datepicker-title-gap | Gap of title |
| datepicker.title.font.weight | --p-datepicker-title-font-weight | Font weight of title |
| datepicker.dropdown.width | --p-datepicker-dropdown-width | Width of dropdown |
| datepicker.dropdown.sm.width | --p-datepicker-dropdown-sm-width | Sm width of dropdown |
| datepicker.dropdown.lg.width | --p-datepicker-dropdown-lg-width | Lg width of dropdown |
| datepicker.dropdown.border.color | --p-datepicker-dropdown-border-color | Border color of dropdown |
| datepicker.dropdown.hover.border.color | --p-datepicker-dropdown-hover-border-color | Hover border color of dropdown |
| datepicker.dropdown.active.border.color | --p-datepicker-dropdown-active-border-color | Active border color of dropdown |
| datepicker.dropdown.border.radius | --p-datepicker-dropdown-border-radius | Border radius of dropdown |
| datepicker.dropdown.focus.ring.width | --p-datepicker-dropdown-focus-ring-width | Focus ring width of dropdown |
| datepicker.dropdown.focus.ring.style | --p-datepicker-dropdown-focus-ring-style | Focus ring style of dropdown |
| datepicker.dropdown.focus.ring.color | --p-datepicker-dropdown-focus-ring-color | Focus ring color of dropdown |
| datepicker.dropdown.focus.ring.offset | --p-datepicker-dropdown-focus-ring-offset | Focus ring offset of dropdown |
| datepicker.dropdown.focus.ring.shadow | --p-datepicker-dropdown-focus-ring-shadow | Focus ring shadow of dropdown |
| datepicker.dropdown.background | --p-datepicker-dropdown-background | Background of dropdown |
| datepicker.dropdown.hover.background | --p-datepicker-dropdown-hover-background | Hover background of dropdown |
| datepicker.dropdown.active.background | --p-datepicker-dropdown-active-background | Active background of dropdown |
| datepicker.dropdown.color | --p-datepicker-dropdown-color | Color of dropdown |
| datepicker.dropdown.hover.color | --p-datepicker-dropdown-hover-color | Hover color of dropdown |
| datepicker.dropdown.active.color | --p-datepicker-dropdown-active-color | Active color of dropdown |
| datepicker.input.icon.color | --p-datepicker-input-icon-color | Color of input icon |
| datepicker.select.month.hover.background | --p-datepicker-select-month-hover-background | Hover background of select month |
| datepicker.select.month.color | --p-datepicker-select-month-color | Color of select month |
| datepicker.select.month.hover.color | --p-datepicker-select-month-hover-color | Hover color of select month |
| datepicker.select.month.padding | --p-datepicker-select-month-padding | Padding of select month |
| datepicker.select.month.border.radius | --p-datepicker-select-month-border-radius | Border radius of select month |
| datepicker.select.year.hover.background | --p-datepicker-select-year-hover-background | Hover background of select year |
| datepicker.select.year.color | --p-datepicker-select-year-color | Color of select year |
| datepicker.select.year.hover.color | --p-datepicker-select-year-hover-color | Hover color of select year |
| datepicker.select.year.padding | --p-datepicker-select-year-padding | Padding of select year |
| datepicker.select.year.border.radius | --p-datepicker-select-year-border-radius | Border radius of select year |
| datepicker.group.border.color | --p-datepicker-group-border-color | Border color of group |
| datepicker.group.gap | --p-datepicker-group-gap | Gap of group |
| datepicker.day.view.margin | --p-datepicker-day-view-margin | Margin of day view |
| datepicker.week.day.padding | --p-datepicker-week-day-padding | Padding of week day |
| datepicker.week.day.font.weight | --p-datepicker-week-day-font-weight | Font weight of week day |
| datepicker.week.day.color | --p-datepicker-week-day-color | Color of week day |
| datepicker.date.hover.background | --p-datepicker-date-hover-background | Hover background of date |
| datepicker.date.selected.background | --p-datepicker-date-selected-background | Selected background of date |
| datepicker.date.range.selected.background | --p-datepicker-date-range-selected-background | Range selected background of date |
| datepicker.date.color | --p-datepicker-date-color | Color of date |
| datepicker.date.hover.color | --p-datepicker-date-hover-color | Hover color of date |
| datepicker.date.selected.color | --p-datepicker-date-selected-color | Selected color of date |
| datepicker.date.range.selected.color | --p-datepicker-date-range-selected-color | Range selected color of date |
| datepicker.date.width | --p-datepicker-date-width | Width of date |
| datepicker.date.height | --p-datepicker-date-height | Height of date |
| datepicker.date.border.radius | --p-datepicker-date-border-radius | Border radius of date |
| datepicker.date.padding | --p-datepicker-date-padding | Padding of date |
| datepicker.date.focus.ring.width | --p-datepicker-date-focus-ring-width | Focus ring width of date |
| datepicker.date.focus.ring.style | --p-datepicker-date-focus-ring-style | Focus ring style of date |
| datepicker.date.focus.ring.color | --p-datepicker-date-focus-ring-color | Focus ring color of date |
| datepicker.date.focus.ring.offset | --p-datepicker-date-focus-ring-offset | Focus ring offset of date |
| datepicker.date.focus.ring.shadow | --p-datepicker-date-focus-ring-shadow | Focus ring shadow of date |
| datepicker.month.view.margin | --p-datepicker-month-view-margin | Margin of month view |
| datepicker.month.padding | --p-datepicker-month-padding | Padding of month |
| datepicker.month.border.radius | --p-datepicker-month-border-radius | Border radius of month |
| datepicker.year.view.margin | --p-datepicker-year-view-margin | Margin of year view |
| datepicker.year.padding | --p-datepicker-year-padding | Padding of year |
| datepicker.year.border.radius | --p-datepicker-year-border-radius | Border radius of year |
| datepicker.buttonbar.padding | --p-datepicker-buttonbar-padding | Padding of buttonbar |
| datepicker.buttonbar.border.color | --p-datepicker-buttonbar-border-color | Border color of buttonbar |
| datepicker.time.picker.padding | --p-datepicker-time-picker-padding | Padding of time picker |
| datepicker.time.picker.border.color | --p-datepicker-time-picker-border-color | Border color of time picker |
| datepicker.time.picker.gap | --p-datepicker-time-picker-gap | Gap of time picker |
| datepicker.time.picker.button.gap | --p-datepicker-time-picker-button-gap | Button gap of time picker |
| datepicker.today.background | --p-datepicker-today-background | Background of today |
| datepicker.today.color | --p-datepicker-today-color | Color of today |

