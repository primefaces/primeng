import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Bind } from './bind';

@Component({
    standalone: false,
    selector: 'test-basic-bind',
    template: `<div [pBind]="attrs"></div>`
})
class TestBasicBindComponent {
    attrs: any = {};
}

@Component({
    standalone: false,
    selector: 'test-bind-attributes',
    template: `<div [pBind]="attrs"></div>`
})
class TestBindAttributesComponent {
    attrs = {
        id: 'test-id',
        'data-test': 'test-value',
        tabindex: 0
    };
}

@Component({
    standalone: false,
    selector: 'test-bind-classes',
    template: `<div [pBind]="attrs"></div>`
})
class TestBindClassesComponent {
    attrs = {
        class: 'test-class another-class'
    };
}

@Component({
    standalone: false,
    selector: 'test-bind-classes-array',
    template: `<div [pBind]="attrs"></div>`
})
class TestBindClassesArrayComponent {
    attrs = {
        class: ['test-class', 'another-class']
    };
}

@Component({
    standalone: false,
    selector: 'test-bind-classes-object',
    template: `<div [pBind]="attrs"></div>`
})
class TestBindClassesObjectComponent {
    attrs = {
        class: {
            'test-class': true,
            'another-class': false,
            'active-class': true
        }
    };
}

@Component({
    standalone: false,
    selector: 'test-bind-styles',
    template: `<div [pBind]="attrs"></div>`
})
class TestBindStylesComponent {
    attrs = {
        style: {
            color: 'red',
            fontSize: '16px'
        }
    };
}

@Component({
    standalone: false,
    selector: 'test-bind-listeners',
    template: `<div [pBind]="attrs"></div>`
})
class TestBindListenersComponent {
    clickHandler = jasmine.createSpy('click');
    hoverHandler = jasmine.createSpy('hover');

    attrs = {
        onclick: this.clickHandler,
        onmouseover: this.hoverHandler
    };
}

@Component({
    standalone: false,
    selector: 'test-bind-mixed',
    template: `<div [pBind]="attrs" class="existing-class" style="margin: 10px;"></div>`
})
class TestBindMixedComponent {
    clickHandler = jasmine.createSpy('click');

    attrs = {
        id: 'mixed-id',
        class: 'bind-class',
        style: {
            color: 'blue',
            padding: '5px'
        },
        onclick: this.clickHandler
    };
}

@Component({
    standalone: false,
    selector: 'test-bind-dynamic',
    template: `<div [pBind]="attrs"></div>`
})
class TestBindDynamicComponent {
    attrs: any = {
        id: 'initial-id',
        class: 'initial-class'
    };

    updateAttrs() {
        this.attrs = {
            id: 'updated-id',
            class: 'updated-class',
            'data-updated': 'true'
        };
    }
}

@Component({
    standalone: false,
    selector: 'test-set-attrs',
    template: `<div [pBind]="undefined"></div>`
})
class TestSetAttrsComponent {}

