import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { SelectButton, SelectButtonModule } from './selectbutton';

describe('SelectButton', () => {
    let component: SelectButton;
    let fixture: ComponentFixture<SelectButton>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SelectButton, SelectButtonModule, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, TestSelectButtonPTemplateComponent, TestSelectButtonRefTemplateComponent],
            declarations: [TestFormSelectButtonComponent, TestPrimeTemplateSelectButtonComponent],
            providers: [provideZonelessChangeDetection()]
        }).compileComponents();

        fixture = TestBed.createComponent(SelectButton);
        component = fixture.componentInstance;
    });

    describe('Component Initialization', () => {
        it('should create the component', () => {
            expect(component).toBeTruthy();
        });

        it('should have default values', () => {
            expect(component.multiple()).toBe(false);
            expect(component.allowEmpty()).toBe(true);
            expect(component.tabindex()).toBe(0);
            expect(component.focusedIndex()).toBe(0);
            expect(component.unselectable()).toBe(false);
        });

        it('should accept custom values', async () => {
            fixture.componentRef.setInput('options', [{ label: 'Option 1', value: 'opt1' }]);
            fixture.componentRef.setInput('multiple', true);
            fixture.componentRef.setInput('allowEmpty', false);
            fixture.componentRef.setInput('styleClass', 'custom-class');

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(component.options()?.length).toBe(1);
            expect(component.multiple()).toBe(true);
            expect(component.allowEmpty()).toBe(false);
            expect(component.styleClass()).toBe('custom-class');
        });

        it('should set unselectable property correctly', () => {
            fixture.componentRef.setInput('unselectable', true);
            expect(component.unselectable()).toBe(true);
            expect(component.$allowEmpty()).toBe(false);

            fixture.componentRef.setInput('unselectable', false);
            expect(component.unselectable()).toBe(false);
            expect(component.$allowEmpty()).toBe(true);
        });
    });

    describe('Public Methods', () => {
        const testOptions = [
            { label: 'Option 1', value: 'opt1' },
            { label: 'Option 2', value: 'opt2' },
            { label: 'Option 3', value: 'opt3', disabled: true }
        ];

        beforeEach(async () => {
            fixture.componentRef.setInput('options', testOptions);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
        });

        it('should get option label correctly', () => {
            expect(component.getOptionLabel(component.options()![0])).toBe('Option 1');

            fixture.componentRef.setInput('optionLabel', 'label');
            expect(component.getOptionLabel({ label: 'Custom Label' })).toBe('Custom Label');

            // Test with object that has no label property - should return the object itself
            fixture.componentRef.setInput('optionLabel', undefined);
            const objectOption = { name: 'Test Object', id: 1 };
            const result = component.getOptionLabel(objectOption);
            expect(result).toEqual(objectOption);
        });

        it('should get option value correctly', () => {
            expect(component.getOptionValue(component.options()![0])).toBe('opt1');

            fixture.componentRef.setInput('optionValue', 'value');
            expect(component.getOptionValue({ value: 'custom-value' })).toBe('custom-value');

            fixture.componentRef.setInput('optionValue', undefined);
            fixture.componentRef.setInput('optionLabel', undefined);
            expect(component.getOptionValue({ id: 1, name: 'Test' })).toEqual({ id: 1, name: 'Test' });
        });

        it('should check if option is disabled', () => {
            expect(component.isOptionDisabled(component.options()![0])).toBe(false);
            expect(component.isOptionDisabled(component.options()![2])).toBe(true);

            fixture.componentRef.setInput('optionDisabled', 'disabled');
            expect(component.isOptionDisabled({ disabled: true })).toBe(true);
            expect(component.isOptionDisabled({ disabled: false })).toBe(false);
        });

        it('should check if option is selected in single mode', () => {
            component.value.set('opt1');
            expect(component.isSelected(component.options()![0])).toBe(true);
            expect(component.isSelected(component.options()![1])).toBe(false);
        });

        it('should check if option is selected in multiple mode', () => {
            fixture.componentRef.setInput('multiple', true);
            component.value.set(['opt1', 'opt2']);

            expect(component.isSelected(component.options()![0])).toBe(true);
            expect(component.isSelected(component.options()![1])).toBe(true);
            expect(component.isSelected(component.options()![2])).toBe(false);
        });

        it('should remove option from value array', () => {
            fixture.componentRef.setInput('multiple', true);
            component.value.set(['opt1', 'opt2']);

            component.removeOption(component.options()![0]);

            expect(component.value()).toEqual(['opt2']);
        });

        it('should get correct allow empty value for single mode', () => {
            fixture.componentRef.setInput('allowEmpty', true);
            expect(component.getAllowEmpty()).toBe(true);

            fixture.componentRef.setInput('allowEmpty', false);
            expect(component.getAllowEmpty()).toBe(false);
        });

        it('should get correct allow empty value for multiple mode', () => {
            fixture.componentRef.setInput('multiple', true);
            fixture.componentRef.setInput('allowEmpty', false);
            component.value.set(['opt1']);

            expect(component.getAllowEmpty()).toBe(false);

            component.value.set(['opt1', 'opt2']);
            expect(component.getAllowEmpty()).toBe(true);
        });

        it('should handle option selection in single mode', () => {
            const mockEvent = { originalEvent: new Event('click'), checked: true };
            component.onOptionSelect(mockEvent as any, component.options()![0], 0);

            expect(component.value()).toBe('opt1');
            expect(component.focusedIndex()).toBe(0);
        });

        it('should handle option selection in multiple mode', () => {
            fixture.componentRef.setInput('multiple', true);
            const mockEvent = { originalEvent: new Event('click'), checked: true };

            component.onOptionSelect(mockEvent as any, component.options()![0], 0);
            expect(component.value()).toEqual(['opt1']);

            component.onOptionSelect(mockEvent as any, component.options()![1], 1);
            expect(component.value()).toEqual(['opt1', 'opt2']);
        });

        it('should handle deselection in multiple mode', () => {
            fixture.componentRef.setInput('multiple', true);
            component.value.set(['opt1', 'opt2']);
            const mockEvent = { originalEvent: new Event('click'), checked: false };

            component.onOptionSelect(mockEvent as any, component.options()![0], 0);
            expect(component.value()).toEqual(['opt2']);
        });

        it('should not select disabled options', () => {
            const mockEvent = { originalEvent: new Event('click'), checked: true };
            component.onOptionSelect(mockEvent as any, component.options()![2], 2);

            expect(component.value()).toBeNull();
        });

        it('should emit onChange and onOptionClick events', () => {
            spyOn(component.onChange, 'emit');
            spyOn(component.onOptionClick, 'emit');

            const originalEvent = new Event('click');
            const mockEvent = { originalEvent, checked: true };
            component.onOptionSelect(mockEvent as any, component.options()![0], 0);

            expect(component.onChange.emit).toHaveBeenCalledWith({
                originalEvent: originalEvent,
                value: component.value()
            });

            expect(component.onOptionClick.emit).toHaveBeenCalledWith({
                originalEvent: originalEvent,
                option: component.options()![0],
                index: 0
            });
        });
    });

    describe('Form Integration', () => {
        let formTestComponent: TestFormSelectButtonComponent;
        let formTestFixture: ComponentFixture<TestFormSelectButtonComponent>;

        beforeEach(() => {
            formTestFixture = TestBed.createComponent(TestFormSelectButtonComponent);
            formTestComponent = formTestFixture.componentInstance;
            formTestFixture.detectChanges();
        });

        it('should work with reactive forms', async () => {
            formTestComponent.form.patchValue({ selectedValue: 'option2' });
            formTestFixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await formTestFixture.whenStable();

            expect(formTestComponent.form.value.selectedValue).toBe('option2' as any);
        });

        it('should validate required field', async () => {
            expect(formTestComponent.form.invalid).toBe(true);

            formTestComponent.form.patchValue({ selectedValue: 'option1' });
            formTestFixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await formTestFixture.whenStable();

            expect(formTestComponent.form.valid).toBe(true);
        });

        it('should handle form reset', async () => {
            formTestComponent.form.patchValue({ selectedValue: 'option1' });
            formTestFixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await formTestFixture.whenStable();

            formTestComponent.form.reset();
            formTestFixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await formTestFixture.whenStable();

            expect(formTestComponent.form.pristine).toBe(true);
        });
    });

    describe('Template and Content Projection', () => {
        it('should support item template via contentChild', () => {
            const templateFixture = TestBed.createComponent(TestSelectButtonRefTemplateComponent);
            const selectButtonInstance = templateFixture.debugElement.query(By.css('p-selectbutton')).componentInstance;

            templateFixture.detectChanges();

            expect(selectButtonInstance).toBeTruthy();
            expect(selectButtonInstance.itemTemplate).toBeDefined();
        });
    });

    describe('Edge Cases', () => {
        it('should handle null/undefined options', () => {
            fixture.componentRef.setInput('options', null);
            expect(() => fixture.detectChanges()).not.toThrow();

            fixture.componentRef.setInput('options', undefined);
            expect(() => fixture.detectChanges()).not.toThrow();
        });

        it('should handle empty options array', () => {
            fixture.componentRef.setInput('options', []);
            expect(() => fixture.detectChanges()).not.toThrow();
        });

        it('should handle options with missing properties', () => {
            const testOptions = [{ value: 'opt1' }, { label: 'Option 2' }, {}];
            fixture.componentRef.setInput('options', testOptions);

            expect(() => fixture.detectChanges()).not.toThrow();
            expect(component.getOptionLabel(component.options()![0])).toBe(component.options()![0]);
            expect(component.getOptionValue(component.options()![1])).toBe(component.options()![1]);
        });

        it('should handle selection with dataKey', async () => {
            fixture.componentRef.setInput('dataKey', 'id');
            fixture.componentRef.setInput('options', [
                { id: 1, label: 'Option 1' },
                { id: 2, label: 'Option 2' }
            ]);
            component.value.set({ id: 1, label: 'Option 1' });

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(component.isSelected(component.options()![0])).toBe(true);
            expect(component.isSelected(component.options()![1])).toBe(false);
        });

        it('should handle rapid selection changes', async () => {
            fixture.componentRef.setInput('options', [
                { label: 'Option 1', value: 'opt1' },
                { label: 'Option 2', value: 'opt2' }
            ]);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            for (let i = 0; i < 5; i++) {
                const optionIndex = i % 2;
                const mockEvent = { originalEvent: new Event('click'), checked: true };
                component.onOptionSelect(mockEvent as any, component.options()![optionIndex], optionIndex);
                await new Promise((resolve) => setTimeout(resolve, 10));
                await fixture.whenStable();
            }

            expect(component.value()).toBeDefined();
        });

        it('should handle unselectable option correctly', () => {
            fixture.componentRef.setInput('options', [
                { label: 'Option 1', value: 'opt1' },
                { label: 'Option 2', value: 'opt2' }
            ]);
            fixture.componentRef.setInput('unselectable', false);
            fixture.componentRef.setInput('allowEmpty', false);
            component.value.set('opt1');

            const mockEvent = { originalEvent: new Event('click'), checked: false };
            component.onOptionSelect(mockEvent as any, component.options()![0], 0);

            expect(component.value()).toBe('opt1');
        });

        it('should handle disabled component', async () => {
            fixture.componentRef.setInput('options', [
                { label: 'Option 1', value: 'opt1' },
                { label: 'Option 2', value: 'opt2' }
            ]);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            // Mock the disabled state by creating a spy
            spyOn(component, '$disabled').and.returnValue(true);
            const mockEvent = { originalEvent: new Event('click'), checked: true };
            const initialValue = component.value();

            component.onOptionSelect(mockEvent as any, component.options()![0], 0);

            expect(component.value()).toBe(initialValue);
        });
    });

    describe('Accessibility and Events', () => {
        it('should handle focus events', () => {
            component.onFocus(new Event('focus'), 1);
            expect(component.focusedIndex()).toBe(1);
        });

        it('should handle blur events', () => {
            expect(() => component.onBlur()).not.toThrow();
        });

        it('should change tab indexes correctly', async () => {
            fixture.componentRef.setInput('options', [
                { label: 'Option 1', value: 'opt1' },
                { label: 'Option 2', value: 'opt2' },
                { label: 'Option 3', value: 'opt3' }
            ]);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            const mockEvent = new Event('keydown');
            expect(() => component.changeTabIndexes(mockEvent, 'next')).not.toThrow();
            expect(() => component.changeTabIndexes(mockEvent, 'prev')).not.toThrow();
        });

        it('should have correct equalityKey', () => {
            // Initially equalityKey computed returns null when no dataKey is set
            expect(component.equalityKey()).toBeFalsy();

            fixture.componentRef.setInput('dataKey', 'id');
            expect(component.equalityKey()).toBe('id');

            fixture.componentRef.setInput('optionValue', 'value');
            fixture.componentRef.setInput('dataKey', undefined);
            expect(component.equalityKey()).toBeFalsy();
        });
    });

    describe('Input Properties', () => {
        it('should handle size input', () => {
            fixture.componentRef.setInput('size', 'small');
            expect(component.size()).toBe('small');

            fixture.componentRef.setInput('size', 'large');
            expect(component.size()).toBe('large');
        });

        it('should handle fluid input', () => {
            fixture.componentRef.setInput('fluid', true);
            expect(component.fluid()).toBe(true);

            fixture.componentRef.setInput('fluid', false);
            expect(component.fluid()).toBe(false);
        });

        it('should handle styleClass input', () => {
            fixture.componentRef.setInput('styleClass', 'custom-class');
            expect(component.styleClass()).toBe('custom-class');
        });

        it('should handle ariaLabelledBy input', () => {
            fixture.componentRef.setInput('ariaLabelledBy', 'test-label');
            expect(component.ariaLabelledBy()).toBe('test-label');
        });
    });
});

