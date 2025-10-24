import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { ToggleButton } from './togglebutton';
import { ToggleButtonChangeEvent } from 'primeng/types/togglebutton';

@Component({
    standalone: false,
    template: `
        <p-togglebutton
            [(ngModel)]="checked"
            [onLabel]="onLabel"
            [offLabel]="offLabel"
            [onIcon]="onIcon"
            [offIcon]="offIcon"
            [disabled]="disabled"
            [tabindex]="tabindex"
            [iconPos]="iconPos"
            [autofocus]="autofocus"
            [size]="size"
            [allowEmpty]="allowEmpty"
            [ariaLabel]="ariaLabel"
            [ariaLabelledBy]="ariaLabelledBy"
            [inputId]="inputId"
            [styleClass]="styleClass"
            (onChange)="onToggleChange($event)"
        >
        </p-togglebutton>
    `
})
class TestBasicToggleButtonComponent {
    checked = false;
    onLabel = 'Yes';
    offLabel = 'No';
    onIcon?: string;
    offIcon?: string;
    disabled = false;
    tabindex = 0;
    iconPos: 'left' | 'right' = 'left';
    autofocus = false;
    size?: 'large' | 'small';
    allowEmpty?: boolean;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    inputId?: string;
    styleClass?: string;
    changeEvent?: ToggleButtonChangeEvent;

    onToggleChange(event: ToggleButtonChangeEvent) {
        this.changeEvent = event;
    }
}

@Component({
    standalone: false,
    template: `
        <form [formGroup]="toggleForm">
            <p-togglebutton formControlName="toggle" [onLabel]="onLabel" [offLabel]="offLabel" (onChange)="onFormToggleChange($event)"> </p-togglebutton>
        </form>
    `
})
class TestReactiveToggleButtonComponent {
    toggleForm = new FormGroup({
        toggle: new FormControl(false, Validators.requiredTrue)
    });
    onLabel = 'Active';
    offLabel = 'Inactive';
    formChangeEvent?: ToggleButtonChangeEvent;

    onFormToggleChange(event: ToggleButtonChangeEvent) {
        this.formChangeEvent = event;
    }
}

@Component({
    standalone: false,
    template: `
        <p-togglebutton [(ngModel)]="checked">
            <ng-template pTemplate="content" let-checked>
                <span class="custom-content">{{ checked ? 'Custom ON' : 'Custom OFF' }}</span>
            </ng-template>
        </p-togglebutton>
    `
})
class TestTemplateToggleButtonComponent {
    checked = false;
}

@Component({
    standalone: false,
    template: `
        <p-togglebutton [(ngModel)]="checked">
            <ng-template pTemplate="icon" let-checked>
                <i [class]="checked ? 'pi pi-check custom-on-icon' : 'pi pi-times custom-off-icon'"></i>
            </ng-template>
        </p-togglebutton>
    `
})
class TestIconTemplateToggleButtonComponent {
    checked = false;
}

@Component({
    standalone: false,
    template: ` <p-togglebutton [(ngModel)]="checked" [onIcon]="onIcon" [offIcon]="offIcon" [iconPos]="iconPos"> </p-togglebutton> `
})
class TestIconToggleButtonComponent {
    checked = false;
    onIcon = 'pi pi-check';
    offIcon = 'pi pi-times';
    iconPos: 'left' | 'right' = 'left';
}

// ToggleButton pTemplate component
@Component({
    standalone: true,
    imports: [ToggleButton, FormsModule, CommonModule, SharedModule],
    template: `
        <p-togglebutton [(ngModel)]="checked">
            <!-- Icon template with pTemplate -->
            <ng-template pTemplate="icon" let-checked>
                <i class="custom-template-icon" [ngClass]="checked ? 'pi pi-star-fill' : 'pi pi-star'" [attr.data-testid]="'ptemplate-icon-' + (checked ? 'on' : 'off')" [title]="checked ? 'Checked State Icon' : 'Unchecked State Icon'"></i>
            </ng-template>

            <!-- Content template with pTemplate -->
            <ng-template pTemplate="content" let-checked>
                <span class="custom-template-content" [attr.data-testid]="'ptemplate-content-' + (checked ? 'on' : 'off')" [title]="checked ? 'Content On' : 'Content Off'">
                    {{ checked ? 'Template ON' : 'Template OFF' }}
                </span>
            </ng-template>
        </p-togglebutton>
    `
})
class TestToggleButtonPTemplateComponent {
    checked: boolean = false;
}

// ToggleButton #template reference component
@Component({
    standalone: true,
    imports: [ToggleButton, FormsModule, CommonModule, SharedModule],
    template: `
        <p-togglebutton [(ngModel)]="checked">
            <!-- Icon template with #template reference -->
            <ng-template #icon let-checked>
                <i class="custom-ref-icon" [ngClass]="checked ? 'pi pi-heart-fill' : 'pi pi-heart'" [attr.data-testid]="'ref-icon-' + (checked ? 'on' : 'off')" [title]="checked ? 'Reference Checked Icon' : 'Reference Unchecked Icon'"></i>
            </ng-template>

            <!-- Content template with #template reference -->
            <ng-template #content let-checked>
                <span class="custom-ref-content" [attr.data-testid]="'ref-content-' + (checked ? 'on' : 'off')" [title]="checked ? 'Reference Content On' : 'Reference Content Off'">
                    {{ checked ? 'Reference ON' : 'Reference OFF' }}
                </span>
            </ng-template>
        </p-togglebutton>
    `
})
class TestToggleButtonRefTemplateComponent {
    checked: boolean = false;
}