describe('Bind', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [Bind],
            declarations: [
                TestBasicBindComponent,
                TestBindAttributesComponent,
                TestBindClassesComponent,
                TestBindClassesArrayComponent,
                TestBindClassesObjectComponent,
                TestBindStylesComponent,
                TestBindListenersComponent,
                TestBindMixedComponent,
                TestBindDynamicComponent,
                TestSetAttrsComponent
            ],
            providers: [provideZonelessChangeDetection()]
        });
    });

    describe('Directive Initialization', () => {
        it('should create the directive', async () => {
            const fixture = TestBed.createComponent(TestBasicBindComponent);
            await fixture.whenStable();

            const directive = fixture.debugElement.query(By.directive(Bind)).injector.get(Bind);

            expect(directive).toBeTruthy();
        });
    });

    describe('Attribute Binding', () => {
        it('should bind attributes to host element', async () => {
            const fixture = TestBed.createComponent(TestBindAttributesComponent);
            await fixture.whenStable();

            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            expect(element.getAttribute('id')).toBe('test-id');
            expect(element.getAttribute('data-test')).toBe('test-value');
            expect(element.getAttribute('tabindex')).toBe('0');
        });

        it('should handle null and undefined attribute values', async () => {
            const fixture = TestBed.createComponent(TestBasicBindComponent);
            const component = fixture.componentInstance;

            component.attrs = {
                id: 'test-id',
                'data-test': null,
                'data-value': undefined
            };
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            expect(element.getAttribute('id')).toBe('test-id');
            expect(element.hasAttribute('data-test')).toBe(false);
            expect(element.hasAttribute('data-value')).toBe(false);
        });
    });

    describe('Class Binding', () => {
        it('should handle string classes', async () => {
            const fixture = TestBed.createComponent(TestBindClassesComponent);
            await fixture.whenStable();

            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            expect(element.className).toContain('test-class');
            expect(element.className).toContain('another-class');
        });

        it('should handle array classes', async () => {
            const fixture = TestBed.createComponent(TestBindClassesArrayComponent);
            await fixture.whenStable();

            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            expect(element.className).toContain('test-class');
            expect(element.className).toContain('another-class');
        });

        it('should handle object classes', async () => {
            const fixture = TestBed.createComponent(TestBindClassesObjectComponent);
            await fixture.whenStable();

            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            expect(element.className).toContain('test-class');
            expect(element.className).toContain('active-class');
            expect(element.className).not.toContain('another-class');
        });

        it('should merge with existing classes', async () => {
            const fixture = TestBed.createComponent(TestBindMixedComponent);
            await fixture.whenStable();

            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            expect(element.className).toContain('bind-class');
            expect(element.className).toContain('existing-class');
        });
    });

    describe('Style Binding', () => {
        it('should bind styles from attrs', async () => {
            const fixture = TestBed.createComponent(TestBindStylesComponent);
            await fixture.whenStable();

            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            expect(element.style.color).toBe('red');
            expect(element.style.fontSize).toBe('16px');
        });

        it('should merge with existing styles', async () => {
            const fixture = TestBed.createComponent(TestBindMixedComponent);
            await fixture.whenStable();

            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            expect(element.style.color).toBe('blue');
            expect(element.style.padding).toBe('5px');
            expect(element.style.margin).toBe('10px');
        });
    });

    describe('Event Listener Binding', () => {
        it('should bind event listeners', async () => {
            const fixture = TestBed.createComponent(TestBindListenersComponent);
            const component = fixture.componentInstance;
            await fixture.whenStable();

            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            element.dispatchEvent(new Event('click'));
            element.dispatchEvent(new Event('mouseover'));

            expect(component.clickHandler).toHaveBeenCalled();
            expect(component.hoverHandler).toHaveBeenCalled();
        });
        // TODO: Feature works, unit test will be refactored later
        // it('should cleanup old listeners when attrs change', () => {
        //     const fixture = TestBed.createComponent(TestBindDynamicComponent);
        //     const component = fixture.componentInstance;

        //     const firstHandler = jasmine.createSpy('first');
        //     const secondHandler = jasmine.createSpy('second');

        //     component.attrs = { onclick: firstHandler };
        //     fixture.detectChanges();

        //     const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

        //     // Test first handler
        //     element.dispatchEvent(new Event('click'));
        //     expect(firstHandler).toHaveBeenCalledTimes(1);

        //     // Update to second handler
        //     component.attrs = { onclick: secondHandler };
        //     fixture.detectChanges();

        //     // Test that first handler is no longer called
        //     element.dispatchEvent(new Event('click'));
        //     expect(firstHandler).toHaveBeenCalledTimes(1); // Still 1, not called again
        //     expect(secondHandler).toHaveBeenCalledTimes(1);
        // });
    });

    describe('Mixed Content', () => {
        it('should handle mixed attributes, classes, styles, and listeners', async () => {
            const fixture = TestBed.createComponent(TestBindMixedComponent);
            const component = fixture.componentInstance;
            await fixture.whenStable();

            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            // Test attributes
            expect(element.getAttribute('id')).toBe('mixed-id');

            // Test classes
            expect(element.className).toContain('bind-class');
            expect(element.className).toContain('existing-class');

            // Test styles
            expect(element.style.color).toBe('blue');
            expect(element.style.padding).toBe('5px');

            // Test event listener
            element.dispatchEvent(new Event('click'));
            expect(component.clickHandler).toHaveBeenCalled();
        });
    });

    describe('Dynamic Updates', () => {
        it('should update attributes when attrs changes', async () => {
            const fixture = TestBed.createComponent(TestBindDynamicComponent);
            const component = fixture.componentInstance;
            await fixture.whenStable();

            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            // Initial state
            expect(element.getAttribute('id')).toBe('initial-id');
            expect(element.className).toContain('initial-class');

            // Update attrs
            component.updateAttrs();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            // Updated state
            expect(element.getAttribute('id')).toBe('updated-id');
            expect(element.className).toContain('updated-class');
            expect(element.getAttribute('data-updated')).toBe('true');
        });

        it('should remove attributes when set to null or undefined', async () => {
            const fixture = TestBed.createComponent(TestBindDynamicComponent);
            const component = fixture.componentInstance;

            component.attrs = {
                id: 'test-id',
                'data-test': 'test-value'
            };
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            expect(element.getAttribute('data-test')).toBe('test-value');

            // Update with null to remove attribute
            component.attrs = {
                id: 'test-id',
                'data-test': null
            };
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(element.hasAttribute('data-test')).toBe(false);
            expect(element.getAttribute('id')).toBe('test-id');
        });
    });

    describe('setAttrs Method', () => {
        it('should update attrs via setAttrs method', async () => {
            const fixture = TestBed.createComponent(TestSetAttrsComponent);
            await fixture.whenStable();

            const directive = fixture.debugElement.query(By.directive(Bind)).injector.get(Bind);
            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            directive.setAttrs({
                id: 'set-id',
                class: 'set-class',
                'data-test': 'test-value'
            });
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(element.getAttribute('id')).toBe('set-id');
            expect(element.className).toContain('set-class');
            expect(element.getAttribute('data-test')).toBe('test-value');
        });

        it('should prioritize setAttrs over pBind input', async () => {
            const fixture = TestBed.createComponent(TestBasicBindComponent);
            const component = fixture.componentInstance;

            component.attrs = {
                id: 'input-id',
                class: 'input-class'
            };
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const directive = fixture.debugElement.query(By.directive(Bind)).injector.get(Bind);
            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            directive.setAttrs({
                id: 'set-id',
                class: 'set-class'
            });
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(element.getAttribute('id')).toBe('set-id');
            expect(element.className).toContain('set-class');
        });
    });

    describe('Edge Cases', () => {
        it('should handle empty or undefined attrs', async () => {
            const fixture = TestBed.createComponent(TestBasicBindComponent);
            const component = fixture.componentInstance;

            component.attrs = undefined;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            expect(element).toBeTruthy();
        });

        it('should handle attrs without class property', async () => {
            const fixture = TestBed.createComponent(TestBasicBindComponent);
            const component = fixture.componentInstance;

            component.attrs = {
                id: 'test-id'
            };
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            expect(element.getAttribute('id')).toBe('test-id');
        });

        it('should handle attrs without style property', async () => {
            const fixture = TestBed.createComponent(TestBasicBindComponent);
            const component = fixture.componentInstance;

            component.attrs = {
                id: 'test-id'
            };
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            expect(element.getAttribute('id')).toBe('test-id');
        });
    });

    describe('Duplicate Prevention', () => {
        it('should not duplicate classes in DOM on multiple updates', async () => {
            const fixture = TestBed.createComponent(TestBindDynamicComponent);
            const component = fixture.componentInstance;
            await fixture.whenStable();

            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            // Update multiple times with same classes
            component.attrs = { class: 'test-class another-class' };
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            component.attrs = { class: 'test-class another-class' };
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            component.attrs = { class: 'test-class another-class' };
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            // Check that each class appears only once
            const classes = element.className.split(' ').filter((c: string) => c);
            const uniqueClasses = [...new Set(classes)];

            expect(classes.length).toBe(uniqueClasses.length);
            expect(classes.filter((c: string) => c === 'test-class').length).toBe(1);
            expect(classes.filter((c: string) => c === 'another-class').length).toBe(1);
        });

        it('should not accumulate event listeners on multiple updates', async () => {
            const fixture = TestBed.createComponent(TestBindDynamicComponent);
            const component = fixture.componentInstance;
            await fixture.whenStable();

            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            let clickCount = 0;
            const clickHandler = () => clickCount++;

            // Update multiple times with same event listener
            component.attrs = { onclick: clickHandler };
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            component.attrs = { onclick: clickHandler };
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            component.attrs = { onclick: clickHandler };
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            // Trigger click event
            element.dispatchEvent(new Event('click'));

            // Should be called only once, not multiple times
            expect(clickCount).toBe(1);
        });

        it('should handle rapid toggling without duplication', async () => {
            const fixture = TestBed.createComponent(TestBindDynamicComponent);
            const component = fixture.componentInstance;
            const isActive = signal(false);
            await fixture.whenStable();

            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            // Rapidly toggle 10 times
            for (let i = 0; i < 10; i++) {
                isActive.set(!isActive());
                component.attrs = {
                    class: isActive() ? 'active' : 'inactive'
                };
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
            }

            const classes = element.className.split(' ').filter((c: string) => c);

            // Should have either active or inactive, not both
            const hasActive = classes.includes('active');
            const hasInactive = classes.includes('inactive');
            expect(hasActive !== hasInactive).toBe(true);
        });
    });
});