// Test Components
@Component({
    standalone: false,
    template: `
        <form [formGroup]="form">
            <p-selectbutton [options]="options" formControlName="selectedValue"> </p-selectbutton>
        </form>
    `
})
class TestFormSelectButtonComponent {
    form = new FormGroup({
        selectedValue: new FormControl<string | null>(null, Validators.required)
    });

    options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' }
    ];
}

@Component({
    standalone: false,
    template: `
        <p-selectbutton [options]="options">
            <ng-template #item let-option let-index="index">
                <div class="prime-template-content">Prime: {{ option.label }}</div>
            </ng-template>
        </p-selectbutton>
    `
})
class TestPrimeTemplateSelectButtonComponent {
    options = [
        { label: 'Option A', value: 'optionA' },
        { label: 'Option B', value: 'optionB' }
    ];
}

// SelectButton #item template component
@Component({
    standalone: true,
    imports: [SelectButton, FormsModule, CommonModule, SharedModule],
    template: `
        <p-selectbutton [(ngModel)]="selectedValue" [options]="options">
            <!-- Item template with #item reference -->
            <ng-template #item let-option let-index="index">
                <span class="custom-template-item" [attr.data-testid]="'item-' + index" [title]="'Template item: ' + option.label + ' at index ' + index">
                    <i class="pi pi-star"></i>
                    {{ option.label }} ({{ option.value }})
                </span>
            </ng-template>
        </p-selectbutton>
    `
})
class TestSelectButtonPTemplateComponent {
    selectedValue: string | undefined;
    options = [
        { label: 'Option One', value: 'opt1' },
        { label: 'Option Two', value: 'opt2' },
        { label: 'Option Three', value: 'opt3' }
    ];
}

