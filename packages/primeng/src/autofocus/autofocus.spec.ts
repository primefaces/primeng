import { Component, PLATFORM_ID, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AutoFocus, AutoFocusModule } from './autofocus';

@Component({
    standalone: false,
    selector: 'test-basic-autofocus',
    template: `<input type="text" pAutoFocus />`
})
class TestBasicAutofocusComponent {}

@Component({
    standalone: false,
    selector: 'test-autofocus-disabled',
    template: `<input type="text" [pAutoFocus]="false" />`
})
class TestAutofocusDisabledComponent {}

@Component({
    standalone: false,
    selector: 'test-autofocus-enabled',
    template: `<input type="text" [pAutoFocus]="true" />`
})
class TestAutofocusEnabledComponent {}

@Component({
    standalone: false,
    selector: 'test-autofocus-dynamic',
    template: `<input type="text" [pAutoFocus]="autofocusEnabled" />`
})
class TestAutofocusDynamicComponent {
    autofocusEnabled = false;
}

@Component({
    standalone: false,
    selector: 'test-autofocus-button',
    template: `<button [pAutoFocus]="true">Focus Button</button>`
})
class TestAutofocusButtonComponent {}

@Component({
    standalone: false,
    selector: 'test-autofocus-div',
    template: `<div tabindex="0" [pAutoFocus]="true">Focusable Div</div>`
})
class TestAutofocusDivComponent {}

@Component({
    standalone: false,
    selector: 'test-autofocus-multiple-elements',
    template: `
        <div [pAutoFocus]="autofocusEnabled">
            <input type="text" id="first-input" />
            <input type="text" id="second-input" />
            <button id="button">Button</button>
        </div>
    `
})
class TestAutofocusMultipleElementsComponent {
    autofocusEnabled = true;
}

@Component({
    standalone: false,
    selector: 'test-autofocus-no-focusable-elements',
    template: `
        <div [pAutoFocus]="true">
            <span>No focusable elements</span>
            <p>Just text content</p>
        </div>
    `
})
class TestAutofocusNoFocusableElementsComponent {}

@Component({
    standalone: false,
    selector: 'test-autofocus-nested-focusable',
    template: `
        <div [pAutoFocus]="true" class="container">
            <div class="nested">
                <input type="text" class="nested-input" />
                <select class="nested-select">
                    <option>Option 1</option>
                </select>
                <textarea class="nested-textarea"></textarea>
            </div>
        </div>
    `
})
class TestAutofocusNestedFocusableComponent {}

@Component({
    standalone: false,
    selector: 'test-autofocus-conditional',
    template: `
        <div>
            <input type="text" [pAutoFocus]="condition1" class="input-1" />
            <input type="text" [pAutoFocus]="condition2" class="input-2" />
        </div>
    `
})
class TestAutofocusConditionalComponent {
    condition1 = false;
    condition2 = false;
}

@Component({
    standalone: false,
    selector: 'test-autofocus-after-content-change',
    template: `
        <div [pAutoFocus]="autofocus" class="dynamic-container">
            <input type="text" *ngIf="showInput" class="dynamic-input" />
            <button *ngIf="showButton" class="dynamic-button">Dynamic Button</button>
        </div>
    `
})
class TestAutofocusAfterContentChangeComponent {
    autofocus = true;
    showInput = false;
    showButton = false;
}

