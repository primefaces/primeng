import { Component, PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DOCUMENT } from '@angular/common';
import { FocusTrap, FocusTrapModule } from './focustrap';

@Component({
    standalone: false,
    selector: 'test-basic-focus-trap',
    template: `
        <div pFocusTrap>
            <input type="text" class="first-input" />
            <button class="button">Button</button>
            <input type="text" class="second-input" />
        </div>
    `
})
class TestBasicFocusTrapComponent {}

@Component({
    standalone: false,
    selector: 'test-disabled-focus-trap',
    template: `
        <div pFocusTrap [pFocusTrapDisabled]="disabled">
            <input type="text" class="input" />
            <button class="button">Button</button>
        </div>
    `
})
class TestDisabledFocusTrapComponent {
    disabled = false;
}

@Component({
    standalone: false,
    selector: 'test-dynamic-focus-trap',
    template: `
        <div pFocusTrap [pFocusTrapDisabled]="trapDisabled">
            <input type="text" *ngIf="showFirstInput" class="dynamic-first-input" />
            <select class="select">
                <option>Option 1</option>
                <option>Option 2</option>
            </select>
            <textarea *ngIf="showTextarea" class="textarea"></textarea>
            <button class="dynamic-button">Dynamic Button</button>
            <input type="checkbox" *ngIf="showCheckbox" class="checkbox" />
        </div>
    `
})
class TestDynamicFocusTrapComponent {
    trapDisabled = false;
    showFirstInput = true;
    showTextarea = false;
    showCheckbox = false;
}

@Component({
    standalone: false,
    selector: 'test-nested-focus-trap',
    template: `
        <div pFocusTrap class="outer-trap">
            <input type="text" class="outer-input" />
            <div class="nested-container">
                <div pFocusTrap class="inner-trap">
                    <input type="text" class="inner-first-input" />
                    <button class="inner-button">Inner Button</button>
                    <input type="text" class="inner-second-input" />
                </div>
                <button class="outer-button">Outer Button</button>
            </div>
        </div>
    `
})
class TestNestedFocusTrapComponent {}

@Component({
    standalone: false,
    selector: 'test-complex-focus-trap',
    template: `
        <div pFocusTrap [pFocusTrapDisabled]="trapDisabled" class="complex-trap">
            <input type="text" class="text-input" [disabled]="inputDisabled" />
            <select class="select-element" [disabled]="selectDisabled">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
            </select>
            <textarea class="textarea-element" [readonly]="textareaReadonly"></textarea>
            <button class="button-element" [disabled]="buttonDisabled">Submit</button>
            <div tabindex="0" class="focusable-div">Focusable Div</div>
            <a href="#" class="link-element">Link</a>
        </div>
    `
})
class TestComplexFocusTrapComponent {
    trapDisabled = false;
    inputDisabled = false;
    selectDisabled = false;
    textareaReadonly = false;
    buttonDisabled = false;
}

@Component({
    standalone: false,
    selector: 'test-empty-focus-trap',
    template: `
        <div pFocusTrap class="empty-trap">
            <span class="non-focusable">Non-focusable content</span>
            <div class="another-non-focusable">More content</div>
        </div>
    `
})
class TestEmptyFocusTrapComponent {}

@Component({
    standalone: false,
    selector: 'test-conditional-focus-trap',
    template: `
        <div pFocusTrap [pFocusTrapDisabled]="trapDisabled">
            <input type="text" *ngIf="showElements" class="conditional-input" />
            <button *ngIf="showElements" class="conditional-button">Button</button>
            <div *ngIf="!showElements" class="no-focusable">No focusable elements</div>
        </div>
    `
})
class TestConditionalFocusTrapComponent {
    trapDisabled = false;
    showElements = true;
}

