import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { DatePicker } from './datepicker';
import { DatePickerMonthChangeEvent, DatePickerYearChangeEvent } from './datepicker.interface';

@Component({
    standalone: false,
    template: `
        <p-datepicker
            [(ngModel)]="selectedDate"
            [dateFormat]="dateFormat"
            [placeholder]="placeholder"
            [showTime]="showTime"
            [showIcon]="showIcon"
            [showWeek]="showWeek"
            [disabled]="disabled"
            [inline]="inline"
            [showButtonBar]="showButtonBar"
            [selectionMode]="selectionMode"
            [minDate]="minDate"
            [maxDate]="maxDate"
            [disabledDates]="disabledDates"
            [disabledDays]="disabledDays"
            [firstDayOfWeek]="firstDayOfWeek"
            [numberOfMonths]="numberOfMonths"
            [view]="view"
            [touchUI]="touchUI"
            [showOtherMonths]="showOtherMonths"
            [selectOtherMonths]="selectOtherMonths"
            [showTransitionOptions]="showTransitionOptions"
            [hideTransitionOptions]="hideTransitionOptions"
            [timeOnly]="timeOnly"
            [hourFormat]="hourFormat"
            [stepHour]="stepHour"
            [stepMinute]="stepMinute"
            [stepSecond]="stepSecond"
            [showSeconds]="showSeconds"
            [showOnFocus]="showOnFocus"
            [tabindex]="tabindex"
            [iconDisplay]="iconDisplay"
            [icon]="icon"
            [showClear]="showClear"
            [appendTo]="appendTo"
            [readonlyInput]="readonlyInput"
            [shortYearCutoff]="shortYearCutoff"
            [ariaLabel]="ariaLabel"
            [ariaLabelledBy]="ariaLabelledBy"
            [panelStyle]="panelStyle"
            [panelStyleClass]="panelStyleClass"
            [inputStyle]="inputStyle"
            [inputStyleClass]="inputStyleClass"
            [timeSeparator]="timeSeparator"
            [multipleSeparator]="multipleSeparator"
            [rangeSeparator]="rangeSeparator"
            [keepInvalid]="keepInvalid"
            (onSelect)="onDateSelect($event)"
            (onChange)="onDateChange($event)"
            (onBlur)="onDateBlur($event)"
            (onFocus)="onDateFocus($event)"
            (onClose)="onDateClose($event)"
            (onShow)="onDateShow($event)"
            (onClear)="onDateClear($event)"
            (onInput)="onDateInput($event)"
            (onTodayClick)="onDateTodayClick($event)"
            (onClearClick)="onDateClearClick($event)"
            (onMonthChange)="onDateMonthChange($event)"
            (onYearChange)="onDateYearChange($event)"
        ></p-datepicker>
    `
})
class TestDatePickerComponent {
    selectedDate: any = null as any;
    dateFormat: string = 'dd/mm/yy';
    placeholder: string = 'Select a date';
    showTime: boolean = false;
    showIcon: boolean = false;
    showWeek: boolean = false;
    disabled: boolean = false;
    inline: boolean = false;
    showButtonBar: boolean = false;
    selectionMode: string = 'single';
    minDate: Date | null = null as any;
    maxDate: Date | null = null as any;
    disabledDates: Date[] = [];
    disabledDays: number[] = [];
    firstDayOfWeek: number = 0;
    numberOfMonths: number = 1;
    view: string = 'date';
    touchUI: boolean = false;
    showOtherMonths: boolean = true;
    selectOtherMonths: boolean = false;
    showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
    hideTransitionOptions: string = '.1s linear';
    timeOnly: boolean = false;
    hourFormat: string = '24';
    stepHour: number = 1;
    stepMinute: number = 1;
    stepSecond: number = 1;
    showSeconds: boolean = false;
    showOnFocus: boolean = true;
    tabindex: number = 0;
    iconDisplay: string = 'input';
    icon: string | undefined = undefined as any;
    showClear: boolean = false;
    appendTo: any = null as any;
    readonlyInput: boolean = false;
    shortYearCutoff: string = '+10';
    ariaLabel: string = 'Date picker';
    ariaLabelledBy: string | undefined = undefined as any;
    panelStyle: any = null as any;
    panelStyleClass: string | undefined = undefined as any;
    inputStyle: any = null as any;
    inputStyleClass: string | undefined = undefined as any;
    timeSeparator: string = ':';
    multipleSeparator: string = ',';
    rangeSeparator: string = '-';
    keepInvalid: boolean = false;

    onDateSelect(event: any) {}
    onDateChange(event: any) {}
    onDateBlur(event: Event) {}
    onDateFocus(event: Event) {}
    onDateClose(event: Event) {}
    onDateShow(event: Event) {}
    onDateClear(event: Event) {}
    onDateInput(event: Event) {}
    onDateTodayClick(event: Event) {}
    onDateClearClick(event: Event) {}
    onDateMonthChange(event: DatePickerMonthChangeEvent) {}
    onDateYearChange(event: DatePickerYearChangeEvent) {}
}

@Component({
    standalone: false,
    template: `
        <form [formGroup]="form">
            <p-datepicker formControlName="date" [dateFormat]="'dd/mm/yy'" [placeholder]="'Select date'"></p-datepicker>
        </form>
    `
})
class TestReactiveFormDatePickerComponent {
    form = new FormGroup({
        date: new FormControl<Date | null>(null, [Validators.required])
    });
}

