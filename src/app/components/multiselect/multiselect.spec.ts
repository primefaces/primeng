import { ScrollingModule } from '@angular/cdk/scrolling';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from 'primeng/overlay';
import { TooltipModule } from 'primeng/tooltip';
import { MultiSelect, MultiSelectItem } from './multiselect';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { SearchIcon } from 'primeng/icons/search';
import { TimesIcon } from 'primeng/icons/times';
import { NO_ERRORS_SCHEMA } from '@angular/core';

fdescribe('MultiSelect', () => {
    let multiselect: MultiSelect;
    let multiselectItem: MultiSelectItem;
    let fixture: ComponentFixture<MultiSelect>;
    let fixtureItem: ComponentFixture<MultiSelectItem>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, ScrollingModule, TooltipModule, OverlayModule, SearchIcon, ChevronDownIcon, TimesIcon],
            declarations: [MultiSelect, MultiSelectItem],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(MultiSelect);
        fixtureItem = TestBed.createComponent(MultiSelectItem);

        multiselect = fixture.componentInstance;
        multiselectItem = fixtureItem.componentInstance;
    });

    it('should disabled', () => {
        multiselect.disabled = true;
        const showSpy = spyOn(multiselect, 'onContainerClick').and.callThrough();
        fixture.detectChanges();

        const containerEl = fixture.debugElement.query(By.css('div')).nativeElement;
        const inputReadOnlyEl = fixture.debugElement.query(By.css('div')).nativeElement;
        containerEl.click();
        fixture.detectChanges();

        expect(showSpy).toHaveBeenCalled();
        expect(containerEl.className).toContain('p-disabled');
        expect(inputReadOnlyEl.className).toContain('p-disabled');
        expect(multiselect.overlayVisible).toEqual(undefined);
    });

    it('should set dropdown icon by default and able to change', () => {
        fixture.detectChanges();

        const dropdownIcon = fixture.debugElement.query(By.css('.p-multiselect-trigger-icon')).nativeElement;
        expect(dropdownIcon.tagName.toLowerCase()).toEqual('svg');
        fixture.detectChanges();

        multiselect.dropdownIcon = 'Primeng Rocks!';
        fixture.detectChanges();

        multiselect.cd.detectChanges();
        const dropdownIconEl = fixture.debugElement.query(By.css('.p-multiselect-trigger-icon'));
        expect(dropdownIconEl.nativeElement.className).toContain('Primeng Rocks!');
    });

    it('should change style and styleClass', () => {
        fixture.detectChanges();

        multiselect.style = { height: '300px' };
        multiselect.styleClass = 'Primeng ROCKS!';
        fixture.detectChanges();

        multiselect.cd.detectChanges();
        const multiselectEl = fixture.debugElement.children[0].nativeElement;
        expect(multiselectEl.className).toContain('Primeng ROCKS!');
        expect(multiselectEl.style.height).toContain('300px');
    });

    it('should change panelstyle and panelStyleClass', () => {
        fixture.detectChanges();

        multiselect.panelStyle = { height: '300px' };
        multiselect.panelStyleClass = 'Primeng ROCKS!';
        multiselect.overlayVisible = true;
        fixture.detectChanges();

        multiselect.cd.detectChanges();
        const multiselectPanelEl = fixture.debugElement.query(By.css('.p-multiselect-panel')).nativeElement;
        expect(multiselectPanelEl.className).toContain('Primeng ROCKS!');
        expect(multiselectPanelEl.style.height).toContain('300px');
    });

    it('should open when click', () => {
        fixture.detectChanges();

        const multiselectEl = fixture.debugElement.children[0].nativeElement;
        const clickSpy = spyOn(multiselect, 'onContainerClick').and.callThrough();
        multiselectEl.click();
        fixture.detectChanges();

        const multiselectPanelEl = fixture.debugElement.query(By.css('.p-multiselect-panel'));
        expect(multiselectEl.className).toContain('p-multiselect-open');
        expect(multiselect.overlayVisible).toEqual(true);
        expect(multiselectPanelEl).toBeTruthy();
        expect(clickSpy).toHaveBeenCalled();
    });

    it('should open and close with keydown', () => {
        const onShowSpy = spyOn(multiselect, 'show').and.callThrough();
        const onHideSpy = spyOn(multiselect, 'hide').and.callThrough();

        fixture.detectChanges();

        const multiselectEl = fixture.debugElement.query(By.css('input')).nativeElement;

        multiselectEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }));
        multiselectEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }));
        fixture.detectChanges();

        const multiselectPanelEl = fixture.debugElement.query(By.css('.p-multiselect-panel')).nativeElement;
        fixture.detectChanges();
        expect(multiselect.overlayVisible).toEqual(true);
        expect(multiselectPanelEl).toBeTruthy();

        multiselectEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
        fixture.detectChanges();
        expect(onShowSpy).toHaveBeenCalled();
        expect(onHideSpy).toHaveBeenCalled();
    });

    it('should close when double click', () => {
        fixture.detectChanges();

        const multiselectEl = fixture.debugElement.children[0].nativeElement;
        const clickSpy = spyOn(multiselect, 'onContainerClick').and.callThrough();
        const hideSpy = spyOn(multiselect, 'hide').and.callThrough();
        multiselectEl.click();
        fixture.detectChanges();

        multiselectEl.click();
        fixture.detectChanges();

        expect(multiselectEl.className).not.toContain('p-multiselect-open');
        expect(multiselect.overlayVisible).toEqual(false);
        expect(clickSpy).toHaveBeenCalled();
        expect(hideSpy).toHaveBeenCalled();
    });

    it('should select item', () => {
        multiselect.options = [
            { label: 'Audi', value: 'Audi' },
            { label: 'BMW', value: 'BMW' },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'Ford', value: 'Ford' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'VW', value: 'VW' },
            { label: 'Volvo', value: 'Volvo' }
        ];
        fixture.detectChanges();

        const multiselectEl = fixture.debugElement.children[0].nativeElement;
        multiselectEl.click();
        fixture.detectChanges();

        const multiselectItemEl = fixture.debugElement.queryAll(By.css('.p-multiselect-item'));
        expect(multiselectItemEl.length).toEqual(10);
        const bmwEl = multiselectItemEl[1];
        const onOptionClickSpy = spyOn(multiselectItem, 'onOptionClick').and.callThrough();
        bmwEl.nativeElement.click();
        fixture.detectChanges();

        expect(multiselect.value[0]).toEqual('BMW');
        expect(onOptionClickSpy).toBeTruthy();
    });

    it('should select item and navigate with keydown', () => {
        multiselect.options = [
            { label: 'Audi', value: 'Audi' },
            { label: 'BMW', value: 'BMW' },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'Ford', value: 'Ford' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'VW', value: 'VW' },
            { label: 'Volvo', value: 'Volvo' }
        ];
        fixture.detectChanges();
        const onArrowDownKeySpy = spyOn(multiselect, 'onArrowDownKey').and.callThrough();
        const onArrowUpKeySpy = spyOn(multiselect, 'onArrowUpKey').and.callThrough();

        const multiselectEl = fixture.debugElement.query(By.css('.p-multiselect')).nativeElement;
        multiselectEl.click();
        fixture.detectChanges();
        const multiselectFilterEl = fixture.debugElement.query(By.css('input')).nativeElement;
        multiselectFilterEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
        multiselectFilterEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }));
        multiselectFilterEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
        fixture.detectChanges();

        expect(multiselect.value[0]).toEqual('BMW');
        expect(multiselect.value.length).toEqual(1);
        expect(onArrowUpKeySpy).toHaveBeenCalledTimes(1);
        expect(onArrowDownKeySpy).toHaveBeenCalledTimes(1);
    });

    it('should unselect item', () => {
        multiselect.options = [
            { label: 'Audi', value: 'Audi' },
            { label: 'BMW', value: 'BMW' },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'Ford', value: 'Ford' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'VW', value: 'VW' },
            { label: 'Volvo', value: 'Volvo' }
        ];
        multiselect.selectionLimit = 3;
        multiselect.value = [];
        fixture.detectChanges();

        const multiselectEl = fixture.debugElement.children[0].nativeElement;
        multiselectEl.click();
        fixture.detectChanges();

        const multiselectItemEl = fixture.debugElement.queryAll(By.css('.p-multiselect-item'));
        expect(multiselectItemEl.length).toEqual(10);
        const audiEl = multiselectItemEl[0];
        const bmwEl = multiselectItemEl[1];
        const onOptionClickSpy = spyOn(multiselectItem, 'onOptionClick').and.callThrough();
        bmwEl.nativeElement.click();
        audiEl.nativeElement.click();
        fixture.detectChanges();

        expect(multiselect.value[0]).toEqual('BMW');
        expect(multiselect.value[1]).toEqual('Audi');
        expect(multiselect.value.length).toEqual(2);
        expect(onOptionClickSpy).toBeTruthy();
        audiEl.nativeElement.click();
        fixture.detectChanges();

        expect(multiselect.value.length).toEqual(1);
    });

    it('should not select disabled item', () => {
        multiselect.options = [
            { label: 'Audi', value: 'Audi' },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'BMW', value: 'BMW', disabled: true },
            { label: 'Ford', value: 'Ford' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'VW', value: 'VW' },
            { label: 'Volvo', value: 'Volvo' }
        ];
        fixture.detectChanges();

        const multiselectEl = fixture.debugElement.children[0].nativeElement;
        multiselectEl.click();
        fixture.detectChanges();

        const multiselectItemEl = fixture.debugElement.queryAll(By.css('.p-multiselect-item'));
        expect(multiselectItemEl.length).toEqual(10);
        const fiatEl = multiselectItemEl[1];
        const bmwEl = multiselectItemEl[2];
        const audiEl = multiselectItemEl[0];
        const onOptionClickSpy = spyOn(multiselectItem, 'onOptionClick').and.callThrough();
        bmwEl.nativeElement.click();
        fixture.detectChanges();

        audiEl.nativeElement.click();
        fiatEl.nativeElement.click();
        fixture.detectChanges();

        expect(multiselect.value[0]).not.toEqual('BMW');
        expect(bmwEl.nativeElement.className).not.toContain('p-highlight');
        expect(onOptionClickSpy).toBeTruthy();
    });

    it('should select multiple', () => {
        multiselect.options = [
            { label: 'Audi', value: 'Audi' },
            { label: 'BMW', value: 'BMW' },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'Ford', value: 'Ford' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'VW', value: 'VW' },
            { label: 'Volvo', value: 'Volvo' }
        ];
        multiselect.value = [];
        fixture.detectChanges();

        const multiselectEl = fixture.debugElement.query(By.css('.p-multiselect')).nativeElement;
        const onOptionClickSpy = spyOn(multiselectItem, 'onOptionClick').and.callThrough();
        fixture.detectChanges();
        fixtureItem.detectChanges();

        multiselectEl.click();
        fixture.detectChanges();

        const multiselectItemEl = fixture.debugElement.queryAll(By.css('.p-multiselect-item'));
        fixture.detectChanges();

        expect(multiselectItemEl.length).toEqual(10);
        const bmwEl = multiselectItemEl[1];
        const fiatEl = multiselectItemEl[2];
        const fordEl = multiselectItemEl[3];

        bmwEl.nativeElement.click();
        fiatEl.nativeElement.click();
        fordEl.nativeElement.click();

        fixture.detectChanges();
        fixtureItem.detectChanges();

        expect(multiselect.value[2]).toEqual('Ford');
        expect(multiselect.value.length).toEqual(3);
        expect(onOptionClickSpy).toBeTruthy();
    });

    it('should select multiple with selection limit', () => {
        multiselect.options = [
            { label: 'Audi', value: 'Audi' },
            { label: 'BMW', value: 'BMW' },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'Ford', value: 'Ford' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'VW', value: 'VW' },
            { label: 'Volvo', value: 'Volvo' }
        ];
        multiselect.value = [];
        multiselect.selectionLimit = 2;
        fixture.detectChanges();

        const multiselectEl = fixture.debugElement.query(By.css('.p-multiselect')).nativeElement;
        const onOptionClickSpy = spyOn(multiselectItem, 'onOptionClick').and.callThrough();
        fixture.detectChanges();
        fixtureItem.detectChanges();

        multiselectEl.click();
        fixture.detectChanges();

        const multiselectItemEl = fixture.debugElement.queryAll(By.css('.p-multiselect-item'));
        fixture.detectChanges();

        expect(multiselectItemEl.length).toEqual(10);
        const bmwEl = multiselectItemEl[1];
        const fordEl = multiselectItemEl[3];
        const fiatEl = multiselectItemEl[2];

        bmwEl.nativeElement.click();
        fordEl.nativeElement.click();
        fiatEl.nativeElement.click();
        fixture.detectChanges();
        fixtureItem.detectChanges();

        expect(multiselect.value[0]).toEqual('BMW');
        expect(multiselect.value[1]).toEqual('Ford');
        expect(multiselect.value.length).toEqual(2);
        expect(fiatEl.nativeElement.className).not.toContain('p-highlight');
        expect(onOptionClickSpy).toBeTruthy();
    });

    it('should select all', () => {
        multiselect.options = [
            { label: 'Audi', value: 'Audi' },
            { label: 'BMW', value: 'BMW' },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'Ford', value: 'Ford' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'VW', value: 'VW' },
            { label: 'Volvo', value: 'Volvo' }
        ];
        fixture.detectChanges();

        const multiselectEl = fixture.debugElement.children[0].nativeElement;
        const itemClickSpy = spyOn(multiselect, 'onToggleAll').and.callThrough();
        multiselectEl.click();
        fixture.detectChanges();

        const allCheckedEl = fixture.debugElement.query(By.css('.p-checkbox-box')).nativeElement;
        const readOnlyEl = fixture.debugElement.query(By.css('.p-checkbox')).children[0].children[0].nativeElement;
        readOnlyEl.dispatchEvent(new Event('focus'));
        allCheckedEl.click();
        fixture.detectChanges();

        expect(multiselect.value.length).toEqual(10);
        expect(itemClickSpy).toHaveBeenCalled();
    });

    it('should select all when filtered', () => {
        multiselect.options = [
            { label: 'Audi', value: 'Audi' },
            { label: 'BMW', value: 'BMW' },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'Ford', value: 'Ford' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'VW', value: 'VW' },
            { label: 'Volvo', value: 'Volvo' }
        ];
        fixture.detectChanges();

        const onInputFocusSpy = spyOn(multiselect, 'onInputFocus').and.callThrough();
        const onInputBlur = spyOn(multiselect, 'onInputBlur').and.callThrough();
        const multiselectEl = fixture.debugElement.children[0].nativeElement;
        const readOnlyEl = fixture.debugElement.query(By.css('input')).nativeElement;
        readOnlyEl.dispatchEvent(new Event('focus'));
        multiselectEl.click();
        fixture.detectChanges();

        readOnlyEl.dispatchEvent(new Event('blur'));
        const filterInputEl = fixture.debugElement.query(By.css('.p-inputtext')).nativeElement;
        filterInputEl.value = 'v';
        filterInputEl.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        const allCheckedEl = fixture.debugElement.query(By.css('.p-checkbox-box')).nativeElement;
        allCheckedEl.click();
        fixture.detectChanges();

        expect(multiselect.value.length).toEqual(2);
        expect(onInputFocusSpy).toHaveBeenCalled();
        expect(onInputBlur).toHaveBeenCalled();
    });

    it('should unselect all', () => {
        multiselect.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        multiselect.optionLabel = 'name';
        fixture.detectChanges();

        const multiselectEl = fixture.debugElement.children[0].nativeElement;
        const toggleSpy = spyOn(multiselect, 'onToggleAll').and.callThrough();
        multiselectEl.click();
        fixture.detectChanges();

        let allCheckedEl = fixture.debugElement.query(By.css('.p-checkbox-box')).nativeElement;
        allCheckedEl.click();
        fixture.detectChanges();

        expect(multiselect.value.length).toEqual(5);
        expect(toggleSpy).toHaveBeenCalled();
        allCheckedEl.click();
        fixture.detectChanges();

        expect(multiselect.value.length).toEqual(0);
    });

    it('should filtered', () => {
        multiselect.options = [
            { label: 'Audi', value: 'Audi' },
            { label: 'BMW', value: 'BMW' },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'Ford', value: 'Ford' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'VW', value: 'VW' },
            { label: 'Volvo', value: 'Volvo' }
        ];
        fixture.detectChanges();

        const multiselectEl = fixture.debugElement.children[0].nativeElement;
        multiselectEl.click();
        fixture.detectChanges();

        const filterInputEl = fixture.debugElement.query(By.css('.p-inputtext')).nativeElement;
        filterInputEl.value = 'f';
        filterInputEl.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(multiselect.visibleOptions().length).toEqual(2);
    });

    it('should close with close icon and reset filter input', () => {
        multiselect.options = [
            { label: 'Audi', value: 'Audi' },
            { label: 'BMW', value: 'BMW' },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'Ford', value: 'Ford' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'VW', value: 'VW' },
            { label: 'Volvo', value: 'Volvo' }
        ];

        fixture.detectChanges();

        multiselect.resetFilterOnHide = true;
        const multiselectEl = fixture.debugElement.children[0].nativeElement;
        multiselectEl.click();
        fixture.detectChanges();

        const filterInputEl = fixture.debugElement.query(By.css('.p-inputtext')).nativeElement;
        filterInputEl.value = 'f';
        filterInputEl.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(multiselect.visibleOptions().length).toEqual(2);
        const closeEl = fixture.debugElement.query(By.css('.p-multiselect-close'));
        closeEl.nativeElement.click();
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div')).nativeElement.className).not.toContain('p-multiselect-open');
    });

    it('should display not found message when filter returns 0 results', () => {
        multiselect.options = [
            { label: 'Audi', value: 'Audi' },
            { label: 'BMW', value: 'BMW' },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'Ford', value: 'Ford' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'VW', value: 'VW' },
            { label: 'Volvo', value: 'Volvo' }
        ];
        fixture.detectChanges();

        const multiselectEl = fixture.debugElement.children[0].nativeElement;
        multiselectEl.click();
        fixture.detectChanges();

        const filterInputEl = fixture.debugElement.query(By.css('.p-inputtext')).nativeElement;
        filterInputEl.value = '1';
        filterInputEl.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        multiselect.cd.detectChanges();
        const visibleItems = fixture.debugElement.queryAll(By.css('.p-multiselect-items li')).filter((el) => el.styles.display !== 'none');
        const emptyMesage = fixture.debugElement.query(By.css('.p-multiselect-empty-message'));
        expect(visibleItems.length).toEqual(1);
        expect(emptyMesage).toBeTruthy();
        expect(emptyMesage.nativeElement.textContent).toContain('No results found');
    });
});
