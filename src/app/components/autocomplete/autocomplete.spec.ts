import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { OverlayModule } from 'primeng/overlay';
import { AutoComplete } from './autocomplete';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { TimesCircleIcon } from 'primeng/icons/timescircle';

@Component({
    template: `
        <p-autoComplete [(ngModel)]="brand" [suggestions]="filteredBrands"
                        (completeMethod)="filterBrands($event)"></p-autoComplete>
        <a (click)="deleteLastEl()"></a>
        <p-autoComplete [(ngModel)]="car" [suggestions]="filteredCars"
                        (completeMethod)="filterBrandsWithField($event)"></p-autoComplete>
        <p-autoComplete [(ngModel)]="car2" [suggestions]="filteredCars"
                        (completeMethod)="selectCustomCarOnComplete($event)">
            <ng-template let-car pTemplate="selectedItem">
                <span>Custom Text: {{ car.brand }}</span>
            </ng-template>
        </p-autoComplete>`
})
class TestAutocompleteComponent {
    brands: string[] = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo', 'VW'];
    cars: any[] = [{ brand: 'Volvo' }, { brand: 'VW' }];
    filteredBrands: any[];
    filteredCars: any[];
    brand: string;
    car: any;
    car2: any;

    filterBrands(event) {
        this.filteredBrands = [];
        for (let i = 0; i < this.brands.length; i++) {
            let brand = this.brands[i];
            if (brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredBrands.push(brand);
            }
        }
    }

    filterBrandsWithField(event) {
        this.filteredCars = [];
        for (let i = 0; i < this.cars.length; i++) {
            let car = this.cars[i];
            if (car.brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredCars.push(car);
            }
        }
    }

    selectCustomCarOnComplete(event) {
        this.filterBrandsWithField(event);
        this.car2 = this.cars[0];
    }

    deleteLastEl() {
        this.brands.pop();
    }
}

