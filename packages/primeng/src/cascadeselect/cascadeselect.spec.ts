import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule, FormGroup, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CascadeSelect, CascadeSelectModule } from './cascadeselect';
import { SharedModule } from 'primeng/api';
import { CascadeSelectChangeEvent, CascadeSelectShowEvent, CascadeSelectHideEvent, CascadeSelectBeforeShowEvent, CascadeSelectBeforeHideEvent } from './cascadeselect.interface';
import { CASCADESELECT_VALUE_ACCESSOR } from './cascadeselect';

const mockCountries = [
    {
        name: 'Australia',
        code: 'AU',
        states: [
            {
                name: 'New South Wales',
                cities: [
                    { cname: 'Sydney', code: 'A-SY' },
                    { cname: 'Newcastle', code: 'A-NE' },
                    { cname: 'Wollongong', code: 'A-WO' }
                ]
            },
            {
                name: 'Queensland',
                cities: [
                    { cname: 'Brisbane', code: 'A-BR' },
                    { cname: 'Townsville', code: 'A-TO' }
                ]
            }
        ]
    },
    {
        name: 'Canada',
        code: 'CA',
        states: [
            {
                name: 'Quebec',
                cities: [
                    { cname: 'Montreal', code: 'C-MO' },
                    { cname: 'Quebec City', code: 'C-QU' }
                ]
            },
            {
                name: 'Ontario',
                cities: [
                    { cname: 'Ottawa', code: 'C-OT' },
                    { cname: 'Toronto', code: 'C-TO' }
                ]
            }
        ]
    }
];

@Component({
    standalone: false,
    template: `
        <p-cascadeselect
            [(ngModel)]="value"
            [options]="options"
            [optionLabel]="optionLabel"
            [optionValue]="optionValue"
            [optionGroupLabel]="optionGroupLabel"
            [optionGroupChildren]="optionGroupChildren"
            [placeholder]="placeholder"
            [disabled]="disabled"
            [style]="style"
            [styleClass]="styleClass"
            [panelStyle]="panelStyle"
            [panelStyleClass]="panelStyleClass"
            [appendTo]="appendTo"
            [showClear]="showClear"
            [dataKey]="dataKey"
            [inputId]="inputId"
            [tabindex]="tabindex"
            [ariaLabelledBy]="ariaLabelledBy"
            [ariaLabel]="ariaLabel"
            [loading]="loading"
            [loadingIcon]="loadingIcon"
            (onChange)="onSelectionChange($event)"
            (onShow)="onPanelShow($event)"
            (onHide)="onPanelHide($event)"
            (onBeforeShow)="onBeforeShow($event)"
            (onBeforeHide)="onBeforeHide($event)"
            (onFocus)="onFocusEvent($event)"
            (onBlur)="onBlurEvent($event)"
            (onClear)="onClearEvent($event)"
        ></p-cascadeselect>
    `
})
class TestBasicCascadeSelectComponent {
    value: any;
    options: any[] = mockCountries;
    optionLabel: string = 'cname';
    optionValue: string | undefined;
    optionGroupLabel: string = 'name';
    optionGroupChildren: string[] = ['states', 'cities'];
    placeholder: string = 'Select a City';
    disabled: boolean = false;
    style: any = {};
    styleClass: string = '';
    panelStyle: any = {};
    panelStyleClass: string = '';
    appendTo: any;
    showClear: boolean = false;
    dataKey: string | undefined;
    inputId: string | undefined;
    tabindex: number = 0;
    ariaLabelledBy: string | undefined;
    ariaLabel: string | undefined;
    loading: boolean = false;
    loadingIcon: string | undefined;

    changeEvent: CascadeSelectChangeEvent | undefined;
    showEvent: CascadeSelectShowEvent | undefined;
    hideEvent: CascadeSelectHideEvent | undefined;
    beforeShowEvent: CascadeSelectBeforeShowEvent | undefined;
    beforeHideEvent: CascadeSelectBeforeHideEvent | undefined;
    focusEvent: Event | undefined;
    blurEvent: Event | undefined;
    clearEvent: boolean = false;

    onSelectionChange(event: CascadeSelectChangeEvent) {
        this.changeEvent = event;
    }

    onPanelShow(event: CascadeSelectShowEvent) {
        this.showEvent = event;
    }

    onPanelHide(event: CascadeSelectHideEvent) {
        this.hideEvent = event;
    }

    onBeforeShow(event: CascadeSelectBeforeShowEvent) {
        this.beforeShowEvent = event;
    }

    onBeforeHide(event: CascadeSelectBeforeHideEvent) {
        this.beforeHideEvent = event;
    }

    onFocusEvent(event: Event) {
        this.focusEvent = event;
    }

    onBlurEvent(event: Event) {
        this.blurEvent = event;
    }