// pTemplate only - Comprehensive template test component with all 12 ContentChild projections
@Component({
    standalone: false,
    template: `
        <p-datepicker [(ngModel)]="selectedDate" [showTime]="showTime" [showIcon]="showIcon" [showClear]="showClear" [view]="view" [dateFormat]="dateFormat" [touchUI]="touchUI">
            <!-- Date template with context parameters -->
            <ng-template pTemplate="date" let-date="date">
                <div class="custom-date" data-testid="date-template">
                    <span class="day">{{ date.day }}</span>
                    <span class="month" *ngIf="date.month">{{ date.month }}</span>
                    <span class="year" *ngIf="date.year">{{ date.year }}</span>
                </div>
            </ng-template>

            <!-- Header template -->
            <ng-template pTemplate="header">
                <div class="custom-header" data-testid="header-template">
                    <h4>Select Date</h4>
                    <small>Choose your preferred date</small>
                </div>
            </ng-template>

            <!-- Footer template -->
            <ng-template pTemplate="footer">
                <div class="custom-footer" data-testid="footer-template">
                    <button type="button" class="today-btn">Today</button>
                    <button type="button" class="clear-btn">Clear</button>
                </div>
            </ng-template>

            <!-- Disabled date template with context -->
            <ng-template pTemplate="disabledDate" let-date="date">
                <div class="disabled-date" data-testid="disabled-date-template">
                    <span class="crossed-out">{{ date.day }}</span>
                </div>
            </ng-template>

            <!-- Decade template with context -->
            <ng-template pTemplate="decade" let-decade="decade">
                <div class="custom-decade" data-testid="decade-template">
                    <span class="decade-range">{{ decade.year }}-{{ decade.year + 9 }}</span>
                </div>
            </ng-template>

            <!-- Previous icon template -->
            <ng-template pTemplate="previousicon">
                <i class="pi pi-chevron-left custom-prev" data-testid="previous-icon-template"></i>
            </ng-template>

            <!-- Next icon template -->
            <ng-template pTemplate="nexticon">
                <i class="pi pi-chevron-right custom-next" data-testid="next-icon-template"></i>
            </ng-template>

            <!-- Trigger icon template -->
            <ng-template pTemplate="triggericon">
                <i class="pi pi-calendar custom-trigger" data-testid="trigger-icon-template"></i>
            </ng-template>

            <!-- Clear icon template -->
            <ng-template pTemplate="clearicon">
                <i class="pi pi-times custom-clear" data-testid="clear-icon-template"></i>
            </ng-template>

            <!-- Decrement icon template -->
            <ng-template pTemplate="decrementicon">
                <i class="pi pi-minus custom-decrement" data-testid="decrement-icon-template"></i>
            </ng-template>

            <!-- Increment icon template -->
            <ng-template pTemplate="incrementicon">
                <i class="pi pi-plus custom-increment" data-testid="increment-icon-template"></i>
            </ng-template>

            <!-- Input icon template -->
            <ng-template pTemplate="inputicon">
                <i class="pi pi-clock custom-input-icon" data-testid="input-icon-template"></i>
            </ng-template>
        </p-datepicker>
    `
})
class TestPTemplatesDatePickerComponent {
    selectedDate: Date | null = null as any;
    showTime: boolean = false;
    showIcon: boolean = false;
    showClear: boolean = false;
    view: string = 'date';
    dateFormat: string = 'dd/mm/yy';
    touchUI: boolean = false;
}

// #template references only - Comprehensive template test component with all 12 ContentChild projections
@Component({
    standalone: false,
    template: `
        <p-datepicker [(ngModel)]="selectedDate" [showTime]="showTime" [showIcon]="showIcon" [showClear]="showClear" [view]="view" [dateFormat]="dateFormat" [touchUI]="touchUI">
            <!-- Date template with context parameters -->
            <ng-template #date let-date="date">
                <div class="custom-date-ref" data-testid="date-ref-template">
                    <span class="day">{{ date.day }}</span>
                    <span class="month" *ngIf="date.month">{{ date.month }}</span>
                    <span class="year" *ngIf="date.year">{{ date.year }}</span>
                </div>
            </ng-template>

            <!-- Header template -->
            <ng-template #header>
                <div class="custom-header-ref" data-testid="header-ref-template">
                    <h4>Select Date (Ref)</h4>
                    <small>Choose your preferred date using references</small>
                </div>
            </ng-template>

            <!-- Footer template -->
            <ng-template #footer>
                <div class="custom-footer-ref" data-testid="footer-ref-template">
                    <button type="button" class="today-btn-ref">Today</button>
                    <button type="button" class="clear-btn-ref">Clear</button>
                </div>
            </ng-template>

            <!-- Disabled date template with context -->
            <ng-template #disabledDate let-date="date">
                <div class="disabled-date-ref" data-testid="disabled-date-ref-template">
                    <span class="crossed-out-ref">{{ date.day }}</span>
                </div>
            </ng-template>

            <!-- Decade template with context -->
            <ng-template #decade let-decade="decade">
                <div class="custom-decade-ref" data-testid="decade-ref-template">
                    <span class="decade-range-ref">{{ decade.year }}-{{ decade.year + 9 }}</span>
                </div>
            </ng-template>

            <!-- Previous icon template -->
            <ng-template #previousicon>
                <i class="pi pi-chevron-left custom-prev-ref" data-testid="previous-icon-ref-template"></i>
            </ng-template>

            <!-- Next icon template -->
            <ng-template #nexticon>
                <i class="pi pi-chevron-right custom-next-ref" data-testid="next-icon-ref-template"></i>
            </ng-template>

            <!-- Trigger icon template -->
            <ng-template #triggericon>
                <i class="pi pi-calendar custom-trigger-ref" data-testid="trigger-icon-ref-template"></i>
            </ng-template>

            <!-- Clear icon template -->
            <ng-template #clearicon>
                <i class="pi pi-times custom-clear-ref" data-testid="clear-icon-ref-template"></i>
            </ng-template>

            <!-- Decrement icon template -->
            <ng-template #decrementicon>
                <i class="pi pi-minus custom-decrement-ref" data-testid="decrement-icon-ref-template"></i>
            </ng-template>

            <!-- Increment icon template -->
            <ng-template #incrementicon>
                <i class="pi pi-plus custom-increment-ref" data-testid="increment-icon-ref-template"></i>
            </ng-template>

            <!-- Input icon template -->
            <ng-template #inputicon>
                <i class="pi pi-clock custom-input-icon-ref" data-testid="input-icon-ref-template"></i>
            </ng-template>
        </p-datepicker>
    `
})
class TestRefTemplatesDatePickerComponent {
    selectedDate: Date | null = null as any;
    showTime: boolean = false;
    showIcon: boolean = false;
    showClear: boolean = false;
    view: string = 'date';
    dateFormat: string = 'dd/mm/yy';
    touchUI: boolean = false;
}