// SelectButton #template reference component
@Component({
    standalone: true,
    imports: [SelectButton, FormsModule, CommonModule, SharedModule],
    template: `
        <p-selectbutton [(ngModel)]="selectedValue" [options]="options">
            <!-- Item template with #template reference -->
            <ng-template #item let-option let-index="index">
                <span class="custom-ref-item" [attr.data-testid]="'ref-item-' + index" [title]="'Reference item: ' + option.label + ' at index ' + index">
                    <i class="pi pi-heart"></i>
                    {{ option.label }} [{{ option.value }}]
                </span>
            </ng-template>
        </p-selectbutton>
    `
})
class TestSelectButtonRefTemplateComponent {
    selectedValue: string | undefined;
    options = [
        { label: 'Item One', value: 'item1' },
        { label: 'Item Two', value: 'item2' },
        { label: 'Item Three', value: 'item3' }
    ];
}

describe('SelectButton Template Reference Tests', () => {
    let component: TestSelectButtonPTemplateComponent;
    let fixture: ComponentFixture<TestSelectButtonPTemplateComponent>;
    let selectButtonInstance: SelectButton;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestSelectButtonPTemplateComponent],
            providers: [provideZonelessChangeDetection()]
        }).compileComponents();

        fixture = TestBed.createComponent(TestSelectButtonPTemplateComponent);
        component = fixture.componentInstance;
        selectButtonInstance = fixture.debugElement.query(By.directive(SelectButton)).componentInstance;
        fixture.detectChanges();
    });

    it('should create component with #item template', async () => {
        expect(component).toBeTruthy();
        expect(selectButtonInstance).toBeTruthy();
        expect(selectButtonInstance.itemTemplate).toBeDefined();
    });

    it('should pass context parameters to item template', async () => {
        // Verify that the select button component is working with options
        expect(selectButtonInstance.options()).toBeDefined();
        expect(selectButtonInstance.options()?.length).toBe(3);
        expect(component.options.length).toBe(3);
    });

    it('should render templates with correct context', async () => {
        // Test with different selected values
        component.selectedValue = 'opt1';
        fixture.detectChanges();
        await new Promise((resolve) => setTimeout(resolve, 100));
        await fixture.whenStable();

        expect(selectButtonInstance.value()).toBe('opt1');
        expect(component.selectedValue).toBe('opt1');
    });

    it('should update templates when selection changes', async () => {
        // Initially no selection
        expect(selectButtonInstance.value()).toBeFalsy();

        // Select option
        component.selectedValue = 'opt2';
        fixture.detectChanges();
        await new Promise((resolve) => setTimeout(resolve, 100));
        await fixture.whenStable();

        expect(selectButtonInstance.value()).toBe('opt2');
    });

    it('should apply context to templates correctly', async () => {
        component.selectedValue = 'opt3';
        fixture.detectChanges();
        await new Promise((resolve) => setTimeout(resolve, 100));
        await fixture.whenStable();

        // Verify that the select button component works correctly
        expect(selectButtonInstance.value()).toBe('opt3');
        expect(selectButtonInstance.isSelected(component.options![2])).toBe(true);
    });
});