describe('AutoComplete', () => {
    let autocomplete: AutoComplete;
    let autocomplete2: AutoComplete;
    let autocomplete3: AutoComplete;
    let testComponent: TestAutocompleteComponent;
    let fixture: ComponentFixture<TestAutocompleteComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, FormsModule, BrowserDynamicTestingModule, ButtonModule, OverlayModule, ChevronDownIcon, TimesCircleIcon],
            declarations: [AutoComplete, TestAutocompleteComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TestAutocompleteComponent);
        autocomplete = fixture.debugElement.children[0].componentInstance;
        autocomplete2 = fixture.debugElement.children[2].componentInstance;
        autocomplete3 = fixture.debugElement.children[3].componentInstance;
        testComponent = fixture.debugElement.componentInstance;
    });

    it('should disabled', () => {
        fixture.detectChanges();

        autocomplete.disabled = true;
        fixture.detectChanges();

        autocomplete.cd.detectChanges();
        const inputDefaultEl = fixture.debugElement.query(By.css('input')).nativeElement;
        expect(inputDefaultEl.disabled).toEqual(true);
        fixture.detectChanges();

        autocomplete.multiple = true;
        autocomplete.disabled = true;
        fixture.detectChanges();

        autocomplete.cd.detectChanges();
        const inputMultipleEl = fixture.debugElement.query(By.css('ul')).query(By.css('input'));
        const multiContainer = fixture.debugElement.query(By.css('ul'));
        expect(inputMultipleEl.properties.disabled).toEqual(true);
        expect(multiContainer.nativeElement.className).toContain('p-disabled');
    });

    it('should display dropdown icon', () => {
        autocomplete.dropdown = true;
        fixture.detectChanges();

        autocomplete.cd.detectChanges();
        const autocompleteEl = fixture.debugElement.query(By.css('span')).nativeElement;
        const dropdownIconEl = fixture.debugElement.query(By.css('.p-autocomplete-dropdown')).nativeElement;
        expect(autocompleteEl.className).toContain('p-autocomplete-dd');
        expect(dropdownIconEl).toBeTruthy();
    });

    it('should change style and styleClass', () => {
        autocomplete.style = { height: '300px' };
        autocomplete.styleClass = 'Primeng Rocks!';
        autocomplete.inputStyle = { height: '300px' };
        autocomplete.inputStyleClass = 'Primeng Rocks!';
        fixture.detectChanges();

        autocomplete.cd.detectChanges();
        const autocompleteEl = fixture.debugElement.query(By.css('span')).nativeElement;
        const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
        expect(autocompleteEl.className).toContain('Primeng Rocks!');
        expect(inputEl.className).toContain('Primeng Rocks!');
        expect(autocompleteEl.style.height).toContain('300px');
        expect(inputEl.style.height).toContain('300px');
        autocomplete.multiple = true;
        fixture.detectChanges();

        autocomplete.cd.detectChanges();
        const inputMultipleEl = fixture.debugElement.query(By.css('ul')).query(By.css('input')).nativeElement;
        expect(inputMultipleEl.className).toContain('Primeng Rocks!');
        expect(inputMultipleEl.style.height).toContain('300px');
    });

    it('should change inputId size readonly tabindex maxlength type and placeholder', () => {
        autocomplete.inputId = 'Primeng';
        autocomplete.placeholder = 'Primeng ROCKS!';
        autocomplete.size = 12;
        autocomplete.required = true;
        autocomplete.readonly = true;
        autocomplete.tabindex = 13;
        autocomplete.type = 'password';
        autocomplete.maxlength = 5;
        fixture.detectChanges();

        autocomplete.cd.detectChanges();
        const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
        expect(inputEl.id).toEqual('Primeng');
        expect(inputEl.placeholder).toEqual('Primeng ROCKS!');
        expect(inputEl.size).toEqual(12);
        expect(inputEl.required).toEqual(true);
        expect(inputEl.tabIndex).toEqual(13);
        expect(inputEl.maxLength).toEqual(5);
        expect(inputEl.readOnly).toEqual(true);
        expect(inputEl.type).toEqual('password');
        autocomplete.multiple = true;
        fixture.detectChanges();

        autocomplete.cd.detectChanges();
        const inputMultipleEl = fixture.debugElement.query(By.css('ul')).query(By.css('input')).nativeElement;
        expect(inputMultipleEl.id).toEqual('Primeng');
        expect(inputMultipleEl.placeholder).toEqual('Primeng ROCKS!');
    });

    it('should show filtered brands and change autoZIndex', fakeAsync(() => {
        autocomplete.autoZIndex = false;
        fixture.detectChanges();

        let focusValue;
        autocomplete.onFocus.subscribe((value) => (focusValue = value));
        const inputEl = fixture.debugElement.query(By.css('.p-inputtext.p-component'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.focus();
        inputEl.nativeElement.click();
        fixture.detectChanges();

        const onKeydownSpy = spyOn(autocomplete, 'onKeydown').and.callThrough();
        const onKeyupSpy = spyOn(autocomplete, 'onKeyup').and.callThrough();
        const onInputSpy = spyOn(autocomplete, 'onInput').and.callThrough();
        const handleSuggestionsChangeSpy = spyOn(autocomplete, 'handleSuggestionsChange').and.callThrough();
        const filterBrandsSpy = spyOn(testComponent, 'filterBrands').and.callThrough();

        inputEl.nativeElement.value = 'v';
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        tick(300);
        fixture.detectChanges();

        const suggestionsEls = fixture.debugElement.queryAll(By.css('li'));
        expect(autocomplete.suggestions.length).toEqual(2);
        expect(suggestionsEls.length).toEqual(2);
        expect(testComponent.filteredBrands.length).toEqual(2);
        expect(autocomplete.suggestions).toEqual(testComponent.filteredBrands);
        expect(onKeyupSpy).toHaveBeenCalled();
        expect(onInputSpy).toHaveBeenCalled();
        expect(onKeydownSpy).toHaveBeenCalled();
        expect(handleSuggestionsChangeSpy).toHaveBeenCalled();
        expect(filterBrandsSpy).toHaveBeenCalled();
        expect(focusValue).toBeTruthy();
        flush();
    }));

    it('should change immutable and scrollHeight', fakeAsync(() => {
        autocomplete.scrollHeight = '450px';
        fixture.detectChanges();

        const deleteLastEl = fixture.debugElement.query(By.css('a'));
        deleteLastEl.nativeElement.click();
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('.p-inputtext.p-component'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.focus();
        inputEl.nativeElement.click();
        fixture.detectChanges();

        inputEl.nativeElement.value = 'v';
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        tick(300);
        fixture.detectChanges();

        const suggestionsEls = fixture.debugElement.queryAll(By.css('li'));
        const panelEl = fixture.debugElement.query(By.css('.p-autocomplete-panel'));
        expect(panelEl.nativeElement.style.maxHeight).toEqual('450px');
        expect(autocomplete.suggestions.length).toEqual(1);
        expect(suggestionsEls.length).toEqual(1);
        expect(testComponent.filteredBrands.length).toEqual(1);
        expect(autocomplete.suggestions).toEqual(testComponent.filteredBrands);
        flush();
    }));

    it('should change appendTo', fakeAsync(() => {
        autocomplete.appendTo = 'body';
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('.p-inputtext.p-component'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.focus();
        inputEl.nativeElement.click();
        fixture.detectChanges();

        inputEl.nativeElement.value = 'v';
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        tick(300);
        fixture.detectChanges();

        const suggestionsEls = fixture.debugElement.queryAll(By.css('li'));
        expect(autocomplete.suggestions.length).toEqual(2);
        expect(suggestionsEls.length).toEqual(2);
        expect(testComponent.filteredBrands.length).toEqual(2);
        expect(autocomplete.suggestions).toEqual(testComponent.filteredBrands);
        flush();
    }));

    it('should change appendTo(2)', fakeAsync(() => {
        autocomplete.appendTo = fixture.debugElement.query(By.css('a')).nativeElement;
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('.p-inputtext.p-component'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.focus();
        inputEl.nativeElement.click();
        fixture.detectChanges();

        inputEl.nativeElement.value = 'v';
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        tick(300);
        fixture.detectChanges();

        const suggestionsEls = fixture.debugElement.queryAll(By.css('li'));
        expect(autocomplete.suggestions.length).toEqual(2);
        expect(suggestionsEls.length).toEqual(2);
        expect(testComponent.filteredBrands.length).toEqual(2);
        expect(autocomplete.suggestions).toEqual(testComponent.filteredBrands);
        flush();
    }));

    it('should not show panel', fakeAsync(() => {
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('.p-inputtext.p-component'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.focus();
        inputEl.nativeElement.click();
        fixture.detectChanges();

        inputEl.nativeElement.value = 'vxc';
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        tick(300);
        fixture.detectChanges();

        const suggestionsEls = fixture.debugElement.queryAll(By.css('li'));
        expect(autocomplete.suggestions.length).toEqual(0);
        expect(suggestionsEls.length).toEqual(0);
        expect(testComponent.filteredBrands.length).toEqual(0);
        flush();
    }));

    it('should show emptyMessage', fakeAsync(() => {
        autocomplete.emptyMessage = 'Primeng ROCKS!';
        autocomplete.showEmptyMessage = true;
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('.p-inputtext.p-component'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.focus();
        inputEl.nativeElement.click();
        fixture.detectChanges();

        inputEl.nativeElement.value = 'PRIMENG';
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        tick(300);
        fixture.detectChanges();

        const suggestionsEls = fixture.debugElement.queryAll(By.css('li'));
        expect(autocomplete.suggestions.length).toEqual(0);
        expect(suggestionsEls.length).toEqual(1);
        expect(testComponent.filteredBrands.length).toEqual(0);
        expect(suggestionsEls[0].nativeElement.textContent).toContain(autocomplete.emptyMessage);
        flush();
    }));

    it('should use autoHighlight', fakeAsync(() => {
        autocomplete.autoHighlight = true;
        autocomplete.baseZIndex = 20;
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('.p-inputtext.p-component'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.focus();
        inputEl.nativeElement.click();
        fixture.detectChanges();

        inputEl.nativeElement.value = 'v';
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        tick(300);
        fixture.detectChanges();

        const firstItemEl = fixture.debugElement.query(By.css('li')).nativeElement;
        expect(firstItemEl.className).toContain('p-highlight');
        flush();
    }));

    it('should use forceSelection', fakeAsync(() => {
        autocomplete.forceSelection = true;
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('.p-inputtext.p-component'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.focus();
        inputEl.nativeElement.click();
        fixture.detectChanges();

        const selectItemSpy = spyOn(autocomplete, 'selectItem').and.callThrough();
        inputEl.nativeElement.value = 'vsa';
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        autocomplete.suggestions = [];
        inputEl.nativeElement.dispatchEvent(new Event('change'));
        tick(300);
        fixture.detectChanges();

        expect(inputEl.nativeElement.value).toEqual('');
        flush();
    }));

    it('should select item', fakeAsync(() => {
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('.p-inputtext.p-component'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.focus();
        inputEl.nativeElement.click();
        fixture.detectChanges();

        const selectItemSpy = spyOn(autocomplete, 'selectItem').and.callThrough();
        inputEl.nativeElement.value = 'v';
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        tick(300);
        fixture.detectChanges();

        const firstItemEl = fixture.debugElement.query(By.css('li')).nativeElement;
        firstItemEl.click();
        fixture.detectChanges();

        expect(autocomplete.value).toEqual('Volvo');
        expect(selectItemSpy).toHaveBeenCalled();
        expect(inputEl.nativeElement.value).toEqual(autocomplete.value);
        expect(testComponent.brand).toEqual(autocomplete.value);
        flush();
    }));

    it('should show panel with dropdown', () => {
        autocomplete.dropdown = true;
        fixture.detectChanges();

        let dropdownValue;
        autocomplete.onDropdownClick.subscribe((value) => (dropdownValue = value));
        const dropdownOpenEl = fixture.debugElement.query(By.css('.p-autocomplete-dropdown'));
        dropdownOpenEl.nativeElement.click();
        fixture.detectChanges();

        const panelEl = fixture.debugElement.query(By.css('div'));
        expect(panelEl).toBeTruthy();
        expect(autocomplete.overlayVisible).toEqual(true);
        expect(dropdownValue).toBeTruthy();
    });

    it('should change dropdownMode', () => {
        autocomplete.dropdown = true;
        autocomplete.dropdownMode = 'current';
        fixture.detectChanges();

        const dropdownOpenEl = fixture.debugElement.query(By.css('.p-autocomplete-dropdown'));
        dropdownOpenEl.nativeElement.click();
        fixture.detectChanges();

        const panelEl = fixture.debugElement.query(By.css('div'));
        expect(panelEl).toBeTruthy();
        expect(autocomplete.overlayVisible).toEqual(true);
    });

    it('should use field', fakeAsync(() => {
        autocomplete2.field = 'brand';
        autocomplete2.forceSelection = true;
        fixture.detectChanges();

        const inputEl = fixture.debugElement.queryAll(By.css('p-autoComplete'))[1].query(By.css('.p-inputtext.p-component'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.focus();
        inputEl.nativeElement.click();
        fixture.detectChanges();

        const selectItemSpy = spyOn(autocomplete2, 'selectItem').and.callThrough();
        inputEl.nativeElement.value = 'v';
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        tick(300);
        fixture.detectChanges();

        const firstItemEl = fixture.debugElement.queryAll(By.css('p-autoComplete'))[1].query(By.css('li')).nativeElement;
        firstItemEl.click();
        fixture.detectChanges();
        expect(autocomplete2.value.brand).toEqual('Volvo');
        expect(selectItemSpy).toHaveBeenCalled();
        expect(inputEl.nativeElement.value).toEqual(autocomplete2.value.brand);
        expect(testComponent.car).toEqual(autocomplete2.value);
        flush();
    }));

    it('should display custom selectedItem template element', fakeAsync(() => {
        autocomplete3.field = 'brand';
        fixture.detectChanges();

        autocomplete3.selectItem({ brand: 'Volvo' });
        fixture.detectChanges();
        expect(autocomplete3.value.brand).toEqual('Volvo');

        const singleContainerElement = fixture.debugElement.queryAll(By.css('p-autoComplete'))[2].query(
            By.css('.p-component.p-inputtext.p-autocomplete-template-item'));
        const templateItemDiv = singleContainerElement.query(By.css('.p-autocomplete-token'));
        const selectedItemSpanElement = templateItemDiv.query(By.css('span'));

        expect(selectedItemSpanElement).toBeTruthy();
        expect(selectedItemSpanElement.childNodes[0].nativeNode.data).toEqual("Custom Text: Volvo");
    }));

    it('should change value of custom selectedItem template on keyEnter', fakeAsync(() => {
        autocomplete3.field = 'brand';
        autocomplete3.forceSelection = true;
        fixture.detectChanges();

        autocomplete3.selectItem({ brand: 'Volvo' });
        fixture.detectChanges();
        expect(autocomplete3.value.brand).toEqual('Volvo');

        const inputEl = fixture.debugElement.queryAll(By.css('p-autoComplete'))[2].query(
            By.css('.p-autocomplete-template-input-token'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.focus();
        inputEl.nativeElement.click();
        fixture.detectChanges();

        inputEl.nativeElement.value = 'VW';
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        tick(300);
        fixture.detectChanges();

        const firstItemEl = fixture.debugElement.queryAll(By.css('p-autoComplete'))[2].query(
            By.css('li')).nativeElement;
        firstItemEl.click();
        fixture.detectChanges();
        expect(autocomplete3.value.brand).toEqual('VW');
        expect(inputEl.nativeElement.value).toEqual('');
        expect(testComponent.car2).toEqual(autocomplete3.value);

        const singleContainerElement = fixture.debugElement.queryAll(By.css('p-autoComplete'))[2].query(
            By.css('.p-component.p-inputtext.p-autocomplete-template-item'));
        const templateItemDiv = singleContainerElement.query(By.css('.p-autocomplete-token'));
        const selectedItemSpanElement = templateItemDiv.query(By.css('span'));

        expect(selectedItemSpanElement).toBeTruthy();
        expect(selectedItemSpanElement.childNodes[0].nativeNode.data).toEqual("Custom Text: VW");
        flush();
    }));

    it('should change minLength', fakeAsync(() => {
        autocomplete.minLength = 2;
        fixture.detectChanges();
        const inputEl = fixture.debugElement.query(By.css('.p-inputtext.p-component'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.focus();
        inputEl.nativeElement.click();
        fixture.detectChanges();

        inputEl.nativeElement.value = 'v';
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        tick(300);
        fixture.detectChanges();

        const panelEl = fixture.debugElement.query(By.css('div:not(.p-autocomplete-template-item)'));
        expect(panelEl).toBeFalsy();

        inputEl.nativeElement.value = 'va';
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        tick(300);
        fixture.detectChanges();

        const updatedPanelEl = fixture.debugElement.query(By.css('div:not(.p-autocomplete-template-item)'));
        expect(updatedPanelEl).toBeFalsy();
        flush();
    }));

    it('should multiple', () => {
        autocomplete.multiple = true;
        fixture.detectChanges();

        const spanEl = fixture.debugElement.query(By.css('span'));
        const listEl = fixture.debugElement.query(By.css('ul'));
        expect(spanEl.nativeElement.className).toContain('p-autocomplete-multiple');
        expect(listEl.nativeElement.className).toContain('p-autocomplete-multiple-container');
    });

    it('should select item with multiSelect', fakeAsync(() => {
        autocomplete.multiple = true;
        autocomplete.forceSelection = true;
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.click();
        fixture.detectChanges();

        const selectItemSpy = spyOn(autocomplete, 'selectItem').and.callThrough();
        inputEl.nativeElement.value = 'v';
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        tick(300);
        fixture.detectChanges();

        inputEl.nativeElement.dispatchEvent(new Event('change'));
        const firstItemEl = fixture.debugElement.queryAll(By.css('li'))[1].nativeElement;
        firstItemEl.click();
        fixture.detectChanges();
        expect(autocomplete.value[0]).toEqual('Volvo');
        expect(autocomplete.value.length).toEqual(1);
        expect(selectItemSpy).toHaveBeenCalled();
        expect(testComponent.brand).toEqual(autocomplete.value);
        flush();
    }));

    it('should select selected item', fakeAsync(() => {
        autocomplete.multiple = true;
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.click();
        fixture.detectChanges();

        const selectItemSpy = spyOn(autocomplete, 'selectItem').and.callThrough();
        inputEl.nativeElement.value = 'v';
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        tick(300);
        fixture.detectChanges();

        const firstItemEl = fixture.debugElement.queryAll(By.css('li'))[1].nativeElement;
        firstItemEl.click();
        fixture.detectChanges();

        expect(autocomplete.value[0]).toEqual('Volvo');
        expect(autocomplete.value.length).toEqual(1);
        expect(selectItemSpy).toHaveBeenCalled();
        expect(testComponent.brand).toEqual(autocomplete.value);
        flush();
    }));

    it('should delete item with backspace', fakeAsync(() => {
        autocomplete.multiple = true;
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.click();
        fixture.detectChanges();

        const selectItemSpy = spyOn(autocomplete, 'selectItem').and.callThrough();
        inputEl.nativeElement.value = 'v';
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        tick(300);
        fixture.detectChanges();

        const firstItemEl = fixture.debugElement.queryAll(By.css('li'))[1].nativeElement;
        firstItemEl.click();
        fixture.detectChanges();
        expect(autocomplete.value[0]).toEqual('Volvo');
        expect(autocomplete.value.length).toEqual(1);
        expect(selectItemSpy).toHaveBeenCalled();
        expect(testComponent.brand).toEqual(autocomplete.value);
        let backspaceEvent = new Event('keydown');
        Object.defineProperty(backspaceEvent, 'which', { value: 8 });
        Object.defineProperty(backspaceEvent, 'preventDefault', { value: () => {} });
        autocomplete.onKeydown(backspaceEvent);
        fixture.detectChanges();

        expect(autocomplete.value[0]).toEqual(undefined);
        expect(autocomplete.value.length).toEqual(0);
        flush();
    }));

    it('should delete item with icon', fakeAsync(() => {
        autocomplete.multiple = true;
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.click();
        fixture.detectChanges();

        const selectItemSpy = spyOn(autocomplete, 'selectItem').and.callThrough();
        inputEl.nativeElement.value = 'v';
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        tick(300);
        fixture.detectChanges();

        const firstItemEl = fixture.debugElement.queryAll(By.css('li'))[1].nativeElement;
        firstItemEl.click();
        fixture.detectChanges();
        expect(autocomplete.value[0]).toEqual('Volvo');
        expect(autocomplete.value.length).toEqual(1);
        expect(selectItemSpy).toHaveBeenCalled();
        expect(testComponent.brand).toEqual(autocomplete.value);
        const iconEl = fixture.debugElement.query(By.css('.p-autocomplete-token-icon'));
        iconEl.nativeElement.click();
        fixture.detectChanges();

        expect(autocomplete.value[0]).toEqual(undefined);
        expect(autocomplete.value.length).toEqual(0);
        flush();
    }));

    it('should delete selectedItem template with backspace', fakeAsync(() => {
        autocomplete3.field = 'brand';
        fixture.detectChanges();

        autocomplete3.selectItem({ brand: 'Volvo' });
        expect(autocomplete3.value.brand).toEqual('Volvo');
        fixture.detectChanges();

        let backspaceEvent = new Event('keydown');
        Object.defineProperty(backspaceEvent, 'which', { value: 8 });
        Object.defineProperty(backspaceEvent, 'preventDefault', { value: () => {} });
        autocomplete3.onKeydown(backspaceEvent);
        fixture.detectChanges();

        expect(autocomplete3.value).toEqual(null);
    }));

    it('should navigate with arrow keys and select with enter', () => {
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.click();
        fixture.detectChanges();

        const selectItemSpy = spyOn(autocomplete, 'selectItem').and.callThrough();
        autocomplete.suggestions = ['Volvo', 'VW'];
        autocomplete.overlayVisible = true;
        let navigateEvent = new Event('keydown');
        Object.defineProperty(navigateEvent, 'which', { value: 40 });
        Object.defineProperty(navigateEvent, 'preventDefault', { value: () => {} });
        autocomplete.onKeydown(navigateEvent);

        let event = new Event('keydown');
        Object.defineProperty(event, 'which', { value: 13 });
        Object.defineProperty(event, 'preventDefault', { value: () => {} });
        autocomplete.onKeydown(event);
        fixture.detectChanges();

        expect(autocomplete.value).toEqual('Volvo');
        expect(selectItemSpy).toHaveBeenCalled();
        expect(testComponent.brand).toEqual(autocomplete.value);
    });

    it('should navigate with arrow keys and select with tab', () => {
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.click();
        fixture.detectChanges();

        const selectItemSpy = spyOn(autocomplete, 'selectItem').and.callThrough();
        autocomplete.suggestions = ['Volvo', 'VW'];
        autocomplete.overlayVisible = true;

        let navigateEvent = new Event('keydown');
        Object.defineProperty(navigateEvent, 'which', { value: 40 });
        Object.defineProperty(navigateEvent, 'preventDefault', { value: () => {} });
        autocomplete.onKeydown(navigateEvent);

        let event = new Event('keydown');
        Object.defineProperty(event, 'which', { value: 9 });
        Object.defineProperty(event, 'preventDefault', { value: () => {} });
        autocomplete.onKeydown(event);
        fixture.detectChanges();
        expect(autocomplete.value).toEqual('Volvo');
        expect(selectItemSpy).toHaveBeenCalled();
        expect(testComponent.brand).toEqual(autocomplete.value);
    });

    it('should escape with esc key', () => {
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.click();
        fixture.detectChanges();

        const selectItemSpy = spyOn(autocomplete, 'selectItem').and.callThrough();
        const hideSpy = spyOn(autocomplete, 'hide').and.callThrough();
        autocomplete.suggestions = ['Volvo', 'VW'];
        autocomplete.overlayVisible = true;
        let event = new Event('keydown');
        Object.defineProperty(event, 'which', { value: 27 });
        Object.defineProperty(event, 'preventDefault', { value: () => {} });

        autocomplete.onKeydown(event);
        fixture.detectChanges();

        expect(autocomplete.value).toEqual(null);
        expect(selectItemSpy).not.toHaveBeenCalled();
        expect(hideSpy).toHaveBeenCalled();
        expect(autocomplete.overlayVisible).toEqual(false);
    });
});
