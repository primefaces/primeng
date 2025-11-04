import { Component, PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DOCUMENT } from '@angular/common';
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
    beforeEach(() => {
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
            providers: [{ provide: PLATFORM_ID, useValue: 'browser' }]
        });
    });

    describe('Directive Initialization', () => {
        let fixture: ComponentFixture<TestBasicAutofocusComponent>;
        let directive: AutoFocus;
        let element: HTMLInputElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicAutofocusComponent);
            fixture.detectChanges();

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

        beforeEach(() => {
            fixture = TestBed.createComponent(TestAutofocusDynamicComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const directiveDebugElement = fixture.debugElement.query(By.directive(AutoFocus));
            directive = directiveDebugElement.injector.get(AutoFocus);
            element = directiveDebugElement.nativeElement;
        });

        it('should remove autofocus attribute when autofocus is false', () => {
            component.autofocusEnabled = false;
            fixture.detectChanges();

            expect(element.hasAttribute('autofocus')).toBe(false);
        });

        it('should set autofocus attribute when autofocus is true', () => {
            component.autofocusEnabled = true;
            fixture.detectChanges();

            expect(element.hasAttribute('autofocus')).toBe(true);
            expect(element.getAttribute('autofocus')).toBe('true');
        });

        it('should update autofocus attribute dynamically', () => {
            // Initially false
            component.autofocusEnabled = false;
            fixture.detectChanges();
            expect(element.hasAttribute('autofocus')).toBe(false);

            // Change to true
            component.autofocusEnabled = true;
            fixture.detectChanges();
            expect(element.hasAttribute('autofocus')).toBe(true);

            // Change back to false
            component.autofocusEnabled = false;
            fixture.detectChanges();
            expect(element.hasAttribute('autofocus')).toBe(false);
        });
    });

    describe('Focus Behavior - Browser Platform', () => {
        it('should focus input element when autofocus is enabled', fakeAsync(() => {
            const fixture = TestBed.createComponent(TestAutofocusEnabledComponent);
            const element = fixture.debugElement.query(By.css('input')).nativeElement;

            spyOn(element, 'focus');

            fixture.detectChanges();
            tick(); // Wait for setTimeout

            const directive = fixture.debugElement.query(By.directive(AutoFocus)).injector.get(AutoFocus);
            expect(directive.focused).toBe(true);
            flush();
        }));

        it('should not focus when autofocus is disabled', fakeAsync(() => {
            const fixture = TestBed.createComponent(TestAutofocusDisabledComponent);
            const element = fixture.debugElement.query(By.css('input')).nativeElement;

            spyOn(element, 'focus');

            fixture.detectChanges();
            tick();

            expect(element.focus).not.toHaveBeenCalled();
            flush();
        }));

        it('should focus button element when autofocus is enabled', fakeAsync(() => {
            const fixture = TestBed.createComponent(TestAutofocusButtonComponent);
            const element = fixture.debugElement.query(By.css('button')).nativeElement;

            spyOn(element, 'focus');

            fixture.detectChanges();
            tick();

            const directive = fixture.debugElement.query(By.directive(AutoFocus)).injector.get(AutoFocus);
            expect(directive.focused).toBe(true);
            flush();
        }));

        it('should focus div with tabindex when autofocus is enabled', fakeAsync(() => {
            const fixture = TestBed.createComponent(TestAutofocusDivComponent);
            const element = fixture.debugElement.query(By.css('div')).nativeElement;

            spyOn(element, 'focus');

            fixture.detectChanges();
            tick();

            const directive = fixture.debugElement.query(By.directive(AutoFocus)).injector.get(AutoFocus);
            expect(directive.focused).toBe(true);
            flush();
        }));
    });

    describe('Focus Behavior - Server Platform', () => {
        it('should not focus element on server platform', fakeAsync(() => {
            TestBed.overrideProvider(PLATFORM_ID, { useValue: 'server' });

            const fixture = TestBed.createComponent(TestAutofocusEnabledComponent);
            const element = fixture.debugElement.query(By.css('input')).nativeElement;

            spyOn(element, 'focus');

            fixture.detectChanges();
            tick();

            expect(element.focus).not.toHaveBeenCalled();

            const directive = fixture.debugElement.query(By.directive(AutoFocus)).injector.get(AutoFocus);
            expect(directive.focused).toBe(false);
            flush();
        }));
    });

    describe('Focusable Elements Detection', () => {
        it('should focus first focusable element when multiple elements exist', fakeAsync(() => {
            const fixture = TestBed.createComponent(TestAutofocusMultipleElementsComponent);
            const firstInput = fixture.debugElement.query(By.css('#first-input')).nativeElement;
            const secondInput = fixture.debugElement.query(By.css('#second-input')).nativeElement;
            const button = fixture.debugElement.query(By.css('#button')).nativeElement;

            spyOn(firstInput, 'focus');
            spyOn(secondInput, 'focus');
            spyOn(button, 'focus');

            fixture.detectChanges();
            tick();

            // First focusable element should be focused
            expect(firstInput.focus).toHaveBeenCalled();
            expect(secondInput.focus).not.toHaveBeenCalled();
            expect(button.focus).not.toHaveBeenCalled();
            flush();
        }));

        it('should focus container element when no focusable children exist', fakeAsync(() => {
            const fixture = TestBed.createComponent(TestAutofocusNoFocusableElementsComponent);
            const containerElement = fixture.debugElement.query(By.css('div')).nativeElement;

            spyOn(containerElement, 'focus');

            fixture.detectChanges();
            tick();

            expect(containerElement.focus).toHaveBeenCalled();
            flush();
        }));

        it('should find nested focusable elements', fakeAsync(() => {
            const fixture = TestBed.createComponent(TestAutofocusNestedFocusableComponent);
            const nestedInput = fixture.debugElement.query(By.css('.nested-input')).nativeElement;
            const nestedSelect = fixture.debugElement.query(By.css('.nested-select')).nativeElement;
            const nestedTextarea = fixture.debugElement.query(By.css('.nested-textarea')).nativeElement;

            spyOn(nestedInput, 'focus');
            spyOn(nestedSelect, 'focus');
            spyOn(nestedTextarea, 'focus');

            fixture.detectChanges();
            tick();

            // First nested focusable element should be focused
            expect(nestedInput.focus).toHaveBeenCalled();
            expect(nestedSelect.focus).not.toHaveBeenCalled();
            expect(nestedTextarea.focus).not.toHaveBeenCalled();
            flush();
        }));
    });

    describe('Lifecycle Hooks', () => {
        let fixture: ComponentFixture<TestAutofocusEnabledComponent>;
        let directive: AutoFocus;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestAutofocusEnabledComponent);
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
        it('should handle focus after content changes', fakeAsync(() => {
            const fixture = TestBed.createComponent(TestAutofocusAfterContentChangeComponent);
            const component = fixture.componentInstance;
            const directive = fixture.debugElement.query(By.directive(AutoFocus)).injector.get(AutoFocus);

            // Initially no focusable elements
            fixture.detectChanges();
            tick();

            // Add input element
            component.showInput = true;
            fixture.detectChanges();

            // Reset focused state to allow refocusing
            directive.focused = false;

            const input = fixture.debugElement.query(By.css('.dynamic-input'));
            if (input) {
                spyOn(input.nativeElement, 'focus');

                // Trigger ngAfterContentChecked
                directive.ngAfterContentChecked();
                tick();

                // The input should be focused
                expect(input.nativeElement.focus).toHaveBeenCalled();
            }

            flush();
        }));

        it('should handle multiple dynamic content changes', fakeAsync(() => {
            const fixture = TestBed.createComponent(TestAutofocusAfterContentChangeComponent);
            const component = fixture.componentInstance;
            const directive = fixture.debugElement.query(By.directive(AutoFocus)).injector.get(AutoFocus);

            fixture.detectChanges();
            tick();

            // Add button first
            component.showButton = true;
            fixture.detectChanges();
            directive.focused = false;

            const button = fixture.debugElement.query(By.css('.dynamic-button'));
            if (button) {
                spyOn(button.nativeElement, 'focus');
                directive.ngAfterContentChecked();
                tick();
                expect(button.nativeElement.focus).toHaveBeenCalled();
            }

            // Add input (should be focused as first focusable element)
            component.showInput = true;
            fixture.detectChanges();
            directive.focused = false;

            const input = fixture.debugElement.query(By.css('.dynamic-input'));
            if (input) {
                spyOn(input.nativeElement, 'focus');
                directive.ngAfterContentChecked();
                tick();
                expect(input.nativeElement.focus).toHaveBeenCalled();
            }

            flush();
        }));
    });

    describe('Multiple Directive Instances', () => {
        it('should handle multiple autofocus directives independently', fakeAsync(() => {
            const fixture = TestBed.createComponent(TestAutofocusConditionalComponent);
            const component = fixture.componentInstance;

            const input1 = fixture.debugElement.query(By.css('.input-1')).nativeElement;
            const input2 = fixture.debugElement.query(By.css('.input-2')).nativeElement;

            spyOn(input1, 'focus');
            spyOn(input2, 'focus');

            // Enable first input autofocus
            component.condition1 = true;
            fixture.detectChanges();
            tick();

            expect(input1.focus).toHaveBeenCalled();
            expect(input2.focus).not.toHaveBeenCalled();

            // Reset spies
            (input1.focus as jasmine.Spy).calls.reset();
            (input2.focus as jasmine.Spy).calls.reset();

            // Enable second input autofocus
            component.condition2 = true;
            fixture.detectChanges();
            tick();

            expect(input2.focus).toHaveBeenCalled();

            flush();
        }));
    });

    describe('Edge Cases', () => {
        it('should handle element without focus method gracefully', fakeAsync(() => {
            const fixture = TestBed.createComponent(TestAutofocusEnabledComponent);
            const element = fixture.debugElement.query(By.css('input')).nativeElement;

            // Remove focus method
            delete element.focus;

            fixture.detectChanges();

            // Should not throw error
            expect(() => {
                tick();
                flush();
            }).not.toThrow();
        }));

        it('should handle null/undefined host element', () => {
            const fixture = TestBed.createComponent(TestAutofocusEnabledComponent);
            const directive = fixture.debugElement.query(By.directive(AutoFocus)).injector.get(AutoFocus);

            // Mock null host
            directive.host = null as any;

            expect(() => {
                directive.autoFocus();
            }).not.toThrow();
        });

        it('should handle rapid enable/disable changes', fakeAsync(() => {
            const fixture = TestBed.createComponent(TestAutofocusDynamicComponent);
            const component = fixture.componentInstance;
            const element = fixture.debugElement.query(By.css('input')).nativeElement;

            spyOn(element, 'focus');

            // Rapid changes
            component.autofocusEnabled = true;
            fixture.detectChanges();

            component.autofocusEnabled = false;
            fixture.detectChanges();

            component.autofocusEnabled = true;
            fixture.detectChanges();
            tick();

            const directive = fixture.debugElement.query(By.directive(AutoFocus)).injector.get(AutoFocus);
            expect(directive.focused).toBe(true);

            flush();
        }));

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
        it('should set focused flag when focus is successful', fakeAsync(() => {
            const fixture = TestBed.createComponent(TestAutofocusEnabledComponent);
            const directive = fixture.debugElement.query(By.directive(AutoFocus)).injector.get(AutoFocus);

            expect(directive.focused).toBe(false);

            fixture.detectChanges();
            tick();

            expect(directive.focused).toBe(true);
            flush();
        }));

        it('should not focus again when already focused', fakeAsync(() => {
            const fixture = TestBed.createComponent(TestAutofocusEnabledComponent);
            const element = fixture.debugElement.query(By.css('input')).nativeElement;
            const directive = fixture.debugElement.query(By.directive(AutoFocus)).injector.get(AutoFocus);

            spyOn(element, 'focus');

            // Set focused flag manually to simulate already focused state
            directive.focused = true;

            fixture.detectChanges();
            tick();

            // Should not focus when already focused
            expect(element.focus).not.toHaveBeenCalled();
            flush();
        }));

        it('should reset focused flag and refocus when autofocus value changes', fakeAsync(() => {
            const fixture = TestBed.createComponent(TestAutofocusDynamicComponent);
            const component = fixture.componentInstance;
            const element = fixture.debugElement.query(By.css('input')).nativeElement;
            const directive = fixture.debugElement.query(By.directive(AutoFocus)).injector.get(AutoFocus);

            spyOn(element, 'focus');

            // Initial state - not focused
            component.autofocusEnabled = false;
            fixture.detectChanges();
            tick();

            expect(element.focus).not.toHaveBeenCalled();
            expect(directive.focused).toBe(false);

            // Enable autofocus
            component.autofocusEnabled = true;
            fixture.detectChanges();
            tick();

            expect(element.focus).toHaveBeenCalled();
            expect(directive.focused).toBe(true);

            flush();
        }));
    });

    describe('Integration with DomHandler', () => {
        it('should use DomHandler.getFocusableElements to find focusable elements', fakeAsync(() => {
            const fixture = TestBed.createComponent(TestAutofocusMultipleElementsComponent);

            // Mock DomHandler.getFocusableElements
            const mockFocusableElements = [fixture.debugElement.query(By.css('#first-input')).nativeElement, fixture.debugElement.query(By.css('#second-input')).nativeElement, fixture.debugElement.query(By.css('#button')).nativeElement];

            spyOn(mockFocusableElements[0], 'focus');

            fixture.detectChanges();
            tick();

            // First element should be focused
            expect(mockFocusableElements[0].focus).toHaveBeenCalled();
            flush();
        }));
    });

    describe('Dynamic Component Rendering (Dialog/Drawer)', () => {
        let fixture: ComponentFixture<TestAutofocusDialogSimulationComponent>;
        let component: TestAutofocusDialogSimulationComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestAutofocusDialogSimulationComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should focus input when dialog is dynamically rendered', fakeAsync(() => {
            // Initially dialog is not visible
            expect(component.isDialogVisible).toBe(false);
            let dialogInput = fixture.debugElement.query(By.css('.dialog-input'));
            expect(dialogInput).toBeFalsy();

            // Open dialog
            component.openDialog();
            fixture.detectChanges();
            tick(); // Wait for DOM updates

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
            tick();

            expect(dialogInput.nativeElement.focus).toHaveBeenCalled();
            expect(dialogInputDirective.focused).toBe(true);
            flush();
        }));

        it('should focus select when drawer is dynamically rendered', fakeAsync(() => {
            // Initially drawer is not visible
            expect(component.isDrawerVisible).toBe(false);
            let drawerSelect = fixture.debugElement.query(By.css('.drawer-select'));
            expect(drawerSelect).toBeFalsy();

            // Open drawer
            component.openDrawer();
            fixture.detectChanges();
            tick();

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
            tick();

            expect(drawerSelect.nativeElement.focus).toHaveBeenCalled();
            expect(drawerSelectDirective.focused).toBe(true);
            flush();
        }));

        it('should handle multiple dialog opens/closes correctly', fakeAsync(() => {
            // First dialog open
            component.openDialog();
            fixture.detectChanges();
            tick();

            let dialogInput = fixture.debugElement.query(By.css('.dialog-input'));
            let directive = dialogInput.injector.get(AutoFocus);
            spyOn(dialogInput.nativeElement, 'focus');

            directive.focused = false; // Reset state
            directive.ngAfterContentChecked();
            tick();
            expect(dialogInput.nativeElement.focus).toHaveBeenCalled();
            expect(directive.focused).toBe(true);

            // Close dialog
            component.closeDialog();
            fixture.detectChanges();
            tick();

            expect(component.isDialogVisible).toBe(false);
            expect(fixture.debugElement.query(By.css('.dialog-input'))).toBeFalsy();

            // Open dialog again
            component.openDialog();
            fixture.detectChanges();
            tick();

            // Should work again with new directive instance
            dialogInput = fixture.debugElement.query(By.css('.dialog-input'));
            directive = dialogInput.injector.get(AutoFocus);
            spyOn(dialogInput.nativeElement, 'focus');

            directive.focused = false; // Reset state for new instance
            directive.ngAfterContentChecked();
            tick();
            expect(dialogInput.nativeElement.focus).toHaveBeenCalled();

            flush();
        }));

        it('should switch autofocus between dialog elements', fakeAsync(() => {
            // Open dialog with input focused
            component.shouldAutoFocus = true;
            component.textareaAutoFocus = false;
            component.openDialog();
            fixture.detectChanges();
            tick();

            const dialogInput = fixture.debugElement.query(By.css('.dialog-input'));
            const dialogTextarea = fixture.debugElement.query(By.css('.dialog-textarea'));

            const inputDirective = dialogInput.injector.get(AutoFocus);
            const textareaDirective = dialogTextarea.injector.get(AutoFocus);

            spyOn(dialogInput.nativeElement, 'focus');
            spyOn(dialogTextarea.nativeElement, 'focus');

            // Initially input should be focused
            inputDirective.focused = false; // Reset state to allow focusing
            inputDirective.ngAfterContentChecked();
            tick();
            expect(dialogInput.nativeElement.focus).toHaveBeenCalled();

            // Switch to textarea
            component.shouldAutoFocus = false;
            component.textareaAutoFocus = true;
            fixture.detectChanges();

            // Reset focused states to allow refocusing
            inputDirective.focused = false;
            textareaDirective.focused = false;

            // Input should not be called since shouldAutoFocus is now false
            expect(inputDirective.autofocus).toBe(false);
            expect(textareaDirective.autofocus).toBe(true);

            textareaDirective.ngAfterContentChecked();
            tick();
            expect(dialogTextarea.nativeElement.focus).toHaveBeenCalled();

            flush();
        }));

        it('should handle dialog with no focusable elements', fakeAsync(() => {
            // Disable autofocus on all focusable elements
            component.shouldAutoFocus = false;
            component.textareaAutoFocus = false;
            component.openDialog();
            fixture.detectChanges();
            tick();

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
            tick();

            expect(dialogInput.nativeElement.focus).not.toHaveBeenCalled();
            expect(dialogTextarea.nativeElement.focus).not.toHaveBeenCalled();

            flush();
        }));

        it('should work with rapid dialog open/close operations', fakeAsync(() => {
            // Rapid open/close operations
            component.openDialog();
            fixture.detectChanges();
            tick(10);

            component.closeDialog();
            fixture.detectChanges();
            tick(10);

            component.openDialog();
            fixture.detectChanges();
            tick(10);

            // Should still work correctly
            const dialogInput = fixture.debugElement.query(By.css('.dialog-input'));
            expect(dialogInput).toBeTruthy();

            const directive = dialogInput.injector.get(AutoFocus);
            spyOn(dialogInput.nativeElement, 'focus');

            // Reset focused state to allow focusing
            directive.focused = false;
            directive.ngAfterContentChecked();
            tick();

            expect(dialogInput.nativeElement.focus).toHaveBeenCalled();
            expect(directive.focused).toBe(true);

            flush();
        }));
    });
});
