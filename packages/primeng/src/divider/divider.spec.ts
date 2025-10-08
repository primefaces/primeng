import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import { Divider, DividerModule } from './divider';

@Component({
    standalone: false,
    template: ` <p-divider></p-divider> `
})
class TestBasicDividerComponent {}

@Component({
    standalone: false,
    template: `
        <p-divider [layout]="layout" [type]="type" [align]="align" [styleClass]="styleClass">
            <div class="custom-content">Custom Divider Content</div>
        </p-divider>
    `
})
class TestCustomDividerComponent {
    layout: 'horizontal' | 'vertical' | undefined = 'horizontal';
    type: 'solid' | 'dashed' | 'dotted' | undefined = 'solid';
    align: 'left' | 'center' | 'right' | 'top' | 'bottom' | undefined;
    styleClass: string | undefined;
}

@Component({
    standalone: false,
    template: `
        <p-divider layout="horizontal" type="solid" align="left">
            <b>Left Aligned</b>
        </p-divider>
        <p-divider layout="horizontal" type="dashed" align="center">
            <b>Center Aligned</b>
        </p-divider>
        <p-divider layout="horizontal" type="dotted" align="right">
            <b>Right Aligned</b>
        </p-divider>
    `
})
class TestHorizontalDividerComponent {}

@Component({
    standalone: false,
    template: `
        <div style="height: 200px; display: flex;">
            <div>Left Content</div>
            <p-divider layout="vertical" type="solid" align="top">
                <b>Top</b>
            </p-divider>
            <div>Middle Content</div>
            <p-divider layout="vertical" type="dashed" align="center">
                <b>Center</b>
            </p-divider>
            <div>Right Content</div>
            <p-divider layout="vertical" type="dotted" align="bottom">
                <b>Bottom</b>
            </p-divider>
            <div>End Content</div>
        </div>
    `
})
class TestVerticalDividerComponent {}

@Component({
    standalone: false,
    template: `
        <p-divider>
            <div class="content-with-icon">
                <i class="pi pi-star"></i>
                <span>Complex Content</span>
                <button type="button" class="test-button">Action</button>
            </div>
        </p-divider>
    `
})
class TestComplexContentDividerComponent {}

@Component({
    standalone: false,
    template: `
        <p-divider [layout]="layout" [type]="type" [align]="align">
            <span>Dynamic Content</span>
        </p-divider>
    `
})
class TestDynamicDividerComponent {
    layout: 'horizontal' | 'vertical' = 'horizontal';
    type: 'solid' | 'dashed' | 'dotted' = 'solid';
    align: 'left' | 'center' | 'right' | 'top' | 'bottom' | undefined = 'center';
}

