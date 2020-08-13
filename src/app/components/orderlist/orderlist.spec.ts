import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OrderList } from './orderlist';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Button } from 'primeng/button';
import { Component } from '@angular/core';

@Component({
	template: `<p-orderList [value]="cars">
  <ng-template let-car pTemplate="item">
      <div>
          <img src="assets/showcase/images/demo/car/{{car.brand}}.png" style="display:inline-block;margin:2px 0 2px 2px" width="48">
          <div style="font-size:14px;float:right;margin:15px 5px 0 0">{{car.brand}} - {{car.year}} - {{car.color}}</div>
      </div>
  </ng-template>
</p-orderList>`
})
class TestOrderListComponent {
	cars: any[];


	ngOnInit() {
		this.cars = [
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
	}
}

describe('OrderList', () => {

	let orderlist: OrderList;
	let fixture: ComponentFixture<TestOrderListComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NoopAnimationsModule,
			],
			declarations: [
				OrderList,
				Button,
				TestOrderListComponent
			],
		});

		fixture = TestBed.createComponent(TestOrderListComponent);
		orderlist = fixture.debugElement.children[0].componentInstance;
	});

	it('should created by default', () => {
		fixture.detectChanges();

		const orderListEl = fixture.debugElement.query(By.css('div'));
		const controlEls = fixture.debugElement.query(By.css('.p-orderlist-controls'));
		const containerEl = fixture.debugElement.query(By.css('.p-orderlist-list-container'));
		expect(controlEls).toBeTruthy();
		expect(orderListEl).toBeTruthy();
		expect(containerEl).toBeTruthy();
	});

	it('should change listStyle', () => {
		orderlist.listStyle = { 'height': '300px' };
		fixture.detectChanges();

		const contentEl = fixture.debugElement.query(By.css('ul'));
		expect(contentEl.nativeElement.style.height).toEqual("300px");
	});

	it('should change header', () => {
		orderlist.header = "Primeng ROCKS!";
		fixture.detectChanges();

		const headerEl = fixture.debugElement.query(By.css('.p-orderlist-header'));
		expect(headerEl).toBeTruthy();
		expect(headerEl.nativeElement.textContent).toEqual("Primeng ROCKS!");
	});

	it('should show filter input', () => {
		orderlist.filterBy = "brand";
		orderlist.filterPlaceholder = "Primeng ROCKS!";
		fixture.detectChanges();

		const filterInputEl = fixture.debugElement.query(By.css('.p-inputtext'));
		expect(filterInputEl).toBeTruthy();
		expect(filterInputEl.nativeElement.placeholder).toEqual("Primeng ROCKS!");
	});

	it('should add droppoints when dragdrop is enabled', () => {
		orderlist.dragdrop = true;
		fixture.detectChanges();

		const dragdropEl = fixture.debugElement.query(By.css('.p-orderlist-droppoint'));

		expect(dragdropEl).toBeTruthy();
	});

	it('should show items', () => {
		fixture.detectChanges();

		const itemListEl = fixture.debugElement.query(By.css('ul'));

		expect(itemListEl).toBeTruthy();
		expect(orderlist.itemTouched).toEqual(undefined);
		expect(itemListEl.children.length).toEqual(10);
	});

	it('should have selections by default', () => {
		orderlist.selection = [{ "brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh" }];
		fixture.detectChanges();

		const itemListEl = fixture.debugElement.query(By.css('ul'));
		const bmwEl = itemListEl.queryAll(By.css('.p-orderlist-item'))[3];
		fixture.detectChanges();

		expect(orderlist.selection.length).toEqual(1);
		expect(orderlist.selection[0].brand).toEqual("BMW");
	});

	it('should call onItem click and select a item', () => {
		const onItemClickSpy = spyOn(orderlist, 'onItemClick').and.callThrough();
		const onItemTouchEndSpy = spyOn(orderlist, 'onItemTouchEnd').and.callThrough();
		fixture.detectChanges();

		const itemListEl = fixture.debugElement.query(By.css('ul'));
		const bmwEl = itemListEl.queryAll(By.css('.p-orderlist-item'))[3];
		bmwEl.nativeElement.dispatchEvent(new Event('touchend'));
		fixture.detectChanges();
		expect(orderlist.itemTouched).toEqual(true);

		bmwEl.nativeElement.click();
		fixture.detectChanges();

		expect(onItemClickSpy).toHaveBeenCalled();
		expect(onItemTouchEndSpy).toHaveBeenCalled();
		expect(orderlist.itemTouched).toEqual(false);
		expect(orderlist.selection.length).toEqual(1);
		expect(orderlist.selection[0].brand).toEqual("BMW");
		expect(bmwEl.nativeElement.className).toContain('p-highlight');
	});

	it('should call onItem click and unselect a item', () => {
		const onItemClickSpy = spyOn(orderlist, 'onItemClick').and.callThrough();
		fixture.detectChanges();

		const itemListEl = fixture.debugElement.query(By.css('ul'));
		const bmwEl = itemListEl.queryAll(By.css('.p-orderlist-item'))[3];
		bmwEl.nativeElement.click();
		fixture.detectChanges();

		const ctrlClickEvent = { 'ctrlKey': true };
		orderlist.onItemClick(ctrlClickEvent, orderlist.selection[0], 3);
		fixture.detectChanges();

		orderlist.cd.detectChanges();
		expect(onItemClickSpy).toHaveBeenCalledTimes(2);
		expect(orderlist.selection.length).toEqual(0);
		expect(bmwEl.nativeElement.className).not.toContain('p-highlight');
	});

	it('should call onItem click and select a item with metaKeySelection false', () => {
		orderlist.metaKeySelection = false;
		const onItemClickSpy = spyOn(orderlist, 'onItemClick').and.callThrough();
		fixture.detectChanges();

		const itemListEl = fixture.debugElement.query(By.css('ul'));
		const bmwEl = itemListEl.queryAll(By.css('.p-orderlist-item'))[3];
		bmwEl.nativeElement.click();
		fixture.detectChanges();

		expect(onItemClickSpy).toHaveBeenCalled();
		expect(orderlist.selection.length).toEqual(1);
		expect(orderlist.selection[0].brand).toEqual("BMW");
		expect(bmwEl.nativeElement.className).toContain('p-highlight');
	});

	it('should call onItem click and unselect a item with metaKeySelection', () => {
		orderlist.metaKeySelection = false;
		const onItemClickSpy = spyOn(orderlist, 'onItemClick').and.callThrough();
		fixture.detectChanges();

		const itemListEl = fixture.debugElement.query(By.css('ul'));
		const bmwEl = itemListEl.queryAll(By.css('.p-orderlist-item'))[3];
		bmwEl.nativeElement.click();
		fixture.detectChanges();

		const ctrlClickEvent = { 'ctrlKey': true };
		orderlist.onItemClick(ctrlClickEvent, orderlist.selection[0], 3);
		fixture.detectChanges();

		orderlist.cd.detectChanges();
		expect(onItemClickSpy).toHaveBeenCalledTimes(2);
		expect(orderlist.selection.length).toEqual(0);
		expect(bmwEl.nativeElement.className).not.toContain('p-highlight');
	});

	it('should call moveUp', () => {
		const moveUpSpy = spyOn(orderlist, 'moveUp').and.callThrough();
		fixture.detectChanges();

		const itemListEl = fixture.debugElement.query(By.css('ul'));
		const bmwEl = itemListEl.queryAll(By.css('.p-orderlist-item'))[3];
		const buttonsEl = fixture.debugElement.queryAll(By.css('button'));
		const moveUpButtonEl = buttonsEl[0];
		bmwEl.nativeElement.click();
		moveUpButtonEl.nativeElement.click();
		fixture.detectChanges();

		expect(moveUpSpy).toHaveBeenCalled();
		expect(orderlist.selection.length).toEqual(1);
		expect(orderlist.selection[0].brand).toEqual("BMW");
		expect(bmwEl.nativeElement.className).toContain('p-highlight');
		expect(itemListEl.queryAll(By.css('.p-orderlist-item'))[3].context.$implicit.brand).toEqual("Renault");
		expect(itemListEl.queryAll(By.css('.p-orderlist-item'))[2].context.$implicit.brand).toEqual("BMW");
	});

	it('should call moveDown', () => {
		const moveUpSpy = spyOn(orderlist, 'moveDown').and.callThrough();
		fixture.detectChanges();

		const itemListEl = fixture.debugElement.query(By.css('ul'));
		const bmwEl = itemListEl.queryAll(By.css('.p-orderlist-item'))[3];
		const buttonsEl = fixture.debugElement.queryAll(By.css('button'));
		const moveDownButtonEl = buttonsEl[2];
		bmwEl.nativeElement.click();
		moveDownButtonEl.nativeElement.click();
		fixture.detectChanges();

		expect(moveUpSpy).toHaveBeenCalled();
		expect(orderlist.selection.length).toEqual(1);
		expect(orderlist.selection[0].brand).toEqual("BMW");
		expect(bmwEl.nativeElement.className).toContain('p-highlight');
		expect(itemListEl.queryAll(By.css('.p-orderlist-item'))[3].context.$implicit.brand).toEqual("Mercedes");
		expect(itemListEl.queryAll(By.css('.p-orderlist-item'))[4].context.$implicit.brand).toEqual("BMW");
	});

	it('should call MoveTop', () => {
		const moveTopSpy = spyOn(orderlist, 'moveTop').and.callThrough();
		fixture.detectChanges();

		const itemListEl = fixture.debugElement.query(By.css('ul'));
		const bmwEl = itemListEl.queryAll(By.css('.p-orderlist-item'))[3];
		const buttonsEl = fixture.debugElement.queryAll(By.css('button'));
		const moveTopButtonEl = buttonsEl[1];
		bmwEl.nativeElement.click();
		moveTopButtonEl.nativeElement.click();
		fixture.detectChanges();

		expect(moveTopSpy).toHaveBeenCalled();
		expect(orderlist.selection.length).toEqual(1);
		expect(orderlist.selection[0].brand).toEqual("BMW");
		expect(bmwEl.nativeElement.className).toContain('p-highlight');
		expect(itemListEl.queryAll(By.css('.p-orderlist-item'))[3].context.$implicit.brand).toEqual("Renault");
		expect(itemListEl.queryAll(By.css('.p-orderlist-item'))[0].context.$implicit.brand).toEqual("BMW");
	});

	it('should call moveBottom', () => {
		const moveBottomSpy = spyOn(orderlist, 'moveBottom').and.callThrough();
		fixture.detectChanges();

		const itemListEl = fixture.debugElement.query(By.css('ul'));
		const bmwEl = itemListEl.queryAll(By.css('.p-orderlist-item'))[3];
		const buttonsEl = fixture.debugElement.queryAll(By.css('button'));
		const moveBottomButtonEl = buttonsEl[3];
		bmwEl.nativeElement.click();
		moveBottomButtonEl.nativeElement.click();
		fixture.detectChanges();

		expect(moveBottomSpy).toHaveBeenCalled();
		expect(orderlist.selection.length).toEqual(1);
		expect(orderlist.selection[0].brand).toEqual("BMW");
		expect(bmwEl.nativeElement.className).toContain('p-highlight');
		expect(itemListEl.queryAll(By.css('.p-orderlist-item'))[3].context.$implicit.brand).toEqual("Mercedes");
		expect(itemListEl.queryAll(By.css('.p-orderlist-item'))[9].context.$implicit.brand).toEqual("BMW");
	});

	it('should show filter items by default', () => {
		orderlist.filterBy = "brand";
		orderlist.filterValue = "v";
		fixture.detectChanges();

		const filterEl = fixture.debugElement.query(By.css('input'));
		fixture.detectChanges();

		const itemsEl = fixture.debugElement.queryAll(By.css(".p-orderlist-item"));
		expect(orderlist.visibleOptions.length).toEqual(2);
		expect(orderlist.visibleOptions[0].brand).toEqual("VW");
		expect(orderlist.visibleOptions[1].brand).toEqual("Volvo");
		for (let i = 0; i < itemsEl.length; i++) {
			if (i == 0 || i == 5)
				expect(itemsEl[i].nativeElement.style.display).toEqual("block");
			else
				expect(itemsEl[i].nativeElement.style.display).not.toEqual("block");
		}
	});

	it('should show filter items', () => {
		orderlist.filterBy = "brand";
		fixture.detectChanges();

		const filterEl = fixture.debugElement.query(By.css('input'));
		expect(filterEl).toBeTruthy();
		filterEl.nativeElement.value = "v";
		filterEl.nativeElement.dispatchEvent(new Event('keyup'));
		fixture.detectChanges();

		const itemsEl = fixture.debugElement.queryAll(By.css(".p-orderlist-item"));
		expect(orderlist.visibleOptions.length).toEqual(2);
		expect(orderlist.visibleOptions[0].brand).toEqual("VW");
		expect(orderlist.visibleOptions[1].brand).toEqual("Volvo");
		for (let i = 0; i < itemsEl.length; i++) {
			if (i == 0 || i == 5)
				expect(itemsEl[i].nativeElement.style.display).toEqual("block");
			else
				expect(itemsEl[i].nativeElement.style.display).not.toEqual("block");
		}
	});

	it('should listen onReorder in moveUp', () => {
		const moveUpSpy = spyOn(orderlist, 'moveUp').and.callThrough();
		fixture.detectChanges();

		let data;
		orderlist.onReorder.subscribe(value => data = value);
		const itemListEl = fixture.debugElement.query(By.css('ul'));
		const bmwEl = itemListEl.queryAll(By.css('.p-orderlist-item'))[3];
		const buttonsEl = fixture.debugElement.queryAll(By.css('button'));
		const moveUpButtonEl = buttonsEl[0];
		bmwEl.nativeElement.click();
		moveUpButtonEl.nativeElement.click();
		fixture.detectChanges();

		expect(data).toBeTruthy();
	});

	it('should listen onReorder in moveDown', () => {
		const moveUpSpy = spyOn(orderlist, 'moveDown').and.callThrough();
		fixture.detectChanges();

		let data;
		orderlist.onReorder.subscribe(value => data = value);
		const itemListEl = fixture.debugElement.query(By.css('ul'));
		const bmwEl = itemListEl.queryAll(By.css('.p-orderlist-item'))[3];
		const buttonsEl = fixture.debugElement.queryAll(By.css('button'));
		const moveDownButtonEl = buttonsEl[2];
		bmwEl.nativeElement.click();
		moveDownButtonEl.nativeElement.click();
		fixture.detectChanges();

		expect(data).toBeTruthy();
	});

	it('should listen onReorder in MoveTop', () => {
		const moveTopSpy = spyOn(orderlist, 'moveTop').and.callThrough();
		fixture.detectChanges();

		let data;
		orderlist.onReorder.subscribe(value => data = value);
		const itemListEl = fixture.debugElement.query(By.css('ul'));
		const bmwEl = itemListEl.queryAll(By.css('.p-orderlist-item'))[3];
		const buttonsEl = fixture.debugElement.queryAll(By.css('button'));
		const moveTopButtonEl = buttonsEl[1];
		bmwEl.nativeElement.click();
		moveTopButtonEl.nativeElement.click();
		fixture.detectChanges();

		expect(data).toBeTruthy();
	});

	it('should not onReorder first item to top', () => {
		fixture.detectChanges();

		let data;
		orderlist.onReorder.subscribe(value => data = value);
		const itemListEl = fixture.debugElement.query(By.css('ul'));
		const vwEl = itemListEl.queryAll(By.css('.p-orderlist-item'))[0];
		const buttonsEl = fixture.debugElement.queryAll(By.css('button'));
		const moveTopButtonEl = buttonsEl[1];
		vwEl.nativeElement.click();
		moveTopButtonEl.nativeElement.click();
		fixture.detectChanges();

		expect(data).toBeTruthy();
		expect(orderlist.value).toBeTruthy();
	});

	it('should not onReorder first item to up', () => {
		fixture.detectChanges();

		let data;
		orderlist.onReorder.subscribe(value => data = value);
		const itemListEl = fixture.debugElement.query(By.css('ul'));
		const vwEl = itemListEl.queryAll(By.css('.p-orderlist-item'))[0];
		const buttonsEl = fixture.debugElement.queryAll(By.css('button'));
		const moveTopButtonEl = buttonsEl[0];
		vwEl.nativeElement.click();
		moveTopButtonEl.nativeElement.click();
		fixture.detectChanges();

		expect(data).toBeTruthy();
		expect(orderlist.value).toBeTruthy();
	});

	it('should listen onReorder in moveBottom', () => {
		const moveBottomSpy = spyOn(orderlist, 'moveBottom').and.callThrough();
		fixture.detectChanges();

		let data;
		orderlist.onReorder.subscribe(value => data = value);
		const itemListEl = fixture.debugElement.query(By.css('ul'));
		const bmwEl = itemListEl.queryAll(By.css('.p-orderlist-item'))[3];
		const buttonsEl = fixture.debugElement.queryAll(By.css('button'));
		const moveBottomButtonEl = buttonsEl[3];
		bmwEl.nativeElement.click();
		moveBottomButtonEl.nativeElement.click();
		fixture.detectChanges();

		expect(data).toBeTruthy();
	});

	it('should not onReorder first item to bottom', () => {
		fixture.detectChanges();

		let data;
		orderlist.onReorder.subscribe(value => data = value);
		const itemListEl = fixture.debugElement.query(By.css('ul'));
		const bmwEl = itemListEl.queryAll(By.css('.p-orderlist-item'))[9];
		const buttonsEl = fixture.debugElement.queryAll(By.css('button'));
		const moveBottomButtonEl = buttonsEl[3];
		bmwEl.nativeElement.click();
		moveBottomButtonEl.nativeElement.click();
		fixture.detectChanges();

		expect(data).toBeTruthy();
		expect(orderlist.value).toBeTruthy();
	});

	it('should not onReorder first item to down', () => {
		fixture.detectChanges();

		let data;
		orderlist.onReorder.subscribe(value => data = value);
		const itemListEl = fixture.debugElement.query(By.css('ul'));
		const bmwEl = itemListEl.queryAll(By.css('.p-orderlist-item'))[9];
		const buttonsEl = fixture.debugElement.queryAll(By.css('button'));
		const moveBottomButtonEl = buttonsEl[2];
		bmwEl.nativeElement.click();
		moveBottomButtonEl.nativeElement.click();
		fixture.detectChanges();

		expect(data).toBeTruthy();
		expect(orderlist.value).toBeTruthy();
	});

	it('should listen onSelectionChange in onItem', () => {
		fixture.detectChanges();

		let data;
		orderlist.onSelectionChange.subscribe(value => data = value);
		const itemListEl = fixture.debugElement.query(By.css('ul'));
		const bmwEl = itemListEl.queryAll(By.css('.p-orderlist-item'))[3];
		bmwEl.nativeElement.click();
		fixture.detectChanges();

		expect(data).toBeTruthy();
		expect(data.value[0].brand).toEqual("BMW");
	});

	it('should listen onFilterEvent', () => {
		orderlist.filterBy = "brand";
		fixture.detectChanges();

		let data;
		orderlist.onFilterEvent.subscribe(value => data = value);
		const filterEl = fixture.debugElement.query(By.css('input'));
		expect(filterEl).toBeTruthy();
		filterEl.nativeElement.value = "v";
		filterEl.nativeElement.dispatchEvent(new Event('keyup'));
		fixture.detectChanges();

		expect(data).toBeTruthy();
		expect(data.value.length).toEqual(2);
		expect(data.value[0].brand).toEqual("VW");
		expect(data.value[1].brand).toEqual("Volvo");
	});

	it('should select item with keyboard navigation', () => {
		const findNextItemSpy = spyOn(orderlist, "findNextItem").and.callThrough();
		const findPrevItemSpy = spyOn(orderlist, "findPrevItem").and.callThrough();
		fixture.detectChanges();

		const itemListEl = fixture.debugElement.query(By.css('ul'));
		const bmwEl = itemListEl.queryAll(By.css('.p-orderlist-item'))[3].nativeElement;
		const event: any = document.createEvent('CustomEvent');
		event.which = 40;
		event.initEvent('keydown');
		bmwEl.dispatchEvent(event);
		fixture.detectChanges();

		event.which = 38;
		bmwEl.dispatchEvent(event);
		fixture.detectChanges();

		event.which = 13;
		bmwEl.dispatchEvent(event);
		fixture.detectChanges();

		expect(orderlist.selection.length).toEqual(1);
		expect(orderlist.selection[0].brand).toEqual("BMW");
		expect(findNextItemSpy).toHaveBeenCalled();
		expect(findPrevItemSpy).toHaveBeenCalled();
		expect(bmwEl.className).toContain('p-highlight');
	});
});