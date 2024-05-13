import { ScrollingModule } from '@angular/cdk/scrolling';
import { TestBed, ComponentFixture, fakeAsync, flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Dropdown, DropdownItem } from './dropdown';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayModule } from 'primeng/overlay';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { SearchIcon } from 'primeng/icons/search';
import { TimesIcon } from 'primeng/icons/times';

@Component({
    template: `
        <p-dropdown [(ngModel)]="selectedCity" [options]="groupedCars" [editable]="editable" [disabled]="disabled" [placeholder]="placeholder" [group]="true">
            <ng-template let-group pTemplate="group">
                <span>{{ group.label }}</span>
            </ng-template>
        </p-dropdown>
        <p-dropdown [(ngModel)]="selectedCity"></p-dropdown>
        <button (click)="setValue()"></button>
        <p-dropdown [(ngModel)]="selectedCity" [options]="groupedCarsAlternate" optionGroupChildren="children" [group]="true"></p-dropdown>
    `
})
class TestDropdownComponent {
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
describe('Dropdown', () => {
    let dropdown: Dropdown;
    let testDropdown: Dropdown;
    let groupDropdown: Dropdown;
    let alternateGroupDropdown: Dropdown;
    let fixture: ComponentFixture<Dropdown>;
    let groupFixture: ComponentFixture<TestDropdownComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, FormsModule, ScrollingModule, TooltipModule, OverlayModule, ChevronDownIcon, SearchIcon, TimesIcon],
            declarations: [Dropdown, DropdownItem, TestDropdownComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(Dropdown);
        groupFixture = TestBed.createComponent(TestDropdownComponent);
        groupDropdown = groupFixture.debugElement.children[0].componentInstance;
        testDropdown = groupFixture.debugElement.children[1].componentInstance;
        alternateGroupDropdown = groupFixture.debugElement.children[3].componentInstance;
        dropdown = fixture.componentInstance;
    });

    it('should disable', () => {
        fixture.componentInstance.disabled = true;
        fixture.componentInstance.editable = true;
        fixture.detectChanges();

        dropdown.cd.detectChanges();
        const containerEl = fixture.debugElement.query(By.css('.p-dropdown')).nativeElement;
        const editableInputEl = fixture.debugElement.query(By.css('input')).nativeElement;
        expect(containerEl.className).toContain('p-disabled');
        expect(editableInputEl.disabled).toEqual(true);
    });

    it('should change dropdown icon', () => {
        dropdown.dropdownIcon = 'Primeng';
        fixture.detectChanges();

        const dropdownSpanEl = fixture.debugElement.query(By.css('.p-dropdown-trigger-icon')).nativeElement;
        expect(dropdownSpanEl.className).toContain('Primeng');
    });

    it('should change style and styleClass', () => {
        dropdown.styleClass = 'Primeng';
        dropdown.style = { height: '300px' };
        fixture.detectChanges();

        const containerEl = fixture.debugElement.query(By.css('.p-dropdown'));
        expect(containerEl.nativeElement.className).toContain('Primeng');
        expect(containerEl.nativeElement.style.height).toEqual('300px');
    });