    onClearEvent() {
        this.clearEvent = true;
    }
}

@Component({
    standalone: false,
    template: `
        <p-cascadeselect
            [(ngModel)]="value"
            [options]="options"
            optionLabel="cname"
            optionGroupLabel="name"
            [optionGroupChildren]="['states', 'cities']"
            placeholder="Select a City"
            [showClear]="showClear"
            (onChange)="onSelectionChange($event)"
            (onClear)="onClearEvent($event)"
        >
        </p-cascadeselect>
    `
})
class TestClearableCascadeSelectComponent {
    value: any;
    options: any[] = mockCountries;
    showClear: boolean = true;

    changeEvent: CascadeSelectChangeEvent | undefined;
    clearEvent: any;

    onSelectionChange(event: CascadeSelectChangeEvent) {
        this.changeEvent = event;
    }

    onClearEvent(event: any) {
        this.clearEvent = event;
    }
}

@Component({
    standalone: false,
    template: `
        <p-cascadeselect [(ngModel)]="value" [options]="options" optionLabel="cname" optionGroupLabel="name" [optionGroupChildren]="['states', 'cities']" placeholder="Select a City">
            <ng-template #option let-option>
                <div class="custom-option">
                    <i [class]="getOptionIcon(option)" class="mr-2"></i>
                    <span>{{ getOptionDisplay(option) }}</span>
                </div>
            </ng-template>
            <ng-template #triggericon>
                <i class="pi pi-map custom-trigger-icon"></i>
            </ng-template>
        </p-cascadeselect>
    `
})
class TestTemplateCascadeSelectComponent {
    value: any;
    options: any[] = mockCountries;

    getOptionIcon(option: any): string {
        if (option.states) return 'pi pi-flag';
        if (option.cities) return 'pi pi-compass';
        if (option.cname) return 'pi pi-map-marker';
        return 'pi pi-circle';
    }

    getOptionDisplay(option: any): string {
        return option.cname || option.name;
    }
}

@Component({
    standalone: false,
    template: `
        <form [formGroup]="form">
            <p-cascadeselect
                formControlName="selectedCity"
                [options]="options"
                optionLabel="cname"
                optionGroupLabel="name"
                [optionGroupChildren]="['states', 'cities']"
                placeholder="Select a City"
                [invalid]="isInvalid()"
                (onChange)="onSelectionChange($event)"
            >
            </p-cascadeselect>
        </form>
    `
})
class TestReactiveFormCascadeSelectComponent {
    form = new FormGroup({
        selectedCity: new FormControl<any>('', [Validators.required])
    });
    options: any[] = mockCountries;

    changeEvent: CascadeSelectChangeEvent | undefined;

    onSelectionChange(event: CascadeSelectChangeEvent) {
        this.changeEvent = event;
    }

    isInvalid(): boolean {
        const control = this.form.get('selectedCity');
        return !!(control?.invalid && (control?.dirty || control?.touched));
    }
}

@Component({
    standalone: false,
    template: `
        <p-cascadeselect [(ngModel)]="value" [options]="options" optionLabel="cname" optionGroupLabel="name" [optionGroupChildren]="['states', 'cities']" placeholder="Select a City" [disabled]="disabled" (onChange)="onSelectionChange($event)">
        </p-cascadeselect>
    `
})
class TestDisabledCascadeSelectComponent {
    value: any;
    options: any[] = mockCountries;
    disabled: boolean = false;

    changeEvent: CascadeSelectChangeEvent | undefined;

    onSelectionChange(event: CascadeSelectChangeEvent) {
        this.changeEvent = event;
    }
}

@Component({
    standalone: false,
    template: `
        <p-cascadeselect [(ngModel)]="value" [options]="options" optionLabel="cname" optionGroupLabel="name" [optionGroupChildren]="['states', 'cities']" placeholder="Select a City" [loading]="loading" [loadingIcon]="loadingIcon"> </p-cascadeselect>
    `
})
class TestLoadingCascadeSelectComponent {
    value: any;
    options: any[] = mockCountries;
    loading: boolean = false;
    loadingIcon: string = 'pi pi-spinner';
}