describe('Divider', () => {
    let fixture: ComponentFixture<TestBasicDividerComponent>;
    let component: TestBasicDividerComponent;
    let dividerEl: DebugElement;
    let divider: Divider;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [DividerModule, NoopAnimationsModule],
            declarations: [TestBasicDividerComponent, TestCustomDividerComponent, TestHorizontalDividerComponent, TestVerticalDividerComponent, TestComplexContentDividerComponent, TestDynamicDividerComponent]
        });

        fixture = TestBed.createComponent(TestBasicDividerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        dividerEl = fixture.debugElement.query(By.directive(Divider));
        divider = dividerEl.componentInstance;
    });

    describe('Component Initialization', () => {
        it('should create the component', () => {
            expect(divider).toBeTruthy();
        });

        it('should have default values', () => {
            expect(divider.layout).toBe('horizontal');
            expect(divider.type).toBe('solid');
            expect(divider.align).toBeUndefined();
            expect(divider.styleClass).toBeUndefined();
        });

        it('should have correct host attributes', () => {
            expect(dividerEl.nativeElement.getAttribute('role')).toBe('separator');
            expect(dividerEl.nativeElement.getAttribute('data-pc-name')).toBe('divider');
            expect(dividerEl.nativeElement.getAttribute('aria-orientation')).toBe('horizontal');
        });

        it('should have correct CSS classes', () => {
            expect(dividerEl.nativeElement.className).toContain('p-divider');
            expect(dividerEl.nativeElement.className).toContain('p-component');
            expect(dividerEl.nativeElement.className).toContain('p-divider-horizontal');
            expect(dividerEl.nativeElement.className).toContain('p-divider-solid');
        });

        it('should render content container', () => {
            const contentElement = dividerEl.query(By.css('.p-divider-content'));
            expect(contentElement).toBeTruthy();
        });
    });

    describe('Layout Property', () => {
        let customFixture: ComponentFixture<TestCustomDividerComponent>;
        let customComponent: TestCustomDividerComponent;

        beforeEach(() => {
            customFixture = TestBed.createComponent(TestCustomDividerComponent);
            customComponent = customFixture.componentInstance;
        });

        it('should apply horizontal layout by default', () => {
            customFixture.detectChanges();
            const dividerElement = customFixture.debugElement.query(By.directive(Divider));

            expect(dividerElement.nativeElement.className).toContain('p-divider-horizontal');
            expect(dividerElement.nativeElement.getAttribute('aria-orientation')).toBe('horizontal');
        });

        it('should apply vertical layout when specified', () => {
            customComponent.layout = 'vertical';
            customFixture.detectChanges();
            const dividerElement = customFixture.debugElement.query(By.directive(Divider));

            expect(dividerElement.nativeElement.className).toContain('p-divider-vertical');
            expect(dividerElement.nativeElement.getAttribute('aria-orientation')).toBe('vertical');
        });

        it('should switch between layouts dynamically', () => {
            customFixture.detectChanges();
            let dividerElement = customFixture.debugElement.query(By.directive(Divider));

            // Initially horizontal
            expect(dividerElement.nativeElement.className).toContain('p-divider-horizontal');

            // Change to vertical
            customComponent.layout = 'vertical';
            customFixture.detectChanges();

            expect(dividerElement.nativeElement.className).toContain('p-divider-vertical');
            expect(dividerElement.nativeElement.className).not.toContain('p-divider-horizontal');
        });
    });

    describe('Type Property', () => {
        let customFixture: ComponentFixture<TestCustomDividerComponent>;
        let customComponent: TestCustomDividerComponent;

        beforeEach(() => {
            customFixture = TestBed.createComponent(TestCustomDividerComponent);
            customComponent = customFixture.componentInstance;
        });

        it('should apply solid type by default', () => {
            customFixture.detectChanges();
            const dividerElement = customFixture.debugElement.query(By.directive(Divider));

            expect(dividerElement.nativeElement.className).toContain('p-divider-solid');
        });

        it('should apply dashed type when specified', () => {
            customComponent.type = 'dashed';
            customFixture.detectChanges();
            const dividerElement = customFixture.debugElement.query(By.directive(Divider));

            expect(dividerElement.nativeElement.className).toContain('p-divider-dashed');
            expect(dividerElement.nativeElement.className).not.toContain('p-divider-solid');
        });

        it('should apply dotted type when specified', () => {
            customComponent.type = 'dotted';
            customFixture.detectChanges();
            const dividerElement = customFixture.debugElement.query(By.directive(Divider));

            expect(dividerElement.nativeElement.className).toContain('p-divider-dotted');
        });

        it('should switch between types dynamically', () => {
            customFixture.detectChanges();
            let dividerElement = customFixture.debugElement.query(By.directive(Divider));

            // Initially solid
            expect(dividerElement.nativeElement.className).toContain('p-divider-solid');

            // Change to dashed
            customComponent.type = 'dashed';
            customFixture.detectChanges();
            expect(dividerElement.nativeElement.className).toContain('p-divider-dashed');

            // Change to dotted
            customComponent.type = 'dotted';
            customFixture.detectChanges();
            expect(dividerElement.nativeElement.className).toContain('p-divider-dotted');
        });
    });

    describe('Alignment Property', () => {
        let customFixture: ComponentFixture<TestCustomDividerComponent>;
        let customComponent: TestCustomDividerComponent;

        beforeEach(() => {
            customFixture = TestBed.createComponent(TestCustomDividerComponent);
            customComponent = customFixture.componentInstance;
        });

        describe('Horizontal Alignment', () => {
            it('should default to left alignment for horizontal layout', () => {
                customComponent.layout = 'horizontal';
                customFixture.detectChanges();
                const dividerElement = customFixture.debugElement.query(By.directive(Divider));

                expect(dividerElement.nativeElement.className).toContain('p-divider-left');
            });

            it('should apply left alignment for horizontal layout', () => {
                customComponent.layout = 'horizontal';
                customComponent.align = 'left';
                customFixture.detectChanges();
                const dividerElement = customFixture.debugElement.query(By.directive(Divider));

                expect(dividerElement.nativeElement.className).toContain('p-divider-left');
            });

            it('should apply center alignment for horizontal layout', () => {
                customComponent.layout = 'horizontal';
                customComponent.align = 'center';
                customFixture.detectChanges();
                const dividerElement = customFixture.debugElement.query(By.directive(Divider));

                expect(dividerElement.nativeElement.className).toContain('p-divider-center');
            });

            it('should apply right alignment for horizontal layout', () => {
                customComponent.layout = 'horizontal';
                customComponent.align = 'right';
                customFixture.detectChanges();
                const dividerElement = customFixture.debugElement.query(By.directive(Divider));

                expect(dividerElement.nativeElement.className).toContain('p-divider-right');
            });
        });

        describe('Vertical Alignment', () => {
            it('should default to center alignment for vertical layout', () => {
                customComponent.layout = 'vertical';
                customFixture.detectChanges();
                const dividerElement = customFixture.debugElement.query(By.directive(Divider));

                expect(dividerElement.nativeElement.className).toContain('p-divider-center');
            });

            it('should apply top alignment for vertical layout', () => {
                customComponent.layout = 'vertical';
                customComponent.align = 'top';
                customFixture.detectChanges();
                const dividerElement = customFixture.debugElement.query(By.directive(Divider));

                expect(dividerElement.nativeElement.className).toContain('p-divider-top');
            });

            it('should apply center alignment for vertical layout', () => {
                customComponent.layout = 'vertical';
                customComponent.align = 'center';
                customFixture.detectChanges();
                const dividerElement = customFixture.debugElement.query(By.directive(Divider));

                expect(dividerElement.nativeElement.className).toContain('p-divider-center');
            });

            it('should apply bottom alignment for vertical layout', () => {
                customComponent.layout = 'vertical';
                customComponent.align = 'bottom';
                customFixture.detectChanges();
                const dividerElement = customFixture.debugElement.query(By.directive(Divider));

                expect(dividerElement.nativeElement.className).toContain('p-divider-bottom');
            });
        });

        it('should have correct inline styles for alignment', () => {
            customComponent.layout = 'horizontal';
            customComponent.align = 'left';
            customFixture.detectChanges();

            const dividerElement = customFixture.debugElement.query(By.directive(Divider));
            const computedStyle = window.getComputedStyle(dividerElement.nativeElement);

            // The inline styles should be applied via the style attribute
            expect(dividerElement.nativeElement.style.justifyContent || computedStyle.justifyContent).toBeTruthy();
        });
    });

    describe('Content Projection', () => {
        it('should project content correctly', () => {
            const customFixture = TestBed.createComponent(TestCustomDividerComponent);
            customFixture.detectChanges();

            const contentElement = customFixture.debugElement.query(By.css('.custom-content'));
            expect(contentElement).toBeTruthy();
            expect(contentElement.nativeElement.textContent).toContain('Custom Divider Content');
        });

        it('should handle no content gracefully', () => {
            fixture.detectChanges();
            const contentContainer = dividerEl.query(By.css('.p-divider-content'));

            expect(contentContainer).toBeTruthy();
            expect(contentContainer.nativeElement.textContent.trim()).toBe('' as any);
        });

        it('should handle complex content', () => {
            const complexFixture = TestBed.createComponent(TestComplexContentDividerComponent);
            complexFixture.detectChanges();

            const contentWithIcon = complexFixture.debugElement.query(By.css('.content-with-icon'));
            const icon = complexFixture.debugElement.query(By.css('.pi-star'));
            const button = complexFixture.debugElement.query(By.css('.test-button'));

            expect(contentWithIcon).toBeTruthy();
            expect(icon).toBeTruthy();
            expect(button).toBeTruthy();
            expect(button.nativeElement.textContent).toBe('Action');
        });
    });

    describe('Style Class Property', () => {
        let customFixture: ComponentFixture<TestCustomDividerComponent>;
        let customComponent: TestCustomDividerComponent;

        beforeEach(() => {
            customFixture = TestBed.createComponent(TestCustomDividerComponent);
            customComponent = customFixture.componentInstance;
        });

        it('should apply custom style class', () => {
            customComponent.styleClass = 'my-custom-class';
            customFixture.detectChanges();

            const dividerElement = customFixture.debugElement.query(By.directive(Divider));
            expect(dividerElement.nativeElement.className).toContain('my-custom-class');
        });

        it('should apply multiple custom style classes', () => {
            customComponent.styleClass = 'class-one class-two';
            customFixture.detectChanges();

            const dividerElement = customFixture.debugElement.query(By.directive(Divider));
            expect(dividerElement.nativeElement.className).toContain('class-one');
            expect(dividerElement.nativeElement.className).toContain('class-two');
        });

        it('should update style class dynamically', () => {
            customFixture.detectChanges();
            let dividerElement = customFixture.debugElement.query(By.directive(Divider));

            // Initially no custom class
            expect(dividerElement.nativeElement.className).not.toContain('dynamic-class');

            // Add custom class
            customComponent.styleClass = 'dynamic-class';
            customFixture.detectChanges();
            expect(dividerElement.nativeElement.className).toContain('dynamic-class');
        });
    });

    describe('Accessibility', () => {
        it('should have correct ARIA role', () => {
            expect(dividerEl.nativeElement.getAttribute('role')).toBe('separator');
        });

        it('should have correct aria-orientation for horizontal layout', () => {
            const customFixture = TestBed.createComponent(TestCustomDividerComponent);
            const customComponent = customFixture.componentInstance;
            customComponent.layout = 'horizontal';
            customFixture.detectChanges();

            const dividerElement = customFixture.debugElement.query(By.directive(Divider));
            expect(dividerElement.nativeElement.getAttribute('aria-orientation')).toBe('horizontal');
        });

        it('should have correct aria-orientation for vertical layout', () => {
            const customFixture = TestBed.createComponent(TestCustomDividerComponent);
            const customComponent = customFixture.componentInstance;
            customComponent.layout = 'vertical';
            customFixture.detectChanges();

            const dividerElement = customFixture.debugElement.query(By.directive(Divider));
            expect(dividerElement.nativeElement.getAttribute('aria-orientation')).toBe('vertical');
        });

        it('should update aria-orientation dynamically', () => {
            const customFixture = TestBed.createComponent(TestCustomDividerComponent);
            const customComponent = customFixture.componentInstance;
            customFixture.detectChanges();

            let dividerElement = customFixture.debugElement.query(By.directive(Divider));

            // Initially horizontal
            expect(dividerElement.nativeElement.getAttribute('aria-orientation')).toBe('horizontal');

            // Change to vertical
            customComponent.layout = 'vertical';
            customFixture.detectChanges();
            expect(dividerElement.nativeElement.getAttribute('aria-orientation')).toBe('vertical');
        });
    });

    describe('Multiple Dividers', () => {
        it('should render multiple horizontal dividers correctly', () => {
            const horizontalFixture = TestBed.createComponent(TestHorizontalDividerComponent);
            horizontalFixture.detectChanges();

            const dividers = horizontalFixture.debugElement.queryAll(By.directive(Divider));
            expect(dividers.length).toBe(3);

            // Check different alignments
            expect(dividers[0].nativeElement.className).toContain('p-divider-left');
            expect(dividers[1].nativeElement.className).toContain('p-divider-center');
            expect(dividers[2].nativeElement.className).toContain('p-divider-right');

            // Check different types
            expect(dividers[0].nativeElement.className).toContain('p-divider-solid');
            expect(dividers[1].nativeElement.className).toContain('p-divider-dashed');
            expect(dividers[2].nativeElement.className).toContain('p-divider-dotted');
        });

        it('should render multiple vertical dividers correctly', () => {
            const verticalFixture = TestBed.createComponent(TestVerticalDividerComponent);
            verticalFixture.detectChanges();

            const dividers = verticalFixture.debugElement.queryAll(By.directive(Divider));
            expect(dividers.length).toBe(3);

            // All should be vertical
            dividers.forEach((divider) => {
                expect(divider.nativeElement.className).toContain('p-divider-vertical');
                expect(divider.nativeElement.getAttribute('aria-orientation')).toBe('vertical');
            });

            // Check different alignments
            expect(dividers[0].nativeElement.className).toContain('p-divider-top');
            expect(dividers[1].nativeElement.className).toContain('p-divider-center');
            expect(dividers[2].nativeElement.className).toContain('p-divider-bottom');
        });
    });

    describe('Dynamic Property Changes', () => {
        let dynamicFixture: ComponentFixture<TestDynamicDividerComponent>;
        let dynamicComponent: TestDynamicDividerComponent;

        beforeEach(() => {
            dynamicFixture = TestBed.createComponent(TestDynamicDividerComponent);
            dynamicComponent = dynamicFixture.componentInstance;
            dynamicFixture.detectChanges();
        });

        it('should handle dynamic layout changes', () => {
            let dividerElement = dynamicFixture.debugElement.query(By.directive(Divider));

            // Initially horizontal
            expect(dividerElement.nativeElement.className).toContain('p-divider-horizontal');
            expect(dividerElement.nativeElement.getAttribute('aria-orientation')).toBe('horizontal');

            // Change to vertical
            dynamicComponent.layout = 'vertical';
            dynamicFixture.detectChanges();

            expect(dividerElement.nativeElement.className).toContain('p-divider-vertical');
            expect(dividerElement.nativeElement.className).not.toContain('p-divider-horizontal');
            expect(dividerElement.nativeElement.getAttribute('aria-orientation')).toBe('vertical');
        });

        it('should handle dynamic type changes', () => {
            let dividerElement = dynamicFixture.debugElement.query(By.directive(Divider));

            // Initially solid
            expect(dividerElement.nativeElement.className).toContain('p-divider-solid');

            // Change to dashed
            dynamicComponent.type = 'dashed';
            dynamicFixture.detectChanges();
            expect(dividerElement.nativeElement.className).toContain('p-divider-dashed');
            expect(dividerElement.nativeElement.className).not.toContain('p-divider-solid');

            // Change to dotted
            dynamicComponent.type = 'dotted';
            dynamicFixture.detectChanges();
            expect(dividerElement.nativeElement.className).toContain('p-divider-dotted');
            expect(dividerElement.nativeElement.className).not.toContain('p-divider-dashed');
        });

        it('should handle dynamic align changes', () => {
            let dividerElement = dynamicFixture.debugElement.query(By.directive(Divider));

            // Initially center
            expect(dividerElement.nativeElement.className).toContain('p-divider-center');

            // Change to left
            dynamicComponent.align = 'left';
            dynamicFixture.detectChanges();
            expect(dividerElement.nativeElement.className).toContain('p-divider-left');
            expect(dividerElement.nativeElement.className).not.toContain('p-divider-center');

            // Change to right
            dynamicComponent.align = 'right';
            dynamicFixture.detectChanges();
            expect(dividerElement.nativeElement.className).toContain('p-divider-right');
            expect(dividerElement.nativeElement.className).not.toContain('p-divider-left');
        });

        it('should handle alignment changes with layout changes', () => {
            let dividerElement = dynamicFixture.debugElement.query(By.directive(Divider));

            // Start with horizontal center
            expect(dividerElement.nativeElement.className).toContain('p-divider-horizontal');
            expect(dividerElement.nativeElement.className).toContain('p-divider-center');

            // Change to vertical layout with top alignment
            dynamicComponent.layout = 'vertical';
            dynamicComponent.align = 'top';
            dynamicFixture.detectChanges();

            expect(dividerElement.nativeElement.className).toContain('p-divider-vertical');
            expect(dividerElement.nativeElement.className).toContain('p-divider-top');
            expect(dividerElement.nativeElement.className).not.toContain('p-divider-horizontal');
        });
    });

    describe('CSS Classes', () => {
        it('should have base CSS classes', () => {
            const dividerElement = dividerEl.nativeElement;

            expect(dividerElement.className).toContain('p-divider');
            expect(dividerElement.className).toContain('p-component');
        });

        it('should have layout-specific classes', () => {
            // Test horizontal
            expect(dividerEl.nativeElement.className).toContain('p-divider-horizontal');

            // Test vertical
            const customFixture = TestBed.createComponent(TestCustomDividerComponent);
            const customComponent = customFixture.componentInstance;
            customComponent.layout = 'vertical';
            customFixture.detectChanges();

            const verticalDivider = customFixture.debugElement.query(By.directive(Divider));
            expect(verticalDivider.nativeElement.className).toContain('p-divider-vertical');
        });

        it('should have type-specific classes', () => {
            const customFixture = TestBed.createComponent(TestCustomDividerComponent);
            const customComponent = customFixture.componentInstance;

            // Test solid
            customComponent.type = 'solid';
            customFixture.detectChanges();
            let dividerElement = customFixture.debugElement.query(By.directive(Divider));
            expect(dividerElement.nativeElement.className).toContain('p-divider-solid');

            // Test dashed
            customComponent.type = 'dashed';
            customFixture.detectChanges();
            expect(dividerElement.nativeElement.className).toContain('p-divider-dashed');

            // Test dotted
            customComponent.type = 'dotted';
            customFixture.detectChanges();
            expect(dividerElement.nativeElement.className).toContain('p-divider-dotted');
        });

        it('should have alignment-specific classes', () => {
            const customFixture = TestBed.createComponent(TestCustomDividerComponent);
            const customComponent = customFixture.componentInstance;

            // Test horizontal alignments
            customComponent.layout = 'horizontal';
            customComponent.align = 'left';
            customFixture.detectChanges();
            let dividerElement = customFixture.debugElement.query(By.directive(Divider));
            expect(dividerElement.nativeElement.className).toContain('p-divider-left');

            customComponent.align = 'center';
            customFixture.detectChanges();
            expect(dividerElement.nativeElement.className).toContain('p-divider-center');

            customComponent.align = 'right';
            customFixture.detectChanges();
            expect(dividerElement.nativeElement.className).toContain('p-divider-right');

            // Test vertical alignments
            customComponent.layout = 'vertical';
            customComponent.align = 'top';
            customFixture.detectChanges();
            expect(dividerElement.nativeElement.className).toContain('p-divider-top');

            customComponent.align = 'center';
            customFixture.detectChanges();
            expect(dividerElement.nativeElement.className).toContain('p-divider-center');

            customComponent.align = 'bottom';
            customFixture.detectChanges();
            expect(dividerElement.nativeElement.className).toContain('p-divider-bottom');
        });
    });

    describe('Data Attributes', () => {
        it('should have correct data-pc-name', () => {
            expect(dividerEl.nativeElement.getAttribute('data-pc-name')).toBe('divider');
        });

        it('should maintain data attributes after property changes', () => {
            const customFixture = TestBed.createComponent(TestCustomDividerComponent);
            const customComponent = customFixture.componentInstance;
            customFixture.detectChanges();

            let dividerElement = customFixture.debugElement.query(By.directive(Divider));
            expect(dividerElement.nativeElement.getAttribute('data-pc-name')).toBe('divider');

            // Change properties
            customComponent.layout = 'vertical';
            customComponent.type = 'dashed';
            customFixture.detectChanges();

            // Data attribute should remain
            expect(dividerElement.nativeElement.getAttribute('data-pc-name')).toBe('divider');
        });
    });

    describe('Edge Cases', () => {
        it('should handle undefined properties gracefully', () => {
            const customFixture = TestBed.createComponent(TestCustomDividerComponent);
            const customComponent = customFixture.componentInstance;

            customComponent.layout = undefined as any;
            customComponent.type = undefined as any;
            customComponent.align = undefined as any;
            customComponent.styleClass = undefined as any;

            expect(() => customFixture.detectChanges()).not.toThrow();

            const dividerElement = customFixture.debugElement.query(By.directive(Divider));
            expect(dividerElement).toBeTruthy();
        });

        it('should handle rapid property changes', () => {
            const customFixture = TestBed.createComponent(TestCustomDividerComponent);
            const customComponent = customFixture.componentInstance;
            customFixture.detectChanges();

            // Rapid changes
            customComponent.layout = 'vertical';
            customComponent.type = 'dashed';
            customComponent.align = 'top';
            customFixture.detectChanges();

            customComponent.layout = 'horizontal';
            customComponent.type = 'dotted';
            customComponent.align = 'right';
            customFixture.detectChanges();

            const dividerElement = customFixture.debugElement.query(By.directive(Divider));
            expect(dividerElement.nativeElement.className).toContain('p-divider-horizontal');
            expect(dividerElement.nativeElement.className).toContain('p-divider-dotted');
            expect(dividerElement.nativeElement.className).toContain('p-divider-right');
        });
    });

    describe('Memory Management', () => {
        it('should handle component cleanup', () => {
            expect(() => {
                fixture.destroy();
            }).not.toThrow();
        });

        it('should cleanup multiple dividers', () => {
            const horizontalFixture = TestBed.createComponent(TestHorizontalDividerComponent);
            horizontalFixture.detectChanges();

            expect(() => {
                horizontalFixture.destroy();
            }).not.toThrow();
        });

        it('should handle rapid creation and destruction', () => {
            for (let i = 0; i < 5; i++) {
                const testFixture = TestBed.createComponent(TestCustomDividerComponent);
                testFixture.detectChanges();
                testFixture.destroy();
            }

            // If we got here without errors, the test passes
            expect(true).toBe(true);
        });
    });

    describe('PassThrough (PT)', () => {
        describe('Case 1: Simple string classes', () => {
            it('should apply simple string class to root', () => {
                const ptFixture = TestBed.createComponent(Divider);
                ptFixture.componentRef.setInput('pt', { root: 'ROOT_CLASS' });
                ptFixture.detectChanges();

                expect(ptFixture.nativeElement.className).toContain('ROOT_CLASS');
            });

            it('should apply simple string class to content', () => {
                const ptFixture = TestBed.createComponent(Divider);
                ptFixture.componentRef.setInput('pt', { content: 'CONTENT_CLASS' });
                ptFixture.detectChanges();

                const contentElement = ptFixture.debugElement.query(By.css('.p-divider-content'));
                expect(contentElement?.nativeElement.className).toContain('CONTENT_CLASS');
            });

            it('should apply multiple simple string classes to different sections', () => {
                const ptFixture = TestBed.createComponent(Divider);
                ptFixture.componentRef.setInput('pt', {
                    root: 'ROOT_CLASS',
                    content: 'CONTENT_CLASS'
                });
                ptFixture.detectChanges();

                expect(ptFixture.nativeElement.className).toContain('ROOT_CLASS');
                const contentElement = ptFixture.debugElement.query(By.css('.p-divider-content'));
                expect(contentElement?.nativeElement.className).toContain('CONTENT_CLASS');
            });
        });

        describe('Case 2: Objects', () => {
            it('should apply object with class to root', () => {
                const ptFixture = TestBed.createComponent(Divider);
                ptFixture.componentRef.setInput('pt', {
                    root: {
                        class: 'OBJECT_CLASS'
                    }
                });
                ptFixture.detectChanges();

                expect(ptFixture.nativeElement.className).toContain('OBJECT_CLASS');
            });

            it('should apply object with style to root', () => {
                const ptFixture = TestBed.createComponent(Divider);
                ptFixture.componentRef.setInput('pt', {
                    root: {
                        style: { 'background-color': 'red' }
                    }
                });
                ptFixture.detectChanges();

                expect(ptFixture.nativeElement.style.backgroundColor).toBe('red');
            });

            it('should apply object with data attribute to root', () => {
                const ptFixture = TestBed.createComponent(Divider);
                ptFixture.componentRef.setInput('pt', {
                    root: {
                        'data-p-test': true
                    }
                });
                ptFixture.detectChanges();

                expect(ptFixture.nativeElement.getAttribute('data-p-test')).toBe('true');
            });

            it('should apply object with aria-label to root', () => {
                const ptFixture = TestBed.createComponent(Divider);
                ptFixture.componentRef.setInput('pt', {
                    root: {
                        'aria-label': 'TEST_ARIA_LABEL'
                    }
                });
                ptFixture.detectChanges();

                expect(ptFixture.nativeElement.getAttribute('aria-label')).toBe('TEST_ARIA_LABEL');
            });

            it('should apply multiple object properties to content', () => {
                const ptFixture = TestBed.createComponent(Divider);
                ptFixture.componentRef.setInput('pt', {
                    content: {
                        class: 'CONTENT_OBJECT_CLASS',
                        style: { color: 'blue' },
                        'data-test': 'value',
                        'aria-hidden': 'true'
                    }
                });
                ptFixture.detectChanges();

                const contentElement = ptFixture.debugElement.query(By.css('.p-divider-content'));
                expect(contentElement?.nativeElement.className).toContain('CONTENT_OBJECT_CLASS');
                expect(contentElement?.nativeElement.style.color).toBe('blue');
                expect(contentElement?.nativeElement.getAttribute('data-test')).toBe('value');
                expect(contentElement?.nativeElement.getAttribute('aria-hidden')).toBe('true');
            });
        });

        describe('Case 3: Mixed object and string values', () => {
            it('should apply mixed object and string values to different sections', () => {
                const ptFixture = TestBed.createComponent(Divider);
                ptFixture.componentRef.setInput('pt', {
                    root: {
                        class: 'ROOT_OBJECT_CLASS'
                    },
                    content: 'CONTENT_STRING_CLASS'
                });
                ptFixture.detectChanges();

                expect(ptFixture.nativeElement.className).toContain('ROOT_OBJECT_CLASS');
                const contentElement = ptFixture.debugElement.query(By.css('.p-divider-content'));
                expect(contentElement?.nativeElement.className).toContain('CONTENT_STRING_CLASS');
            });

            it('should handle string for root and object for content', () => {
                const ptFixture = TestBed.createComponent(Divider);
                ptFixture.componentRef.setInput('pt', {
                    root: 'ROOT_STRING_CLASS',
                    content: {
                        class: 'CONTENT_OBJECT_CLASS',
                        style: { 'font-weight': 'bold' }
                    }
                });
                ptFixture.detectChanges();

                expect(ptFixture.nativeElement.className).toContain('ROOT_STRING_CLASS');
                const contentElement = ptFixture.debugElement.query(By.css('.p-divider-content'));
                expect(contentElement?.nativeElement.className).toContain('CONTENT_OBJECT_CLASS');
                expect(contentElement?.nativeElement.style.fontWeight).toBe('bold');
            });
        });

        describe('Case 4: Use variables from instance', () => {
            it('should use instance layout property in PT function', () => {
                const ptFixture = TestBed.createComponent(Divider);
                ptFixture.componentRef.setInput('layout', 'vertical');
                ptFixture.componentRef.setInput('pt', {
                    root: ({ instance }) => {
                        return {
                            class: instance.layout === 'vertical' ? 'VERTICAL_LAYOUT' : ''
                        };
                    }
                });
                ptFixture.detectChanges();

                expect(ptFixture.nativeElement.className).toContain('VERTICAL_LAYOUT');
            });

            it('should use instance type property in PT function', () => {
                const ptFixture = TestBed.createComponent(Divider);
                ptFixture.componentRef.setInput('type', 'dashed');
                ptFixture.componentRef.setInput('pt', {
                    content: ({ instance }) => {
                        return {
                            style: {
                                'border-color': instance.type === 'dashed' ? 'yellow' : 'red'
                            }
                        };
                    }
                });
                ptFixture.detectChanges();

                const contentElement = ptFixture.debugElement.query(By.css('.p-divider-content'));
                expect(contentElement?.nativeElement.style.borderColor).toBe('yellow');
            });

            it('should use instance align property in PT function', () => {
                const ptFixture = TestBed.createComponent(Divider);
                ptFixture.componentRef.setInput('align', 'center');
                ptFixture.componentRef.setInput('pt', {
                    root: ({ instance }) => {
                        return {
                            class: instance.align === 'center' ? 'CENTERED' : ''
                        };
                    }
                });
                ptFixture.detectChanges();

                expect(ptFixture.nativeElement.className).toContain('CENTERED');
            });

            it('should use multiple instance properties in PT function', () => {
                const ptFixture = TestBed.createComponent(Divider);
                ptFixture.componentRef.setInput('layout', 'horizontal');
                ptFixture.componentRef.setInput('type', 'dotted');
                ptFixture.componentRef.setInput('pt', {
                    root: ({ instance }) => {
                        return {
                            class: instance.layout === 'horizontal' && instance.type === 'dotted' ? 'HORIZONTAL_DOTTED' : ''
                        };
                    }
                });
                ptFixture.detectChanges();

                expect(ptFixture.nativeElement.className).toContain('HORIZONTAL_DOTTED');
            });
        });

        describe('Case 5: Event binding', () => {
            it('should bind onclick event via PT', () => {
                const ptFixture = TestBed.createComponent(Divider);
                let clicked = false;
                ptFixture.componentRef.setInput('pt', {
                    root: {
                        onclick: () => {
                            clicked = true;
                        }
                    }
                });
                ptFixture.detectChanges();

                ptFixture.nativeElement.click();
                expect(clicked).toBe(true);
            });

            it('should bind onclick event to content via PT', () => {
                const ptFixture = TestBed.createComponent(Divider);
                let contentClicked = false;
                ptFixture.componentRef.setInput('pt', {
                    content: {
                        onclick: () => {
                            contentClicked = true;
                        }
                    }
                });
                ptFixture.detectChanges();

                const contentElement = ptFixture.debugElement.query(By.css('.p-divider-content'));
                contentElement?.nativeElement.click();
                expect(contentClicked).toBe(true);
            });

            it('should bind onclick event with instance reference', () => {
                const ptFixture = TestBed.createComponent(Divider);
                let instanceLayout = '';
                ptFixture.componentRef.setInput('layout', 'vertical');
                ptFixture.componentRef.setInput('pt', {
                    root: ({ instance }) => {
                        return {
                            onclick: () => {
                                instanceLayout = instance.layout || '';
                            }
                        };
                    }
                });
                ptFixture.detectChanges();

                ptFixture.nativeElement.click();
                expect(instanceLayout).toBe('vertical');
            });
        });

        describe('Case 6: Inline test', () => {
            it('should apply inline PT with string class', () => {
                @Component({
                    standalone: false,
                    template: `<p-divider [pt]="{ root: 'INLINE_ROOT_CLASS' }"></p-divider>`
                })
                class TestInlinePTStringComponent {}

                TestBed.resetTestingModule();
                TestBed.configureTestingModule({
                    imports: [DividerModule],
                    declarations: [TestInlinePTStringComponent]
                });

                const inlineFixture = TestBed.createComponent(TestInlinePTStringComponent);
                inlineFixture.detectChanges();

                const inlineDivider = inlineFixture.debugElement.query(By.directive(Divider));
                expect(inlineDivider.nativeElement.className).toContain('INLINE_ROOT_CLASS');
            });

            it('should apply inline PT with object class', () => {
                @Component({
                    standalone: false,
                    template: `<p-divider [pt]="{ root: { class: 'INLINE_OBJECT_CLASS' } }"></p-divider>`
                })
                class TestInlinePTObjectComponent {}

                TestBed.resetTestingModule();
                TestBed.configureTestingModule({
                    imports: [DividerModule],
                    declarations: [TestInlinePTObjectComponent]
                });

                const inlineFixture = TestBed.createComponent(TestInlinePTObjectComponent);
                inlineFixture.detectChanges();

                const inlineDivider = inlineFixture.debugElement.query(By.directive(Divider));
                expect(inlineDivider.nativeElement.className).toContain('INLINE_OBJECT_CLASS');
            });
        });

        describe('Case 7: Test from PrimeNGConfig', () => {
            @Component({
                standalone: false,
                template: `
                    <p-divider></p-divider>
                    <p-divider></p-divider>
                `
            })
            class TestGlobalPTComponent {}

            beforeEach(() => {
                TestBed.resetTestingModule();
                TestBed.configureTestingModule({
                    imports: [DividerModule],
                    declarations: [TestGlobalPTComponent],
                    providers: [
                        providePrimeNG({
                            pt: {
                                divider: {
                                    root: { 'aria-label': 'TEST_GLOBAL_ARIA_LABEL' },
                                    content: { class: 'GLOBAL_CONTENT_CLASS' }
                                }
                            }
                        })
                    ]
                });
            });

            it('should apply global PT configuration from PrimeNG config', () => {
                const globalFixture = TestBed.createComponent(TestGlobalPTComponent);
                globalFixture.detectChanges();

                const dividers = globalFixture.debugElement.queryAll(By.directive(Divider));
                expect(dividers.length).toBe(2);

                dividers.forEach((divider) => {
                    expect(divider.nativeElement.getAttribute('aria-label')).toBe('TEST_GLOBAL_ARIA_LABEL');
                });
            });

            it('should apply global PT to multiple instances of the component', () => {
                const globalFixture = TestBed.createComponent(TestGlobalPTComponent);
                globalFixture.detectChanges();

                const dividers = globalFixture.debugElement.queryAll(By.directive(Divider));
                dividers.forEach((divider) => {
                    expect(divider.nativeElement.getAttribute('aria-label')).toBe('TEST_GLOBAL_ARIA_LABEL');
                });
            });

            it('should merge local PT with global PT', () => {
                @Component({
                    standalone: false,
                    template: `<p-divider [pt]="{ root: { class: 'LOCAL_CLASS' } }"></p-divider>`
                })
                class TestMergedPTComponent {}

                TestBed.configureTestingModule({
                    declarations: [TestMergedPTComponent]
                });

                const mergedFixture = TestBed.createComponent(TestMergedPTComponent);
                mergedFixture.detectChanges();

                const dividerElement = mergedFixture.debugElement.query(By.directive(Divider));
                expect(dividerElement.nativeElement.className).toContain('LOCAL_CLASS');
                expect(dividerElement.nativeElement.getAttribute('aria-label')).toBe('TEST_GLOBAL_ARIA_LABEL');
            });
        });

        describe('Case 8: Test hooks', () => {
            it('should apply PT with root class configuration', () => {
                const ptFixture = TestBed.createComponent(Divider);
                ptFixture.componentRef.setInput('pt', {
                    root: 'MY_DIVIDER'
                });
                ptFixture.detectChanges();

                expect(ptFixture.nativeElement.className).toContain('MY_DIVIDER');
            });

            it('should apply PT with content class configuration', () => {
                const ptFixture = TestBed.createComponent(Divider);
                ptFixture.componentRef.setInput('pt', {
                    content: 'CONTENT_CLASS'
                });
                ptFixture.detectChanges();

                const contentElement = ptFixture.debugElement.query(By.css('.p-divider-content'));
                expect(contentElement?.nativeElement.className).toContain('CONTENT_CLASS');
            });

            it('should handle PT configuration changes', () => {
                const ptFixture = TestBed.createComponent(Divider);
                ptFixture.componentRef.setInput('pt', {
                    root: 'INITIAL_PT_CLASS'
                });
                ptFixture.detectChanges();
                expect(ptFixture.nativeElement.className).toContain('INITIAL_PT_CLASS');

                ptFixture.componentRef.setInput('pt', {
                    root: 'UPDATED_PT_CLASS'
                });
                ptFixture.detectChanges();
                expect(ptFixture.nativeElement.className).toContain('UPDATED_PT_CLASS');
            });
        });

        describe('PT Complex Scenarios', () => {
            it('should handle PT updates dynamically', () => {
                const ptFixture = TestBed.createComponent(Divider);
                ptFixture.componentRef.setInput('pt', { root: 'INITIAL_CLASS' });
                ptFixture.detectChanges();
                expect(ptFixture.nativeElement.className).toContain('INITIAL_CLASS');

                ptFixture.componentRef.setInput('pt', { root: 'UPDATED_CLASS' });
                ptFixture.detectChanges();
                expect(ptFixture.nativeElement.className).toContain('UPDATED_CLASS');
                expect(ptFixture.nativeElement.className).not.toContain('INITIAL_CLASS');
            });

            it('should combine PT with component inputs', () => {
                const ptFixture = TestBed.createComponent(Divider);
                ptFixture.componentRef.setInput('layout', 'vertical');
                ptFixture.componentRef.setInput('type', 'dashed');
                ptFixture.componentRef.setInput('pt', { root: 'CUSTOM_PT_CLASS' });
                ptFixture.detectChanges();

                expect(ptFixture.nativeElement.className).toContain('p-divider-vertical');
                expect(ptFixture.nativeElement.className).toContain('p-divider-dashed');
                expect(ptFixture.nativeElement.className).toContain('CUSTOM_PT_CLASS');
            });

            it('should apply PT to all sections simultaneously', () => {
                const ptFixture = TestBed.createComponent(Divider);
                ptFixture.componentRef.setInput('pt', {
                    root: 'PT_ROOT',
                    content: 'PT_CONTENT'
                });
                ptFixture.detectChanges();

                expect(ptFixture.nativeElement.className).toContain('PT_ROOT');
                const contentElement = ptFixture.debugElement.query(By.css('.p-divider-content'));
                expect(contentElement?.nativeElement.className).toContain('PT_CONTENT');
            });
        });
    });
});