    it('should change panelStyleClass', () => {
        dropdown.panelStyleClass = 'Primeng';
        dropdown.options = [
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

        const dropdownPanel = fixture.debugElement.query(By.css('.p-dropdown-panel'));
        expect(dropdownPanel).toBeTruthy();
        expect(dropdownPanel.nativeElement.className).toContain('Primeng');
    });

    it('should open when clicked', () => {
        dropdown.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        fixture.detectChanges();

        const container = fixture.debugElement.query(By.css('.p-dropdown')).nativeElement;
        container.click();
        fixture.detectChanges();

        const dropdownPanel = fixture.debugElement.query(By.css('.p-dropdown-panel'));
        expect(dropdownPanel).toBeTruthy();
        expect(dropdown.overlayVisible).toBeTrue();
    });

    it('should close', () => {
        dropdown.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        fixture.detectChanges();

        const container = fixture.debugElement.query(By.css('.p-dropdown')).nativeElement;
        container.click();
        fixture.detectChanges();

        container.click();
        fixture.detectChanges();

        const dropdownPanel = fixture.debugElement.query(By.css('.p-dropdown-panel'));
        expect(container.className).not.toContain('p-dropdown-open');
        expect(dropdownPanel).toBeFalsy();
    });

    it('should item selected', () => {
        dropdown.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        fixture.detectChanges();

        const container = fixture.debugElement.query(By.css('.p-dropdown')).nativeElement;
        container.click();
        fixture.detectChanges();

        const items = fixture.debugElement.query(By.css('.p-dropdown-items'));
        items.children[2].children[0].nativeElement.click();
        fixture.detectChanges();
        expect(dropdown.selectedOption.name).toEqual('London');
    });

    it('should item clear', () => {
        dropdown.options = [
            { label: 'Select City', value: null },
            { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
            { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
            { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
            { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
            { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } }
        ];
        dropdown.showClear = true;
        fixture.detectChanges();

        const container = fixture.debugElement.query(By.css('.p-dropdown')).nativeElement;
        container.click();
        fixture.detectChanges();

        const items = fixture.debugElement.query(By.css('.p-dropdown-items'));
        items.children[2].children[0].nativeElement.click();
        fixture.detectChanges();
        const itemCloseIcon = fixture.debugElement.query(By.css('.p-dropdown-clear-icon'));
        itemCloseIcon.nativeElement.parentElement.click();
        fixture.detectChanges();

        expect(dropdown.selectedOption).toEqual({ label: 'Select City', value: null });
        expect(items.children[2].nativeElement.className).not.toContain('p-highlight');
    });

    it('should filter', fakeAsync(() => {
        dropdown.filter = true;
        dropdown.filterValue = 'n';
        fixture.detectChanges();

        dropdown.options = [
            { label: 'New York', code: 'NY' },
            { label: 'Rome', code: 'RM' },
            { label: 'London', code: 'LDN' },
            { label: 'Istanbul', code: 'IST' },
            { label: 'Paris', code: 'PRS' }
        ];
        fixture.detectChanges();

        const container = fixture.debugElement.query(By.css('.p-dropdown')).nativeElement;
        container.click();
        fixture.detectChanges();

        let items = fixture.debugElement.query(By.css('.p-dropdown-items'));
        expect(items.nativeElement.children.length).toEqual(5);
        const filterDiv = fixture.debugElement.query(By.css('.p-dropdown-filter-container'));
        expect(filterDiv).toBeTruthy();
        const filterInputEl = fixture.debugElement.query(By.css('.p-dropdown-filter'));
        filterInputEl.nativeElement.value = 'n';
        filterInputEl.nativeElement.dispatchEvent(new Event('keydown'));
        const event = { target: { value: 'n' } };
        dropdown.onFilterInputChange(event);
        fixture.detectChanges();

        items = fixture.debugElement.query(By.css('.p-dropdown-items'));
        expect(items.nativeElement.children.length).toEqual(3);
        flush();
    }));

    it('should filtered and display not found warning', fakeAsync(() => {
        dropdown.options = [
            { label: 'New York', code: 'NY' },
            { label: 'Rome', code: 'RM' },
            { label: 'London', code: 'LDN' },
            { label: 'Istanbul', code: 'IST' },
            { label: 'Paris', code: 'PRS' }
        ];
        dropdown.filter = true;
        fixture.detectChanges();

        const container = fixture.debugElement.query(By.css('.p-dropdown')).nativeElement;
        container.click();
        fixture.detectChanges();

        const filterDiv = fixture.debugElement.query(By.css('.p-dropdown-filter-container'));
        expect(filterDiv).toBeTruthy();
        const filterInputEl = fixture.debugElement.query(By.css('.p-dropdown-filter'));
        filterInputEl.nativeElement.value = 'primeng';
        filterInputEl.nativeElement.dispatchEvent(new Event('keydown'));
        const event = { target: { value: 'primeng' } };
        dropdown.onFilterInputChange(event);
        fixture.detectChanges();

        const items = fixture.debugElement.query(By.css('.p-dropdown-items'));
        const emptyMesage = items.children[0];
        expect(items.nativeElement.children.length).toEqual(1);
        expect(emptyMesage).toBeTruthy();
        expect(emptyMesage.nativeElement.textContent).toContain('No results found');
        flush();
    }));

    it('should open with down key', () => {
        dropdown.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        dropdown.appendTo = 'body';
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('.p-inputtext')).nativeElement;
        inputEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
        fixture.detectChanges();

        const dropdownPanel = fixture.debugElement.query(By.css('.p-dropdown-panel'));
        expect(dropdownPanel).toBeTruthy();
        expect(dropdown.overlayVisible).toBeTruthy();
    });

    it('should open with space key and close with esc key', () => {
        dropdown.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        dropdown.appendTo = 'body';
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('.p-inputtext')).nativeElement;
        inputEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' })); //open overlay
        fixture.detectChanges();

        const dropdownPanel = fixture.debugElement.query(By.css('.p-dropdown-panel'));
        expect(dropdownPanel).toBeTruthy();
        expect(dropdown.overlayVisible).toBeTruthy();

        inputEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
        fixture.detectChanges();

        expect(dropdown.overlayVisible).toBeFalsy();
    });

    it('should select with down key when selectOnFocus = true', () => {
        fixture.detectChanges();

        dropdown.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        dropdown.appendTo = document.body;
        dropdown.optionValue = 'code';
        dropdown.optionLabel = 'name';
        dropdown.selectOnFocus = true;
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('.p-inputtext')).nativeElement;
        const downKeyboardEvent = new KeyboardEvent('keydown', { code: 'ArrowDown' });
        inputEl.dispatchEvent(downKeyboardEvent); //open overlay and focus on first item
        inputEl.dispatchEvent(downKeyboardEvent); //focus next item
        fixture.detectChanges();

        expect(dropdown.overlayVisible).toBeTrue();
        expect(dropdown.modelValue()).toBe('RM');

        inputEl.dispatchEvent(downKeyboardEvent); //focus next item
        fixture.detectChanges();
        expect(dropdown.modelValue()).toBe('LDN');
    });

    it('should select with enter key and close the overlay', () => {
        dropdown.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        dropdown.appendTo = document.body;
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('.p-inputtext')).nativeElement;
        inputEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' })); // open overlay and focus on first item
        fixture.detectChanges();

        inputEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' })); // select and close overlay
        fixture.detectChanges();

        expect(dropdown.overlayVisible).toBeFalsy();
        expect(dropdown.selectedOption.code).toBe('NY');
    });

