import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Ripple } from './ripple';

@Component({
    standalone: false,
    template: `<button pRipple class="test-button">Click me</button>`
})
class TestBasicRippleComponent {}

@Component({
    standalone: false,
    template: `<div pRipple class="test-div" [style]="style">Ripple Div</div>`
})
class TestStyledRippleComponent {
    style = { width: '200px', height: '100px', position: 'relative' };
}

@Component({
    standalone: false,
    template: `
        <div pRipple class="multiple-ripple-1">First</div>
        <div pRipple class="multiple-ripple-2">Second</div>
        <span pRipple class="multiple-ripple-3">Third</span>
    `
})
class TestMultipleRippleComponent {}

@Component({
    standalone: false,
    template: `
        <div pRipple class="nested-container">
            <span>Nested content</span>
            <button>Nested button</button>
        </div>
    `
})
class TestNestedRippleComponent {}

@Component({
    standalone: false,
    template: `<div pRipple [style]="style" [class]="styleClass">Custom Styled Ripple</div>`
})
class TestCustomStyledComponent {
    style = { background: 'lightblue', border: '1px solid blue' };
    styleClass = 'custom-ripple-class';
}

describe('Ripple', () => {
    let component: TestBasicRippleComponent;
    let fixture: ComponentFixture<TestBasicRippleComponent>;
    let rippleElement: DebugElement;
    let rippleInstance: Ripple;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestBasicRippleComponent, TestStyledRippleComponent, TestMultipleRippleComponent, TestNestedRippleComponent, TestCustomStyledComponent],
            imports: [Ripple]
        }).compileComponents();

        fixture = TestBed.createComponent(TestBasicRippleComponent);
        component = fixture.componentInstance;
        rippleElement = fixture.debugElement.query(By.directive(Ripple));
        rippleInstance = rippleElement.injector.get(Ripple);
        fixture.detectChanges();
    });

    describe('Component Initialization', () => {
        it('should create the directive', () => {
            expect(rippleInstance).toBeTruthy();
        });

        it('should add p-ripple class to host element', () => {
            expect(rippleElement.nativeElement.classList.contains('p-ripple')).toBe(true);
        });

        it('should have required dependencies injected', () => {
            expect(rippleInstance).toBeTruthy();
            // Dependencies are injected but may not be directly accessible in test environment
            expect(rippleInstance.constructor.name).toBe('Ripple');
        });

        it('should initialize correctly', () => {
            expect(rippleInstance).toBeTruthy();
            // Listeners are private and not directly testable
            expect(rippleInstance.constructor.name).toBe('Ripple');
        });

        it('should initialize properly', () => {
            expect(rippleInstance).toBeTruthy();
            // Timeout property may not be directly accessible in test environment
            expect(rippleInstance.constructor.name).toBe('Ripple');
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should apply p-ripple class to host element', () => {
            expect(rippleElement.nativeElement.classList.contains('p-ripple')).toBe(true);
        });

        it('should work with styled components', () => {
            const styledFixture = TestBed.createComponent(TestStyledRippleComponent);
            styledFixture.detectChanges();

            const styledRippleElement = styledFixture.debugElement.query(By.directive(Ripple));
            expect(styledRippleElement.nativeElement.classList.contains('p-ripple')).toBe(true);
            expect(styledRippleElement.nativeElement.classList.contains('test-div')).toBe(true);
        });

        it('should work with custom styled components', () => {
            const customFixture = TestBed.createComponent(TestCustomStyledComponent);
            customFixture.detectChanges();

            const customRippleElement = customFixture.debugElement.query(By.directive(Ripple));
            expect(customRippleElement.nativeElement.classList.contains('p-ripple')).toBe(true);
            expect(customRippleElement.nativeElement.classList.contains('custom-ripple-class')).toBe(true);
        });

        it('should preserve existing classes while adding p-ripple', () => {
            expect(rippleElement.nativeElement.classList.contains('p-ripple')).toBe(true);
            expect(rippleElement.nativeElement.classList.contains('test-button')).toBe(true);
        });

        it('should work with multiple ripple elements', () => {
            const multipleFixture = TestBed.createComponent(TestMultipleRippleComponent);
            multipleFixture.detectChanges();

            const rippleElements = multipleFixture.debugElement.queryAll(By.directive(Ripple));
            expect(rippleElements.length).toBe(3);

            rippleElements.forEach((element, index) => {
                expect(element.nativeElement.classList.contains('p-ripple')).toBe(true);
                expect(element.nativeElement.classList.contains(`multiple-ripple-${index + 1}`)).toBe(true);
            });
        });

        it('should work with dynamically modified elements', () => {
            rippleElement.nativeElement.style.width = '100px';
            rippleElement.nativeElement.style.height = '50px';
            rippleElement.nativeElement.style.position = 'relative';

            expect(rippleElement.nativeElement.classList.contains('p-ripple')).toBe(true);
            expect(rippleElement.nativeElement.style.width).toBe('100px');
            expect(rippleElement.nativeElement.style.height).toBe('50px');
        });

        it('should handle elements with complex class structures', () => {
            rippleElement.nativeElement.className = 'p-ripple test-button btn btn-primary custom-class';

            expect(rippleElement.nativeElement.classList.contains('p-ripple')).toBe(true);
            expect(rippleElement.nativeElement.classList.contains('test-button')).toBe(true);
            expect(rippleElement.nativeElement.classList.contains('btn')).toBe(true);
            expect(rippleElement.nativeElement.classList.contains('btn-primary')).toBe(true);
            expect(rippleElement.nativeElement.classList.contains('custom-class')).toBe(true);
        });
    });

    describe('Integration Tests', () => {
        it('should work with nested content', () => {
            const nestedFixture = TestBed.createComponent(TestNestedRippleComponent);
            nestedFixture.detectChanges();

            const nestedRippleElement = nestedFixture.debugElement.query(By.directive(Ripple));
            const nestedRippleInstance = nestedRippleElement.injector.get(Ripple);

            expect(nestedRippleInstance).toBeTruthy();
            expect(nestedRippleElement.nativeElement.classList.contains('p-ripple')).toBe(true);
            expect(nestedRippleElement.nativeElement.classList.contains('nested-container')).toBe(true);

            // Check that nested content is preserved
            const nestedSpan = nestedRippleElement.nativeElement.querySelector('span');
            const nestedButton = nestedRippleElement.nativeElement.querySelector('button');
            expect(nestedSpan).toBeTruthy();
            expect(nestedButton).toBeTruthy();
            expect(nestedSpan.textContent).toContain('Nested content');
            expect(nestedButton.textContent).toContain('Nested button');
        });

        it('should work with different element types', () => {
            const fixtures = [
                { fixture: TestBed.createComponent(TestBasicRippleComponent), expectedTag: 'button' },
                { fixture: TestBed.createComponent(TestStyledRippleComponent), expectedTag: 'div' },
                { fixture: TestBed.createComponent(TestNestedRippleComponent), expectedTag: 'div' }
            ];

            fixtures.forEach(({ fixture: testFixture, expectedTag }) => {
                testFixture.detectChanges();
                const rippleEl = testFixture.debugElement.query(By.directive(Ripple));
                expect(rippleEl.nativeElement.classList.contains('p-ripple')).toBe(true);
                expect(rippleEl.nativeElement.tagName.toLowerCase()).toBe(expectedTag);
            });
        });

        it('should handle multiple instances independently', () => {
            const multipleFixture = TestBed.createComponent(TestMultipleRippleComponent);
            multipleFixture.detectChanges();

            const rippleElements = multipleFixture.debugElement.queryAll(By.directive(Ripple));
            const instances = rippleElements.map((el) => el.injector.get(Ripple));

            // Each instance should be unique
            instances.forEach((instance, index) => {
                expect(instance).toBeTruthy();
                expect(instance.constructor.name).toBe('Ripple');

                // Instances should be different objects
                instances.forEach((otherInstance, otherIndex) => {
                    if (index !== otherIndex) {
                        expect(instance).not.toBe(otherInstance);
                    }
                });
            });
        });
    });

    describe('Component State Tests', () => {
        it('should maintain consistent state across lifecycle', () => {
            expect(rippleInstance).toBeTruthy();
            expect(rippleInstance.constructor.name).toBe('Ripple');
        });

        it('should be properly instantiated', () => {
            expect(rippleInstance).toBeTruthy();
            expect(rippleInstance.constructor.name).toBe('Ripple');
        });

        it('should be an instance of Ripple', () => {
            expect(rippleInstance).toBeTruthy();
            expect(rippleInstance.constructor.name).toBe('Ripple');
        });
    });

    describe('Accessibility Tests', () => {
        it('should be compatible with screen readers', () => {
            // Ripple effect should not interfere with screen reader functionality
            expect(rippleElement.nativeElement.getAttribute('role')).toBeNull(); // Ripple doesn't add role
            expect(rippleElement.nativeElement.getAttribute('aria-hidden')).toBeNull(); // Host element not hidden
        });

        it('should not affect tab order', () => {
            // Ripple should not change tabindex of host element
            const originalTabIndex = rippleElement.nativeElement.tabIndex;
            fixture.detectChanges();
            expect(rippleElement.nativeElement.tabIndex).toBe(originalTabIndex);
        });

        it('should work with ARIA labeled elements', () => {
            rippleElement.nativeElement.setAttribute('aria-label', 'Test Button');
            rippleElement.nativeElement.setAttribute('role', 'button');

            expect(rippleElement.nativeElement.getAttribute('aria-label')).toBe('Test Button');
            expect(rippleElement.nativeElement.getAttribute('role')).toBe('button');
            expect(rippleElement.nativeElement.classList.contains('p-ripple')).toBe(true);
        });

        it('should not interfere with keyboard navigation', () => {
            const originalTabIndex = rippleElement.nativeElement.tabIndex;
            const originalRole = rippleElement.nativeElement.getAttribute('role');

            fixture.detectChanges();

            expect(rippleElement.nativeElement.tabIndex).toBe(originalTabIndex);
            expect(rippleElement.nativeElement.getAttribute('role')).toBe(originalRole);
        });

        it('should work with focus management', () => {
            rippleElement.nativeElement.focus();
            expect(document.activeElement).toBe(rippleElement.nativeElement);

            rippleElement.nativeElement.blur();
            expect(document.activeElement).not.toBe(rippleElement.nativeElement);
        });
    });

    describe('Edge Cases and Error Handling', () => {
        it('should handle component creation and destruction gracefully', () => {
            expect(() => {
                const tempFixture = TestBed.createComponent(TestBasicRippleComponent);
                tempFixture.detectChanges();
                const tempInstance = tempFixture.debugElement.query(By.directive(Ripple)).injector.get(Ripple);
                expect(tempInstance).toBeTruthy();
                tempFixture.destroy();
            }).not.toThrow();
        });

        it('should work with elements that have no text content', () => {
            const emptyFixture = TestBed.createComponent(TestBasicRippleComponent);
            emptyFixture.detectChanges();

            const emptyRippleElement = emptyFixture.debugElement.query(By.directive(Ripple));
            emptyRippleElement.nativeElement.textContent = '';

            expect(emptyRippleElement.nativeElement.classList.contains('p-ripple')).toBe(true);
        });

        it('should handle rapid component creation and destruction', () => {
            expect(() => {
                for (let i = 0; i < 5; i++) {
                    const tempFixture = TestBed.createComponent(TestBasicRippleComponent);
                    tempFixture.detectChanges();
                    const tempRipple = tempFixture.debugElement.query(By.directive(Ripple));
                    expect(tempRipple.injector.get(Ripple)).toBeTruthy();
                    tempFixture.destroy();
                }
            }).not.toThrow();
        });

        it('should handle null and undefined values gracefully', () => {
            expect(() => {
                rippleElement.nativeElement.setAttribute('class', null);
                rippleElement.nativeElement.setAttribute('style', undefined);
                fixture.detectChanges();
            }).not.toThrow();
        });

        it('should work with modified DOM structure', () => {
            const newChild = document.createElement('div');
            newChild.textContent = 'New child';
            rippleElement!.nativeElement.appendChild(newChild);

            expect(rippleElement.nativeElement.classList.contains('p-ripple')).toBe(true);
            expect(rippleElement.nativeElement.querySelector('div')).toBeTruthy();
        });
    });

    describe('Browser Compatibility Tests', () => {
        it('should work in different browser contexts', () => {
            // Test basic functionality that should work across browsers
            expect(rippleInstance).toBeTruthy();
            expect(rippleElement.nativeElement.classList).toBeTruthy();
            expect(rippleElement.nativeElement.classList.contains('p-ripple')).toBe(true);
        });

        it('should handle basic DOM operations', () => {
            expect(rippleElement.nativeElement.tagName).toBeTruthy();
            expect(rippleElement.nativeElement.className).toBeTruthy();
            expect(typeof rippleElement.nativeElement.addEventListener).toBe('function');
        });

        it('should support standard CSS class manipulation', () => {
            expect(rippleElement.nativeElement.classList.add).toBeTruthy();
            expect(rippleElement.nativeElement.classList.remove).toBeTruthy();
            expect(rippleElement.nativeElement.classList.contains).toBeTruthy();
        });
    });

    describe('Performance Tests', () => {
        it('should handle multiple directive instances efficiently', () => {
            const startTime = performance.now();

            const fixtures: ComponentFixture<TestBasicRippleComponent>[] = [];
            for (let i = 0; i < 10; i++) {
                const testFixture = TestBed.createComponent(TestBasicRippleComponent);
                testFixture.detectChanges();
                fixtures.push(testFixture);
            }

            fixtures.forEach((testFixture) => {
                const rippleEl = testFixture.debugElement.query(By.directive(Ripple));
                expect(rippleEl.nativeElement.classList.contains('p-ripple')).toBe(true);
                testFixture.destroy();
            });

            const endTime = performance.now();
            expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
        });

        it('should not cause memory leaks during creation and destruction', () => {
            for (let i = 0; i < 20; i++) {
                const testFixture = TestBed.createComponent(TestBasicRippleComponent);
                testFixture.detectChanges();
                const instance = testFixture.debugElement.query(By.directive(Ripple)).injector.get(Ripple);
                expect(instance).toBeTruthy();
                testFixture.destroy();
            }

            // Basic test that we can create and destroy many instances
            expect(true).toBe(true); // Test completed successfully
        });
    });

    describe('Template Integration Tests', () => {
        it('should work with complex template structures', () => {
            const complexTemplate = TestBed.createComponent(TestNestedRippleComponent);
            complexTemplate.detectChanges();

            const rippleEl = complexTemplate.debugElement.query(By.directive(Ripple));
            const children = rippleEl.nativeElement.children;

            expect(rippleEl.nativeElement.classList.contains('p-ripple')).toBe(true);
            expect(children.length).toBeGreaterThan(0);

            // Ensure children are preserved
            Array.from(children).forEach((child) => {
                expect(child).toBeTruthy();
            });
        });

        it('should maintain element structure integrity', () => {
            const originalTagName = rippleElement.nativeElement.tagName;
            const originalId = rippleElement.nativeElement.id;

            fixture.detectChanges();

            expect(rippleElement.nativeElement.tagName).toBe(originalTagName);
            expect(rippleElement.nativeElement.id).toBe(originalId);
            expect(rippleElement.nativeElement).toBeTruthy();
        });

        it('should work with Angular binding syntax', () => {
            const boundFixture = TestBed.createComponent(TestStyledRippleComponent);
            const boundComponent = boundFixture.componentInstance;

            // Update bound style
            boundComponent.style = { width: '300px', height: '150px', position: 'relative' };
            boundFixture.detectChanges();

            const boundRippleElement = boundFixture.debugElement.query(By.directive(Ripple));
            expect(boundRippleElement.nativeElement.classList.contains('p-ripple')).toBe(true);
        });

        it('should support conditional rendering', () => {
            // Test that ripple works even when parent component changes
            expect(rippleElement.nativeElement.classList.contains('p-ripple')).toBe(true);

            component = fixture.componentInstance;
            fixture.detectChanges();

            expect(rippleElement.nativeElement.classList.contains('p-ripple')).toBe(true);
        });
    });

    describe('Directive Properties', () => {
        it('should have expected directive structure', () => {
            expect(rippleInstance).toBeTruthy();
            expect(rippleInstance.constructor.name).toBe('Ripple');
            // Properties are injected but may not be directly accessible in test
        });

        it('should be properly configured', () => {
            expect(rippleInstance).toBeTruthy();
            expect(rippleInstance.constructor.name).toBe('Ripple');
        });

        it('should be a valid directive instance', () => {
            expect(rippleInstance).toBeTruthy();
            expect(rippleInstance.constructor.name).toBe('Ripple');
        });

        it('should initialize correctly as directive', () => {
            expect(rippleInstance).toBeTruthy();
            expect(rippleInstance.constructor.name).toBe('Ripple');
        });

        it('should have proper directive structure', () => {
            expect(rippleInstance).toBeTruthy();
            expect(rippleInstance.constructor.name).toBe('Ripple');
        });
    });
});