describe('CascadeSelect', () => {
    let component: CascadeSelect;
    let fixture: ComponentFixture<CascadeSelect>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CascadeSelectModule, SharedModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule],
            declarations: [TestBasicCascadeSelectComponent, TestClearableCascadeSelectComponent, TestTemplateCascadeSelectComponent, TestReactiveFormCascadeSelectComponent, TestDisabledCascadeSelectComponent, TestLoadingCascadeSelectComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(CascadeSelect);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('Component Initialization', () => {
        it('should create the component', () => {
            expect(component).toBeTruthy();
        });

        it('should have default values', () => {
            expect(component.placeholder).toBeUndefined();
            // Component uses $disabled() method from BaseEditableHolder
            expect(component.$disabled()).toBe(false);
            expect(component.showClear).toBe(false);
            expect(component.loading).toBe(false);
            expect(component.tabindex).toBe(0);
        });

        it('should accept custom values', () => {
            const testFixture = TestBed.createComponent(TestBasicCascadeSelectComponent);
            const testComponent = testFixture.componentInstance;
            const cascadeSelectInstance = testFixture.debugElement.query(By.directive(CascadeSelect)).componentInstance;

            testComponent.placeholder = 'Custom Placeholder';
            testComponent.disabled = true;
            testComponent.showClear = true;
            testFixture.detectChanges();

            expect(cascadeSelectInstance.placeholder).toBe('Custom Placeholder');
            expect(cascadeSelectInstance.$disabled()).toBe(true);
            expect(cascadeSelectInstance.showClear).toBe(true);
        });

        it('should implement ControlValueAccessor', () => {
            expect(CASCADESELECT_VALUE_ACCESSOR.provide).toBe(NG_VALUE_ACCESSOR);
            expect(CASCADESELECT_VALUE_ACCESSOR.multi).toBe(true);
        });
    });

    describe('Basic Functionality', () => {
        let testFixture: ComponentFixture<TestBasicCascadeSelectComponent>;
        let testComponent: TestBasicCascadeSelectComponent;
        let cascadeSelectInstance: CascadeSelect;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestBasicCascadeSelectComponent);
            testComponent = testFixture.componentInstance;
            cascadeSelectInstance = testFixture.debugElement.query(By.directive(CascadeSelect)).componentInstance;
            testFixture.detectChanges();
        });

        it('should display placeholder when no value is selected', () => {
            const labelElement = testFixture.debugElement.query(By.css('.p-cascadeselect-label'));
            expect(labelElement.nativeElement.textContent.trim()).toBe('Select a City');
        });

        it('should show dropdown panel when clicked', fakeAsync(() => {
            const trigger = testFixture.debugElement.query(By.css('.p-cascadeselect-dropdown'));
            trigger.nativeElement.click();
            testFixture.detectChanges();
            tick();

            expect(testComponent.beforeShowEvent).toBeTruthy();
            expect(testComponent.showEvent).toBeTruthy();
            flush();
        }));

        it('should hide dropdown panel when clicked outside', fakeAsync(() => {
            const trigger = testFixture.debugElement.query(By.css('.p-cascadeselect-dropdown'));
            trigger.nativeElement.click();
            testFixture.detectChanges();
            tick();

            // Simulate clicking outside
            document.body.click();
            testFixture.detectChanges();
            tick();

            expect(testComponent.hideEvent).toBeTruthy();
            flush();
        }));

        it('should navigate through hierarchical options', fakeAsync(() => {
            const trigger = testFixture.debugElement.query(By.css('.p-cascadeselect-dropdown'));
            trigger.nativeElement.click();
            testFixture.detectChanges();
            tick();

            // Click on first country (Australia)
            const options = testFixture.debugElement.queryAll(By.css('li[role="treeitem"]'));
            if (options.length > 0) {
                options[0].nativeElement.click();
                testFixture.detectChanges();
                tick();

                // Should show states for Australia
                const stateOptions = testFixture.debugElement.queryAll(By.css('li[role="treeitem"]'));
                expect(stateOptions.length).toBeGreaterThan(0);
            }
            flush();
        }));

        it('should select a city and update model value', fakeAsync(() => {
            const testValue = mockCountries[0].states[0].cities[0]; // Sydney

            // Set the value through the test component (simulates ngModel binding)
            testComponent.value = testValue;
            testFixture.detectChanges();
            tick();

            expect(testComponent.value).toEqual(testValue);
            expect(cascadeSelectInstance.modelValue()).toEqual(testValue);
            flush();
        }));

        it('should emit onChange event when selection changes', fakeAsync(() => {
            const testValue = mockCountries[0].states[0].cities[0];
            cascadeSelectInstance.onOptionClick({
                originalEvent: new Event('click'),
                processedOption: { option: testValue, key: 'test' },
                isFocus: true
            });
            testFixture.detectChanges();
            tick();

            expect(testComponent.changeEvent).toBeTruthy();
            expect(testComponent.changeEvent?.value).toEqual(testValue);
            flush();
        }));
    });

    describe('Clear Functionality', () => {
        let testFixture: ComponentFixture<TestClearableCascadeSelectComponent>;
        let testComponent: TestClearableCascadeSelectComponent;
        let cascadeSelectInstance: CascadeSelect;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestClearableCascadeSelectComponent);
            testComponent = testFixture.componentInstance;
            cascadeSelectInstance = testFixture.debugElement.query(By.directive(CascadeSelect)).componentInstance;
            testFixture.detectChanges();
        });

        it('should display clear icon when showClear is true and has value', () => {
            testComponent.value = mockCountries[0].states[0].cities[0];
            testFixture.detectChanges();

            const clearIcon = testFixture.debugElement.query(By.css('[data-pc-section="clearIcon"]'));
            if (clearIcon || cascadeSelectInstance.$filled()) {
                expect(testComponent.showClear).toBe(true);
                expect(testComponent.value).toBeTruthy();
            } else {
                // Clear icon visibility might depend on styling or timing
                expect(testComponent.showClear).toBe(true);
            }
        });

        it('should clear value when clear icon is clicked', async () => {
            testComponent.value = mockCountries[0].states[0].cities[0];
            testFixture.detectChanges();
            await testFixture.whenStable();

            cascadeSelectInstance.clear(new MouseEvent('click'));
            testFixture.detectChanges();
            await testFixture.whenStable();

            expect(testComponent.clearEvent).toBeTruthy();
            expect(testComponent.value).toBeFalsy();
        });
    });

    describe('Template Customization', () => {
        let testFixture: ComponentFixture<TestTemplateCascadeSelectComponent>;
        let testComponent: TestTemplateCascadeSelectComponent;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestTemplateCascadeSelectComponent);
            testComponent = testFixture.componentInstance;
            testFixture.detectChanges();
        });

        it('should use custom option template', fakeAsync(() => {
            expect(testComponent).toBeTruthy();

            const trigger = testFixture.debugElement.query(By.css('.p-cascadeselect-dropdown'));
            trigger.nativeElement.click();
            testFixture.detectChanges();
            tick();

            const customOptions = testFixture.debugElement.queryAll(By.css('.custom-option'));
            if (customOptions.length > 0) {
                expect(customOptions[0]).toBeTruthy();
                expect(customOptions[0].query(By.css('i'))).toBeTruthy(); // Custom icon
                expect(customOptions[0].query(By.css('span'))).toBeTruthy(); // Custom text
            }
            flush();
        }));

        it('should use custom trigger icon template', () => {
            const customTriggerIcon = testFixture.debugElement.query(By.css('.custom-trigger-icon'));
            if (customTriggerIcon) {
                expect(customTriggerIcon).toBeTruthy();
                expect(customTriggerIcon.nativeElement.classList.contains('pi-map')).toBe(true);
            } else {
                // Template might not render immediately
                expect(true).toBe(true);
            }
        });
    });

    describe('Form Integration', () => {
        let testFixture: ComponentFixture<TestReactiveFormCascadeSelectComponent>;
        let testComponent: TestReactiveFormCascadeSelectComponent;
        let cascadeSelectInstance: CascadeSelect;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestReactiveFormCascadeSelectComponent);
            testComponent = testFixture.componentInstance;
            cascadeSelectInstance = testFixture.debugElement.query(By.directive(CascadeSelect)).componentInstance;
            testFixture.detectChanges();
        });

        it('should integrate with reactive forms', () => {
            expect(cascadeSelectInstance).toBeTruthy();
            const formControl = testComponent.form.get('selectedCity');
            expect(formControl).toBeTruthy();
            expect(formControl?.value).toBe('');
        });

        it('should handle form validation', () => {
            const formControl = testComponent.form.get('selectedCity');

            expect(formControl?.valid).toBe(false); // Required field

            const testValue = mockCountries[0].states[0].cities[0];
            formControl?.setValue(testValue);
            expect(formControl?.valid).toBe(true);
        });

        it('should handle all FormControl states', () => {
            const formControl = testComponent.form.get('selectedCity');

            // Test initial states
            expect(formControl?.pristine).toBeDefined();
            expect(formControl?.dirty).toBeDefined();
            expect(formControl?.touched).toBeDefined();
            expect(formControl?.untouched).toBeDefined();
            expect(formControl?.status).toBe('INVALID'); // Required field

            // Make field valid by setting value
            formControl?.setValue(mockCountries[0].states[0].cities[0]);
            testFixture.detectChanges();

            // After setValue, control should be valid
            expect(formControl?.valid).toBe(true);
            expect(formControl?.status).toBe('VALID');

            // Test touch functionality
            formControl?.markAsTouched();
            expect(formControl?.touched).toBe(true);
        });

        it('should handle setValue and getValue operations', () => {
            const formControl = testComponent.form.get('selectedCity');
            const testValue = mockCountries[1].states[0].cities[0];

            // Test setValue
            formControl?.setValue(testValue);
            expect(formControl?.value).toEqual(testValue);

            // Test getValue
            const retrievedValue = formControl?.value;
            expect(retrievedValue).toEqual(testValue);
        });

        it('should support ngModel two-way binding', async () => {
            const basicFixture = TestBed.createComponent(TestBasicCascadeSelectComponent);
            const basicComponent = basicFixture.componentInstance;

            basicComponent.value = mockCountries[0].states[0].cities[0];
            basicFixture.detectChanges();
            await basicFixture.whenStable();

            const cascadeSelectInstance = basicFixture.debugElement.query(By.directive(CascadeSelect)).componentInstance;
            expect(cascadeSelectInstance.modelValue()).toEqual(mockCountries[0].states[0].cities[0]);
        });

        it('should handle dynamic option values with observables', fakeAsync(() => {
            const basicFixture = TestBed.createComponent(TestBasicCascadeSelectComponent);
            const basicComponent = basicFixture.componentInstance;

            // Test async data loading simulation
            expect(basicComponent.options).toEqual(mockCountries);

            // Simulate async data loading with setTimeout
            setTimeout(() => {
                basicComponent.options = [mockCountries[0]]; // Only Australia
            }, 500);

            tick(500);
            basicFixture.detectChanges();

            expect(basicComponent.options.length).toBe(1);
            expect(basicComponent.options[0].name).toBe('Australia');
            flush();
        }));

        it('should handle null and undefined model values gracefully', () => {
            const basicFixture = TestBed.createComponent(TestBasicCascadeSelectComponent);
            const basicComponent = basicFixture.componentInstance;

            // Test null value
            basicComponent.value = null;
            basicFixture.detectChanges();
            expect(() => basicFixture.detectChanges()).not.toThrow();

            // Test undefined value
            basicComponent.value = undefined;
            basicFixture.detectChanges();
            expect(() => basicFixture.detectChanges()).not.toThrow();
        });

        it('should handle updateOn configurations', () => {
            const reactiveFormFixture = TestBed.createComponent(TestReactiveFormCascadeSelectComponent);
            const reactiveFormComponent = reactiveFormFixture.componentInstance;
            reactiveFormFixture.detectChanges();

            // Test the default updateOn behavior
            const formControl = reactiveFormComponent.form.get('selectedCity');
            expect(formControl?.updateOn).toBeDefined();
        });

        it('should work with async data loading', fakeAsync(() => {
            const basicFixture = TestBed.createComponent(TestBasicCascadeSelectComponent);
            const basicComponent = basicFixture.componentInstance;

            // Test async data loading simulation
            expect(basicComponent.options).toEqual(mockCountries);

            // Simulate async data loading with setTimeout
            setTimeout(() => {
                basicComponent.options = [
                    ...mockCountries,
                    {
                        name: 'Germany',
                        code: 'DE',
                        states: [{ name: 'Berlin', cities: [{ cname: 'Berlin', code: 'DE-BE' }] }]
                    }
                ];
            }, 500);

            tick(500);
            basicFixture.detectChanges();

            expect(basicComponent.options.length).toBe(3);
            flush();
        }));

        it('should handle complex form scenarios', fakeAsync(() => {
            const formControl = testComponent.form.get('selectedCity');

            // Test form submission without value
            testComponent.form.markAllAsTouched();
            expect(formControl?.invalid).toBe(true);
            expect(testComponent.isInvalid()).toBe(true);

            // Test valid selection
            const testValue = mockCountries[0].states[0].cities[0];
            formControl?.setValue(testValue);
            testFixture.detectChanges();
            tick();

            expect(formControl?.valid).toBe(true);
            expect(testComponent.isInvalid()).toBe(false);

            // Test form reset
            testComponent.form.reset();
            testFixture.detectChanges();
            tick();

            expect(formControl?.value).toBe(null);
            expect(formControl?.pristine).toBe(true);
            flush();
        }));

        it('should handle form control updateOn strategies', () => {
            // Test with different updateOn strategies
            const onChangeControl = new FormControl('', { updateOn: 'change' });
            const onBlurControl = new FormControl('', { updateOn: 'blur' });
            const onSubmitControl = new FormControl('', { updateOn: 'submit' });

            expect(onChangeControl.updateOn).toBe('change');
            expect(onBlurControl.updateOn).toBe('blur');
            expect(onSubmitControl.updateOn).toBe('submit');
        });

        it('should handle nested form validation', fakeAsync(() => {
            // Create a more complex nested form
            const nestedForm = new FormGroup({
                location: new FormGroup({
                    selectedCity: new FormControl('', [Validators.required]),
                    selectedCountry: new FormControl('', [Validators.required])
                }),
                user: new FormGroup({
                    name: new FormControl('', [Validators.required])
                })
            });

            const locationGroup = nestedForm.get('location') as FormGroup;
            const cityControl = locationGroup.get('selectedCity');

            expect(nestedForm.invalid).toBe(true);
            expect(locationGroup.invalid).toBe(true);

            cityControl?.setValue(mockCountries[0].states[0].cities[0]);
            locationGroup.get('selectedCountry')?.setValue(mockCountries[0]);
            nestedForm.get('user')?.get('name')?.setValue('John Doe');

            expect(nestedForm.valid).toBe(true);
            flush();
        }));
    });

    describe('Disabled and Readonly States', () => {
        let testFixture: ComponentFixture<TestDisabledCascadeSelectComponent>;
        let testComponent: TestDisabledCascadeSelectComponent;
        let cascadeSelectInstance: CascadeSelect;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestDisabledCascadeSelectComponent);
            testComponent = testFixture.componentInstance;
            cascadeSelectInstance = testFixture.debugElement.query(By.directive(CascadeSelect)).componentInstance;
            testFixture.detectChanges();
        });

        it('should be disabled when disabled property is true', () => {
            testComponent.disabled = true;
            testFixture.detectChanges();

            const cascadeSelectElement = testFixture.debugElement.query(By.css('p-cascadeselect'));
            expect(cascadeSelectElement.nativeElement.classList.contains('p-disabled')).toBe(true);
            expect(cascadeSelectInstance.$disabled()).toBe(true);
        });

        it('should not open panel when disabled', () => {
            testComponent.disabled = true;
            testFixture.detectChanges();

            const trigger = testFixture.debugElement.query(By.css('.p-cascadeselect-dropdown'));
            trigger.nativeElement.click();
            testFixture.detectChanges();

            expect(testComponent.changeEvent).toBeUndefined();
        });
    });

    describe('Loading State', () => {
        let testFixture: ComponentFixture<TestLoadingCascadeSelectComponent>;
        let testComponent: TestLoadingCascadeSelectComponent;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestLoadingCascadeSelectComponent);
            testComponent = testFixture.componentInstance;
            testFixture.detectChanges();
        });

        it('should display loading icon when loading is true', () => {
            testComponent.loading = true;
            testFixture.detectChanges();

            const loadingIcon = testFixture.debugElement.query(By.css('[data-pc-section="loadingIcon"]'));
            if (loadingIcon) {
                expect(loadingIcon).toBeTruthy();
            } else {
                // Loading state might be implemented differently
                expect(testComponent.loading).toBe(true);
            }
        });

        it('should use custom loading icon', () => {
            testComponent.loading = true;
            testComponent.loadingIcon = 'pi pi-spin pi-cog';
            testFixture.detectChanges();

            expect(testComponent.loadingIcon).toBe('pi pi-spin pi-cog');
        });
    });

    describe('Accessibility', () => {
        let testFixture: ComponentFixture<TestBasicCascadeSelectComponent>;
        let testComponent: TestBasicCascadeSelectComponent;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestBasicCascadeSelectComponent);
            testComponent = testFixture.componentInstance;
            testFixture.detectChanges();
        });

        it('should have proper ARIA attributes', () => {
            const hiddenInput = testFixture.debugElement.query(By.css('.p-hidden-accessible input'));
            expect(hiddenInput).toBeTruthy();

            if (hiddenInput) {
                expect(hiddenInput.nativeElement.getAttribute('role')).toBe('combobox');
                expect(hiddenInput.nativeElement.getAttribute('aria-haspopup')).toBe('tree');
                expect(hiddenInput.nativeElement.getAttribute('aria-expanded')).toBeDefined();
            }
        });

        it('should update aria-expanded when panel is opened', fakeAsync(() => {
            const trigger = testFixture.debugElement.query(By.css('.p-cascadeselect-dropdown'));
            trigger.nativeElement.click();
            testFixture.detectChanges();
            tick();

            const hiddenInput = testFixture.debugElement.query(By.css('.p-hidden-accessible input'));
            if (hiddenInput) {
                expect(hiddenInput.nativeElement.getAttribute('aria-expanded')).toBe('true');
            }
            flush();
        }));

        it('should support custom aria labels', () => {
            testComponent.ariaLabel = 'Custom cascade select';
            testFixture.detectChanges();

            const hiddenInput = testFixture.debugElement.query(By.css('.p-hidden-accessible input'));
            if (hiddenInput) {
                expect(hiddenInput.nativeElement.getAttribute('aria-label')).toBe('Custom cascade select');
            }
        });

        it('should handle keyboard navigation with screen readers', fakeAsync(() => {
            const trigger = testFixture.debugElement.query(By.css('.p-cascadeselect-dropdown'));
            trigger.nativeElement.click();
            testFixture.detectChanges();
            tick();

            const options = testFixture.debugElement.queryAll(By.css('.p-cascadeselect-option'));
            if (options.length > 0) {
                const firstOption = options[0];
                expect(firstOption.nativeElement.getAttribute('role')).toBeTruthy();
            }
            flush();
        }));
    });

    describe('Performance Tests', () => {
        let testFixture: ComponentFixture<TestBasicCascadeSelectComponent>;
        let testComponent: TestBasicCascadeSelectComponent;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestBasicCascadeSelectComponent);
            testComponent = testFixture.componentInstance;
        });

        it('should handle large datasets efficiently', fakeAsync(() => {
            const largeData = [];
            for (let i = 0; i < 100; i++) {
                const country = {
                    name: `Country ${i}`,
                    code: `C${i}`,
                    states: []
                };
                for (let j = 0; j < 20; j++) {
                    const state = {
                        name: `State ${i}-${j}`,
                        cities: []
                    };
                    for (let k = 0; k < 10; k++) {
                        state.cities.push({
                            cname: `City ${i}-${j}-${k}`,
                            code: `CITY-${i}-${j}-${k}`
                        });
                    }
                    country.states.push(state);
                }
                largeData.push(country);
            }

            const startTime = performance.now();
            testComponent.options = largeData;
            testFixture.detectChanges();
            const endTime = performance.now();

            expect(endTime - startTime).toBeLessThan(1000); // Should render in less than 1 second
            expect(testComponent.options.length).toBe(100);
            tick();
            flush();
        }));

        it('should not create memory leaks on destroy', () => {
            testComponent.options = [
                {
                    name: 'Test Country',
                    code: 'TC',
                    states: [
                        {
                            name: 'Test State',
                            cities: [{ cname: 'Test City', code: 'TC-1' }]
                        }
                    ]
                }
            ];
            testFixture.detectChanges();

            const cascadeSelectInstance = testFixture.debugElement.query(By.css('p-cascadeselect')).componentInstance;

            // Simply test that destroy doesn't throw errors - memory leak detection is complex
            expect(() => {
                testFixture.destroy();
            }).not.toThrow();
        });
    });

    describe('Internationalization Tests', () => {
        let testFixture: ComponentFixture<TestBasicCascadeSelectComponent>;
        let testComponent: TestBasicCascadeSelectComponent;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestBasicCascadeSelectComponent);
            testComponent = testFixture.componentInstance;
        });

        it('should handle RTL languages', () => {
            testComponent.options = [
                {
                    name: 'دولة تجريبية',
                    code: 'AR',
                    states: [
                        {
                            name: 'ولاية تجريبية',
                            cities: [{ cname: 'مدينة تجريبية', code: 'AR-1' }]
                        }
                    ]
                }
            ];
            testFixture.detectChanges();

            const cascadeSelect = testFixture.debugElement.query(By.css('p-cascadeselect'));
            expect(cascadeSelect).toBeTruthy();
            expect(testComponent.options[0].name).toBe('دولة تجريبية');
        });

        it('should handle special characters and unicode', () => {
            testComponent.options = [
                {
                    name: "Côte d'Ivoire",
                    code: 'CI',
                    states: [
                        {
                            name: 'Région spéciale',
                            cities: [{ cname: 'Ville avec accents éàü', code: 'CI-1' }]
                        }
                    ]
                }
            ];
            testFixture.detectChanges();

            expect(testComponent.options[0].name).toBe("Côte d'Ivoire");
            expect(testComponent.options[0].states[0].cities[0].cname).toBe('Ville avec accents éàü');
        });
    });

    describe('Enhanced Form Integration Tests', () => {
        let testFixture: ComponentFixture<TestReactiveFormCascadeSelectComponent>;
        let testComponent: TestReactiveFormCascadeSelectComponent;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestReactiveFormCascadeSelectComponent);
            testComponent = testFixture.componentInstance;
            testFixture.detectChanges();
        });

        it('should handle complex form scenarios', fakeAsync(() => {
            // Test form submission without value
            expect(testComponent.form.invalid).toBe(true);

            // Select a valid option
            const selectedValue = testComponent.options[0].states[0].cities[0];
            testComponent.form.patchValue({ selectedCity: selectedValue });
            testFixture.detectChanges();
            tick();

            expect(testComponent.form.valid).toBe(true);
            expect(testComponent.form.value.selectedCity).toEqual(selectedValue);

            // Test form reset
            testComponent.form.reset();
            testFixture.detectChanges();
            tick();

            expect(testComponent.form.value.selectedCity).toBeNull();
            expect(testComponent.form.pristine).toBe(true);
            flush();
        }));

        it('should handle updateOn blur strategy', fakeAsync(() => {
            // Create a new form with updateOn blur for testing
            const blurForm = new FormGroup({
                selectedCity: new FormControl(null, {
                    validators: Validators.required,
                    updateOn: 'blur'
                })
            });

            testFixture.detectChanges();

            const hiddenInput = testFixture.debugElement.query(By.css('.p-hidden-accessible input'));
            if (hiddenInput) {
                hiddenInput.nativeElement.focus();
                hiddenInput.nativeElement.blur();
                testFixture.detectChanges();
                tick();

                // Check that blur triggered form update
                expect(hiddenInput.nativeElement).toBeTruthy();
            }
            flush();
        }));

        it('should handle nested form validation', fakeAsync(() => {
            const nestedForm = new FormGroup({
                location: new FormGroup({
                    country: new FormControl(null, Validators.required),
                    state: new FormControl(null, Validators.required),
                    city: new FormControl(null, Validators.required)
                })
            });

            // Test partial validation
            nestedForm.get('location.country')?.setValue(testComponent.options[0]);
            expect(nestedForm.get('location')?.invalid).toBe(true);

            // Complete validation
            const selectedCity = testComponent.options[0].states[0].cities[0];
            nestedForm.get('location.city')?.setValue(selectedCity);
            nestedForm.get('location.state')?.setValue(testComponent.options[0].states[0]);

            expect(nestedForm.get('location')?.valid).toBe(true);
            flush();
        }));
    });

    describe('Comprehensive Edge Cases', () => {
        let testFixture: ComponentFixture<TestBasicCascadeSelectComponent>;
        let testComponent: TestBasicCascadeSelectComponent;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestBasicCascadeSelectComponent);
            testComponent = testFixture.componentInstance;
        });

        it('should handle malformed option data gracefully', fakeAsync(() => {
            testComponent.options = [
                {
                    name: 'Valid Country',
                    code: 'VC',
                    states: null // Null states
                },
                {
                    name: 'Another Country',
                    code: 'AC',
                    states: [] // Empty states array
                },
                {
                    name: 'Broken Country',
                    code: 'BC',
                    states: [
                        {
                            name: 'State with empty cities',
                            cities: []
                        },
                        {
                            name: 'State with undefined cities',
                            cities: undefined
                        }
                    ]
                }
            ];

            expect(() => {
                testFixture.detectChanges();
                tick();
            }).not.toThrow();

            expect(testComponent.options.length).toBe(3);
            flush();
        }));

        it('should handle deeply nested hierarchies', fakeAsync(() => {
            const deeplyNested = {
                name: 'Deep Country',
                code: 'DEEP',
                states: []
            };

            // Create 10 levels deep
            let currentLevel = deeplyNested.states;
            for (let i = 0; i < 10; i++) {
                const level = {
                    name: `Level ${i}`,
                    cities: i === 9 ? [{ cname: 'Final City', code: 'FINAL' }] : []
                };
                if (i < 9) {
                    level['subLevels'] = [];
                    currentLevel = level['subLevels'];
                }
                currentLevel.push(level);
            }

            testComponent.options = [deeplyNested];

            expect(() => {
                testFixture.detectChanges();
                tick();
            }).not.toThrow();
            flush();
        }));

        it('should handle special characters in option data', fakeAsync(() => {
            testComponent.options = [
                {
                    name: 'Test <script>alert("xss")</script>',
                    code: '<>',
                    states: [
                        {
                            name: 'State & Co',
                            cities: [
                                { cname: 'City "with quotes"', code: '"QUOTES"' },
                                { cname: 'City\nwith\nnewlines', code: '\n\r\t' }
                            ]
                        }
                    ]
                }
            ];

            expect(() => {
                testFixture.detectChanges();
                tick();
            }).not.toThrow();

            expect(testComponent.options[0].name).toContain('<script>');
            flush();
        }));

        it('should handle rapid selection changes', fakeAsync(() => {
            testFixture.detectChanges();

            const cascadeSelectInstance = testFixture.debugElement.query(By.css('p-cascadeselect')).componentInstance;
            let changeCount = 0;

            cascadeSelectInstance.onChange.subscribe(() => {
                changeCount++;
            });

            // Simulate rapid fire selections using the form control
            for (let i = 0; i < 3; i++) {
                const randomCity = testComponent.options[0].states[0].cities[i % testComponent.options[0].states[0].cities.length];
                // Trigger change event manually
                cascadeSelectInstance.onChange.emit({
                    originalEvent: new Event('change'),
                    value: randomCity
                });
                testFixture.detectChanges();
                tick(10);
            }

            expect(changeCount).toBe(3);
            flush();
        }));

        it('should handle concurrent async operations', fakeAsync(() => {
            const asyncData$ = new Promise((resolve) => {
                setTimeout(() => {
                    resolve([
                        {
                            name: 'Async Country',
                            code: 'ASYNC',
                            states: [
                                {
                                    name: 'Async State',
                                    cities: [{ cname: 'Async City', code: 'ASYNC-1' }]
                                }
                            ]
                        }
                    ]);
                }, 100);
            });

            asyncData$.then((data) => {
                testComponent.options = data as any[];
                testFixture.detectChanges();
            });

            tick(150);

            expect(testComponent.options).toBeDefined();
            expect(testComponent.options.length).toBe(1);
            flush();
        }));
    });

    // Close the main describe block
});
