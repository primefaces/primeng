import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Draggable, DragDropModule, Droppable } from './dragdrop';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
@Component({
	template: `
		<ul style="margin:0;padding:0">
			<li *ngFor="let car of availableCars" pDraggable="cars"
				(onDragStart)="dragStart($event,car)" (onDrag)="onDrag()" (onDragEnd)="dragEnd($event)">
				<h3>{{car.vin}} - {{car.year}}</h3>
			</li>
		</ul>
		<div pDroppable="cars"  style="height: 250px;"
		(onDrop)="drop($event)" [ngClass]="{'ui-highlight-car':draggedCar}">
			<div *ngFor="let car of selectedCars">
				<h4>
					{{car.brand}}
				</h4>
			</div>
		</div>
	`
})
class TestDragDropComponent {

	availableCars: any[] = [
        {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
        {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
        {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr"},
        {"brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh"},
        {"brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34"},
        {"brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj"},
        {"brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr"},
        {"brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34"},
        {"brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5"},
        {"brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s"}
    ];
    
    selectedCars: any[] = [];
    
    draggedCar: any;
    
    dragStart(event,car) {
        this.draggedCar = car;
    }
    
    drop(event) {
        if(this.draggedCar) {
            let draggedCarIndex = this.findIndex(this.draggedCar);
            this.selectedCars = [...this.selectedCars, this.draggedCar];
            this.availableCars = this.availableCars.filter((val,i) => i!=draggedCarIndex);
            this.draggedCar = null;
        }
	}
	
	onDrag(){

	}
    
    dragEnd(event) {
        this.draggedCar = null;
    }
    
    findIndex(car) {
        let index = -1;
        for(let i = 0; i < this.availableCars.length; i++) {
            if(car.vin === this.availableCars[i].vin) {
                index = i;
                break;
            }
        }
        return index;
    }

}

describe('Draggable', () => {

	let testComponent:TestDragDropComponent;
	let fixture: ComponentFixture<TestDragDropComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NoopAnimationsModule,
				DragDropModule
			],
			declarations: [
				TestDragDropComponent
			]
		});

		fixture = TestBed.createComponent(TestDragDropComponent);
		testComponent = fixture.componentInstance;
	});

	it('should display by default', () => {
		fixture.detectChanges();
  
		const draggableEls = fixture.debugElement.queryAll(By.css("li"));
		const dropEl = fixture.debugElement.query(By.css('div'));
		expect(dropEl.nativeElement).toBeTruthy();
		expect(draggableEls.length).toEqual(10);
	});

	it('should emit onDragStart', () => {
		fixture.detectChanges();
  
		const draggableEls = fixture.debugElement.queryAll(By.css("li"));
		const dropEl = fixture.debugElement.query(By.css('div'));
		const dragStartSpy = spyOn(testComponent,"dragStart").and.callThrough();
		const dragEvent: any = document.createEvent('CustomEvent');
		dragEvent.initEvent('dragstart', true, true);
        dragEvent.dataTransfer = {setData(val1,val2){}};
		draggableEls[0].nativeElement.dispatchEvent(dragEvent);
		fixture.detectChanges();
		
		expect(dragStartSpy).toHaveBeenCalled();
		expect(testComponent.draggedCar.brand).toEqual("VW");
	});

	it('should emit onDrag and dragEnd', () => {
		fixture.detectChanges();
  
		const draggableEls = fixture.debugElement.queryAll(By.css("li"));
		const dropEl = fixture.debugElement.query(By.css('div'));
		const dragEndSpy = spyOn(testComponent,"dragEnd").and.callThrough();
		const dragSpy = spyOn(testComponent,"onDrag").and.callThrough();
		let event: any = document.createEvent('CustomEvent');
		event.initEvent('dragstart', true, true);
        event.dataTransfer = {setData(val1,val2){}};
		draggableEls[0].nativeElement.dispatchEvent(event);
		fixture.detectChanges();
		
		event.initEvent('drag', true, true);
		draggableEls[0].nativeElement.dispatchEvent(event);
		fixture.detectChanges();
		
		expect(dragSpy).toHaveBeenCalled();
		expect(testComponent.draggedCar.brand).toEqual("VW");
		event.initEvent('dragend', true, true);
		draggableEls[0].nativeElement.dispatchEvent(event);
		fixture.detectChanges();

		expect(dragEndSpy).toHaveBeenCalled();
		expect(testComponent.draggedCar).toBeNull();
	});

	it('should set handle when mousedown', () => {
		fixture.detectChanges();
  
		const draggableEls = fixture.debugElement.queryAll(By.css("li"));
		let event: any = document.createEvent('CustomEvent');
		event.initEvent('mousedown', true, true);
		draggableEls[0].nativeElement.dispatchEvent(event);
		fixture.detectChanges();
		
		const draggable = fixture.debugElement.query(By.directive(Draggable)).injector.get(Draggable);
		expect(draggable.handle).toBeTruthy();
	});

	it('should reset handle when mouseup', () => {
		fixture.detectChanges();
  
		const draggableEls = fixture.debugElement.queryAll(By.css("li"));
		let event: any = document.createEvent('CustomEvent');
		event.initEvent('mousedown', true, true);
		draggableEls[0].nativeElement.dispatchEvent(event);
		fixture.detectChanges();
		
		let draggable = fixture.debugElement.query(By.directive(Draggable)).injector.get(Draggable);
		expect(draggable.handle).toBeTruthy();
		event.initEvent('mouseup', true, true);
		draggableEls[0].nativeElement.dispatchEvent(event);
		fixture.detectChanges();

		expect(draggable.handle).toBeNull();
	});

	it('should emit onDrop and onDragEnd', () => {
		fixture.detectChanges();
  
		const draggableEls = fixture.debugElement.queryAll(By.css("li"));
		const dropEl = fixture.debugElement.query(By.css('div'));
		const dropSpy = spyOn(testComponent,"drop").and.callThrough();
		const event: any = document.createEvent('CustomEvent');
		event.initEvent('dragstart', true, true);
        event.dataTransfer = {setData(val1,val2){}};
		draggableEls[0].nativeElement.dispatchEvent(event);
		const droppable = fixture.debugElement.query(By.directive(Droppable)).injector.get(Droppable);
		fixture.detectChanges();
		
		const onDragEnterSpy = spyOn(droppable,"dragEnter").and.callThrough();
		event.initEvent('dragenter', true, true);
		dropEl.nativeElement.dispatchEvent(event);
		fixture.detectChanges();

		const onDragLeaveSpy = spyOn(droppable,"dragLeave").and.callThrough();
		expect(onDragEnterSpy).toHaveBeenCalled();
		event.initEvent('dragleave', true, true);
		dropEl.nativeElement.dispatchEvent(event);
		fixture.detectChanges();

		expect(onDragLeaveSpy).toHaveBeenCalled();
		event.initEvent('dragenter', true, true);
		dropEl.nativeElement.dispatchEvent(event);
		fixture.detectChanges();

		
		event.initEvent('drop', true, true);
        event.dataTransfer = {getData(type){return "cars";}};
		dropEl.nativeElement.dispatchEvent(event);
		fixture.detectChanges();

		expect(dropSpy).toHaveBeenCalled();
		expect(testComponent.selectedCars.length).toEqual(1);
		expect(testComponent.selectedCars[0].brand).toEqual("VW");
	});
});