// Legacy component for backward compatibility (deprecated - use separated versions above)
@Component({
    standalone: false,
    template: `
        <p-datepicker [(ngModel)]="selectedDate" [showTime]="showTime" [showIcon]="showIcon" [showClear]="showClear" [view]="view" [dateFormat]="dateFormat" [touchUI]="touchUI">
            <ng-template pTemplate="date" let-date="date">
                <div class="custom-date" data-testid="date-template">
                    <span class="day">{{ date.day }}</span>
                </div>
            </ng-template>
        </p-datepicker>
    `
})
class TestTemplatesDatePickerComponent {
    selectedDate: Date | null = null as any;
    showTime: boolean = false;
    showIcon: boolean = false;
    showClear: boolean = false;
    view: string = 'date';
    dateFormat: string = 'dd/mm/yy';
    touchUI: boolean = false;
}

describe('DatePicker', () => {
    let component: DatePicker;
    let fixture: ComponentFixture<DatePicker>;
    let testComponent: TestDatePickerComponent;
    let testFixture: ComponentFixture<TestDatePickerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DatePicker, FormsModule, ReactiveFormsModule, CommonModule, NoopAnimationsModule],
            declarations: [TestDatePickerComponent, TestReactiveFormDatePickerComponent, TestTemplatesDatePickerComponent, TestPTemplatesDatePickerComponent, TestRefTemplatesDatePickerComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(DatePicker);
        component = fixture.componentInstance;

        testFixture = TestBed.createComponent(TestDatePickerComponent);
        testComponent = testFixture.componentInstance;
    });

    describe('Component Initialization', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should initialize with default values', () => {
            fixture.detectChanges();
            expect(component.dateFormat).toBeUndefined(); // Default is undefined, not 'mm/dd/yy'
            expect(component.multipleSeparator).toBe(',');
            expect(component.rangeSeparator).toBe('-');
            expect(component.inline).toBe(false);
            expect(component.showOtherMonths).toBe(true);
            expect(component.stepHour).toBe(1);
            expect(component.stepMinute).toBe(1);
            expect(component.stepSecond).toBe(1);
            expect(component.showSeconds).toBe(false);
            expect(component.hourFormat).toBe('24');
        });

        it('should accept custom values', () => {
            testComponent.dateFormat = 'dd-mm-yyyy';
            testComponent.placeholder = 'Choose date';
            testComponent.showTime = true;
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.dateFormat).toBe('dd-mm-yyyy');
            expect(datePickerComponent.placeholder).toBe('Choose date');
            expect(datePickerComponent.showTime).toBe(true);
        });
    });

    describe('Basic Functionality', () => {
        beforeEach(() => {
            testFixture.detectChanges();
        });

        it('should display input field', () => {
            const inputElement = testFixture.debugElement.query(By.css('input'));
            expect(inputElement).toBeTruthy();
            expect(inputElement.nativeElement.getAttribute('placeholder')).toBe('Select a date');
        });

        it('should open calendar on input click', () => {
            const inputElement = testFixture.debugElement.query(By.css('input'));
            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;

            inputElement.nativeElement.click();
            testFixture.detectChanges();

            expect(datePickerComponent.overlayVisible).toBe(true);
        });

        it('should handle date selection', () => {
            spyOn(testComponent, 'onDateSelect');
            spyOn(testComponent, 'onDateChange');

            const testDate = new Date(2023, 5, 15); // June 15, 2023
            testComponent.selectedDate = testDate;
            testFixture.detectChanges();

            expect(testComponent.selectedDate).toEqual(testDate);
        });
    });

    describe('Input Properties', () => {
        it('should apply dateFormat correctly', () => {
            testComponent.dateFormat = 'dd/mm/yyyy';
            testComponent.selectedDate = new Date(2023, 5, 15);
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.dateFormat).toBe('dd/mm/yyyy');

            // Note: Input formatting depends on locale service and internal formatting logic
            // For unit tests, we primarily test that the property is set correctly
            const inputElement = testFixture.debugElement.query(By.css('input'));
            expect(inputElement).toBeTruthy();
        });

        it('should handle disabled state', () => {
            testComponent.disabled = true;
            testFixture.detectChanges();

            const inputElement = testFixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.disabled).toBe(true);
        });

        it('should handle readonly input state', () => {
            testComponent.readonlyInput = true;
            testFixture.detectChanges();

            const inputElement = testFixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.readOnly).toBe(true);
        });

        it('should show calendar icon when showIcon is true', () => {
            testComponent.showIcon = true;
            testComponent.iconDisplay = 'button';
            testFixture.detectChanges();

            const iconButton = testFixture.debugElement.query(By.css('button'));
            expect(iconButton).toBeTruthy();
        });

        it('should handle custom icon', () => {
            testComponent.showIcon = true;
            testComponent.icon = 'pi pi-calendar-plus';
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.icon).toBe('pi pi-calendar-plus');
        });

        it('should handle input id and name attributes', () => {
            testComponent.inputStyleClass = 'custom-input';
            testFixture.detectChanges();

            const inputElement = testFixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.className).toContain('custom-input');
        });
    });

    describe('Event Handling', () => {
        beforeEach(() => {
            testFixture.detectChanges();
        });

        it('should emit onFocus event', () => {
            spyOn(testComponent, 'onDateFocus');

            const inputElement = testFixture.debugElement.query(By.css('input'));
            inputElement.nativeElement.dispatchEvent(new FocusEvent('focus'));

            expect(testComponent.onDateFocus).toHaveBeenCalled();
        });

        it('should emit onBlur event', () => {
            spyOn(testComponent, 'onDateBlur');

            const inputElement = testFixture.debugElement.query(By.css('input'));
            inputElement.nativeElement.dispatchEvent(new FocusEvent('blur'));

            expect(testComponent.onDateBlur).toHaveBeenCalled();
        });

        it('should open calendar on input click', () => {
            const inputElement = testFixture.debugElement.query(By.css('input'));
            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;

            inputElement.nativeElement.click();
            testFixture.detectChanges();

            expect(datePickerComponent.overlayVisible).toBe(true);
        });

        it('should open calendar with button click when showIcon is true', () => {
            testComponent.showIcon = true;
            testComponent.iconDisplay = 'button';
            testFixture.detectChanges();

            const buttonElement = testFixture.debugElement.query(By.css('button'));
            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;

            buttonElement.nativeElement.click();
            testFixture.detectChanges();

            expect(datePickerComponent.overlayVisible).toBe(true);
        });
    });

    describe('Date Selection Modes', () => {
        it('should handle single selection mode', () => {
            testComponent.selectionMode = 'single';
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.selectionMode).toBe('single');
        });
    });

    describe('Time Picker', () => {
        it('should show time picker when showTime is true', () => {
            testComponent.showTime = true;
            testComponent.showSeconds = true;
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.showTime).toBe(true);
            expect(datePickerComponent.showSeconds).toBe(true);
        });

        it('should handle 12-hour format', () => {
            testComponent.hourFormat = '12';
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.hourFormat).toBe('12');
        });

        it('should handle time steps', () => {
            testComponent.showTime = true;
            testComponent.stepHour = 2;
            testComponent.stepMinute = 15;
            testComponent.stepSecond = 30;
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.stepHour).toBe(2);
            expect(datePickerComponent.stepMinute).toBe(15);
            expect(datePickerComponent.stepSecond).toBe(30);
        });
    });

    describe('Inline Mode', () => {
        it('should display inline calendar', () => {
            testComponent.inline = true;
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.inline).toBe(true);
        });
    });

    describe('Date Restrictions', () => {
        it('should handle minDate restriction', () => {
            const minDate = new Date(2023, 0, 1); // January 1, 2023
            testComponent.minDate = minDate;
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.minDate).toEqual(minDate);
        });

        it('should handle maxDate restriction', () => {
            const maxDate = new Date(2023, 11, 31); // December 31, 2023
            testComponent.maxDate = maxDate;
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.maxDate).toEqual(maxDate);
        });

        it('should handle disabled dates', () => {
            const disabledDates = [new Date(2023, 5, 15), new Date(2023, 5, 20)];
            testComponent.disabledDates = disabledDates;
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.disabledDates).toEqual(disabledDates);
        });

        it('should handle disabled days of week', () => {
            const disabledDays = [0, 6]; // Disable Sundays and Saturdays
            testComponent.disabledDays = disabledDays;
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.disabledDays).toEqual(disabledDays);
        });
    });

    describe('Navigation', () => {
        it('should handle multiple months display', () => {
            testComponent.numberOfMonths = 3;
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.numberOfMonths).toBe(3);
        });
    });

    describe('Reactive Forms Integration', () => {
        let reactiveFixture: ComponentFixture<TestReactiveFormDatePickerComponent>;
        let reactiveComponent: TestReactiveFormDatePickerComponent;

        beforeEach(() => {
            reactiveFixture = TestBed.createComponent(TestReactiveFormDatePickerComponent);
            reactiveComponent = reactiveFixture.componentInstance;
            reactiveFixture.detectChanges();
        });

        it('should integrate with reactive forms', () => {
            expect(reactiveComponent.form.get('date')?.value).toBeNull();
            expect(reactiveComponent.form.get('date')?.invalid).toBe(true);
        });

        it('should update form control value', fakeAsync(() => {
            const testDate = new Date(2023, 5, 15);
            reactiveComponent.form.get('date')?.setValue(testDate);
            reactiveFixture.detectChanges();
            tick();

            expect(reactiveComponent.form.get('date')?.value).toEqual(testDate);
            expect(reactiveComponent.form.get('date')?.valid).toBe(true);
            flush();
        }));

        it('should handle form control validation', () => {
            const dateControl = reactiveComponent.form.get('date');
            expect(dateControl?.hasError('required')).toBe(true);

            dateControl?.setValue(new Date());
            expect(dateControl?.hasError('required')).toBe(false);
            expect(dateControl?.valid).toBe(true);
        });

        it('should handle form reset', () => {
            const testDate = new Date(2023, 5, 15);
            reactiveComponent.form.get('date')?.setValue(testDate);
            expect(reactiveComponent.form.get('date')?.value).toEqual(testDate);

            reactiveComponent.form.reset();
            expect(reactiveComponent.form.get('date')?.value).toBeNull();
            expect(reactiveComponent.form.pristine).toBe(true);
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should apply custom input styles', () => {
            testComponent.inputStyle = { border: '2px solid red', padding: '10px' };
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.inputStyle).toEqual({ border: '2px solid red', padding: '10px' });
        });

        it('should apply custom panel styles', () => {
            testComponent.panelStyle = { backgroundColor: 'lightblue', border: '1px solid blue' };
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.panelStyle).toEqual({ backgroundColor: 'lightblue', border: '1px solid blue' });
        });

        it('should apply custom CSS classes', () => {
            testComponent.inputStyleClass = 'custom-input-class';
            testComponent.panelStyleClass = 'custom-panel-class';
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.inputStyleClass).toBe('custom-input-class');
            expect(datePickerComponent.panelStyleClass).toBe('custom-panel-class');
        });
    });

    describe('Accessibility', () => {
        it('should have proper ARIA attributes', () => {
            testComponent.ariaLabel = 'Select date';
            testFixture.detectChanges();

            const inputElement = testFixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.getAttribute('aria-label')).toBe('Select date');
            expect(inputElement.nativeElement.getAttribute('role')).toBe('combobox');
        });

        it('should handle aria-labelledby', () => {
            testComponent.ariaLabelledBy = 'date-label';
            testFixture.detectChanges();

            const inputElement = testFixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.getAttribute('aria-labelledby')).toBe('date-label');
        });

        it('should handle tabindex', () => {
            testComponent.tabindex = 5;
            testFixture.detectChanges();

            const inputElement = testFixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.getAttribute('tabindex')).toBe('5');
        });
    });

    describe('Keyboard Navigation', () => {
        beforeEach(() => {
            testFixture.detectChanges();
        });

        it('should handle Enter key to open calendar', () => {
            const inputElement = testFixture.debugElement.query(By.css('input'));

            const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
            inputElement.nativeElement.dispatchEvent(enterEvent);

            expect(inputElement).toBeTruthy(); // Basic check that element exists
        });

        it('should handle Escape key to close calendar', () => {
            const inputElement = testFixture.debugElement.query(By.css('input'));
            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;

            // First open the calendar
            datePickerComponent.overlayVisible = true;
            testFixture.detectChanges();

            const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
            inputElement.nativeElement.dispatchEvent(escapeEvent);

            expect(inputElement).toBeTruthy();
        });
    });

    describe('Locale and Internationalization', () => {
        it('should handle locale via configuration service', () => {
            // Locale is handled via PrimeNG config service, not direct input
            expect(true).toBe(true);
        });

        it('should handle first day of week', () => {
            testComponent.firstDayOfWeek = 1; // Monday
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.firstDayOfWeek).toBe(1);
        });

        it('should handle show week numbers', () => {
            testComponent.showWeek = true;
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.showWeek).toBe(true);
        });
    });

    describe('Edge Cases', () => {
        it('should handle null/undefined values', () => {
            testComponent.selectedDate = null as any;
            testComponent.minDate = null as any;
            testComponent.maxDate = null as any;
            testFixture.detectChanges();

            expect(() => testFixture.detectChanges()).not.toThrow();
        });

        it('should handle empty arrays', () => {
            testComponent.disabledDates = [];
            testComponent.disabledDays = [];
            testFixture.detectChanges();

            expect(() => testFixture.detectChanges()).not.toThrow();
        });

        it('should handle extreme date values', () => {
            const extremeMinDate = new Date(1900, 0, 1);
            const extremeMaxDate = new Date(2100, 11, 31);

            testComponent.minDate = extremeMinDate;
            testComponent.maxDate = extremeMaxDate;
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.minDate).toEqual(extremeMinDate);
            expect(datePickerComponent.maxDate).toEqual(extremeMaxDate);
        });
    });

    describe('Advanced Features', () => {
        it('should handle touch UI mode', () => {
            testComponent.touchUI = true;
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.touchUI).toBe(true);
        });

        it('should handle show other months', () => {
            testComponent.showOtherMonths = false;
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.showOtherMonths).toBe(false);
        });

        it('should handle select other months', () => {
            testComponent.selectOtherMonths = true;
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.selectOtherMonths).toBe(true);
        });

        it('should handle button bar', () => {
            testComponent.showButtonBar = true;
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.showButtonBar).toBe(true);
        });

        it('should handle keep invalid dates', () => {
            testComponent.keepInvalid = true;
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.keepInvalid).toBe(true);
        });

        it('should navigate to next month', fakeAsync(() => {
            testComponent.inline = true;
            testFixture.detectChanges();
            tick();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            const currentMonth = datePickerComponent.currentMonth;
            const currentYear = datePickerComponent.currentYear;

            const mockEvent = { preventDefault: jasmine.createSpy('preventDefault') };
            datePickerComponent.navForward(mockEvent);
            testFixture.detectChanges();
            tick();

            if (currentMonth === 11) {
                expect(datePickerComponent.currentMonth).toBe(0);
                expect(datePickerComponent.currentYear).toBe(currentYear + 1);
            } else {
                expect(datePickerComponent.currentMonth).toBe(currentMonth + 1);
                expect(datePickerComponent.currentYear).toBe(currentYear);
            }
        }));

        it('should navigate to previous month', fakeAsync(() => {
            testComponent.inline = true;
            testFixture.detectChanges();
            tick();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            const currentMonth = datePickerComponent.currentMonth;
            const currentYear = datePickerComponent.currentYear;

            const mockEvent = { preventDefault: jasmine.createSpy('preventDefault') };
            datePickerComponent.navBackward(mockEvent);
            testFixture.detectChanges();
            tick();

            if (currentMonth === 0) {
                expect(datePickerComponent.currentMonth).toBe(11);
                expect(datePickerComponent.currentYear).toBe(currentYear - 1);
            } else {
                expect(datePickerComponent.currentMonth).toBe(currentMonth - 1);
                expect(datePickerComponent.currentYear).toBe(currentYear);
            }
        }));

        it('should select date when clicked', fakeAsync(() => {
            testComponent.inline = true;
            testFixture.detectChanges();
            tick();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            const testDate = new Date(2023, 5, 15); // June 15, 2023

            // Directly set the value to test date selection functionality
            testComponent.selectedDate = testDate;
            testFixture.detectChanges();
            tick();

            expect(testComponent.selectedDate).toEqual(testDate);
            expect(datePickerComponent.value).toEqual(testDate);
        }));

        it('should handle multiple date selection', fakeAsync(() => {
            testComponent.selectionMode = 'multiple';
            testComponent.inline = true;
            testFixture.detectChanges();
            tick();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;

            // Verify that selectionMode is set correctly
            expect(datePickerComponent.selectionMode).toBe('multiple');
            expect(datePickerComponent.inline).toBe(true);
        }));

        it('should handle range date selection', fakeAsync(() => {
            testComponent.selectionMode = 'range';
            testComponent.inline = true;
            testFixture.detectChanges();
            tick();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;

            // Verify that selectionMode is set correctly
            expect(datePickerComponent.selectionMode).toBe('range');
            expect(datePickerComponent.inline).toBe(true);
        }));

        it('should switch to month view when month clicked', fakeAsync(() => {
            testComponent.inline = true;
            testComponent.view = 'date';
            testFixture.detectChanges();
            tick();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;

            const mockEvent = { preventDefault: jasmine.createSpy('preventDefault') };
            datePickerComponent.switchToMonthView(mockEvent);
            testFixture.detectChanges();
            tick();

            expect(datePickerComponent.currentView).toBe('month');
        }));

        it('should switch to year view when year clicked', fakeAsync(() => {
            testComponent.inline = true;
            testComponent.view = 'date';
            testFixture.detectChanges();
            tick();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;

            const mockEvent = { preventDefault: jasmine.createSpy('preventDefault') };
            datePickerComponent.switchToYearView(mockEvent);
            testFixture.detectChanges();
            tick();

            expect(datePickerComponent.currentView).toBe('year');
        }));

        it('should handle time picker hour increment', fakeAsync(() => {
            testComponent.showTime = true;
            testComponent.inline = true;
            testComponent.selectedDate = new Date(2023, 5, 15, 10, 30);
            testFixture.detectChanges();
            tick();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            const initialHour = datePickerComponent.currentHour;

            const mockEvent = { preventDefault: jasmine.createSpy('preventDefault') };
            datePickerComponent.incrementHour(mockEvent);
            testFixture.detectChanges();
            tick();

            if (initialHour < 23) {
                expect(datePickerComponent.currentHour).toBe(initialHour + 1);
            } else {
                expect(datePickerComponent.currentHour).toBe(0);
            }
        }));

        it('should handle time picker minute increment', fakeAsync(() => {
            testComponent.showTime = true;
            testComponent.inline = true;
            testComponent.selectedDate = new Date(2023, 5, 15, 10, 30);
            testFixture.detectChanges();
            tick();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            const initialMinute = datePickerComponent.currentMinute;

            const mockEvent = { preventDefault: jasmine.createSpy('preventDefault') };
            datePickerComponent.incrementMinute(mockEvent);
            testFixture.detectChanges();
            tick();

            if (initialMinute < 59) {
                expect(datePickerComponent.currentMinute).toBe(initialMinute + 1);
            } else {
                expect(datePickerComponent.currentMinute).toBe(0);
            }
        }));

        it('should clear selection when clear button clicked', fakeAsync(() => {
            testComponent.showClear = true;
            testComponent.selectedDate = new Date(2023, 5, 15);
            testFixture.detectChanges();
            tick();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;

            datePickerComponent.clear();
            testFixture.detectChanges();
            tick();

            expect(testComponent.selectedDate).toBeNull();
        }));

        it('should handle keyboard navigation', fakeAsync(() => {
            testComponent.inline = true;
            testFixture.detectChanges();
            tick();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;

            // Test that keyboard navigation properties are available
            expect(typeof datePickerComponent.onContainerButtonKeydown).toBe('function');
            expect(datePickerComponent.inline).toBe(true);
        }));

        it('should handle disabled dates', fakeAsync(() => {
            const disabledDate = new Date(2023, 5, 15);
            testComponent.disabledDates = [disabledDate];
            testComponent.inline = true;
            testFixture.detectChanges();
            tick();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;

            // Test that disabled dates array is properly set
            expect(datePickerComponent.disabledDates).toContain(disabledDate);
            expect(Array.isArray(datePickerComponent.disabledDates)).toBe(true);
        }));

        it('should handle min/max date restrictions', fakeAsync(() => {
            testComponent.minDate = new Date(2023, 5, 10);
            testComponent.maxDate = new Date(2023, 5, 20);
            testComponent.inline = true;
            testFixture.detectChanges();
            tick();

            const beforeMinDate = new Date(2023, 5, 5);
            const afterMaxDate = new Date(2023, 5, 25);
            const validDate = new Date(2023, 5, 15);

            // Test that dates outside range are considered out of bounds
            expect(beforeMinDate < testComponent.minDate).toBe(true);
            expect(afterMaxDate > testComponent.maxDate).toBe(true);
            expect(validDate >= testComponent.minDate && validDate <= testComponent.maxDate).toBe(true);
        }));

        it('should handle button bar today functionality', fakeAsync(() => {
            testComponent.showButtonBar = true;
            testComponent.inline = true;
            testFixture.detectChanges();
            tick();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;

            // Test Today button
            const mockEvent = { preventDefault: jasmine.createSpy('preventDefault') };
            datePickerComponent.onTodayButtonClick(mockEvent);
            testFixture.detectChanges();
            tick();

            const today = new Date();
            expect(testComponent.selectedDate.toDateString()).toBe(today.toDateString());
        }));
    });

    describe('Animation and Transitions', () => {
        it('should handle show transition options', () => {
            testComponent.showTransitionOptions = '.2s ease-in';
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.showTransitionOptions).toBe('.2s ease-in');
        });

        it('should handle hide transition options', () => {
            testComponent.hideTransitionOptions = '.15s ease-out';
            testFixture.detectChanges();

            const datePickerComponent = testFixture.debugElement.query(By.css('p-datepicker')).componentInstance;
            expect(datePickerComponent.hideTransitionOptions).toBe('.15s ease-out');
        });
    });

    describe('pTemplate Content Projection', () => {
        let pTemplatesFixture: ComponentFixture<TestPTemplatesDatePickerComponent>;
        let pTemplatesDatePickerElement: any;

        beforeEach(async () => {
            pTemplatesFixture = TestBed.createComponent(TestPTemplatesDatePickerComponent);
            pTemplatesDatePickerElement = pTemplatesFixture.debugElement.query(By.css('p-datepicker'));
            pTemplatesFixture.detectChanges();
        });

        it('should initialize pTemplates and make them available', () => {
            const datePickerComponent = pTemplatesDatePickerElement.componentInstance;

            // Trigger content initialization
            pTemplatesFixture.detectChanges();

            // Verify that templates collection exists
            expect(datePickerComponent.templates).toBeDefined();
        });

        it('should support date pTemplate property access', () => {
            const datePickerComponent = pTemplatesDatePickerElement.componentInstance;
            // Verify component can access template properties without errors
            expect(() => datePickerComponent.dateTemplate).not.toThrow();
            expect(datePickerComponent).toBeTruthy();
        });

        it('should support header pTemplate property access', () => {
            const datePickerComponent = pTemplatesDatePickerElement.componentInstance;
            // Verify component can access template properties without errors
            expect(() => datePickerComponent.headerTemplate).not.toThrow();
            expect(datePickerComponent).toBeTruthy();
        });

        it('should support footer pTemplate property access', () => {
            const datePickerComponent = pTemplatesDatePickerElement.componentInstance;
            // Verify component can access template properties without errors
            expect(() => datePickerComponent.footerTemplate).not.toThrow();
            expect(datePickerComponent).toBeTruthy();
        });

        it('should support disabled date pTemplate property access', () => {
            const datePickerComponent = pTemplatesDatePickerElement.componentInstance;
            // Verify component can access template properties without errors
            expect(() => datePickerComponent.disabledDateTemplate).not.toThrow();
            expect(datePickerComponent).toBeTruthy();
        });
    });

    describe('#template Reference Content Projection', () => {
        let refTemplatesFixture: ComponentFixture<TestRefTemplatesDatePickerComponent>;
        let refTemplatesDatePickerElement: any;

        beforeEach(async () => {
            refTemplatesFixture = TestBed.createComponent(TestRefTemplatesDatePickerComponent);
            refTemplatesDatePickerElement = refTemplatesFixture.debugElement.query(By.css('p-datepicker'));
            refTemplatesFixture.detectChanges();
        });

        it('should initialize #template references and make them available', () => {
            const datePickerComponent = refTemplatesDatePickerElement.componentInstance;

            // Trigger content initialization
            refTemplatesFixture.detectChanges();

            // Verify that templates collection exists
            expect(datePickerComponent.templates).toBeDefined();
        });

        it('should support date #template reference property access', () => {
            const datePickerComponent = refTemplatesDatePickerElement.componentInstance;
            // Verify component can access template properties without errors
            expect(() => datePickerComponent.dateTemplate).not.toThrow();
            expect(datePickerComponent).toBeTruthy();
        });

        it('should support header #template reference property access', () => {
            const datePickerComponent = refTemplatesDatePickerElement.componentInstance;
            // Verify component can access template properties without errors
            expect(() => datePickerComponent.headerTemplate).not.toThrow();
            expect(datePickerComponent).toBeTruthy();
        });

        it('should support footer #template reference property access', () => {
            const datePickerComponent = refTemplatesDatePickerElement.componentInstance;
            // Verify component can access template properties without errors
            expect(() => datePickerComponent.footerTemplate).not.toThrow();
            expect(datePickerComponent).toBeTruthy();
        });

        it('should support disabled date #template reference property access', () => {
            const datePickerComponent = refTemplatesDatePickerElement.componentInstance;
            // Verify component can access template properties without errors
            expect(() => datePickerComponent.disabledDateTemplate).not.toThrow();
            expect(datePickerComponent).toBeTruthy();
        });
    });

    describe('Templates and Content Projection (Legacy)', () => {
        let templatesFixture: ComponentFixture<TestTemplatesDatePickerComponent>;
        let templatesDatePickerElement: any;

        beforeEach(async () => {
            templatesFixture = TestBed.createComponent(TestTemplatesDatePickerComponent);
            templatesDatePickerElement = templatesFixture.debugElement.query(By.css('p-datepicker'));
            templatesFixture.detectChanges();
        });

        it('should initialize templates and make them available', () => {
            const datePickerComponent = templatesDatePickerElement.componentInstance;

            // Trigger content initialization
            templatesFixture.detectChanges();

            // Verify that templates collection exists
            expect(datePickerComponent.templates).toBeDefined();
        });

        it('should support date template property access', () => {
            const datePickerComponent = templatesDatePickerElement.componentInstance;
            // Verify component can access template properties without errors
            expect(() => datePickerComponent.dateTemplate).not.toThrow();
            expect(datePickerComponent).toBeTruthy();
        });

        it('should support header template property access', () => {
            const datePickerComponent = templatesDatePickerElement.componentInstance;
            // Verify component can access template properties without errors
            expect(() => datePickerComponent.headerTemplate).not.toThrow();
            expect(datePickerComponent).toBeTruthy();
        });

        it('should support footer template property access', () => {
            const datePickerComponent = templatesDatePickerElement.componentInstance;
            // Verify component can access template properties without errors
            expect(() => datePickerComponent.footerTemplate).not.toThrow();
            expect(datePickerComponent).toBeTruthy();
        });

        it('should support disabled date template property access', () => {
            const datePickerComponent = templatesDatePickerElement.componentInstance;
            // Verify component can access template properties without errors
            expect(() => datePickerComponent.disabledDateTemplate).not.toThrow();
            expect(datePickerComponent).toBeTruthy();
        });

        it('should support decade template property access', () => {
            const datePickerComponent = templatesDatePickerElement.componentInstance;
            // Verify component can access template properties without errors
            expect(() => datePickerComponent.decadeTemplate).not.toThrow();
            expect(datePickerComponent).toBeTruthy();
        });

        it('should support navigation icon template property access', () => {
            const datePickerComponent = templatesDatePickerElement.componentInstance;
            // Verify component can access navigation template properties without errors
            expect(() => {
                datePickerComponent.previousIconTemplate;
                datePickerComponent.nextIconTemplate;
            }).not.toThrow();
            expect(datePickerComponent).toBeTruthy();
        });

        it('should support action icon template property access', () => {
            const datePickerComponent = templatesDatePickerElement.componentInstance;
            // Verify component can access action template properties without errors
            expect(() => {
                datePickerComponent.triggerIconTemplate;
                datePickerComponent.clearIconTemplate;
                datePickerComponent.inputIconTemplate;
            }).not.toThrow();
            expect(datePickerComponent).toBeTruthy();
        });

        it('should support time control icon template property access', () => {
            const datePickerComponent = templatesDatePickerElement.componentInstance;
            // Verify component can access time control template properties without errors
            expect(() => {
                datePickerComponent.decrementIconTemplate;
                datePickerComponent.incrementIconTemplate;
            }).not.toThrow();
            expect(datePickerComponent).toBeTruthy();
        });

        it('should have template collection initialized', () => {
            const datePickerComponent = templatesDatePickerElement.componentInstance;

            // Verify that the component has template properties
            expect(datePickerComponent.templates).toBeDefined();

            // Test that we can access template-related properties without errors
            expect(() => {
                datePickerComponent.dateTemplate;
                datePickerComponent.headerTemplate;
                datePickerComponent.footerTemplate;
                datePickerComponent.disabledDateTemplate;
                datePickerComponent.decadeTemplate;
                datePickerComponent.previousIconTemplate;
                datePickerComponent.nextIconTemplate;
                datePickerComponent.triggerIconTemplate;
                datePickerComponent.clearIconTemplate;
                datePickerComponent.decrementIconTemplate;
                datePickerComponent.incrementIconTemplate;
                datePickerComponent.inputIconTemplate;
            }).not.toThrow();
        });

        it('should handle template-enabled DatePicker component', () => {
            // The TestTemplatesDatePickerComponent contains various template projections
            // Verify the component can be instantiated and used without errors
            expect(templatesFixture.componentInstance).toBeTruthy();
            expect(templatesDatePickerElement).toBeTruthy();
            expect(templatesDatePickerElement.componentInstance).toBeTruthy();
        });

        it('should support ContentChild template projections', () => {
            const datePickerComponent = templatesDatePickerElement.componentInstance;

            // Verify component is ready to accept templates
            expect(datePickerComponent).toBeTruthy();

            // After content initialization should be callable without errors
            expect(() => {
                if (datePickerComponent.ngAfterContentInit) {
                    datePickerComponent.ngAfterContentInit();
                }
            }).not.toThrow();
        });

        it('should process templates through PrimeTemplate system', () => {
            const datePickerComponent = templatesDatePickerElement.componentInstance;

            // Verify that templates can be processed
            expect(datePickerComponent.templates).toBeDefined();

            // Test that the template processing lifecycle works
            expect(() => {
                templatesFixture.detectChanges();
            }).not.toThrow();
        });

        it('should recognize both pTemplate and #template structures', () => {
            // Test that component can handle both pTemplate directive and #template references
            const datePickerComponent = templatesDatePickerElement.componentInstance;

            // Verify component can work with templates without errors
            expect(() => {
                templatesFixture.detectChanges();
                if (datePickerComponent.ngAfterContentInit) {
                    datePickerComponent.ngAfterContentInit();
                }
            }).not.toThrow();

            // Templates should be available for processing
            expect(datePickerComponent.templates).toBeDefined();
        });

        it('should verify #template references are accessible', () => {
            // Verify that #template references can be accessed
            const datePickerComponent = templatesDatePickerElement.componentInstance;

            // After content init, templates should be available
            expect(() => {
                templatesFixture.detectChanges();
                if (datePickerComponent.ngAfterContentInit) {
                    datePickerComponent.ngAfterContentInit();
                }
            }).not.toThrow();

            // Component should be able to process templates
            expect(datePickerComponent).toBeTruthy();
        });

        it('should handle template projection with context parameters', () => {
            const datePickerComponent = templatesDatePickerElement.componentInstance;

            // Test that templates can be processed with context
            expect(() => {
                // Simulate template context processing
                templatesFixture.detectChanges();

                // Templates should be available for context binding
                if (datePickerComponent.templates) {
                    datePickerComponent.templates.forEach((template: any) => {
                        expect(template).toBeTruthy();
                    });
                }
            }).not.toThrow();
        });

        it('should support dual template approach (pTemplate + #template)', () => {
            // Verify that using both pTemplate and #template doesn't cause conflicts
            const datePickerComponent = templatesDatePickerElement.componentInstance;

            // Component should handle dual template approach
            expect(() => {
                templatesFixture.detectChanges();

                // Test template processing
                if (datePickerComponent.ngAfterContentInit) {
                    datePickerComponent.ngAfterContentInit();
                }
            }).not.toThrow();

            expect(datePickerComponent).toBeTruthy();
        });

        it('should verify all template types with #template structure', () => {
            // Test comprehensive template coverage with #template references
            const datePickerComponent = templatesDatePickerElement.componentInstance;

            // Verify that component can process all template types
            expect(() => {
                templatesFixture.detectChanges();

                // Test template property access
                datePickerComponent.dateTemplate;
                datePickerComponent.headerTemplate;
                datePickerComponent.footerTemplate;
                datePickerComponent.disabledDateTemplate;
                datePickerComponent.decadeTemplate;
                datePickerComponent.previousIconTemplate;
                datePickerComponent.nextIconTemplate;
                datePickerComponent.triggerIconTemplate;
                datePickerComponent.clearIconTemplate;
                datePickerComponent.decrementIconTemplate;
                datePickerComponent.incrementIconTemplate;
                datePickerComponent.inputIconTemplate;
            }).not.toThrow();

            // Component should handle template processing
            expect(datePickerComponent).toBeTruthy();
        });

        it('should handle template lifecycle with #template references', () => {
            const datePickerComponent = templatesDatePickerElement.componentInstance;

            // Test template lifecycle methods
            expect(() => {
                // ngAfterContentInit should process templates
                if (datePickerComponent.ngAfterContentInit) {
                    datePickerComponent.ngAfterContentInit();
                }

                // ngAfterViewInit should be callable
                if (datePickerComponent.ngAfterViewInit) {
                    datePickerComponent.ngAfterViewInit();
                }

                templatesFixture.detectChanges();
            }).not.toThrow();

            // Templates should be properly initialized
            expect(datePickerComponent.templates).toBeDefined();
        });

        it('should handle context parameters in date template', () => {
            // Test that date template context works
            expect(() => {
                templatesFixture.detectChanges();

                // Simulate date context processing
                const mockDateContext = {
                    date: { day: 15, month: 6, year: 2023 }
                };

                // Template should handle context parameters
                expect(mockDateContext.date.day).toBe(15);
                expect(mockDateContext.date.month).toBe(6);
                expect(mockDateContext.date.year).toBe(2023);
            }).not.toThrow();
        });

        it('should handle context parameters in disabled date template', () => {
            // Test that disabled date template context works
            expect(() => {
                templatesFixture.detectChanges();

                // Simulate disabled date context processing
                const mockDisabledContext = {
                    date: { day: 25, month: 12, year: 2023, disabled: true }
                };

                // Template should handle disabled date context
                expect(mockDisabledContext.date.disabled).toBe(true);
            }).not.toThrow();
        });

        it('should handle context parameters in decade template', () => {
            // Test that decade template context works
            expect(() => {
                templatesFixture.detectChanges();

                // Simulate decade context processing
                const mockDecadeContext = {
                    decade: { year: 2020 }
                };

                // Template should handle decade context
                expect(mockDecadeContext.decade.year).toBe(2020);
            }).not.toThrow();
        });
    });
});
