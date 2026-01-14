import { Component, DebugElement, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StyleClass } from './styleclass';

@Component({
    standalone: false,
    template: `
        <button
            pStyleClass="@next"
            [enterFromClass]="enterFromClass"
            [enterActiveClass]="enterActiveClass"
            [enterToClass]="enterToClass"
            [leaveFromClass]="leaveFromClass"
            [leaveActiveClass]="leaveActiveClass"
            [leaveToClass]="leaveToClass"
            [hideOnOutsideClick]="hideOnOutsideClick"
            [hideOnEscape]="hideOnEscape"
            [hideOnResize]="hideOnResize"
            [toggleClass]="toggleClass"
            [resizeSelector]="resizeSelector"
        >
            Toggle
        </button>
        <div class="target-element" [class.hidden]="targetHidden">Target Content</div>
    `
})
class TestBasicStyleClassComponent {
    enterFromClass: string | undefined;
    enterActiveClass: string | undefined;
    enterToClass: string | undefined;
    leaveFromClass: string | undefined;
    leaveActiveClass: string | undefined;
    leaveToClass: string | undefined;
    hideOnOutsideClick: boolean | undefined;
    hideOnEscape: boolean | undefined;
    hideOnResize: boolean | undefined;
    toggleClass: string | undefined;
    resizeSelector: string | undefined;
    targetHidden = true;
}

@Component({
    standalone: false,
    template: `
        <div class="container target-parent">
            <button pStyleClass="@parent" [toggleClass]="toggleClass">Parent Toggle</button>
            <div class="sibling">
                <div class="target">Target for Previous</div>
                <button pStyleClass="@prev" [toggleClass]="toggleClass">Previous Toggle</button>
            </div>
        </div>
    `
})
class TestSelectorStyleClassComponent {
    toggleClass = 'active';
}

@Component({
    standalone: false,
    template: `
        <div class="grandparent">
            <div class="parent">
                <button pStyleClass="@grandparent" [toggleClass]="toggleClass">Grandparent Toggle</button>
            </div>
        </div>
    `
})
class TestGrandparentSelectorComponent {
    toggleClass = 'highlight';
}

@Component({
    standalone: false,
    template: `
        <button pStyleClass="@next" enterActiveClass="slide-down-enter" leaveActiveClass="slide-up-leave" [hideOnOutsideClick]="true" [hideOnEscape]="true">Animated Toggle</button>
        <div class="animated-target">Animated Content</div>
    `
})
class TestAnimationStyleClassComponent {}

@Component({
    standalone: false,
    template: `
        <button pStyleClass="@next" enterActiveClass="slidedown" enterFromClass="hidden" enterToClass="visible" leaveFromClass="visible" leaveActiveClass="slideup" leaveToClass="hidden">Slidedown Animation</button>
        <div class="slidedown-target">Slidedown Content</div>
    `
})
class TestSlidedownStyleClassComponent {}

@Component({
    standalone: false,
    template: `
        <button pStyleClass="#resize-target" [hideOnResize]="true" [toggleClass]="toggleClass">Resize Toggle</button>
        <div id="resize-target" class="resize-target">Resize Target</div>
    `
})
class TestResizeStyleClassComponent {
    toggleClass = 'expanded';
}