describe('SelectButton Ref Template Tests', () => {
    let component: TestSelectButtonRefTemplateComponent;
    let fixture: ComponentFixture<TestSelectButtonRefTemplateComponent>;
    let selectButtonInstance: SelectButton;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestSelectButtonRefTemplateComponent],
            providers: [provideZonelessChangeDetection()]
        }).compileComponents();

        fixture = TestBed.createComponent(TestSelectButtonRefTemplateComponent);
        component = fixture.componentInstance;
        selectButtonInstance = fixture.debugElement.query(By.directive(SelectButton)).componentInstance;
        fixture.detectChanges();
    });

    it('should create component with #item template references', async () => {
        expect(component).toBeTruthy();
        expect(selectButtonInstance).toBeTruthy();
        expect(selectButtonInstance.itemTemplate).toBeDefined();
    });

    it('should pass context parameters to item template', async () => {
        // Verify that the select button component is working with options
        expect(selectButtonInstance.options()).toBeDefined();
        expect(selectButtonInstance.options()?.length).toBe(3);
        expect(component.options.length).toBe(3);
    });

    it('should render templates with correct context', async () => {
        // Test with different selected values
        component.selectedValue = 'item1';
        fixture.detectChanges();
        await new Promise((resolve) => setTimeout(resolve, 100));
        await fixture.whenStable();

        expect(selectButtonInstance.value()).toBe('item1');
        expect(component.selectedValue).toBe('item1');
    });

    it('should update templates when selection changes', async () => {
        // Initially no selection
        expect(selectButtonInstance.value()).toBeFalsy();

        // Select option
        component.selectedValue = 'item2';
        fixture.detectChanges();
        await new Promise((resolve) => setTimeout(resolve, 100));
        await fixture.whenStable();

        expect(selectButtonInstance.value()).toBe('item2');
    });

    it('should apply context to templates correctly', async () => {
        component.selectedValue = 'item3';
        fixture.detectChanges();
        await new Promise((resolve) => setTimeout(resolve, 100));
        await fixture.whenStable();

        // Verify that the select button component works correctly
        expect(selectButtonInstance.value()).toBe('item3');
        expect(selectButtonInstance.isSelected(component.options![2])).toBe(true);
    });
});

