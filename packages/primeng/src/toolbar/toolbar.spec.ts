import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Toolbar, ToolbarModule } from './toolbar';
import { PrimeTemplate } from 'primeng/api';

@Component({
    standalone: false,
    template: `
        <p-toolbar [ariaLabelledBy]="ariaLabelledBy">
            <div class="default-content">Default Toolbar Content</div>
        </p-toolbar>
    `
})
class TestBasicToolbarComponent {
    ariaLabelledBy: string | undefined;
}

@Component({
    standalone: false,
    template: `
        <p-toolbar>
            <ng-template pTemplate="start">
                <button class="start-button">Start Button</button>
            </ng-template>
            <ng-template pTemplate="center">
                <span class="center-text">Center Content</span>
            </ng-template>
            <ng-template pTemplate="end">
                <button class="end-button">End Button</button>
            </ng-template>
        </p-toolbar>
    `
})
class TestTemplateToolbarComponent {}

@Component({
    standalone: false,
    template: `
        <p-toolbar>
            <ng-template pTemplate="left">
                <button class="left-button">Left Button</button>
            </ng-template>
            <ng-template pTemplate="center">
                <span class="center-text">Center Content</span>
            </ng-template>
            <ng-template pTemplate="right">
                <button class="right-button">Right Button</button>
            </ng-template>
        </p-toolbar>
    `
})
class TestLegacyTemplateToolbarComponent {}

@Component({
    standalone: false,
    template: `
        <p-toolbar>
            <ng-template #start>
                <button class="start-button">Start Content</button>
            </ng-template>
            <ng-template #center>
                <span class="center-text">Center Content</span>
            </ng-template>
            <ng-template #end>
                <button class="end-button">End Content</button>
            </ng-template>
        </p-toolbar>
    `
})
class TestContentChildToolbarComponent {
    @ViewChild('start') startTemplate!: TemplateRef<any>;
    @ViewChild('center') centerTemplate!: TemplateRef<any>;
    @ViewChild('end') endTemplate!: TemplateRef<any>;
}

@Component({
    standalone: false,
    template: `
        <p-toolbar>
            <ng-template pTemplate="start">
                <button class="btn-new">New</button>
                <button class="btn-upload">Upload</button>
                <i class="icon-separator">|</i>
                <button class="btn-save">Save</button>
            </ng-template>
            <ng-template pTemplate="end">
                <input type="text" class="search-input" placeholder="Search" />
                <button class="btn-search">Search</button>
            </ng-template>
        </p-toolbar>
    `
})
class TestComplexToolbarComponent {}

@Component({
    standalone: false,
    template: `
        <p-toolbar>
            <ng-template pTemplate="start">
                <span>Only Start</span>
            </ng-template>
        </p-toolbar>
    `
})
class TestStartOnlyToolbarComponent {}

@Component({
    standalone: false,
    template: `
        <p-toolbar>
            <ng-template pTemplate="center">
                <span>Only Center</span>
            </ng-template>
        </p-toolbar>
    `
})
class TestCenterOnlyToolbarComponent {}

@Component({
    standalone: false,
    template: `
        <p-toolbar>
            <ng-template pTemplate="end">
                <span>Only End</span>
            </ng-template>
        </p-toolbar>
    `
})
class TestEndOnlyToolbarComponent {}

@Component({
    standalone: false,
    template: `
        <p-toolbar [ariaLabelledBy]="ariaLabel">
            <ng-container *ngIf="showStart">
                <ng-template pTemplate="start">
                    <button class="dynamic-start">Dynamic Start</button>
                </ng-template>
            </ng-container>
            <ng-container *ngIf="showCenter">
                <ng-template pTemplate="center">
                    <span class="dynamic-center">Dynamic Center</span>
                </ng-template>
            </ng-container>
            <ng-container *ngIf="showEnd">
                <ng-template pTemplate="end">
                    <button class="dynamic-end">Dynamic End</button>
                </ng-template>
            </ng-container>
        </p-toolbar>
    `
})
class TestDynamicToolbarComponent {
    ariaLabel = 'toolbar-label';
    showStart = true;
    showCenter = true;
    showEnd = true;
}