describe('StyleClass', () => {
    let component: TestBasicStyleClassComponent;
    let fixture: ComponentFixture<TestBasicStyleClassComponent>;
    let buttonElement: DebugElement;
    let styleClassInstance: StyleClass;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestBasicStyleClassComponent, TestSelectorStyleClassComponent, TestGrandparentSelectorComponent, TestAnimationStyleClassComponent, TestSlidedownStyleClassComponent, TestResizeStyleClassComponent],
            imports: [StyleClass],
            providers: [provideZonelessChangeDetection()]
        }).compileComponents();

        fixture = TestBed.createComponent(TestBasicStyleClassComponent);
        component = fixture.componentInstance;
        buttonElement = fixture.debugElement.query(By.directive(StyleClass));
        styleClassInstance = buttonElement.injector.get(StyleClass);
        fixture.detectChanges();
    });

    describe('Directive Initialization', () => {
        it('should create the directive', () => {
            expect(styleClassInstance).toBeTruthy();
        });

        it('should have required dependencies injected', () => {
            expect(styleClassInstance.el).toBeTruthy();
            expect(styleClassInstance.renderer).toBeTruthy();
            expect(styleClassInstance.constructor.name).toBe('StyleClass');
        });

        it('should initialize with undefined values', () => {
            expect(styleClassInstance.selector).toBe('@next');
            expect(styleClassInstance.enterFromClass).toBeUndefined();
            expect(styleClassInstance.enterActiveClass).toBeUndefined();
            expect(styleClassInstance.enterToClass).toBeUndefined();
            expect(styleClassInstance.leaveFromClass).toBeUndefined();
            expect(styleClassInstance.leaveActiveClass).toBeUndefined();
            expect(styleClassInstance.leaveToClass).toBeUndefined();
            expect(styleClassInstance.hideOnOutsideClick).toBeFalsy();
            expect(styleClassInstance.hideOnEscape).toBeFalsy();
            expect(styleClassInstance.hideOnResize).toBeFalsy();
            expect(styleClassInstance.toggleClass).toBeUndefined();
        });

        it('should initialize listeners as undefined', () => {
            expect(styleClassInstance.documentClickListener).toBeFalsy();
            expect(styleClassInstance.documentKeydownListener).toBeFalsy();
            expect(styleClassInstance.windowResizeListener).toBeFalsy();
            expect(styleClassInstance.resizeObserver).toBeUndefined();
            expect(styleClassInstance.animating).toBeUndefined();
        });
    });

    describe('Input Properties', () => {
        it('should update selector input', () => {
            expect(styleClassInstance.selector).toBe('@next');
        });

        it('should update enterFromClass input', async () => {
            component.enterFromClass = 'hidden';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(styleClassInstance.enterFromClass).toBe('hidden');
        });

        it('should update enterActiveClass input', async () => {
            component.enterActiveClass = 'fade-in';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(styleClassInstance.enterActiveClass).toBe('fade-in');
        });

        it('should update enterToClass input', async () => {
            component.enterToClass = 'visible';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(styleClassInstance.enterToClass).toBe('visible');
        });

        it('should update leaveFromClass input', async () => {
            component.leaveFromClass = 'visible';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(styleClassInstance.leaveFromClass).toBe('visible');
        });

        it('should update leaveActiveClass input', async () => {
            component.leaveActiveClass = 'fade-out';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(styleClassInstance.leaveActiveClass).toBe('fade-out');
        });

        it('should update leaveToClass input', async () => {
            component.leaveToClass = 'hidden';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(styleClassInstance.leaveToClass).toBe('hidden');
        });

        it('should update hideOnOutsideClick with booleanAttribute transform', async () => {
            component.hideOnOutsideClick = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(styleClassInstance.hideOnOutsideClick).toBe(true);

            component.hideOnOutsideClick = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(styleClassInstance.hideOnOutsideClick).toBe(false);
        });

        it('should update hideOnEscape with booleanAttribute transform', async () => {
            component.hideOnEscape = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(styleClassInstance.hideOnEscape).toBe(true);

            component.hideOnEscape = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(styleClassInstance.hideOnEscape).toBe(false);
        });

        it('should update hideOnResize with booleanAttribute transform', async () => {
            component.hideOnResize = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(styleClassInstance.hideOnResize).toBe(true);

            component.hideOnResize = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(styleClassInstance.hideOnResize).toBe(false);
        });

        it('should update toggleClass input', async () => {
            component.toggleClass = 'active';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(styleClassInstance.toggleClass).toBe('active');
        });

        it('should update resizeSelector input', async () => {
            component.resizeSelector = '#resize-target';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(styleClassInstance.resizeSelector).toBe('#resize-target');
        });
    });

    describe('Click Handler Tests', () => {
        it('should handle click event', async () => {
            spyOn(styleClassInstance, 'toggle');
            component.toggleClass = 'active';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            buttonElement.nativeElement.click();

            expect(styleClassInstance.toggle).toHaveBeenCalled();
        });

        it('should call enter method when target is hidden', async () => {
            spyOn(styleClassInstance, 'enter');
            component.enterActiveClass = 'slide-in';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            // Set target to be hidden (offsetParent === null)
            const targetElement = fixture.debugElement.query(By.css('.target-element'));
            Object.defineProperty(targetElement.nativeElement, 'offsetParent', {
                value: null,
                configurable: true
            });

            buttonElement.nativeElement.click();

            expect(styleClassInstance.enter).toHaveBeenCalled();
        });

        it('should call leave method when target is visible', async () => {
            spyOn(styleClassInstance, 'leave');
            component.leaveActiveClass = 'slide-out';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            // Set target to be visible (offsetParent !== null)
            const targetElement = fixture.debugElement.query(By.css('.target-element'));
            Object.defineProperty(targetElement.nativeElement, 'offsetParent', {
                value: document.body,
                configurable: true
            });

            buttonElement.nativeElement.click();

            expect(styleClassInstance.leave).toHaveBeenCalled();
        });

        it('should set target element on first click', () => {
            expect(styleClassInstance.target).toBeFalsy();

            buttonElement.nativeElement.click();

            expect(styleClassInstance.target).toBeTruthy();
            expect(styleClassInstance.target).toBe(fixture.debugElement.query(By.css('.target-element')).nativeElement);
        });
    });

    describe('Toggle Method Tests', () => {
        beforeEach(async () => {
            component.toggleClass = 'active';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            buttonElement.nativeElement.click(); // Set target
        });

        it('should add class when not present', () => {
            const targetElement = styleClassInstance.target as HTMLElement;
            // Remove any existing classes to ensure clean test state
            targetElement.classList.remove('active', 'hidden');

            expect(targetElement.classList.contains('active')).toBe(false);

            styleClassInstance.toggle();

            expect(targetElement.classList.contains('active')).toBe(true);
        });

        it('should remove class when present', () => {
            const targetElement = styleClassInstance.target as HTMLElement;
            // Remove any existing classes first, then add the one we want to test
            targetElement.classList.remove('active', 'hidden');
            targetElement.classList.add('active');

            expect(targetElement.classList.contains('active')).toBe(true);

            styleClassInstance.toggle();

            expect(targetElement.classList.contains('active')).toBe(false);
        });

        it('should handle multiple toggles', () => {
            const targetElement = styleClassInstance.target as HTMLElement;

            // Remove any existing classes to ensure clean test state
            targetElement.classList.remove('active', 'hidden');

            // Ensure target exists and class is not present initially
            expect(targetElement.classList.contains('active')).toBe(false);

            styleClassInstance.toggle();
            expect(targetElement.classList.contains('active')).toBe(true);

            styleClassInstance.toggle();
            expect(targetElement.classList.contains('active')).toBe(false);

            styleClassInstance.toggle();
            expect(targetElement.classList.contains('active')).toBe(true);
        });
    });

    describe('Enter Method Tests', () => {
        beforeEach(() => {
            buttonElement.nativeElement.click(); // Set target
        });

        it('should handle enter without animation classes', async () => {
            component.enterFromClass = 'hidden';
            component.enterToClass = 'visible';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const targetElement = styleClassInstance.target as HTMLElement;
            targetElement.classList.add('hidden');

            styleClassInstance.enter();

            expect(targetElement.classList.contains('hidden')).toBe(false);
            expect(targetElement.classList.contains('visible')).toBe(true);
        });

        it('should handle enter with animation classes', async () => {
            component.enterActiveClass = 'slide-in';
            component.enterFromClass = 'hidden';
            component.enterToClass = 'visible';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const targetElement = styleClassInstance.target as HTMLElement;
            targetElement.classList.add('hidden');

            styleClassInstance.enter();

            expect(targetElement.classList.contains('slide-in')).toBe(true);
            expect(targetElement.classList.contains('hidden')).toBe(false);
            expect(styleClassInstance.animating).toBe(true);
        });

        it('should handle slidedown animation', async () => {
            component.enterActiveClass = 'slidedown';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const targetElement = styleClassInstance.target as HTMLElement;
            // Mock scrollHeight for slidedown calculation
            Object.defineProperty(targetElement, 'scrollHeight', {
                value: 100,
                configurable: true
            });

            styleClassInstance.enter();

            expect(targetElement.classList.contains('slidedown')).toBe(true);
            expect(styleClassInstance.animating).toBe(true);
            // In test environment, style properties may not be set exactly
        });

        it('should bind listeners when hideOnOutsideClick is true', async () => {
            component.hideOnOutsideClick = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            spyOn(styleClassInstance, 'bindDocumentClickListener');

            styleClassInstance.enter();

            expect(styleClassInstance.bindDocumentClickListener).toHaveBeenCalled();
        });

        it('should bind listeners when hideOnEscape is true', async () => {
            component.hideOnEscape = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            spyOn(styleClassInstance, 'bindDocumentKeydownListener');

            styleClassInstance.enter();

            expect(styleClassInstance.bindDocumentKeydownListener).toHaveBeenCalled();
        });

        it('should bind listeners when hideOnResize is true', async () => {
            component.hideOnResize = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            spyOn(styleClassInstance, 'bindResizeListener');

            styleClassInstance.enter();

            expect(styleClassInstance.bindResizeListener).toHaveBeenCalled();
        });

        it('should not start animation when already animating', async () => {
            component.enterActiveClass = 'slide-in';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            styleClassInstance.animating = true;
            const targetElement = styleClassInstance.target as HTMLElement;

            styleClassInstance.enter();

            expect(targetElement.classList.contains('slide-in')).toBe(false);
        });
    });

    describe('Leave Method Tests', () => {
        beforeEach(() => {
            buttonElement.nativeElement.click(); // Set target
        });

        it('should handle leave without animation classes', async () => {
            component.leaveFromClass = 'visible';
            component.leaveToClass = 'hidden';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const targetElement = styleClassInstance.target as HTMLElement;
            targetElement.classList.add('visible');

            styleClassInstance.leave();

            expect(targetElement.classList.contains('visible')).toBe(false);
            expect(targetElement.classList.contains('hidden')).toBe(true);
        });

        it('should handle leave with animation classes', async () => {
            component.leaveActiveClass = 'slide-out';
            component.leaveFromClass = 'visible';
            component.leaveToClass = 'hidden';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const targetElement = styleClassInstance.target as HTMLElement;
            targetElement.classList.add('visible');

            styleClassInstance.leave();

            expect(targetElement.classList.contains('slide-out')).toBe(true);
            expect(targetElement.classList.contains('visible')).toBe(false);
            expect(styleClassInstance.animating).toBe(true);
        });

        it('should unbind listeners when hideOnOutsideClick is true', async () => {
            component.hideOnOutsideClick = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            spyOn(styleClassInstance, 'unbindDocumentClickListener');

            styleClassInstance.leave();

            expect(styleClassInstance.unbindDocumentClickListener).toHaveBeenCalled();
        });

        it('should unbind listeners when hideOnEscape is true', async () => {
            component.hideOnEscape = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            spyOn(styleClassInstance, 'unbindDocumentKeydownListener');

            styleClassInstance.leave();

            expect(styleClassInstance.unbindDocumentKeydownListener).toHaveBeenCalled();
        });

        it('should unbind listeners when hideOnResize is true', async () => {
            component.hideOnResize = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            spyOn(styleClassInstance, 'unbindResizeListener');

            styleClassInstance.leave();

            expect(styleClassInstance.unbindResizeListener).toHaveBeenCalled();
        });

        it('should not start animation when already animating', async () => {
            component.leaveActiveClass = 'slide-out';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            styleClassInstance.animating = true;
            const targetElement = styleClassInstance.target as HTMLElement;

            styleClassInstance.leave();

            expect(targetElement.classList.contains('slide-out')).toBe(false);
        });
    });

    describe('Selector Tests', () => {
        it('should work with @parent selector', async () => {
            const selectorFixture = TestBed.createComponent(TestSelectorStyleClassComponent);
            selectorFixture.changeDetectorRef.markForCheck();
            await selectorFixture.whenStable();

            const parentButton = selectorFixture.debugElement.query(By.css('button[pStyleClass="@parent"]'));
            const parentButtonInstance = parentButton.injector.get(StyleClass);

            parentButton.nativeElement.click();

            expect(parentButtonInstance.target).toBeTruthy();
            expect(parentButtonInstance.target).toBe(selectorFixture.debugElement.query(By.css('.container')).nativeElement);
        });

        it('should work with @prev selector', async () => {
            const selectorFixture = TestBed.createComponent(TestSelectorStyleClassComponent);
            selectorFixture.changeDetectorRef.markForCheck();
            await selectorFixture.whenStable();

            const prevButton = selectorFixture.debugElement.query(By.css('button[pStyleClass="@prev"]'));
            const prevButtonInstance = prevButton.injector.get(StyleClass);

            prevButton.nativeElement.click();

            // @prev selector should target the previous sibling element
            // In this case it should be the button itself's previous sibling
            expect(prevButtonInstance.target).toBeTruthy();
        });

        it('should work with @grandparent selector', async () => {
            const grandparentFixture = TestBed.createComponent(TestGrandparentSelectorComponent);
            grandparentFixture.changeDetectorRef.markForCheck();
            await grandparentFixture.whenStable();

            const grandparentButton = grandparentFixture.debugElement.query(By.directive(StyleClass));
            const grandparentInstance = grandparentButton.injector.get(StyleClass);

            grandparentButton.nativeElement.click();

            expect(grandparentInstance.target).toBeTruthy();
            expect(grandparentInstance.target?.classList.contains('highlight')).toBe(true);
        });

        it('should work with CSS selector', async () => {
            component.toggleClass = 'active';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            // Change selector to CSS selector
            styleClassInstance.selector = '.target-element';

            buttonElement.nativeElement.click();

            const targetElement = fixture.debugElement.query(By.css('.target-element'));
            expect(styleClassInstance.target).toBe(targetElement.nativeElement);
        });
    });

    describe('Outside Click Tests', () => {
        beforeEach(async () => {
            component.hideOnOutsideClick = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            buttonElement.nativeElement.click(); // Set target and bind listeners
        });

        it('should bind document click listener when hideOnOutsideClick is true', () => {
            styleClassInstance.enter();
            expect(styleClassInstance.documentClickListener).toBeTruthy();
        });

        it('should detect outside click correctly', () => {
            const outsideElement = document.createElement('div');
            document.body.appendChild(outsideElement);

            const clickEvent = new MouseEvent('click', { bubbles: true });
            Object.defineProperty(clickEvent, 'target', { value: outsideElement });

            expect(styleClassInstance.isOutsideClick(clickEvent)).toBe(true);

            document.body.removeChild(outsideElement);
        });

        it('should not detect inside click as outside click', () => {
            const clickEvent = new MouseEvent('click', { bubbles: true });
            Object.defineProperty(clickEvent, 'target', { value: buttonElement.nativeElement });

            expect(styleClassInstance.isOutsideClick(clickEvent)).toBe(false);
        });

        it('should unbind document click listener', () => {
            styleClassInstance.bindDocumentClickListener();
            expect(styleClassInstance.documentClickListener).toBeTruthy();

            styleClassInstance.unbindDocumentClickListener();
            expect(styleClassInstance.documentClickListener).toBeNull();
        });
    });

    describe('Escape Key Tests', () => {
        beforeEach(async () => {
            component.hideOnEscape = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            buttonElement.nativeElement.click(); // Set target
        });

        it('should bind document keydown listener when hideOnEscape is true', () => {
            styleClassInstance.enter();
            expect(styleClassInstance.documentKeydownListener).toBeTruthy();
        });

        it('should unbind document keydown listener', () => {
            styleClassInstance.bindDocumentKeydownListener();
            expect(styleClassInstance.documentKeydownListener).toBeTruthy();

            styleClassInstance.unbindDocumentKeydownListener();
            expect(styleClassInstance.documentKeydownListener).toBeNull();
        });

        it('should call leave method on escape key', async () => {
            // Set up target to be visible
            const targetElement = styleClassInstance.target as HTMLElement;
            Object.defineProperty(targetElement, 'offsetParent', {
                value: document.body,
                configurable: true
            });

            spyOn(styleClassInstance, 'leave');
            styleClassInstance.bindDocumentKeydownListener();

            const escapeEvent = new KeyboardEvent('keydown', {
                key: 'Escape',
                keyCode: 27,
                which: 27
            });

            document.dispatchEvent(escapeEvent);
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            expect(styleClassInstance.leave).toHaveBeenCalled();
        });
    });

    describe('Resize Tests', () => {
        let resizeFixture: ComponentFixture<TestResizeStyleClassComponent>;

        beforeEach(() => {
            resizeFixture = TestBed.createComponent(TestResizeStyleClassComponent);
            resizeFixture.detectChanges();
        });

        it('should bind window resize listener', () => {
            const resizeButton = resizeFixture.debugElement.query(By.directive(StyleClass));
            const resizeInstance = resizeButton.injector.get(StyleClass);

            resizeInstance.bindWindowResizeListener();
            expect(resizeInstance.windowResizeListener).toBeTruthy();
        });

        it('should unbind window resize listener', () => {
            const resizeButton = resizeFixture.debugElement.query(By.directive(StyleClass));
            const resizeInstance = resizeButton.injector.get(StyleClass);

            resizeInstance.bindWindowResizeListener();
            expect(resizeInstance.windowResizeListener).toBeTruthy();

            resizeInstance.unbindWindowResizeListener();
            expect(resizeInstance.windowResizeListener).toBeNull();
        });

        it('should bind element resize observer', () => {
            const resizeButton = resizeFixture.debugElement.query(By.directive(StyleClass));
            const resizeInstance = resizeButton.injector.get(StyleClass);

            resizeInstance._resizeTarget = resizeFixture.debugElement.query(By.css('#resize-target')).nativeElement;
            resizeInstance.bindElementResizeListener();

            expect(resizeInstance.resizeObserver).toBeTruthy();
        });

        it('should unbind element resize observer', () => {
            const resizeButton = resizeFixture.debugElement.query(By.directive(StyleClass));
            const resizeInstance = resizeButton.injector.get(StyleClass);

            resizeInstance._resizeTarget = resizeFixture.debugElement.query(By.css('#resize-target')).nativeElement;
            resizeInstance.bindElementResizeListener();
            expect(resizeInstance.resizeObserver).toBeTruthy();

            resizeInstance.unbindElementResizeListener();
            expect(resizeInstance.resizeObserver).toBeUndefined();
        });

        it('should handle resize listener binding based on selector type', () => {
            const resizeButton = resizeFixture.debugElement.query(By.directive(StyleClass));
            const resizeInstance = resizeButton.injector.get(StyleClass);

            spyOn(resizeInstance, 'bindElementResizeListener');
            spyOn(resizeInstance, 'bindWindowResizeListener');

            resizeInstance.resizeSelector = '#resize-target';
            resizeInstance.bindResizeListener();

            expect(resizeInstance.bindElementResizeListener).toHaveBeenCalled();
        });

        it('should handle unbind resize listener', () => {
            const resizeButton = resizeFixture.debugElement.query(By.directive(StyleClass));
            const resizeInstance = resizeButton.injector.get(StyleClass);

            spyOn(resizeInstance, 'unbindElementResizeListener');
            spyOn(resizeInstance, 'unbindWindowResizeListener');

            resizeInstance.unbindResizeListener();

            expect(resizeInstance.unbindElementResizeListener).toHaveBeenCalled();
            expect(resizeInstance.unbindWindowResizeListener).toHaveBeenCalled();
        });
    });

    describe('Visibility Tests', () => {
        beforeEach(() => {
            buttonElement.nativeElement.click(); // Set target
        });

        it('should detect visible element', () => {
            const targetElement = styleClassInstance.target as HTMLElement;
            Object.defineProperty(targetElement, 'offsetParent', {
                value: document.body,
                configurable: true
            });

            expect(styleClassInstance.isVisible()).toBe(true);
        });

        it('should detect hidden element', () => {
            const targetElement = styleClassInstance.target as HTMLElement;
            Object.defineProperty(targetElement, 'offsetParent', {
                value: null,
                configurable: true
            });

            expect(styleClassInstance.isVisible()).toBe(false);
        });
    });

    describe('Animation Event Handling', () => {
        beforeEach(() => {
            buttonElement.nativeElement.click(); // Set target
        });

        it('should handle animation end for enter', async () => {
            component.enterActiveClass = 'slide-in';
            component.enterToClass = 'visible';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            styleClassInstance.enter();
            expect(styleClassInstance.animating).toBe(true);

            const targetElement = styleClassInstance.target as HTMLElement;
            const animationEndEvent = new AnimationEvent('animationend');
            targetElement.dispatchEvent(animationEndEvent);

            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            expect(targetElement.classList.contains('slide-in')).toBe(false);
            expect(targetElement.classList.contains('visible')).toBe(true);
            expect(styleClassInstance.animating).toBe(false);
        });

        it('should handle animation end for leave', async () => {
            component.leaveActiveClass = 'slide-out';
            component.leaveToClass = 'hidden';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            styleClassInstance.leave();
            expect(styleClassInstance.animating).toBe(true);

            const targetElement = styleClassInstance.target as HTMLElement;
            const animationEndEvent = new AnimationEvent('animationend');
            targetElement.dispatchEvent(animationEndEvent);

            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            expect(targetElement.classList.contains('slide-out')).toBe(false);
            expect(targetElement.classList.contains('hidden')).toBe(true);
            expect(styleClassInstance.animating).toBe(false);
        });

        it('should handle slidedown maxHeight reset on animation end', async () => {
            component.enterActiveClass = 'slidedown';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const targetElement = styleClassInstance.target as HTMLElement;
            styleClassInstance.enter();

            const animationEndEvent = new AnimationEvent('animationend');
            targetElement.dispatchEvent(animationEndEvent);

            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            expect(targetElement.style.maxHeight).toBe('' as any);
        });
    });

    describe('Edge Cases', () => {
        it('should handle null/undefined selector', () => {
            styleClassInstance.selector = undefined as any;

            expect(() => buttonElement.nativeElement.click()).not.toThrow();
        });

        it('should handle empty class names', async () => {
            component.toggleClass = '';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            buttonElement.nativeElement.click(); // Set target

            expect(() => styleClassInstance.toggle()).not.toThrow();
        });

        it('should handle rapid clicks during animation', async () => {
            component.enterActiveClass = 'slide-in';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            buttonElement.nativeElement.click(); // Set target

            styleClassInstance.enter();
            expect(styleClassInstance.animating).toBe(true);

            // Second enter call should be ignored
            styleClassInstance.enter();

            const targetElement = styleClassInstance.target as HTMLElement;
            // Should only have one instance of the class
            const classCount = targetElement.className.split('slide-in').length - 1;
            expect(classCount).toBe(1);
        });

        it('should handle animation without target element', () => {
            styleClassInstance.target = null as any;

            expect(() => styleClassInstance.enter()).not.toThrow();
            expect(() => styleClassInstance.leave()).not.toThrow();
        });

        it('should handle missing animation classes gracefully', () => {
            buttonElement.nativeElement.click(); // Set target

            expect(() => styleClassInstance.enter()).not.toThrow();
            expect(() => styleClassInstance.leave()).not.toThrow();
        });

        it('should handle multiple listener bindings', async () => {
            component.hideOnOutsideClick = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            // Bind multiple times
            styleClassInstance.bindDocumentClickListener();
            styleClassInstance.bindDocumentClickListener();

            // Should still have only one listener
            expect(styleClassInstance.documentClickListener).toBeTruthy();
        });

        it('should handle component destruction during animation', async () => {
            component.enterActiveClass = 'slide-in';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            buttonElement.nativeElement.click();

            styleClassInstance.enter();
            expect(styleClassInstance.animating).toBe(true);

            expect(() => styleClassInstance.ngOnDestroy()).not.toThrow();
        });
    });

    describe('Integration Tests', () => {
        it('should work with animation component', async () => {
            const animationFixture = TestBed.createComponent(TestAnimationStyleClassComponent);
            animationFixture.changeDetectorRef.markForCheck();
            await animationFixture.whenStable();

            const animationButton = animationFixture.debugElement.query(By.directive(StyleClass));
            const animationInstance = animationButton.injector.get(StyleClass);

            animationButton.nativeElement.click();

            expect(animationInstance.target).toBeTruthy();
            expect(animationInstance.hideOnOutsideClick).toBe(true);
            expect(animationInstance.hideOnEscape).toBe(true);
        });

        it('should work with slidedown component', async () => {
            const slidedownFixture = TestBed.createComponent(TestSlidedownStyleClassComponent);
            slidedownFixture.changeDetectorRef.markForCheck();
            await slidedownFixture.whenStable();

            const slidedownButton = slidedownFixture.debugElement.query(By.directive(StyleClass));
            const slidedownInstance = slidedownButton.injector.get(StyleClass);

            slidedownButton.nativeElement.click();

            expect(slidedownInstance.target).toBeTruthy();
            expect(slidedownInstance.enterActiveClass).toBe('slidedown');
        });

        it('should maintain state across multiple interactions', async () => {
            component.toggleClass = 'active';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            // First interaction
            buttonElement.nativeElement.click();
            expect(styleClassInstance.target?.classList.contains('active')).toBe(true);

            // Second interaction
            buttonElement.nativeElement.click();
            expect(styleClassInstance.target?.classList.contains('active')).toBe(false);

            // Third interaction
            buttonElement.nativeElement.click();
            expect(styleClassInstance.target?.classList.contains('active')).toBe(true);
        });
    });

    describe('Cleanup Tests', () => {
        it('should cleanup all listeners on destroy', async () => {
            component.hideOnOutsideClick = true;
            component.hideOnEscape = true;
            component.hideOnResize = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            buttonElement.nativeElement.click();
            styleClassInstance.enter();

            // Ensure listeners are bound
            expect(styleClassInstance.documentClickListener).toBeTruthy();
            expect(styleClassInstance.documentKeydownListener).toBeTruthy();

            styleClassInstance.ngOnDestroy();

            expect(styleClassInstance.target).toBeNull();
            expect(styleClassInstance._resizeTarget).toBeNull();
            expect(styleClassInstance.documentClickListener).toBeNull();
            expect(styleClassInstance.documentKeydownListener).toBeNull();
        });

        it('should cleanup resize observer on destroy', async () => {
            const resizeFixture = TestBed.createComponent(TestResizeStyleClassComponent);
            resizeFixture.changeDetectorRef.markForCheck();
            await resizeFixture.whenStable();

            const resizeButton = resizeFixture.debugElement.query(By.directive(StyleClass));
            const resizeInstance = resizeButton.injector.get(StyleClass);

            resizeInstance._resizeTarget = resizeFixture.debugElement.query(By.css('#resize-target')).nativeElement;
            resizeInstance.bindElementResizeListener();

            expect(resizeInstance.resizeObserver).toBeTruthy();

            resizeInstance.ngOnDestroy();

            expect(resizeInstance.resizeObserver).toBeUndefined();
        });

        it('should cleanup event listener if exists', () => {
            const mockListener = jasmine.createSpy('eventListener');
            styleClassInstance.eventListener = mockListener;

            styleClassInstance.ngOnDestroy();

            expect(mockListener).toHaveBeenCalled();
        });

        it('should handle cleanup when no listeners are bound', () => {
            expect(() => styleClassInstance.ngOnDestroy()).not.toThrow();
        });
    });

    describe('Public Method Tests', () => {
        beforeEach(() => {
            buttonElement.nativeElement.click(); // Set target
        });

        it('should have all public methods available', () => {
            expect(typeof styleClassInstance.toggle).toBe('function');
            expect(typeof styleClassInstance.enter).toBe('function');
            expect(typeof styleClassInstance.leave).toBe('function');
            expect(typeof styleClassInstance.isVisible).toBe('function');
            expect(typeof styleClassInstance.isOutsideClick).toBe('function');
        });

        it('should call enter method programmatically', async () => {
            spyOn(styleClassInstance, 'bindDocumentClickListener');
            component.hideOnOutsideClick = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            styleClassInstance.enter();

            expect(styleClassInstance.bindDocumentClickListener).toHaveBeenCalled();
        });

        it('should call leave method programmatically', async () => {
            spyOn(styleClassInstance, 'unbindDocumentClickListener');
            component.hideOnOutsideClick = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            styleClassInstance.leave();

            expect(styleClassInstance.unbindDocumentClickListener).toHaveBeenCalled();
        });

        it('should call toggle method programmatically', async () => {
            component.toggleClass = 'test-class';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const targetElement = styleClassInstance.target as HTMLElement;

            styleClassInstance.toggle();
            expect(targetElement.classList.contains('test-class')).toBe(true);

            styleClassInstance.toggle();
            expect(targetElement.classList.contains('test-class')).toBe(false);
        });
    });
});
