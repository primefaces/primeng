import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AnimateOnScroll, AnimateOnScrollModule } from './animateonscroll';

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
    root: Element | Document | null = null as any;
    rootMargin = '';
    thresholds: readonly number[] = [];

    private callback: IntersectionObserverCallback;
    private elements: Element[] = [];

    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        this.callback = callback;
        this.root = options?.root || null;
        this.rootMargin = options?.rootMargin || '';
        this.thresholds = Array.isArray(options?.threshold) ? options.threshold : [options?.threshold || 0];
    }

    observe(element: Element): void {
        this.elements.push(element);
    }

    unobserve(element: Element): void {
        const index = this.elements.indexOf(element);
        if (index > -1) {
            this.elements.splice(index, 1);
        }
    }

    disconnect(): void {
        this.elements = [];
    }

    takeRecords(): IntersectionObserverEntry[] {
        return [];
    }

    // Helper method for testing
    triggerIntersection(element: Element, isIntersecting: boolean, rectOptions: { top?: number } = {}): void {
        const rect = new DOMRect(0, rectOptions.top || 0, 100, 100);
        const entry: IntersectionObserverEntry = {
            target: element,
            isIntersecting,
            intersectionRatio: isIntersecting ? 1 : 0,
            intersectionRect: new DOMRect(0, 0, 100, 100),
            boundingClientRect: rect,
            rootBounds: new DOMRect(0, 0, 1000, 1000),
            time: Date.now()
        };
        this.callback([entry], this);
    }
}

@Component({
    standalone: false,
    template: `<div pAnimateOnScroll>Basic AnimateOnScroll</div>`
})
class TestBasicAnimateOnScrollComponent {}

@Component({
    standalone: false,
    template: ` <div pAnimateOnScroll [enterClass]="enterClass" [leaveClass]="leaveClass" [root]="root" [rootMargin]="rootMargin" [threshold]="threshold" [once]="once">Custom AnimateOnScroll</div> `
})
class TestCustomAnimateOnScrollComponent {
    enterClass: string | undefined;
    leaveClass: string | undefined;
    root: HTMLElement | undefined | null;
    rootMargin: string | undefined;
    threshold: number | undefined;
    once: boolean = false;
}

@Component({
    standalone: false,
    template: `
        <div class="container">
            <div pAnimateOnScroll enterClass="fade-in" leaveClass="fade-out">Element 1</div>
            <div pAnimateOnScroll enterClass="slide-in" leaveClass="slide-out">Element 2</div>
            <div pAnimateOnScroll enterClass="zoom-in" leaveClass="zoom-out">Element 3</div>
        </div>
    `
})
class TestMultipleAnimateOnScrollComponent {}

@Component({
    standalone: false,
    template: ` <div pAnimateOnScroll enterClass="animate__fadeIn" [once]="true">Once Animation Element</div> `
})
class TestOnceAnimateOnScrollComponent {}

@Component({
    standalone: false,
    template: ` <div pAnimateOnScroll enterClass="custom-enter" leaveClass="custom-leave" [threshold]="0.8" rootMargin="10px">Advanced Config Element</div> `
})
class TestAdvancedConfigComponent {}

@Component({
    standalone: false,
    template: ` <div pAnimateOnScroll [enterClass]="enterClass" [leaveClass]="leaveClass" [once]="once" [threshold]="threshold">Dynamic Config Element</div> `
})
class TestDynamicConfigComponent {
    enterClass = 'initial-enter';
    leaveClass = 'initial-leave';
    once = false;
    threshold = 0.5;
}