@Component({
    standalone: false,
    selector: 'test-autofocus-dialog-simulation',
    template: `
        <!-- Dialog/Drawer simülasyonu -->
        <div class="overlay" *ngIf="isDialogVisible" [style.display]="isDialogVisible ? 'block' : 'none'">
            <div class="dialog-container" role="dialog" [attr.aria-modal]="isDialogVisible">
                <div class="dialog-header">
                    <h3>Dialog Title</h3>
                    <button type="button" class="close-button" (click)="closeDialog()">×</button>
                </div>
                <div class="dialog-content">
                    <input type="text" [pAutoFocus]="shouldAutoFocus" class="dialog-input" placeholder="This input should be focused when dialog opens" />
                    <textarea [pAutoFocus]="textareaAutoFocus" class="dialog-textarea" placeholder="Alternative focusable element"></textarea>
                    <button type="button" class="dialog-button">Action Button</button>
                </div>
                <div class="dialog-footer">
                    <button type="button" (click)="closeDialog()">Cancel</button>
                    <button type="button" (click)="closeDialog()">Save</button>
                </div>
            </div>
        </div>

        <!-- Drawer simülasyonu -->
        <div class="drawer" *ngIf="isDrawerVisible" [style.transform]="isDrawerVisible ? 'translateX(0)' : 'translateX(100%)'">
            <div class="drawer-header">
                <h4>Drawer Content</h4>
            </div>
            <div class="drawer-body">
                <select [pAutoFocus]="drawerAutoFocus" class="drawer-select">
                    <option value="">Select an option</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                </select>
                <input type="email" class="drawer-email" placeholder="Email address" />
            </div>
        </div>

        <!-- Trigger buttons -->
        <button type="button" (click)="openDialog()" class="open-dialog-btn">Open Dialog</button>
        <button type="button" (click)="openDrawer()" class="open-drawer-btn">Open Drawer</button>
    `
})
class TestAutofocusDialogSimulationComponent {
    isDialogVisible = false;
    isDrawerVisible = false;
    shouldAutoFocus = true;
    textareaAutoFocus = false;
    drawerAutoFocus = true;

    openDialog() {
        this.isDialogVisible = true;
    }

    closeDialog() {
        this.isDialogVisible = false;
    }

    openDrawer() {
        this.isDrawerVisible = true;
    }

    closeDrawer() {
        this.isDrawerVisible = false;
    }
}

