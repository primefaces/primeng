import { ScrollingModule } from '@angular/cdk/scrolling';
import { TestBed, ComponentFixture, fakeAsync, flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Select, SelectItem } from './select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
    template: `
        <p-select [(ngModel)]="selectedCity" [options]="groupedCars" [editable]="editable" [disabled]="disabled" [placeholder]="placeholder" [group]="true">
            <ng-template let-group pTemplate="group">
                <span>{{ group.label }}</span>
            </ng-template>
        </p-select>
        <p-select [(ngModel)]="selectedCity"></p-select>
        <button (click)="setValue()"></button>
        <p-select [(ngModel)]="selectedCity" [options]="groupedCarsAlternate" optionGroupChildren="children" [group]="true"></p-select>
    `
})
class TestSelectComponent {
    selectedCity: any;

    groupedCars = [
        {
            label: 'Germany',
            value: 'germany.png',
            items: [
                { label: 'Audi', value: 'Audi' },
                { label: 'BMW', value: 'BMW' },
                { label: 'Mercedes', value: 'Mercedes' }
            ]
        },
        {
            label: 'USA',
            value: 'usa.png',
            items: [
                { label: 'Cadillac', value: 'Cadillac' },
                { label: 'Ford', value: 'Ford' },
                { label: 'GMC', value: 'GMC' }
            ]
        },
        {
            label: 'Japan',
            value: 'japan.png',
            items: [
                { label: 'Honda', value: 'Honda' },
                { label: 'Mazda', value: 'Mazda' },
                { label: 'Toyota', value: 'Toyota' }
            ]
        }
    ];

    groupedCarsAlternate = this.groupedCars.map((city) => ({
        label: city.label,
        value: city.value,
        children: city.items
    }));

    disabled: boolean;

    editable: boolean;

    placeholder: string = 'Select a Car';

