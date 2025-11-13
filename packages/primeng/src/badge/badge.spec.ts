import { Component, DebugElement, ElementRef, input, provideZonelessChangeDetection, ViewChild } from '@angular/core';
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
            ],
            providers: [provideZonelessChangeDetection()]
        });
    });

    describe('Badge Component', () => {
        describe('Component Initialization', () => {
            let fixture: ComponentFixture<TestBasicBadgeComponent>;
            let component: Badge;
            let element: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestBasicBadgeComponent);
                await fixture.whenStable();

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

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestValueBadgeComponent);
                component = fixture.componentInstance;
                await fixture.whenStable();

                element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
            });

            it('should display string value', () => {
                expect(element.textContent?.trim()).toBe('2');
            });

            it('should display numeric value', async () => {
                component.value = 10;
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.textContent?.trim()).toBe('10');
            });

            it('should apply circle class for single character', async () => {
                component.value = '1';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('p-badge-circle')).toBe(true);
                expect(element.classList.contains('p-badge-dot')).toBe(false);
            });

            it('should not apply circle class for multiple characters', async () => {
                component.value = '10';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('p-badge-circle')).toBe(false);
                expect(element.classList.contains('p-badge-dot')).toBe(false);
            });

            it('should apply dot class when value is null', async () => {
                component.value = null as any;
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('p-badge-dot')).toBe(true);
                expect(element.classList.contains('p-badge-circle')).toBe(false);
                expect(element.textContent?.trim()).toBe('' as any);
            });

            it('should handle zero value', async () => {
                component.value = 0;
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.textContent?.trim()).toBe('0');
                expect(element.classList.contains('p-badge-circle')).toBe(true);
            });

            it('should handle empty string', async () => {
                component.value = '';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.textContent?.trim()).toBe('' as any);
                expect(element.classList.contains('p-badge-dot')).toBe(true);
            });
        });

        describe('Size Variants', () => {
            let fixture: ComponentFixture<TestSizeBadgeComponent>;
            let component: TestSizeBadgeComponent;
            let element: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestSizeBadgeComponent);
                component = fixture.componentInstance;
                await fixture.whenStable();

                element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
            });

            it('should apply small size class', async () => {
                component.badgeSize = 'small';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('p-badge-sm')).toBe(true);
            });

            it('should apply large size class', async () => {
                component.badgeSize = 'large';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('p-badge-lg')).toBe(true);
            });

            it('should apply xlarge size class', async () => {
                component.badgeSize = 'xlarge';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('p-badge-xl')).toBe(true);
            });

            it('should change size dynamically', async () => {
                component.badgeSize = 'large';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                expect(element.classList.contains('p-badge-lg')).toBe(true);

                component.badgeSize = 'small';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                expect(element.classList.contains('p-badge-lg')).toBe(false);
                expect(element.classList.contains('p-badge-sm')).toBe(true);
            });
        });

        describe('Severity Variants', () => {
            let fixture: ComponentFixture<TestSeverityBadgeComponent>;
            let component: TestSeverityBadgeComponent;
            let element: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestSeverityBadgeComponent);
                component = fixture.componentInstance;
                await fixture.whenStable();

                element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
            });

            it('should apply info severity class', async () => {
                component.severity = 'info';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('p-badge-info')).toBe(true);
            });

            it('should apply success severity class', async () => {
                component.severity = 'success';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('p-badge-success')).toBe(true);
            });

            it('should apply warn severity class', async () => {
                component.severity = 'warn';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('p-badge-warn')).toBe(true);
            });

            it('should apply danger severity class', async () => {
                component.severity = 'danger';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('p-badge-danger')).toBe(true);
            });

            it('should apply secondary severity class', async () => {
                component.severity = 'secondary';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('p-badge-secondary')).toBe(true);
            });

            it('should apply contrast severity class', async () => {
                component.severity = 'contrast';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('p-badge-contrast')).toBe(true);
            });

            it('should change severity dynamically', async () => {
                component.severity = 'info';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                expect(element.classList.contains('p-badge-info')).toBe(true);

                component.severity = 'danger';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                expect(element.classList.contains('p-badge-info')).toBe(false);
                expect(element.classList.contains('p-badge-danger')).toBe(true);
            });
        });

        describe('Disabled State', () => {
            let fixture: ComponentFixture<TestDisabledBadgeComponent>;
            let component: TestDisabledBadgeComponent;
            let element: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestDisabledBadgeComponent);
                component = fixture.componentInstance;
                await fixture.whenStable();

                element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
            });

            it('should be visible when not disabled', () => {
                expect(element.style.display).toBe('' as any);
            });

            it('should be hidden when disabled', async () => {
                component.disabled = true;
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.style.display).toBe('none');
            });

            it('should toggle visibility dynamically', async () => {
                component.disabled = true;
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                expect(element.style.display).toBe('none');

                component.disabled = false;
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                expect(element.style.display).toBe('' as any);
            });
        });

        describe('Style Class', () => {
            let fixture: ComponentFixture<TestStyleClassBadgeComponent>;
            let component: TestStyleClassBadgeComponent;
            let element: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestStyleClassBadgeComponent);
                component = fixture.componentInstance;
                await fixture.whenStable();

                element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
            });

            it('should apply custom style class', () => {
                expect(element.classList.contains('custom-badge')).toBe(true);
            });

            it('should update style class dynamically', async () => {
                component.styleClass = 'new-custom-class';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

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

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestDirectiveBadgeComponent);
                component = fixture.componentInstance;
                await fixture.whenStable();

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

            it('should update badge value dynamically', async () => {
                component.value = '10';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                const badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement?.textContent?.trim()).toBe('10');
            });

            it('should handle null value with dot class', async () => {
                component.value = undefined as any;
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                const badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement?.classList.contains('p-badge-dot')).toBe(true);
                expect(badgeElement?.textContent?.trim()).toBe('' as any);
            });

            it('should apply circle class for single character', async () => {
                component.value = '1';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                const badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement?.classList.contains('p-badge-circle')).toBe(true);
            });
        });

        describe('Directive Size Variants', () => {
            let fixture: ComponentFixture<TestDirectiveSizeBadgeComponent>;
            let component: TestDirectiveSizeBadgeComponent;
            let buttonElement: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestDirectiveSizeBadgeComponent);
                component = fixture.componentInstance;
                component.size = 'large'; // Set initial size to ensure badge creation
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                buttonElement = fixture.debugElement.query(By.directive(BadgeDirective)).nativeElement;
            });

            it('should apply large size class', () => {
                // Badge should already be created with large size from beforeEach
                const badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement).toBeTruthy();
                expect(badgeElement?.classList.contains('p-badge-lg')).toBe(true);
            });

            it('should apply xlarge size class', async () => {
                component.size = 'xlarge';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                const badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement).toBeTruthy();
                expect(badgeElement?.classList.contains('p-badge-xl')).toBe(true);
            });

            it('should change size classes dynamically', async () => {
                // Badge starts as large from beforeEach
                let badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement).toBeTruthy();
                expect(badgeElement?.classList.contains('p-badge-lg')).toBe(true);
                expect(badgeElement?.classList.contains('p-badge-xl')).toBe(false);

                component.size = 'xlarge';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement?.classList.contains('p-badge-lg')).toBe(false);
                expect(badgeElement?.classList.contains('p-badge-xl')).toBe(true);
            });
        });

        describe('Directive Severity Variants', () => {
            let fixture: ComponentFixture<TestDirectiveSeverityBadgeComponent>;
            let component: TestDirectiveSeverityBadgeComponent;
            let buttonElement: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestDirectiveSeverityBadgeComponent);
                component = fixture.componentInstance;
                await fixture.whenStable();

                buttonElement = fixture.debugElement.query(By.directive(BadgeDirective)).nativeElement;
            });

            it('should apply info severity class', async () => {
                component.severity = 'info';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                const badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement?.classList.contains('p-badge-info')).toBe(true);
            });

            it('should apply success severity class', async () => {
                component.severity = 'success';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                const badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement?.classList.contains('p-badge-success')).toBe(true);
            });

            it('should change severity classes dynamically', async () => {
                component.severity = 'warn';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                let badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement?.classList.contains('p-badge-warn')).toBe(true);

                component.severity = 'danger';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement?.classList.contains('p-badge-warn')).toBe(false);
                expect(badgeElement?.classList.contains('p-badge-danger')).toBe(true);
            });
        });

        describe('Directive Disabled State', () => {
            let fixture: ComponentFixture<TestDirectiveDisabledBadgeComponent>;
            let component: TestDirectiveDisabledBadgeComponent;
            let buttonElement: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestDirectiveDisabledBadgeComponent);
                component = fixture.componentInstance;
                await fixture.whenStable();

                buttonElement = fixture.debugElement.query(By.directive(BadgeDirective)).nativeElement;
            });

            it('should show badge when not disabled', () => {
                const badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement).toBeTruthy();
            });

            it('should hide badge when disabled', async () => {
                component.disabled = true;
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                const badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement).toBeFalsy();
            });

            it('should toggle badge visibility dynamically', async () => {
                component.disabled = true;
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                expect(buttonElement.querySelector('.p-badge')).toBeFalsy();

                component.disabled = false;
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                expect(buttonElement.querySelector('.p-badge')).toBeTruthy();
            });
        });

        describe('Directive Style Customization', () => {
            let fixture: ComponentFixture<TestDirectiveStyleBadgeComponent>;
            let component: TestDirectiveStyleBadgeComponent;
            let buttonElement: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestDirectiveStyleBadgeComponent);
                component = fixture.componentInstance;
                await fixture.whenStable();

                buttonElement = fixture.debugElement.query(By.directive(BadgeDirective)).nativeElement;
            });

            it('should apply custom styles', async () => {
                component.badgeStyle = { backgroundColor: 'red', color: 'white' };
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                const badgeElement = buttonElement.querySelector('.p-badge') as HTMLElement;
                expect(badgeElement.style.backgroundColor).toBe('red');
                expect(badgeElement.style.color).toBe('white');
            });

            it('should apply custom CSS classes', async () => {
                component.badgeStyleClass = 'custom-badge-class';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                const badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement?.classList.contains('custom-badge-class')).toBe(true);
            });

            it('should apply multiple CSS classes', async () => {
                component.badgeStyleClass = 'class1 class2 class3';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                const badgeElement = buttonElement.querySelector('.p-badge');
                expect(badgeElement?.classList.contains('class1')).toBe(true);
                expect(badgeElement?.classList.contains('class2')).toBe(true);
                expect(badgeElement?.classList.contains('class3')).toBe(true);
            });

            it('should handle both style and class together', async () => {
                component.badgeStyle = { fontSize: '14px' };
                component.badgeStyleClass = 'styled-badge';
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

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

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestDynamicBadgeComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();

            element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
        });

        it('should handle combined property changes', async () => {
            component.value = '99';
            component.badgeSize = 'large';
            component.severity = 'danger';
            component.styleClass = 'urgent';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(element.textContent?.trim()).toBe('99');
            expect(element.classList.contains('p-badge-lg')).toBe(true);
            expect(element.classList.contains('p-badge-danger')).toBe(true);
            expect(element.classList.contains('urgent')).toBe(true);
        });

        it('should handle transitions between different states', async () => {
            // Start with single character (circle)
            component.value = '1';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('p-badge-circle')).toBe(true);

            // Change to multiple characters (no circle)
            component.value = '99';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('p-badge-circle')).toBe(false);

            // Change to null (dot)
            component.value = null as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('p-badge-dot')).toBe(true);
            expect(element.classList.contains('p-badge-circle')).toBe(false);
        });

        it('should handle severity transitions', async () => {
            component.severity = 'info';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('p-badge-info')).toBe(true);

            component.severity = 'success';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('p-badge-info')).toBe(false);
            expect(element.classList.contains('p-badge-success')).toBe(true);

            component.severity = null as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('p-badge-success')).toBe(false);
        });

        it('should handle size transitions', async () => {
            component.badgeSize = 'large';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('p-badge-lg')).toBe(true);

            component.badgeSize = 'xlarge';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('p-badge-lg')).toBe(false);
            expect(element.classList.contains('p-badge-xl')).toBe(true);

            component.badgeSize = null as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('p-badge-xl')).toBe(false);
            expect(element.classList.contains('p-badge-lg')).toBe(false);
        });
    });

    describe('Edge Cases', () => {
        it('should handle numeric zero value correctly', async () => {
            const fixture = TestBed.createComponent(TestValueBadgeComponent);
            const component = fixture.componentInstance;
            component.value = 0;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
            expect(element.textContent?.trim()).toBe('0');
            expect(element.classList.contains('p-badge-circle')).toBe(true);
            expect(element.classList.contains('p-badge-dot')).toBe(false);
        });

        it('should handle negative numbers', async () => {
            const fixture = TestBed.createComponent(TestValueBadgeComponent);
            const component = fixture.componentInstance;
            component.value = -5;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
            expect(element.textContent?.trim()).toBe('-5');
            expect(element.classList.contains('p-badge-circle')).toBe(false);
        });

        it('should handle special characters in value', async () => {
            const fixture = TestBed.createComponent(TestValueBadgeComponent);
            const component = fixture.componentInstance;
            component.value = '!';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
            expect(element.textContent?.trim()).toBe('!');
            expect(element.classList.contains('p-badge-circle')).toBe(true);
        });

        it('should handle very long values', async () => {
            const fixture = TestBed.createComponent(TestValueBadgeComponent);
            const component = fixture.componentInstance;
            component.value = '999999999';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
            expect(element.textContent?.trim()).toBe('999999999');
            expect(element.classList.contains('p-badge-circle')).toBe(false);
            expect(element.classList.contains('p-badge-dot')).toBe(false);
        });

        it('should handle whitespace in value', async () => {
            const fixture = TestBed.createComponent(TestValueBadgeComponent);
            const component = fixture.componentInstance;
            component.value = '  ';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

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

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestDynamicBadgeComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();

            element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
        });

        it('should maintain base classes with all variants', async () => {
            component.value = '1';
            component.badgeSize = 'large';
            component.severity = 'danger';
            component.styleClass = 'custom';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            // Base classes
            expect(element.classList.contains('p-badge')).toBe(true);
            expect(element.classList.contains('p-component')).toBe(true);

            // State classes
            expect(element.classList.contains('p-badge-circle')).toBe(true);
            expect(element.classList.contains('p-badge-lg')).toBe(true);
            expect(element.classList.contains('p-badge-danger')).toBe(true);
            expect(element.classList.contains('custom')).toBe(true);
        });

        it('should handle conflicting size classes correctly', async () => {
            component.badgeSize = 'small';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('p-badge-sm')).toBe(true);

            component.badgeSize = 'large';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('p-badge-sm')).toBe(false);
            expect(element.classList.contains('p-badge-lg')).toBe(true);

            component.badgeSize = 'xlarge';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('p-badge-lg')).toBe(false);
            expect(element.classList.contains('p-badge-xl')).toBe(true);
        });

        it('should handle conflicting severity classes correctly', async () => {
            component.severity = 'info';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('p-badge-info')).toBe(true);

            component.severity = 'success';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('p-badge-info')).toBe(false);
            expect(element.classList.contains('p-badge-success')).toBe(true);

            component.severity = 'warn';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('p-badge-success')).toBe(false);
            expect(element.classList.contains('p-badge-warn')).toBe(true);
        });
    });

    describe('PassThrough API', () => {
        @Component({
            standalone: true,
            imports: [Badge],
            template: `<p-badge [value]="value()" [badgeSize]="badgeSize()" [severity]="severity()" [pt]="pt()"></p-badge>`
        })
        class TestPTBadgeComponent {
            value = input<string | number | null>();
            badgeSize = input<'small' | 'large' | 'xlarge' | null>();
            severity = input<'secondary' | 'info' | 'success' | 'warn' | 'danger' | 'contrast' | null>();
            pt = input<any>();
        }

        describe('Case 1: Simple string classes', () => {
            let fixture: ComponentFixture<TestPTBadgeComponent>;
            let element: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestPTBadgeComponent);
                await fixture.whenStable();
                element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
            });

            it('should apply string class to host section', async () => {
                fixture.componentRef.setInput('pt', { host: 'HOST_CLASS' });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('HOST_CLASS')).toBe(true);
            });

            it('should apply string class to root section', async () => {
                fixture.componentRef.setInput('pt', { root: 'ROOT_CLASS' });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('ROOT_CLASS')).toBe(true);
            });
        });

        describe('Case 2: Objects', () => {
            let fixture: ComponentFixture<TestPTBadgeComponent>;
            let element: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestPTBadgeComponent);
                await fixture.whenStable();
                element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
            });

            it('should apply object with class, style, data and aria attributes to root', async () => {
                fixture.componentRef.setInput('pt', {
                    root: {
                        class: 'ROOT_OBJECT_CLASS',
                        style: { 'background-color': 'red' },
                        'data-p-test': true,
                        'aria-label': 'TEST_ARIA_LABEL'
                    }
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('ROOT_OBJECT_CLASS')).toBe(true);
                expect(element.style.backgroundColor).toBe('red');
                expect(element.getAttribute('data-p-test')).toBe('true');
                expect(element.getAttribute('aria-label')).toBe('TEST_ARIA_LABEL');
            });

            it('should apply object with class, style, data and aria attributes to host', async () => {
                fixture.componentRef.setInput('pt', {
                    host: {
                        class: 'HOST_OBJECT_CLASS',
                        style: { color: 'blue' },
                        'data-p-host': 'test',
                        'aria-hidden': 'true'
                    }
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('HOST_OBJECT_CLASS')).toBe(true);
                expect(element.style.color).toBe('blue');
                expect(element.getAttribute('data-p-host')).toBe('test');
                expect(element.getAttribute('aria-hidden')).toBe('true');
            });
        });

        describe('Case 3: Mixed object and string values', () => {
            let fixture: ComponentFixture<TestPTBadgeComponent>;
            let element: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestPTBadgeComponent);
                await fixture.whenStable();
                element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
            });

            it('should apply mixed pt with object and string values', async () => {
                fixture.componentRef.setInput('pt', {
                    root: {
                        class: 'ROOT_MIXED_CLASS'
                    },
                    host: 'HOST_MIXED_CLASS'
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('ROOT_MIXED_CLASS')).toBe(true);
                expect(element.classList.contains('HOST_MIXED_CLASS')).toBe(true);
            });
        });

        describe('Case 4: Use variables from instance', () => {
            let fixture: ComponentFixture<TestPTBadgeComponent>;
            let element: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestPTBadgeComponent);
                await fixture.whenStable();
                element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
            });

            it('should use instance value in pt function for root', async () => {
                fixture.componentRef.setInput('value', '5');
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                fixture.componentRef.setInput('pt', {
                    root: ({ instance }: any) => {
                        return {
                            class: instance?.value() ? 'HAS_VALUE' : 'NO_VALUE'
                        };
                    }
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('HAS_VALUE')).toBe(true);
            });

            it('should use instance severity in pt function for root', async () => {
                fixture.componentRef.setInput('severity', 'success');
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                fixture.componentRef.setInput('pt', {
                    root: ({ instance }: any) => {
                        return {
                            style: {
                                'border-color': instance?.severity() === 'success' ? 'green' : 'red'
                            }
                        };
                    }
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.style.borderColor).toBe('green');
            });

            it('should use instance badgeSize in pt function for host', async () => {
                fixture.componentRef.setInput('badgeSize', 'large');
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                fixture.componentRef.setInput('pt', {
                    host: ({ instance }: any) => {
                        return {
                            'data-size': instance?.badgeSize() || 'normal'
                        };
                    }
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.getAttribute('data-size')).toBe('large');
            });
        });

        describe('Case 5: Event binding', () => {
            let fixture: ComponentFixture<TestPTBadgeComponent>;
            let element: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestPTBadgeComponent);
                await fixture.whenStable();
                element = fixture.debugElement.query(By.directive(Badge)).nativeElement;
            });

            it('should bind onclick event to root through pt', async () => {
                let clickCount = 0;
                fixture.componentRef.setInput('pt', {
                    root: {
                        onclick: () => {
                            clickCount++;
                        }
                    }
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                element.click();
                element.click();

                expect(clickCount).toBe(2);
            });

            it('should bind onclick event to host through pt', async () => {
                let clicked = false;
                fixture.componentRef.setInput('pt', {
                    host: {
                        onclick: () => {
                            clicked = true;
                        }
                    }
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                element.click();

                expect(clicked).toBe(true);
            });
        });

        describe('Case 7: Inline test', () => {
            it('should apply inline pt with string class', async () => {
                const inlineFixture = TestBed.createComponent(TestPTBadgeComponent);
                inlineFixture.componentRef.setInput('pt', { root: 'INLINE_TEST_CLASS' });
                inlineFixture.changeDetectorRef.markForCheck();
                await inlineFixture.whenStable();

                const element = inlineFixture.debugElement.query(By.directive(Badge)).nativeElement;
                expect(element.classList.contains('INLINE_TEST_CLASS')).toBe(true);
            });

            it('should apply inline pt with object class', async () => {
                const inlineFixture = TestBed.createComponent(TestPTBadgeComponent);
                inlineFixture.componentRef.setInput('pt', { root: { class: 'INLINE_OBJECT_CLASS' } });
                inlineFixture.changeDetectorRef.markForCheck();
                await inlineFixture.whenStable();

                const element = inlineFixture.debugElement.query(By.directive(Badge)).nativeElement;
                expect(element.classList.contains('INLINE_OBJECT_CLASS')).toBe(true);
            });
        });

        describe('Case 8: Test hooks', () => {
            let fixture: ComponentFixture<TestPTBadgeComponent>;

            beforeEach(() => {
                fixture = TestBed.createComponent(TestPTBadgeComponent);
            });

            it('should call onAfterViewInit hook', async () => {
                let hookCalled = false;
                fixture.componentRef.setInput('pt', {
                    hooks: {
                        onAfterViewInit: () => {
                            hookCalled = true;
                        }
                    }
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(hookCalled).toBe(true);
            });

            it('should call onAfterContentInit hook', async () => {
                let hookCalled = false;
                fixture.componentRef.setInput('pt', {
                    hooks: {
                        onAfterContentInit: () => {
                            hookCalled = true;
                        }
                    }
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(hookCalled).toBe(true);
            });

            it('should call onAfterViewChecked hook', async () => {
                let checkCount = 0;
                fixture.componentRef.setInput('pt', {
                    hooks: {
                        onAfterViewChecked: () => {
                            checkCount++;
                        }
                    }
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(checkCount).toBeGreaterThan(0);
            });

            it('should call onDestroy hook', async () => {
                let hookCalled = false;
                fixture.componentRef.setInput('pt', {
                    hooks: {
                        onDestroy: () => {
                            hookCalled = true;
                        }
                    }
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.destroy();

                expect(hookCalled).toBe(true);
            });
        });
    });
});
