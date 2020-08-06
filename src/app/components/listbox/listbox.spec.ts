import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Listbox } from './listbox';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'primeng/tooltip';

describe('Listbox', () => {
  
    let listbox: Listbox;
    let fixture: ComponentFixture<Listbox>;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule,
          TooltipModule
        ],
        declarations: [
          Listbox
        ]
      });
      
      fixture = TestBed.createComponent(Listbox);
      listbox = fixture.componentInstance;
    });

    it('should created by default', () => {
        fixture.detectChanges();
        
        const listboxEl = fixture.debugElement.query(By.css('div'));
        expect(listboxEl).toBeTruthy();
    });

    it('should disabled', () => {
        listbox.checkbox = true;
        listbox.multiple = true;
        listbox.disabled = true;
        listbox.filter = true;
        listbox.options = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];
        const clickSingleSpy = spyOn(listbox, 'onOptionClickCheckbox').and.callThrough();
        fixture.detectChanges();
        
        const bmwEl = fixture.debugElement.query(By.css('ul')).children[1].nativeElement;
        bmwEl.click();
        fixture.detectChanges();

        const filterInputEl = fixture.debugElement.query(By.css('.p-listbox-filter-container')).query(By.css('input')).nativeElement;
        const checkboxEl = fixture.debugElement.queryAll(By.css('li'))[1].query(By.css('.p-checkbox-icon')).nativeElement;
        expect(filterInputEl.disabled).toEqual(true);
        expect(checkboxEl.className).not.toContain("pi pi-check");
        expect(clickSingleSpy).not.toHaveBeenCalled();
    });

    it('should call onOptionTouchEnd', () => {
        listbox.options = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];
        fixture.detectChanges();
        
        const bmwEl = fixture.debugElement.query(By.css('ul')).children[1].nativeElement;
        const onOptionTouchEndSpy = spyOn(listbox,'onOptionTouchEnd').and.callThrough();
        bmwEl.dispatchEvent(new Event('touchend'));
        fixture.detectChanges();

        expect(onOptionTouchEndSpy).toHaveBeenCalled();
        expect(listbox.optionTouched).toEqual(true);
    });

    it('should call onOptionTouchEnd with readonly', () => {
        listbox.options = [
        {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];
        listbox.readonly = true;
        fixture.detectChanges();
        
        const bmwEl = fixture.debugElement.query(By.css('ul')).children[1].nativeElement;
        const onOptionTouchEndSpy = spyOn(listbox,'onOptionTouchEnd').and.callThrough();
        bmwEl.dispatchEvent(new Event('touchend'));
        fixture.detectChanges();

        expect(onOptionTouchEndSpy).toHaveBeenCalled();
        expect(listbox.optionTouched).toEqual(undefined);
    });


    it('should change style and styleClass', () => {
        listbox.style = {'height' : '300px'};
        listbox.styleClass = "Primeng ROCKS!"
        fixture.detectChanges();
        
        const listboxEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(listboxEl.className).toContain("Primeng ROCKS!");
        expect(listboxEl.style.height).toEqual("300px");
    });

    it('should select item when click', () => {
        listbox.options = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];
        fixture.detectChanges();
        
        const onOptionClick = spyOn(listbox, 'onOptionClick').and.callThrough();
        const bmwEl = fixture.debugElement.query(By.css('ul')).children[1].nativeElement;
        bmwEl.click();
        fixture.detectChanges();

        expect(listbox.value).toEqual("BMW");
        expect(bmwEl.className).toContain("p-highlight");
        expect(onOptionClick).toHaveBeenCalled();
        expect(listbox.optionTouched).toEqual(false);
    });

    it('should unselect item with metaKeySelection false', () => {
        listbox.options = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];
        listbox.metaKeySelection = false;
        fixture.detectChanges();
        
        const bmwEl = fixture.debugElement.query(By.css('ul')).children[1].nativeElement;
        bmwEl.click();
        fixture.detectChanges();

        expect(listbox.value).toEqual("BMW");
        expect(bmwEl.className).toContain("p-highlight");
        bmwEl.click();
        fixture.detectChanges();

        expect(listbox.value).not.toEqual("BMW");
        expect(bmwEl.className).not.toContain("p-highlight");
    });

    it('should select two item with multiple option', () => {
        listbox.multiple = true;
        listbox.metaKeySelection = false;
        listbox.options = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];
        const clickMultipleSpy = spyOn(listbox, 'onOptionClickMultiple').and.callThrough();
        fixture.detectChanges();
        
        const bmwEl = fixture.debugElement.query(By.css('ul')).children[1].nativeElement;
        const audiEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        bmwEl.click();
        fixture.detectChanges();
        
        audiEl.click();
        fixture.detectChanges();

        expect(listbox.value[0]).toEqual("BMW");
        expect(listbox.value[1]).toEqual("Audi");
        expect(bmwEl.className).toContain("p-highlight");
        expect(audiEl.className).toContain("p-highlight");
        expect(clickMultipleSpy).toHaveBeenCalledTimes(2);
    });

    it('should drop two item when double click', () => {
        listbox.multiple = true;
        listbox.metaKeySelection = false;
        listbox.options = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];
        const clickMultipleSpy = spyOn(listbox, 'onOptionClickMultiple').and.callThrough();
        fixture.detectChanges();
        
        const bmwEl = fixture.debugElement.query(By.css('ul')).children[1].nativeElement;
        const audiEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        bmwEl.click();      
        audiEl.click();
        bmwEl.click();
        audiEl.click();
        fixture.detectChanges();

        expect(listbox.value[0]).not.toEqual("BMW");
        expect(listbox.value[1]).not.toEqual("Audi");
        expect(bmwEl.className).not.toContain("p-highlight");
        expect(audiEl.className).not.toContain("p-highlight");
        expect(clickMultipleSpy).toHaveBeenCalledTimes(4);
    });

    it('should select all', () => {
        listbox.multiple = true;
        listbox.checkbox = true;
        listbox.options = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];
        const toggleAllSpy = spyOn(listbox, 'toggleAll').and.callThrough();
        listbox.cd.detectChanges();
        fixture.detectChanges();

        const selectAllEl = fixture.debugElement.query(By.css('.p-checkbox-box')).nativeElement;
        selectAllEl.click();
        fixture.detectChanges();

        expect(listbox.value.length).toEqual(10);
        expect(listbox.allChecked).toEqual(true);
        expect(selectAllEl.className).toContain('p-highlight');
        expect(toggleAllSpy).toHaveBeenCalled();
    });

    it('should show filtered items', () => {
        listbox.options = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];
        listbox.filter = true;
        fixture.detectChanges();
        
        const filterInputEl = fixture.debugElement.query(By.css('.p-listbox-filter-container')).children[0].nativeElement;
        filterInputEl.value = "f";
        filterInputEl.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        for(let x =0; x<10; x++ ){
        if (x == 2 || x==3){
            expect(fixture.debugElement.query(By.css('ul')).children[x].nativeElement.style.display).toEqual("flex");
        }
        else {
            expect(fixture.debugElement.query(By.css('ul')).children[x].nativeElement.style.display).toEqual("none");
        }
        }
    });

    it('should listen onChange', () => {
        listbox.options = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];
        let data;
        listbox.onChange.subscribe(value => data=value);
        fixture.detectChanges();
        
        const bmwEl = fixture.debugElement.query(By.css('ul')).children[1].nativeElement;
        bmwEl.click();
        fixture.detectChanges();

        expect(data.value).toEqual("BMW");
    });

    it('should listen dbClick', () => {
        listbox.multiple = true;
        listbox.checkbox = true;
        listbox.options = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];
        let data;
        listbox.onDblClick.subscribe(value => data = value);
        const onOptionDoubleClickSpy = spyOn(listbox,"onOptionDoubleClick").and.callThrough();
        fixture.detectChanges();
        
        const bmwEl = fixture.debugElement.query(By.css('ul')).children[1];
        bmwEl.nativeElement.click();
        bmwEl.triggerEventHandler("dblclick", new MouseEvent("dblclick"));
        fixture.detectChanges();

        expect(data.value[0]).toEqual("BMW");
        expect(onOptionDoubleClickSpy).toHaveBeenCalled();
        expect(data.value[0]).toEqual("BMW");
    });

    it('should listen dbClick with readonly', () => {
        listbox.readonly = true;
        listbox.options = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];
        let data;
        listbox.onDblClick.subscribe(value => data = value);
        const onOptionDoubleClickSpy = spyOn(listbox,"onOptionDoubleClick").and.callThrough();
        fixture.detectChanges();
        
        const bmwEl = fixture.debugElement.query(By.css('ul')).children[1];
        bmwEl.triggerEventHandler("dblclick", new MouseEvent("dblclick"));
        fixture.detectChanges();

        expect(onOptionDoubleClickSpy).toHaveBeenCalled();
        expect(data).toBeUndefined();
    });

    it('should select item when click and drop item when ctrl click', () => {
        listbox.options = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];
        listbox.metaKeySelection = true;
        const onOptionClick = spyOn(listbox, 'onOptionClick').and.callThrough();
        fixture.detectChanges();
        
        let data;
        listbox.onChange.subscribe(value => data=value);
        const bmwEl = fixture.debugElement.query(By.css('ul')).children[1].nativeElement;
        const ctrlClickEvent = {'ctrlKey':true};
        bmwEl.click();
        fixture.detectChanges();

        listbox.onOptionClick(ctrlClickEvent,listbox.options[1]);
        fixture.detectChanges();
        
        listbox.cd.detectChanges();
        expect(listbox.value).toEqual(null);
        expect(bmwEl.className).not.toContain("p-highlight");
        expect(onOptionClick).toHaveBeenCalled();
        expect(data.value).toEqual(null);
    });

    it('should select item when click and drop item when ctrl click', () => {
        listbox.options = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];
        listbox.metaKeySelection = true;
        listbox.multiple = true;
        const onOptionClick = spyOn(listbox, 'onOptionClick').and.callThrough();
        fixture.detectChanges();
        
        let data;
        listbox.onChange.subscribe(value => data=value);
        const bmwEl = fixture.debugElement.query(By.css('ul')).children[1].nativeElement;
        const ctrlClickEvent = {'ctrlKey':true};
        bmwEl.click();
        fixture.detectChanges();

        listbox.onOptionClick(ctrlClickEvent,listbox.options[1]);
        fixture.detectChanges();
        
        listbox.cd.detectChanges();
        expect(listbox.value).toEqual([]);
        expect(bmwEl.className).not.toContain("p-highlight");
        expect(onOptionClick).toHaveBeenCalled();
        expect(data.value).toEqual([]);
    });

    it('should select two item and drop one', () => {
        listbox.multiple = true;
        listbox.checkbox = true;
        listbox.options = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];
        const clickCheckboxSpy = spyOn(listbox, 'onOptionClickCheckbox').and.callThrough();
        fixture.detectChanges();
        
        const bmwEl = fixture.debugElement.query(By.css('ul')).children[1].nativeElement;
        const audiEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        bmwEl.click();
        audiEl.click();
        fixture.detectChanges();

        audiEl.click();
        fixture.detectChanges();

        expect(listbox.value[0]).toEqual("BMW");
        expect(listbox.value.length).toEqual(1);
        expect(listbox.value[1]).not.toEqual("Audi");
        expect(bmwEl.className).toContain("p-highlight");
        expect(clickCheckboxSpy).toHaveBeenCalledTimes(3);
    });

    it('should unselect all', () => {
        listbox.multiple = true;
        listbox.checkbox = true;
        listbox.options = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];
        const toggleAllSpy = spyOn(listbox, 'toggleAll').and.callThrough();
        fixture.detectChanges();
        
        listbox.cd.detectChanges();
        const selectAllEl = fixture.debugElement.query(By.css('.p-checkbox-box')).nativeElement;
        selectAllEl.click();
        fixture.detectChanges();

        selectAllEl.click();
        fixture.detectChanges();

        expect(listbox.value.length).toEqual(0);
        expect(listbox.allChecked).toEqual(false);
        expect(selectAllEl.className).not.toContain('p-highlight');
        expect(toggleAllSpy).toHaveBeenCalledTimes(2);
    });

    it('should toggleAll click with readonly true', () => {
        listbox.multiple = true;
        listbox.checkbox = true;
        listbox.readonly = true;
        listbox.options = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];
        const toggleAllSpy = spyOn(listbox, 'toggleAll').and.callThrough();
        fixture.detectChanges();
        
        listbox.cd.detectChanges();
        const selectAllEl = fixture.debugElement.query(By.css('.p-checkbox-box')).nativeElement;
        selectAllEl.click();
        fixture.detectChanges();

        expect(listbox.value).toEqual(undefined);
        expect(listbox.allChecked).toEqual(undefined);
        expect(selectAllEl.className).not.toContain('p-highlight');
        expect(toggleAllSpy).toHaveBeenCalledTimes(1);
    });

    it('should show one item with filterValue', () => {
        listbox.options = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];
        listbox.filterMode = "startsWith";
        listbox.filter = true;
        listbox.filterValue = "Bmw";
        fixture.detectChanges();

        for(let x =0; x<10; x++ ){
            if (x == 1){
                expect(fixture.debugElement.query(By.css('ul')).children[x].nativeElement.style.display).toEqual("flex");
            }
            else {
                expect(fixture.debugElement.query(By.css('ul')).children[x].nativeElement.style.display).toEqual("none");
            }
        }
    });

    it('should select all filtered items', () => {
        listbox.options = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];
        listbox.multiple = true;
        listbox.showToggleAll = true;
        listbox.checkbox = true;
        listbox.filter = true;
        listbox.filterValue = "o";
        fixture.detectChanges();

        const headerCheckBoxReadonlyEl = fixture.debugElement.query(By.css(".p-checkbox.p-component")).query(By.css("input"));
        const headerCheckBoxEl = fixture.debugElement.query(By.css(".p-checkbox-box"));
        headerCheckBoxReadonlyEl.nativeElement.dispatchEvent(new Event("focus"));
        headerCheckBoxEl.nativeElement.click();
        fixture.detectChanges();

        expect(listbox.value.length).toEqual(3);
        expect(headerCheckBoxEl.nativeElement.className).toContain("p-highlight");
        expect(headerCheckBoxEl.nativeElement.className).toContain("p-focus");
        listbox.filterValue = "m";
        headerCheckBoxReadonlyEl.nativeElement.dispatchEvent(new Event("blur"));
        fixture.detectChanges();
        
        expect(headerCheckBoxEl.nativeElement.className).not.toContain("p-highlight");
        expect(headerCheckBoxEl.nativeElement.className).not.toContain("p-focus");
    });


    it('should select item with keyboard navigation', () => {
        listbox.options = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];
        const findNextItemSpy = spyOn(listbox,"findNextItem").and.callThrough();
        const findPrevItemSpy = spyOn(listbox,"findPrevItem").and.callThrough();
        fixture.detectChanges();
 
        const bmwEl = fixture.debugElement.query(By.css('ul')).children[1].nativeElement;
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

        expect(findNextItemSpy).toHaveBeenCalled();
        expect(findPrevItemSpy).toHaveBeenCalled();
        expect(listbox.value).toEqual("BMW")
    });
});