describe('AnimateOnScroll', () => {
    let mockIntersectionObserver: MockIntersectionObserver;
    let mockIntersectionObserverInstances: MockIntersectionObserver[] = [];

    beforeEach(() => {
        // Clear previous instances
        mockIntersectionObserverInstances = [];

        // Mock IntersectionObserver
        (window as any).IntersectionObserver = class {
            constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
                const instance = new MockIntersectionObserver(callback, options);
                mockIntersectionObserverInstances.push(instance);
                mockIntersectionObserver = instance;
                return instance;
            }
        };

        TestBed.configureTestingModule({
            imports: [AnimateOnScrollModule, NoopAnimationsModule],
            declarations: [TestBasicAnimateOnScrollComponent, TestCustomAnimateOnScrollComponent, TestMultipleAnimateOnScrollComponent, TestOnceAnimateOnScrollComponent, TestAdvancedConfigComponent, TestDynamicConfigComponent]
        });
    });

    afterEach(() => {
        // Clean up
        mockIntersectionObserverInstances = [];
    });

    describe('Component Initialization', () => {
        let fixture: ComponentFixture<TestBasicAnimateOnScrollComponent>;
        let component: TestBasicAnimateOnScrollComponent;
        let directiveEl: DebugElement;
        let directive: AnimateOnScroll;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicAnimateOnScrollComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            directiveEl = fixture.debugElement.query(By.directive(AnimateOnScroll));
            directive = directiveEl.injector.get(AnimateOnScroll);
        });

        it('should create the directive', () => {
            expect(directive).toBeTruthy();
        });

        it('should have default values', () => {
            expect(directive.threshold).toBe(0.5);
            expect(directive.once).toBe(false);
            expect(directive.enterClass).toBeUndefined();
            expect(directive.leaveClass).toBeUndefined();
            expect(directive.root).toBeUndefined();
            expect(directive.rootMargin).toBeUndefined();
        });

        it('should apply host class', () => {
            expect(directiveEl.nativeElement.className).toContain('p-animateonscroll');
        });

        it('should initialize IntersectionObserver', fakeAsync(() => {
            tick(1);
            expect(mockIntersectionObserverInstances.length).toBeGreaterThan(0);
        }));

        it('should set initial opacity when enterClass is provided', () => {
            const customFixture = TestBed.createComponent(TestCustomAnimateOnScrollComponent);
            const customComponent = customFixture.componentInstance;
            customComponent.enterClass = 'fade-in';
            customFixture.detectChanges();

            const customDirectiveEl = customFixture.debugElement.query(By.directive(AnimateOnScroll));
            expect(customDirectiveEl.nativeElement.style.opacity).toBe('0');
        });
    });

    describe('Enter Animation', () => {
        let fixture: ComponentFixture<TestCustomAnimateOnScrollComponent>;
        let component: TestCustomAnimateOnScrollComponent;
        let directiveEl: DebugElement;
        let directive: AnimateOnScroll;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestCustomAnimateOnScrollComponent);
            component = fixture.componentInstance;
            component.enterClass = 'fade-in';
            component.leaveClass = 'fade-out';
            fixture.detectChanges();

            directiveEl = fixture.debugElement.query(By.directive(AnimateOnScroll));
            directive = directiveEl.injector.get(AnimateOnScroll);
        });

        it('should trigger enter animation when element intersects', fakeAsync(() => {
            tick(1);

            const mockObserver = mockIntersectionObserverInstances[0];
            mockObserver.triggerIntersection(directiveEl.nativeElement, true, { top: 100 });

            expect(directiveEl.nativeElement.classList.contains('fade-in')).toBe(true);
            expect(directiveEl.nativeElement.style.opacity).toBe('' as any);
            expect(directive.animationState).toBe('enter');
        }));

        it('should not trigger enter animation if already in enter state', fakeAsync(() => {
            tick(1);

            const mockObserver = mockIntersectionObserverInstances[0];
            directive.animationState = 'enter';
            spyOn(directiveEl.nativeElement.classList, 'add');

            mockObserver.triggerIntersection(directiveEl.nativeElement, true, { top: 100 });

            expect(directiveEl.nativeElement.classList.add).not.toHaveBeenCalled();
        }));

        it('should remove leave class when entering', fakeAsync(() => {
            tick(1);

            directiveEl.nativeElement.classList.add('fade-out');
            const mockObserver = mockIntersectionObserverInstances[0];
            mockObserver.triggerIntersection(directiveEl.nativeElement, true, { top: 100 });

            expect(directiveEl.nativeElement.classList.contains('fade-out')).toBe(false);
            expect(directiveEl.nativeElement.classList.contains('fade-in')).toBe(true);
        }));
    });

    describe('Leave Animation', () => {
        let fixture: ComponentFixture<TestCustomAnimateOnScrollComponent>;
        let component: TestCustomAnimateOnScrollComponent;
        let directiveEl: DebugElement;
        let directive: AnimateOnScroll;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestCustomAnimateOnScrollComponent);
            component = fixture.componentInstance;
            component.enterClass = 'fade-in';
            component.leaveClass = 'fade-out';
            fixture.detectChanges();

            directiveEl = fixture.debugElement.query(By.directive(AnimateOnScroll));
            directive = directiveEl.injector.get(AnimateOnScroll);
        });

        it('should trigger leave animation when element leaves viewport', fakeAsync(() => {
            tick(1);

            const mockObserver = mockIntersectionObserverInstances[0];
            // First make it active
            mockObserver.triggerIntersection(directiveEl.nativeElement, true, { top: 100 });
            expect(directive.isObserverActive).toBe(true);

            // Then trigger leave
            mockObserver.triggerIntersection(directiveEl.nativeElement, false, { top: 100 });

            expect(directiveEl.nativeElement.classList.contains('fade-out')).toBe(true);
            expect(directiveEl.nativeElement.style.opacity).toBe('0');
            expect(directive.animationState).toBe('leave');
        }));

        it('should not trigger leave animation if already in leave state', fakeAsync(() => {
            tick(1);

            const mockObserver = mockIntersectionObserverInstances[0];
            directive.isObserverActive = true;
            directive.animationState = 'leave';
            spyOn(directiveEl.nativeElement.classList, 'add');

            mockObserver.triggerIntersection(directiveEl.nativeElement, false, { top: 100 });

            expect(directiveEl.nativeElement.classList.add).not.toHaveBeenCalled();
        }));

        it('should remove enter class when leaving', fakeAsync(() => {
            tick(1);

            directiveEl.nativeElement.classList.add('fade-in');
            const mockObserver = mockIntersectionObserverInstances[0];
            directive.isObserverActive = true;

            mockObserver.triggerIntersection(directiveEl.nativeElement, false, { top: 100 });

            expect(directiveEl.nativeElement.classList.contains('fade-in')).toBe(false);
            expect(directiveEl.nativeElement.classList.contains('fade-out')).toBe(true);
        }));
    });

    describe('Configuration Options', () => {
        let fixture: ComponentFixture<TestCustomAnimateOnScrollComponent>;
        let component: TestCustomAnimateOnScrollComponent;
        let directive: AnimateOnScroll;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestCustomAnimateOnScrollComponent);
            component = fixture.componentInstance;
        });

        it('should use custom threshold', () => {
            component.threshold = 0.8;
            fixture.detectChanges();

            directive = fixture.debugElement.query(By.directive(AnimateOnScroll)).injector.get(AnimateOnScroll);
            expect(directive.options.threshold).toBe(0.8);
        });

        it('should use custom rootMargin', () => {
            component.rootMargin = '10px';
            fixture.detectChanges();

            directive = fixture.debugElement.query(By.directive(AnimateOnScroll)).injector.get(AnimateOnScroll);
            expect(directive.options.rootMargin).toBe('10px');
        });

        it('should use custom root element', () => {
            const rootElement = document.createElement('div');
            component.root = rootElement;
            fixture.detectChanges();

            directive = fixture.debugElement.query(By.directive(AnimateOnScroll)).injector.get(AnimateOnScroll);
            expect(directive.options.root).toBe(rootElement);
        });

        it('should default threshold to 0.5 when undefined', () => {
            component.threshold = undefined as any;
            fixture.detectChanges();

            directive = fixture.debugElement.query(By.directive(AnimateOnScroll)).injector.get(AnimateOnScroll);
            expect(directive.options.threshold).toBe(0.5);
        });
    });

    describe('Once Behavior', () => {
        let fixture: ComponentFixture<TestCustomAnimateOnScrollComponent>;
        let component: TestCustomAnimateOnScrollComponent;
        let directiveEl: DebugElement;
        let directive: AnimateOnScroll;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestCustomAnimateOnScrollComponent);
            component = fixture.componentInstance;
            component.enterClass = 'fade-in';
            component.once = true;
            fixture.detectChanges();

            directiveEl = fixture.debugElement.query(By.directive(AnimateOnScroll));
            directive = directiveEl.injector.get(AnimateOnScroll);
        });

        it('should unbind observer after first intersection when once is true', fakeAsync(() => {
            tick(1);

            spyOn(directive, 'unbindIntersectionObserver').and.callThrough();

            const mockObserver = mockIntersectionObserverInstances[0];
            mockObserver.triggerIntersection(directiveEl.nativeElement, true, { top: 100 });

            expect(directive.unbindIntersectionObserver).toHaveBeenCalled();
        }));

        it('should not unbind observer when once is false', fakeAsync(() => {
            component.once = false;
            fixture.detectChanges();
            tick(1);

            spyOn(directive, 'unbindIntersectionObserver');

            const mockObserver = mockIntersectionObserverInstances[0];
            mockObserver.triggerIntersection(directiveEl.nativeElement, true, { top: 100 });

            expect(directive.unbindIntersectionObserver).not.toHaveBeenCalled();
        }));
    });

    describe('Animation Events', () => {
        let fixture: ComponentFixture<TestCustomAnimateOnScrollComponent>;
        let component: TestCustomAnimateOnScrollComponent;
        let directiveEl: DebugElement;
        let directive: AnimateOnScroll;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestCustomAnimateOnScrollComponent);
            component = fixture.componentInstance;
            component.enterClass = 'fade-in';
            component.leaveClass = 'fade-out';
            fixture.detectChanges();

            directiveEl = fixture.debugElement.query(By.directive(AnimateOnScroll));
            directive = directiveEl.injector.get(AnimateOnScroll);
        });

        it('should bind animation end listener', fakeAsync(() => {
            tick(1);

            const mockObserver = mockIntersectionObserverInstances[0];
            mockObserver.triggerIntersection(directiveEl.nativeElement, true, { top: 100 });

            expect(directive.animationEndListener).toBeDefined();
        }));

        it('should clean up classes on animation end', fakeAsync(() => {
            tick(1);

            const mockObserver = mockIntersectionObserverInstances[0];
            mockObserver.triggerIntersection(directiveEl.nativeElement, true, { top: 100 });

            // Simulate animation end
            directiveEl.nativeElement.dispatchEvent(new Event('animationend'));
            tick(1);

            expect(directiveEl.nativeElement.classList.contains('fade-in')).toBe(false);
            expect(directive.animationEndListener).toBeNull();
        }));

        it('should not create multiple animation listeners', fakeAsync(() => {
            tick(1);

            const mockObserver = mockIntersectionObserverInstances[0];
            mockObserver.triggerIntersection(directiveEl.nativeElement, true, { top: 100 });

            const firstListener = directive.animationEndListener;
            directive.bindAnimationEvents();

            expect(directive.animationEndListener).toBe(firstListener);
        }));
    });

    describe('Multiple Elements', () => {
        let fixture: ComponentFixture<TestMultipleAnimateOnScrollComponent>;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestMultipleAnimateOnScrollComponent);
            fixture.detectChanges();
        });

        it('should handle multiple animated elements', fakeAsync(() => {
            tick(1);

            const directives = fixture.debugElement.queryAll(By.directive(AnimateOnScroll));
            expect(directives.length).toBe(3);

            // Each element should have its own observer
            expect(mockIntersectionObserverInstances.length).toBeGreaterThanOrEqual(3);
        }));

        it('should animate each element independently', fakeAsync(() => {
            tick(1);

            const directives = fixture.debugElement.queryAll(By.directive(AnimateOnScroll));
            const firstElement = directives[0].nativeElement;
            const secondElement = directives[1].nativeElement;

            // Find the appropriate observer for first element
            const firstObserver = mockIntersectionObserverInstances.find((obs) => obs['elements'] && obs['elements'].includes(firstElement)) || mockIntersectionObserverInstances[0];

            firstObserver.triggerIntersection(firstElement, true, { top: 100 });

            expect(firstElement.classList.contains('fade-in')).toBe(true);
            expect(secondElement.classList.contains('slide-in')).toBe(false);
        }));
    });

    describe('Dynamic Configuration Changes', () => {
        let fixture: ComponentFixture<TestDynamicConfigComponent>;
        let component: TestDynamicConfigComponent;
        let directiveEl: DebugElement;
        let directive: AnimateOnScroll;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestDynamicConfigComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            directiveEl = fixture.debugElement.query(By.directive(AnimateOnScroll));
            directive = directiveEl.injector.get(AnimateOnScroll);
        });

        it('should handle dynamic enterClass changes', () => {
            component.enterClass = 'new-enter-class';
            fixture.detectChanges();

            expect(directive.enterClass).toBe('new-enter-class');
        });

        it('should handle dynamic threshold changes', () => {
            component.threshold = 0.9;
            fixture.detectChanges();

            expect(directive.threshold).toBe(0.9);
            expect(directive.options.threshold).toBe(0.9);
        });

        it('should handle dynamic once property changes', () => {
            component.once = true;
            fixture.detectChanges();

            expect(directive.once).toBe(true);
        });
    });

    describe('Reset Observer', () => {
        let fixture: ComponentFixture<TestCustomAnimateOnScrollComponent>;
        let component: TestCustomAnimateOnScrollComponent;
        let directiveEl: DebugElement;
        let directive: AnimateOnScroll;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestCustomAnimateOnScrollComponent);
            component = fixture.componentInstance;
            component.enterClass = 'fade-in';
            component.leaveClass = 'fade-out';
            fixture.detectChanges();

            directiveEl = fixture.debugElement.query(By.directive(AnimateOnScroll));
            directive = directiveEl.injector.get(AnimateOnScroll);
        });

        it('should create reset observer', fakeAsync(() => {
            tick(1);
            expect(directive.resetObserver).toBeDefined();
        }));

        it('should reset animation state when element goes out of view', fakeAsync(() => {
            tick(1);

            // Simulate reset observer triggering
            if (directive.resetObserver && mockIntersectionObserverInstances.length > 1) {
                const resetObserver = mockIntersectionObserverInstances[1];
                resetObserver.triggerIntersection(directiveEl.nativeElement, false, { top: 100 });

                expect(directiveEl.nativeElement.style.opacity).toBe('0');
                expect(directive.animationState).toBeUndefined();
            }
        }));
    });

    describe('Edge Cases', () => {
        let fixture: ComponentFixture<TestCustomAnimateOnScrollComponent>;
        let component: TestCustomAnimateOnScrollComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestCustomAnimateOnScrollComponent);
            component = fixture.componentInstance;
        });

        it('should handle undefined enterClass and leaveClass', () => {
            component.enterClass = undefined as any;
            component.leaveClass = undefined as any;

            expect(() => fixture.detectChanges()).not.toThrow();
        });

        it('should handle null root element', () => {
            component.root = null as any;
            fixture.detectChanges();

            const directive = fixture.debugElement.query(By.directive(AnimateOnScroll)).injector.get(AnimateOnScroll);
            expect(directive.options.root).toBeNull();
        });

        it('should handle elements with top <= 0', fakeAsync(() => {
            component.enterClass = 'fade-in';
            fixture.detectChanges();
            tick(1);

            const directiveEl = fixture.debugElement.query(By.directive(AnimateOnScroll));
            const directive = directiveEl.injector.get(AnimateOnScroll);

            const mockObserver = mockIntersectionObserverInstances[0];
            directive.isObserverActive = true;

            // Element at top of viewport or above
            mockObserver.triggerIntersection(directiveEl.nativeElement, true, { top: 0 });

            // Should not trigger animation when top <= 0 and observer is active
            expect(directiveEl.nativeElement.classList.contains('fade-in')).toBe(false);
        }));
    });

    describe('Cleanup and Memory Management', () => {
        let fixture: ComponentFixture<TestCustomAnimateOnScrollComponent>;
        let component: TestCustomAnimateOnScrollComponent;
        let directiveEl: DebugElement;
        let directive: AnimateOnScroll;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestCustomAnimateOnScrollComponent);
            component = fixture.componentInstance;
            component.enterClass = 'fade-in';
            fixture.detectChanges();

            directiveEl = fixture.debugElement.query(By.directive(AnimateOnScroll));
            directive = directiveEl.injector.get(AnimateOnScroll);
        });

        it('should cleanup observers on destroy', () => {
            spyOn(directive, 'unbindIntersectionObserver').and.callThrough();
            spyOn(directive, 'unbindAnimationEvents').and.callThrough();

            fixture.destroy();

            expect(directive.unbindIntersectionObserver).toHaveBeenCalled();
            expect(directive.unbindAnimationEvents).toHaveBeenCalled();
        });

        it('should unobserve elements when unbinding', fakeAsync(() => {
            tick(1);

            spyOn(directive.observer!, 'unobserve').and.callThrough();
            spyOn(directive.resetObserver!, 'unobserve').and.callThrough();

            directive.unbindIntersectionObserver();

            expect(directive.observer!.unobserve).toHaveBeenCalledWith(directiveEl.nativeElement);
            expect(directive.resetObserver!.unobserve).toHaveBeenCalledWith(directiveEl.nativeElement);
            expect(directive.isObserverActive).toBe(false);
        }));

        it('should cleanup animation listeners', fakeAsync(() => {
            tick(1);

            const mockObserver = mockIntersectionObserverInstances[0];
            mockObserver.triggerIntersection(directiveEl.nativeElement, true, { top: 100 });

            expect(directive.animationEndListener).toBeDefined();

            directive.unbindAnimationEvents();

            expect(directive.animationEndListener).toBeNull();
        }));

        it('should handle rapid create and destroy cycles', () => {
            for (let i = 0; i < 5; i++) {
                const testFixture = TestBed.createComponent(TestCustomAnimateOnScrollComponent);
                testFixture.componentInstance.enterClass = 'fade-in';
                testFixture.detectChanges();
                testFixture.destroy();
            }

            // If we got here without errors, the test passes
            expect(true).toBe(true);
        });
    });

    describe('Browser Compatibility', () => {
        it('should only initialize in browser environment', () => {
            // This test verifies that isPlatformBrowser check works correctly
            const fixture = TestBed.createComponent(TestBasicAnimateOnScrollComponent);
            fixture.detectChanges();

            const directive = fixture.debugElement.query(By.directive(AnimateOnScroll)).injector.get(AnimateOnScroll);
            // In test environment, isPlatformBrowser should return true
            expect(directive.observer).toBeDefined();
        });
    });

    describe('Options Getter', () => {
        let fixture: ComponentFixture<TestAdvancedConfigComponent>;
        let directive: AnimateOnScroll;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestAdvancedConfigComponent);
            fixture.detectChanges();

            directive = fixture.debugElement.query(By.directive(AnimateOnScroll)).injector.get(AnimateOnScroll);
        });

        it('should return correct options object', () => {
            const options = directive.options;

            expect(options.threshold).toBe(0.8);
            expect(options.rootMargin).toBe('10px');
            expect(options.root).toBeUndefined();
        });
    });
});