describe('Toolbar', () => {
    let fixture: ComponentFixture<TestBasicToolbarComponent>;
    let component: TestBasicToolbarComponent;
    let toolbarEl: DebugElement;
    let toolbar: Toolbar;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ToolbarModule, NoopAnimationsModule],
            declarations: [
                TestBasicToolbarComponent,
                TestTemplateToolbarComponent,
                TestLegacyTemplateToolbarComponent,
                TestContentChildToolbarComponent,
                TestComplexToolbarComponent,
                TestDynamicToolbarComponent,
                TestStartOnlyToolbarComponent,
                TestCenterOnlyToolbarComponent,
                TestEndOnlyToolbarComponent
            ]
        });

        fixture = TestBed.createComponent(TestBasicToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        toolbarEl = fixture.debugElement.query(By.directive(Toolbar));
        toolbar = toolbarEl.componentInstance;
    });

    describe('Component Initialization', () => {
        it('should create the component', () => {
            expect(toolbar).toBeTruthy();
        });

        it('should have toolbar role', () => {
            expect(toolbarEl.nativeElement.getAttribute('role')).toBe('toolbar');
        });

        it('should have correct data attributes', () => {
            expect(toolbarEl.nativeElement.getAttribute('data-pc-name')).toBe('toolbar');
            expect(toolbarEl.nativeElement.getAttribute('data-pc-section')).toBe('root');
        });

        it('should have correct CSS classes', () => {
            expect(toolbarEl.nativeElement.className).toContain('p-toolbar');
            expect(toolbarEl.nativeElement.className).toContain('p-component');
        });

        it('should render default content', () => {
            const defaultContent = fixture.debugElement.query(By.css('.default-content'));
            expect(defaultContent).toBeTruthy();
            expect(defaultContent.nativeElement.textContent).toBe('Default Toolbar Content');
        });
    });

    describe('Accessibility', () => {
        it('should bind ariaLabelledBy attribute', () => {
            component.ariaLabelledBy = 'my-toolbar-label';
            fixture.detectChanges();

            expect(toolbarEl.nativeElement.getAttribute('aria-labelledby')).toBe('my-toolbar-label');
        });

        it('should handle undefined ariaLabelledBy', () => {
            component.ariaLabelledBy = undefined as any;
            fixture.detectChanges();

            expect(toolbarEl.nativeElement.hasAttribute('aria-labelledby')).toBe(false);
        });

        it('should update ariaLabelledBy dynamically', () => {
            component.ariaLabelledBy = 'label-1';
            fixture.detectChanges();
            expect(toolbarEl.nativeElement.getAttribute('aria-labelledby')).toBe('label-1');

            component.ariaLabelledBy = 'label-2';
            fixture.detectChanges();
            expect(toolbarEl.nativeElement.getAttribute('aria-labelledby')).toBe('label-2');
        });
    });

    describe('Template Sections', () => {
        let templateFixture: ComponentFixture<TestTemplateToolbarComponent>;

        beforeEach(() => {
            templateFixture = TestBed.createComponent(TestTemplateToolbarComponent);
            templateFixture.detectChanges();
        });

        it('should render start template', () => {
            const startSection = templateFixture.debugElement.query(By.css('.p-toolbar-start'));
            expect(startSection).toBeTruthy();

            const startButton = templateFixture.debugElement.query(By.css('.start-button'));
            expect(startButton).toBeTruthy();
            expect(startButton.nativeElement.textContent).toBe('Start Button');
        });

        it('should render center template', () => {
            const centerSection = templateFixture.debugElement.query(By.css('.p-toolbar-center'));
            expect(centerSection).toBeTruthy();

            const centerText = templateFixture.debugElement.query(By.css('.center-text'));
            expect(centerText).toBeTruthy();
            expect(centerText.nativeElement.textContent).toBe('Center Content');
        });

        it('should render end template', () => {
            const endSection = templateFixture.debugElement.query(By.css('.p-toolbar-end'));
            expect(endSection).toBeTruthy();

            const endButton = templateFixture.debugElement.query(By.css('.end-button'));
            expect(endButton).toBeTruthy();
            expect(endButton.nativeElement.textContent).toBe('End Button');
        });

        it('should have correct data-pc-section attributes', () => {
            const startSection = templateFixture.debugElement.query(By.css('.p-toolbar-start'));
            const centerSection = templateFixture.debugElement.query(By.css('.p-toolbar-center'));
            const endSection = templateFixture.debugElement.query(By.css('.p-toolbar-end'));

            expect(startSection.nativeElement.getAttribute('data-pc-section')).toBe('start');
            expect(centerSection.nativeElement.getAttribute('data-pc-section')).toBe('center');
            expect(endSection.nativeElement.getAttribute('data-pc-section')).toBe('end');
        });
    });

    describe('Legacy Template Support', () => {
        let legacyFixture: ComponentFixture<TestLegacyTemplateToolbarComponent>;

        beforeEach(() => {
            legacyFixture = TestBed.createComponent(TestLegacyTemplateToolbarComponent);
            legacyFixture.detectChanges();
        });

        it('should support left template as start', () => {
            const startSection = legacyFixture.debugElement.query(By.css('.p-toolbar-start'));
            expect(startSection).toBeTruthy();

            const leftButton = legacyFixture.debugElement.query(By.css('.left-button'));
            expect(leftButton).toBeTruthy();
            expect(leftButton.nativeElement.textContent).toBe('Left Button');
        });

        it('should support right template as end', () => {
            const endSection = legacyFixture.debugElement.query(By.css('.p-toolbar-end'));
            expect(endSection).toBeTruthy();

            const rightButton = legacyFixture.debugElement.query(By.css('.right-button'));
            expect(rightButton).toBeTruthy();
            expect(rightButton.nativeElement.textContent).toBe('Right Button');
        });

        it('should support center template in legacy mode', () => {
            const centerSection = legacyFixture.debugElement.query(By.css('.p-toolbar-center'));
            expect(centerSection).toBeTruthy();

            const centerText = legacyFixture.debugElement.query(By.css('.center-text'));
            expect(centerText).toBeTruthy();
        });
    });

    describe('Complex Content', () => {
        let complexFixture: ComponentFixture<TestComplexToolbarComponent>;

        beforeEach(() => {
            complexFixture = TestBed.createComponent(TestComplexToolbarComponent);
            complexFixture.detectChanges();
        });

        it('should render multiple elements in start section', () => {
            const startSection = complexFixture.debugElement.query(By.css('.p-toolbar-start'));
            const buttons = startSection.queryAll(By.css('button'));
            const separator = startSection.query(By.css('.icon-separator'));

            expect(buttons.length).toBe(3);
            expect(buttons[0].nativeElement.textContent).toBe('New');
            expect(buttons[1].nativeElement.textContent).toBe('Upload');
            expect(buttons[2].nativeElement.textContent).toBe('Save');
            expect(separator).toBeTruthy();
        });

        it('should render multiple elements in end section', () => {
            const endSection = complexFixture.debugElement.query(By.css('.p-toolbar-end'));
            const searchInput = endSection.query(By.css('.search-input'));
            const searchButton = endSection.query(By.css('.btn-search'));

            expect(searchInput).toBeTruthy();
            expect(searchInput.nativeElement.placeholder).toBe('Search');
            expect(searchButton).toBeTruthy();
            expect(searchButton.nativeElement.textContent).toBe('Search');
        });

        it('should not render center section when not provided', () => {
            const centerSection = complexFixture.debugElement.query(By.css('.p-toolbar-center'));
            expect(centerSection).toBeFalsy();
        });
    });

    describe('Dynamic Templates', () => {
        it('should show all sections when templates are provided', () => {
            const templateFixture = TestBed.createComponent(TestTemplateToolbarComponent);
            templateFixture.detectChanges();

            const startSection = templateFixture.debugElement.query(By.css('.p-toolbar-start'));
            const centerSection = templateFixture.debugElement.query(By.css('.p-toolbar-center'));
            const endSection = templateFixture.debugElement.query(By.css('.p-toolbar-end'));

            expect(startSection).toBeTruthy();
            expect(centerSection).toBeTruthy();
            expect(endSection).toBeTruthy();
        });

        it('should not show sections when templates are not provided', () => {
            const basicFixture = TestBed.createComponent(TestBasicToolbarComponent);
            basicFixture.detectChanges();

            const startSection = basicFixture.debugElement.query(By.css('.p-toolbar-start'));
            const centerSection = basicFixture.debugElement.query(By.css('.p-toolbar-center'));
            const endSection = basicFixture.debugElement.query(By.css('.p-toolbar-end'));

            expect(startSection).toBeFalsy();
            expect(centerSection).toBeFalsy();
            expect(endSection).toBeFalsy();
        });

        it('should handle dynamic aria label', () => {
            const dynamicFixture = TestBed.createComponent(TestDynamicToolbarComponent);
            const dynamicComponent = dynamicFixture.componentInstance;
            dynamicFixture.detectChanges();

            const toolbar = dynamicFixture.debugElement.query(By.directive(Toolbar));
            expect(toolbar.nativeElement.getAttribute('aria-labelledby')).toBe('toolbar-label');

            dynamicComponent.ariaLabel = 'new-label';
            dynamicFixture.detectChanges();
            expect(toolbar.nativeElement.getAttribute('aria-labelledby')).toBe('new-label');
        });
    });

    describe('BlockableUI Interface', () => {
        it('should implement getBlockableElement method', () => {
            expect(typeof toolbar.getBlockableElement).toBe('function');
        });

        it('should return first child element from getBlockableElement', () => {
            const blockableElement = toolbar.getBlockableElement();
            expect(blockableElement).toBeTruthy();
            expect(blockableElement).toBe(toolbarEl.nativeElement.children[0]);
        });

        it('should return correct element even with templates', () => {
            const templateFixture = TestBed.createComponent(TestTemplateToolbarComponent);
            templateFixture.detectChanges();

            const templateToolbar = templateFixture.debugElement.query(By.directive(Toolbar)).componentInstance;
            const blockableElement = templateToolbar.getBlockableElement();

            expect(blockableElement).toBeTruthy();
            expect(blockableElement.parentElement).toBe(templateFixture.debugElement.query(By.directive(Toolbar)).nativeElement);
        });
    });

    describe('Edge Cases', () => {
        it('should handle toolbar without any content', () => {
            // Using existing basic component without any content except default
            const basicFixture = TestBed.createComponent(TestBasicToolbarComponent);
            basicFixture.componentInstance.ariaLabelledBy = undefined as any;
            basicFixture.detectChanges();

            const toolbar = basicFixture.debugElement.query(By.directive(Toolbar));
            expect(toolbar).toBeTruthy();

            // Should have toolbar role
            expect(toolbar.nativeElement.getAttribute('role')).toBe('toolbar');

            // Should not have any template sections (start, center, end)
            const templateSections = basicFixture.debugElement.queryAll(By.css('.p-toolbar-start, .p-toolbar-center, .p-toolbar-end'));
            expect(templateSections.length).toBe(0);

            // But should have default content
            const defaultContent = basicFixture.debugElement.query(By.css('.default-content'));
            expect(defaultContent).toBeTruthy();
        });

        it('should handle only start section', () => {
            const startOnlyFixture = TestBed.createComponent(TestStartOnlyToolbarComponent);
            startOnlyFixture.detectChanges();

            const startSection = startOnlyFixture.debugElement.query(By.css('.p-toolbar-start'));
            const centerSection = startOnlyFixture.debugElement.query(By.css('.p-toolbar-center'));
            const endSection = startOnlyFixture.debugElement.query(By.css('.p-toolbar-end'));

            expect(startSection).toBeTruthy();
            expect(centerSection).toBeFalsy();
            expect(endSection).toBeFalsy();
        });

        it('should handle only center section', () => {
            const centerOnlyFixture = TestBed.createComponent(TestCenterOnlyToolbarComponent);
            centerOnlyFixture.detectChanges();

            const startSection = centerOnlyFixture.debugElement.query(By.css('.p-toolbar-start'));
            const centerSection = centerOnlyFixture.debugElement.query(By.css('.p-toolbar-center'));
            const endSection = centerOnlyFixture.debugElement.query(By.css('.p-toolbar-end'));

            expect(startSection).toBeFalsy();
            expect(centerSection).toBeTruthy();
            expect(endSection).toBeFalsy();
        });

        it('should handle only end section', () => {
            const endOnlyFixture = TestBed.createComponent(TestEndOnlyToolbarComponent);
            endOnlyFixture.detectChanges();

            const startSection = endOnlyFixture.debugElement.query(By.css('.p-toolbar-start'));
            const centerSection = endOnlyFixture.debugElement.query(By.css('.p-toolbar-center'));
            const endSection = endOnlyFixture.debugElement.query(By.css('.p-toolbar-end'));

            expect(startSection).toBeFalsy();
            expect(centerSection).toBeFalsy();
            expect(endSection).toBeTruthy();
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should apply component classes correctly', () => {
            const toolbar = fixture.debugElement.query(By.css('p-toolbar'));
            expect(toolbar.nativeElement.className).toContain('p-toolbar');
            expect(toolbar.nativeElement.className).toContain('p-component');
        });

        it('should apply section classes correctly', () => {
            const templateFixture = TestBed.createComponent(TestTemplateToolbarComponent);
            templateFixture.detectChanges();

            const startSection = templateFixture.debugElement.query(By.css('.p-toolbar-start'));
            const centerSection = templateFixture.debugElement.query(By.css('.p-toolbar-center'));
            const endSection = templateFixture.debugElement.query(By.css('.p-toolbar-end'));

            expect(startSection.nativeElement.className).toContain('p-toolbar-start');
            expect(centerSection.nativeElement.className).toContain('p-toolbar-center');
            expect(endSection.nativeElement.className).toContain('p-toolbar-end');
        });
    });

    describe('Memory Management', () => {
        it('should cleanup on destroy', () => {
            expect(() => {
                fixture.destroy();
            }).not.toThrow();
        });

        it('should cleanup templates on destroy', () => {
            const templateFixture = TestBed.createComponent(TestTemplateToolbarComponent);
            templateFixture.detectChanges();

            expect(() => {
                templateFixture.destroy();
            }).not.toThrow();
        });

        it('should handle rapid creation and destruction', () => {
            for (let i = 0; i < 5; i++) {
                const testFixture = TestBed.createComponent(TestBasicToolbarComponent);
                testFixture.detectChanges();
                testFixture.destroy();
            }

            // If we got here without errors, the test passes
            expect(true).toBe(true);
        });
    });

    describe('Template Precedence', () => {
        it('should process templates after content init', () => {
            const templateFixture = TestBed.createComponent(TestTemplateToolbarComponent);
            templateFixture.detectChanges();

            const toolbarInstance = templateFixture.debugElement.query(By.directive(Toolbar)).componentInstance;

            // ngAfterContentInit is already called during detectChanges
            // Verify that templates are processed correctly
            expect(toolbarInstance._startTemplate || toolbarInstance.startTemplate).toBeTruthy();
            expect(toolbarInstance._centerTemplate || toolbarInstance.centerTemplate).toBeTruthy();
            expect(toolbarInstance._endTemplate || toolbarInstance.endTemplate).toBeTruthy();
        });

        it('should handle pTemplate directives', () => {
            const templateFixture = TestBed.createComponent(TestTemplateToolbarComponent);
            templateFixture.detectChanges();

            const startContent = templateFixture.debugElement.query(By.css('.start-button'));
            expect(startContent).toBeTruthy();
            expect(startContent.nativeElement.textContent).toBe('Start Button');
        });
    });

    describe('ContentChild Templates', () => {
        let contentChildFixture: ComponentFixture<TestContentChildToolbarComponent>;
        let contentChildComponent: TestContentChildToolbarComponent;

        beforeEach(() => {
            contentChildFixture = TestBed.createComponent(TestContentChildToolbarComponent);
            contentChildComponent = contentChildFixture.componentInstance;
            contentChildFixture.detectChanges();
        });

        it('should render ContentChild start template', () => {
            const startSection = contentChildFixture.debugElement.query(By.css('.p-toolbar-start'));
            expect(startSection).toBeTruthy();

            const startButton = contentChildFixture.debugElement.query(By.css('.start-button'));
            expect(startButton).toBeTruthy();
            expect(startButton.nativeElement.textContent).toBe('Start Content');
        });

        it('should render ContentChild center template', () => {
            const centerSection = contentChildFixture.debugElement.query(By.css('.p-toolbar-center'));
            expect(centerSection).toBeTruthy();

            const centerText = contentChildFixture.debugElement.query(By.css('.center-text'));
            expect(centerText).toBeTruthy();
            expect(centerText.nativeElement.textContent).toBe('Center Content');
        });

        it('should render ContentChild end template', () => {
            const endSection = contentChildFixture.debugElement.query(By.css('.p-toolbar-end'));
            expect(endSection).toBeTruthy();

            const endButton = contentChildFixture.debugElement.query(By.css('.end-button'));
            expect(endButton).toBeTruthy();
            expect(endButton.nativeElement.textContent).toBe('End Content');
        });

        it('should access ContentChild templates via component', () => {
            const toolbarInstance = contentChildFixture.debugElement.query(By.directive(Toolbar)).componentInstance;

            // ContentChild templates should be available
            expect(toolbarInstance.startTemplate).toBeDefined();
            expect(toolbarInstance.centerTemplate).toBeDefined();
            expect(toolbarInstance.endTemplate).toBeDefined();
        });

        it('should have correct template references in component', () => {
            // Component's ViewChild references should be defined
            expect(contentChildComponent.startTemplate).toBeDefined();
            expect(contentChildComponent.centerTemplate).toBeDefined();
            expect(contentChildComponent.endTemplate).toBeDefined();
        });

        it('should render all three ContentChild sections', () => {
            const sections = contentChildFixture.debugElement.queryAll(By.css('.p-toolbar-start, .p-toolbar-center, .p-toolbar-end'));
            expect(sections.length).toBe(3);

            // Verify each section has correct data-pc-section attribute
            const startSection = contentChildFixture.debugElement.query(By.css('.p-toolbar-start'));
            const centerSection = contentChildFixture.debugElement.query(By.css('.p-toolbar-center'));
            const endSection = contentChildFixture.debugElement.query(By.css('.p-toolbar-end'));

            expect(startSection.nativeElement.getAttribute('data-pc-section')).toBe('start');
            expect(centerSection.nativeElement.getAttribute('data-pc-section')).toBe('center');
            expect(endSection.nativeElement.getAttribute('data-pc-section')).toBe('end');
        });
    });

    describe('Component Integration', () => {
        it('should handle complex toolbar content', () => {
            const complexFixture = TestBed.createComponent(TestComplexToolbarComponent);
            complexFixture.detectChanges();

            const buttons = complexFixture.debugElement.queryAll(By.css('button'));
            expect(buttons.length).toBeGreaterThan(0);

            const searchInput = complexFixture.debugElement.query(By.css('.search-input'));
            expect(searchInput).toBeTruthy();
        });

        it('should maintain toolbar structure with different content types', () => {
            const templateFixture = TestBed.createComponent(TestTemplateToolbarComponent);
            templateFixture.detectChanges();

            const toolbar = templateFixture.debugElement.query(By.directive(Toolbar));
            expect(toolbar.nativeElement.children.length).toBeGreaterThan(0);

            // Verify toolbar maintains its structure
            expect(toolbar.nativeElement.getAttribute('role')).toBe('toolbar');
        });
    });
});
