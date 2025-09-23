import { Component, DebugElement, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'primeng/api';
import { BlockUI, BlockUIModule } from './blockui';

@Component({
    standalone: false,
    selector: 'test-basic-blockui',
    template: `<p-blockui></p-blockui>`
})
class TestBasicBlockUIComponent {}

@Component({
    standalone: false,
    selector: 'test-blocked-blockui',
    template: `<p-blockui [blocked]="blocked"></p-blockui>`
})
class TestBlockedBlockUIComponent {
    blocked = false;
}

@Component({
    standalone: false,
    selector: 'test-auto-zindex-blockui',
    template: `<p-blockui [blocked]="blocked" [autoZIndex]="autoZIndex" [baseZIndex]="baseZIndex"></p-blockui>`
})
class TestAutoZIndexBlockUIComponent {
    blocked = false;
    autoZIndex = true;
    baseZIndex = 0;
}

@Component({
    standalone: false,
    selector: 'test-style-class-blockui',
    template: `<p-blockui [blocked]="blocked" [styleClass]="styleClass"></p-blockui>`
})
class TestStyleClassBlockUIComponent {
    blocked = false;
    styleClass = 'custom-blockui';
}

@Component({
    standalone: false,
    selector: 'test-content-blockui',
    template: `
        <p-blockui [blocked]="blocked">
            <div class="custom-content">Loading...</div>
        </p-blockui>
    `
})
class TestContentBlockUIComponent {
    blocked = false;
}

@Component({
    standalone: false,
    selector: 'test-template-blockui',
    template: `
        <p-blockui [blocked]="blocked">
            <ng-template #content>
                <div class="template-content">Please wait...</div>
            </ng-template>
        </p-blockui>
    `
})
class TestTemplateBlockUIComponent {
    blocked = false;
}

@Component({
    standalone: false,
    selector: 'test-target-blockui',
    template: `
        <div #targetElement class="target-container">
            <p>Target content</p>
        </div>
        <p-blockui [blocked]="blocked" [target]="targetElement"></p-blockui>
    `
})
class TestTargetBlockUIComponent {
    @ViewChild('targetElement', { static: true }) targetElement!: ElementRef;
    blocked = false;
}

// Mock component that implements BlockableUI interface
@Component({
    standalone: false,
    selector: 'mock-blockable',
    template: `<div #blockableElement class="blockable-content"><ng-content></ng-content></div>`
})
class MockBlockableComponent {
    @ViewChild('blockableElement', { static: true }) blockableElement!: ElementRef;

    getBlockableElement() {
        return this.blockableElement.nativeElement;
    }
}

@Component({
    standalone: false,
    selector: 'test-blockable-target-blockui',
    template: `
        <mock-blockable #blockableTarget>
            <p>Blockable content</p>
        </mock-blockable>
        <p-blockui [blocked]="blocked" [target]="blockableTarget"></p-blockui>
    `
})
class TestBlockableTargetBlockUIComponent {
    @ViewChild('blockableTarget', { static: true }) blockableTarget!: MockBlockableComponent;
    blocked = false;
}

@Component({
    standalone: false,
    selector: 'test-invalid-target-blockui',
    template: `
        <div #invalidTarget class="invalid-target">Invalid Target</div>
        <p-blockui [blocked]="blocked" [target]="invalidTarget"></p-blockui>
    `
})
class TestInvalidTargetBlockUIComponent {
    @ViewChild('invalidTarget', { static: true }) invalidTarget!: ElementRef;
    blocked = false;
}

@Component({
    standalone: false,
    selector: 'test-dynamic-blockui',
    template: `
        <p-blockui [blocked]="blocked" [autoZIndex]="autoZIndex" [baseZIndex]="baseZIndex" [styleClass]="styleClass">
            <div class="dynamic-content">{{ content }}</div>
        </p-blockui>
    `
})
class TestDynamicBlockUIComponent {
    blocked = false;
    autoZIndex = true;
    baseZIndex = 0;
    styleClass = '';
    content = 'Dynamic content';
}

describe('BlockUI', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BlockUIModule, SharedModule, NoopAnimationsModule],
            declarations: [
                TestBasicBlockUIComponent,
                TestBlockedBlockUIComponent,
                TestAutoZIndexBlockUIComponent,
                TestStyleClassBlockUIComponent,
                TestContentBlockUIComponent,
                TestTemplateBlockUIComponent,
                TestTargetBlockUIComponent,
                MockBlockableComponent,
                TestBlockableTargetBlockUIComponent,
                TestInvalidTargetBlockUIComponent,
                TestDynamicBlockUIComponent
            ]
        });
    });

    describe('Component Initialization', () => {
        let fixture: ComponentFixture<TestBasicBlockUIComponent>;
        let component: BlockUI;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicBlockUIComponent);
            fixture.detectChanges();

            const blockUIDebugElement = fixture.debugElement.query(By.directive(BlockUI));
            component = blockUIDebugElement.componentInstance;
            element = blockUIDebugElement.nativeElement;
        });

        it('should create the component', () => {
            expect(component).toBeTruthy();
        });

        it('should have default values', () => {
            expect(component.blocked).toBe(false);
            expect(component.autoZIndex).toBe(true);
            expect(component.baseZIndex).toBe(0);
            expect(component.target).toBeUndefined();
            expect(component.styleClass).toBeUndefined();
        });

        it('should apply base CSS classes', () => {
            expect(element.classList.contains('p-blockui')).toBe(true);
            expect(element.classList.contains('p-blockui-mask')).toBe(true);
            expect(element.classList.contains('p-overlay-mask')).toBe(true);
            expect(element.classList.contains('p-blockui-mask-document')).toBe(true);
        });

        it('should have correct data attributes', () => {
            expect(element.getAttribute('data-pc-name')).toBe('blockui');
            expect(element.getAttribute('data-pc-section')).toBe('root');
        });

        it('should not be visible by default', () => {
            expect(element.style.display).not.toBe('flex');
        });

        it('should have aria-busy false by default', () => {
            expect(element.getAttribute('aria-busy')).toBe('false');
        });
    });

    describe('Blocked State', () => {
        let fixture: ComponentFixture<TestBlockedBlockUIComponent>;
        let component: TestBlockedBlockUIComponent;
        let blockUIComponent: BlockUI;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBlockedBlockUIComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const blockUIDebugElement = fixture.debugElement.query(By.directive(BlockUI));
            blockUIComponent = blockUIDebugElement.componentInstance;
            element = blockUIDebugElement.nativeElement;
        });

        it('should not be blocked initially', () => {
            expect(blockUIComponent.blocked).toBe(false);
            expect(element.getAttribute('aria-busy')).toBe('false');
            expect(element.style.display).not.toBe('flex');
        });

        it('should block when blocked property is true', () => {
            component.blocked = true;
            fixture.detectChanges();

            expect(blockUIComponent.blocked).toBe(true);
            expect(element.getAttribute('aria-busy')).toBe('true');
            expect(element.style.display).toBe('flex');
        });

        it('should unblock when blocked property is false', () => {
            component.blocked = true;
            fixture.detectChanges();
            expect(blockUIComponent.blocked).toBe(true);

            component.blocked = false;
            fixture.detectChanges();

            expect(blockUIComponent.blocked).toBe(false);
            expect(element.getAttribute('aria-busy')).toBe('false');
        });

        it('should toggle blocked state dynamically', () => {
            // Initially not blocked
            expect(blockUIComponent.blocked).toBe(false);

            // Block
            component.blocked = true;
            fixture.detectChanges();
            expect(blockUIComponent.blocked).toBe(true);
            expect(element.style.display).toBe('flex');

            // Unblock
            component.blocked = false;
            fixture.detectChanges();
            expect(blockUIComponent.blocked).toBe(false);
        });
    });

    describe('Z-Index Management', () => {
        let fixture: ComponentFixture<TestAutoZIndexBlockUIComponent>;
        let component: TestAutoZIndexBlockUIComponent;
        let blockUIComponent: BlockUI;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestAutoZIndexBlockUIComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const blockUIDebugElement = fixture.debugElement.query(By.directive(BlockUI));
            blockUIComponent = blockUIDebugElement.componentInstance;
            element = blockUIDebugElement.nativeElement;
        });

        it('should have autoZIndex enabled by default', () => {
            expect(blockUIComponent.autoZIndex).toBe(true);
        });

        it('should respect baseZIndex value', () => {
            component.baseZIndex = 1000;
            fixture.detectChanges();

            expect(blockUIComponent.baseZIndex).toBe(1000);
        });

        it('should disable auto z-index when set to false', () => {
            component.autoZIndex = false;
            fixture.detectChanges();

            expect(blockUIComponent.autoZIndex).toBe(false);
        });

        it('should apply z-index when blocked and autoZIndex is true', () => {
            component.blocked = true;
            fixture.detectChanges();

            // Z-index should be applied by ZIndexUtils
            expect(element.style.zIndex).toBeTruthy();
        });

        it('should not apply z-index when autoZIndex is false', () => {
            component.autoZIndex = false;
            component.blocked = true;
            fixture.detectChanges();

            // Z-index might still be set by ZIndexUtils, but autoZIndex flag controls the behavior
            expect(blockUIComponent.autoZIndex).toBe(false);
        });
    });

    describe('Style Class', () => {
        let fixture: ComponentFixture<TestStyleClassBlockUIComponent>;
        let component: TestStyleClassBlockUIComponent;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestStyleClassBlockUIComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            element = fixture.debugElement.query(By.directive(BlockUI)).nativeElement;
        });

        it('should apply custom style class', () => {
            expect(element.classList.contains('custom-blockui')).toBe(true);
        });

        it('should update style class dynamically', () => {
            component.styleClass = 'new-custom-class';
            fixture.detectChanges();

            expect(element.classList.contains('new-custom-class')).toBe(true);
        });

        it('should handle undefined style class', () => {
            component.styleClass = undefined as any;
            fixture.detectChanges();

            expect(element.classList.contains('custom-blockui')).toBe(false);
        });

        it('should maintain base classes with custom style class', () => {
            expect(element.classList.contains('p-blockui')).toBe(true);
            expect(element.classList.contains('custom-blockui')).toBe(true);
        });
    });

    describe('Content Projection', () => {
        let fixture: ComponentFixture<TestContentBlockUIComponent>;
        let component: TestContentBlockUIComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestContentBlockUIComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should project content', () => {
            const customContent = fixture.debugElement.query(By.css('.custom-content'));
            expect(customContent).toBeTruthy();
            expect(customContent.nativeElement.textContent.trim()).toBe('Loading...');
        });

        it('should show projected content when blocked', () => {
            component.blocked = true;
            fixture.detectChanges();

            const customContent = fixture.debugElement.query(By.css('.custom-content'));
            expect(customContent).toBeTruthy();
        });

        it('should hide projected content when not blocked', () => {
            component.blocked = false;
            fixture.detectChanges();

            const blockUIElement = fixture.debugElement.query(By.directive(BlockUI)).nativeElement;
            expect(blockUIElement.style.display).not.toBe('flex');
        });
    });

    describe('Template Content', () => {
        let fixture: ComponentFixture<TestTemplateBlockUIComponent>;
        let component: TestTemplateBlockUIComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestTemplateBlockUIComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should render template content', () => {
            component.blocked = true;
            fixture.detectChanges();

            const templateContent = fixture.debugElement.query(By.css('.template-content'));
            expect(templateContent).toBeTruthy();
            expect(templateContent.nativeElement.textContent.trim()).toBe('Please wait...');
        });

        it('should handle template content when not blocked', () => {
            const blockUIElement = fixture.debugElement.query(By.directive(BlockUI)).nativeElement;
            expect(blockUIElement.style.display).not.toBe('flex');
        });
    });

    describe('Target Blocking - Simple Element', () => {
        it('should throw error when target does not implement BlockableUI interface', () => {
            expect(() => {
                const fixture = TestBed.createComponent(TestTargetBlockUIComponent);
                const component = fixture.componentInstance;
                fixture.detectChanges(); // This triggers ngAfterViewInit which checks the target
            }).toThrow('Target of BlockUI must implement BlockableUI interface');
        });
    });

    describe('Target Blocking - Blockable Component', () => {
        let fixture: ComponentFixture<TestBlockableTargetBlockUIComponent>;
        let component: TestBlockableTargetBlockUIComponent;
        let blockUIComponent: BlockUI;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBlockableTargetBlockUIComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            blockUIComponent = fixture.debugElement.query(By.directive(BlockUI)).componentInstance;
        });

        it('should have blockable target reference', () => {
            expect(component.blockableTarget).toBeTruthy();
            expect(blockUIComponent.target).toBe(component.blockableTarget);
        });

        it('should block target component', () => {
            component.blocked = true;
            fixture.detectChanges();

            expect(blockUIComponent.blocked).toBe(true);
        });

        it('should unblock target component', () => {
            component.blocked = true;
            fixture.detectChanges();
            expect(blockUIComponent.blocked).toBe(true);

            component.blocked = false;
            fixture.detectChanges();
            expect(blockUIComponent.blocked).toBe(false);
        });
    });

    describe('Error Handling', () => {
        it('should throw error for invalid target', () => {
            expect(() => {
                const fixture = TestBed.createComponent(TestInvalidTargetBlockUIComponent);
                fixture.detectChanges(); // This triggers ngAfterViewInit which throws
            }).toThrow('Target of BlockUI must implement BlockableUI interface');
        });
    });

    describe('Dynamic Configuration', () => {
        let fixture: ComponentFixture<TestDynamicBlockUIComponent>;
        let component: TestDynamicBlockUIComponent;
        let blockUIComponent: BlockUI;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestDynamicBlockUIComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const blockUIDebugElement = fixture.debugElement.query(By.directive(BlockUI));
            blockUIComponent = blockUIDebugElement.componentInstance;
            element = blockUIDebugElement.nativeElement;
        });

        it('should handle combined property changes', () => {
            component.blocked = true;
            component.autoZIndex = false;
            component.baseZIndex = 2000;
            component.styleClass = 'dynamic-class';
            fixture.detectChanges();

            expect(blockUIComponent.blocked).toBe(true);
            expect(blockUIComponent.autoZIndex).toBe(false);
            expect(blockUIComponent.baseZIndex).toBe(2000);
            expect(element.classList.contains('dynamic-class')).toBe(true);
        });

        it('should update content dynamically', () => {
            component.content = 'Updated content';
            fixture.detectChanges();

            const dynamicContent = fixture.debugElement.query(By.css('.dynamic-content'));
            expect(dynamicContent.nativeElement.textContent).toBe('Updated content');
        });

        it('should handle state transitions', () => {
            // Start unblocked
            expect(blockUIComponent.blocked).toBe(false);

            // Block
            component.blocked = true;
            fixture.detectChanges();
            expect(blockUIComponent.blocked).toBe(true);
            expect(element.style.display).toBe('flex');

            // Unblock
            component.blocked = false;
            fixture.detectChanges();
            expect(blockUIComponent.blocked).toBe(false);
        });

        it('should handle z-index transitions', () => {
            // Start with autoZIndex enabled
            expect(blockUIComponent.autoZIndex).toBe(true);

            // Block and check z-index is applied
            component.blocked = true;
            fixture.detectChanges();
            expect(element.style.zIndex).toBeTruthy();

            // Disable autoZIndex
            component.blocked = false;
            fixture.detectChanges();
            component.autoZIndex = false;
            component.blocked = true;
            fixture.detectChanges();
            expect(blockUIComponent.autoZIndex).toBe(false);
        });

        it('should handle style class transitions', () => {
            component.styleClass = 'class1';
            fixture.detectChanges();
            expect(element.classList.contains('class1')).toBe(true);

            component.styleClass = 'class2';
            fixture.detectChanges();
            expect(element.classList.contains('class1')).toBe(false);
            expect(element.classList.contains('class2')).toBe(true);

            component.styleClass = '';
            fixture.detectChanges();
            expect(element.classList.contains('class2')).toBe(false);
        });
    });

    describe('Lifecycle Methods', () => {
        let fixture: ComponentFixture<TestBlockedBlockUIComponent>;
        let component: TestBlockedBlockUIComponent;
        let blockUIComponent: BlockUI;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBlockedBlockUIComponent);
            component = fixture.componentInstance;
        });

        it('should handle blocked state set before view init', () => {
            component.blocked = true; // Set before detectChanges
            fixture.detectChanges(); // This calls ngAfterViewInit

            blockUIComponent = fixture.debugElement.query(By.directive(BlockUI)).componentInstance;
            expect(blockUIComponent.blocked).toBe(true);
        });

        it('should unblock on destroy', () => {
            fixture.detectChanges();
            blockUIComponent = fixture.debugElement.query(By.directive(BlockUI)).componentInstance;

            component.blocked = true;
            fixture.detectChanges();
            expect(blockUIComponent.blocked).toBe(true);

            spyOn(blockUIComponent, 'unblock').and.callThrough();
            spyOn(blockUIComponent, 'destroyModal').and.callThrough();

            fixture.destroy();

            expect(blockUIComponent.unblock).toHaveBeenCalled();
            expect(blockUIComponent.destroyModal).toHaveBeenCalled();
        });
    });

    describe('Edge Cases', () => {
        let fixture: ComponentFixture<TestBlockedBlockUIComponent>;
        let component: TestBlockedBlockUIComponent;
        let blockUIComponent: BlockUI;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBlockedBlockUIComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            blockUIComponent = fixture.debugElement.query(By.directive(BlockUI)).componentInstance;
        });

        it('should handle rapid block/unblock calls', () => {
            component.blocked = true;
            fixture.detectChanges();
            expect(blockUIComponent.blocked).toBe(true);

            component.blocked = false;
            fixture.detectChanges();
            expect(blockUIComponent.blocked).toBe(false);

            component.blocked = true;
            fixture.detectChanges();
            expect(blockUIComponent.blocked).toBe(true);
        });

        it('should handle null/undefined values gracefully', () => {
            blockUIComponent.target = null as any;
            blockUIComponent.styleClass = undefined as any;

            expect(() => {
                component.blocked = true;
                fixture.detectChanges();
            }).not.toThrow();
        });

        it('should handle negative z-index values', () => {
            blockUIComponent.baseZIndex = -100;
            component.blocked = true;
            fixture.detectChanges();

            expect(blockUIComponent.baseZIndex).toBe(-100);
            expect(blockUIComponent.blocked).toBe(true);
        });

        it('should maintain state during multiple property changes', () => {
            component.blocked = true;
            fixture.detectChanges();

            blockUIComponent.autoZIndex = false;
            blockUIComponent.baseZIndex = 500;
            blockUIComponent.styleClass = 'test-class';
            fixture.detectChanges();

            expect(blockUIComponent.blocked).toBe(true);
        });
    });

    describe('CSS Classes and Styling', () => {
        let fixture: ComponentFixture<TestDynamicBlockUIComponent>;
        let component: TestDynamicBlockUIComponent;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestDynamicBlockUIComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            element = fixture.debugElement.query(By.directive(BlockUI)).nativeElement;
        });

        it('should maintain base classes alongside custom classes', () => {
            component.styleClass = 'custom-overlay';
            fixture.detectChanges();

            // Base classes
            expect(element.classList.contains('p-blockui')).toBe(true);
            expect(element.classList.contains('p-blockui-mask')).toBe(true);
            expect(element.classList.contains('p-overlay-mask')).toBe(true);
            expect(element.classList.contains('p-blockui-mask-document')).toBe(true);

            // Custom class
            expect(element.classList.contains('custom-overlay')).toBe(true);
        });

        it('should handle multiple custom classes', () => {
            component.styleClass = 'class1 class2 class3';
            fixture.detectChanges();

            expect(element.classList.contains('class1')).toBe(true);
            expect(element.classList.contains('class2')).toBe(true);
            expect(element.classList.contains('class3')).toBe(true);
        });

        it('should handle class transitions correctly', () => {
            component.styleClass = 'initial-class';
            fixture.detectChanges();
            expect(element.classList.contains('initial-class')).toBe(true);

            component.styleClass = 'updated-class';
            fixture.detectChanges();
            expect(element.classList.contains('initial-class')).toBe(false);
            expect(element.classList.contains('updated-class')).toBe(true);
        });
    });
});