describe('SelectButton PassThrough Tests', () => {
    let fixture: ComponentFixture<SelectButton>;
    let component: SelectButton;
    let hostElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SelectButton, SelectButtonModule, FormsModule, CommonModule],
            providers: [provideZonelessChangeDetection()]
        }).compileComponents();

        fixture = TestBed.createComponent(SelectButton);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('options', ['One-Way', 'Return']);
        fixture.changeDetectorRef.markForCheck();
        await fixture.whenStable();
        hostElement = fixture.nativeElement;
    });

    describe('PT Case 1: Simple string classes', () => {
        it('should apply simple string class to host', () => {
            fixture.componentRef.setInput('pt', { host: 'HOST_CLASS' });
            fixture.detectChanges();

            expect(hostElement.classList.contains('HOST_CLASS')).toBe(true);
        });

        it('should apply simple string class to root', () => {
            fixture.componentRef.setInput('pt', { root: 'ROOT_CLASS' });
            fixture.detectChanges();

            expect(hostElement.classList.contains('ROOT_CLASS')).toBe(true);
        });

        it('should apply simple string classes to both host and root', () => {
            fixture.componentRef.setInput('pt', {
                host: 'HOST_CLASS',
                root: 'ROOT_CLASS'
            });
            fixture.detectChanges();

            expect(hostElement.classList.contains('HOST_CLASS')).toBe(true);
            expect(hostElement.classList.contains('ROOT_CLASS')).toBe(true);
        });
    });

    describe('PT Case 2: Objects with class, style, and attributes', () => {
        it('should apply object with class to root', () => {
            fixture.componentRef.setInput('pt', {
                root: {
                    class: 'PT_ROOT_OBJECT_CLASS'
                }
            });
            fixture.detectChanges();

            expect(hostElement.classList.contains('PT_ROOT_OBJECT_CLASS')).toBe(true);
        });

        it('should apply object with style to root', () => {
            fixture.componentRef.setInput('pt', {
                root: {
                    style: { 'background-color': 'red' }
                }
            });
            fixture.detectChanges();

            expect(hostElement.style.backgroundColor).toBe('red');
        });

        it('should apply object with data attributes to root', () => {
            fixture.componentRef.setInput('pt', {
                root: {
                    'data-p-test': 'true'
                }
            });
            fixture.detectChanges();

            expect(hostElement.getAttribute('data-p-test')).toBe('true');
        });

        it('should apply object with aria attributes to root', () => {
            fixture.componentRef.setInput('pt', {
                root: {
                    'aria-label': 'TEST_ARIA_LABEL'
                }
            });
            fixture.detectChanges();

            expect(hostElement.getAttribute('aria-label')).toBe('TEST_ARIA_LABEL');
        });

        it('should apply multiple properties at once', () => {
            fixture.componentRef.setInput('pt', {
                root: {
                    class: 'MULTI_CLASS',
                    style: { color: 'blue' },
                    'data-test': 'value',
                    'aria-label': 'MULTI_ARIA'
                }
            });
            fixture.detectChanges();

            expect(hostElement.classList.contains('MULTI_CLASS')).toBe(true);
            expect(hostElement.style.color).toBe('blue');
            expect(hostElement.getAttribute('data-test')).toBe('value');
            expect(hostElement.getAttribute('aria-label')).toBe('MULTI_ARIA');
        });
    });

    describe('PT Case 3: Mixed object and string values', () => {
        it('should apply mixed string and object PT options', () => {
            fixture.componentRef.setInput('pt', {
                host: 'HOST_STRING',
                root: {
                    class: 'ROOT_OBJECT_CLASS',
                    style: { 'border-color': 'green' }
                }
            });
            fixture.detectChanges();

            expect(hostElement.classList.contains('HOST_STRING')).toBe(true);
            expect(hostElement.classList.contains('ROOT_OBJECT_CLASS')).toBe(true);
            expect(hostElement.style.borderColor).toBe('green');
        });
    });

    describe('PT Case 4: Use variables from instance', () => {
        it('should access instance variables in PT function', async () => {
            component.value.set('One-Way');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.componentRef.setInput('pt', {
                root: ({ instance }: any) => ({
                    class: instance?.value() ? 'HAS_VALUE' : ''
                })
            });
            fixture.detectChanges();

            expect(hostElement.classList.contains('HAS_VALUE')).toBe(true);
        });

        it('should conditionally apply styles based on instance state', async () => {
            component.value.set('Return');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.componentRef.setInput('pt', {
                root: ({ instance }: any) => ({
                    style: {
                        'background-color': instance?.value() === 'Return' ? 'yellow' : 'red'
                    }
                })
            });
            fixture.detectChanges();

            expect(hostElement.style.backgroundColor).toBe('yellow');
        });

        it('should access multiple instance properties', async () => {
            component.value.set('One-Way');
            fixture.componentRef.setInput('multiple', true);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.componentRef.setInput('pt', {
                root: ({ instance }: any) => ({
                    class: (instance?.multiple() ? 'MULTIPLE_MODE ' : '') + (instance?.value() ? 'HAS_SELECTION' : '')
                })
            });
            fixture.detectChanges();

            expect(hostElement.classList.contains('MULTIPLE_MODE')).toBe(true);
            expect(hostElement.classList.contains('HAS_SELECTION')).toBe(true);
        });
    });

    describe('PT Case 5: Event binding', () => {
        it('should handle onclick event through PT', (done) => {
            let clicked = false;
            fixture.componentRef.setInput('pt', {
                root: {
                    onclick: () => {
                        clicked = true;
                        done();
                    }
                }
            });
            fixture.detectChanges();

            hostElement.click();
            expect(clicked).toBe(true);
        });

        it('should modify instance through PT event', () => {
            fixture.componentRef.setInput('pt', {
                root: ({ instance }: any) => ({
                    onclick: () => {
                        instance.value.set('MODIFIED');
                    }
                })
            });
            fixture.detectChanges();

            hostElement.click();
            expect(component.value()).toBe('MODIFIED');
        });
    });

    describe('PT Case 6: Inline PT', () => {
        it('should work with inline string PT', () => {
            const inlineFixture = TestBed.createComponent(TestInlineStringPTComponent);
            inlineFixture.detectChanges();

            const inlineHostElement = inlineFixture.nativeElement.querySelector('p-selectbutton');
            expect(inlineHostElement.classList.contains('INLINE_STRING')).toBe(true);
        });

        it('should work with inline object PT', () => {
            const inlineFixture = TestBed.createComponent(TestInlineObjectPTComponent);
            inlineFixture.detectChanges();

            const inlineHostElement = inlineFixture.nativeElement.querySelector('p-selectbutton');
            expect(inlineHostElement.classList.contains('INLINE_OBJECT_CLASS')).toBe(true);
            expect(inlineHostElement.getAttribute('data-inline')).toBe('true');
        });
    });

    describe('PT Case 7: Global PT from PrimeNGConfig', () => {
        it('should apply global PT configuration to all instances', async () => {
            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [SelectButton, SelectButtonModule, FormsModule, CommonModule],
                providers: [
                    provideZonelessChangeDetection(),
                    providePrimeNG({
                        pt: {
                            selectButton: {
                                host: { 'aria-label': 'GLOBAL_ARIA_LABEL' },
                                root: 'GLOBAL_CLASS'
                            }
                        }
                    })
                ]
            }).compileComponents();

            const globalFixture = TestBed.createComponent(SelectButton);
            globalFixture.componentRef.setInput('options', ['One', 'Two']);
            globalFixture.changeDetectorRef.markForCheck();
            await globalFixture.whenStable();
            globalFixture.detectChanges();

            const globalHostElement = globalFixture.nativeElement;
            expect(globalHostElement.classList.contains('GLOBAL_CLASS')).toBe(true);
            expect(globalHostElement.getAttribute('aria-label')).toBe('GLOBAL_ARIA_LABEL');
        });

        it('should apply global PT to multiple component instances', async () => {
            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [SelectButton, SelectButtonModule, FormsModule, CommonModule, TestMultipleInstancesComponent],
                providers: [
                    provideZonelessChangeDetection(),
                    providePrimeNG({
                        pt: {
                            selectButton: {
                                root: {
                                    class: 'MULTI_GLOBAL_CLASS',
                                    'data-global': 'true'
                                }
                            }
                        }
                    })
                ]
            }).compileComponents();

            const multiFixture = TestBed.createComponent(TestMultipleInstancesComponent);
            multiFixture.detectChanges();

            const selectButtons = multiFixture.nativeElement.querySelectorAll('p-selectbutton');
            expect(selectButtons.length).toBe(2);

            selectButtons.forEach((btn: HTMLElement) => {
                expect(btn.classList.contains('MULTI_GLOBAL_CLASS')).toBe(true);
                expect(btn.getAttribute('data-global')).toBe('true');
            });
        });
    });

    describe('PT Case 8: Lifecycle hooks', () => {
        it('should support onInit hook', async () => {
            const hooksCalled: string[] = [];
            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [SelectButton, SelectButtonModule, FormsModule, CommonModule],
                providers: [
                    provideZonelessChangeDetection(),
                    providePrimeNG({
                        pt: {
                            selectButton: {
                                hooks: {
                                    onInit: () => {
                                        hooksCalled.push('onInit');
                                    }
                                }
                            }
                        }
                    })
                ]
            }).compileComponents();

            const hookFixture = TestBed.createComponent(SelectButton);
            hookFixture.componentRef.setInput('options', ['A', 'B']);
            hookFixture.changeDetectorRef.markForCheck();
            await hookFixture.whenStable();
            hookFixture.detectChanges();

            expect(hooksCalled).toContain('onInit');
        });

        it('should support onAfterViewInit hook', async () => {
            const hooksCalled: string[] = [];
            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [SelectButton, SelectButtonModule, FormsModule, CommonModule],
                providers: [
                    provideZonelessChangeDetection(),
                    providePrimeNG({
                        pt: {
                            selectButton: {
                                hooks: {
                                    onAfterViewInit: () => {
                                        hooksCalled.push('onAfterViewInit');
                                    }
                                }
                            }
                        }
                    })
                ]
            }).compileComponents();

            const hookFixture = TestBed.createComponent(SelectButton);
            hookFixture.componentRef.setInput('options', ['X', 'Y']);
            hookFixture.changeDetectorRef.markForCheck();
            await hookFixture.whenStable();
            hookFixture.detectChanges();

            expect(hooksCalled).toContain('onAfterViewInit');
        });

        it('should support onAfterViewChecked hook', async () => {
            const hooksCalled: string[] = [];
            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [SelectButton, SelectButtonModule, FormsModule, CommonModule],
                providers: [
                    provideZonelessChangeDetection(),
                    providePrimeNG({
                        pt: {
                            selectButton: {
                                hooks: {
                                    onAfterViewChecked: () => {
                                        if (!hooksCalled.includes('onAfterViewChecked')) {
                                            hooksCalled.push('onAfterViewChecked');
                                        }
                                    }
                                }
                            }
                        }
                    })
                ]
            }).compileComponents();

            const hookFixture = TestBed.createComponent(SelectButton);
            hookFixture.componentRef.setInput('options', ['M', 'N']);
            hookFixture.changeDetectorRef.markForCheck();
            await hookFixture.whenStable();
            hookFixture.detectChanges();

            expect(hooksCalled).toContain('onAfterViewChecked');
        });

        it('should support onDestroy hook', async () => {
            const hooksCalled: string[] = [];
            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [SelectButton, SelectButtonModule, FormsModule, CommonModule],
                providers: [
                    provideZonelessChangeDetection(),
                    providePrimeNG({
                        pt: {
                            selectButton: {
                                hooks: {
                                    onDestroy: () => {
                                        hooksCalled.push('onDestroy');
                                    }
                                }
                            }
                        }
                    })
                ]
            }).compileComponents();

            const hookFixture = TestBed.createComponent(SelectButton);
            hookFixture.componentRef.setInput('options', ['P', 'Q']);
            hookFixture.changeDetectorRef.markForCheck();
            await hookFixture.whenStable();
            hookFixture.detectChanges();

            hookFixture.destroy();

            expect(hooksCalled).toContain('onDestroy');
        });

        it('should support multiple lifecycle hooks', async () => {
            const hooksCalled: string[] = [];
            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [SelectButton, SelectButtonModule, FormsModule, CommonModule],
                providers: [
                    provideZonelessChangeDetection(),
                    providePrimeNG({
                        pt: {
                            selectButton: {
                                hooks: {
                                    onInit: () => {
                                        hooksCalled.push('onInit');
                                    },
                                    onAfterViewInit: () => {
                                        hooksCalled.push('onAfterViewInit');
                                    },
                                    onAfterViewChecked: () => {
                                        if (!hooksCalled.includes('onAfterViewChecked')) {
                                            hooksCalled.push('onAfterViewChecked');
                                        }
                                    },
                                    onDestroy: () => {
                                        hooksCalled.push('onDestroy');
                                    }
                                }
                            }
                        }
                    })
                ]
            }).compileComponents();

            const hookFixture = TestBed.createComponent(SelectButton);
            hookFixture.componentRef.setInput('options', ['R', 'S']);
            hookFixture.changeDetectorRef.markForCheck();
            await hookFixture.whenStable();
            hookFixture.detectChanges();

            expect(hooksCalled).toContain('onInit');
            expect(hooksCalled).toContain('onAfterViewInit');
            expect(hooksCalled).toContain('onAfterViewChecked');

            hookFixture.destroy();

            expect(hooksCalled).toContain('onDestroy');
        });
    });

    describe('PT Case 9: pcToggleButton passthrough', () => {
        it('should pass PT options to child ToggleButton component', () => {
            fixture.componentRef.setInput('pt', {
                pcToggleButton: {
                    root: 'TOGGLE_BUTTON_CLASS'
                }
            });
            fixture.detectChanges();

            const toggleButtons = hostElement.querySelectorAll('p-togglebutton');
            expect(toggleButtons.length).toBeGreaterThan(0);
        });

        it('should pass complex PT options to ToggleButton', () => {
            fixture.componentRef.setInput('pt', {
                pcToggleButton: {
                    root: {
                        class: 'TOGGLE_ROOT_CLASS',
                        'data-toggle': 'true'
                    }
                }
            });
            fixture.detectChanges();

            const toggleButtons = hostElement.querySelectorAll('p-togglebutton');
            expect(toggleButtons.length).toBeGreaterThan(0);
        });
    });
});

// Test components for inline PT tests
@Component({
    standalone: true,
    imports: [SelectButton, FormsModule, CommonModule],
    template: `<p-selectbutton [options]="options" [pt]="{ root: 'INLINE_STRING' }" />`
})
class TestInlineStringPTComponent {
    options = ['One', 'Two'];
}

@Component({
    standalone: true,
    imports: [SelectButton, FormsModule, CommonModule],
    template: `<p-selectbutton [options]="options" [pt]="{ root: { class: 'INLINE_OBJECT_CLASS', 'data-inline': 'true' } }" />`
})
class TestInlineObjectPTComponent {
    options = ['One', 'Two'];
}

@Component({
    standalone: true,
    imports: [SelectButton, FormsModule, CommonModule],
    template: `
        <p-selectbutton [options]="options1" />
        <p-selectbutton [options]="options2" />
    `
})
class TestMultipleInstancesComponent {
    options1 = ['A', 'B'];
    options2 = ['X', 'Y'];
}