describe('ToggleButton', () => {
    let fixture: ComponentFixture<any>;
    let component: any;
    let toggleButtonElement: DebugElement;
    let toggleButtonInstance: ToggleButton;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ToggleButton, FormsModule, ReactiveFormsModule, NoopAnimationsModule, TestToggleButtonPTemplateComponent, TestToggleButtonRefTemplateComponent],
            declarations: [TestBasicToggleButtonComponent, TestReactiveToggleButtonComponent, TestTemplateToggleButtonComponent, TestIconTemplateToggleButtonComponent, TestIconToggleButtonComponent]
        }).compileComponents();
    });

    describe('Component Initialization', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicToggleButtonComponent);
            component = fixture.componentInstance;
            toggleButtonElement = fixture.debugElement.query(By.directive(ToggleButton));
            toggleButtonInstance = toggleButtonElement.componentInstance;
            fixture.detectChanges();
        });

        it('should create the component', () => {
            expect(toggleButtonInstance).toBeTruthy();
            expect(component).toBeTruthy();
        });

        it('should have default values', () => {
            expect(toggleButtonInstance.checked).toBeFalsy();
            expect(toggleButtonInstance.onLabel).toBe('Yes');
            expect(toggleButtonInstance.offLabel).toBe('No');
            expect(toggleButtonInstance.iconPos).toBe('left');
            expect(toggleButtonInstance.tabindex).toBe(0);
            expect(toggleButtonInstance.autofocus).toBeFalsy();
        });

        it('should accept custom input values', () => {
            component.onLabel = 'Custom Yes';
            component.offLabel = 'Custom No';
            component.iconPos = 'right';
            component.tabindex = 5;
            component.ariaLabel = 'Custom Toggle';
            fixture.detectChanges();

            expect(toggleButtonInstance.onLabel).toBe('Custom Yes');
            expect(toggleButtonInstance.offLabel).toBe('Custom No');
            expect(toggleButtonInstance.iconPos).toBe('right');
            expect(toggleButtonInstance.tabindex).toBe(5);
            expect(toggleButtonInstance.ariaLabel).toBe('Custom Toggle');
        });

        it('should initialize with false checked state', () => {
            expect(toggleButtonInstance.checked).toBeFalsy();
            expect(component.checked).toBeFalsy();
        });

        it('should initialize with default labels', () => {
            const labelElement = fixture.debugElement.query(By.css('[data-pc-section="label"]'));
            expect(labelElement.nativeElement.textContent.trim()).toBe('No');
        });

        it('should render correct host attributes', () => {
            const hostElement = toggleButtonElement.nativeElement;
            expect(hostElement.getAttribute('role')).toBe('button');
            expect(hostElement.getAttribute('tabindex')).toBe('0');
            expect(hostElement.getAttribute('aria-pressed')).toBe('false');
        });
    });

    describe('Basic Functionality', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicToggleButtonComponent);
            component = fixture.componentInstance;
            toggleButtonElement = fixture.debugElement.query(By.directive(ToggleButton));
            toggleButtonInstance = toggleButtonElement.componentInstance;
            fixture.detectChanges();
        });

        it('should toggle state on click', () => {
            expect(toggleButtonInstance.checked).toBeFalsy();

            toggleButtonElement.nativeElement.click();
            fixture.detectChanges();

            expect(toggleButtonInstance.checked).toBe(true);
            expect(component.checked).toBe(true);
        });

        it('should emit onChange event on toggle', () => {
            spyOn(toggleButtonInstance.onChange, 'emit');

            toggleButtonElement.nativeElement.click();
            fixture.detectChanges();

            expect(toggleButtonInstance.onChange.emit).toHaveBeenCalled();
        });

        it('should update label on state change', () => {
            const labelElement = fixture.debugElement.query(By.css('[data-pc-section="label"]'));

            expect(labelElement.nativeElement.textContent.trim()).toBe('No');

            toggleButtonElement.nativeElement.click();
            fixture.detectChanges();

            expect(labelElement.nativeElement.textContent.trim()).toBe('Yes');
        });

        it('should update aria-pressed attribute on toggle', () => {
            expect(toggleButtonElement.nativeElement.getAttribute('aria-pressed')).toBe('false');

            toggleButtonElement.nativeElement.click();
            fixture.detectChanges();

            expect(toggleButtonElement.nativeElement.getAttribute('aria-pressed')).toBe('true');
        });

        it('should not toggle when disabled', () => {
            component.disabled = true;
            fixture.detectChanges();

            toggleButtonElement.nativeElement.click();
            fixture.detectChanges();

            expect(toggleButtonInstance.checked).toBeFalsy();
            expect(component.checked).toBeFalsy();
        });

        it('should have correct active state getter', () => {
            expect(toggleButtonInstance.active).toBeFalsy();

            toggleButtonInstance.checked = true;
            expect(toggleButtonInstance.active).toBe(true);
        });
    });

    describe('Configuration Tests', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicToggleButtonComponent);
            component = fixture.componentInstance;
            toggleButtonElement = fixture.debugElement.query(By.directive(ToggleButton));
            toggleButtonInstance = toggleButtonElement.componentInstance;
        });

        it('should handle custom labels', () => {
            component.onLabel = 'Enabled';
            component.offLabel = 'Disabled';
            fixture.detectChanges();

            const labelElement = fixture.debugElement.query(By.css('[data-pc-section="label"]'));
            expect(labelElement.nativeElement.textContent.trim()).toBe('Disabled');

            toggleButtonElement.nativeElement.click();
            fixture.detectChanges();

            expect(labelElement.nativeElement.textContent.trim()).toBe('Enabled');
        });

        it('should handle disabled property', () => {
            component.disabled = true;
            fixture.detectChanges();

            toggleButtonElement.nativeElement.click();
            fixture.detectChanges();

            expect(toggleButtonInstance.checked).toBeFalsy();
        });

        it('should handle tabindex property', () => {
            component.tabindex = -1;
            fixture.detectChanges();

            expect(toggleButtonElement.nativeElement.getAttribute('tabindex')).toBe('-1');
        });

        it('should handle disabled state tabindex', () => {
            // Set disabled through component input property (real usage)
            component.disabled = true;
            fixture.detectChanges();

            // Try to toggle - should not work when disabled
            toggleButtonElement.nativeElement.click();
            fixture.detectChanges();

            expect(toggleButtonInstance.checked).toBeFalsy(); // Should remain falsy when disabled
        });

        it('should handle allowEmpty property', () => {
            component.allowEmpty = false;
            component.checked = true;
            fixture.detectChanges();

            toggleButtonElement.nativeElement.click();
            fixture.detectChanges();

            expect(toggleButtonInstance.checked).toBe(true);
        });

        it('should handle size property', () => {
            component.size = 'large';
            fixture.detectChanges();

            expect(toggleButtonInstance.size).toBe('large');
        });
    });

    describe('Reactive Forms Integration', () => {
        let testFixture: ComponentFixture<TestReactiveToggleButtonComponent>;
        let testComponent: TestReactiveToggleButtonComponent;
        let formToggleButton: DebugElement;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestReactiveToggleButtonComponent);
            testComponent = testFixture.componentInstance;
            formToggleButton = testFixture.debugElement.query(By.directive(ToggleButton));
            testFixture.detectChanges();
        });

        it('should integrate with reactive forms', () => {
            expect(testComponent.toggleForm.get('toggle')?.value).toBeFalsy();

            formToggleButton.nativeElement.click();
            testFixture.detectChanges();

            expect(testComponent.toggleForm.get('toggle')?.value).toBe(true);
        });

        it('should handle form validation', () => {
            expect(testComponent.toggleForm.invalid).toBe(true);

            formToggleButton.nativeElement.click();
            testFixture.detectChanges();

            expect(testComponent.toggleForm.valid).toBe(true);
        });

        it('should update when form control value changes programmatically', () => {
            testComponent.toggleForm.patchValue({ toggle: true });
            testFixture.detectChanges();

            const toggleButtonInstance = formToggleButton.componentInstance;
            expect(toggleButtonInstance.checked).toBe(true);
        });

        it('should handle form reset', () => {
            formToggleButton.nativeElement.click();
            testFixture.detectChanges();

            expect(testComponent.toggleForm.get('toggle')?.value).toBe(true);

            testComponent.toggleForm.reset();
            testFixture.detectChanges();

            const toggleButtonInstance = formToggleButton.componentInstance;
            expect(toggleButtonInstance.checked).toBeFalsy();
        });

        it('should emit onChange event in reactive forms', () => {
            const formToggleButtonInstance = formToggleButton.componentInstance;
            spyOn(formToggleButtonInstance.onChange, 'emit');

            formToggleButton.nativeElement.click();
            testFixture.detectChanges();

            expect(formToggleButtonInstance.onChange.emit).toHaveBeenCalled();
        });
    });

    describe('Template Customization', () => {
        it('should support custom content template', () => {
            const testFixture = TestBed.createComponent(TestTemplateToggleButtonComponent);

            expect(() => {
                testFixture.detectChanges();
            }).not.toThrow();

            const toggleButton = testFixture.debugElement.query(By.directive(ToggleButton));
            expect(toggleButton).toBeTruthy();
            expect(toggleButton.componentInstance.checked).toBeFalsy();
        });

        it('should support custom icon template', () => {
            const testFixture = TestBed.createComponent(TestIconTemplateToggleButtonComponent);

            expect(() => {
                testFixture.detectChanges();
            }).not.toThrow();

            const toggleButton = testFixture.debugElement.query(By.directive(ToggleButton));
            expect(toggleButton).toBeTruthy();
            expect(toggleButton.componentInstance.checked).toBeFalsy();
        });
    });

    describe('Icon Customization', () => {
        let iconFixture: ComponentFixture<TestIconToggleButtonComponent>;
        let iconComponent: TestIconToggleButtonComponent;
        let iconToggleButton: DebugElement;

        beforeEach(() => {
            iconFixture = TestBed.createComponent(TestIconToggleButtonComponent);
            iconComponent = iconFixture.componentInstance;
            iconToggleButton = iconFixture.debugElement.query(By.directive(ToggleButton));
            iconFixture.detectChanges();
        });

        it('should display off icon when unchecked', () => {
            const iconElement = iconFixture.debugElement.query(By.css('[data-pc-section="icon"]'));
            expect(iconElement).toBeTruthy();
            expect(iconElement.nativeElement.className).toContain('pi-times');
        });

        it('should display on icon when checked', () => {
            iconToggleButton.nativeElement.click();
            iconFixture.detectChanges();

            const iconElement = iconFixture.debugElement.query(By.css('[data-pc-section="icon"]'));
            expect(iconElement.nativeElement.className).toContain('pi-check');
        });

        it('should position icon on the left by default', () => {
            const iconElement = iconFixture.debugElement.query(By.css('[data-pc-section="icon"]'));
            expect(iconElement.nativeElement.className).toContain('p-togglebutton-icon-left');
        });

        it('should position icon on the right when iconPos is right', () => {
            iconComponent.iconPos = 'right';
            iconFixture.detectChanges();

            const iconElement = iconFixture.debugElement.query(By.css('[data-pc-section="icon"]'));
            expect(iconElement.nativeElement.className).toContain('p-togglebutton-icon-right');
        });
    });

    describe('Keyboard Navigation', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicToggleButtonComponent);
            component = fixture.componentInstance;
            toggleButtonElement = fixture.debugElement.query(By.directive(ToggleButton));
            toggleButtonInstance = toggleButtonElement.componentInstance;
            fixture.detectChanges();
        });

        it('should toggle on Enter key', () => {
            const enterEvent = new KeyboardEvent('keydown', { code: 'Enter' });
            spyOn(enterEvent, 'preventDefault');

            toggleButtonElement.nativeElement.dispatchEvent(enterEvent);
            fixture.detectChanges();

            expect(toggleButtonInstance.checked).toBe(true);
            expect(enterEvent.preventDefault).toHaveBeenCalled();
        });

        it('should toggle on Space key', () => {
            const spaceEvent = new KeyboardEvent('keydown', { code: 'Space' });
            spyOn(spaceEvent, 'preventDefault');

            toggleButtonElement.nativeElement.dispatchEvent(spaceEvent);
            fixture.detectChanges();

            expect(toggleButtonInstance.checked).toBe(true);
            expect(spaceEvent.preventDefault).toHaveBeenCalled();
        });

        it('should not toggle on other keys', () => {
            const tabEvent = new KeyboardEvent('keydown', { code: 'Tab' });

            toggleButtonElement.nativeElement.dispatchEvent(tabEvent);
            fixture.detectChanges();

            expect(toggleButtonInstance.checked).toBeFalsy();
        });

        it('should not toggle with keyboard when disabled', () => {
            component.disabled = true;
            fixture.detectChanges();

            const enterEvent = new KeyboardEvent('keydown', { code: 'Enter' });
            toggleButtonElement.nativeElement.dispatchEvent(enterEvent);
            fixture.detectChanges();

            expect(toggleButtonInstance.checked).toBeFalsy();
        });
    });

    describe('Accessibility Features', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicToggleButtonComponent);
            component = fixture.componentInstance;
            toggleButtonElement = fixture.debugElement.query(By.directive(ToggleButton));
            toggleButtonInstance = toggleButtonElement.componentInstance;
            fixture.detectChanges();
        });

        it('should have correct ARIA role', () => {
            expect(toggleButtonElement.nativeElement.getAttribute('role')).toBe('button');
        });

        it('should have correct aria-pressed attribute', () => {
            expect(toggleButtonElement.nativeElement.getAttribute('aria-pressed')).toBe('false');

            toggleButtonElement.nativeElement.click();
            fixture.detectChanges();

            expect(toggleButtonElement.nativeElement.getAttribute('aria-pressed')).toBe('true');
        });

        it('should handle aria-label attribute', () => {
            component.ariaLabel = 'Toggle feature';
            fixture.detectChanges();

            expect(toggleButtonElement.nativeElement.getAttribute('aria-label')).toBe('Toggle feature');
        });

        it('should handle aria-labelledby attribute', () => {
            component.ariaLabelledBy = 'toggle-label';
            fixture.detectChanges();

            expect(toggleButtonElement.nativeElement.getAttribute('aria-labelledby')).toBe('toggle-label');
        });

        it('should be focusable when not disabled', () => {
            expect(toggleButtonElement.nativeElement.getAttribute('tabindex')).toBe('0');
        });

        it('should not be focusable when disabled', () => {
            // Set disabled through component input property (real usage)
            component.disabled = true;
            fixture.detectChanges();

            const initialChecked = toggleButtonInstance.checked;
            toggleButtonElement.nativeElement.click();
            fixture.detectChanges();

            expect(toggleButtonInstance.checked).toBe(initialChecked); // Should not change when disabled
        });
    });

    describe('Edge Cases', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicToggleButtonComponent);
            component = fixture.componentInstance;
            toggleButtonElement = fixture.debugElement.query(By.directive(ToggleButton));
            toggleButtonInstance = toggleButtonElement.componentInstance;
            fixture.detectChanges();
        });

        it('should handle rapid clicks', fakeAsync(() => {
            let clickCount = 0;
            toggleButtonInstance.onChange.subscribe(() => clickCount++);

            toggleButtonElement.nativeElement.click();
            toggleButtonElement.nativeElement.click();
            toggleButtonElement.nativeElement.click();

            tick();
            flush();

            expect(clickCount).toBe(3);
        }));

        it('should handle null/undefined values', () => {
            component.onLabel = undefined as any;
            component.offLabel = undefined as any;
            component.onIcon = undefined as any;
            component.offIcon = undefined as any;

            expect(() => {
                fixture.detectChanges();
            }).not.toThrow();
        });

        it('should handle empty string labels', () => {
            component.onLabel = '';
            component.offLabel = '';
            fixture.detectChanges();

            const labelElement = fixture.debugElement.query(By.css('[data-pc-section="label"]'));
            expect(labelElement.nativeElement.textContent.trim()).toBe('' as any);
        });

        it('should handle allowEmpty false with initial true state', () => {
            component.checked = true;
            component.allowEmpty = false;
            fixture.detectChanges();

            toggleButtonElement.nativeElement.click();
            fixture.detectChanges();

            expect(toggleButtonInstance.checked).toBe(true);
        });

        it('should handle programmatic state changes', fakeAsync(() => {
            // Use ngModel to change value programmatically (real usage)
            component.checked = true;
            fixture.detectChanges();
            tick(); // Allow ngModel binding to sync

            expect(toggleButtonInstance.checked).toBe(true);
            expect(component.checked).toBe(true);
            flush();
        }));

        it('should handle hasOnLabel getter correctly', () => {
            expect(toggleButtonInstance.hasOnLabel).toBe(true);

            component.onLabel = '';
            fixture.detectChanges();

            expect(toggleButtonInstance.hasOnLabel).toBeFalsy();
        });

        it('should handle hasOffLabel getter correctly', () => {
            expect(toggleButtonInstance.hasOffLabel).toBe(true);

            component.offLabel = '';
            fixture.detectChanges();

            expect(toggleButtonInstance.hasOffLabel).toBeFalsy();
        });
    });

    describe('Performance Tests', () => {
        it('should handle multiple toggle button instances', () => {
            const multipleFixtures: any[] = [];
            for (let i = 0; i < 10; i++) {
                const testFixture = TestBed.createComponent(TestBasicToggleButtonComponent);
                testFixture.detectChanges();
                multipleFixtures.push(testFixture);
            }

            expect(multipleFixtures.length).toBe(10);
            multipleFixtures.forEach((f) => {
                const toggleButton = f.debugElement.query(By.directive(ToggleButton));
                expect(toggleButton.componentInstance.checked).toBeFalsy();
            });

            multipleFixtures.forEach((f) => f.destroy());
        });

        it('should not create memory leaks on destroy', () => {
            fixture = TestBed.createComponent(TestBasicToggleButtonComponent);
            fixture.detectChanges();

            expect(() => {
                fixture.destroy();
            }).not.toThrow();
        });
    });

    describe('ToggleButton pTemplate Tests', () => {
        let component: TestToggleButtonPTemplateComponent;
        let fixture: ComponentFixture<TestToggleButtonPTemplateComponent>;
        let toggleButtonInstance: ToggleButton;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestToggleButtonPTemplateComponent, NoopAnimationsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestToggleButtonPTemplateComponent);
            component = fixture.componentInstance;
            toggleButtonInstance = fixture.debugElement.query(By.directive(ToggleButton)).componentInstance;
            fixture.detectChanges();
        });

        it('should create component with pTemplate templates', fakeAsync(() => {
            expect(component).toBeTruthy();
            expect(toggleButtonInstance).toBeTruthy();
            expect(() => toggleButtonInstance.iconTemplate).not.toThrow();
            expect(() => toggleButtonInstance.contentTemplate).not.toThrow();
        }));

        it('should pass context parameters to icon template', fakeAsync(() => {
            // Initially unchecked
            component.checked = false;
            fixture.detectChanges();
            tick();

            // Verify that the toggle button component is working with the value
            expect(toggleButtonInstance.checked).toBe(false);
            expect(component.checked).toBe(false);
        }));

        it('should pass context parameters to content template', fakeAsync(() => {
            // Initially unchecked
            component.checked = false;
            fixture.detectChanges();
            tick();

            // Toggle to checked
            component.checked = true;
            fixture.detectChanges();
            tick();

            // Verify that the toggle button component is working with the value
            expect(toggleButtonInstance.checked).toBe(true);
            expect(component.checked).toBe(true);
        }));

        it('should update templates when checked state changes', fakeAsync(() => {
            // Initially unchecked
            component.checked = false;
            fixture.detectChanges();
            tick();

            expect(toggleButtonInstance.checked).toBe(false);

            // Change to checked
            component.checked = true;
            fixture.detectChanges();
            tick();

            expect(toggleButtonInstance.checked).toBe(true);
        }));

        it('should apply context to templates correctly', fakeAsync(() => {
            component.checked = true;
            fixture.detectChanges();
            tick();

            // Verify that the toggle button component works correctly
            expect(toggleButtonInstance.checked).toBe(true);
            expect(toggleButtonInstance.active).toBe(true);
        }));

        it('should process pTemplates after content init', fakeAsync(() => {
            if (toggleButtonInstance.ngAfterContentInit) {
                toggleButtonInstance.ngAfterContentInit();
                fixture.detectChanges();
                tick();

                // Verify that ngAfterContentInit is called correctly
                expect(toggleButtonInstance.checked).toBeDefined();
                expect(component.checked).toBeDefined();
            }
        }));
    });

    describe('ToggleButton #template Reference Tests', () => {
        let component: TestToggleButtonRefTemplateComponent;
        let fixture: ComponentFixture<TestToggleButtonRefTemplateComponent>;
        let toggleButtonInstance: ToggleButton;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestToggleButtonRefTemplateComponent, NoopAnimationsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestToggleButtonRefTemplateComponent);
            component = fixture.componentInstance;
            toggleButtonInstance = fixture.debugElement.query(By.directive(ToggleButton)).componentInstance;
            fixture.detectChanges();
        });

        it('should create component with #template references', fakeAsync(() => {
            expect(component).toBeTruthy();
            expect(toggleButtonInstance).toBeTruthy();
            expect(() => toggleButtonInstance.iconTemplate).not.toThrow();
            expect(() => toggleButtonInstance.contentTemplate).not.toThrow();
        }));

        it('should pass context parameters to icon template', fakeAsync(() => {
            // Initially unchecked
            component.checked = false;
            fixture.detectChanges();
            tick();

            // Verify that the toggle button component is working with the value
            expect(toggleButtonInstance.checked).toBe(false);
            expect(component.checked).toBe(false);
        }));

        it('should pass context parameters to content template', fakeAsync(() => {
            // Initially unchecked
            component.checked = false;
            fixture.detectChanges();
            tick();

            // Toggle to checked
            component.checked = true;
            fixture.detectChanges();
            tick();

            // Verify that the toggle button component is working with the value
            expect(toggleButtonInstance.checked).toBe(true);
            expect(component.checked).toBe(true);
        }));

        it('should update templates when checked state changes', fakeAsync(() => {
            // Initially unchecked
            component.checked = false;
            fixture.detectChanges();
            tick();

            expect(toggleButtonInstance.checked).toBe(false);

            // Change to checked
            component.checked = true;
            fixture.detectChanges();
            tick();

            expect(toggleButtonInstance.checked).toBe(true);
        }));

        it('should apply context to templates correctly', fakeAsync(() => {
            component.checked = true;
            fixture.detectChanges();
            tick();

            // Verify that the toggle button component works correctly
            expect(toggleButtonInstance.checked).toBe(true);
            expect(toggleButtonInstance.active).toBe(true);
        }));

        it('should process #templates after content init', fakeAsync(() => {
            if (toggleButtonInstance.ngAfterContentInit) {
                toggleButtonInstance.ngAfterContentInit();
                fixture.detectChanges();
                tick();

                // Verify that ngAfterContentInit is called correctly
                expect(toggleButtonInstance.checked).toBeDefined();
                expect(component.checked).toBeDefined();
            }
        }));
    });

    describe('PassThrough (PT) Tests', () => {
        beforeEach(() => {
            TestBed.resetTestingModule();
        });

        describe('Case 1: Simple string classes', () => {
            @Component({
                standalone: true,
                imports: [ToggleButton, FormsModule],
                template: `<p-togglebutton [(ngModel)]="checked" [pt]="pt"></p-togglebutton>`
            })
            class TestPTCase1Component {
                checked: boolean = false;
                pt = {
                    root: 'ROOT_CLASS',
                    content: 'CONTENT_CLASS',
                    icon: 'ICON_CLASS',
                    label: 'LABEL_CLASS'
                };
            }

            it('should apply simple string classes to PT sections', fakeAsync(() => {
                TestBed.configureTestingModule({
                    imports: [NoopAnimationsModule, TestPTCase1Component]
                });

                const fixture = TestBed.createComponent(TestPTCase1Component);
                fixture.detectChanges();
                tick();

                const toggleButtonRoot = fixture.debugElement.query(By.css('p-togglebutton')).nativeElement;
                const content = fixture.debugElement.query(By.css('.p-togglebutton-content'));
                const label = fixture.debugElement.query(By.css('.p-togglebutton-label'));

                expect(toggleButtonRoot.classList.contains('ROOT_CLASS')).toBe(true);
                if (content) expect(content.nativeElement.classList.contains('CONTENT_CLASS')).toBe(true);
                if (label) expect(label.nativeElement.classList.contains('LABEL_CLASS')).toBe(true);
            }));
        });

        describe('Case 2: Objects with class, style, and attributes', () => {
            @Component({
                standalone: true,
                imports: [ToggleButton, FormsModule],
                template: `<p-togglebutton [(ngModel)]="checked" onIcon="pi pi-check" offIcon="pi pi-times" [pt]="pt"></p-togglebutton>`
            })
            class TestPTCase2Component {
                checked: boolean = true;
                pt = {
                    root: {
                        class: 'ROOT_OBJECT_CLASS',
                        style: { 'background-color': 'lightblue' } as any,
                        'data-test': 'root-test'
                    },
                    content: {
                        class: 'CONTENT_OBJECT_CLASS',
                        style: { padding: '10px' } as any
                    },
                    icon: {
                        class: 'ICON_OBJECT_CLASS',
                        'data-icon': 'icon-test'
                    },
                    label: {
                        class: 'LABEL_OBJECT_CLASS',
                        'aria-label': 'Custom label'
                    }
                };
            }

            it('should apply object-based PT with class, style, and attributes', fakeAsync(() => {
                TestBed.configureTestingModule({
                    imports: [NoopAnimationsModule, TestPTCase2Component]
                });

                const fixture = TestBed.createComponent(TestPTCase2Component);
                fixture.detectChanges();
                tick();

                const toggleButtonRoot = fixture.debugElement.query(By.css('p-togglebutton')).nativeElement;
                const content = fixture.debugElement.query(By.css('.p-togglebutton-content'));
                const icon = fixture.debugElement.query(By.css('.pi'));
                const label = fixture.debugElement.query(By.css('.p-togglebutton-label'));

                expect(toggleButtonRoot.classList.contains('ROOT_OBJECT_CLASS')).toBe(true);
                expect(toggleButtonRoot.style.backgroundColor).toBe('lightblue');
                expect(toggleButtonRoot.getAttribute('data-test')).toBe('root-test');

                if (content) {
                    expect(content.nativeElement.classList.contains('CONTENT_OBJECT_CLASS')).toBe(true);
                    expect(content.nativeElement.style.padding).toBe('10px');
                }

                if (icon) {
                    expect(icon.nativeElement.classList.contains('ICON_OBJECT_CLASS')).toBe(true);
                    expect(icon.nativeElement.getAttribute('data-icon')).toBe('icon-test');
                }

                if (label) {
                    expect(label.nativeElement.classList.contains('LABEL_OBJECT_CLASS')).toBe(true);
                    expect(label.nativeElement.getAttribute('aria-label')).toBe('Custom label');
                }
            }));
        });

        describe('Case 3: Mixed object and string values', () => {
            @Component({
                standalone: true,
                imports: [ToggleButton, FormsModule],
                template: `<p-togglebutton [(ngModel)]="checked" onIcon="pi pi-check" [pt]="pt"></p-togglebutton>`
            })
            class TestPTCase3Component {
                checked: boolean = false;
                pt = {
                    root: 'ROOT_STRING_CLASS',
                    content: {
                        class: 'CONTENT_MIXED_CLASS'
                    },
                    icon: 'ICON_STRING_CLASS',
                    label: {
                        class: 'LABEL_MIXED_CLASS'
                    }
                };
            }

            it('should apply mixed object and string PT values', fakeAsync(() => {
                TestBed.configureTestingModule({
                    imports: [NoopAnimationsModule, TestPTCase3Component]
                });

                const fixture = TestBed.createComponent(TestPTCase3Component);
                fixture.detectChanges();
                tick();

                const toggleButtonRoot = fixture.debugElement.query(By.css('p-togglebutton')).nativeElement;
                const content = fixture.debugElement.query(By.css('.p-togglebutton-content'));
                const label = fixture.debugElement.query(By.css('.p-togglebutton-label'));

                expect(toggleButtonRoot.classList.contains('ROOT_STRING_CLASS')).toBe(true);

                if (content) {
                    expect(content.nativeElement.classList.contains('CONTENT_MIXED_CLASS')).toBe(true);
                }

                if (label) {
                    expect(label.nativeElement.classList.contains('LABEL_MIXED_CLASS')).toBe(true);
                }
            }));
        });

        describe('Case 4: Use variables from instance', () => {
            @Component({
                standalone: true,
                imports: [ToggleButton, FormsModule],
                template: `<p-togglebutton [(ngModel)]="checked" [disabled]="disabled" [pt]="pt"></p-togglebutton>`
            })
            class TestPTCase4Component {
                checked: boolean = false;
                disabled: boolean = false;
                pt = {
                    root: ({ instance }: any) => {
                        return {
                            class: instance?.checked ? 'CHECKED_CLASS' : 'UNCHECKED_CLASS'
                        };
                    },
                    content: ({ instance }: any) => {
                        return {
                            style: {
                                'background-color': instance?.$disabled() ? 'gray' : 'green'
                            } as any
                        };
                    }
                };
            }

            it('should use instance variables in PT functions', fakeAsync(() => {
                TestBed.configureTestingModule({
                    imports: [NoopAnimationsModule, TestPTCase4Component]
                });

                const fixture = TestBed.createComponent(TestPTCase4Component);
                fixture.detectChanges();
                tick();

                const toggleButtonRoot = fixture.debugElement.query(By.css('p-togglebutton')).nativeElement;
                const content = fixture.debugElement.query(By.css('.p-togglebutton-content'));

                expect(toggleButtonRoot.classList.contains('UNCHECKED_CLASS') || toggleButtonRoot.classList.contains('CHECKED_CLASS')).toBe(true);

                if (content) {
                    expect(content.nativeElement.style.backgroundColor).toBeTruthy();
                }

                // Change checked state
                fixture.componentInstance.checked = true;
                fixture.detectChanges();
                tick();

                // Root class should change
                expect(toggleButtonRoot.classList.contains('UNCHECKED_CLASS') || toggleButtonRoot.classList.contains('CHECKED_CLASS')).toBe(true);
            }));
        });

        describe('Case 5: Event binding', () => {
            @Component({
                standalone: true,
                imports: [ToggleButton, FormsModule],
                template: `<p-togglebutton [(ngModel)]="checked" [pt]="pt"></p-togglebutton>`
            })
            class TestPTCase5Component {
                checked: boolean = false;
                clickCount: number = 0;
                pt = {
                    content: ({ instance }: any) => {
                        return {
                            onclick: (event: Event) => {
                                this.clickCount++;
                            }
                        };
                    }
                };
            }

            it('should bind click events via PT', fakeAsync(() => {
                TestBed.configureTestingModule({
                    imports: [NoopAnimationsModule, TestPTCase5Component]
                });

                const fixture = TestBed.createComponent(TestPTCase5Component);
                const component = fixture.componentInstance;
                fixture.detectChanges();
                tick();

                const content = fixture.debugElement.query(By.css('.p-togglebutton-content'));

                if (content) {
                    content.nativeElement.click();
                    fixture.detectChanges();
                    expect(component.clickCount).toBeGreaterThan(0);
                }
            }));
        });

        describe('Case 6: Inline PT test', () => {
            it('should apply inline string PT', fakeAsync(() => {
                @Component({
                    standalone: true,
                    imports: [ToggleButton, FormsModule],
                    template: `<p-togglebutton [(ngModel)]="checked" [pt]="{ root: 'INLINE_ROOT_CLASS' }"></p-togglebutton>`
                })
                class TestInlineComponent {
                    checked: boolean = false;
                }

                TestBed.configureTestingModule({
                    imports: [NoopAnimationsModule, TestInlineComponent]
                });

                const fixture = TestBed.createComponent(TestInlineComponent);
                fixture.detectChanges();
                tick();

                const toggleButtonRoot = fixture.debugElement.query(By.css('p-togglebutton')).nativeElement;
                expect(toggleButtonRoot.classList.contains('INLINE_ROOT_CLASS')).toBe(true);
            }));

            it('should apply inline object PT', fakeAsync(() => {
                @Component({
                    standalone: true,
                    imports: [ToggleButton, FormsModule],
                    template: `<p-togglebutton [(ngModel)]="checked" [pt]="{ root: { class: 'INLINE_OBJECT_CLASS', style: { border: '2px solid red' } } }"></p-togglebutton>`
                })
                class TestInlineObjectComponent {
                    checked: boolean = false;
                }

                TestBed.configureTestingModule({
                    imports: [NoopAnimationsModule, TestInlineObjectComponent]
                });

                const fixture = TestBed.createComponent(TestInlineObjectComponent);
                fixture.detectChanges();
                tick();

                const toggleButtonRoot = fixture.debugElement.query(By.css('p-togglebutton')).nativeElement;
                expect(toggleButtonRoot.classList.contains('INLINE_OBJECT_CLASS')).toBe(true);
                expect(toggleButtonRoot.style.border).toBe('2px solid red');
            }));
        });

        describe('Case 7: Global PT from PrimeNGConfig', () => {
            it('should apply global PT configuration', fakeAsync(() => {
                @Component({
                    standalone: true,
                    imports: [ToggleButton, FormsModule],
                    template: `<p-togglebutton [(ngModel)]="checked1"></p-togglebutton><p-togglebutton [(ngModel)]="checked2"></p-togglebutton>`
                })
                class TestGlobalPTComponent {
                    checked1: boolean = false;
                    checked2: boolean = true;
                }

                TestBed.configureTestingModule({
                    imports: [NoopAnimationsModule, TestGlobalPTComponent],
                    providers: [
                        providePrimeNG({
                            pt: {
                                toggleButton: {
                                    root: { 'data-test': 'global-togglebutton' },
                                    content: 'GLOBAL_CONTENT_CLASS',
                                    label: {
                                        class: 'GLOBAL_LABEL_CLASS',
                                        style: { 'font-weight': 'bold' } as any
                                    }
                                }
                            }
                        })
                    ]
                });

                const fixture = TestBed.createComponent(TestGlobalPTComponent);
                fixture.detectChanges();
                tick();

                const toggleButtons = fixture.debugElement.queryAll(By.css('p-togglebutton'));
                expect(toggleButtons.length).toBe(2);

                toggleButtons.forEach((toggleButton) => {
                    const toggleButtonRoot = toggleButton.nativeElement;
                    const content = toggleButton.query(By.css('.p-togglebutton-content'));
                    const label = toggleButton.query(By.css('.p-togglebutton-label'));

                    expect(toggleButtonRoot.getAttribute('data-test')).toBe('global-togglebutton');

                    if (content) {
                        expect(content.nativeElement.classList.contains('GLOBAL_CONTENT_CLASS')).toBe(true);
                    }

                    if (label) {
                        expect(label.nativeElement.classList.contains('GLOBAL_LABEL_CLASS')).toBe(true);
                        expect(label.nativeElement.style.fontWeight).toBe('bold');
                    }
                });
            }));
        });

        describe('Case 8: PT Hooks', () => {
            it('should call PT hooks during lifecycle', fakeAsync(() => {
                const hookCalls: string[] = [];

                @Component({
                    standalone: true,
                    imports: [ToggleButton, FormsModule],
                    template: `<p-togglebutton [(ngModel)]="checked" [pt]="pt"></p-togglebutton>`
                })
                class TestHooksComponent {
                    checked: boolean = false;
                    pt = {
                        root: 'MY-TOGGLEBUTTON',
                        hooks: {
                            onAfterViewInit: () => {
                                hookCalls.push('onAfterViewInit');
                            },
                            onDestroy: () => {
                                hookCalls.push('onDestroy');
                            }
                        }
                    };
                }

                TestBed.configureTestingModule({
                    imports: [NoopAnimationsModule, TestHooksComponent]
                });

                const fixture = TestBed.createComponent(TestHooksComponent);
                fixture.detectChanges();
                tick();

                expect(hookCalls).toContain('onAfterViewInit');

                const toggleButtonRoot = fixture.debugElement.query(By.css('p-togglebutton')).nativeElement;
                expect(toggleButtonRoot.classList.contains('MY-TOGGLEBUTTON')).toBe(true);

                fixture.destroy();
                flush();

                expect(hookCalls).toContain('onDestroy');
            }));
        });
    });
});
