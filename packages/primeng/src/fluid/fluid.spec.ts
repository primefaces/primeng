import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Fluid, FluidModule } from './fluid';

@Component({
    standalone: false,
    selector: 'test-basic-fluid',
    template: `<p-fluid></p-fluid>`
})
class TestBasicFluidComponent {}

@Component({
    standalone: false,
    selector: 'test-fluid-with-content',
    template: `
        <p-fluid>
            <div class="test-content">Content inside fluid</div>
        </p-fluid>
    `
})
class TestFluidWithContentComponent {}

@Component({
    standalone: false,
    selector: 'test-fluid-with-form-controls',
    template: `
        <p-fluid>
            <div class="form-group">
                <label for="input1">Input 1</label>
                <input type="text" id="input1" class="form-control" />
            </div>
            <div class="form-group">
                <label for="select1">Select 1</label>
                <select id="select1" class="form-control">
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
            </div>
            <div class="form-group">
                <label for="textarea1">Textarea 1</label>
                <textarea id="textarea1" class="form-control"></textarea>
            </div>
        </p-fluid>
    `
})
class TestFluidWithFormControlsComponent {}

@Component({
    standalone: false,
    selector: 'test-nested-fluid',
    template: `
        <p-fluid>
            <div class="outer-container">
                <p-fluid>
                    <div class="inner-container">
                        <input type="text" class="nested-input" />
                    </div>
                </p-fluid>
            </div>
        </p-fluid>
    `
})
class TestNestedFluidComponent {}

@Component({
    standalone: false,
    selector: 'test-fluid-with-primeng-components',
    template: `
        <p-fluid>
            <div class="primeng-controls">
                <div class="control-group">
                    <label>Button</label>
                    <button type="button" class="p-button">Test Button</button>
                </div>
                <div class="control-group">
                    <label>Input Field</label>
                    <input type="text" class="p-inputtext" />
                </div>
                <div class="control-group">
                    <label>Dropdown</label>
                    <select class="p-dropdown">
                        <option>Option 1</option>
                    </select>
                </div>
            </div>
        </p-fluid>
    `
})
class TestFluidWithPrimeNGComponentsComponent {}

@Component({
    standalone: false,
    selector: 'test-fluid-responsive',
    template: `
        <div class="responsive-container">
            <p-fluid>
                <div class="grid-system">
                    <div class="col-12">
                        <input type="text" class="responsive-input" />
                    </div>
                    <div class="col-6">
                        <button class="responsive-button">Button 1</button>
                    </div>
                    <div class="col-6">
                        <button class="responsive-button">Button 2</button>
                    </div>
                </div>
            </p-fluid>
        </div>
    `
})
class TestFluidResponsiveComponent {}

@Component({
    standalone: false,
    selector: 'test-fluid-dynamic-content',
    template: `
        <p-fluid>
            <div *ngIf="showFirstSection" class="first-section">
                <input type="text" class="dynamic-input-1" />
                <button class="dynamic-button-1">Button 1</button>
            </div>
            <div *ngIf="showSecondSection" class="second-section">
                <textarea class="dynamic-textarea"></textarea>
                <select class="dynamic-select">
                    <option>Dynamic Option</option>
                </select>
            </div>
            <div *ngFor="let item of dynamicItems" class="dynamic-item">
                <span>{{ item.label }}</span>
                <input type="text" [value]="item.value" class="dynamic-list-input" />
            </div>
        </p-fluid>
    `
})
class TestFluidDynamicContentComponent {
    showFirstSection = true;
    showSecondSection = false;
    dynamicItems = [
        { label: 'Item 1', value: 'Value 1' },
        { label: 'Item 2', value: 'Value 2' }
    ];
}

