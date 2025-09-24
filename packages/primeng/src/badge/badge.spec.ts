import { Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'primeng/api';
import { Badge, BadgeDirective, BadgeModule } from './badge';

@Component({
    standalone: false,
    selector: 'test-basic-badge',
    template: `<p-badge></p-badge>`
})
class TestBasicBadgeComponent {}

@Component({
    standalone: false,
    selector: 'test-value-badge',
    template: `<p-badge [value]="value"></p-badge>`
})
class TestValueBadgeComponent {
    value: string | number | null = '2';
}

@Component({
    standalone: false,
    selector: 'test-size-badge',
    template: `<p-badge [badgeSize]="badgeSize" value="1"></p-badge>`
})
class TestSizeBadgeComponent {
    badgeSize: 'small' | 'large' | 'xlarge' | null = null as any;
}

@Component({
    standalone: false,
    selector: 'test-severity-badge',
    template: `<p-badge [severity]="severity" value="1"></p-badge>`
})
class TestSeverityBadgeComponent {
    severity: 'secondary' | 'info' | 'success' | 'warn' | 'danger' | 'contrast' | null = null as any;
}

@Component({
    standalone: false,
    selector: 'test-disabled-badge',
    template: `<p-badge [badgeDisabled]="disabled" value="1"></p-badge>`
})
class TestDisabledBadgeComponent {
    disabled = false;
}

@Component({
    standalone: false,
    selector: 'test-style-class-badge',
    template: `<p-badge [styleClass]="styleClass" value="1"></p-badge>`
})
class TestStyleClassBadgeComponent {
    styleClass = 'custom-badge';
}

@Component({
    standalone: false,
    selector: 'test-directive-badge',
    template: `<button #button pBadge [value]="value">Button</button>`
})
class TestDirectiveBadgeComponent {
    @ViewChild('button', { static: true }) button!: ElementRef;
    value: string | number | undefined = '5';
}

@Component({
    standalone: false,
    selector: 'test-directive-size-badge',
    template: `<button pBadge [value]="value" [size]="size">Button</button>`
})
class TestDirectiveSizeBadgeComponent {
    value: string | number = '1';
    size: 'large' | 'xlarge' | 'small' | null | undefined;
}

@Component({
    standalone: false,
    selector: 'test-directive-severity-badge',
    template: `<button pBadge [value]="value" [severity]="severity">Button</button>`
})
class TestDirectiveSeverityBadgeComponent {
    value: string | number = '1';
    severity: 'secondary' | 'info' | 'success' | 'warn' | 'danger' | 'contrast' | null | undefined;
}

@Component({
    standalone: false,
    selector: 'test-directive-disabled-badge',
    template: `<button pBadge [value]="value" [badgeDisabled]="disabled">Button</button>`
})
class TestDirectiveDisabledBadgeComponent {
    value: string | number = '1';
    disabled = false;
}

@Component({
    standalone: false,
    selector: 'test-directive-style-badge',
    template: `<button pBadge [value]="value" [badgeStyle]="badgeStyle" [badgeStyleClass]="badgeStyleClass">Button</button>`
})
class TestDirectiveStyleBadgeComponent {
    value: string | number = '1';
    badgeStyle: { [key: string]: any } | null = null as any;
    badgeStyleClass = '';
}

@Component({
    standalone: false,
    selector: 'test-deprecated-size-badge',
    template: `<button pBadge [value]="value" [size]="size">Button</button>`
})
class TestDeprecatedSizeBadgeComponent {
    value: string | number = '1';
    size: 'large' | 'xlarge' | 'small' | null | undefined;
}

@Component({
    standalone: false,
    selector: 'test-dynamic-badge',
    template: ` <p-badge [value]="value" [badgeSize]="badgeSize" [severity]="severity" [badgeDisabled]="disabled" [styleClass]="styleClass"> </p-badge> `
})
class TestDynamicBadgeComponent {
    value: string | number | null = '1';
    badgeSize: 'small' | 'large' | 'xlarge' | null = null as any;
    severity: 'secondary' | 'info' | 'success' | 'warn' | 'danger' | 'contrast' | null = null as any;
    disabled = false;
    styleClass = '';
}

describe('Badge', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BadgeModule, SharedModule, NoopAnimationsModule],
            declarations: [
                TestBasicBadgeComponent,
                TestValueBadgeComponent,
                TestSizeBadgeComponent,
                TestSeverityBadgeComponent,
                TestDisabledBadgeComponent,
                TestStyleClassBadgeComponent,
                TestDirectiveBadgeComponent,
                TestDirectiveSizeBadgeComponent,
                TestDirectiveSeverityBadgeComponent,
                TestDirectiveDisabledBadgeComponent,
                TestDirectiveStyleBadgeComponent,
                TestDeprecatedSizeBadgeComponent,
                TestDynamicBadgeComponent
            ]
        });
    });

    describe('Badge Component', () => {
        describe('Component Initialization', () => {
            let fixture: ComponentFixture<TestBasicBadgeComponent>;
            let component: Badge;
            let element: HTMLElement;

            beforeEach(() => {
                fixture = TestBed.createComponent(TestBasicBadgeComponent);
                fixture.detectChanges();

                const badgeDebugElement = fixture.debugElement.query(By.directive(Badge));
                component = badgeDebugElement.componentInstance;
                element = badgeDebugElement.nativeElement;
            });

            it('should create the component', () => {
                expect(component).toBeTruthy();
            });

            it('should have default values', () => {
                expect(component.value()).toBeUndefined();
                expect(component.badgeSize()).toBeUndefined();
                expect(component.size()).toBeUndefined();
                expect(component.severity()).toBeUndefined();
                expect(component.badgeDisabled()).toBe(false);
                expect(component.styleClass()).toBeUndefined();
            });

            it('should apply base CSS classes', () => {
                expect(element.classList.contains('p-badge')).toBe(true);
                expect(element.classList.contains('p-component')).toBe(true);
            });

            it('should display empty value by default', () => {
                expect(element.textContent?.trim()).toBe('' as any);
            });

            it('should apply dot class when value is empty', () => {
                expect(element.classList.contains('p-badge-dot')).toBe(true);
            });
        });

        describe('Value Display', () => {
            let fixture: ComponentFixture<TestValueBadgeComponent>;
            let component: TestValueBadgeComponent;
            let element: HTMLElement;

            beforeEach(() => {
                fixture = TestBed.createComponent(TestValueBadgeComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();

                element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
            });

            it('should display string value', () => {
                expect(element.textContent?.trim()).toBe('2');
            });

            it('should display numeric value', () => {
                component.value = 10;
                fixture.detectChanges();

                expect(element.textContent?.trim()).toBe('10');
            });

            it('should apply circle class for single character', () => {
                component.value = '1';
                fixture.detectChanges();

                expect(element.classList.contains('p-badge-circle')).toBe(true);
                expect(element.classList.contains('p-badge-dot')).toBe(false);
            });

            it('should not apply circle class for multiple characters', () => {
                component.value = '10';
                fixture.detectChanges();

                expect(element.classList.contains('p-badge-circle')).toBe(false);
                expect(element.classList.contains('p-badge-dot')).toBe(false);
            });

            it('should apply dot class when value is null', () => {
                component.value = null as any;
                fixture.detectChanges();

                expect(element.classList.contains('p-badge-dot')).toBe(true);
                expect(element.classList.contains('p-badge-circle')).toBe(false);
                expect(element.textContent?.trim()).toBe('' as any);
            });

            it('should handle zero value', () => {
                component.value = 0;
                fixture.detectChanges();

                expect(element.textContent?.trim()).toBe('0');
                expect(element.classList.contains('p-badge-circle')).toBe(true);
            });

            it('should handle empty string', () => {
                component.value = '';
                fixture.detectChanges();

                expect(element.textContent?.trim()).toBe('' as any);
                expect(element.classList.contains('p-badge-dot')).toBe(true);
            });
        });

        describe('Size Variants', () => {
            let fixture: ComponentFixture<TestSizeBadgeComponent>;
            let component: TestSizeBadgeComponent;
            let element: HTMLElement;

            beforeEach(() => {
                fixture = TestBed.createComponent(TestSizeBadgeComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();

                element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
            });

            it('should apply small size class', () => {
                component.badgeSize = 'small';
                fixture.detectChanges();

                expect(element.classList.contains('p-badge-sm')).toBe(true);
            });

            it('should apply large size class', () => {
                component.badgeSize = 'large';
                fixture.detectChanges();

                expect(element.classList.contains('p-badge-lg')).toBe(true);
            });

            it('should apply xlarge size class', () => {
                component.badgeSize = 'xlarge';
                fixture.detectChanges();

                expect(element.classList.contains('p-badge-xl')).toBe(true);
            });

            it('should change size dynamically', () => {
                component.badgeSize = 'large';
                fixture.detectChanges();
                expect(element.classList.contains('p-badge-lg')).toBe(true);

                component.badgeSize = 'small';
                fixture.detectChanges();
                expect(element.classList.contains('p-badge-lg')).toBe(false);
                expect(element.classList.contains('p-badge-sm')).toBe(true);
            });
        });

        describe('Severity Variants', () => {
            let fixture: ComponentFixture<TestSeverityBadgeComponent>;
            let component: TestSeverityBadgeComponent;
            let element: HTMLElement;

            beforeEach(() => {
                fixture = TestBed.createComponent(TestSeverityBadgeComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();

                element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
            });

            it('should apply info severity class', () => {
                component.severity = 'info';
                fixture.detectChanges();

                expect(element.classList.contains('p-badge-info')).toBe(true);
            });

            it('should apply success severity class', () => {
                component.severity = 'success';
                fixture.detectChanges();

                expect(element.classList.contains('p-badge-success')).toBe(true);
            });

            it('should apply warn severity class', () => {
                component.severity = 'warn';
                fixture.detectChanges();

                expect(element.classList.contains('p-badge-warn')).toBe(true);
            });

            it('should apply danger severity class', () => {
                component.severity = 'danger';
                fixture.detectChanges();

                expect(element.classList.contains('p-badge-danger')).toBe(true);
            });

            it('should apply secondary severity class', () => {
                component.severity = 'secondary';
                fixture.detectChanges();

                expect(element.classList.contains('p-badge-secondary')).toBe(true);
            });

            it('should apply contrast severity class', () => {
                component.severity = 'contrast';
                fixture.detectChanges();

                expect(element.classList.contains('p-badge-contrast')).toBe(true);
            });

            it('should change severity dynamically', () => {
                component.severity = 'info';
                fixture.detectChanges();
                expect(element.classList.contains('p-badge-info')).toBe(true);

                component.severity = 'danger';
                fixture.detectChanges();
                expect(element.classList.contains('p-badge-info')).toBe(false);
                expect(element.classList.contains('p-badge-danger')).toBe(true);
            });
        });

        describe('Disabled State', () => {
            let fixture: ComponentFixture<TestDisabledBadgeComponent>;
            let component: TestDisabledBadgeComponent;
            let element: HTMLElement;

            beforeEach(() => {
                fixture = TestBed.createComponent(TestDisabledBadgeComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();

                element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
            });

            it('should be visible when not disabled', () => {
                expect(element.style.display).toBe('' as any);
            });

            it('should be hidden when disabled', () => {
                component.disabled = true;
                fixture.detectChanges();

                expect(element.style.display).toBe('none');
            });

            it('should toggle visibility dynamically', () => {
                component.disabled = true;
                fixture.detectChanges();
                expect(element.style.display).toBe('none');

                component.disabled = false;
                fixture.detectChanges();
                expect(element.style.display).toBe('' as any);
            });
        });

        describe('Style Class', () => {
            let fixture: ComponentFixture<TestStyleClassBadgeComponent>;
            let component: TestStyleClassBadgeComponent;
            let element: HTMLElement;

            beforeEach(() => {
                fixture = TestBed.createComponent(TestStyleClassBadgeComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();

                element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
            });

            it('should apply custom style class', () => {
                expect(element.classList.contains('custom-badge')).toBe(true);
            });

            it('should update style class dynamically', () => {
                component.styleClass = 'new-custom-class';
                fixture.detectChanges();

                expect(element.classList.contains('new-custom-class')).toBe(true);
            });
        });
    });

    describe('Badge Directive', () => {
        describe('Basic Directive Usage', () => {
            let fixture: ComponentFixture<TestDirectiveBadgeComponent>;
            let component: TestDirectiveBadgeComponent;
            let directiveElement: DebugElement;
            let directive: BadgeDirective;
            let buttonElement: HTMLElement;

            beforeEach(() => {
                fixture = TestBed.createComponent(TestDirectiveBadgeComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();

                directiveElement = fixture.debugElement.query(By.directive(BadgeDirective));
                directive = directiveElement.injector.get(BadgeDirective);
                buttonElement = directiveElement.nativeElement;
            });

            it('should create the directive', () => {
                expect(directive).toBeTruthy();
            });

            it('should apply overlay badge class to host element', () => {
                expect(buttonElement.classList.contains('p-overlay-badge')).toBe(true);
            });

            it('should create badge element', () => {
                const badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement).toBeTruthy();
                expect(badgeElement?.classList.contains('p-component')).toBe(true);
            });

            it('should display badge value', () => {
                const badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement?.textContent?.trim()).toBe('5');
            });

            it('should update badge value dynamically', () => {
                component.value = '10';
                fixture.detectChanges();

                const badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement?.textContent?.trim()).toBe('10');
            });

            it('should handle null value with dot class', () => {
                component.value = undefined as any;
                fixture.detectChanges();

                const badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement?.classList.contains('p-badge-dot')).toBe(true);
                expect(badgeElement?.textContent?.trim()).toBe('' as any);
            });

            it('should apply circle class for single character', () => {
                component.value = '1';
                fixture.detectChanges();

                const badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement?.classList.contains('p-badge-circle')).toBe(true);
            });
        });

        describe('Directive Size Variants', () => {
            let fixture: ComponentFixture<TestDirectiveSizeBadgeComponent>;
            let component: TestDirectiveSizeBadgeComponent;
            let buttonElement: HTMLElement;

            beforeEach(() => {
                fixture = TestBed.createComponent(TestDirectiveSizeBadgeComponent);
                component = fixture.componentInstance;
                component.size = 'large'; // Set initial size to ensure badge creation
                fixture.detectChanges();

                buttonElement = fixture.debugElement.query(By.directive(BadgeDirective)).nativeElement;
            });

            it('should apply large size class', () => {
                // Badge should already be created with large size from beforeEach
                const badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement).toBeTruthy();
                expect(badgeElement?.classList.contains('p-badge-lg')).toBe(true);
            });

            it('should apply xlarge size class', () => {
                component.size = 'xlarge';
                fixture.detectChanges();

                const badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement).toBeTruthy();
                expect(badgeElement?.classList.contains('p-badge-xl')).toBe(true);
            });

            it('should change size classes dynamically', () => {
                // Badge starts as large from beforeEach
                let badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement).toBeTruthy();
                expect(badgeElement?.classList.contains('p-badge-lg')).toBe(true);
                expect(badgeElement?.classList.contains('p-badge-xl')).toBe(false);

                component.size = 'xlarge';
                fixture.detectChanges();

                badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement?.classList.contains('p-badge-lg')).toBe(false);
                expect(badgeElement?.classList.contains('p-badge-xl')).toBe(true);
            });
        });

        describe('Directive Severity Variants', () => {
            let fixture: ComponentFixture<TestDirectiveSeverityBadgeComponent>;
            let component: TestDirectiveSeverityBadgeComponent;
            let buttonElement: HTMLElement;

            beforeEach(() => {
                fixture = TestBed.createComponent(TestDirectiveSeverityBadgeComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();

                buttonElement = fixture.debugElement.query(By.directive(BadgeDirective)).nativeElement;
            });

            it('should apply info severity class', () => {
                component.severity = 'info';
                fixture.detectChanges();

                const badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement?.classList.contains('p-badge-info')).toBe(true);
            });

            it('should apply success severity class', () => {
                component.severity = 'success';
                fixture.detectChanges();

                const badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement?.classList.contains('p-badge-success')).toBe(true);
            });

            it('should change severity classes dynamically', () => {
                component.severity = 'warn';
                fixture.detectChanges();

                let badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement?.classList.contains('p-badge-warn')).toBe(true);

                component.severity = 'danger';
                fixture.detectChanges();

                badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement?.classList.contains('p-badge-warn')).toBe(false);
                expect(badgeElement?.classList.contains('p-badge-danger')).toBe(true);
            });
        });

        describe('Directive Disabled State', () => {
            let fixture: ComponentFixture<TestDirectiveDisabledBadgeComponent>;
            let component: TestDirectiveDisabledBadgeComponent;
            let buttonElement: HTMLElement;

            beforeEach(() => {
                fixture = TestBed.createComponent(TestDirectiveDisabledBadgeComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();

                buttonElement = fixture.debugElement.query(By.directive(BadgeDirective)).nativeElement;
            });

            it('should show badge when not disabled', () => {
                const badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement).toBeTruthy();
            });

            it('should hide badge when disabled', () => {
                component.disabled = true;
                fixture.detectChanges();

                const badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement).toBeFalsy();
            });

            it('should toggle badge visibility dynamically', () => {
                component.disabled = true;
                fixture.detectChanges();
                expect(buttonElement.querySelector('.p-badge')).toBeFalsy();

                component.disabled = false;
                fixture.detectChanges();
                expect(buttonElement.querySelector('.p-badge')).toBeTruthy();
            });
        });

        describe('Directive Style Customization', () => {
            let fixture: ComponentFixture<TestDirectiveStyleBadgeComponent>;
            let component: TestDirectiveStyleBadgeComponent;
            let buttonElement: HTMLElement;

            beforeEach(() => {
                fixture = TestBed.createComponent(TestDirectiveStyleBadgeComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();

                buttonElement = fixture.debugElement.query(By.directive(BadgeDirective)).nativeElement;
            });

            it('should apply custom styles', () => {
                component.badgeStyle = { backgroundColor: 'red', color: 'white' };
                fixture.detectChanges();

                const badgeElement = buttonElement.querySelector('.p-badge') as HTMLElement;
                expect(badgeElement.style.backgroundColor).toBe('red');
                expect(badgeElement.style.color).toBe('white');
            });

            it('should apply custom CSS classes', () => {
                component.badgeStyleClass = 'custom-badge-class';
                fixture.detectChanges();

                const badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement?.classList.contains('custom-badge-class')).toBe(true);
            });

            it('should apply multiple CSS classes', () => {
                component.badgeStyleClass = 'class1 class2 class3';
                fixture.detectChanges();

                const badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement?.classList.contains('class1')).toBe(true);
                expect(badgeElement?.classList.contains('class2')).toBe(true);
                expect(badgeElement?.classList.contains('class3')).toBe(true);
            });

            it('should handle both style and class together', () => {
                component.badgeStyle = { fontSize: '14px' };
                component.badgeStyleClass = 'styled-badge';
                fixture.detectChanges();

                const badgeElement = buttonElement.querySelector('.p-badge') as HTMLElement;
                expect(badgeElement.style.fontSize).toBe('14px');
                expect(badgeElement?.classList.contains('styled-badge')).toBe(true);
            });
        });
    });

    describe('Dynamic Configuration', () => {
        let fixture: ComponentFixture<TestDynamicBadgeComponent>;
        let component: TestDynamicBadgeComponent;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestDynamicBadgeComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
        });

        it('should handle combined property changes', () => {
            component.value = '99';
            component.badgeSize = 'large';
            component.severity = 'danger';
            component.styleClass = 'urgent';
            fixture.detectChanges();

            expect(element.textContent?.trim()).toBe('99');
            expect(element.classList.contains('p-badge-lg')).toBe(true);
            expect(element.classList.contains('p-badge-danger')).toBe(true);
            expect(element.classList.contains('urgent')).toBe(true);
        });

        it('should handle transitions between different states', () => {
            // Start with single character (circle)
            component.value = '1';
            fixture.detectChanges();
            expect(element.classList.contains('p-badge-circle')).toBe(true);

            // Change to multiple characters (no circle)
            component.value = '99';
            fixture.detectChanges();
            expect(element.classList.contains('p-badge-circle')).toBe(false);

            // Change to null (dot)
            component.value = null as any;
            fixture.detectChanges();
            expect(element.classList.contains('p-badge-dot')).toBe(true);
            expect(element.classList.contains('p-badge-circle')).toBe(false);
        });

        it('should handle severity transitions', () => {
            component.severity = 'info';
            fixture.detectChanges();
            expect(element.classList.contains('p-badge-info')).toBe(true);

            component.severity = 'success';
            fixture.detectChanges();
            expect(element.classList.contains('p-badge-info')).toBe(false);
            expect(element.classList.contains('p-badge-success')).toBe(true);

            component.severity = null as any;
            fixture.detectChanges();
            expect(element.classList.contains('p-badge-success')).toBe(false);
        });

        it('should handle size transitions', () => {
            component.badgeSize = 'large';
            fixture.detectChanges();
            expect(element.classList.contains('p-badge-lg')).toBe(true);

            component.badgeSize = 'xlarge';
            fixture.detectChanges();
            expect(element.classList.contains('p-badge-lg')).toBe(false);
            expect(element.classList.contains('p-badge-xl')).toBe(true);

            component.badgeSize = null as any;
            fixture.detectChanges();
            expect(element.classList.contains('p-badge-xl')).toBe(false);
            expect(element.classList.contains('p-badge-lg')).toBe(false);
        });
    });

    describe('Edge Cases', () => {
        it('should handle numeric zero value correctly', () => {
            const fixture = TestBed.createComponent(TestValueBadgeComponent);
            const component = fixture.componentInstance;
            component.value = 0;
            fixture.detectChanges();

            const element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
            expect(element.textContent?.trim()).toBe('0');
            expect(element.classList.contains('p-badge-circle')).toBe(true);
            expect(element.classList.contains('p-badge-dot')).toBe(false);
        });

        it('should handle negative numbers', () => {
            const fixture = TestBed.createComponent(TestValueBadgeComponent);
            const component = fixture.componentInstance;
            component.value = -5;
            fixture.detectChanges();

            const element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
            expect(element.textContent?.trim()).toBe('-5');
            expect(element.classList.contains('p-badge-circle')).toBe(false);
        });

        it('should handle special characters in value', () => {
            const fixture = TestBed.createComponent(TestValueBadgeComponent);
            const component = fixture.componentInstance;
            component.value = '!';
            fixture.detectChanges();

            const element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
            expect(element.textContent?.trim()).toBe('!');
            expect(element.classList.contains('p-badge-circle')).toBe(true);
        });

        it('should handle very long values', () => {
            const fixture = TestBed.createComponent(TestValueBadgeComponent);
            const component = fixture.componentInstance;
            component.value = '999999999';
            fixture.detectChanges();

            const element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
            expect(element.textContent?.trim()).toBe('999999999');
            expect(element.classList.contains('p-badge-circle')).toBe(false);
            expect(element.classList.contains('p-badge-dot')).toBe(false);
        });

        it('should handle whitespace in value', () => {
            const fixture = TestBed.createComponent(TestValueBadgeComponent);
            const component = fixture.componentInstance;
            component.value = '  ';
            fixture.detectChanges();

            const element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
            expect(element.textContent?.trim()).toBe('' as any);
            // Whitespace strings are treated as valid content, not empty
            expect(element.classList.contains('p-badge-dot')).toBe(false);
        });
    });

    describe('CSS Class Combinations', () => {
        let fixture: ComponentFixture<TestDynamicBadgeComponent>;
        let component: TestDynamicBadgeComponent;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestDynamicBadgeComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
        });

        it('should maintain base classes with all variants', () => {
            component.value = '1';
            component.badgeSize = 'large';
            component.severity = 'danger';
            component.styleClass = 'custom';
            fixture.detectChanges();

            // Base classes
            expect(element.classList.contains('p-badge')).toBe(true);
            expect(element.classList.contains('p-component')).toBe(true);

            // State classes
            expect(element.classList.contains('p-badge-circle')).toBe(true);
            expect(element.classList.contains('p-badge-lg')).toBe(true);
            expect(element.classList.contains('p-badge-danger')).toBe(true);
            expect(element.classList.contains('custom')).toBe(true);
        });

        it('should handle conflicting size classes correctly', () => {
            component.badgeSize = 'small';
            fixture.detectChanges();
            expect(element.classList.contains('p-badge-sm')).toBe(true);

            component.badgeSize = 'large';
            fixture.detectChanges();
            expect(element.classList.contains('p-badge-sm')).toBe(false);
            expect(element.classList.contains('p-badge-lg')).toBe(true);

            component.badgeSize = 'xlarge';
            fixture.detectChanges();
            expect(element.classList.contains('p-badge-lg')).toBe(false);
            expect(element.classList.contains('p-badge-xl')).toBe(true);
        });

        it('should handle conflicting severity classes correctly', () => {
            component.severity = 'info';
            fixture.detectChanges();
            expect(element.classList.contains('p-badge-info')).toBe(true);

            component.severity = 'success';
            fixture.detectChanges();
            expect(element.classList.contains('p-badge-info')).toBe(false);
            expect(element.classList.contains('p-badge-success')).toBe(true);

            component.severity = 'warn';
            fixture.detectChanges();
            expect(element.classList.contains('p-badge-success')).toBe(false);
            expect(element.classList.contains('p-badge-warn')).toBe(true);
        });
    });
});