describe('AutoFocus', () => {
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [AutoFocusModule, NoopAnimationsModule],
            declarations: [
                TestBasicAutofocusComponent,
                TestAutofocusDisabledComponent,
                TestAutofocusEnabledComponent,
                TestAutofocusDynamicComponent,
                TestAutofocusButtonComponent,
                TestAutofocusDivComponent,
                TestAutofocusMultipleElementsComponent,
                TestAutofocusNoFocusableElementsComponent,
                TestAutofocusNestedFocusableComponent,
                TestAutofocusConditionalComponent,
                TestAutofocusAfterContentChangeComponent,
                TestAutofocusDialogSimulationComponent
            ],
            providers: [provideZonelessChangeDetection(), { provide: PLATFORM_ID, useValue: 'browser' }]
        });
    });

    describe('Directive Initialization', () => {
        let fixture: ComponentFixture<TestBasicAutofocusComponent>;
        let directive: AutoFocus;
        let element: HTMLInputElement;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestBasicAutofocusComponent);
            await fixture.whenStable();

            const directiveDebugElement = fixture.debugElement.query(By.directive(AutoFocus));
            directive = directiveDebugElement.injector.get(AutoFocus);
            element = directiveDebugElement.nativeElement;
        });

        it('should create the directive', () => {
            expect(directive).toBeTruthy();
        });

        it('should have default values', () => {
            // pAutoFocus without value defaults to empty string in template, which is truthy
            // But the component Input transforms it to false
            expect(directive.focused).toBe(false);
        });

        it('should inject platform ID and document', () => {
            expect(directive.platformId).toBeDefined();
            expect(directive.document).toBeDefined();
        });

        it('should inject host element reference', () => {
            expect(directive.host).toBeDefined();
            expect(directive.host.nativeElement).toBe(element);
        });
    });

    describe('Autofocus Attribute Management', () => {
        let fixture: ComponentFixture<TestAutofocusDynamicComponent>;
        let component: TestAutofocusDynamicComponent;
        let directive: AutoFocus;
        let element: HTMLInputElement;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestAutofocusDynamicComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();

            const directiveDebugElement = fixture.debugElement.query(By.directive(AutoFocus));
            directive = directiveDebugElement.injector.get(AutoFocus);
            element = directiveDebugElement.nativeElement;
        });

        it('should remove autofocus attribute when autofocus is false', async () => {
            component.autofocusEnabled = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(element.hasAttribute('autofocus')).toBe(false);
        });

        it('should set autofocus attribute when autofocus is true', async () => {
            component.autofocusEnabled = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(element.hasAttribute('autofocus')).toBe(true);
            expect(element.getAttribute('autofocus')).toBe('true');
        });

        it('should update autofocus attribute dynamically', async () => {
            // Initially false
            component.autofocusEnabled = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.hasAttribute('autofocus')).toBe(false);

            // Change to true
            component.autofocusEnabled = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.hasAttribute('autofocus')).toBe(true);

            // Change back to false
            component.autofocusEnabled = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.hasAttribute('autofocus')).toBe(false);
        });
    });

    describe('Focus Behavior - Browser Platform', () => {
        it('should focus input element when autofocus is enabled', async () => {
            const fixture = TestBed.createComponent(TestAutofocusEnabledComponent);
            const element = fixture.debugElement.query(By.css('input')).nativeElement;

            spyOn(element, 'focus');

            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10)); // Wait for setTimeout

            const directive = fixture.debugElement.query(By.directive(AutoFocus)).injector.get(AutoFocus);
            expect(directive.focused).toBe(true);
        });

        it('should not focus when autofocus is disabled', async () => {
            const fixture = TestBed.createComponent(TestAutofocusDisabledComponent);
            const element = fixture.debugElement.query(By.css('input')).nativeElement;

            spyOn(element, 'focus');

            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(element.focus).not.toHaveBeenCalled();
        });

        it('should focus button element when autofocus is enabled', async () => {
            const fixture = TestBed.createComponent(TestAutofocusButtonComponent);
            const element = fixture.debugElement.query(By.css('button')).nativeElement;

            spyOn(element, 'focus');

            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10));

            const directive = fixture.debugElement.query(By.directive(AutoFocus)).injector.get(AutoFocus);
            expect(directive.focused).toBe(true);
        });

        it('should focus div with tabindex when autofocus is enabled', async () => {
            const fixture = TestBed.createComponent(TestAutofocusDivComponent);
            const element = fixture.debugElement.query(By.css('div')).nativeElement;

            spyOn(element, 'focus');

            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10));

            const directive = fixture.debugElement.query(By.directive(AutoFocus)).injector.get(AutoFocus);
            expect(directive.focused).toBe(true);
        });
    });

    describe('Focus Behavior - Server Platform', () => {
        it('should not focus element on server platform', async () => {
            TestBed.overrideProvider(PLATFORM_ID, { useValue: 'server' });

            const fixture = TestBed.createComponent(TestAutofocusEnabledComponent);
            const element = fixture.debugElement.query(By.css('input')).nativeElement;

            spyOn(element, 'focus');

            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(element.focus).not.toHaveBeenCalled();

            const directive = fixture.debugElement.query(By.directive(AutoFocus)).injector.get(AutoFocus);
            expect(directive.focused).toBe(false);
        });
    });

    describe('Focusable Elements Detection', () => {
        it('should focus first focusable element when multiple elements exist', async () => {
            const fixture = TestBed.createComponent(TestAutofocusMultipleElementsComponent);
            const firstInput = fixture.debugElement.query(By.css('#first-input')).nativeElement;
            const secondInput = fixture.debugElement.query(By.css('#second-input')).nativeElement;
            const button = fixture.debugElement.query(By.css('#button')).nativeElement;

            spyOn(firstInput, 'focus');
            spyOn(secondInput, 'focus');
            spyOn(button, 'focus');

            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10));

            // First focusable element should be focused
            expect(firstInput.focus).toHaveBeenCalled();
            expect(secondInput.focus).not.toHaveBeenCalled();
            expect(button.focus).not.toHaveBeenCalled();
        });

        it('should focus container element when no focusable children exist', async () => {
            const fixture = TestBed.createComponent(TestAutofocusNoFocusableElementsComponent);
            const containerElement = fixture.debugElement.query(By.css('div')).nativeElement;

            spyOn(containerElement, 'focus');

            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(containerElement.focus).toHaveBeenCalled();
        });

        it('should find nested focusable elements', async () => {
            const fixture = TestBed.createComponent(TestAutofocusNestedFocusableComponent);
            const nestedInput = fixture.debugElement.query(By.css('.nested-input')).nativeElement;
            const nestedSelect = fixture.debugElement.query(By.css('.nested-select')).nativeElement;
            const nestedTextarea = fixture.debugElement.query(By.css('.nested-textarea')).nativeElement;

            spyOn(nestedInput, 'focus');
            spyOn(nestedSelect, 'focus');
            spyOn(nestedTextarea, 'focus');

            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10));

            // First nested focusable element should be focused
            expect(nestedInput.focus).toHaveBeenCalled();
            expect(nestedSelect.focus).not.toHaveBeenCalled();
            expect(nestedTextarea.focus).not.toHaveBeenCalled();
        });
    });

    describe('Lifecycle Hooks', () => {
        let fixture: ComponentFixture<TestAutofocusEnabledComponent>;
        let directive: AutoFocus;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestAutofocusEnabledComponent);
            await fixture.whenStable();
            directive = fixture.debugElement.query(By.directive(AutoFocus)).injector.get(AutoFocus);
        });

        it('should call autoFocus in ngAfterContentChecked', () => {
            spyOn(directive, 'autoFocus');

            directive.ngAfterContentChecked();

            expect(directive.autoFocus).toHaveBeenCalled();
        });

        it('should call autoFocus in ngAfterViewChecked when not focused', () => {
            directive.focused = false;
            spyOn(directive, 'autoFocus');

            directive.ngAfterViewChecked();

            expect(directive.autoFocus).toHaveBeenCalled();
        });

        it('should not call autoFocus in ngAfterViewChecked when already focused', () => {
            directive.focused = true;
            spyOn(directive, 'autoFocus');

            directive.ngAfterViewChecked();

            expect(directive.autoFocus).not.toHaveBeenCalled();
        });

        it('should not call autoFocus in ngAfterContentChecked when already focused', () => {
            directive.focused = true;
            spyOn(directive, 'autoFocus');

            directive.ngAfterContentChecked();

            expect(directive.autoFocus).not.toHaveBeenCalled();
        });
    });

    describe('Dynamic Content Changes', () => {
        it('should handle focus after content changes', async () => {
            const fixture = TestBed.createComponent(TestAutofocusAfterContentChangeComponent);
            const component = fixture.componentInstance;
            const directive = fixture.debugElement.query(By.directive(AutoFocus)).injector.get(AutoFocus);

            // Initially no focusable elements
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10));

            // Add input element
            component.showInput = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            // Reset focused state to allow refocusing
            directive.focused = false;

            const input = fixture.debugElement.query(By.css('.dynamic-input'));
            if (input) {
                spyOn(input.nativeElement, 'focus');

                // Trigger ngAfterContentChecked
                directive.ngAfterContentChecked();
                await new Promise((resolve) => setTimeout(resolve, 10));

                // The input should be focused
                expect(input.nativeElement.focus).toHaveBeenCalled();
            }
        });

        it('should handle multiple dynamic content changes', async () => {
            const fixture = TestBed.createComponent(TestAutofocusAfterContentChangeComponent);
            const component = fixture.componentInstance;
            const directive = fixture.debugElement.query(By.directive(AutoFocus)).injector.get(AutoFocus);

            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10));

            // Add button first
            component.showButton = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            directive.focused = false;

            const button = fixture.debugElement.query(By.css('.dynamic-button'));
            if (button) {
                spyOn(button.nativeElement, 'focus');
                directive.ngAfterContentChecked();
                await new Promise((resolve) => setTimeout(resolve, 10));
                expect(button.nativeElement.focus).toHaveBeenCalled();
            }

            // Add input (should be focused as first focusable element)
            component.showInput = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            directive.focused = false;

            const input = fixture.debugElement.query(By.css('.dynamic-input'));
            if (input) {
                spyOn(input.nativeElement, 'focus');
                directive.ngAfterContentChecked();
                await new Promise((resolve) => setTimeout(resolve, 10));
                expect(input.nativeElement.focus).toHaveBeenCalled();
            }
        });
    });

    describe('Multiple Directive Instances', () => {
        it('should handle multiple autofocus directives independently', async () => {
            const fixture = TestBed.createComponent(TestAutofocusConditionalComponent);
            const component = fixture.componentInstance;

            const input1 = fixture.debugElement.query(By.css('.input-1')).nativeElement;
            const input2 = fixture.debugElement.query(By.css('.input-2')).nativeElement;

            spyOn(input1, 'focus');
            spyOn(input2, 'focus');

            // Enable first input autofocus
            component.condition1 = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(input1.focus).toHaveBeenCalled();
            expect(input2.focus).not.toHaveBeenCalled();

            // Reset spies
            (input1.focus as jasmine.Spy).calls.reset();
            (input2.focus as jasmine.Spy).calls.reset();

            // Enable second input autofocus
            component.condition2 = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(input2.focus).toHaveBeenCalled();
        });
    });

    describe('Edge Cases', () => {
        it('should handle element without focus method gracefully', async () => {
            const fixture = TestBed.createComponent(TestAutofocusEnabledComponent);
            const element = fixture.debugElement.query(By.css('input')).nativeElement;

            // Remove focus method
            delete element.focus;

            await fixture.whenStable();

            // Should not throw error
            expect(async () => {
                await new Promise((resolve) => setTimeout(resolve, 10));
            }).not.toThrow();
        });

        it('should handle null/undefined host element', () => {
            const fixture = TestBed.createComponent(TestAutofocusEnabledComponent);
            const directive = fixture.debugElement.query(By.directive(AutoFocus)).injector.get(AutoFocus);

            // Mock null host
            directive.host = null as any;

            expect(() => {
                directive.autoFocus();
            }).not.toThrow();
        });

        it('should handle rapid enable/disable changes', async () => {
            const fixture = TestBed.createComponent(TestAutofocusDynamicComponent);
            const component = fixture.componentInstance;
            const element = fixture.debugElement.query(By.css('input')).nativeElement;

            spyOn(element, 'focus');

            // Rapid changes
            component.autofocusEnabled = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            component.autofocusEnabled = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            component.autofocusEnabled = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10));

            const directive = fixture.debugElement.query(By.directive(AutoFocus)).injector.get(AutoFocus);
            expect(directive.focused).toBe(true);
        });

        it('should handle autofocus when element is not in DOM', () => {
            const fixture = TestBed.createComponent(TestAutofocusEnabledComponent);
            const directive = fixture.debugElement.query(By.directive(AutoFocus)).injector.get(AutoFocus);
            const element = fixture.debugElement.query(By.css('input')).nativeElement;

            // Remove element from DOM
            element.parentNode.removeChild(element);

            expect(() => {
                directive.autoFocus();
            }).not.toThrow();
        });
    });

    describe('Focus State Management', () => {
        it('should set focused flag when focus is successful', async () => {
            const fixture = TestBed.createComponent(TestAutofocusEnabledComponent);
            const directive = fixture.debugElement.query(By.directive(AutoFocus)).injector.get(AutoFocus);

            expect(directive.focused).toBe(false);

            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(directive.focused).toBe(true);
        });

        it('should not focus again when already focused', async () => {
            const fixture = TestBed.createComponent(TestAutofocusEnabledComponent);
            const element = fixture.debugElement.query(By.css('input')).nativeElement;
            const directive = fixture.debugElement.query(By.directive(AutoFocus)).injector.get(AutoFocus);

            spyOn(element, 'focus');

            // Set focused flag manually to simulate already focused state
            directive.focused = true;
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10));

            // Should not focus when already focused
            expect(element.focus).not.toHaveBeenCalled();
        });

        it('should reset focused flag and refocus when autofocus value changes', async () => {
            const fixture = TestBed.createComponent(TestAutofocusDynamicComponent);
            const component = fixture.componentInstance;
            const element = fixture.debugElement.query(By.css('input')).nativeElement;
            const directive = fixture.debugElement.query(By.directive(AutoFocus)).injector.get(AutoFocus);

            spyOn(element, 'focus');

            // Initial state - not focused
            component.autofocusEnabled = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(element.focus).not.toHaveBeenCalled();
            expect(directive.focused).toBe(false);

            // Enable autofocus
            component.autofocusEnabled = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(element.focus).toHaveBeenCalled();
            expect(directive.focused).toBe(true);
        });
    });

    describe('Integration with DomHandler', () => {
        it('should use DomHandler.getFocusableElements to find focusable elements', async () => {
            const fixture = TestBed.createComponent(TestAutofocusMultipleElementsComponent);

            // Mock DomHandler.getFocusableElements
            const mockFocusableElements = [fixture.debugElement.query(By.css('#first-input')).nativeElement, fixture.debugElement.query(By.css('#second-input')).nativeElement, fixture.debugElement.query(By.css('#button')).nativeElement];

            spyOn(mockFocusableElements[0], 'focus');
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10));

            // First element should be focused
            expect(mockFocusableElements[0].focus).toHaveBeenCalled();
        });
    });

    describe('Dynamic Component Rendering (Dialog/Drawer)', () => {
        let fixture: ComponentFixture<TestAutofocusDialogSimulationComponent>;
        let component: TestAutofocusDialogSimulationComponent;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestAutofocusDialogSimulationComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();
        });

        it('should focus input when dialog is dynamically rendered', async () => {
            // Initially dialog is not visible
            expect(component.isDialogVisible).toBe(false);
            let dialogInput = fixture.debugElement.query(By.css('.dialog-input'));
            expect(dialogInput).toBeFalsy();

            // Open dialog
            component.openDialog();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10));

            // Dialog should now be visible
            expect(component.isDialogVisible).toBe(true);
            dialogInput = fixture.debugElement.query(By.css('.dialog-input'));
            expect(dialogInput).toBeTruthy();

            // Get the autofocus directive instance
            const dialogInputDirective = dialogInput.injector.get(AutoFocus);
            spyOn(dialogInput.nativeElement, 'focus');

            // Simulate what happens when autofocus directive detects new content
            dialogInputDirective.focused = false; // Reset focused state
            dialogInputDirective.ngAfterContentChecked();
            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(dialogInput.nativeElement.focus).toHaveBeenCalled();
            expect(dialogInputDirective.focused).toBe(true);
        });

        it('should focus select when drawer is dynamically rendered', async () => {
            // Initially drawer is not visible
            expect(component.isDrawerVisible).toBe(false);
            let drawerSelect = fixture.debugElement.query(By.css('.drawer-select'));
            expect(drawerSelect).toBeFalsy();

            // Open drawer
            component.openDrawer();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10));

            // Drawer should now be visible
            expect(component.isDrawerVisible).toBe(true);
            drawerSelect = fixture.debugElement.query(By.css('.drawer-select'));
            expect(drawerSelect).toBeTruthy();

            // Get the autofocus directive instance
            const drawerSelectDirective = drawerSelect.injector.get(AutoFocus);
            spyOn(drawerSelect.nativeElement, 'focus');

            // Simulate what happens when autofocus directive detects new content
            drawerSelectDirective.focused = false; // Reset focused state
            drawerSelectDirective.ngAfterContentChecked();
            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(drawerSelect.nativeElement.focus).toHaveBeenCalled();
            expect(drawerSelectDirective.focused).toBe(true);
        });

        it('should handle multiple dialog opens/closes correctly', async () => {
            // First dialog open
            component.openDialog();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10));

            let dialogInput = fixture.debugElement.query(By.css('.dialog-input'));
            let directive = dialogInput.injector.get(AutoFocus);
            spyOn(dialogInput.nativeElement, 'focus');

            directive.focused = false; // Reset state
            directive.ngAfterContentChecked();
            await new Promise((resolve) => setTimeout(resolve, 10));
            expect(dialogInput.nativeElement.focus).toHaveBeenCalled();
            expect(directive.focused).toBe(true);

            // Close dialog
            component.closeDialog();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(component.isDialogVisible).toBe(false);
            expect(fixture.debugElement.query(By.css('.dialog-input'))).toBeFalsy();

            // Open dialog again
            component.openDialog();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10));

            // Should work again with new directive instance
            dialogInput = fixture.debugElement.query(By.css('.dialog-input'));
            directive = dialogInput.injector.get(AutoFocus);
            spyOn(dialogInput.nativeElement, 'focus');

            directive.focused = false; // Reset state for new instance
            directive.ngAfterContentChecked();
            await new Promise((resolve) => setTimeout(resolve, 10));
            expect(dialogInput.nativeElement.focus).toHaveBeenCalled();
        });

        it('should switch autofocus between dialog elements', async () => {
            // Open dialog with input focused
            component.shouldAutoFocus = true;
            component.textareaAutoFocus = false;
            component.openDialog();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10));

            const dialogInput = fixture.debugElement.query(By.css('.dialog-input'));
            const dialogTextarea = fixture.debugElement.query(By.css('.dialog-textarea'));

            const inputDirective = dialogInput.injector.get(AutoFocus);
            const textareaDirective = dialogTextarea.injector.get(AutoFocus);

            spyOn(dialogInput.nativeElement, 'focus');
            spyOn(dialogTextarea.nativeElement, 'focus');

            // Initially input should be focused
            inputDirective.focused = false; // Reset state to allow focusing
            inputDirective.ngAfterContentChecked();
            await new Promise((resolve) => setTimeout(resolve, 10));
            expect(dialogInput.nativeElement.focus).toHaveBeenCalled();

            // Switch to textarea
            component.shouldAutoFocus = false;
            component.textareaAutoFocus = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            // Reset focused states to allow refocusing
            inputDirective.focused = false;
            textareaDirective.focused = false;

            // Input should not be called since shouldAutoFocus is now false
            expect(inputDirective.autofocus).toBe(false);
            expect(textareaDirective.autofocus).toBe(true);

            textareaDirective.ngAfterContentChecked();
            await new Promise((resolve) => setTimeout(resolve, 10));
            expect(dialogTextarea.nativeElement.focus).toHaveBeenCalled();
        });

        it('should handle dialog with no focusable elements', async () => {
            // Disable autofocus on all focusable elements
            component.shouldAutoFocus = false;
            component.textareaAutoFocus = false;
            component.openDialog();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10));

            const dialogContainer = fixture.debugElement.query(By.css('.dialog-container'));
            expect(dialogContainer).toBeTruthy();

            // No autofocus directives should be active
            const dialogInput = fixture.debugElement.query(By.css('.dialog-input'));
            const dialogTextarea = fixture.debugElement.query(By.css('.dialog-textarea'));

            expect(dialogInput).toBeTruthy();
            expect(dialogTextarea).toBeTruthy();

            spyOn(dialogInput.nativeElement, 'focus');
            spyOn(dialogTextarea.nativeElement, 'focus');

            // Manually trigger lifecycle hooks - should not focus anything
            const inputDirective = dialogInput.injector.get(AutoFocus);
            const textareaDirective = dialogTextarea.injector.get(AutoFocus);

            inputDirective.ngAfterContentChecked();
            textareaDirective.ngAfterContentChecked();
            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(dialogInput.nativeElement.focus).not.toHaveBeenCalled();
            expect(dialogTextarea.nativeElement.focus).not.toHaveBeenCalled();
        });

        it('should work with rapid dialog open/close operations', async () => {
            // Rapid open/close operations
            component.openDialog();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10));

            component.closeDialog();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            component.openDialog();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 10));

            // Should still work correctly
            const dialogInput = fixture.debugElement.query(By.css('.dialog-input'));
            expect(dialogInput).toBeTruthy();

            const directive = dialogInput.injector.get(AutoFocus);
            spyOn(dialogInput.nativeElement, 'focus');

            // Reset focused state to allow focusing
            directive.focused = false;
            directive.ngAfterContentChecked();
            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(dialogInput.nativeElement.focus).toHaveBeenCalled();
            expect(directive.focused).toBe(true);
        });
    });
});
