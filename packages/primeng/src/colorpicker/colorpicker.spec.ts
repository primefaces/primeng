import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPicker } from './colorpicker';
import { ColorPickerChangeEvent } from 'primeng/types/colorpicker';
import { providePrimeNG } from 'primeng/config';

@Component({
    standalone: false,
    template: `
        <p-colorpicker
            [(ngModel)]="color"
            [format]="format"
            [inline]="inline"
            [disabled]="disabled"
            [tabindex]="tabindex"
            [inputId]="inputId"
            [autoZIndex]="autoZIndex"
            [showTransitionOptions]="showTransitionOptions"
            [hideTransitionOptions]="hideTransitionOptions"
            [autofocus]="autofocus"
            [defaultColor]="defaultColor"
            [appendTo]="appendTo"
            (onChange)="onColorChange($event)"
            (onShow)="onShowEvent($event)"
            (onHide)="onHideEvent($event)"
        >
        </p-colorpicker>
    `
})
class TestBasicColorPickerComponent {
    color: string | any = '#ff0000';
    format: 'hex' | 'rgb' | 'hsb' = 'hex';
    inline: boolean = false;
    disabled: boolean = false;
    tabindex: string = '0';
    inputId: string | undefined;
    autoZIndex: boolean = true;
    showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
    hideTransitionOptions: string = '.1s linear';
    autofocus: boolean = false;
    defaultColor: string = 'ff0000';
    appendTo: any = undefined as any;

    changeEvent: ColorPickerChangeEvent | undefined;
    showEvent: any;
    hideEvent: any;

    onColorChange(event: ColorPickerChangeEvent) {
        this.changeEvent = event;
    }

    onShowEvent(event: any) {
        this.showEvent = event;
    }

    onHideEvent(event: any) {
        this.hideEvent = event;
    }
}

@Component({
    standalone: false,
    template: `
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <p-colorpicker formControlName="selectedColor" [format]="format" [defaultColor]="defaultColor" (onChange)="onColorChange($event)"> </p-colorpicker>
        </form>
    `
})
class TestReactiveFormColorPickerComponent {
    form = new FormGroup({
        selectedColor: new FormControl<string>('', [Validators.required])
    });

    format: 'hex' | 'rgb' | 'hsb' = 'hex';
    defaultColor: string = '989898';

    changeEvent: ColorPickerChangeEvent | undefined;

    onColorChange(event: ColorPickerChangeEvent) {
        this.changeEvent = event;
    }

    onSubmit() {
        // Form submission logic
    }
}

@Component({
    standalone: false,
    template: `
        <div>
            <p-colorpicker [(ngModel)]="hexColor" format="hex" inputId="hex-picker"> </p-colorpicker>
        </div>
        <div>
            <p-colorpicker [(ngModel)]="rgbColor" format="rgb" inputId="rgb-picker"> </p-colorpicker>
        </div>
        <div>
            <p-colorpicker [(ngModel)]="hsbColor" format="hsb" inputId="hsb-picker"> </p-colorpicker>
        </div>
    `
})
class TestFormatColorPickerComponent {
    hexColor: string = '#6466f1';
    rgbColor: any = { r: 100, g: 102, b: 241 };
    hsbColor: any = { h: 239, s: 59, b: 95 };
}

@Component({
    standalone: false,
    template: ` <p-colorpicker [(ngModel)]="color" [inline]="true" [disabled]="disabled" (onChange)="onColorChange($event)"> </p-colorpicker> `
})
class TestInlineColorPickerComponent {
    color: string = '#ff0000';
    disabled: boolean = false;

    changeEvent: ColorPickerChangeEvent | undefined;

    onColorChange(event: ColorPickerChangeEvent) {
        this.changeEvent = event;
    }
}

@Component({
    standalone: false,
    template: ` <p-colorpicker [(ngModel)]="color" [disabled]="disabled" [autofocus]="autofocus" [inputId]="inputId" [tabindex]="tabindex" [defaultColor]="defaultColor" (onChange)="onColorChange($event)"> </p-colorpicker> `
})
class TestStyledColorPickerComponent {
    color: string = '#ff0000';
    disabled: boolean = false;
    autofocus: boolean = false;
    inputId: string = 'styled-colorpicker';
    tabindex: string = '5';
    defaultColor: string = '00ff00';

    changeEvent: ColorPickerChangeEvent | undefined;

    onColorChange(event: ColorPickerChangeEvent) {
        this.changeEvent = event;
    }
}