    setValue() {
        this.selectedCity = { name: 'New York', code: 'NY' };
    }
}
describe('Select', () => {
    let select: Select;
    let testSelect: Select;
    let groupSelect: Select;
    let alternategroupSelect: Select;
    let fixture: ComponentFixture<Select>;
    let groupFixture: ComponentFixture<TestSelectComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, FormsModule, ScrollingModule],
            declarations: [Select, SelectItem, TestSelectComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(Select);
        groupFixture = TestBed.createComponent(TestSelectComponent);
        groupSelect = groupFixture.debugElement.children[0].componentInstance;
        testSelect = groupFixture.debugElement.children[1].componentInstance;
        alternategroupSelect = groupFixture.debugElement.children[3].componentInstance;
        select = fixture.componentInstance;
    });

    it('should disable', () => {
        fixture.componentInstance.disabled = true;
        fixture.componentInstance.editable = true;
        fixture.detectChanges();

        // select.cd.detectChanges();
        const containerEl = fixture.debugElement.query(By.css('.p-select')).nativeElement;
        const editableInputEl = fixture.debugElement.query(By.css('input')).nativeElement;
        expect(containerEl.className).toContain('p-disabled');
        expect(editableInputEl.disabled).toEqual(true);
    });

    it('should change dropdown icon', () => {
        select.dropdownIcon = 'Primeng';
        fixture.detectChanges();

        const dropdownSpanEl = fixture.debugElement.query(By.css('.p-select-dropdown-icon')).nativeElement;
        expect(dropdownSpanEl.className).toContain('Primeng');
    });

    it('should change style and styleClass', () => {
        select.styleClass = 'Primeng';
        select.style = { height: '300px' };
        fixture.detectChanges();

        const containerEl = fixture.debugElement.query(By.css('.p-select'));
        expect(containerEl.nativeElement.className).toContain('Primeng');
        expect(containerEl.nativeElement.style.height).toEqual('300px');
    });

    it('should change panelStyleClass', () => {
        select.panelStyleClass = 'Primeng';
        select.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        fixture.detectChanges();

        const container = fixture.debugElement.query(By.css('div')).nativeElement;
        container.click();
        fixture.detectChanges();

        const dropdownPanel = fixture.debugElement.query(By.css('.p-select-overlay'));
        expect(dropdownPanel).toBeTruthy();
        expect(dropdownPanel.nativeElement.className).toContain('Primeng');
    });

    it('should open when clicked', () => {
        select.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        fixture.detectChanges();

        const container = fixture.debugElement.query(By.css('.p-select')).nativeElement;
        container.click();
        fixture.detectChanges();

        const selectPanel = fixture.debugElement.query(By.css('.p-select-overlay'));
        expect(selectPanel).toBeTruthy();
        expect(select.overlayVisible).toBeTrue();
    });

    it('should close', () => {
        select.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        fixture.detectChanges();

        const container = fixture.debugElement.query(By.css('.p-select')).nativeElement;
        container.click();
        fixture.detectChanges();

        container.click();
        fixture.detectChanges();

        const dropdownPanel = fixture.debugElement.query(By.css('.p-select-overlay'));
        expect(container.className).not.toContain('p-select-open');
        expect(dropdownPanel).toBeFalsy();
    });

    it('should item selected', () => {
        select.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        fixture.detectChanges();

        const container = fixture.debugElement.query(By.css('.p-select')).nativeElement;
        container.click();
        fixture.detectChanges();

        const items = fixture.debugElement.query(By.css('.p-select-list'));
        items.children[2].children[0].nativeElement.click();
        fixture.detectChanges();
        expect(select.selectedOption.name).toEqual('London');
    });

    it('should item clear', () => {
        select.options = [
            { label: 'Select City', value: null },
            { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
            { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
            { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
            { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
            { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } }
        ];
        select.showClear = true;
        fixture.detectChanges();

        const container = fixture.debugElement.query(By.css('.p-select')).nativeElement;
        container.click();
        fixture.detectChanges();

        const items = fixture.debugElement.query(By.css('.p-select-items'));
        items.children[2].children[0].nativeElement.click();
        fixture.detectChanges();
        const itemCloseIcon = fixture.debugElement.query(By.css('.p-select-clear-icon'));
        itemCloseIcon.nativeElement.parentElement.click();
        fixture.detectChanges();

        expect(select.selectedOption).toEqual({ label: 'Select City', value: null });
        expect(items.children[2].nativeElement.className).not.toContain('p-select-option-selected');
    });

    it('should filter', fakeAsync(() => {
        select.filter = true;
        select.filterValue = 'n';
        fixture.detectChanges();

        select.options = [
            { label: 'New York', code: 'NY' },
            { label: 'Rome', code: 'RM' },
            { label: 'London', code: 'LDN' },
            { label: 'Istanbul', code: 'IST' },
            { label: 'Paris', code: 'PRS' }
        ];
        fixture.detectChanges();

        const container = fixture.debugElement.query(By.css('.p-select')).nativeElement;
        container.click();
        fixture.detectChanges();

        let items = fixture.debugElement.query(By.css('.p-select-items'));
        expect(items.nativeElement.children.length).toEqual(5);
        const filterInputEl = fixture.debugElement.query(By.css('.p-select-filter'));
        filterInputEl.nativeElement.value = 'n';
        filterInputEl.nativeElement.dispatchEvent(new Event('keydown'));
        const event = { target: { value: 'n' } };
        select.onFilterInputChange(event);
        fixture.detectChanges();

        items = fixture.debugElement.query(By.css('.p-dropdown-list'));
        expect(items.nativeElement.children.length).toEqual(3);
        flush();
    }));

    it('should filtered and display not found warning', fakeAsync(() => {
        select.options = [
            { label: 'New York', code: 'NY' },
            { label: 'Rome', code: 'RM' },
            { label: 'London', code: 'LDN' },
            { label: 'Istanbul', code: 'IST' },
            { label: 'Paris', code: 'PRS' }
        ];
        select.filter = true;
        fixture.detectChanges();

        const container = fixture.debugElement.query(By.css('.p-select')).nativeElement;
        container.click();
        fixture.detectChanges();

        const filterInputEl = fixture.debugElement.query(By.css('.p-select-filter'));
        filterInputEl.nativeElement.value = 'primeng';
        filterInputEl.nativeElement.dispatchEvent(new Event('keydown'));
        const event = { target: { value: 'primeng' } };
        select.onFilterInputChange(event);
        fixture.detectChanges();

        const items = fixture.debugElement.query(By.css('.p-select-items'));
        const emptyMesage = items.children[0];
        expect(items.nativeElement.children.length).toEqual(1);
        expect(emptyMesage).toBeTruthy();
        expect(emptyMesage.nativeElement.textContent).toContain('No results found');
        flush();
    }));

    it('should open with down key', () => {
        select.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        select.appendTo = 'body';
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('.p-inputtext')).nativeElement;
        inputEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
        fixture.detectChanges();

        const selectPanel = fixture.debugElement.query(By.css('.p-select-overlay'));
        expect(selectPanel).toBeTruthy();
        expect(select.overlayVisible).toBeTruthy();
    });

    it('should open with space key and close with esc key', () => {
        select.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        select.appendTo = 'body';
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('.p-inputtext')).nativeElement;
        inputEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' })); //open overlay
        fixture.detectChanges();

        const selectPanel = fixture.debugElement.query(By.css('.p-select-overlay'));
        expect(selectPanel).toBeTruthy();
        expect(select.overlayVisible).toBeTruthy();

        inputEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
        fixture.detectChanges();

        expect(select.overlayVisible).toBeFalsy();
    });

    it('should select with down key when selectOnFocus = true', () => {
        fixture.detectChanges();

        select.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        select.appendTo = document.body;
        select.optionValue = 'code';
        select.optionLabel = 'name';
        select.selectOnFocus = true;
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('.p-inputtext')).nativeElement;
        const downKeyboardEvent = new KeyboardEvent('keydown', { code: 'ArrowDown' });
        inputEl.dispatchEvent(downKeyboardEvent); //open overlay and focus on first item
        inputEl.dispatchEvent(downKeyboardEvent); //focus next item
        fixture.detectChanges();

        expect(select.overlayVisible).toBeTrue();
        expect(select.modelValue()).toBe('RM');

        inputEl.dispatchEvent(downKeyboardEvent); //focus next item
        fixture.detectChanges();
        expect(select.modelValue()).toBe('LDN');
    });

    it('should select with enter key and close the overlay', () => {
        select.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        select.appendTo = document.body;
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('.p-inputtext')).nativeElement;
        inputEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' })); // open overlay and focus on first item
        fixture.detectChanges();

        inputEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' })); // select and close overlay
        fixture.detectChanges();

        expect(select.overlayVisible).toBeFalsy();
        expect(select.selectedOption.code).toBe('NY');
    });

    it('should select with up key', () => {
        fixture.detectChanges();
        select.selectOnFocus = true;
        select.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('.p-inputtext')).nativeElement;
        inputEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
        fixture.detectChanges();

        expect(select.value.name).toEqual('Paris');
    });

    it('should select with up key and skip disabled options', () => {
        fixture.detectChanges();

        select.optionDisabled = 'inactive';
        select.selectOnFocus = true;
        select.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST', inactive: true },
            { name: 'Paris', code: 'PRS', inactive: true }
        ];
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('.p-inputtext')).nativeElement;
        inputEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
        fixture.detectChanges();

        expect(select.value.name).toEqual('London');
    });

    it('should select with filter', () => {
        select.options = [
            { label: 'New York', value: 'NY' },
            { label: 'Rome', value: 'RM' },
            { label: 'London', value: 'LDN' },
            { label: 'Istanbul', value: 'IST' },
            { label: 'Paris', value: 'PRS' }
        ];
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('.p-inputtext')).nativeElement;
        inputEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' })); //open overlay
        fixture.detectChanges();

        inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'l' })); // type 'l' key
        inputEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' })); // select field
        fixture.detectChanges();

        expect(select.selectedOption.label).toEqual('London');
    });

    it('should focus on next grouped item with down key', () => {
        groupSelect.selectOnFocus = true;
        groupFixture.detectChanges();

        const inputEl = groupFixture.debugElement.query(By.css('.p-inputtext')).nativeElement;
        const downKeyboardEvent = new KeyboardEvent('keydown', { code: 'ArrowDown' });
        inputEl.dispatchEvent(downKeyboardEvent); //open overlay
        inputEl.dispatchEvent(downKeyboardEvent); //focus on first item
        groupFixture.detectChanges();

        expect(groupSelect.selectedOption.label).toEqual('BMW');
        inputEl.dispatchEvent(downKeyboardEvent);
        groupFixture.detectChanges();

        expect(groupSelect.selectedOption.label).toEqual('Mercedes');
        inputEl.dispatchEvent(downKeyboardEvent);
        inputEl.dispatchEvent(downKeyboardEvent);
        groupFixture.detectChanges();

        expect(groupSelect.selectedOption.label).toEqual('Ford');
    });

    it('should groupSelect with up key', () => {
        groupFixture.detectChanges();

        const inputEl = groupFixture.debugElement.query(By.css('.p-inputtext')).nativeElement;
        const keyDownEvent = new KeyboardEvent('keydown', { code: 'ArrowDown' });
        const keyEnterEvent = new KeyboardEvent('keydown', { code: 'Enter' });
        inputEl.dispatchEvent(keyDownEvent); //open overlay and focus on first item
        inputEl.dispatchEvent(keyDownEvent); //move down
        inputEl.dispatchEvent(keyDownEvent); //move down
        inputEl.dispatchEvent(keyDownEvent); //move down
        inputEl.dispatchEvent(keyDownEvent); //move down
        inputEl.dispatchEvent(keyEnterEvent); //select
        groupFixture.detectChanges();

        expect(groupSelect.selectedOption.label).toEqual('Ford');

        inputEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' })); //open overlay
        inputEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' })); // move up
        inputEl.dispatchEvent(keyEnterEvent); //select
        groupFixture.detectChanges();

        expect(groupSelect.selectedOption.label).toEqual('Cadillac');
        inputEl.dispatchEvent(keyDownEvent); //open overlay
        inputEl.dispatchEvent(keyDownEvent); //move down
        inputEl.dispatchEvent(keyEnterEvent); //select
        groupFixture.detectChanges();

        expect(groupSelect.selectedOption.label).toEqual('Ford');
    });

    it('should groupSelect with filter', () => {
        groupFixture.detectChanges();

        const inputEl = groupFixture.debugElement.query(By.css('.p-inputtext')).nativeElement;
        const downKeyboardEvent = new KeyboardEvent('keydown', { code: 'ArrowDown' });
        inputEl.dispatchEvent(downKeyboardEvent); //open overlay
        groupFixture.detectChanges();

        inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'm' })); // type 'm' key
        inputEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' })); // select field
        groupFixture.detectChanges();

        expect(groupSelect.selectedOption.label).toEqual('Mercedes');
    });

    [null, undefined, ''].map((value) =>
        it('should return filled false when value is not provided', () => {
            select.value = value;
            fixture.detectChanges();

            expect(select.filled()).toBeFalsy();
        })
    );
});
