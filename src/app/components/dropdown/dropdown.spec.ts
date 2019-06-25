import {ScrollingModule} from '@angular/cdk/scrolling';
import { TestBed, ComponentFixture, tick, fakeAsync, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {Dropdown, DropdownItem} from './dropdown';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { Component } from '@angular/core';

@Component({
	template: `
		<p-dropdown [options]="groupedCars" placeholder="Select a Car" [group]="true">
			<ng-template let-group pTemplate="group">
				<span>{{group.label}}</span>
			</ng-template>
		</p-dropdown>
	`
})
class TestDropdownComponent {
	groupedCars = [
		{
			label: 'Germany', value: 'germany.png', 
			items: [
				{label: 'Audi', value: 'Audi'},
				{label: 'BMW', value: 'BMW'},
				{label: 'Mercedes', value: 'Mercedes'}
			]
		},
		{
			label: 'USA', value: 'usa.png', 
			items: [
				{label: 'Cadillac', value: 'Cadillac'},
				{label: 'Ford', value: 'Ford'},
				{label: 'GMC', value: 'GMC'}
			]
		},
		{
			label: 'Japan', value: 'japan.png', 
			items: [
				{label: 'Honda', value: 'Honda'},
				{label: 'Mazda', value: 'Mazda'},
				{label: 'Toyota', value: 'Toyota'}
			]
		}
	];
}
describe('Dropdown', () => {
    
    let dropdown: Dropdown;
    let groupDropdown: Dropdown;
	let fixture: ComponentFixture<Dropdown>;
	let groupFixture: ComponentFixture<TestDropdownComponent>;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule,
          FormsModule,
          ScrollingModule
        ],
        declarations: [
          Dropdown,
		  DropdownItem,
		  TestDropdownComponent
        ]
      }).compileComponents();
      
	  fixture = TestBed.createComponent(Dropdown);
	  groupFixture = TestBed.createComponent(TestDropdownComponent);
	  groupDropdown = groupFixture.debugElement.children[0].componentInstance;
      dropdown = fixture.componentInstance;
    });

	it('should disabled', () => {
		dropdown.disabled=true;
		dropdown.editable=true;
		fixture.detectChanges();

		const containerEl = fixture.debugElement.query(By.css('.ui-dropdown')).nativeElement;
		const hiddenEl = fixture.debugElement.queryAll(By.css('.ui-helper-hidden-accessible'))[0].children[0].nativeElement;
		const editableInputEl = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
		expect(containerEl.className).toContain('ui-state-disabled')
		expect(hiddenEl.disabled).toEqual(true);
		expect(editableInputEl.disabled).toEqual(true);
	});

	it('should change dropdown icon', () => {
		dropdown.dropdownIcon = "Primeng";
		fixture.detectChanges();

		const dropdownSpanEl = fixture.debugElement.query(By.css('.ui-dropdown-trigger-icon.ui-clickable')).nativeElement;
		expect(dropdownSpanEl.className).toContain("Primeng")
	});

	it('should change style and styleClass', () => {
		dropdown.styleClass = "Primeng";
		dropdown.style = {'primeng':'rocks'}
		fixture.detectChanges();

		const containerEl = fixture.debugElement.query(By.css('.ui-dropdown'));
		expect(containerEl.nativeElement.className).toContain("Primeng");
		expect(containerEl.nativeElement.style.primeng).toEqual("rocks");
	});

	it('should change panelStyleClass', () => {
		dropdown.panelStyleClass = "Primeng";
		dropdown.options = [
			{name: 'New York', code: 'NY'},
			{name: 'Rome', code: 'RM'},
			{name: 'London', code: 'LDN'},
			{name: 'Istanbul', code: 'IST'},
			{name: 'Paris', code: 'PRS'}
		];
		fixture.detectChanges();

		const container = fixture.debugElement.query(By.css('div')).nativeElement;
		container.click();
		fixture.detectChanges();

		const dropdownPanel = fixture.debugElement.query(By.css('.ui-dropdown-panel'));
		expect(dropdownPanel).toBeTruthy();
		expect(dropdownPanel.nativeElement.className).toContain("Primeng");
	});

	it('should open when clicked', () => {
		dropdown.options = [
			{name: 'New York', code: 'NY'},
			{name: 'Rome', code: 'RM'},
			{name: 'London', code: 'LDN'},
			{name: 'Istanbul', code: 'IST'},
			{name: 'Paris', code: 'PRS'}
		];
		fixture.detectChanges();
		
		const container = fixture.debugElement.query(By.css('.ui-dropdown')).nativeElement;
		container.click();
		fixture.detectChanges();

		const dropdownPanel = fixture.debugElement.query(By.css('.ui-dropdown-panel'));
		expect(container.className).toContain('ui-dropdown-open');
		expect(dropdownPanel).toBeTruthy();
	});

	it('should close', () => {
		dropdown.options = [
			{name: 'New York', code: 'NY'},
			{name: 'Rome', code: 'RM'},
			{name: 'London', code: 'LDN'},
			{name: 'Istanbul', code: 'IST'},
			{name: 'Paris', code: 'PRS'}
		];
		fixture.detectChanges();
		
		const container = fixture.debugElement.query(By.css('.ui-dropdown')).nativeElement;
		container.click();
		fixture.detectChanges();

		container.click();
		fixture.detectChanges();

		const dropdownPanel = fixture.debugElement.query(By.css('.ui-dropdown-panel'));
		expect(container.className).not.toContain('ui-dropdown-open');
		expect(dropdownPanel).toBeFalsy();
	});

	it('should item selected', () => {
		dropdown.options = [
			{name: 'New York', code: 'NY'},
			{name: 'Rome', code: 'RM'},
			{name: 'London', code: 'LDN'},
			{name: 'Istanbul', code: 'IST'},
			{name: 'Paris', code: 'PRS'}
		];
		fixture.detectChanges();
		
		const container = fixture.debugElement.query(By.css('.ui-dropdown')).nativeElement;
		container.click();
		fixture.detectChanges();

		const items = fixture.debugElement.query(By.css('.ui-dropdown-items'));
		items.children[2].children[0].nativeElement.click();
		fixture.detectChanges();
		expect(dropdown.selectedOption.name).toEqual('London');
		expect(items.children[2].children[0].nativeElement.className).toContain('ui-state-highlight')
	});

	it('should item clear', () => {
		dropdown.options = [
			{label:'Select City', value:null},
			{label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
			{label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
			{label:'London', value:{id:3, name: 'London', code: 'LDN'}},
			{label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
			{label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
		];
		dropdown.showClear=true;
		fixture.detectChanges();
		
		const container = fixture.debugElement.query(By.css('.ui-dropdown')).nativeElement;
		container.click();
		fixture.detectChanges();

		const items = fixture.debugElement.query(By.css('.ui-dropdown-items'));
		items.children[2].children[0].nativeElement.click();
		fixture.detectChanges();
		const itemCloseIcon = fixture.debugElement.query(By.css('.ui-dropdown-clear-icon'));
		itemCloseIcon.nativeElement.click();
		fixture.detectChanges();

		expect(dropdown.selectedOption).toEqual({ label: 'Select City', value: null });
		expect(items.children[2].nativeElement.className).not.toContain('ui-state-highlight')
	});

	it('should filtered', async(() => {
		dropdown.options = [
			{label: 'New York', code: 'NY'},
			{label: 'Rome', code: 'RM'},
			{label: 'London', code: 'LDN'},
			{label: 'Istanbul', code: 'IST'},
			{label: 'Paris', code: 'PRS'}
		];
		dropdown.filter = true;
		fixture.detectChanges();
		
		const container = fixture.debugElement.query(By.css('.ui-dropdown')).nativeElement;
		container.click();
		fixture.detectChanges();

		const filterDiv = fixture.debugElement.query(By.css('.ui-dropdown-filter-container'));
		expect(filterDiv).toBeTruthy();
		const filterInputEl = fixture.debugElement.query(By.css('.ui-dropdown-filter'));
		filterInputEl.nativeElement.value = "n";
		filterInputEl.nativeElement.dispatchEvent(new Event('keydown'));
		const event = {'target':{'value':'n'}};
		dropdown.onFilter(event)
		fixture.detectChanges();

		const items=fixture.debugElement.query(By.css('.ui-dropdown-items'));
		expect(items.nativeElement.children.length).toEqual(3);
	}));

	it('should filtered and display not found warning', async(() => {
		dropdown.options = [
			{label: 'New York', code: 'NY'},
			{label: 'Rome', code: 'RM'},
			{label: 'London', code: 'LDN'},
			{label: 'Istanbul', code: 'IST'},
			{label: 'Paris', code: 'PRS'}
		];
		dropdown.filter = true;
		fixture.detectChanges();
		
		const container = fixture.debugElement.query(By.css('.ui-dropdown')).nativeElement;
		container.click();
		fixture.detectChanges();

		const filterDiv = fixture.debugElement.query(By.css('.ui-dropdown-filter-container'));
		expect(filterDiv).toBeTruthy();
		const filterInputEl = fixture.debugElement.query(By.css('.ui-dropdown-filter'));
		filterInputEl.nativeElement.value = "primeng";
		filterInputEl.nativeElement.dispatchEvent(new Event('keydown'));
		const event = {'target':{'value':'primeng'}};
		dropdown.onFilter(event)
		fixture.detectChanges();

		const items = fixture.debugElement.query(By.css('.ui-dropdown-items'));
		const emptyMesage = items.children[0]; 
		expect(items.nativeElement.children.length).toEqual(1);
		expect(emptyMesage).toBeTruthy();
		expect(emptyMesage.nativeElement.textContent).toEqual("No results found");
	}));

	it('should open with down and altkey', () => {
		dropdown.options = [
			{name: 'New York', code: 'NY'},
			{name: 'Rome', code: 'RM'},
			{name: 'London', code: 'LDN'},
			{name: 'Istanbul', code: 'IST'},
			{name: 'Paris', code: 'PRS'}
		];
		dropdown.appendTo = 'body';
		fixture.detectChanges();
		
		const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
		const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.which = 40;
		keydownEvent.initEvent('keydown', true, true);
		keydownEvent.altKey = true;
		inputEl.dispatchEvent(new Event("focus"));
		inputEl.dispatchEvent(keydownEvent);
		inputEl.dispatchEvent(new Event("blur"));
		fixture.detectChanges();

		const dropdownPanel = fixture.debugElement.query(By.css('.ui-dropdown-panel'));
		expect(dropdownPanel).toBeTruthy();
		expect(dropdown.overlayVisible).toBeTruthy();
	});

	it('should open with space key and close with esc key', () => {
		dropdown.options = [
			{name: 'New York', code: 'NY'},
			{name: 'Rome', code: 'RM'},
			{name: 'London', code: 'LDN'},
			{name: 'Istanbul', code: 'IST'},
			{name: 'Paris', code: 'PRS'}
		];
		dropdown.appendTo = 'body';
		fixture.detectChanges();
		
		const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
		const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.which = 32;
		keydownEvent.initEvent('keydown', true, true);
		keydownEvent.altKey = true;
		inputEl.dispatchEvent(keydownEvent);
		fixture.detectChanges();

		const dropdownPanel = fixture.debugElement.query(By.css('.ui-dropdown-panel'));
		expect(dropdownPanel).toBeTruthy();
		expect(dropdown.overlayVisible).toBeTruthy();
		keydownEvent.which = 27;
		inputEl.dispatchEvent(keydownEvent);
		fixture.detectChanges();

		expect(dropdown.overlayVisible).toBeFalsy();
	});

	it('should select with down key', () => {
		dropdown.options = [
			{name: 'New York', code: 'NY'},
			{name: 'Rome', code: 'RM'},
			{name: 'London', code: 'LDN'},
			{name: 'Istanbul', code: 'IST'},
			{name: 'Paris', code: 'PRS'}
		];
		dropdown.appendTo = document.body;
		fixture.detectChanges();
		
		const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
		const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.which = 40;
		keydownEvent.initEvent('keydown', true, true);
		keydownEvent.altKey = true;
		inputEl.dispatchEvent(keydownEvent);
		fixture.detectChanges();

		keydownEvent.altKey = false;
		inputEl.dispatchEvent(keydownEvent);
		fixture.detectChanges();

		expect(dropdown.selectedOption.name).toEqual("Rome");
	});

	it('should select with enter key and close the overlay', () => {
		dropdown.options = [
			{name: 'New York', code: 'NY'},
			{name: 'Rome', code: 'RM'},
			{name: 'London', code: 'LDN'},
			{name: 'Istanbul', code: 'IST'},
			{name: 'Paris', code: 'PRS'}
		];
		dropdown.appendTo = document.body;
		fixture.detectChanges();
		
		const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
		const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.which = 40;
		keydownEvent.initEvent('keydown', true, true);
		keydownEvent.altKey = true;
		inputEl.dispatchEvent(keydownEvent);
		fixture.detectChanges();

		keydownEvent.which = 13;
		inputEl.dispatchEvent(keydownEvent);
		fixture.detectChanges();

		expect(dropdown.overlayVisible).toBeFalsy();
	});

	it('should select with up key', () => {
		dropdown.options = [
			{name: 'New York', code: 'NY'},
			{name: 'Rome', code: 'RM'},
			{name: 'London', code: 'LDN'},
			{name: 'Istanbul', code: 'IST'},
			{name: 'Paris', code: 'PRS'}
		];
		fixture.detectChanges();
		
		const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
		const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.which = 38 ;
		keydownEvent.initEvent('keydown', true, true);
		inputEl.dispatchEvent(keydownEvent);
		fixture.detectChanges();

		expect(dropdown.selectedOption.name).toEqual("Paris");
	});

	it('should select with filter', () => {
		dropdown.options = [
			{label: 'New York', value: 'NY'},
			{label: 'Rome', value: 'RM'},
			{label: 'London', value: 'LDN'},
			{label: 'Istanbul', value: 'IST'},
			{label: 'Paris', value: 'PRS'}
		];
		fixture.detectChanges();
		
		const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
		const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.which = 40;
        keydownEvent.altKey = true;
		keydownEvent.initEvent('keydown', true, true);
		inputEl.dispatchEvent(keydownEvent);
		fixture.detectChanges();

		keydownEvent.which = 76;
		keydownEvent.keyCode = 76;
		inputEl.dispatchEvent(keydownEvent);
		fixture.detectChanges();

		expect(dropdown.selectedOption.label).toEqual("London");
	});

	it('should groupSelect with down key', () => {
		groupFixture.detectChanges();
		

		const inputEl = groupFixture.debugElement.query(By.css('input')).nativeElement;
		const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.which = 40;
		keydownEvent.initEvent('keydown', true, true);
		inputEl.dispatchEvent(keydownEvent);
		groupFixture.detectChanges();

		expect(groupDropdown.selectedOption.label).toEqual("Audi");
		inputEl.dispatchEvent(keydownEvent);
		groupFixture.detectChanges();

		expect(groupDropdown.selectedOption.label).toEqual("BMW");
		inputEl.dispatchEvent(keydownEvent);
		inputEl.dispatchEvent(keydownEvent);
		groupFixture.detectChanges();

		expect(groupDropdown.selectedOption.label).toEqual("Cadillac");
	});

	it('should groupSelect with up key', () => {
		groupFixture.detectChanges();
		

		const inputEl = groupFixture.debugElement.query(By.css('input')).nativeElement;
		const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.which = 40;
		keydownEvent.initEvent('keydown', true, true);
		inputEl.dispatchEvent(keydownEvent);
		inputEl.dispatchEvent(keydownEvent);
		inputEl.dispatchEvent(keydownEvent);
		inputEl.dispatchEvent(keydownEvent);
		groupFixture.detectChanges();

		expect(groupDropdown.selectedOption.label).toEqual("Cadillac");
		keydownEvent.which = 38;
		inputEl.dispatchEvent(keydownEvent);
		groupFixture.detectChanges();

		expect(groupDropdown.selectedOption.label).toEqual("Mercedes");
		inputEl.dispatchEvent(keydownEvent);
		groupFixture.detectChanges();

		expect(groupDropdown.selectedOption.label).toEqual("BMW");
	});

	it('should groupSelect with filter', () => {
		groupFixture.detectChanges();
		

		const inputEl = groupFixture.debugElement.query(By.css('input')).nativeElement;
		const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.which = 40;
        keydownEvent.altKey = true;
		keydownEvent.initEvent('keydown', true, true);
		inputEl.dispatchEvent(keydownEvent);
		groupFixture.detectChanges();

		keydownEvent.which = 77;
		keydownEvent.keyCode = 77;
		keydownEvent.altKey = false;
		inputEl.dispatchEvent(keydownEvent);

		expect(groupDropdown.selectedOption.label).toEqual("Mercedes");
	});
});