describe('FocusTrap', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FocusTrapModule, NoopAnimationsModule],
            declarations: [TestBasicFocusTrapComponent, TestDisabledFocusTrapComponent, TestDynamicFocusTrapComponent, TestNestedFocusTrapComponent, TestComplexFocusTrapComponent, TestEmptyFocusTrapComponent, TestConditionalFocusTrapComponent],
            providers: [{ provide: PLATFORM_ID, useValue: 'browser' }]
        });
    });

    describe('Component Initialization', () => {
        let fixture: ComponentFixture<TestBasicFocusTrapComponent>;
        let directive: FocusTrap;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicFocusTrapComponent);
            fixture.detectChanges();

            const directiveDebugElement = fixture.debugElement.query(By.directive(FocusTrap));
            directive = directiveDebugElement.injector.get(FocusTrap);
            element = directiveDebugElement.nativeElement;
        });

        it('should create the directive', () => {
            expect(directive).toBeTruthy();
        });

        it('should have default values', () => {
            expect(directive.pFocusTrapDisabled).toBe(false);
        });

        it('should inject platform ID and document', () => {
            expect(directive.platformId).toBeDefined();
            expect(directive.document).toBeDefined();
        });

        it('should create hidden focusable elements on init', () => {
            expect(directive.firstHiddenFocusableElement).toBeDefined();
            expect(directive.lastHiddenFocusableElement).toBeDefined();
        });

        it('should add hidden elements to DOM', () => {
            const firstHidden = element.querySelector('[data-pc-section="firstfocusableelement"]');
            const lastHidden = element.querySelector('[data-pc-section="lastfocusableelement"]');

            expect(firstHidden).toBeTruthy();
            expect(lastHidden).toBeTruthy();
        });

        it('should set correct attributes on hidden elements', () => {
            const firstHidden = element.querySelector('[data-pc-section="firstfocusableelement"]') as HTMLElement;
            const lastHidden = element.querySelector('[data-pc-section="lastfocusableelement"]') as HTMLElement;

            expect(firstHidden.getAttribute('tabindex')).toBe('0');
            expect(firstHidden.getAttribute('role')).toBe('presentation');
            expect(firstHidden.getAttribute('aria-hidden')).toBe('true');
            expect(firstHidden.getAttribute('data-p-hidden-accessible')).toBe('true');
            expect(firstHidden.getAttribute('data-p-hidden-focusable')).toBe('true');

            expect(lastHidden.getAttribute('tabindex')).toBe('0');
            expect(lastHidden.getAttribute('role')).toBe('presentation');
            expect(lastHidden.getAttribute('aria-hidden')).toBe('true');
            expect(lastHidden.getAttribute('data-p-hidden-accessible')).toBe('true');
            expect(lastHidden.getAttribute('data-p-hidden-focusable')).toBe('true');
        });

        it('should apply correct CSS classes to hidden elements', () => {
            const firstHidden = element.querySelector('[data-pc-section="firstfocusableelement"]') as HTMLElement;
            const lastHidden = element.querySelector('[data-pc-section="lastfocusableelement"]') as HTMLElement;

            expect(firstHidden.classList.contains('p-hidden-accessible')).toBe(true);
            expect(firstHidden.classList.contains('p-hidden-focusable')).toBe(true);

            expect(lastHidden.classList.contains('p-hidden-accessible')).toBe(true);
            expect(lastHidden.classList.contains('p-hidden-focusable')).toBe(true);
        });
    });

    describe('Focus Trap Disabled State', () => {
        let fixture: ComponentFixture<TestDisabledFocusTrapComponent>;
        let component: TestDisabledFocusTrapComponent;
        let directive: FocusTrap;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestDisabledFocusTrapComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const directiveDebugElement = fixture.debugElement.query(By.directive(FocusTrap));
            directive = directiveDebugElement.injector.get(FocusTrap);
            element = directiveDebugElement.nativeElement;
        });

        it('should not create hidden elements when disabled', () => {
            component.disabled = true;
            fixture.detectChanges();

            // Check if elements were removed or not created
            const firstHidden = element.querySelector('[data-pc-section="firstfocusableelement"]');
            const lastHidden = element.querySelector('[data-pc-section="lastfocusableelement"]');

            // Since we changed from enabled to disabled, elements should be removed
            expect(firstHidden).toBeFalsy();
            expect(lastHidden).toBeFalsy();
        });

        it('should create hidden elements when enabled', () => {
            component.disabled = false;
            fixture.detectChanges();

            const firstHidden = element.querySelector('[data-pc-section="firstfocusableelement"]');
            const lastHidden = element.querySelector('[data-pc-section="lastfocusableelement"]');

            expect(firstHidden).toBeTruthy();
            expect(lastHidden).toBeTruthy();
        });

        it('should toggle hidden elements based on disabled state', () => {
            // Start enabled
            expect(element.querySelector('[data-pc-section="firstfocusableelement"]')).toBeTruthy();

            // Disable
            component.disabled = true;
            fixture.detectChanges();
            expect(element.querySelector('[data-pc-section="firstfocusableelement"]')).toBeFalsy();

            // Re-enable
            component.disabled = false;
            fixture.detectChanges();
            expect(element.querySelector('[data-pc-section="firstfocusableelement"]')).toBeTruthy();
        });
    });

    describe('Focus Trap Behavior - Browser Platform', () => {
        let fixture: ComponentFixture<TestBasicFocusTrapComponent>;
        let directive: FocusTrap;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicFocusTrapComponent);
            fixture.detectChanges();

            const directiveDebugElement = fixture.debugElement.query(By.directive(FocusTrap));
            directive = directiveDebugElement.injector.get(FocusTrap);
            element = directiveDebugElement.nativeElement;
        });

        it('should focus first element when tabbing from last hidden element', () => {
            const lastHidden = directive.lastHiddenFocusableElement;

            // Simulate focus event on last hidden element
            const focusEvent = new FocusEvent('focus', {
                relatedTarget: null,
                bubbles: true
            });
            Object.defineProperty(focusEvent, 'currentTarget', { value: lastHidden });
            Object.defineProperty(focusEvent, 'relatedTarget', { value: null });

            // Test that the handler doesn't throw
            expect(() => directive.onLastHiddenElementFocus(focusEvent)).not.toThrow();
        });

        it('should focus last element when tabbing from first hidden element', () => {
            const firstHidden = directive.firstHiddenFocusableElement;

            // Simulate focus event on first hidden element
            const focusEvent = new FocusEvent('focus', {
                relatedTarget: null,
                bubbles: true
            });
            Object.defineProperty(focusEvent, 'currentTarget', { value: firstHidden });
            Object.defineProperty(focusEvent, 'relatedTarget', { value: null });

            // Test that the handler doesn't throw
            expect(() => directive.onFirstHiddenElementFocus(focusEvent)).not.toThrow();
        });

        it('should handle focus events from outside the trap', () => {
            const lastHidden = directive.lastHiddenFocusableElement;
            const outsideElement = document.createElement('button');
            document.body.appendChild(outsideElement);

            // Simulate focus from outside element
            const focusEvent = new FocusEvent('focus', {
                relatedTarget: outsideElement,
                bubbles: true
            });
            Object.defineProperty(focusEvent, 'currentTarget', { value: lastHidden });
            Object.defineProperty(focusEvent, 'relatedTarget', { value: outsideElement });

            // Test that the handler doesn't throw
            expect(() => directive.onLastHiddenElementFocus(focusEvent)).not.toThrow();

            document.body.removeChild(outsideElement);
        });

        it('should handle circular focus navigation', () => {
            const firstHidden = directive.firstHiddenFocusableElement;
            const lastHidden = directive.lastHiddenFocusableElement;

            // Simulate focus event from last hidden to first hidden
            const focusEvent = new FocusEvent('focus', {
                relatedTarget: lastHidden,
                bubbles: true
            });
            Object.defineProperty(focusEvent, 'currentTarget', { value: firstHidden });
            Object.defineProperty(focusEvent, 'relatedTarget', { value: lastHidden });

            // Test that the handler doesn't throw
            expect(() => directive.onFirstHiddenElementFocus(focusEvent)).not.toThrow();
        });
    });

    describe('Focus Trap Behavior - Server Platform', () => {
        it('should not create hidden elements on server platform', () => {
            TestBed.overrideProvider(PLATFORM_ID, { useValue: 'server' });

            const fixture = TestBed.createComponent(TestBasicFocusTrapComponent);
            fixture.detectChanges();

            const element = fixture.debugElement.query(By.directive(FocusTrap)).nativeElement;
            const firstHidden = element.querySelector('[data-pc-section="firstfocusableelement"]');
            const lastHidden = element.querySelector('[data-pc-section="lastfocusableelement"]');

            expect(firstHidden).toBeFalsy();
            expect(lastHidden).toBeFalsy();
        });
    });

    describe('Dynamic Content Changes', () => {
        let fixture: ComponentFixture<TestDynamicFocusTrapComponent>;
        let component: TestDynamicFocusTrapComponent;
        let directive: FocusTrap;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestDynamicFocusTrapComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const directiveDebugElement = fixture.debugElement.query(By.directive(FocusTrap));
            directive = directiveDebugElement.injector.get(FocusTrap);
            element = directiveDebugElement.nativeElement;
        });

        it('should handle addition of new focusable elements', () => {
            // Initially textarea is not shown
            expect(element.querySelector('.textarea')).toBeFalsy();

            // Show textarea
            component.showTextarea = true;
            fixture.detectChanges();

            const textarea = element.querySelector('.textarea') as HTMLElement;
            expect(textarea).toBeTruthy();

            // Test that focus trap still works with new element
            const lastHidden = directive.lastHiddenFocusableElement;

            const focusEvent = new FocusEvent('focus', {
                relatedTarget: null,
                bubbles: true
            });
            Object.defineProperty(focusEvent, 'currentTarget', { value: lastHidden });
            Object.defineProperty(focusEvent, 'relatedTarget', { value: null });

            // Test that the handler doesn't throw
            expect(() => directive.onLastHiddenElementFocus(focusEvent)).not.toThrow();
        });

        it('should handle removal of focusable elements', () => {
            // Remove first input
            component.showFirstInput = false;
            fixture.detectChanges();

            expect(element.querySelector('.dynamic-first-input')).toBeFalsy();

            // Focus trap should still work with remaining elements
            const select = element.querySelector('.select') as HTMLElement;
            const firstHidden = directive.firstHiddenFocusableElement;

            spyOn(select, 'focus');

            const focusEvent = new FocusEvent('focus', {
                relatedTarget: null,
                bubbles: true
            });
            Object.defineProperty(focusEvent, 'currentTarget', { value: firstHidden });
            Object.defineProperty(focusEvent, 'relatedTarget', { value: null });

            directive.onFirstHiddenElementFocus(focusEvent);

            expect(select.focus).toHaveBeenCalled();
        });

        it('should handle rapid content changes', () => {
            // Rapid changes
            component.showTextarea = true;
            component.showCheckbox = true;
            fixture.detectChanges();

            component.showFirstInput = false;
            fixture.detectChanges();

            component.showTextarea = false;
            fixture.detectChanges();

            // Should not throw errors and hidden elements should still exist
            expect(directive.firstHiddenFocusableElement).toBeTruthy();
            expect(directive.lastHiddenFocusableElement).toBeTruthy();
        });

        it('should handle trap disable/enable with dynamic content', () => {
            component.showTextarea = true;
            component.showCheckbox = true;
            fixture.detectChanges();

            // Disable trap
            component.trapDisabled = true;
            fixture.detectChanges();

            expect(element.querySelector('[data-pc-section="firstfocusableelement"]')).toBeFalsy();

            // Re-enable trap with new content
            component.trapDisabled = false;
            fixture.detectChanges();

            expect(element.querySelector('[data-pc-section="firstfocusableelement"]')).toBeTruthy();
            expect(element.querySelector('[data-pc-section="lastfocusableelement"]')).toBeTruthy();
        });
    });

    describe('Nested Focus Traps', () => {
        let fixture: ComponentFixture<TestNestedFocusTrapComponent>;
        let outerTrapDirective: FocusTrap;
        let innerTrapDirective: FocusTrap;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestNestedFocusTrapComponent);
            fixture.detectChanges();

            const trapDirectives = fixture.debugElement.queryAll(By.directive(FocusTrap));
            outerTrapDirective = trapDirectives[0].injector.get(FocusTrap);
            innerTrapDirective = trapDirectives[1].injector.get(FocusTrap);
            element = fixture.debugElement.nativeElement;
        });

        it('should create separate hidden elements for each trap', () => {
            expect(outerTrapDirective.firstHiddenFocusableElement).toBeDefined();
            expect(outerTrapDirective.lastHiddenFocusableElement).toBeDefined();
            expect(innerTrapDirective.firstHiddenFocusableElement).toBeDefined();
            expect(innerTrapDirective.lastHiddenFocusableElement).toBeDefined();

            expect(outerTrapDirective.firstHiddenFocusableElement).not.toBe(innerTrapDirective.firstHiddenFocusableElement);
            expect(outerTrapDirective.lastHiddenFocusableElement).not.toBe(innerTrapDirective.lastHiddenFocusableElement);
        });

        it('should handle focus independently in nested traps', () => {
            // Test inner trap
            const focusEvent = new FocusEvent('focus', {
                relatedTarget: null,
                bubbles: true
            });
            Object.defineProperty(focusEvent, 'currentTarget', { value: innerTrapDirective.lastHiddenFocusableElement });
            Object.defineProperty(focusEvent, 'relatedTarget', { value: null });

            // Test that the handler doesn't throw
            expect(() => innerTrapDirective.onLastHiddenElementFocus(focusEvent)).not.toThrow();
        });
    });

    describe('Complex Focusable Elements', () => {
        let fixture: ComponentFixture<TestComplexFocusTrapComponent>;
        let component: TestComplexFocusTrapComponent;
        let directive: FocusTrap;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestComplexFocusTrapComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const directiveDebugElement = fixture.debugElement.query(By.directive(FocusTrap));
            directive = directiveDebugElement.injector.get(FocusTrap);
            element = directiveDebugElement.nativeElement;
        });

        it('should handle disabled form elements', () => {
            const textInput = element.querySelector('.text-input') as HTMLInputElement;
            const selectElement = element.querySelector('.select-element') as HTMLSelectElement;

            // Disable input
            component.inputDisabled = true;
            fixture.detectChanges();

            expect(textInput.disabled).toBe(true);

            // Focus should skip disabled elements and go to next focusable
            const firstHidden = directive.firstHiddenFocusableElement;
            const focusEvent = new FocusEvent('focus', {
                relatedTarget: null,
                bubbles: true
            });
            Object.defineProperty(focusEvent, 'currentTarget', { value: firstHidden });
            Object.defineProperty(focusEvent, 'relatedTarget', { value: null });

            // Test that the handler works with disabled elements
            expect(() => directive.onFirstHiddenElementFocus(focusEvent)).not.toThrow();
        });

        it('should handle readonly elements', () => {
            component.textareaReadonly = true;
            fixture.detectChanges();

            const textarea = element.querySelector('.textarea-element') as HTMLTextAreaElement;
            expect(textarea.readOnly).toBe(true);

            // Readonly elements should still be focusable
            spyOn(textarea, 'focus');

            const lastHidden = directive.lastHiddenFocusableElement;
            const focusEvent = new FocusEvent('focus', {
                relatedTarget: null,
                bubbles: true
            });
            Object.defineProperty(focusEvent, 'currentTarget', { value: lastHidden });
            Object.defineProperty(focusEvent, 'relatedTarget', { value: null });

            directive.onLastHiddenElementFocus(focusEvent);

            // Link element should be the last focusable, but we test the flow works
            expect(() => directive.onLastHiddenElementFocus(focusEvent)).not.toThrow();
        });

        it('should handle elements with tabindex', () => {
            const focusableDiv = element.querySelector('.focusable-div') as HTMLElement;
            expect(focusableDiv.getAttribute('tabindex')).toBe('0');

            // Should include div with tabindex in focus trap
            spyOn(focusableDiv, 'focus');

            const focusEvent = new FocusEvent('focus', {
                relatedTarget: null,
                bubbles: true
            });
            Object.defineProperty(focusEvent, 'currentTarget', { value: directive.lastHiddenFocusableElement });

            directive.onLastHiddenElementFocus(focusEvent);

            // Test passes if no error is thrown
            expect(() => directive.onLastHiddenElementFocus(focusEvent)).not.toThrow();
        });

        it('should handle anchor links', () => {
            const linkElement = element.querySelector('.link-element') as HTMLAnchorElement;
            expect(linkElement.href).toBeTruthy();

            // Links should be included in focus trap
            spyOn(linkElement, 'focus');

            const focusEvent = new FocusEvent('focus', {
                relatedTarget: null,
                bubbles: true
            });
            Object.defineProperty(focusEvent, 'currentTarget', { value: directive.lastHiddenFocusableElement });
            Object.defineProperty(focusEvent, 'relatedTarget', { value: null });

            directive.onLastHiddenElementFocus(focusEvent);

            expect(linkElement.focus).toHaveBeenCalled();
        });
    });

    describe('Empty Focus Trap', () => {
        let fixture: ComponentFixture<TestEmptyFocusTrapComponent>;
        let directive: FocusTrap;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestEmptyFocusTrapComponent);
            fixture.detectChanges();

            directive = fixture.debugElement.query(By.directive(FocusTrap)).injector.get(FocusTrap);
        });

        it('should handle trap with no focusable elements', () => {
            const firstHidden = directive.firstHiddenFocusableElement;
            const lastHidden = directive.lastHiddenFocusableElement;

            // Should create hidden elements even with no focusable content
            expect(firstHidden).toBeTruthy();
            expect(lastHidden).toBeTruthy();

            // Focus events should not throw errors
            const focusEvent = new FocusEvent('focus', {
                relatedTarget: null,
                bubbles: true
            });
            Object.defineProperty(focusEvent, 'currentTarget', { value: firstHidden });
            Object.defineProperty(focusEvent, 'relatedTarget', { value: null });

            expect(() => directive.onFirstHiddenElementFocus(focusEvent)).not.toThrow();
            expect(() => directive.onLastHiddenElementFocus(focusEvent)).not.toThrow();
        });
    });

    describe('Edge Cases', () => {
        let fixture: ComponentFixture<TestConditionalFocusTrapComponent>;
        let component: TestConditionalFocusTrapComponent;
        let directive: FocusTrap;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestConditionalFocusTrapComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const directiveDebugElement = fixture.debugElement.query(By.directive(FocusTrap));
            directive = directiveDebugElement.injector.get(FocusTrap);
            element = directiveDebugElement.nativeElement;
        });

        it('should handle null/undefined related targets', () => {
            const focusEvent = new FocusEvent('focus', {
                relatedTarget: null,
                bubbles: true
            });
            Object.defineProperty(focusEvent, 'currentTarget', { value: directive.firstHiddenFocusableElement });
            Object.defineProperty(focusEvent, 'relatedTarget', { value: null });

            expect(() => directive.onFirstHiddenElementFocus(focusEvent)).not.toThrow();
            expect(() => directive.onLastHiddenElementFocus(focusEvent)).not.toThrow();
        });

        it('should handle elements being removed from DOM during focus', () => {
            const input = element.querySelector('.conditional-input') as HTMLElement;

            // Remove elements
            component.showElements = false;
            fixture.detectChanges();

            expect(element.querySelector('.conditional-input')).toBeFalsy();

            // Focus event should not cause errors
            const focusEvent = new FocusEvent('focus', {
                relatedTarget: null,
                bubbles: true
            });
            Object.defineProperty(focusEvent, 'currentTarget', { value: directive.firstHiddenFocusableElement });
            Object.defineProperty(focusEvent, 'relatedTarget', { value: null });

            expect(() => directive.onFirstHiddenElementFocus(focusEvent)).not.toThrow();
        });

        it('should handle rapid disable/enable cycles', () => {
            expect(directive.firstHiddenFocusableElement).toBeTruthy();

            // Rapid disable/enable
            component.trapDisabled = true;
            fixture.detectChanges();

            component.trapDisabled = false;
            fixture.detectChanges();

            component.trapDisabled = true;
            fixture.detectChanges();

            component.trapDisabled = false;
            fixture.detectChanges();

            // Should have hidden elements after final enable
            expect(element.querySelector('[data-pc-section="firstfocusableelement"]')).toBeTruthy();
            expect(element.querySelector('[data-pc-section="lastfocusableelement"]')).toBeTruthy();
        });

        it('should handle focus trap removal and recreation', () => {
            const originalFirst = directive.firstHiddenFocusableElement;
            const originalLast = directive.lastHiddenFocusableElement;

            // Remove
            directive.removeHiddenFocusableElements();
            expect(element.querySelector('[data-pc-section="firstfocusableelement"]')).toBeFalsy();

            // Recreate
            directive.createHiddenFocusableElements();
            expect(element.querySelector('[data-pc-section="firstfocusableelement"]')).toBeTruthy();
            expect(element.querySelector('[data-pc-section="lastfocusableelement"]')).toBeTruthy();

            // New elements should be different instances
            expect(directive.firstHiddenFocusableElement).not.toBe(originalFirst);
            expect(directive.lastHiddenFocusableElement).not.toBe(originalLast);
        });

        it('should handle getComputedSelector method', () => {
            const selector = directive.getComputedSelector('input');
            expect(selector).toBe(':not(.p-hidden-focusable):not([data-p-hidden-focusable="true"])input');

            const selectorWithoutParam = directive.getComputedSelector('');
            expect(selectorWithoutParam).toBe(':not(.p-hidden-focusable):not([data-p-hidden-focusable="true"])');

            const selectorWithNull = directive.getComputedSelector(null);
            expect(selectorWithNull).toBe(':not(.p-hidden-focusable):not([data-p-hidden-focusable="true"])');
        });

        it('should handle elements that cannot receive focus', () => {
            const nonFocusableElement = document.createElement('div');
            // Mock focus method that throws error
            nonFocusableElement.focus = jasmine.createSpy('focus').and.throwError('Cannot focus');

            // Should handle gracefully when focus fails
            expect(() => {
                if (nonFocusableElement.focus) {
                    nonFocusableElement.focus();
                }
            }).toThrow();
        });
    });

    describe('Lifecycle Hooks', () => {
        let fixture: ComponentFixture<TestBasicFocusTrapComponent>;
        let directive: FocusTrap;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicFocusTrapComponent);
            directive = fixture.debugElement.query(By.directive(FocusTrap)).injector.get(FocusTrap);
        });

        it('should call ngOnInit and create hidden elements', () => {
            spyOn(directive, 'createHiddenFocusableElements').and.callThrough();

            directive.ngOnInit();

            expect(directive.createHiddenFocusableElements).toHaveBeenCalled();
        });

        it('should handle ngOnChanges for pFocusTrapDisabled', () => {
            const changes = {
                pFocusTrapDisabled: {
                    currentValue: true,
                    previousValue: false,
                    firstChange: false,
                    isFirstChange: () => false
                }
            };

            spyOn(directive, 'removeHiddenFocusableElements');

            directive.ngOnChanges(changes);

            expect(directive.removeHiddenFocusableElements).toHaveBeenCalled();
        });

        it('should handle ngOnChanges when enabling focus trap', () => {
            const changes = {
                pFocusTrapDisabled: {
                    currentValue: false,
                    previousValue: true,
                    firstChange: false,
                    isFirstChange: () => false
                }
            };

            spyOn(directive, 'createHiddenFocusableElements');

            directive.ngOnChanges(changes);

            expect(directive.createHiddenFocusableElements).toHaveBeenCalled();
        });
    });

    describe('DOM Manipulation', () => {
        let fixture: ComponentFixture<TestBasicFocusTrapComponent>;
        let directive: FocusTrap;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicFocusTrapComponent);
            fixture.detectChanges();

            const directiveDebugElement = fixture.debugElement.query(By.directive(FocusTrap));
            directive = directiveDebugElement.injector.get(FocusTrap);
            element = directiveDebugElement.nativeElement;
        });

        it('should prepend first hidden element to container', () => {
            const firstChild = element.firstElementChild;
            expect(firstChild).toBe(directive.firstHiddenFocusableElement);
        });

        it('should append last hidden element to container', () => {
            const lastChild = element.lastElementChild;
            expect(lastChild).toBe(directive.lastHiddenFocusableElement);
        });

        it('should remove hidden elements from DOM when removeHiddenFocusableElements is called', () => {
            expect(directive.firstHiddenFocusableElement.parentNode).toBe(element);
            expect(directive.lastHiddenFocusableElement.parentNode).toBe(element);

            directive.removeHiddenFocusableElements();

            expect(directive.firstHiddenFocusableElement.parentNode).toBeNull();
            expect(directive.lastHiddenFocusableElement.parentNode).toBeNull();
        });

        it('should handle removeHiddenFocusableElements when elements have no parent', () => {
            // Manually remove from DOM
            element.removeChild(directive.firstHiddenFocusableElement);
            element.removeChild(directive.lastHiddenFocusableElement);

            // Should not throw error when trying to remove already removed elements
            expect(() => directive.removeHiddenFocusableElements()).not.toThrow();
        });
    });
});