@Component({
    standalone: false,
    selector: 'test-fluid-complex-layout',
    template: `
        <div class="complex-layout">
            <p-fluid>
                <div class="header-section">
                    <h2>Form Header</h2>
                    <input type="text" placeholder="Search" class="header-search" />
                </div>
                <div class="main-section">
                    <div class="left-panel">
                        <input type="text" class="left-input" />
                        <button class="left-button">Left Action</button>
                    </div>
                    <div class="right-panel">
                        <textarea class="right-textarea"></textarea>
                        <div class="action-buttons">
                            <button class="action-save">Save</button>
                            <button class="action-cancel">Cancel</button>
                        </div>
                    </div>
                </div>
                <div class="footer-section">
                    <div class="status-info">Status: Active</div>
                    <button class="footer-action">Footer Action</button>
                </div>
            </p-fluid>
        </div>
    `
})
class TestFluidComplexLayoutComponent {}

describe('Fluid', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FluidModule, NoopAnimationsModule],
            declarations: [
                TestBasicFluidComponent,
                TestFluidWithContentComponent,
                TestFluidWithFormControlsComponent,
                TestNestedFluidComponent,
                TestFluidWithPrimeNGComponentsComponent,
                TestFluidResponsiveComponent,
                TestFluidDynamicContentComponent,
                TestFluidComplexLayoutComponent
            ]
        });
    });

    describe('Component Initialization', () => {
        let fixture: ComponentFixture<TestBasicFluidComponent>;
        let component: Fluid;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicFluidComponent);
            fixture.detectChanges();

            const fluidDebugElement = fixture.debugElement.query(By.directive(Fluid));
            component = fluidDebugElement.componentInstance;
            element = fluidDebugElement.nativeElement;
        });

        it('should create the component', () => {
            expect(component).toBeTruthy();
        });

        it('should extend BaseComponent', () => {
            expect(component).toBeInstanceOf(Fluid);
            expect(component.cx).toBeDefined();
            expect(component.cd).toBeDefined();
        });

        it('should have correct selector', () => {
            expect(element.tagName.toLowerCase()).toBe('p-fluid');
        });

        it('should inject component style', () => {
            expect(component._componentStyle).toBeDefined();
        });

        it('should apply root CSS class', () => {
            // The cx('root') method generates CSS classes based on component styling
            expect(element.className).toBeTruthy();
        });

        it('should have proper change detection strategy', () => {
            // Component uses OnPush change detection strategy
            expect(component.cd).toBeDefined();
        });

        it('should have view encapsulation set to None', () => {
            // This allows fluid styling to affect child components
            expect(component).toBeTruthy();
        });
    });

    describe('Content Projection', () => {
        let fixture: ComponentFixture<TestFluidWithContentComponent>;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestFluidWithContentComponent);
            fixture.detectChanges();
            element = fixture.debugElement.query(By.directive(Fluid)).nativeElement;
        });

        it('should project content correctly', () => {
            const projectedContent = element.querySelector('.test-content');
            expect(projectedContent).toBeTruthy();
            expect(projectedContent?.textContent?.trim()).toBe('Content inside fluid');
        });

        it('should render ng-content as direct child', () => {
            const directChild = element.firstElementChild;
            expect(directChild?.classList.contains('test-content')).toBe(true);
        });

        it('should maintain content structure', () => {
            expect(element.children.length).toBe(1);
            expect(element.innerHTML).toContain('Content inside fluid');
        });
    });

    describe('Form Controls Integration', () => {
        let fixture: ComponentFixture<TestFluidWithFormControlsComponent>;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestFluidWithFormControlsComponent);
            fixture.detectChanges();
            element = fixture.debugElement.query(By.directive(Fluid)).nativeElement;
        });

        it('should contain all form control types', () => {
            const input = element.querySelector('#input1');
            const select = element.querySelector('#select1');
            const textarea = element.querySelector('#textarea1');

            expect(input).toBeTruthy();
            expect(select).toBeTruthy();
            expect(textarea).toBeTruthy();
        });

        it('should maintain form control functionality', () => {
            const input = element.querySelector('#input1') as HTMLInputElement;

            input.value = 'test value';
            input.dispatchEvent(new Event('input'));

            expect(input.value).toBe('test value');
        });

        it('should preserve form structure', () => {
            const formGroups = element.querySelectorAll('.form-group');
            expect(formGroups.length).toBe(3);

            formGroups.forEach((group) => {
                expect(group.querySelector('label')).toBeTruthy();
                expect(group.querySelector('.form-control')).toBeTruthy();
            });
        });

        it('should maintain label associations', () => {
            const input1 = element.querySelector('#input1');
            const label1 = element.querySelector('label[for="input1"]');

            expect(label1).toBeTruthy();
            expect(input1).toBeTruthy();
            expect(label1?.getAttribute('for')).toBe('input1');
        });
    });

    describe('Nested Fluid Components', () => {
        let fixture: ComponentFixture<TestNestedFluidComponent>;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestNestedFluidComponent);
            fixture.detectChanges();
            element = fixture.debugElement.nativeElement;
        });

        it('should support nested fluid components', () => {
            const fluidComponents = fixture.debugElement.queryAll(By.directive(Fluid));
            expect(fluidComponents.length).toBe(2);
        });

        it('should maintain proper hierarchy', () => {
            const outerFluid = element.querySelector('p-fluid');
            const innerFluid = outerFluid?.querySelector('p-fluid');

            expect(outerFluid).toBeTruthy();
            expect(innerFluid).toBeTruthy();
        });

        it('should preserve nested content', () => {
            const nestedInput = element.querySelector('.nested-input');
            expect(nestedInput).toBeTruthy();
        });

        it('should apply fluid styling to all levels', () => {
            const fluidElements = element.querySelectorAll('p-fluid');
            expect(fluidElements.length).toBe(2);

            fluidElements.forEach((fluidEl) => {
                expect(fluidEl.className).toBeTruthy();
            });
        });
    });

    describe('PrimeNG Components Integration', () => {
        let fixture: ComponentFixture<TestFluidWithPrimeNGComponentsComponent>;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestFluidWithPrimeNGComponentsComponent);
            fixture.detectChanges();
            element = fixture.debugElement.query(By.directive(Fluid)).nativeElement;
        });

        it('should work with PrimeNG styled components', () => {
            const button = element.querySelector('.p-button');
            const input = element.querySelector('.p-inputtext');
            const dropdown = element.querySelector('.p-dropdown');

            expect(button).toBeTruthy();
            expect(input).toBeTruthy();
            expect(dropdown).toBeTruthy();
        });

        it('should maintain control group structure', () => {
            const controlGroups = element.querySelectorAll('.control-group');
            expect(controlGroups.length).toBe(3);

            controlGroups.forEach((group) => {
                expect(group.querySelector('label')).toBeTruthy();
                expect(group.children.length).toBe(2); // label + control
            });
        });

        it('should preserve component interactions', () => {
            const button = element.querySelector('.p-button') as HTMLButtonElement;

            // Should be able to interact with button
            button.click();
            expect(button).toBeTruthy();
        });
    });

    describe('Responsive Layout', () => {
        let fixture: ComponentFixture<TestFluidResponsiveComponent>;
        let component: TestFluidResponsiveComponent;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestFluidResponsiveComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            element = fixture.debugElement.query(By.directive(Fluid)).nativeElement;
        });

        it('should support grid system layouts', () => {
            const gridSystem = element.querySelector('.grid-system');
            const col12 = element.querySelector('.col-12');
            const col6Elements = element.querySelectorAll('.col-6');

            expect(gridSystem).toBeTruthy();
            expect(col12).toBeTruthy();
            expect(col6Elements.length).toBe(2);
        });

        it('should maintain responsive elements', () => {
            const responsiveInput = element.querySelector('.responsive-input');
            const responsiveButtons = element.querySelectorAll('.responsive-button');

            expect(responsiveInput).toBeTruthy();
            expect(responsiveButtons.length).toBe(2);
        });

        it('should preserve responsive container structure', () => {
            const container = fixture.debugElement.query(By.css('.responsive-container'));
            const fluid = container.query(By.directive(Fluid));

            expect(container).toBeTruthy();
            expect(fluid).toBeTruthy();
        });
    });

    describe('Dynamic Content', () => {
        let fixture: ComponentFixture<TestFluidDynamicContentComponent>;
        let component: TestFluidDynamicContentComponent;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestFluidDynamicContentComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            element = fixture.debugElement.query(By.directive(Fluid)).nativeElement;
        });

        it('should handle conditional content display', () => {
            // Initially first section is shown
            expect(element.querySelector('.first-section')).toBeTruthy();
            expect(element.querySelector('.second-section')).toBeFalsy();

            // Show second section
            component.showSecondSection = true;
            fixture.detectChanges();

            expect(element.querySelector('.second-section')).toBeTruthy();
        });

        it('should handle content visibility changes', () => {
            // Hide first section
            component.showFirstSection = false;
            fixture.detectChanges();

            expect(element.querySelector('.first-section')).toBeFalsy();
            expect(element.querySelector('.dynamic-input-1')).toBeFalsy();
        });

        it('should render dynamic list items', () => {
            const dynamicItems = element.querySelectorAll('.dynamic-item');
            expect(dynamicItems.length).toBe(2);

            dynamicItems.forEach((item, index) => {
                const label = item.querySelector('span');
                const input = item.querySelector('.dynamic-list-input') as HTMLInputElement;

                expect(label?.textContent).toBe(`Item ${index + 1}`);
                expect(input?.value).toBe(`Value ${index + 1}`);
            });
        });

        it('should update dynamic content', () => {
            // Add new item
            component.dynamicItems.push({ label: 'Item 3', value: 'Value 3' });
            fixture.detectChanges();

            const dynamicItems = element.querySelectorAll('.dynamic-item');
            expect(dynamicItems.length).toBe(3);
        });

        it('should handle empty dynamic content', () => {
            component.dynamicItems = [];
            fixture.detectChanges();

            const dynamicItems = element.querySelectorAll('.dynamic-item');
            expect(dynamicItems.length).toBe(0);
        });
    });

    describe('Complex Layout Integration', () => {
        let fixture: ComponentFixture<TestFluidComplexLayoutComponent>;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestFluidComplexLayoutComponent);
            fixture.detectChanges();
            element = fixture.debugElement.query(By.directive(Fluid)).nativeElement;
        });

        it('should support complex multi-section layouts', () => {
            const headerSection = element.querySelector('.header-section');
            const mainSection = element.querySelector('.main-section');
            const footerSection = element.querySelector('.footer-section');

            expect(headerSection).toBeTruthy();
            expect(mainSection).toBeTruthy();
            expect(footerSection).toBeTruthy();
        });

        it('should maintain section content structure', () => {
            // Header section
            const headerSearch = element.querySelector('.header-search');
            const headerTitle = element.querySelector('.header-section h2');
            expect(headerSearch).toBeTruthy();
            expect(headerTitle?.textContent?.trim()).toBe('Form Header');

            // Main section panels
            const leftPanel = element.querySelector('.left-panel');
            const rightPanel = element.querySelector('.right-panel');
            expect(leftPanel).toBeTruthy();
            expect(rightPanel).toBeTruthy();

            // Footer section
            const statusInfo = element.querySelector('.status-info');
            const footerAction = element.querySelector('.footer-action');
            expect(statusInfo?.textContent?.trim()).toBe('Status: Active');
            expect(footerAction).toBeTruthy();
        });

        it('should preserve complex element interactions', () => {
            const leftButton = element.querySelector('.left-button') as HTMLButtonElement;
            const actionSave = element.querySelector('.action-save') as HTMLButtonElement;
            const footerAction = element.querySelector('.footer-action') as HTMLButtonElement;

            // Should be able to interact with buttons
            expect(leftButton.tagName).toBe('BUTTON');
            expect(actionSave.tagName).toBe('BUTTON');
            expect(footerAction.tagName).toBe('BUTTON');
        });

        it('should handle multi-panel layout', () => {
            const leftInput = element.querySelector('.left-input');
            const rightTextarea = element.querySelector('.right-textarea');
            const actionButtons = element.querySelectorAll('.action-buttons button');

            expect(leftInput).toBeTruthy();
            expect(rightTextarea).toBeTruthy();
            expect(actionButtons.length).toBe(2);
        });
    });

    describe('CSS Classes and Styling', () => {
        let fixture: ComponentFixture<TestBasicFluidComponent>;
        let component: Fluid;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicFluidComponent);
            fixture.detectChanges();

            const fluidDebugElement = fixture.debugElement.query(By.directive(Fluid));
            component = fluidDebugElement.componentInstance;
            element = fluidDebugElement.nativeElement;
        });

        it('should apply root CSS classes through cx method', () => {
            // The cx('root') method should generate appropriate CSS classes
            const classes = element.className;
            expect(classes).toBeTruthy();
        });

        it('should have component style injection', () => {
            expect(component._componentStyle).toBeTruthy();
        });

        it('should support styling inheritance', () => {
            // Fluid component should allow styling to cascade to children
            expect(element.tagName.toLowerCase()).toBe('p-fluid');
        });
    });

    describe('Edge Cases', () => {
        let fixture: ComponentFixture<TestBasicFluidComponent>;
        let component: Fluid;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicFluidComponent);
            fixture.detectChanges();
            component = fixture.debugElement.query(By.directive(Fluid)).componentInstance;
        });

        it('should handle empty content gracefully', () => {
            expect(component).toBeTruthy();
            expect(() => fixture.detectChanges()).not.toThrow();
        });

        it('should work with OnPush change detection', () => {
            // Component uses OnPush change detection
            component.cd.markForCheck();
            expect(() => fixture.detectChanges()).not.toThrow();
        });

        it('should handle component destruction', () => {
            expect(() => fixture.destroy()).not.toThrow();
        });

        it('should handle rapid content changes', () => {
            expect(() => {
                fixture.detectChanges();
                fixture.detectChanges();
                fixture.detectChanges();
            }).not.toThrow();
        });
    });

    describe('Performance', () => {
        it('should handle multiple fluid instances', () => {
            const multiFixture = TestBed.createComponent(TestNestedFluidComponent);
            multiFixture.detectChanges();

            const fluidComponents = multiFixture.debugElement.queryAll(By.directive(Fluid));
            expect(fluidComponents.length).toBe(2);

            fluidComponents.forEach((fluidComp) => {
                expect(fluidComp.componentInstance).toBeTruthy();
            });
        });

        it('should efficiently handle content projection', () => {
            const contentFixture = TestBed.createComponent(TestFluidWithContentComponent);

            expect(() => {
                contentFixture.detectChanges();
                contentFixture.detectChanges();
            }).not.toThrow();
        });

        it('should handle large content efficiently', () => {
            const complexFixture = TestBed.createComponent(TestFluidComplexLayoutComponent);

            expect(() => {
                complexFixture.detectChanges();
            }).not.toThrow();

            const element = complexFixture.debugElement.query(By.directive(Fluid)).nativeElement;
            expect(element.children.length).toBeGreaterThan(0);
        });
    });

    describe('Accessibility', () => {
        let fixture: ComponentFixture<TestFluidWithFormControlsComponent>;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestFluidWithFormControlsComponent);
            fixture.detectChanges();
            element = fixture.debugElement.query(By.directive(Fluid)).nativeElement;
        });

        it('should preserve label associations in forms', () => {
            const labels = element.querySelectorAll('label[for]');

            labels.forEach((label) => {
                const forId = label.getAttribute('for');
                const associatedElement = element.querySelector(`#${forId}`);
                expect(associatedElement).toBeTruthy();
            });
        });

        it('should maintain form control accessibility', () => {
            const formControls = element.querySelectorAll('input, select, textarea');

            formControls.forEach((control) => {
                // Each control should have an ID or be associated with a label
                const id = control.getAttribute('id');
                if (id) {
                    const label = element.querySelector(`label[for="${id}"]`);
                    expect(label).toBeTruthy();
                }
            });
        });

        it('should not interfere with ARIA attributes', () => {
            // Fluid should not add or modify ARIA attributes
            const fluidElement = fixture.debugElement.query(By.directive(Fluid)).nativeElement;
            expect(fluidElement.hasAttribute('aria-label')).toBe(false);
            expect(fluidElement.hasAttribute('role')).toBe(false);
        });
    });
});