    it('should select with up key', () => {
        fixture.detectChanges();
        dropdown.selectOnFocus = true;
        dropdown.options = [
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

        expect(dropdown.value.name).toEqual('Paris');
    });

    it('should select with up key and skip disabled options', () => {
        fixture.detectChanges();

        dropdown.optionDisabled = 'inactive';
        dropdown.selectOnFocus = true;
        dropdown.options = [
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

        expect(dropdown.value.name).toEqual('London');
    });

    it('should select with filter', () => {
        dropdown.options = [
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

        expect(dropdown.selectedOption.label).toEqual('London');
    });

    it('should focus on next grouped item with down key', () => {
        groupDropdown.selectOnFocus = true;
        groupFixture.detectChanges();

        const inputEl = groupFixture.debugElement.query(By.css('.p-inputtext')).nativeElement;
        const downKeyboardEvent = new KeyboardEvent('keydown', { code: 'ArrowDown' });
        inputEl.dispatchEvent(downKeyboardEvent); //open overlay
        inputEl.dispatchEvent(downKeyboardEvent); //focus on first item
        groupFixture.detectChanges();

        expect(groupDropdown.selectedOption.label).toEqual('BMW');
        inputEl.dispatchEvent(downKeyboardEvent);
        groupFixture.detectChanges();

        expect(groupDropdown.selectedOption.label).toEqual('Mercedes');
        inputEl.dispatchEvent(downKeyboardEvent);
        inputEl.dispatchEvent(downKeyboardEvent);
        groupFixture.detectChanges();

        expect(groupDropdown.selectedOption.label).toEqual('Ford');
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

        expect(groupDropdown.selectedOption.label).toEqual('Ford');

        inputEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' })); //open overlay
        inputEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' })); // move up
        inputEl.dispatchEvent(keyEnterEvent); //select
        groupFixture.detectChanges();

        expect(groupDropdown.selectedOption.label).toEqual('Cadillac');
        inputEl.dispatchEvent(keyDownEvent); //open overlay
        inputEl.dispatchEvent(keyDownEvent); //move down
        inputEl.dispatchEvent(keyEnterEvent); //select
        groupFixture.detectChanges();

        expect(groupDropdown.selectedOption.label).toEqual('Ford');
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

        expect(groupDropdown.selectedOption.label).toEqual('Mercedes');
    });

    [null, undefined, ''].map((value) =>
        it('should return filled false when value is not provided', () => {
            dropdown.value = value;
            fixture.detectChanges();

            expect(dropdown.filled()).toBeFalsy();
        })
    );
});