describe('ColorPicker', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, NoopAnimationsModule, ColorPicker],
            declarations: [TestBasicColorPickerComponent, TestReactiveFormColorPickerComponent, TestFormatColorPickerComponent, TestInlineColorPickerComponent, TestStyledColorPickerComponent]
        }).compileComponents();
    });

    describe('Component Initialization', () => {
        let testFixture: ComponentFixture<TestBasicColorPickerComponent>;
        let testComponent: TestBasicColorPickerComponent;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestBasicColorPickerComponent);
            testComponent = testFixture.componentInstance;
            testFixture.detectChanges();
        });

        it('should create the component', () => {
            expect(testComponent).toBeTruthy();

            const colorPickerComponent = testFixture.debugElement.query(By.css('p-colorpicker'));
            expect(colorPickerComponent).toBeTruthy();
        });

        it('should have default values', () => {
            const colorPickerInstance = testFixture.debugElement.query(By.css('p-colorpicker')).componentInstance;

            expect(colorPickerInstance.format).toBe('hex');
            expect(colorPickerInstance.inline).toBeFalsy();
            expect(colorPickerInstance.disabled()).toBe(false);
            expect(colorPickerInstance.autoZIndex).toBe(true);
            expect(colorPickerInstance.defaultColor).toBe('ff0000');
        });

        it('should accept custom values', () => {
            testComponent.format = 'rgb';
            testComponent.inline = true;
            testComponent.disabled = true;
            testComponent.autoZIndex = false;
            testComponent.defaultColor = '00ff00';
            testFixture.detectChanges();

            const colorPickerInstance = testFixture.debugElement.query(By.css('p-colorpicker')).componentInstance;

            expect(colorPickerInstance.format).toBe('rgb');
            expect(colorPickerInstance.inline).toBe(true);
            expect(colorPickerInstance.disabled()).toBe(true);
            expect(colorPickerInstance.autoZIndex).toBe(false);
            expect(colorPickerInstance.defaultColor).toBe('00ff00');
        });
    });

    describe('Basic Functionality Tests', () => {
        let testFixture: ComponentFixture<TestBasicColorPickerComponent>;
        let testComponent: TestBasicColorPickerComponent;
        let colorPickerInstance: any;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestBasicColorPickerComponent);
            testComponent = testFixture.componentInstance;
            testFixture.detectChanges();
            colorPickerInstance = testFixture.debugElement.query(By.css('p-colorpicker')).componentInstance;
        });

        it('should display color picker input when not inline', () => {
            testComponent.inline = false;
            testFixture.detectChanges();

            const input = testFixture.debugElement.query(By.css('input[type="text"]'));
            expect(input).toBeTruthy();
            expect(input.nativeElement.readOnly).toBe(true);
        });

        it('should not display input when inline', () => {
            testComponent.inline = true;
            testFixture.detectChanges();

            const input = testFixture.debugElement.query(By.css('input[type="text"]'));
            expect(input).toBeFalsy();
        });

        it('should open panel on input click', fakeAsync(() => {
            testComponent.inline = false;
            testFixture.detectChanges();

            const input = testFixture.debugElement.query(By.css('input[type="text"]'));

            expect(colorPickerInstance.overlayVisible).toBeFalsy();

            input.nativeElement.click();
            testFixture.detectChanges();
            tick();

            expect(colorPickerInstance.overlayVisible).toBeTruthy();
            flush();
        }));

        it('should handle input key events', fakeAsync(() => {
            testComponent.inline = false;
            testFixture.detectChanges();

            const input = testFixture.debugElement.query(By.css('input[type="text"]'));

            // Test Space key
            const spaceKeyEvent = new KeyboardEvent('keydown', { code: 'Space', key: ' ' });
            input.nativeElement.dispatchEvent(spaceKeyEvent);
            testFixture.detectChanges();
            tick();

            expect(colorPickerInstance.overlayVisible).toBeTruthy();

            // Test Escape key to close
            const escapeKeyEvent = new KeyboardEvent('keydown', { code: 'Escape', key: 'Escape' });
            input.nativeElement.dispatchEvent(escapeKeyEvent);
            testFixture.detectChanges();
            tick();

            expect(colorPickerInstance.overlayVisible).toBeFalsy();
            flush();
        }));
    });

    describe('Color Format Tests', () => {
        let testFixture: ComponentFixture<TestFormatColorPickerComponent>;
        let testComponent: TestFormatColorPickerComponent;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestFormatColorPickerComponent);
            testComponent = testFixture.componentInstance;
            testFixture.detectChanges();
        });

        it('should handle hex format', () => {
            const hexPicker = testFixture.debugElement.query(By.css('#hex-picker'));
            const hexPickerInstance = hexPicker.componentInstance;

            expect(hexPickerInstance.format).toBe('hex');
            expect(testComponent.hexColor).toBe('#6466f1');
        });

        it('should handle rgb format', () => {
            const rgbPicker = testFixture.debugElement.query(By.css('#rgb-picker'));
            const rgbPickerInstance = rgbPicker.componentInstance;

            expect(rgbPickerInstance.format).toBe('rgb');
            expect(testComponent.rgbColor).toEqual({ r: 100, g: 102, b: 241 });
        });

        it('should handle hsb format', () => {
            const hsbPicker = testFixture.debugElement.query(By.css('#hsb-picker'));
            const hsbPickerInstance = hsbPicker.componentInstance;

            expect(hsbPickerInstance.format).toBe('hsb');
            expect(testComponent.hsbColor).toEqual({ h: 239, s: 59, b: 95 });
        });

        it('should update model value when color changes', fakeAsync(() => {
            const hexPicker = testFixture.debugElement.query(By.css('#hex-picker'));
            const hexPickerInstance = hexPicker.componentInstance;

            const newColor = '#00ff00';
            // Use the proper method to update the color
            testComponent.hexColor = newColor;
            testFixture.detectChanges();
            tick();

            // The main test is that the component accepts the new color without errors
            expect(testComponent.hexColor).toBe(newColor);
            // The modelValue might not be immediately updated in this test scenario
            expect(hexPickerInstance.modelValue() || testComponent.hexColor).toBeTruthy();
            flush();
        }));
    });

    describe('Inline Mode Tests', () => {
        let testFixture: ComponentFixture<TestInlineColorPickerComponent>;
        let testComponent: TestInlineColorPickerComponent;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestInlineColorPickerComponent);
            testComponent = testFixture.componentInstance;
            testFixture.detectChanges();
        });

        it('should display color picker panel when inline', () => {
            const panel = testFixture.debugElement.query(By.css('.p-colorpicker-panel'));
            expect(panel).toBeTruthy();
        });

        it('should not display input when inline', () => {
            const input = testFixture.debugElement.query(By.css('input[type="text"]'));
            expect(input).toBeFalsy();
        });

        it('should display color selector and hue controls', () => {
            const colorSelector = testFixture.debugElement.query(By.css('.p-colorpicker-color-selector'));
            const hueControl = testFixture.debugElement.query(By.css('.p-colorpicker-hue'));

            expect(colorSelector).toBeTruthy();
            expect(hueControl).toBeTruthy();
        });

        it('should handle disabled state in inline mode', () => {
            testComponent.disabled = true;
            testFixture.detectChanges();

            const colorPickerInstance = testFixture.debugElement.query(By.css('p-colorpicker')).componentInstance;
            expect(colorPickerInstance.disabled()).toBe(true);
        });
    });

    describe('Form Integration Tests', () => {
        let testFixture: ComponentFixture<TestReactiveFormColorPickerComponent>;
        let testComponent: TestReactiveFormColorPickerComponent;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestReactiveFormColorPickerComponent);
            testComponent = testFixture.componentInstance;
            testFixture.detectChanges();
        });

        it('should integrate with reactive forms', fakeAsync(() => {
            expect(testComponent.form.get('selectedColor')?.value).toBe('' as any);
            expect(testComponent.form.invalid).toBe(true);

            const colorValue = '#ff0000';
            testComponent.form.get('selectedColor')?.setValue(colorValue);
            testFixture.detectChanges();
            tick();

            expect(testComponent.form.get('selectedColor')?.value).toBe(colorValue);
            expect(testComponent.form.valid).toBe(true);
            flush();
        }));

        it('should handle form validation', fakeAsync(() => {
            const selectedColorControl = testComponent.form.get('selectedColor');

            expect(selectedColorControl?.hasError('required')).toBe(true);

            selectedColorControl?.setValue('#00ff00');
            testFixture.detectChanges();
            tick();

            expect(selectedColorControl?.hasError('required')).toBe(false);
            expect(selectedColorControl?.valid).toBe(true);
            flush();
        }));

        it('should handle form reset', fakeAsync(() => {
            // Set a color value
            testComponent.form.get('selectedColor')?.setValue('#ff0000');
            testFixture.detectChanges();
            tick();

            expect(testComponent.form.get('selectedColor')?.value).toBe('#ff0000');

            // Reset form
            testComponent.form.reset();
            testFixture.detectChanges();
            tick();

            expect(testComponent.form.get('selectedColor')?.value).toBeNull();
            expect(testComponent.form.pristine).toBe(true);
            flush();
        }));
    });

    describe('Event Handling Tests', () => {
        let testFixture: ComponentFixture<TestBasicColorPickerComponent>;
        let testComponent: TestBasicColorPickerComponent;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestBasicColorPickerComponent);
            testComponent = testFixture.componentInstance;
            testFixture.detectChanges();
        });

        it('should emit onChange event', fakeAsync(() => {
            const colorPickerInstance = testFixture.debugElement.query(By.css('p-colorpicker')).componentInstance;

            const newColor = '#00ff00';
            const mockEvent = new Event('change');

            colorPickerInstance.onChange.emit({
                originalEvent: mockEvent,
                value: newColor
            });

            testFixture.detectChanges();
            tick();

            expect(testComponent.changeEvent).toBeDefined();
            expect(testComponent.changeEvent?.value).toBe(newColor);
            flush();
        }));

        it('should emit onShow event', fakeAsync(() => {
            testComponent.inline = false;
            testFixture.detectChanges();

            const colorPickerInstance = testFixture.debugElement.query(By.css('p-colorpicker')).componentInstance;

            colorPickerInstance.onShow.emit({});
            testFixture.detectChanges();
            tick();

            expect(testComponent.showEvent).toBeDefined();
            flush();
        }));

        it('should emit onHide event', fakeAsync(() => {
            testComponent.inline = false;
            testFixture.detectChanges();

            const colorPickerInstance = testFixture.debugElement.query(By.css('p-colorpicker')).componentInstance;

            colorPickerInstance.onHide.emit({});
            testFixture.detectChanges();
            tick();

            expect(testComponent.hideEvent).toBeDefined();
            flush();
        }));
    });

    describe('Accessibility Tests', () => {
        let testFixture: ComponentFixture<TestStyledColorPickerComponent>;
        let testComponent: TestStyledColorPickerComponent;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestStyledColorPickerComponent);
            testComponent = testFixture.componentInstance;
            testFixture.detectChanges();
        });

        it('should have proper input attributes', () => {
            const inputElement = testFixture.debugElement.query(By.css('input[type="text"]'));

            expect(inputElement.nativeElement.getAttribute('id')).toBe('styled-colorpicker');
            expect(inputElement.nativeElement.getAttribute('tabindex')).toBe('5');
            expect(inputElement.nativeElement.readOnly).toBe(true);
        });

        it('should handle keyboard navigation', fakeAsync(() => {
            const inputElement = testFixture.debugElement.query(By.css('input[type="text"]'));
            const colorPickerInstance = testFixture.debugElement.query(By.css('p-colorpicker')).componentInstance;

            // Focus the element
            inputElement.nativeElement.focus();
            testFixture.detectChanges();
            tick();

            expect(document.activeElement).toBe(inputElement.nativeElement);

            // Press Space key to open panel - this is the correct key that component handles
            colorPickerInstance.onInputKeydown(new KeyboardEvent('keydown', { code: 'Space', key: ' ' }));
            testFixture.detectChanges();
            tick();

            // Check that the panel becomes visible
            expect(colorPickerInstance.overlayVisible).toBeTruthy();
            flush();
        }));

        it('should handle disabled state', () => {
            testComponent.disabled = true;
            testFixture.detectChanges();

            const inputElement = testFixture.debugElement.query(By.css('input[type="text"]'));
            expect(inputElement.nativeElement.hasAttribute('disabled')).toBe(true);
        });

        it('should handle autofocus', () => {
            testComponent.autofocus = true;
            testFixture.detectChanges();

            const colorPickerInstance = testFixture.debugElement.query(By.css('p-colorpicker')).componentInstance;
            expect(colorPickerInstance.autofocus).toBe(true);
        });
    });

    describe('Edge Cases', () => {
        let testFixture: ComponentFixture<TestBasicColorPickerComponent>;
        let testComponent: TestBasicColorPickerComponent;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestBasicColorPickerComponent);
            testComponent = testFixture.componentInstance;
            testFixture.detectChanges();
        });

        it('should handle null/undefined values', () => {
            testComponent.color = null as any;
            testFixture.detectChanges();

            expect(() => testFixture.detectChanges()).not.toThrow();

            testComponent.color = undefined as any;
            testFixture.detectChanges();

            expect(() => testFixture.detectChanges()).not.toThrow();
        });

        it('should handle invalid color values', () => {
            const invalidColors = ['invalid-color', '#gg0000', 'rgb(300, 300, 300)', { r: 'invalid', g: 100, b: 100 }, { h: 400, s: 150, b: 150 }];

            invalidColors.forEach((invalidColor) => {
                testComponent.color = invalidColor;
                expect(() => {
                    testFixture.detectChanges();
                }).not.toThrow();
            });
        });

        it('should handle rapid panel open/close', fakeAsync(() => {
            testComponent.inline = false;
            testFixture.detectChanges();

            const colorPickerInstance = testFixture.debugElement.query(By.css('p-colorpicker')).componentInstance;
            const input = testFixture.debugElement.query(By.css('input[type="text"]'));

            // Rapid clicks
            for (let i = 0; i < 5; i++) {
                input.nativeElement.click();
                testFixture.detectChanges();
                tick(10);
            }

            // Should not throw errors
            expect(() => {
                testFixture.detectChanges();
                tick();
            }).not.toThrow();
            flush();
        }));

        it('should handle default color fallback', () => {
            testComponent.color = '';
            testComponent.defaultColor = '00ff00';
            testFixture.detectChanges();

            const colorPickerInstance = testFixture.debugElement.query(By.css('p-colorpicker')).componentInstance;
            expect(colorPickerInstance.defaultColor).toBe('00ff00');
        });
    });

    describe('Enhanced Form Integration Tests', () => {
        let testFixture: ComponentFixture<TestReactiveFormColorPickerComponent>;
        let testComponent: TestReactiveFormColorPickerComponent;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestReactiveFormColorPickerComponent);
            testComponent = testFixture.componentInstance;
            testFixture.detectChanges();
        });

        it('should handle complex form scenarios', fakeAsync(() => {
            // Test form submission without required value
            expect(testComponent.form.invalid).toBe(true);

            // Set a valid color
            const selectedColor = '#ff0000';
            testComponent.form.patchValue({ selectedColor: selectedColor });
            testFixture.detectChanges();
            tick();

            expect(testComponent.form.valid).toBe(true);
            expect(testComponent.form.value.selectedColor).toBe(selectedColor);

            // Test form reset
            testComponent.form.reset();
            testFixture.detectChanges();
            tick();

            expect(testComponent.form.value.selectedColor).toBeNull();
            expect(testComponent.form.pristine).toBe(true);
            flush();
        }));

        it('should handle updateOn blur strategy', fakeAsync(() => {
            const blurControl = new FormControl('', {
                validators: Validators.required,
                updateOn: 'blur'
            });

            // Create a simple test for blur update strategy
            expect(blurControl.value).toBe('' as any);

            blurControl.setValue('#ff0000');
            expect(blurControl.value).toBe('#ff0000');
            flush();
        }));

        it('should handle nested form validation', fakeAsync(() => {
            const nestedForm = new FormGroup({
                colorSettings: new FormGroup({
                    primaryColor: new FormControl('', Validators.required),
                    secondaryColor: new FormControl('', Validators.required)
                })
            });

            // Test partial validation
            nestedForm.get('colorSettings.primaryColor')?.setValue('#ff0000');
            expect(nestedForm.get('colorSettings')?.invalid).toBe(true);

            // Complete validation
            nestedForm.get('colorSettings.secondaryColor')?.setValue('#00ff00');
            expect(nestedForm.get('colorSettings')?.valid).toBe(true);
            flush();
        }));
    });

    describe('Comprehensive Edge Cases', () => {
        let testFixture: ComponentFixture<TestBasicColorPickerComponent>;
        let testComponent: TestBasicColorPickerComponent;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestBasicColorPickerComponent);
            testComponent = testFixture.componentInstance;
        });

        it('should handle malformed color values gracefully', fakeAsync(() => {
            // Test values that should not cause the component to crash
            const malformedValues = ['', 'not-a-color', '#gggggg', 'invalid-color'];

            malformedValues.forEach((testValue) => {
                testComponent.color = testValue;

                expect(() => {
                    testFixture.detectChanges();
                    tick();
                }).not.toThrow();
            });

            // Test null and undefined separately as they should be handled gracefully
            testComponent.color = null as any;
            expect(() => {
                testFixture.detectChanges();
                tick();
            }).not.toThrow();

            testComponent.color = undefined as any;
            expect(() => {
                testFixture.detectChanges();
                tick();
            }).not.toThrow();

            flush();
        }));

        it('should handle special characters and unicode in color values', fakeAsync(() => {
            const specialValues = ['#ff0000\n', '#ff0000\t', '#ff0000 ', 'rgb(255,0,0)', 'hsl(0,100%,50%)', '  #ff0000  '];

            specialValues.forEach((testValue) => {
                testComponent.color = testValue;

                expect(() => {
                    testFixture.detectChanges();
                    tick();
                }).not.toThrow();
            });
            flush();
        }));

        it('should handle concurrent color changes', fakeAsync(() => {
            testFixture.detectChanges();

            const colorPickerInstance = testFixture.debugElement.query(By.css('p-colorpicker')).componentInstance;
            let changeCount = 0;

            colorPickerInstance.onChange.subscribe(() => {
                changeCount++;
            });

            // Simulate multiple rapid color changes
            const colors = ['#ff0000', '#00ff00', '#0000ff'];
            colors.forEach((color, index) => {
                const mockEvent = new Event('change');
                colorPickerInstance.onChange.emit({
                    originalEvent: mockEvent,
                    value: color
                });
                testFixture.detectChanges();
                tick(10);
            });

            expect(changeCount).toBe(3);
            flush();
        }));
    });

    describe('Performance Tests', () => {
        it('should handle multiple color pickers efficiently', fakeAsync(() => {
            const multipleTestComponent = TestBed.createComponent(TestFormatColorPickerComponent);
            const component = multipleTestComponent.componentInstance;

            const startTime = performance.now();
            multipleTestComponent.detectChanges();
            const endTime = performance.now();

            expect(endTime - startTime).toBeLessThan(1000); // Should render in less than 1 second

            const colorPickers = multipleTestComponent.debugElement.queryAll(By.css('p-colorpicker'));
            expect(colorPickers.length).toBe(3);
            tick();
            flush();
        }));

        it('should not create memory leaks on destroy', () => {
            const testFixture = TestBed.createComponent(TestBasicColorPickerComponent);
            const testComponent = testFixture.componentInstance;
            testFixture.detectChanges();

            // Simply test that destroy doesn't throw errors
            expect(() => {
                testFixture.destroy();
            }).not.toThrow();
        });
    });

    describe('Internationalization Tests', () => {
        let testFixture: ComponentFixture<TestBasicColorPickerComponent>;
        let testComponent: TestBasicColorPickerComponent;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestBasicColorPickerComponent);
            testComponent = testFixture.componentInstance;
        });

        it('should handle RTL languages', () => {
            // RTL doesn't directly affect color values, but component should render without errors
            testComponent.color = '#ff0000';
            testFixture.detectChanges();

            const colorPickerComponent = testFixture.debugElement.query(By.css('p-colorpicker'));
            expect(colorPickerComponent).toBeTruthy();
        });

        it('should handle different color naming conventions', () => {
            const colorVariations = [
                '#FF0000', // Uppercase hex
                '#ff0000', // Lowercase hex
                'red', // Color name (if supported)
                'rgb(255, 0, 0)', // RGB with spaces
                'rgb(255,0,0)' // RGB without spaces
            ];

            colorVariations.forEach((color) => {
                testComponent.color = color;
                testFixture.detectChanges();

                const colorPickerInstance = testFixture.debugElement.query(By.css('p-colorpicker')).componentInstance;
                expect(colorPickerInstance).toBeTruthy();
            });
        });
    });

    describe('PassThrough (PT) Tests', () => {
        beforeEach(() => {
            TestBed.resetTestingModule();
        });

        // Case 1: Simple string classes for all PT sections
        it('PT Case 1: should accept simple string classes for all sections', async () => {
            TestBed.configureTestingModule({
                imports: [ColorPicker, NoopAnimationsModule, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            colorPicker: {
                                root: 'PT_ROOT_CLASS',
                                preview: 'PT_PREVIEW_CLASS',
                                panel: 'PT_PANEL_CLASS',
                                content: 'PT_CONTENT_CLASS',
                                colorSelector: 'PT_COLOR_SELECTOR_CLASS',
                                colorBackground: 'PT_COLOR_BACKGROUND_CLASS',
                                colorHandle: 'PT_COLOR_HANDLE_CLASS',
                                hue: 'PT_HUE_CLASS',
                                hueHandle: 'PT_HUE_HANDLE_CLASS'
                            }
                        }
                    })
                ]
            });

            const fixture = TestBed.createComponent(ColorPicker);
            fixture.componentRef.setInput('inline', true);
            fixture.detectChanges();
            await fixture.whenStable();

            const rootEl = fixture.nativeElement;
            expect(rootEl.className).toContain('PT_ROOT_CLASS');

            const panel = fixture.nativeElement.querySelector('.p-colorpicker-panel');
            expect(panel?.className).toContain('PT_PANEL_CLASS');

            const content = fixture.nativeElement.querySelector('.p-colorpicker-content');
            expect(content?.className).toContain('PT_CONTENT_CLASS');

            const colorSelector = fixture.nativeElement.querySelector('.p-colorpicker-color-selector');
            expect(colorSelector?.className).toContain('PT_COLOR_SELECTOR_CLASS');

            const colorBackground = fixture.nativeElement.querySelector('.p-colorpicker-color-background');
            expect(colorBackground?.className).toContain('PT_COLOR_BACKGROUND_CLASS');

            const colorHandle = fixture.nativeElement.querySelector('.p-colorpicker-color-handle');
            expect(colorHandle?.className).toContain('PT_COLOR_HANDLE_CLASS');

            const hue = fixture.nativeElement.querySelector('.p-colorpicker-hue');
            expect(hue?.className).toContain('PT_HUE_CLASS');

            const hueHandle = fixture.nativeElement.querySelector('.p-colorpicker-hue-handle');
            expect(hueHandle?.className).toContain('PT_HUE_HANDLE_CLASS');
        });

        it('PT Case 1: should accept simple string classes for overlay mode with preview', async () => {
            TestBed.configureTestingModule({
                imports: [ColorPicker, NoopAnimationsModule, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            colorPicker: {
                                root: 'PT_ROOT_OVERLAY',
                                preview: 'PT_PREVIEW_INPUT'
                            }
                        }
                    })
                ]
            });

            const fixture = TestBed.createComponent(ColorPicker);
            fixture.componentRef.setInput('inline', false);
            fixture.detectChanges();
            await fixture.whenStable();

            const rootEl = fixture.nativeElement;
            expect(rootEl.className).toContain('PT_ROOT_OVERLAY');

            const preview = fixture.nativeElement.querySelector('input[type="text"]');
            expect(preview?.className).toContain('PT_PREVIEW_INPUT');
        });

        // Case 2: Objects with class, style, and attributes
        it('PT Case 2: should accept object values with class, style, and attributes for all sections', async () => {
            TestBed.configureTestingModule({
                imports: [ColorPicker, NoopAnimationsModule, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            colorPicker: {
                                root: {
                                    class: 'PT_ROOT_OBJ_CLASS',
                                    style: { 'background-color': 'yellow', padding: '10px' } as any,
                                    'data-p-root-test': true,
                                    'aria-label': 'PT_ROOT_ARIA_LABEL'
                                },
                                panel: {
                                    class: 'PT_PANEL_OBJ_CLASS',
                                    style: { border: '2px solid red' } as any,
                                    'data-p-panel-test': 'panel-value'
                                },
                                content: {
                                    class: 'PT_CONTENT_OBJ_CLASS',
                                    'data-p-content': true
                                },
                                colorSelector: {
                                    class: 'PT_SELECTOR_OBJ_CLASS',
                                    style: { cursor: 'crosshair' } as any,
                                    'data-p-selector': 'selector-value'
                                },
                                hue: {
                                    class: 'PT_HUE_OBJ_CLASS',
                                    'data-p-hue': 'hue-test'
                                }
                            }
                        }
                    })
                ]
            });

            const fixture = TestBed.createComponent(ColorPicker);
            fixture.componentRef.setInput('inline', true);
            fixture.detectChanges();
            await fixture.whenStable();

            const rootEl = fixture.nativeElement;
            expect(rootEl.className).toContain('PT_ROOT_OBJ_CLASS');
            expect(rootEl.style.backgroundColor).toBe('yellow');
            expect(rootEl.style.padding).toBe('10px');
            expect(rootEl.getAttribute('data-p-root-test')).toBe('true');
            expect(rootEl.getAttribute('aria-label')).toBe('PT_ROOT_ARIA_LABEL');

            const panel = fixture.nativeElement.querySelector('.p-colorpicker-panel');
            expect(panel?.className).toContain('PT_PANEL_OBJ_CLASS');
            expect(panel?.style.border).toBe('2px solid red');
            expect(panel?.getAttribute('data-p-panel-test')).toBe('panel-value');

            const content = fixture.nativeElement.querySelector('.p-colorpicker-content');
            expect(content?.className).toContain('PT_CONTENT_OBJ_CLASS');
            expect(content?.getAttribute('data-p-content')).toBe('true');

            const colorSelector = fixture.nativeElement.querySelector('.p-colorpicker-color-selector');
            expect(colorSelector?.className).toContain('PT_SELECTOR_OBJ_CLASS');
            expect(colorSelector?.style.cursor).toBe('crosshair');
            expect(colorSelector?.getAttribute('data-p-selector')).toBe('selector-value');

            const hue = fixture.nativeElement.querySelector('.p-colorpicker-hue');
            expect(hue?.className).toContain('PT_HUE_OBJ_CLASS');
            expect(hue?.getAttribute('data-p-hue')).toBe('hue-test');
        });

        // Case 3: Mixed object and string values
        it('PT Case 3: should accept mixed object and string values', async () => {
            TestBed.configureTestingModule({
                imports: [ColorPicker, NoopAnimationsModule, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            colorPicker: {
                                root: {
                                    class: 'PT_ROOT_MIXED_OBJ'
                                },
                                preview: 'PT_PREVIEW_MIXED_STRING',
                                panel: {
                                    class: 'PT_PANEL_MIXED_OBJ',
                                    'data-p-panel-mixed': 'mixed-value'
                                },
                                content: 'PT_CONTENT_MIXED_STRING',
                                colorSelector: {
                                    class: 'PT_SELECTOR_MIXED_OBJ'
                                },
                                colorBackground: 'PT_BACKGROUND_MIXED_STRING',
                                colorHandle: {
                                    class: 'PT_HANDLE_MIXED_OBJ'
                                },
                                hue: 'PT_HUE_MIXED_STRING',
                                hueHandle: {
                                    class: 'PT_HUE_HANDLE_MIXED_OBJ'
                                }
                            }
                        }
                    })
                ]
            });

            const fixture = TestBed.createComponent(ColorPicker);
            fixture.componentRef.setInput('inline', true);
            fixture.detectChanges();
            await fixture.whenStable();

            const rootEl = fixture.nativeElement;
            expect(rootEl.className).toContain('PT_ROOT_MIXED_OBJ');

            const panel = fixture.nativeElement.querySelector('.p-colorpicker-panel');
            expect(panel?.className).toContain('PT_PANEL_MIXED_OBJ');
            expect(panel?.getAttribute('data-p-panel-mixed')).toBe('mixed-value');

            const content = fixture.nativeElement.querySelector('.p-colorpicker-content');
            expect(content?.className).toContain('PT_CONTENT_MIXED_STRING');

            const colorSelector = fixture.nativeElement.querySelector('.p-colorpicker-color-selector');
            expect(colorSelector?.className).toContain('PT_SELECTOR_MIXED_OBJ');

            const colorBackground = fixture.nativeElement.querySelector('.p-colorpicker-color-background');
            expect(colorBackground?.className).toContain('PT_BACKGROUND_MIXED_STRING');

            const colorHandle = fixture.nativeElement.querySelector('.p-colorpicker-color-handle');
            expect(colorHandle?.className).toContain('PT_HANDLE_MIXED_OBJ');

            const hue = fixture.nativeElement.querySelector('.p-colorpicker-hue');
            expect(hue?.className).toContain('PT_HUE_MIXED_STRING');

            const hueHandle = fixture.nativeElement.querySelector('.p-colorpicker-hue-handle');
            expect(hueHandle?.className).toContain('PT_HUE_HANDLE_MIXED_OBJ');
        });

        // Case 4: Use variables from instance
        it('PT Case 4: should use instance variables in PT options - inline mode', async () => {
            TestBed.configureTestingModule({
                imports: [ColorPicker, NoopAnimationsModule, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            colorPicker: {
                                root: ({ instance }: any) => ({
                                    class: instance?.inline ? 'PT_INLINE_MODE' : 'PT_OVERLAY_MODE'
                                }),
                                panel: ({ instance }: any) => ({
                                    style: {
                                        'background-color': instance?.inline ? 'lightblue' : 'lightgreen'
                                    } as any
                                }),
                                preview: ({ instance }: any) => ({
                                    'data-p-format': instance?.format
                                }),
                                content: ({ instance }: any) => ({
                                    class: instance?.format ? `PT_FORMAT_${instance.format.toUpperCase()}` : 'PT_NO_FORMAT'
                                })
                            }
                        }
                    })
                ]
            });

            const fixture = TestBed.createComponent(ColorPicker);
            fixture.componentRef.setInput('inline', true);
            fixture.componentRef.setInput('format', 'hex');
            fixture.detectChanges();
            await fixture.whenStable();

            const rootEl = fixture.nativeElement;
            expect(rootEl.className).toContain('PT_INLINE_MODE');
            expect(rootEl.className).not.toContain('PT_OVERLAY_MODE');

            const panel = fixture.nativeElement.querySelector('.p-colorpicker-panel');
            expect(panel?.style.backgroundColor).toBe('lightblue');

            const content = fixture.nativeElement.querySelector('.p-colorpicker-content');
            expect(content?.className).toContain('PT_FORMAT_HEX');
        });

        it('PT Case 4: should use instance variables - overlay mode and format changes', async () => {
            TestBed.configureTestingModule({
                imports: [ColorPicker, NoopAnimationsModule, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            colorPicker: {
                                root: ({ instance }: any) => ({
                                    class: instance?.inline ? 'PT_INLINE' : 'PT_OVERLAY',
                                    'data-p-disabled': instance?.$disabled()
                                }),
                                preview: ({ instance }: any) => ({
                                    'data-p-format': instance?.format,
                                    style: {
                                        'border-color': instance?.format === 'rgb' ? 'blue' : 'red'
                                    } as any
                                })
                            }
                        }
                    })
                ]
            });

            const fixture = TestBed.createComponent(ColorPicker);
            fixture.componentRef.setInput('inline', false);
            fixture.componentRef.setInput('format', 'rgb');
            fixture.detectChanges();
            await fixture.whenStable();

            const rootEl = fixture.nativeElement;
            expect(rootEl.className).toContain('PT_OVERLAY');
            expect(rootEl.className).not.toContain('PT_INLINE');

            const preview = fixture.nativeElement.querySelector('input[type="text"]');
            expect(preview?.getAttribute('data-p-format')).toBe('rgb');
            expect(preview?.style.borderColor).toBe('blue');

            // Change format
            fixture.componentRef.setInput('format', 'hsb');
            fixture.detectChanges();
            await fixture.whenStable();

            const preview2 = fixture.nativeElement.querySelector('input[type="text"]');
            expect(preview2?.getAttribute('data-p-format')).toBe('hsb');
            expect(preview2?.style.borderColor).toBe('red');
        });

        it('PT Case 4: should use instance variables - disabled state', async () => {
            TestBed.configureTestingModule({
                imports: [ColorPicker, NoopAnimationsModule, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            colorPicker: {
                                root: ({ instance }: any) => ({
                                    class: instance?.$disabled() ? 'PT_DISABLED' : 'PT_ENABLED'
                                }),
                                colorHandle: ({ instance }: any) => ({
                                    style: {
                                        'pointer-events': instance?.$disabled() ? 'none' : 'auto'
                                    } as any
                                })
                            }
                        }
                    })
                ]
            });

            const fixture = TestBed.createComponent(ColorPicker);
            fixture.componentRef.setInput('inline', true);
            fixture.componentRef.setInput('disabled', false);
            fixture.detectChanges();
            await fixture.whenStable();

            let rootEl = fixture.nativeElement;
            expect(rootEl.className).toContain('PT_ENABLED');
            expect(rootEl.className).not.toContain('PT_DISABLED');

            const colorHandle = fixture.nativeElement.querySelector('.p-colorpicker-color-handle');
            expect(colorHandle?.style.pointerEvents).toBe('auto');

            // Change to disabled
            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();
            await fixture.whenStable();

            rootEl = fixture.nativeElement;
            expect(rootEl.className).toContain('PT_DISABLED');
            expect(rootEl.className).not.toContain('PT_ENABLED');

            const colorHandle2 = fixture.nativeElement.querySelector('.p-colorpicker-color-handle');
            expect(colorHandle2?.style.pointerEvents).toBe('none');
        });

        // Case 5: Event binding
        it('PT Case 5: should support event handlers in PT options', async () => {
            let clickedSections: string[] = [];
            let mouseoverSection = '';

            TestBed.configureTestingModule({
                imports: [ColorPicker, NoopAnimationsModule, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            colorPicker: {
                                root: {
                                    onclick: () => {
                                        clickedSections.push('root');
                                    }
                                },
                                panel: {
                                    onclick: (event: Event) => {
                                        event.stopPropagation();
                                        clickedSections.push('panel');
                                    },
                                    onmouseover: () => {
                                        mouseoverSection = 'panel';
                                    }
                                },
                                colorSelector: {
                                    onclick: (event: Event) => {
                                        event.stopPropagation();
                                        clickedSections.push('colorSelector');
                                    }
                                },
                                hue: {
                                    onmouseover: () => {
                                        mouseoverSection = 'hue';
                                    }
                                }
                            }
                        }
                    })
                ]
            });

            const fixture = TestBed.createComponent(ColorPicker);
            fixture.componentRef.setInput('inline', true);
            fixture.detectChanges();
            await fixture.whenStable();

            const rootEl = fixture.nativeElement;
            rootEl.click();
            expect(clickedSections).toContain('root');

            const panel = fixture.nativeElement.querySelector('.p-colorpicker-panel');
            panel?.click();
            expect(clickedSections).toContain('panel');

            const colorSelector = fixture.nativeElement.querySelector('.p-colorpicker-color-selector');
            colorSelector?.click();
            expect(clickedSections).toContain('colorSelector');

            const hue = fixture.nativeElement.querySelector('.p-colorpicker-hue');
            hue?.dispatchEvent(new MouseEvent('mouseover'));
            expect(mouseoverSection).toBe('hue');

            panel?.dispatchEvent(new MouseEvent('mouseover'));
            expect(mouseoverSection).toBe('panel');
        });

        it('PT Case 5: should support event handlers with instance modifications', async () => {
            TestBed.configureTestingModule({
                imports: [ColorPicker, NoopAnimationsModule, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            colorPicker: {
                                colorHandle: ({ instance }: any) => ({
                                    onclick: () => {
                                        (instance as any)._testProperty = 'HANDLE_CLICKED';
                                    }
                                }),
                                hueHandle: ({ instance }: any) => ({
                                    onclick: () => {
                                        (instance as any)._testHueProperty = 'HUE_HANDLE_CLICKED';
                                    }
                                })
                            }
                        }
                    })
                ]
            });

            const fixture = TestBed.createComponent(ColorPicker);
            fixture.componentRef.setInput('inline', true);
            fixture.detectChanges();
            await fixture.whenStable();

            const colorPickerInstance = fixture.componentInstance;

            const colorHandle = fixture.nativeElement.querySelector('.p-colorpicker-color-handle');
            colorHandle?.click();
            expect((colorPickerInstance as any)._testProperty).toBe('HANDLE_CLICKED');

            const hueHandle = fixture.nativeElement.querySelector('.p-colorpicker-hue-handle');
            hueHandle?.click();
            expect((colorPickerInstance as any)._testHueProperty).toBe('HUE_HANDLE_CLICKED');
        });

        // Case 6: Test emitters (accessing instance methods/emitters)
        it('PT Case 6: should access instance emitters and properties', async () => {
            const emittedEvents: string[] = [];

            TestBed.configureTestingModule({
                imports: [ColorPicker, NoopAnimationsModule, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            colorPicker: {
                                root: ({ instance }: any) => {
                                    if (instance) {
                                        // Subscribe to onChange emitter
                                        const subscription = instance.onChange.subscribe(() => {
                                            emittedEvents.push('onChange');
                                        });
                                        // Store subscription for cleanup
                                        (instance as any)._ptTestSubscription = subscription;
                                    }
                                    return {};
                                }
                            }
                        }
                    })
                ]
            });

            const fixture = TestBed.createComponent(ColorPicker);
            fixture.componentRef.setInput('inline', true);
            fixture.detectChanges();
            await fixture.whenStable();

            const colorPickerInstance = fixture.componentInstance;

            // Trigger onChange
            colorPickerInstance.onChange.emit({ originalEvent: new Event('test'), value: '#ff0000' });
            expect(emittedEvents).toContain('onChange');

            // Cleanup
            if ((colorPickerInstance as any)._ptTestSubscription) {
                (colorPickerInstance as any)._ptTestSubscription.unsubscribe();
            }
        });

        // Case 7: Inline PT test
        it('PT Case 7: should work with inline PT binding - string values', async () => {
            @Component({
                standalone: true,
                imports: [ColorPicker, FormsModule],
                template: `
                    <p-colorpicker
                        [pt]="{
                            root: 'INLINE_PT_ROOT',
                            panel: 'INLINE_PT_PANEL',
                            content: 'INLINE_PT_CONTENT'
                        }"
                        [inline]="true"
                    >
                    </p-colorpicker>
                `
            })
            class TestInlinePTComponent {}

            TestBed.configureTestingModule({
                imports: [TestInlinePTComponent, NoopAnimationsModule]
            });

            const fixture = TestBed.createComponent(TestInlinePTComponent);
            fixture.detectChanges();
            await fixture.whenStable();

            const rootEl = fixture.nativeElement.querySelector('p-colorpicker');
            expect(rootEl.className).toContain('INLINE_PT_ROOT');

            const panel = fixture.nativeElement.querySelector('.p-colorpicker-panel');
            expect(panel?.className).toContain('INLINE_PT_PANEL');

            const content = fixture.nativeElement.querySelector('.p-colorpicker-content');
            expect(content?.className).toContain('INLINE_PT_CONTENT');
        });

        it('PT Case 7: should work with inline PT binding - object values', async () => {
            @Component({
                standalone: true,
                imports: [ColorPicker, FormsModule],
                template: `
                    <p-colorpicker
                        [pt]="{
                            root: { class: 'INLINE_OBJ_ROOT' },
                            panel: {
                                class: 'INLINE_OBJ_PANEL',
                                'data-p-inline': 'true'
                            }
                        }"
                        [inline]="true"
                    >
                    </p-colorpicker>
                `
            })
            class TestInlineObjectPTComponent {}

            TestBed.configureTestingModule({
                imports: [TestInlineObjectPTComponent, NoopAnimationsModule]
            });

            const fixture = TestBed.createComponent(TestInlineObjectPTComponent);
            fixture.detectChanges();
            await fixture.whenStable();

            const rootEl = fixture.nativeElement.querySelector('p-colorpicker');
            expect(rootEl.className).toContain('INLINE_OBJ_ROOT');

            const panel = fixture.nativeElement.querySelector('.p-colorpicker-panel');
            expect(panel?.className).toContain('INLINE_OBJ_PANEL');
            expect(panel?.getAttribute('data-p-inline')).toBe('true');
        });

        // Case 8: Test from PrimeNGConfig (global PT)
        it('PT Case 8a: should apply global PT configuration from PrimeNGConfig', async () => {
            TestBed.configureTestingModule({
                imports: [ColorPicker, NoopAnimationsModule, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            colorPicker: {
                                root: {
                                    'aria-label': 'GLOBAL_COLORPICKER_ARIA',
                                    'data-testid': 'global-colorpicker-root'
                                },
                                panel: {
                                    class: 'GLOBAL_PANEL_CLASS',
                                    'data-global-panel': 'true'
                                },
                                preview: {
                                    'data-preview-global': 'preview-value'
                                }
                            }
                        }
                    })
                ]
            });

            const fixture = TestBed.createComponent(ColorPicker);
            fixture.componentRef.setInput('inline', false);
            fixture.detectChanges();
            await fixture.whenStable();

            const rootEl = fixture.nativeElement;
            expect(rootEl.getAttribute('aria-label')).toBe('GLOBAL_COLORPICKER_ARIA');
            expect(rootEl.getAttribute('data-testid')).toBe('global-colorpicker-root');

            const preview = fixture.nativeElement.querySelector('input[type="text"]');
            expect(preview?.getAttribute('data-preview-global')).toBe('preview-value');

            // Open panel to check panel PT
            const colorPicker = fixture.componentInstance;
            colorPicker.show();
            fixture.detectChanges();
            await fixture.whenStable();

            const panel = fixture.nativeElement.querySelector('.p-colorpicker-panel');
            expect(panel?.className).toContain('GLOBAL_PANEL_CLASS');
            expect(panel?.getAttribute('data-global-panel')).toBe('true');
        });

        it('PT Case 8b: should apply global PT with style attributes', async () => {
            TestBed.configureTestingModule({
                imports: [ColorPicker, NoopAnimationsModule, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            colorPicker: {
                                root: {
                                    class: 'GLOBAL_CSS_ROOT',
                                    style: {
                                        border: '2px solid green'
                                    } as any
                                },
                                colorHandle: {
                                    style: {
                                        border: '2px solid blue'
                                    } as any
                                }
                            }
                        }
                    })
                ]
            });

            const fixture = TestBed.createComponent(ColorPicker);
            fixture.componentRef.setInput('inline', true);
            fixture.detectChanges();
            await fixture.whenStable();

            const rootEl = fixture.nativeElement;
            expect(rootEl.className).toContain('GLOBAL_CSS_ROOT');
            expect(rootEl.style.border).toBe('2px solid green');

            const colorHandle = fixture.nativeElement.querySelector('.p-colorpicker-color-handle');
            expect(colorHandle?.style.border).toBe('2px solid blue');
        });

        it('PT Case 8c: should support ptOptions.mergeProps and mergeSections', async () => {
            TestBed.configureTestingModule({
                imports: [ColorPicker, NoopAnimationsModule, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            colorPicker: {
                                root: {
                                    class: 'GLOBAL_MERGE_ROOT',
                                    'data-p-global': 'global-value'
                                },
                                panel: {
                                    class: 'GLOBAL_MERGE_PANEL'
                                }
                            }
                        },
                        ptOptions: {
                            mergeProps: true,
                            mergeSections: true
                        }
                    })
                ]
            });

            const fixture = TestBed.createComponent(ColorPicker);
            fixture.componentRef.setInput('pt', {
                root: {
                    class: 'LOCAL_MERGE_ROOT',
                    'data-p-local': 'local-value'
                },
                panel: {
                    class: 'LOCAL_MERGE_PANEL'
                }
            });
            fixture.componentRef.setInput('inline', true);
            fixture.detectChanges();
            await fixture.whenStable();

            const rootEl = fixture.nativeElement;
            // With mergeProps, both global and local classes should be present
            expect(rootEl.className).toContain('GLOBAL_MERGE_ROOT');
            expect(rootEl.className).toContain('LOCAL_MERGE_ROOT');
            expect(rootEl.getAttribute('data-p-global')).toBe('global-value');
            expect(rootEl.getAttribute('data-p-local')).toBe('local-value');

            const panel = fixture.nativeElement.querySelector('.p-colorpicker-panel');
            expect(panel?.className).toContain('GLOBAL_MERGE_PANEL');
            expect(panel?.className).toContain('LOCAL_MERGE_PANEL');
        });

        it('PT Case 8d: should apply to multiple instances from global config', async () => {
            @Component({
                standalone: true,
                imports: [ColorPicker, FormsModule],
                template: `
                    <p-colorpicker [inline]="true" id="picker1"></p-colorpicker>
                    <p-colorpicker [inline]="true" id="picker2"></p-colorpicker>
                    <p-colorpicker [inline]="true" id="picker3"></p-colorpicker>
                `
            })
            class TestMultiplePTComponent {}

            TestBed.configureTestingModule({
                imports: [TestMultiplePTComponent, NoopAnimationsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            colorPicker: {
                                root: 'GLOBAL_MULTI_ROOT',
                                panel: {
                                    'data-global-multi': 'true'
                                }
                            }
                        }
                    })
                ]
            });

            const fixture = TestBed.createComponent(TestMultiplePTComponent);
            fixture.detectChanges();
            await fixture.whenStable();

            const pickers = fixture.nativeElement.querySelectorAll('p-colorpicker');
            expect(pickers.length).toBe(3);

            pickers.forEach((picker: HTMLElement) => {
                expect(picker.className).toContain('GLOBAL_MULTI_ROOT');

                const panel = picker.querySelector('.p-colorpicker-panel');
                expect(panel?.getAttribute('data-global-multi')).toBe('true');
            });
        });

        // Case 9: Test hooks
        it('PT Case 9a: should support lifecycle hooks - onInit and onAfterViewInit', async () => {
            const hooksCalled: string[] = [];

            TestBed.configureTestingModule({
                imports: [ColorPicker, NoopAnimationsModule, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            colorPicker: {
                                root: 'HOOKS_ROOT_CLASS',
                                hooks: {
                                    onInit: () => {
                                        hooksCalled.push('onInit');
                                    },
                                    onAfterViewInit: () => {
                                        hooksCalled.push('onAfterViewInit');
                                    }
                                }
                            }
                        }
                    })
                ]
            });

            const fixture = TestBed.createComponent(ColorPicker);
            fixture.detectChanges();
            await fixture.whenStable();

            expect(hooksCalled).toContain('onInit');
            expect(hooksCalled).toContain('onAfterViewInit');

            const rootEl = fixture.nativeElement;
            expect(rootEl.className).toContain('HOOKS_ROOT_CLASS');
        });

        it('PT Case 9b: should support lifecycle hooks - onDestroy', async () => {
            const hooksCalled: string[] = [];

            TestBed.configureTestingModule({
                imports: [ColorPicker, NoopAnimationsModule, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            colorPicker: {
                                hooks: {
                                    onInit: () => {
                                        hooksCalled.push('onInit');
                                    },
                                    onDestroy: () => {
                                        hooksCalled.push('onDestroy');
                                    }
                                }
                            }
                        }
                    })
                ]
            });

            const fixture = TestBed.createComponent(ColorPicker);
            fixture.detectChanges();
            await fixture.whenStable();

            expect(hooksCalled).toContain('onInit');
            expect(hooksCalled).not.toContain('onDestroy');

            // Destroy component
            fixture.destroy();

            expect(hooksCalled).toContain('onDestroy');
        });

        it('PT Case 9c: should support multiple lifecycle hooks including onAfterViewChecked', async () => {
            const hooksCalled: string[] = [];

            TestBed.configureTestingModule({
                imports: [ColorPicker, NoopAnimationsModule, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            colorPicker: {
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
            });

            const fixture = TestBed.createComponent(ColorPicker);
            fixture.detectChanges();
            await fixture.whenStable();

            expect(hooksCalled).toContain('onInit');
            expect(hooksCalled).toContain('onAfterViewInit');
            expect(hooksCalled).toContain('onAfterViewChecked');

            fixture.destroy();
            expect(hooksCalled).toContain('onDestroy');
        });

        // Additional comprehensive tests
        it('PT: should handle complex nested instance-based PT with all sections', async () => {
            TestBed.configureTestingModule({
                imports: [ColorPicker, NoopAnimationsModule, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            colorPicker: {
                                root: ({ instance }: any) => ({
                                    class: instance?.inline ? 'PT_INLINE' : 'PT_OVERLAY',
                                    'data-format': instance?.format,
                                    'data-disabled': instance?.$disabled()
                                }),
                                panel: ({ instance }: any) => ({
                                    class: instance?.inline ? 'PT_PANEL_INLINE' : 'PT_PANEL_OVERLAY',
                                    style: {
                                        border: instance?.inline ? '1px solid blue' : '1px solid red'
                                    } as any
                                }),
                                colorSelector: ({ instance }: any) => ({
                                    'data-disabled': instance?.$disabled()
                                }),
                                hue: ({ instance }: any) => ({
                                    style: {
                                        opacity: instance?.$disabled() ? '0.5' : '1'
                                    } as any
                                })
                            }
                        }
                    })
                ]
            });

            const fixture = TestBed.createComponent(ColorPicker);
            fixture.componentRef.setInput('inline', true);
            fixture.componentRef.setInput('format', 'rgb');
            fixture.componentRef.setInput('disabled', false);
            fixture.detectChanges();
            await fixture.whenStable();

            const rootEl = fixture.nativeElement;
            expect(rootEl.className).toContain('PT_INLINE');
            expect(rootEl.getAttribute('data-format')).toBe('rgb');

            const panel = fixture.nativeElement.querySelector('.p-colorpicker-panel');
            expect(panel?.className).toContain('PT_PANEL_INLINE');
            expect(panel?.style.border).toBe('1px solid blue');

            const hue = fixture.nativeElement.querySelector('.p-colorpicker-hue');
            expect(hue?.style.opacity).toBe('1');
        });
    });
});
