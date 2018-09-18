import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PickList } from './picklist';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { Button } from '../button/button';

@Component({
  template: `<p-pickList [source]="sourceCars" [target]="targetCars">
    <ng-template let-car pTemplate="item">
        <div class="ui-helper-clearfix">
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
      const controlEls = fixture.debugElement.queryAll(By.css('.ui-picklist-buttons'));
      const wraperEl = fixture.debugElement.queryAll(By.css('.ui-picklist-listwrapper'));
      const contentEl = fixture.debugElement.query(By.css('.ui-widget-content'));
      expect(controlEls.length).toEqual(3);
      expect(picklistEl).toBeTruthy();
      expect(wraperEl.length).toEqual(2);
      expect(contentEl).toBeTruthy();
    });

    it('should change style and styleClass', () => {
      picklist.style = {'primeng': 'rocks!'};
      picklist.styleClass = "Primeng ROCKS!";
      fixture.detectChanges();

      const picklistEl = fixture.debugElement.query(By.css('div'));
      expect(picklistEl.nativeElement.className).toContain("Primeng ROCKS!");
      expect(picklistEl.nativeElement.style.primeng).toEqual("rocks!");
    });

    it('should show sourceHeader and targetHeader', () => {
      fixture.detectChanges();

      picklist.sourceHeader = "Primeng";
      picklist.targetHeader = "ROCKS!";
      fixture.detectChanges();

      const headerEls = fixture.debugElement.queryAll(By.css('.ui-picklist-caption'));
      expect(headerEls).toBeTruthy();
      expect(headerEls.length).toEqual(2);
      expect(headerEls[0].nativeElement.textContent).toEqual("Primeng");
      expect(headerEls[1].nativeElement.textContent).toEqual("ROCKS!");
    });

    it('should responsive', () => {
      picklist.responsive = true;
      fixture.detectChanges();

      const headerEls = fixture.debugElement.query(By.css('div'));
      expect(headerEls.nativeElement.className).toContain("ui-picklist-responsive");
    });

    it('should show filter input', () => {
      picklist.filterBy = "brand";
      fixture.detectChanges();

      const filterContainers = fixture.debugElement.queryAll(By.css('.ui-picklist-filter-container'));
      expect(filterContainers.length).toEqual(2);
      expect(filterContainers[0]).toBeTruthy();
      expect(filterContainers[1]).toBeTruthy();
    });
    
    it('should filtered', () => {
      picklist.filterBy = "brand";
      fixture.detectChanges();

      const sourceFilterEl = fixture.debugElement.query(By.css('input'));
      sourceFilterEl.nativeElement.value = "v";
      sourceFilterEl.nativeElement.dispatchEvent(new Event('keyup'));
      fixture.detectChanges();

      const sourceListItems = fixture.debugElement.query(By.css('.ui-picklist-source-wrapper')).queryAll(By.css('.ui-picklist-item'));
      expect(picklist.visibleOptionsSource.length).toEqual(2);
      expect(picklist.visibleOptionsSource[0].brand).toEqual("VW");
      expect(picklist.visibleOptionsSource[1].brand).toEqual("Volvo");
      for(let i =0; i<sourceListItems.length;i++){
        if(i==0 || i==5)
          expect(sourceListItems[i].nativeElement.style.display).toEqual("block");
        else
          expect(sourceListItems[i].nativeElement.style.display).not.toEqual("block");
      }
      
    });

    it('should use input placeholders', () => {
      picklist.filterBy = "brand";
      picklist.sourceFilterPlaceholder = "Primeng";
      picklist.targetFilterPlaceholder = "ROCKS!";
      fixture.detectChanges();

      const headerEls = fixture.debugElement.queryAll(By.css('.ui-picklist-filter'));
      expect(headerEls.length).toEqual(2);
      expect(headerEls[0].nativeElement.placeholder).toEqual("Primeng");
      expect(headerEls[1].nativeElement.placeholder).toEqual("ROCKS!");
    });

    it('should not show filter input', () => {
      picklist.showSourceFilter = false;
      picklist.showTargetFilter = false;
      fixture.detectChanges();

      const headerEls = fixture.debugElement.queryAll(By.css('.ui-picklist-filter-container'));
      const inputEls = fixture.debugElement.query(By.css('.ui-picklist-filter'));
      expect(headerEls.length).toEqual(0);
      expect(headerEls).toEqual([]);
      expect(inputEls).toBeFalsy();
    });
    

    it('should show items', () => {
      picklist.dragdrop = true;
      fixture.detectChanges();

      const sourceListItems = fixture.debugElement.query(By.css('.ui-picklist-source-wrapper')).queryAll(By.css('.ui-picklist-droppoint'));
      const targetListItems = fixture.debugElement.query(By.css('.ui-picklist-target-wrapper')).queryAll(By.css('.ui-picklist-droppoint'));

      expect(sourceListItems.length).toEqual(11);
      expect(targetListItems.length).toEqual(0);
    });

    it('should change sourceStyle and targetStyle', () => {
      picklist.sourceStyle = {'primeng':'rocks!'};
      picklist.targetStyle = {'primeng':'rocks!'};
      fixture.detectChanges();

      const headerEls = fixture.debugElement.queryAll(By.css('.ui-widget-content.ui-picklist-list'));
      expect(headerEls[0].nativeElement.style.primeng).toContain("rocks!");
      expect(headerEls[1].nativeElement.style.primeng).toContain("rocks!");
    });

    it('should not show controls', () => {
      picklist.showSourceControls = false;
      picklist.showTargetControls = false;
      fixture.detectChanges();

      const sourceControlsEl = fixture.debugElement.query(By.css('.ui-picklist-source-controls'));
      const targetControlsEl = fixture.debugElement.query(By.css('.ui-picklist-target-controls'));
      const listwrapperEls = fixture.debugElement.queryAll(By.css('.ui-picklist-listwrapper'));
      expect(sourceControlsEl).toBeFalsy();
      expect(targetControlsEl).toBeFalsy();
      expect(listwrapperEls[0].nativeElement.className).toContain("ui-picklist-listwrapper-nocontrols");
      expect(listwrapperEls[1].nativeElement.className).toContain("ui-picklist-listwrapper-nocontrols");
    });

    it('should disabled', () => {
      picklist.disabled = true;
      picklist.filterBy = "brand";
      fixture.detectChanges();

      const buttonsEls = fixture.debugElement.queryAll(By.css('button'));
      const inputEls = fixture.debugElement.queryAll(By.css('input'));
      const itemEls = fixture.debugElement.queryAll(By.css('li'));
      for(let button of buttonsEls){
        expect(button.nativeElement.disabled).toEqual(true);
      }
      for(let input of inputEls){
        expect(input.nativeElement.disabled).toEqual(true);
      }
      for(let item of itemEls){
        expect(item.nativeElement.className).toContain("ui-state-disabled");
      }
    });

    it('should select item', () => {
      fixture.detectChanges();

      const onItemClickSpy = spyOn(picklist, 'onItemClick').and.callThrough();
      const sourceListItems = fixture.debugElement.query(By.css('.ui-picklist-source-wrapper')).queryAll(By.css('.ui-picklist-item'));
      sourceListItems[0].nativeElement.click();
      fixture.detectChanges();

      expect(onItemClickSpy).toHaveBeenCalled();
      expect(sourceListItems[0].nativeElement.className).toContain("ui-state-highlight");
      expect(picklist.selectedItemsSource.length).toEqual(1);
      expect(picklist.selectedItemsSource[0].brand).toEqual("VW");
    });

    it('should call moveUp', () => {
      fixture.detectChanges();

      const moveUpSpy = spyOn(picklist, 'moveUp').and.callThrough();
      const sourceListItems = fixture.debugElement.query(By.css('.ui-picklist-source-wrapper')).queryAll(By.css('.ui-picklist-item'));
      const sourceControlUpButton = fixture.debugElement.query(By.css('.ui-picklist-source-controls')).queryAll(By.css('button'))[0];
      sourceListItems[3].nativeElement.click();
      fixture.detectChanges();

      sourceControlUpButton.nativeElement.click();
      fixture.detectChanges();

      const sourceListItemsAfterChange = fixture.debugElement.query(By.css('.ui-picklist-source-wrapper')).queryAll(By.css('.ui-picklist-item'));
      expect(moveUpSpy).toHaveBeenCalled();
      expect(sourceListItemsAfterChange[2].nativeElement.className).toContain("ui-state-highlight");
      expect(sourceListItemsAfterChange[2].context.$implicit.brand).toEqual("BMW");
      expect(sourceListItemsAfterChange[3].context.$implicit.brand).toEqual("Renault");
    });

    it('should call moveDown', () => {
      fixture.detectChanges();

      const moveDownSpy = spyOn(picklist, 'moveDown').and.callThrough();
      const sourceListItems = fixture.debugElement.query(By.css('.ui-picklist-source-wrapper')).queryAll(By.css('.ui-picklist-item'));
      const sourceControlDownButton = fixture.debugElement.query(By.css('.ui-picklist-source-controls')).queryAll(By.css('button'))[2];
      sourceListItems[3].nativeElement.click();
      fixture.detectChanges();

      sourceControlDownButton.nativeElement.click();
      fixture.detectChanges();

      const sourceListItemsAfterChange = fixture.debugElement.query(By.css('.ui-picklist-source-wrapper')).queryAll(By.css('.ui-picklist-item'));
      expect(moveDownSpy).toHaveBeenCalled();
      expect(sourceListItemsAfterChange[4].nativeElement.className).toContain("ui-state-highlight");
      expect(sourceListItemsAfterChange[4].context.$implicit.brand).toEqual("BMW");
      expect(sourceListItemsAfterChange[3].context.$implicit.brand).toEqual("Mercedes");
    });

    it('should call movetop', () => {
      fixture.detectChanges();

      const moveTopSpy = spyOn(picklist, 'moveTop').and.callThrough();
      const sourceListItems = fixture.debugElement.query(By.css('.ui-picklist-source-wrapper')).queryAll(By.css('.ui-picklist-item'));
      const sourceControlTopButton = fixture.debugElement.query(By.css('.ui-picklist-source-controls')).queryAll(By.css('button'))[1];
      sourceListItems[3].nativeElement.click();
      fixture.detectChanges();

      sourceControlTopButton.nativeElement.click();
      fixture.detectChanges();

      const sourceListItemsAfterChange = fixture.debugElement.query(By.css('.ui-picklist-source-wrapper')).queryAll(By.css('.ui-picklist-item'));
      expect(moveTopSpy).toHaveBeenCalled();
      expect(sourceListItemsAfterChange[0].nativeElement.className).toContain("ui-state-highlight");
      expect(sourceListItemsAfterChange[0].context.$implicit.brand).toEqual("BMW");
      expect(sourceListItemsAfterChange[3].context.$implicit.brand).toEqual("Renault");
    });

    it('should call moveBottom', () => {
      fixture.detectChanges();

      const moveBottomSpy = spyOn(picklist, 'moveBottom').and.callThrough();
      const sourceListItems = fixture.debugElement.query(By.css('.ui-picklist-source-wrapper')).queryAll(By.css('.ui-picklist-item'));
      const sourceControlBottomButton = fixture.debugElement.query(By.css('.ui-picklist-source-controls')).queryAll(By.css('button'))[3];
      sourceListItems[3].nativeElement.click();
      fixture.detectChanges();

      sourceControlBottomButton.nativeElement.click();
      fixture.detectChanges();

      const sourceListItemsAfterChange = fixture.debugElement.query(By.css('.ui-picklist-source-wrapper')).queryAll(By.css('.ui-picklist-item'));
      expect(moveBottomSpy).toHaveBeenCalled();
      expect(sourceListItemsAfterChange[9].nativeElement.className).toContain("ui-state-highlight");
      expect(sourceListItemsAfterChange[9].context.$implicit.brand).toEqual("BMW");
      expect(sourceListItemsAfterChange[3].context.$implicit.brand).toEqual("Mercedes");
    });

    it('should call moveRight', () => {
      fixture.detectChanges();

      const moveRightSpy = spyOn(picklist, 'moveRight').and.callThrough();
      const sourceListItems = fixture.debugElement.query(By.css('.ui-picklist-source-wrapper')).queryAll(By.css('.ui-picklist-item'));
      const controlRightButton = fixture.debugElement.queryAll(By.css('.ui-picklist-buttons-cell'))[1].queryAll(By.css('button'))[0];
      sourceListItems[3].nativeElement.click();
      fixture.detectChanges();

      controlRightButton.nativeElement.click();
      fixture.detectChanges();

      const sourceListItemsAfterChange = fixture.debugElement.query(By.css('.ui-picklist-source-wrapper')).queryAll(By.css('.ui-picklist-item'));
      const targetListItemsAfterChange = fixture.debugElement.query(By.css('.ui-picklist-target-wrapper')).queryAll(By.css('.ui-picklist-item'));
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
      const sourceListItems = fixture.debugElement.query(By.css('.ui-picklist-source-wrapper')).queryAll(By.css('.ui-picklist-item'));
      const controlRightButton = fixture.debugElement.queryAll(By.css('.ui-picklist-buttons-cell'))[1].queryAll(By.css('button'))[0];
      const controlLeftButton = fixture.debugElement.queryAll(By.css('.ui-picklist-buttons-cell'))[1].queryAll(By.css('button'))[2];
      sourceListItems[3].nativeElement.click();
      fixture.detectChanges();

      controlRightButton.nativeElement.click();
      fixture.detectChanges();

      const targetListItems = fixture.debugElement.query(By.css('.ui-picklist-target-wrapper')).queryAll(By.css('.ui-picklist-item'));
      targetListItems[0].nativeElement.click();
      fixture.detectChanges();

      controlLeftButton.nativeElement.click();
      fixture.detectChanges();
      
      const sourceListItemsAfterChange = fixture.debugElement.query(By.css('.ui-picklist-source-wrapper')).queryAll(By.css('.ui-picklist-item'));
      const targetListItemsAfterChange = fixture.debugElement.query(By.css('.ui-picklist-target-wrapper')).queryAll(By.css('.ui-picklist-item'));
      expect(moveLeftSpy).toHaveBeenCalled();
      expect(targetListItemsAfterChange.length).toEqual(0);
      expect(picklist.target.length).toEqual(0);
      expect(picklist.source.length).toEqual(10);
      expect(sourceListItemsAfterChange[9].context.$implicit.brand).toEqual("BMW");
    });

    it('should call moveAllRight', () => {
      fixture.detectChanges();

      const moveAllRightSpy = spyOn(picklist, 'moveAllRight').and.callThrough();
      const controlAllRightButton = fixture.debugElement.queryAll(By.css('.ui-picklist-buttons-cell'))[1].queryAll(By.css('button'))[1];
      fixture.detectChanges();

      controlAllRightButton.nativeElement.click();
      fixture.detectChanges();

      const sourceListItemsAfterChange = fixture.debugElement.query(By.css('.ui-picklist-source-wrapper')).queryAll(By.css('.ui-picklist-item'));
      const targetListItemsAfterChange = fixture.debugElement.query(By.css('.ui-picklist-target-wrapper')).queryAll(By.css('.ui-picklist-item'));
      expect(moveAllRightSpy).toHaveBeenCalled();
      expect(sourceListItemsAfterChange.length).toEqual(0);
      expect(targetListItemsAfterChange.length).toEqual(10);
      expect(picklist.target.length).toEqual(10);
      expect(picklist.source.length).toEqual(0);
    });

    it('should call moveAllLeft', () => {
      fixture.detectChanges();

      const moveAllLeftSpy = spyOn(picklist, 'moveAllLeft').and.callThrough();
      const controlAllRightButton = fixture.debugElement.queryAll(By.css('.ui-picklist-buttons-cell'))[1].queryAll(By.css('button'))[1];
      const controlAllLeftButton = fixture.debugElement.queryAll(By.css('.ui-picklist-buttons-cell'))[1].queryAll(By.css('button'))[3];
      fixture.detectChanges();

      controlAllRightButton.nativeElement.click();
      fixture.detectChanges();
      
      controlAllLeftButton.nativeElement.click();
      fixture.detectChanges();

      const sourceListItemsAfterChange = fixture.debugElement.query(By.css('.ui-picklist-source-wrapper')).queryAll(By.css('.ui-picklist-item'));
      const targetListItemsAfterChange = fixture.debugElement.query(By.css('.ui-picklist-target-wrapper')).queryAll(By.css('.ui-picklist-item'));
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
      const sourceListItems = fixture.debugElement.query(By.css('.ui-picklist-source-wrapper')).queryAll(By.css('.ui-picklist-item'));
      sourceListItems[0].nativeElement.click();
      fixture.detectChanges();

      expect(data).toBeTruthy();
      expect(data.items[0].brand).toEqual("VW");
    });

    it('should listen onTargetSelect', () => {
      fixture.detectChanges();

      const sourceListItems = fixture.debugElement.query(By.css('.ui-picklist-source-wrapper')).queryAll(By.css('.ui-picklist-item'));
      const controlRightButton = fixture.debugElement.queryAll(By.css('.ui-picklist-buttons-cell'))[1].queryAll(By.css('button'))[0];
      sourceListItems[0].nativeElement.click();
      fixture.detectChanges();

      controlRightButton.nativeElement.click();
      fixture.detectChanges();

      let data;
      picklist.onTargetSelect.subscribe(value => data = value)
      const targetListItems = fixture.debugElement.query(By.css('.ui-picklist-target-wrapper')).queryAll(By.css('.ui-picklist-item'));
      targetListItems[0].nativeElement.click();
      fixture.detectChanges();

      expect(data).toBeTruthy();
      expect(data.items[0].brand).toEqual("VW");
    });

    it('should listen onSourceReorder', () => {
      fixture.detectChanges();

      let data;
      picklist.onSourceReorder.subscribe(value => data = value);
      const sourceListItems = fixture.debugElement.query(By.css('.ui-picklist-source-wrapper')).queryAll(By.css('.ui-picklist-item'));
      const sourceControlUpButton = fixture.debugElement.query(By.css('.ui-picklist-source-controls')).queryAll(By.css('button'))[0];
      sourceListItems[3].nativeElement.click();
      fixture.detectChanges();

      sourceControlUpButton.nativeElement.click();
      fixture.detectChanges();

      expect(data).toBeTruthy();
      expect(data.items[0].brand).toEqual("BMW");
    });

    it('should listen onTargetReorder', () => {
      fixture.detectChanges();

      const controlAllRightButton = fixture.debugElement.queryAll(By.css('.ui-picklist-buttons-cell'))[1].queryAll(By.css('button'))[1];
      controlAllRightButton.nativeElement.click();
      fixture.detectChanges();

      let data;
      picklist.onTargetReorder.subscribe(value => data = value);
      const sourceListItems = fixture.debugElement.query(By.css('.ui-picklist-target-wrapper')).queryAll(By.css('.ui-picklist-item'));
      const sourceControlUpButton = fixture.debugElement.query(By.css('.ui-picklist-target-controls')).queryAll(By.css('button'))[0];
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
      const sourceListItems = fixture.debugElement.query(By.css('.ui-picklist-source-wrapper')).queryAll(By.css('.ui-picklist-item'));
      const controlRightButton = fixture.debugElement.queryAll(By.css('.ui-picklist-buttons-cell'))[1].queryAll(By.css('button'))[0];
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
      const sourceListItems = fixture.debugElement.query(By.css('.ui-picklist-source-wrapper')).queryAll(By.css('.ui-picklist-item'));
      const controlRightButton = fixture.debugElement.queryAll(By.css('.ui-picklist-buttons-cell'))[1].queryAll(By.css('button'))[0];
      const controlLeftButton = fixture.debugElement.queryAll(By.css('.ui-picklist-buttons-cell'))[1].queryAll(By.css('button'))[2];
      sourceListItems[3].nativeElement.click();
      fixture.detectChanges();

      controlRightButton.nativeElement.click();
      fixture.detectChanges();

      const targetListItems = fixture.debugElement.query(By.css('.ui-picklist-target-wrapper')).queryAll(By.css('.ui-picklist-item'));
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
      const controlAllRightButton = fixture.debugElement.queryAll(By.css('.ui-picklist-buttons-cell'))[1].queryAll(By.css('button'))[1];
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
      const controlAllRightButton = fixture.debugElement.queryAll(By.css('.ui-picklist-buttons-cell'))[1].queryAll(By.css('button'))[1];
      const controlAllLeftButton = fixture.debugElement.queryAll(By.css('.ui-picklist-buttons-cell'))[1].queryAll(By.css('button'))[3];
      fixture.detectChanges();

      controlAllRightButton.nativeElement.click();
      fixture.detectChanges();
      
      controlAllLeftButton.nativeElement.click();
      fixture.detectChanges();

      expect(data).toBeTruthy();
      expect(data.items.length).toEqual(10);
    });

});
