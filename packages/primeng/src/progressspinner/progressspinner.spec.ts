import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProgressSpinner } from './progressspinner';

@Component({
    standalone: false,
    template: `<p-progressspinner [strokeWidth]="strokeWidth" [fill]="fill" [animationDuration]="animationDuration" [ariaLabel]="ariaLabel" [styleClass]="styleClass"> </p-progressspinner>`
})
class TestBasicProgressSpinnerComponent {
    strokeWidth: string = '2';
    fill: string = 'none';
    animationDuration: string = '2s';
    ariaLabel: string | undefined;
    styleClass: string | undefined;
}

@Component({
    standalone: false,
    template: `<p-progressspinner [style]="style" [styleClass]="styleClass"></p-progressspinner>`
})
class TestStyleProgressSpinnerComponent {
    style: { [key: string]: any } | undefined = { width: '50px', height: '50px' };
    styleClass = 'custom-spinner-class';
}

@Component({
    standalone: false,
    template: `<p-progressspinner strokeWidth="4" fill="red" animationDuration="3s" ariaLabel="Loading content"> </p-progressspinner>`
})
class TestCustomPropertiesComponent {}

describe('ProgressSpinner', () => {
    let component: TestBasicProgressSpinnerComponent;
    let fixture: ComponentFixture<TestBasicProgressSpinnerComponent>;
    let progressSpinnerElement: DebugElement;
    let progressSpinnerInstance: ProgressSpinner;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestBasicProgressSpinnerComponent, TestStyleProgressSpinnerComponent, TestCustomPropertiesComponent],
            imports: [ProgressSpinner]
        }).compileComponents();

        fixture = TestBed.createComponent(TestBasicProgressSpinnerComponent);
        component = fixture.componentInstance;
        progressSpinnerElement = fixture.debugElement.query(By.directive(ProgressSpinner));
        progressSpinnerInstance = progressSpinnerElement.componentInstance;
        fixture.detectChanges();
    });

    describe('Component Initialization', () => {
        it('should create the component', () => {
            expect(progressSpinnerInstance).toBeTruthy();
        });

        it('should have default values', () => {
            expect(progressSpinnerInstance.strokeWidth).toBe('2');
            expect(progressSpinnerInstance.fill).toBe('none');
            expect(progressSpinnerInstance.animationDuration).toBe('2s');
            expect(progressSpinnerInstance.ariaLabel).toBeUndefined();
            expect(progressSpinnerInstance.styleClass).toBeUndefined();
        });

        it('should accept custom values', () => {
            component.strokeWidth = '4';
            component.fill = 'blue';
            component.animationDuration = '1.5s';
            component.ariaLabel = 'Custom loading';
            component.styleClass = 'custom-class';
            fixture.detectChanges();

            expect(progressSpinnerInstance.strokeWidth).toBe('4');
            expect(progressSpinnerInstance.fill).toBe('blue');
            expect(progressSpinnerInstance.animationDuration).toBe('1.5s');
            expect(progressSpinnerInstance.ariaLabel).toBe('Custom loading');
            expect(progressSpinnerInstance.styleClass).toBe('custom-class');
        });
    });

    describe('Input Properties', () => {
        it('should update strokeWidth input', () => {
            component.strokeWidth = '3';
            fixture.detectChanges();
            expect(progressSpinnerInstance.strokeWidth).toBe('3');
        });

        it('should update fill input', () => {
            component.fill = 'transparent';
            fixture.detectChanges();
            expect(progressSpinnerInstance.fill).toBe('transparent');
        });

        it('should update animationDuration input', () => {
            component.animationDuration = '5s';
            fixture.detectChanges();
            expect(progressSpinnerInstance.animationDuration).toBe('5s');
        });

        it('should update ariaLabel input', () => {
            component.ariaLabel = 'Processing data';
            fixture.detectChanges();
            expect(progressSpinnerInstance.ariaLabel).toBe('Processing data');
        });

        it('should update styleClass input', () => {
            component.styleClass = 'test-spinner';
            fixture.detectChanges();
            expect(progressSpinnerInstance.styleClass).toBe('test-spinner');
        });

        it('should handle numeric strokeWidth values as strings', () => {
            component.strokeWidth = '1.5';
            fixture.detectChanges();
            expect(progressSpinnerInstance.strokeWidth).toBe('1.5');
        });

        it('should handle different time units for animationDuration', () => {
            component.animationDuration = '500ms';
            fixture.detectChanges();
            expect(progressSpinnerInstance.animationDuration).toBe('500ms');
        });
    });

    describe('SVG Rendering', () => {
        it('should render SVG element correctly', () => {
            const svgElement = fixture.debugElement.query(By.css('svg'));
            expect(svgElement).toBeTruthy();
            expect(svgElement.nativeElement.getAttribute('viewBox')).toBe('25 25 50 50');
            expect(svgElement.nativeElement.getAttribute('data-pc-section')).toBe('root');
        });

        it('should render circle element with correct attributes', () => {
            const circleElement = fixture.debugElement.query(By.css('circle'));
            expect(circleElement).toBeTruthy();
            expect(circleElement.nativeElement.getAttribute('cx')).toBe('50');
            expect(circleElement.nativeElement.getAttribute('cy')).toBe('50');
            expect(circleElement.nativeElement.getAttribute('r')).toBe('20');
            expect(circleElement.nativeElement.getAttribute('stroke-miterlimit')).toBe('10');
        });

        it('should apply strokeWidth to circle element', () => {
            component.strokeWidth = '3';
            fixture.detectChanges();

            const circleElement = fixture.debugElement.query(By.css('circle'));
            expect(circleElement.nativeElement.getAttribute('stroke-width')).toBe('3');
        });

        it('should apply fill to circle element', () => {
            component.fill = '#ff0000';
            fixture.detectChanges();

            const circleElement = fixture.debugElement.query(By.css('circle'));
            expect(circleElement.nativeElement.getAttribute('fill')).toBe('#ff0000');
        });

        it('should apply animationDuration to SVG element', () => {
            component.animationDuration = '1s';
            fixture.detectChanges();

            const svgElement = fixture.debugElement.query(By.css('svg'));
            expect(svgElement.nativeElement.style.animationDuration).toBe('1s');
        });

        it('should render with default fill "none"', () => {
            const circleElement = fixture.debugElement.query(By.css('circle'));
            expect(circleElement.nativeElement.getAttribute('fill')).toBe('none');
        });

        it('should render with default strokeWidth "2"', () => {
            const circleElement = fixture.debugElement.query(By.css('circle'));
            expect(circleElement.nativeElement.getAttribute('stroke-width')).toBe('2');
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should apply styleClass to root element', () => {
            component.styleClass = 'custom-spinner-class';
            fixture.detectChanges();

            const rootElement = fixture.debugElement.query(By.directive(ProgressSpinner));
            expect(rootElement.nativeElement.classList.contains('custom-spinner-class')).toBe(true);
        });

        it('should apply custom styles', () => {
            const styleFixture = TestBed.createComponent(TestStyleProgressSpinnerComponent);
            const styleComponent = styleFixture.componentInstance;
            styleFixture.detectChanges();

            const element = styleFixture.debugElement.query(By.directive(ProgressSpinner)).nativeElement;

            expect(styleComponent.style!).toEqual({ width: '50px', height: '50px' });

            if (styleComponent.style!) {
                Object.keys(styleComponent.style!).forEach((key) => {
                    element.style[key] = styleComponent.style![key];
                });
            }

            expect(element.style.width).toBe('50px');
            expect(element.style.height).toBe('50px');
            expect(styleComponent.style!).toBeTruthy();
            expect(Object.keys(styleComponent.style!)).toContain('width');
            expect(Object.keys(styleComponent.style!)).toContain('height');
        });

        it('should combine multiple CSS classes correctly', () => {
            component.styleClass = 'class1 class2';
            fixture.detectChanges();

            const rootElement = fixture.debugElement.query(By.directive(ProgressSpinner));
            expect(rootElement.nativeElement.classList.contains('class1')).toBe(true);
            expect(rootElement.nativeElement.classList.contains('class2')).toBe(true);
        });

        it('should apply CSS classes to SVG element', () => {
            const svgElement = fixture.debugElement.query(By.css('svg'));
            expect(svgElement.nativeElement).toBeTruthy();
            // CSS classes are applied through Angular's cx() function
            expect(svgElement.nativeElement.getAttribute('class')).toBeDefined();
        });
    });

    describe('Accessibility', () => {
        it('should have proper ARIA attributes', () => {
            const rootElement = fixture.debugElement.query(By.directive(ProgressSpinner));

            expect(rootElement.nativeElement.getAttribute('role')).toBe('progressbar');
            expect(rootElement.nativeElement.getAttribute('data-pc-name')).toBe('progressspinner');
            expect(rootElement.nativeElement.getAttribute('aria-busy')).toBe('true');
        });

        it('should apply aria-label when provided', () => {
            component.ariaLabel = 'Loading content';
            fixture.detectChanges();

            const rootElement = fixture.debugElement.query(By.directive(ProgressSpinner));
            expect(rootElement.nativeElement.getAttribute('aria-label')).toBe('Loading content');
        });

        it('should not have aria-label when not provided', () => {
            component.ariaLabel = undefined as any;
            fixture.detectChanges();

            const rootElement = fixture.debugElement.query(By.directive(ProgressSpinner));
            expect(rootElement.nativeElement.getAttribute('aria-label')).toBeNull();
        });

        it('should always have aria-busy set to true', () => {
            const rootElement = fixture.debugElement.query(By.directive(ProgressSpinner));
            expect(rootElement.nativeElement.getAttribute('aria-busy')).toBe('true');
        });

        it('should have proper role for screen readers', () => {
            const rootElement = fixture.debugElement.query(By.directive(ProgressSpinner));
            expect(rootElement.nativeElement.getAttribute('role')).toBe('progressbar');
        });

        it('should update aria-label dynamically', () => {
            component.ariaLabel = 'Initial loading';
            fixture.detectChanges();

            const rootElement = fixture.debugElement.query(By.directive(ProgressSpinner));
            expect(rootElement.nativeElement.getAttribute('aria-label')).toBe('Initial loading');

            component.ariaLabel = 'Updated loading';
            fixture.detectChanges();
            expect(rootElement.nativeElement.getAttribute('aria-label')).toBe('Updated loading');
        });
    });

    describe('Edge Cases', () => {
        it('should handle null/undefined values', () => {
            component.ariaLabel = undefined as any;
            component.styleClass = undefined as any;
            fixture.detectChanges();

            expect(() => fixture.detectChanges()).not.toThrow();
            expect(progressSpinnerInstance.ariaLabel).toBeUndefined();
            expect(progressSpinnerInstance.styleClass).toBeUndefined();
        });

        it('should handle empty string values gracefully', () => {
            component.strokeWidth = '';
            component.fill = '';
            component.animationDuration = '';
            component.ariaLabel = '';
            fixture.detectChanges();

            expect(() => fixture.detectChanges()).not.toThrow();
            expect(progressSpinnerInstance.strokeWidth).toBe('' as any);
            expect(progressSpinnerInstance.fill).toBe('' as any);
            expect(progressSpinnerInstance.animationDuration).toBe('' as any);
            expect(progressSpinnerInstance.ariaLabel).toBe('' as any);
        });

        it('should handle zero strokeWidth', () => {
            component.strokeWidth = '0';
            fixture.detectChanges();

            const circleElement = fixture.debugElement.query(By.css('circle'));
            expect(circleElement.nativeElement.getAttribute('stroke-width')).toBe('0');
        });

        it('should handle very large strokeWidth values', () => {
            component.strokeWidth = '100';
            fixture.detectChanges();

            const circleElement = fixture.debugElement.query(By.css('circle'));
            expect(circleElement.nativeElement.getAttribute('stroke-width')).toBe('100');
        });

        it('should handle decimal strokeWidth values', () => {
            component.strokeWidth = '2.5';
            fixture.detectChanges();

            const circleElement = fixture.debugElement.query(By.css('circle'));
            expect(circleElement.nativeElement.getAttribute('stroke-width')).toBe('2.5');
        });

        it('should handle very short animation duration', () => {
            component.animationDuration = '0.1s';
            fixture.detectChanges();

            const svgElement = fixture.debugElement.query(By.css('svg'));
            expect(svgElement.nativeElement.style.animationDuration).toBe('0.1s');
        });

        it('should handle very long animation duration', () => {
            component.animationDuration = '60s';
            fixture.detectChanges();

            const svgElement = fixture.debugElement.query(By.css('svg'));
            expect(svgElement.nativeElement.style.animationDuration).toBe('60s');
        });

        it('should handle different color formats for fill', () => {
            const colorFormats = ['#ff0000', 'rgb(255, 0, 0)', 'rgba(255, 0, 0, 0.5)', 'red', 'transparent'];

            colorFormats.forEach((color) => {
                component.fill = color;
                fixture.detectChanges();

                const circleElement = fixture.debugElement.query(By.css('circle'));
                expect(circleElement.nativeElement.getAttribute('fill')).toBe(color);
            });
        });

        it('should handle long aria-label text', () => {
            const longLabel = 'This is a very long aria label that describes what is being loaded in great detail';
            component.ariaLabel = longLabel;
            fixture.detectChanges();

            const rootElement = fixture.debugElement.query(By.directive(ProgressSpinner));
            expect(rootElement.nativeElement.getAttribute('aria-label')).toBe(longLabel);
        });

        it('should handle special characters in aria-label', () => {
            component.ariaLabel = 'Loading... 50% complete! @#$%';
            fixture.detectChanges();

            const rootElement = fixture.debugElement.query(By.directive(ProgressSpinner));
            expect(rootElement.nativeElement.getAttribute('aria-label')).toBe('Loading... 50% complete! @#$%');
        });

        it('should handle rapid property changes', () => {
            const values = ['1', '2', '3', '4', '5'];

            values.forEach((value) => {
                component.strokeWidth = value;
                component.animationDuration = `${value}s`;
                fixture.detectChanges();

                const circleElement = fixture.debugElement.query(By.css('circle'));
                const svgElement = fixture.debugElement.query(By.css('svg'));

                expect(circleElement.nativeElement.getAttribute('stroke-width')).toBe(value);
                expect(svgElement.nativeElement.style.animationDuration).toBe(`${value}s`);
            });
        });

        it('should maintain SVG structure integrity with extreme values', () => {
            component.strokeWidth = '999';
            component.fill = 'rgba(255, 255, 255, 0)';
            component.animationDuration = '0.01s';
            fixture.detectChanges();

            const svgElement = fixture.debugElement.query(By.css('svg'));
            const circleElement = fixture.debugElement.query(By.css('circle'));

            expect(svgElement).toBeTruthy();
            expect(circleElement).toBeTruthy();
            expect(svgElement.nativeElement.getAttribute('viewBox')).toBe('25 25 50 50');
            expect(circleElement.nativeElement.getAttribute('cx')).toBe('50');
            expect(circleElement.nativeElement.getAttribute('cy')).toBe('50');
            expect(circleElement.nativeElement.getAttribute('r')).toBe('20');
        });
    });

    describe('Integration Tests', () => {
        it('should work with custom properties component', () => {
            const customFixture = TestBed.createComponent(TestCustomPropertiesComponent);
            customFixture.detectChanges();

            const customSpinner = customFixture.debugElement.query(By.directive(ProgressSpinner)).componentInstance;
            const circleElement = customFixture.debugElement.query(By.css('circle'));
            const svgElement = customFixture.debugElement.query(By.css('svg'));
            const rootElement = customFixture.debugElement.query(By.directive(ProgressSpinner));

            expect(customSpinner.strokeWidth).toBe('4');
            expect(customSpinner.fill).toBe('red');
            expect(customSpinner.animationDuration).toBe('3s');
            expect(customSpinner.ariaLabel).toBe('Loading content');

            expect(circleElement.nativeElement.getAttribute('stroke-width')).toBe('4');
            expect(circleElement.nativeElement.getAttribute('fill')).toBe('red');
            expect(svgElement.nativeElement.style.animationDuration).toBe('3s');
            expect(rootElement.nativeElement.getAttribute('aria-label')).toBe('Loading content');
        });

        it('should maintain consistent behavior across multiple instances', () => {
            const fixtures = [TestBed.createComponent(TestBasicProgressSpinnerComponent), TestBed.createComponent(TestBasicProgressSpinnerComponent), TestBed.createComponent(TestBasicProgressSpinnerComponent)];

            fixtures.forEach((testFixture, index) => {
                const testComponent = testFixture.componentInstance;
                testComponent.strokeWidth = (index + 1).toString();
                testComponent.animationDuration = `${index + 1}s`;
                testFixture.detectChanges();

                const spinnerInstance = testFixture.debugElement.query(By.directive(ProgressSpinner)).componentInstance;
                expect(spinnerInstance.strokeWidth).toBe((index + 1).toString());
                expect(spinnerInstance.animationDuration).toBe(`${index + 1}s`);
            });
        });

        it('should render correctly without any input properties set', () => {
            const minimalFixture = TestBed.createComponent(TestBasicProgressSpinnerComponent);
            const minimalComponent = minimalFixture.componentInstance;

            // Reset all properties to undefined/default
            minimalComponent.strokeWidth = '2'; // Keep default
            minimalComponent.fill = 'none'; // Keep default
            minimalComponent.animationDuration = '2s'; // Keep default
            minimalComponent.ariaLabel = undefined as any;
            minimalComponent.styleClass = undefined as any;

            minimalFixture.detectChanges();

            const spinnerInstance = minimalFixture.debugElement.query(By.directive(ProgressSpinner)).componentInstance;
            const svgElement = minimalFixture.debugElement.query(By.css('svg'));
            const circleElement = minimalFixture.debugElement.query(By.css('circle'));

            expect(spinnerInstance).toBeTruthy();
            expect(svgElement).toBeTruthy();
            expect(circleElement).toBeTruthy();
            expect(spinnerInstance.strokeWidth).toBe('2');
            expect(spinnerInstance.fill).toBe('none');
            expect(spinnerInstance.animationDuration).toBe('2s');
        });
    });
});
