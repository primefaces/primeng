import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PickList } from './picklist';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, EventEmitter } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
	template: `<p-pickList [source]="sourceCars" [target]="targetCars">
    <ng-template let-car pTemplate="item">
        <div class="p-clearfix">
            <img src="assets/showcase/images/demo/car/{{car.brand}}.png" style="display:inline-block;margin:2px 0 2px 2px" width="48">
            <div style="font-size:14px;float:right;margin:15px 5px 0 0">{{car.brand}} - {{car.year}} - {{car.color}}</div>
        </div>
    </ng-template>
</p-pickList>`
})
class TestPickListComponent {
	sourceCars: any[];
	targetCars: any[];


	ngOnInit() {
		this.sourceCars = [
			{ "brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff" },
			{ "brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345" },
			{ "brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr" },
			{ "brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh" },
			{ "brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34" },
			{ "brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj" },
			{ "brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr" },
			{ "brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34" },
			{ "brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5" },
			{ "brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s" }
		];
		this.targetCars = [];
	}
}

describe('PickList', () => {

	let picklist: PickList;
	let fixture: ComponentFixture<TestPickListComponent>;
	let testComponent: TestPickListComponent;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NoopAnimationsModule
			],
			declarations: [
				PickList,
				Button,
				TestPickListComponent
			]
		});

		fixture = TestBed.createComponent(TestPickListComponent);
		testComponent = fixture.componentInstance;
		picklist = fixture.debugElement.children[0].componentInstance;
	});

	it('should created by default', () => {
		fixture.detectChanges();


		const picklistEl = fixture.debugElement.query(By.css('div'));
		const controlEls = fixture.debugElement.queryAll(By.css('.p-picklist-buttons'));
		expect(controlEls.length).toEqual(3);
		expect(picklistEl).toBeTruthy();
	});

	it('should change style and styleClass', () => {
		picklist.style = { 'height': '300px' };
		picklist.styleClass = "Primeng ROCKS!";
		fixture.detectChanges();

		const picklistEl = fixture.debugElement.query(By.css('div'));
		expect(picklistEl.nativeElement.className).toContain("Primeng ROCKS!");
		expect(picklistEl.nativeElement.style.height).toEqual("300px");
	});

	it('should show sourceHeader and targetHeader', () => {
		fixture.detectChanges();

		picklist.sourceHeader = "Primeng";
		picklist.targetHeader = "ROCKS!";
		fixture.detectChanges();

		picklist.cd.detectChanges();
		const headerEls = fixture.debugElement.queryAll(By.css('.p-picklist-header'));
		expect(headerEls).toBeTruthy();
		expect(headerEls.length).toEqual(2);
		expect(headerEls[0].nativeElement.textContent).toEqual("Primeng");
		expect(headerEls[1].nativeElement.textContent).toEqual("ROCKS!");
	});

	it('should show filter input', () => {
		picklist.filterBy = "brand";
		fixture.detectChanges();

		picklist.cd.detectChanges();
		const filterContainers = fixture.debugElement.queryAll(By.css('.p-picklist-filter-container'));
		expect(filterContainers.length).toEqual(2);
		expect(filterContainers[0]).toBeTruthy();
		expect(filterContainers[1]).toBeTruthy();
	});

	it('should filtered source', () => {
		picklist.filterBy = "brand";
		fixture.detectChanges();

		const sourceFilterEl = fixture.debugElement.query(By.css('input'));
		sourceFilterEl.nativeElement.value = "v";
		sourceFilterEl.nativeElement.dispatchEvent(new Event('keyup'));
		fixture.detectChanges();

		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		expect(picklist.visibleOptionsSource.length).toEqual(2);
		expect(picklist.visibleOptionsSource[0].brand).toEqual("VW");
		expect(picklist.visibleOptionsSource[1].brand).toEqual("Volvo");
		for (let i = 0; i < sourceListItems.length; i++) {
			if (i == 0 || i == 5)
				expect(sourceListItems[i].nativeElement.style.display).toEqual("block");
			else
				expect(sourceListItems[i].nativeElement.style.display).not.toEqual("block");
		}

	});

	it('should filtered target', () => {
		picklist.filterBy = "brand";
		fixture.detectChanges();

		picklist.cd.detectChanges();
		const controlAllRightButton = fixture.debugElement.query(By.css('.p-picklist-transfer-buttons')).queryAll(By.css('button'))[1];
		controlAllRightButton.nativeElement.click();
		fixture.detectChanges();

		const targetFilterEl = fixture.debugElement.queryAll(By.css('input'))[1];
		targetFilterEl.nativeElement.value = "v";
		targetFilterEl.nativeElement.dispatchEvent(new Event('keyup'));
		fixture.detectChanges();

		picklist.cd.detectChanges();
		const targetListItems = fixture.debugElement.query(By.css('.p-picklist-target-wrapper')).queryAll(By.css('.p-picklist-item'));
		expect(picklist.visibleOptionsTarget.length).toEqual(2);
		expect(picklist.visibleOptionsTarget[0].brand).toEqual("VW");
		expect(picklist.visibleOptionsTarget[1].brand).toEqual("Volvo");
		for (let i = 0; i < targetListItems.length; i++) {
			if (i == 0 || i == 5)
				expect(targetListItems[i].nativeElement.style.display).toEqual("block");
			else
				expect(targetListItems[i].nativeElement.style.display).not.toEqual("block");
		}

	});

	it('should use input placeholders', () => {
		picklist.filterBy = "brand";
		picklist.sourceFilterPlaceholder = "Primeng";
		picklist.targetFilterPlaceholder = "ROCKS!";
		fixture.detectChanges();

		picklist.cd.detectChanges();
		const headerEls = fixture.debugElement.queryAll(By.css('.p-picklist-filter'));
		expect(headerEls.length).toEqual(2);
		expect(headerEls[0].query(By.css('input')).nativeElement.placeholder).toEqual("Primeng");
		expect(headerEls[1].query(By.css('input')).nativeElement.placeholder).toEqual("ROCKS!");
	});

	it('should not show filter input', () => {
		picklist.showSourceFilter = false;
		picklist.showTargetFilter = false;
		fixture.detectChanges();

		const headerEls = fixture.debugElement.queryAll(By.css('.p-picklist-filter-container'));
		const inputEls = fixture.debugElement.query(By.css('.p-picklist-filter'));
		expect(headerEls.length).toEqual(0);
		expect(headerEls).toEqual([]);
		expect(inputEls).toBeFalsy();
	});


	it('should show items', () => {
		picklist.dragdrop = true;
		fixture.detectChanges();

		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-droppoint'));
		const targetListItems = fixture.debugElement.query(By.css('.p-picklist-target-wrapper')).queryAll(By.css('.p-picklist-droppoint'));

		expect(sourceListItems.length).toEqual(11);
		expect(targetListItems.length).toEqual(0);
	});

	it('should change sourceStyle and targetStyle', () => {
		picklist.sourceStyle = { 'height': '300px' };
		picklist.targetStyle = { 'height': '300px' };
		fixture.detectChanges();

		picklist.cd.detectChanges();
		const headerEls = fixture.debugElement.queryAll(By.css('.p-picklist-list'));
		expect(headerEls[0].nativeElement.style.height).toContain("300px");
		expect(headerEls[1].nativeElement.style.height).toContain("300px");
	});

	it('should not show controls', () => {
		picklist.showSourceControls = false;
		picklist.showTargetControls = false;
		fixture.detectChanges();

		const sourceControlsEl = fixture.debugElement.query(By.css('.p-picklist-source-controls'));
		const targetControlsEl = fixture.debugElement.query(By.css('.p-picklist-target-controls'));
		expect(sourceControlsEl).toBeFalsy();
		expect(targetControlsEl).toBeFalsy();
	});

	it('should disabled', () => {
		picklist.disabled = true;
		picklist.filterBy = "brand";
		fixture.detectChanges();

		const buttonsEls = fixture.debugElement.queryAll(By.css('button'));
		const inputEls = fixture.debugElement.queryAll(By.css('input'));
		const itemEls = fixture.debugElement.queryAll(By.css('li'));
		for (let button of buttonsEls) {
			expect(button.nativeElement.disabled).toEqual(true);
		}
		for (let input of inputEls) {
			expect(input.nativeElement.disabled).toEqual(true);
		}
		for (let item of itemEls) {
			expect(item.nativeElement.className).toContain("p-disabled");
		}
	});

	it('should select item', () => {
		fixture.detectChanges();

		const onItemClickSpy = spyOn(picklist, 'onItemClick').and.callThrough();
		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		sourceListItems[0].nativeElement.click();
		fixture.detectChanges();

		expect(onItemClickSpy).toHaveBeenCalled();
		expect(sourceListItems[0].nativeElement.className).toContain("p-highlight");
		expect(picklist.selectedItemsSource.length).toEqual(1);
		expect(picklist.selectedItemsSource[0].brand).toEqual("VW");
	});

	it('should not select item', () => {
		picklist.disabled = true;
		fixture.detectChanges();

		const onItemClickSpy = spyOn(picklist, 'onItemClick').and.callThrough();
		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		sourceListItems[0].nativeElement.click();
		fixture.detectChanges();

		expect(onItemClickSpy).toHaveBeenCalled();
		expect(sourceListItems[0].nativeElement.className).not.toContain("p-highlight");
		expect(picklist.selectedItemsSource.length).toEqual(0);
		expect(picklist.selectedItemsSource[0]).toBeUndefined();
	});

	it('should unselect item', () => {
		fixture.detectChanges();

		const onItemClickSpy = spyOn(picklist, 'onItemClick').and.callThrough();
		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		sourceListItems[0].nativeElement.click();
		fixture.detectChanges();

		let event = { 'ctrlKey': true };
		let callback = new EventEmitter();
		picklist.onItemClick(event, picklist.source[0], picklist.selectedItemsSource, callback);
		fixture.detectChanges();

		picklist.cd.detectChanges();
		expect(onItemClickSpy).toHaveBeenCalled();
		expect(sourceListItems[0].nativeElement.className).not.toContain("p-highlight");
		expect(picklist.selectedItemsSource.length).toEqual(0);
	});

	it('should select item without metakey', () => {
		picklist.metaKeySelection = false;
		fixture.detectChanges();

		const onItemClickSpy = spyOn(picklist, 'onItemClick').and.callThrough();
		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		sourceListItems[0].nativeElement.click();
		fixture.detectChanges();

		expect(onItemClickSpy).toHaveBeenCalled();
		expect(sourceListItems[0].nativeElement.className).toContain("p-highlight");
		expect(picklist.selectedItemsSource.length).toEqual(1);
		expect(picklist.selectedItemsSource[0].brand).toEqual("VW");
	});

	it('should unselect item without metakey', () => {
		picklist.metaKeySelection = false;
		fixture.detectChanges();

		const onItemClickSpy = spyOn(picklist, 'onItemClick').and.callThrough();
		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		sourceListItems[0].nativeElement.click();
		fixture.detectChanges();

		sourceListItems[0].nativeElement.click();
		fixture.detectChanges();

		expect(onItemClickSpy).toHaveBeenCalled();
		expect(sourceListItems[0].nativeElement.className).not.toContain("p-highlight");
		expect(picklist.selectedItemsSource.length).toEqual(0);
	});

	it('should call moveUp', () => {
		fixture.detectChanges();

		const moveUpSpy = spyOn(picklist, 'moveUp').and.callThrough();
		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		const sourceControlUpButton = fixture.debugElement.query(By.css('.p-picklist-source-controls')).queryAll(By.css('button'))[0];
		sourceListItems[3].nativeElement.click();
		fixture.detectChanges();

		sourceControlUpButton.nativeElement.click();
		fixture.detectChanges();

		const sourceListItemsAfterChange = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		expect(moveUpSpy).toHaveBeenCalled();
		expect(sourceListItemsAfterChange[2].nativeElement.className).toContain("p-highlight");
		expect(sourceListItemsAfterChange[2].context.$implicit.brand).toEqual("BMW");
		expect(sourceListItemsAfterChange[3].context.$implicit.brand).toEqual("Renault");
	});

	it('should call moveUp and do nothing', () => {
		fixture.detectChanges();

		const moveUpSpy = spyOn(picklist, 'moveUp').and.callThrough();
		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		const sourceControlUpButton = fixture.debugElement.query(By.css('.p-picklist-source-controls')).queryAll(By.css('button'))[0];
		sourceListItems[0].nativeElement.click();
		fixture.detectChanges();

		sourceControlUpButton.nativeElement.click();
		fixture.detectChanges();

		expect(moveUpSpy).toHaveBeenCalled();
		let callback = new EventEmitter();
		expect(picklist.moveBottom(picklist.source[0], picklist.source, picklist.selectedItemsSource, callback)).toBeUndefined();
	});

	it('should call moveDown', () => {
		fixture.detectChanges();

		const moveDownSpy = spyOn(picklist, 'moveDown').and.callThrough();
		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		const sourceControlDownButton = fixture.debugElement.query(By.css('.p-picklist-source-controls')).queryAll(By.css('button'))[2];
		sourceListItems[3].nativeElement.click();
		fixture.detectChanges();

		sourceControlDownButton.nativeElement.click();
		fixture.detectChanges();

		const sourceListItemsAfterChange = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		expect(moveDownSpy).toHaveBeenCalled();
		expect(sourceListItemsAfterChange[4].nativeElement.className).toContain("p-highlight");
		expect(sourceListItemsAfterChange[4].context.$implicit.brand).toEqual("BMW");
		expect(sourceListItemsAfterChange[3].context.$implicit.brand).toEqual("Mercedes");
	});

	it('should call moveDown and do nothing', () => {
		fixture.detectChanges();

		const moveDownSpy = spyOn(picklist, 'moveDown').and.callThrough();
		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		const sourceControlDownButton = fixture.debugElement.query(By.css('.p-picklist-source-controls')).queryAll(By.css('button'))[2];
		sourceListItems[9].nativeElement.click();
		fixture.detectChanges();

		sourceControlDownButton.nativeElement.click();
		fixture.detectChanges();

		expect(moveDownSpy).toHaveBeenCalled();
		let callback = new EventEmitter();
		expect(picklist.moveDown(picklist.source[9], picklist.source, picklist.selectedItemsSource, callback)).toBeUndefined();
	});

	it('should call movetop', () => {
		fixture.detectChanges();

		const moveTopSpy = spyOn(picklist, 'moveTop').and.callThrough();
		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		const sourceControlTopButton = fixture.debugElement.query(By.css('.p-picklist-source-controls')).queryAll(By.css('button'))[1];
		sourceListItems[3].nativeElement.click();
		fixture.detectChanges();

		sourceControlTopButton.nativeElement.click();
		fixture.detectChanges();

		const sourceListItemsAfterChange = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		expect(moveTopSpy).toHaveBeenCalled();
		expect(sourceListItemsAfterChange[0].nativeElement.className).toContain("p-highlight");
		expect(sourceListItemsAfterChange[0].context.$implicit.brand).toEqual("BMW");
		expect(sourceListItemsAfterChange[3].context.$implicit.brand).toEqual("Renault");
	});

	it('should call movetop and do nothing', () => {
		fixture.detectChanges();

		const moveTopSpy = spyOn(picklist, 'moveTop').and.callThrough();
		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		const sourceControlTopButton = fixture.debugElement.query(By.css('.p-picklist-source-controls')).queryAll(By.css('button'))[1];
		sourceListItems[0].nativeElement.click();
		fixture.detectChanges();

		sourceControlTopButton.nativeElement.click();
		fixture.detectChanges();

		expect(moveTopSpy).toHaveBeenCalled();
		let callback = new EventEmitter();
		expect(picklist.moveTop(picklist.source[0], picklist.source, picklist.selectedItemsSource, callback)).toBeUndefined();
	});

	it('should call moveBottom', () => {
		fixture.detectChanges();

		const moveBottomSpy = spyOn(picklist, 'moveBottom').and.callThrough();
		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		const sourceControlBottomButton = fixture.debugElement.query(By.css('.p-picklist-source-controls')).queryAll(By.css('button'))[3];
		sourceListItems[3].nativeElement.click();
		fixture.detectChanges();

		sourceControlBottomButton.nativeElement.click();
		fixture.detectChanges();

		const sourceListItemsAfterChange = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		expect(moveBottomSpy).toHaveBeenCalled();
		expect(sourceListItemsAfterChange[9].nativeElement.className).toContain("p-highlight");
		expect(sourceListItemsAfterChange[9].context.$implicit.brand).toEqual("BMW");
		expect(sourceListItemsAfterChange[3].context.$implicit.brand).toEqual("Mercedes");
	});

	it('should call moveBottom and do nothing', () => {
		fixture.detectChanges();

		const moveBottomSpy = spyOn(picklist, 'moveBottom').and.callThrough();
		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		const sourceControlBottomButton = fixture.debugElement.query(By.css('.p-picklist-source-controls')).queryAll(By.css('button'))[3];
		sourceListItems[9].nativeElement.click();
		fixture.detectChanges();

		sourceControlBottomButton.nativeElement.click();
		fixture.detectChanges();

		expect(moveBottomSpy).toHaveBeenCalled();
		let callback = new EventEmitter();
		expect(picklist.moveBottom(picklist.source[9], picklist.source, picklist.selectedItemsSource, callback)).toBeUndefined();
	});

	it('should call moveRight', () => {
		fixture.detectChanges();

		const moveRightSpy = spyOn(picklist, 'moveRight').and.callThrough();
		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		const controlRightButton = fixture.debugElement.query(By.css('.p-picklist-transfer-buttons')).queryAll(By.css('button'))[0];
		sourceListItems[3].nativeElement.click();
		fixture.detectChanges();

		controlRightButton.nativeElement.click();
		fixture.detectChanges();

		const sourceListItemsAfterChange = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		const targetListItemsAfterChange = fixture.debugElement.query(By.css('.p-picklist-target-wrapper')).queryAll(By.css('.p-picklist-item'));
		expect(moveRightSpy).toHaveBeenCalled();
		expect(sourceListItemsAfterChange[3].context.$implicit.brand).toEqual("Mercedes");
		expect(targetListItemsAfterChange[0].context.$implicit.brand).toEqual("BMW");
		expect(targetListItemsAfterChange.length).toEqual(1);
		expect(picklist.target.length).toEqual(1);
		expect(picklist.target[0].brand).toEqual("BMW");
	});

	it('should call moveLeft', () => {
		fixture.detectChanges();

		const moveLeftSpy = spyOn(picklist, 'moveLeft').and.callThrough();
		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		const controlRightButton = fixture.debugElement.query(By.css('.p-picklist-transfer-buttons')).queryAll(By.css('button'))[0];
		const controlLeftButton = fixture.debugElement.query(By.css('.p-picklist-transfer-buttons')).queryAll(By.css('button'))[2];
		sourceListItems[3].nativeElement.click();
		fixture.detectChanges();

		controlRightButton.nativeElement.click();
		fixture.detectChanges();

		const targetListItems = fixture.debugElement.query(By.css('.p-picklist-target-wrapper')).queryAll(By.css('.p-picklist-item'));
		targetListItems[0].nativeElement.click();
		fixture.detectChanges();

		controlLeftButton.nativeElement.click();
		fixture.detectChanges();

		const sourceListItemsAfterChange = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		const targetListItemsAfterChange = fixture.debugElement.query(By.css('.p-picklist-target-wrapper')).queryAll(By.css('.p-picklist-item'));
		expect(moveLeftSpy).toHaveBeenCalled();
		expect(targetListItemsAfterChange.length).toEqual(0);
		expect(picklist.target.length).toEqual(0);
		expect(picklist.source.length).toEqual(10);
		expect(sourceListItemsAfterChange[9].context.$implicit.brand).toEqual("BMW");
	});

	it('should call moveAllRight', () => {
		fixture.detectChanges();

		const moveAllRightSpy = spyOn(picklist, 'moveAllRight').and.callThrough();
		const controlAllRightButton = fixture.debugElement.query(By.css('.p-picklist-transfer-buttons')).queryAll(By.css('button'))[1];
		fixture.detectChanges();

		controlAllRightButton.nativeElement.click();
		fixture.detectChanges();

		const sourceListItemsAfterChange = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		const targetListItemsAfterChange = fixture.debugElement.query(By.css('.p-picklist-target-wrapper')).queryAll(By.css('.p-picklist-item'));
		expect(moveAllRightSpy).toHaveBeenCalled();
		expect(sourceListItemsAfterChange.length).toEqual(0);
		expect(targetListItemsAfterChange.length).toEqual(10);
		expect(picklist.target.length).toEqual(10);
		expect(picklist.source.length).toEqual(0);
	});

	it('should call moveAllLeft', () => {
		fixture.detectChanges();

		const moveAllLeftSpy = spyOn(picklist, 'moveAllLeft').and.callThrough();
		const controlAllRightButton = fixture.debugElement.query(By.css('.p-picklist-transfer-buttons')).queryAll(By.css('button'))[1];
		const controlAllLeftButton = fixture.debugElement.query(By.css('.p-picklist-transfer-buttons')).queryAll(By.css('button'))[3];
		fixture.detectChanges();

		controlAllRightButton.nativeElement.click();
		fixture.detectChanges();

		controlAllLeftButton.nativeElement.click();
		fixture.detectChanges();

		const sourceListItemsAfterChange = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		const targetListItemsAfterChange = fixture.debugElement.query(By.css('.p-picklist-target-wrapper')).queryAll(By.css('.p-picklist-item'));
		expect(moveAllLeftSpy).toHaveBeenCalled();
		expect(targetListItemsAfterChange.length).toEqual(0);
		expect(sourceListItemsAfterChange.length).toEqual(10);
		expect(picklist.source.length).toEqual(10);
		expect(picklist.target.length).toEqual(0);
	});

	it('should listen onSourceSelect', () => {
		fixture.detectChanges();

		let data;
		picklist.onSourceSelect.subscribe(value => data = value)
		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		sourceListItems[0].nativeElement.click();
		fixture.detectChanges();

		expect(data).toBeTruthy();
		expect(data.items[0].brand).toEqual("VW");
	});

	it('should listen onTargetSelect', () => {
		fixture.detectChanges();

		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		const controlRightButton = fixture.debugElement.query(By.css('.p-picklist-transfer-buttons')).queryAll(By.css('button'))[0];
		sourceListItems[0].nativeElement.click();
		fixture.detectChanges();

		controlRightButton.nativeElement.click();
		fixture.detectChanges();

		let data;
		picklist.onTargetSelect.subscribe(value => data = value)
		const targetListItems = fixture.debugElement.query(By.css('.p-picklist-target-wrapper')).queryAll(By.css('.p-picklist-item'));
		targetListItems[0].nativeElement.click();
		fixture.detectChanges();

		expect(data).toBeTruthy();
		expect(data.items[0].brand).toEqual("VW");
	});

	it('should listen onSourceReorder', () => {
		fixture.detectChanges();

		let data;
		picklist.onSourceReorder.subscribe(value => data = value);
		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		const sourceControlUpButton = fixture.debugElement.query(By.css('.p-picklist-source-controls')).queryAll(By.css('button'))[0];
		sourceListItems[3].nativeElement.click();
		fixture.detectChanges();

		sourceControlUpButton.nativeElement.click();
		fixture.detectChanges();

		expect(data).toBeTruthy();
		expect(data.items[0].brand).toEqual("BMW");
	});

	it('should listen onTargetReorder', () => {
		fixture.detectChanges();

		const controlAllRightButton = fixture.debugElement.query(By.css('.p-picklist-transfer-buttons')).queryAll(By.css('button'))[1];
		controlAllRightButton.nativeElement.click();
		fixture.detectChanges();

		let data;
		picklist.onTargetReorder.subscribe(value => data = value);
		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-target-wrapper')).queryAll(By.css('.p-picklist-item'));
		const sourceControlUpButton = fixture.debugElement.query(By.css('.p-picklist-target-controls')).queryAll(By.css('button'))[0];
		sourceListItems[3].nativeElement.click();
		fixture.detectChanges();

		sourceControlUpButton.nativeElement.click();
		fixture.detectChanges();

		expect(data).toBeTruthy();
		expect(data.items[0].brand).toEqual("BMW");
	});

	it('should listen onMoveToTarget', () => {
		fixture.detectChanges();

		let data;
		picklist.onMoveToTarget.subscribe(value => data = value);
		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		const controlRightButton = fixture.debugElement.query(By.css('.p-picklist-transfer-buttons')).queryAll(By.css('button'))[0];
		sourceListItems[3].nativeElement.click();
		fixture.detectChanges();

		controlRightButton.nativeElement.click();
		fixture.detectChanges();

		expect(data).toBeTruthy();
		expect(data.items[0].brand).toEqual("BMW");
	});

	it('should listen onMoveToSource', () => {
		fixture.detectChanges();

		let data;
		picklist.onMoveToTarget.subscribe(value => data = value);
		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		const controlRightButton = fixture.debugElement.query(By.css('.p-picklist-transfer-buttons')).queryAll(By.css('button'))[0];
		const controlLeftButton = fixture.debugElement.query(By.css('.p-picklist-transfer-buttons')).queryAll(By.css('button'))[2];
		sourceListItems[3].nativeElement.click();
		fixture.detectChanges();

		controlRightButton.nativeElement.click();
		fixture.detectChanges();

		const targetListItems = fixture.debugElement.query(By.css('.p-picklist-target-wrapper')).queryAll(By.css('.p-picklist-item'));
		targetListItems[0].nativeElement.click();
		fixture.detectChanges();

		controlLeftButton.nativeElement.click();
		fixture.detectChanges();

		expect(data).toBeTruthy();
		expect(data.items[0].brand).toEqual("BMW");
	});

	it('should listen onMoveAllToTarget', () => {
		fixture.detectChanges();

		let data;
		picklist.onMoveAllToTarget.subscribe(value => data = value);
		const controlAllRightButton = fixture.debugElement.query(By.css('.p-picklist-transfer-buttons')).queryAll(By.css('button'))[1];
		fixture.detectChanges();

		controlAllRightButton.nativeElement.click();
		fixture.detectChanges();


		expect(data).toBeTruthy();
		expect(data.items.length).toEqual(10);
	});

	it('should listen onMoveAllToSource', () => {
		fixture.detectChanges();

		let data;
		picklist.onMoveAllToSource.subscribe(value => data = value);
		const controlAllRightButton = fixture.debugElement.query(By.css('.p-picklist-transfer-buttons')).queryAll(By.css('button'))[1];
		const controlAllLeftButton = fixture.debugElement.query(By.css('.p-picklist-transfer-buttons')).queryAll(By.css('button'))[3];
		fixture.detectChanges();

		controlAllRightButton.nativeElement.click();
		fixture.detectChanges();

		controlAllLeftButton.nativeElement.click();
		fixture.detectChanges();

		expect(data).toBeTruthy();
		expect(data.items.length).toEqual(10);
	});

	it('should send item to right and after send item to left', () => {
		fixture.detectChanges();

		const onSourceItemDblClickSpy = spyOn(picklist, 'onSourceItemDblClick').and.callThrough();
		const onTargetItemDblClickSpy = spyOn(picklist, 'onTargetItemDblClick').and.callThrough();
		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		sourceListItems[0].nativeElement.click();
		sourceListItems[0].nativeElement.dispatchEvent(new Event('dblclick'));
		fixture.detectChanges();

		const targetListItems = fixture.debugElement.query(By.css('.p-picklist-target-wrapper')).queryAll(By.css('.p-picklist-item'));
		expect(picklist.target.length).toEqual(1);
		expect(picklist.source.length).toEqual(9);
		targetListItems[0].nativeElement.click();
		targetListItems[0].nativeElement.dispatchEvent(new Event('dblclick'));
		fixture.detectChanges();

		expect(picklist.target.length).toEqual(0);
		expect(picklist.source.length).toEqual(10);
		expect(onSourceItemDblClickSpy).toHaveBeenCalled();
		expect(onTargetItemDblClickSpy).toHaveBeenCalled();
	});

	it('should not send item to right', () => {
		picklist.disabled = true;
		fixture.detectChanges();

		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		sourceListItems[0].nativeElement.click();
		sourceListItems[0].nativeElement.dispatchEvent(new Event('dblclick'));
		fixture.detectChanges();

		expect(picklist.target.length).toEqual(0);
		expect(picklist.source.length).toEqual(10);
	});

	it('should not send item to left', () => {
		fixture.detectChanges();

		const onItemTouchEndSpy = spyOn(picklist, 'onItemTouchEnd').and.callThrough();
		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		sourceListItems[0].nativeElement.click();
		sourceListItems[0].nativeElement.dispatchEvent(new Event('dblclick'));
		fixture.detectChanges();

		picklist.disabled = true;
		fixture.detectChanges();

		const targetListItems = fixture.debugElement.query(By.css('.p-picklist-target-wrapper')).queryAll(By.css('.p-picklist-item'));
		targetListItems[0].nativeElement.click();
		targetListItems[0].nativeElement.dispatchEvent(new Event('dblclick'));
		fixture.detectChanges();

		expect(picklist.target.length).toEqual(1);
		expect(picklist.source.length).toEqual(9);
	});

	it('should call onItemTouchEnd', () => {
		fixture.detectChanges();

		const onItemTouchEndSpy = spyOn(picklist, 'onItemTouchEnd').and.callThrough();
		const sourceListItems = fixture.debugElement.query(By.css('.p-picklist-source-wrapper')).queryAll(By.css('.p-picklist-item'));
		sourceListItems[0].nativeElement.dispatchEvent(new Event('touchend'));
		fixture.detectChanges();

		expect(picklist.itemTouched).toEqual(true);
		expect(onItemTouchEndSpy).toHaveBeenCalled();
		picklist.disabled = true;
		picklist.itemTouched = false;
		fixture.detectChanges();

		sourceListItems[0].nativeElement.dispatchEvent(new Event('touchend'));
		expect(picklist.itemTouched).toEqual(false);
		expect(onItemTouchEndSpy).toHaveBeenCalled();
	});

	it('should move items(source) with dragging with reorder', () => {
		fixture.detectChanges();

		let dragEvent = new DragEvent('drag');
		picklist.dragging = true;
		picklist.fromListType = -1;
		fixture.detectChanges();

		picklist.onDragOver(dragEvent, 0, -1);
		picklist.onDrop(dragEvent, 2, -1);
		picklist.onDragEnd(dragEvent);
		fixture.detectChanges();

		expect(picklist.source[0].brand).toEqual("Audi");
		expect(picklist.source[1].brand).toEqual("VW");
	});

	it('should move items(target) with dragging', () => {
		fixture.detectChanges();

		const controlAllRightButton = fixture.debugElement.query(By.css('.p-picklist-transfer-buttons')).queryAll(By.css('button'))[1];
		controlAllRightButton.nativeElement.click();
		fixture.detectChanges();

		let dragEvent = new DragEvent('drag');
		picklist.dragging = true;
		picklist.fromListType = 1;
		fixture.detectChanges();

		picklist.onDragOver(dragEvent, 0, 1);
		picklist.onDrop(dragEvent, 2, 1);
		picklist.onDragEnd(dragEvent);
		fixture.detectChanges();

		expect(picklist.target[0].brand).toEqual("Audi");
		expect(picklist.target[1].brand).toEqual("VW");
	});

	it('should move item to right with dragging', () => {
		fixture.detectChanges();

		let dragEvent = new DragEvent('drag');
		picklist.dragging = true;
		picklist.fromListType = -1;
		fixture.detectChanges();

		picklist.onDragOver(dragEvent, 0, -1);
		picklist.onDragLeave(dragEvent, 1);
		picklist.onListDrop(dragEvent, 1);
		picklist.onDragEnd(dragEvent);
		fixture.detectChanges();

		expect(picklist.source.length).toEqual(9);
		expect(picklist.target.length).toEqual(1);
		expect(picklist.target[0].brand).toEqual("VW");
	});

	it('should move item to left with dragging', () => {
		fixture.detectChanges();

		const controlAllRightButton = fixture.debugElement.query(By.css('.p-picklist-transfer-buttons')).queryAll(By.css('button'))[1];
		controlAllRightButton.nativeElement.click();
		fixture.detectChanges();

		let dragEvent = new DragEvent('drag');
		picklist.dragging = true;
		picklist.fromListType = 1;
		fixture.detectChanges();

		picklist.onDragOver(dragEvent, 0, 1);
		picklist.onDragLeave(dragEvent, -1);
		picklist.onListDrop(dragEvent, -1);
		picklist.onDragEnd(dragEvent);
		fixture.detectChanges();

		expect(picklist.target.length).toEqual(9);
		expect(picklist.source.length).toEqual(1);
		expect(picklist.source[0].brand).toEqual("VW");
	});

	it('should change focused item with up and down arrows', () => {
		fixture.detectChanges();

		let items = fixture.debugElement.queryAll(By.css(".p-picklist-item"));
		items[0].nativeElement.click();
		fixture.detectChanges();

		expect(picklist.selectedItemsSource.length).toEqual(1);
		expect(picklist.selectedItemsSource[0].brand).toBe("VW");
		const keydownEvent: any = document.createEvent('CustomEvent');
        keydownEvent.which = 40;
		keydownEvent.initEvent('keydown', true, true);
		items[0].nativeElement.dispatchEvent(keydownEvent);
		fixture.detectChanges();

		expect(document.activeElement).toEqual(items[1].nativeElement);
		keydownEvent.which = 38;
		items[1].nativeElement.dispatchEvent(keydownEvent);
		fixture.detectChanges();

		expect(document.activeElement).toEqual(items[0].nativeElement);
		keydownEvent.which = 13;
		items[1].nativeElement.dispatchEvent(keydownEvent);
		fixture.detectChanges();

		expect(picklist.selectedItemsSource[0].brand).toBe("Audi");
	});
});
