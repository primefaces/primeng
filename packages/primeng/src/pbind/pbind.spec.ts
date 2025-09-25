import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Bind } from './pbind';

@Component({
    standalone: false,
    selector: 'test-basic-bind',
    template: `<div [pBind]="attrs"></div>`
})
class TestBasicBindComponent {
    attrs = {};
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
    attrs = {
        onclick: () => console.log('clicked'),
        onmouseover: () => console.log('hovered')
    };
}

@Component({
    standalone: false,
    selector: 'test-bind-mixed',
    template: `<div [pBind]="attrs" class="existing-class" style="margin: 10px;"></div>`
})
class TestBindMixedComponent {
    attrs = {
        id: 'mixed-id',
        class: 'bind-class',
        style: {
            color: 'blue',
            padding: '5px'
        },
        onclick: () => console.log('mixed clicked')
    };
}

@Component({
    standalone: false,
    selector: 'test-bind-dynamic',
    template: `<div [pBind]="attrs"></div>`
})
class TestBindDynamicComponent {
    attrs = {
        id: 'initial-id',
        class: 'initial-class'
    };

    updateAttrs() {
        this.attrs = {
            id: 'updated-id',
            class: 'updated-class',
            'data-updated': 'true'
        } as any;
    }
}

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
                TestBindDynamicComponent
            ]
        });
    });

    describe('Directive Initialization', () => {
        let fixture: ComponentFixture<TestBasicBindComponent>;
        let directive: Bind;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicBindComponent);
            fixture.detectChanges();

            const directiveDebugElement = fixture.debugElement.query(By.directive(Bind));
            directive = directiveDebugElement.injector.get(Bind);
            element = directiveDebugElement.nativeElement;
        });

        it('should create the directive', () => {
            expect(directive).toBeTruthy();
        });

        it('should inject host element reference', () => {
            expect(directive.host).toBeDefined();
            expect(directive.host).toBe(element);
        });

        it('should initialize with empty attrs', () => {
            expect(directive.attrs).toEqual({});
        });
    });

    describe('Attribute Binding', () => {
        it('should bind attributes to host element', () => {
            const fixture = TestBed.createComponent(TestBindAttributesComponent);
            fixture.detectChanges();

            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            expect(element.getAttribute('id')).toBe('test-id');
            expect(element.getAttribute('data-test')).toBe('test-value');
            expect(element.getAttribute('tabindex')).toBe('0');
        });

        it('should exclude class, style, and event listeners from attributes', () => {
            const fixture = TestBed.createComponent(TestBindMixedComponent);
            const directive = fixture.debugElement.query(By.directive(Bind)).injector.get(Bind);

            const attrs = directive.attributes();

            expect(attrs.id).toBe('mixed-id');
            expect(attrs.class).toBeUndefined();
            expect(attrs.style).toBeUndefined();
            expect(attrs.onclick).toBeUndefined();
        });
    });

    describe('Class Binding', () => {
        it('should handle string classes', () => {
            const fixture = TestBed.createComponent(TestBindClassesComponent);
            fixture.detectChanges();

            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            expect(element.className).toContain('test-class');
            expect(element.className).toContain('another-class');
        });

        it('should handle array classes', () => {
            const fixture = TestBed.createComponent(TestBindClassesArrayComponent);
            fixture.detectChanges();

            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            expect(element.className).toContain('test-class');
            expect(element.className).toContain('another-class');
        });

        it('should handle object classes', () => {
            const fixture = TestBed.createComponent(TestBindClassesObjectComponent);
            fixture.detectChanges();

            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            expect(element.className).toContain('test-class');
            expect(element.className).toContain('active-class');
            expect(element.className).not.toContain('another-class');
        });

        it('should return unique classes only', () => {
            const fixture = TestBed.createComponent(TestBindClassesComponent);
            const directive = fixture.debugElement.query(By.directive(Bind)).injector.get(Bind);

            directive.attrs = {
                class: 'test-class test-class duplicate-class'
            };

            const classes = directive.classes();
            const classArray = classes.split(' ');
            const uniqueClasses = classArray.filter((cls: string) => cls === 'test-class');

            expect(uniqueClasses.length).toBe(1);
        });
    });

    describe('Style Binding', () => {
        it('should merge existing styles with bind styles', () => {
            const fixture = TestBed.createComponent(TestBindStylesComponent);
            const directive = fixture.debugElement.query(By.directive(Bind)).injector.get(Bind);
            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            // Set existing style
            element.style.margin = '10px';

            directive.attrs = {
                style: {
                    color: 'red',
                    fontSize: '16px'
                }
            };

            const styles = directive.styles();

            expect(styles.color).toBe('red');
            expect(styles.fontSize).toBe('16px');
            expect(styles.margin).toBe('10px');
        });

        it('should override existing styles with bind styles', () => {
            const fixture = TestBed.createComponent(TestBindStylesComponent);
            const directive = fixture.debugElement.query(By.directive(Bind)).injector.get(Bind);
            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            // Set existing style
            element.style.color = 'blue';

            directive.attrs = {
                style: {
                    color: 'red'
                }
            };

            const styles = directive.styles();

            expect(styles.color).toBe('red');
        });
    });

    describe('Event Listener Binding', () => {
        it('should bind event listeners', () => {
            const fixture = TestBed.createComponent(TestBindListenersComponent);
            const directive = fixture.debugElement.query(By.directive(Bind)).injector.get(Bind);

            const listeners = directive.listeners();

            expect(typeof listeners.onclick).toBe('function');
            expect(typeof listeners.onmouseover).toBe('function');
        });

        it('should filter only event listeners starting with "on"', () => {
            const fixture = TestBed.createComponent(TestBasicBindComponent);
            const component = fixture.componentInstance;
            const directive = fixture.debugElement.query(By.directive(Bind)).injector.get(Bind);

            component.attrs = {
                onclick: () => {},
                onmouseover: () => {},
                id: 'test-id',
                class: 'test-class'
            };

            const listeners = directive.listeners();

            expect(listeners.onclick).toBeDefined();
            expect(listeners.onmouseover).toBeDefined();
            expect(listeners.id).toBeUndefined();
            expect(listeners.class).toBeUndefined();
        });
    });

    describe('Mixed Content', () => {
        it('should handle mixed attributes, classes, styles, and listeners', () => {
            const fixture = TestBed.createComponent(TestBindMixedComponent);
            fixture.detectChanges();

            const directive = fixture.debugElement.query(By.directive(Bind)).injector.get(Bind);
            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            // Test attributes
            expect(element.getAttribute('id')).toBe('mixed-id');

            // Test classes
            expect(element.className).toContain('bind-class');
            expect(element.className).toContain('existing-class');

            // Test all method
            const all = directive.all();
            expect((all as any).id).toBe('mixed-id');
            expect((all as any).style).toBeDefined();
            expect((all as any).onclick).toBeDefined();
        });
    });

    describe('Dynamic Updates', () => {
        it('should update attributes when attrs changes', () => {
            const fixture = TestBed.createComponent(TestBindDynamicComponent);
            const component = fixture.componentInstance;
            fixture.detectChanges();

            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            // Initial state
            expect(element.getAttribute('id')).toBe('initial-id');
            expect(element.className).toContain('initial-class');

            // Update attrs
            component.updateAttrs();
            fixture.detectChanges();

            // Updated state
            expect(element.getAttribute('id')).toBe('updated-id');
            expect(element.className).toContain('updated-class');
            expect(element.getAttribute('data-updated')).toBe('true');
        });

        it('should call bind when attrs changes', () => {
            const fixture = TestBed.createComponent(TestBindDynamicComponent);
            const component = fixture.componentInstance;
            const directive = fixture.debugElement.query(By.directive(Bind)).injector.get(Bind);

            spyOn(directive, 'bind');

            // Update attrs to trigger ngOnChanges
            component.updateAttrs();
            fixture.detectChanges();

            expect(directive.bind).toHaveBeenCalled();
        });
    });

    describe('Edge Cases', () => {
        it('should handle empty or undefined attrs', () => {
            const fixture = TestBed.createComponent(TestBasicBindComponent);
            const directive = fixture.debugElement.query(By.directive(Bind)).injector.get(Bind);

            directive.attrs = {} as any;

            expect(() => {
                directive.classes();
                directive.attributes();
                directive.styles();
                directive.listeners();
            }).not.toThrow();
        });

        it('should handle attrs without class property', () => {
            const fixture = TestBed.createComponent(TestBasicBindComponent);
            const directive = fixture.debugElement.query(By.directive(Bind)).injector.get(Bind);

            directive.attrs = {
                id: 'test-id'
            };

            const classes = directive.classes();

            expect(classes).toEqual('');
        });

        it('should handle attrs without style property', () => {
            const fixture = TestBed.createComponent(TestBasicBindComponent);
            const directive = fixture.debugElement.query(By.directive(Bind)).injector.get(Bind);

            directive.attrs = {
                id: 'test-id'
            };

            const styles = directive.styles();

            expect(styles).toBeDefined();
            expect(styles.id).toBeUndefined();
        });

        it('should handle element without existing attributes', () => {
            const fixture = TestBed.createComponent(TestBasicBindComponent);
            const directive = fixture.debugElement.query(By.directive(Bind)).injector.get(Bind);

            const attrs = directive.attributes();

            expect(attrs).toBeDefined();
            expect(typeof attrs).toBe('object');
        });
    });

    describe('Integration with DomHandler', () => {
        it('should call DomHandler.setAttributes with correct parameters', () => {
            const fixture = TestBed.createComponent(TestBindAttributesComponent);
            const directive = fixture.debugElement.query(By.directive(Bind)).injector.get(Bind);

            spyOn(directive, 'all').and.returnValue({
                id: 'test-id',
                'data-test': 'test-value',
                style: { color: 'red' }
            });

            // Mock DomHandler.setAttributes
            const originalSetAttributes = (window as any).DomHandler?.setAttributes;
            (window as any).DomHandler = {
                setAttributes: jasmine.createSpy('setAttributes')
            };

            directive.bind();

            expect((window as any).DomHandler.setAttributes).toHaveBeenCalledWith(directive.host, {
                id: 'test-id',
                'data-test': 'test-value',
                style: { color: 'red' }
            });

            // Restore original
            if (originalSetAttributes) {
                (window as any).DomHandler.setAttributes = originalSetAttributes;
            }
        });
    });

    describe('Host Class Binding', () => {
        it('should bind classes through host property', () => {
            const fixture = TestBed.createComponent(TestBindClassesComponent);
            fixture.detectChanges();

            const element = fixture.debugElement.query(By.directive(Bind)).nativeElement;

            expect(element.className).toContain('test-class');
            expect(element.className).toContain('another-class');
        });

        it('should handle empty classes array', () => {
            const fixture = TestBed.createComponent(TestBasicBindComponent);
            const directive = fixture.debugElement.query(By.directive(Bind)).injector.get(Bind);

            directive.attrs = {};

            const classes = directive.classes();

            expect(classes).toEqual('');
        });
    });
});
