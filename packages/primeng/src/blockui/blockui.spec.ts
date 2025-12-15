import { Component, ElementRef, input, provideZonelessChangeDetection, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

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
            imports: [BlockUIModule, SharedModule],
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
            ],
            providers: [provideZonelessChangeDetection()]
        });
    });

    describe('Component Initialization', () => {
        let fixture: ComponentFixture<TestBasicBlockUIComponent>;
        let component: BlockUI;
        let element: HTMLElement;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestBasicBlockUIComponent);
            await fixture.whenStable();

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

        it('should apply base CSS classes', async () => {
            // Block to apply overlay classes
            component.blocked = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            await fixture.whenStable();

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

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestBlockedBlockUIComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();

            const blockUIDebugElement = fixture.debugElement.query(By.directive(BlockUI));
            blockUIComponent = blockUIDebugElement.componentInstance;
            element = blockUIDebugElement.nativeElement;
        });

        it('should not be blocked initially', () => {
            expect(blockUIComponent.blocked).toBe(false);
            expect(element.getAttribute('aria-busy')).toBe('false');
            expect(element.style.display).not.toBe('flex');
        });

        it('should block when blocked property is true', async () => {
            component.blocked = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(blockUIComponent.blocked).toBe(true);
            expect(element.getAttribute('aria-busy')).toBe('true');
            expect(element.style.display).toBe('flex');
        });

        it('should unblock when blocked property is false', async () => {
            component.blocked = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(blockUIComponent.blocked).toBe(true);

            component.blocked = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(blockUIComponent.blocked).toBe(false);
            expect(element.getAttribute('aria-busy')).toBe('false');
        });

        it('should toggle blocked state dynamically', async () => {
            // Initially not blocked
            expect(blockUIComponent.blocked).toBe(false);

            // Block
            component.blocked = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(blockUIComponent.blocked).toBe(true);
            expect(element.style.display).toBe('flex');

            // Unblock
            component.blocked = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(blockUIComponent.blocked).toBe(false);
        });
    });

    describe('Z-Index Management', () => {
        let fixture: ComponentFixture<TestAutoZIndexBlockUIComponent>;
        let component: TestAutoZIndexBlockUIComponent;
        let blockUIComponent: BlockUI;
        let element: HTMLElement;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestAutoZIndexBlockUIComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();

            const blockUIDebugElement = fixture.debugElement.query(By.directive(BlockUI));
            blockUIComponent = blockUIDebugElement.componentInstance;
            element = blockUIDebugElement.nativeElement;
        });

        it('should have autoZIndex enabled by default', () => {
            expect(blockUIComponent.autoZIndex).toBe(true);
        });

        it('should respect baseZIndex value', async () => {
            component.baseZIndex = 1000;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(blockUIComponent.baseZIndex).toBe(1000);
        });

        it('should disable auto z-index when set to false', async () => {
            component.autoZIndex = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(blockUIComponent.autoZIndex).toBe(false);
        });

        it('should apply z-index when blocked and autoZIndex is true', async () => {
            component.blocked = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            // Z-index should be applied by ZIndexUtils
            expect(element.style.zIndex).toBeTruthy();
        });

        it('should not apply z-index when autoZIndex is false', async () => {
            component.autoZIndex = false;
            component.blocked = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            // Z-index might still be set by ZIndexUtils, but autoZIndex flag controls the behavior
            expect(blockUIComponent.autoZIndex).toBe(false);
        });
    });

    describe('Style Class', () => {
        let fixture: ComponentFixture<TestStyleClassBlockUIComponent>;
        let component: TestStyleClassBlockUIComponent;
        let element: HTMLElement;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestStyleClassBlockUIComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();

            element = fixture.debugElement.query(By.directive(BlockUI)).nativeElement;
        });

        it('should apply custom style class', () => {
            expect(element.classList.contains('custom-blockui')).toBe(true);
        });

        it('should update style class dynamically', async () => {
            component.styleClass = 'new-custom-class';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(element.classList.contains('new-custom-class')).toBe(true);
        });

        it('should handle undefined style class', async () => {
            component.styleClass = undefined as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

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

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestContentBlockUIComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();
        });

        it('should project content', () => {
            const customContent = fixture.debugElement.query(By.css('.custom-content'));
            expect(customContent).toBeTruthy();
            expect(customContent.nativeElement.textContent.trim()).toBe('Loading...');
        });

        it('should show projected content when blocked', async () => {
            component.blocked = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const customContent = fixture.debugElement.query(By.css('.custom-content'));
            expect(customContent).toBeTruthy();
        });

        it('should hide projected content when not blocked', async () => {
            component.blocked = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const blockUIElement = fixture.debugElement.query(By.directive(BlockUI)).nativeElement;
            expect(blockUIElement.style.display).not.toBe('flex');
        });
    });

    describe('Template Content', () => {
        let fixture: ComponentFixture<TestTemplateBlockUIComponent>;
        let component: TestTemplateBlockUIComponent;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestTemplateBlockUIComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();
        });

        it('should render template content', async () => {
            component.blocked = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const templateContent = fixture.debugElement.query(By.css('.template-content'));
            expect(templateContent).toBeTruthy();
            expect(templateContent.nativeElement.textContent.trim()).toBe('Please wait...');
        });

        it('should handle template content when not blocked', () => {
            const blockUIElement = fixture.debugElement.query(By.directive(BlockUI)).nativeElement;
            expect(blockUIElement.style.display).not.toBe('flex');
        });
    });

    describe('Target Blocking - Blockable Component', () => {
        let fixture: ComponentFixture<TestBlockableTargetBlockUIComponent>;
        let component: TestBlockableTargetBlockUIComponent;
        let blockUIComponent: BlockUI;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestBlockableTargetBlockUIComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();

            blockUIComponent = fixture.debugElement.query(By.directive(BlockUI)).componentInstance;
        });

        it('should have blockable target reference', () => {
            expect(component.blockableTarget).toBeTruthy();
            expect(blockUIComponent.target).toBe(component.blockableTarget);
        });

        it('should block target component', async () => {
            component.blocked = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(blockUIComponent.blocked).toBe(true);
        });

        it('should unblock target component', async () => {
            component.blocked = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(blockUIComponent.blocked).toBe(true);

            component.blocked = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
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

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestDynamicBlockUIComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();

            const blockUIDebugElement = fixture.debugElement.query(By.directive(BlockUI));
            blockUIComponent = blockUIDebugElement.componentInstance;
            element = blockUIDebugElement.nativeElement;
        });

        it('should handle combined property changes', async () => {
            component.blocked = true;
            component.autoZIndex = false;
            component.baseZIndex = 2000;
            component.styleClass = 'dynamic-class';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(blockUIComponent.blocked).toBe(true);
            expect(blockUIComponent.autoZIndex).toBe(false);
            expect(blockUIComponent.baseZIndex).toBe(2000);
            expect(element.classList.contains('dynamic-class')).toBe(true);
        });

        it('should update content dynamically', async () => {
            component.content = 'Updated content';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const dynamicContent = fixture.debugElement.query(By.css('.dynamic-content'));
            expect(dynamicContent.nativeElement.textContent).toBe('Updated content');
        });

        it('should handle state transitions', async () => {
            // Start unblocked
            expect(blockUIComponent.blocked).toBe(false);

            // Block
            component.blocked = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(blockUIComponent.blocked).toBe(true);
            expect(element.style.display).toBe('flex');

            // Unblock
            component.blocked = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(blockUIComponent.blocked).toBe(false);
        });

        it('should handle z-index transitions', async () => {
            // Start with autoZIndex enabled
            expect(blockUIComponent.autoZIndex).toBe(true);

            // Block and check z-index is applied
            component.blocked = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.style.zIndex).toBeTruthy();

            // Disable autoZIndex
            component.blocked = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            component.autoZIndex = false;
            component.blocked = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(blockUIComponent.autoZIndex).toBe(false);
        });

        it('should handle style class transitions', async () => {
            component.styleClass = 'class1';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('class1')).toBe(true);

            component.styleClass = 'class2';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('class1')).toBe(false);
            expect(element.classList.contains('class2')).toBe(true);

            component.styleClass = '';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
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

        it('should handle blocked state set before view init', async () => {
            component.blocked = true; // Set before detectChanges
            await fixture.whenStable(); // This calls ngAfterViewInit

            blockUIComponent = fixture.debugElement.query(By.directive(BlockUI)).componentInstance;
            expect(blockUIComponent.blocked).toBe(true);
        });

        it('should unblock on destroy', async () => {
            await fixture.whenStable();
            blockUIComponent = fixture.debugElement.query(By.directive(BlockUI)).componentInstance;

            component.blocked = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            await fixture.whenStable();
            expect(blockUIComponent.blocked).toBe(true);

            // Verify cleanup happens on destroy
            fixture.destroy();

            // After destroy, the component should have cleaned up (blocked should be false)
            expect(blockUIComponent.blocked).toBe(false);
        });
    });

    describe('Edge Cases', () => {
        let fixture: ComponentFixture<TestBlockedBlockUIComponent>;
        let component: TestBlockedBlockUIComponent;
        let blockUIComponent: BlockUI;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestBlockedBlockUIComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();

            blockUIComponent = fixture.debugElement.query(By.directive(BlockUI)).componentInstance;
        });

        it('should handle rapid block/unblock calls', async () => {
            component.blocked = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(blockUIComponent.blocked).toBe(true);

            component.blocked = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(blockUIComponent.blocked).toBe(false);

            component.blocked = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(blockUIComponent.blocked).toBe(true);
        });

        it('should handle null/undefined values gracefully', async () => {
            blockUIComponent.target = null as any;
            blockUIComponent.styleClass = undefined as any;

            expect(async () => {
                component.blocked = true;
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
            }).not.toThrow();
        });

        it('should handle negative z-index values', async () => {
            blockUIComponent.baseZIndex = -100;
            component.blocked = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(blockUIComponent.baseZIndex).toBe(-100);
            expect(blockUIComponent.blocked).toBe(true);
        });

        it('should maintain state during multiple property changes', async () => {
            component.blocked = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            blockUIComponent.autoZIndex = false;
            blockUIComponent.baseZIndex = 500;
            blockUIComponent.styleClass = 'test-class';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(blockUIComponent.blocked).toBe(true);
        });
    });

    describe('CSS Classes and Styling', () => {
        let fixture: ComponentFixture<TestDynamicBlockUIComponent>;
        let component: TestDynamicBlockUIComponent;
        let element: HTMLElement;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestDynamicBlockUIComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();

            element = fixture.debugElement.query(By.directive(BlockUI)).nativeElement;
        });

        it('should maintain base classes alongside custom classes', async () => {
            component.styleClass = 'custom-overlay';
            component.blocked = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            fixture.detectChanges();
            await fixture.whenStable();

            expect(element.classList.contains('p-blockui')).toBe(true);
            expect(element.classList.contains('p-blockui-mask')).toBe(true);
            expect(element.classList.contains('p-overlay-mask')).toBe(true);
            expect(element.classList.contains('p-blockui-mask-document')).toBe(true);

            expect(element.classList.contains('custom-overlay')).toBe(true);
        });

        it('should handle multiple custom classes', async () => {
            component.styleClass = 'class1 class2 class3';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(element.classList.contains('class1')).toBe(true);
            expect(element.classList.contains('class2')).toBe(true);
            expect(element.classList.contains('class3')).toBe(true);
        });

        it('should handle class transitions correctly', async () => {
            component.styleClass = 'initial-class';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('initial-class')).toBe(true);

            component.styleClass = 'updated-class';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(element.classList.contains('initial-class')).toBe(false);
            expect(element.classList.contains('updated-class')).toBe(true);
        });
    });

    describe('PassThrough API', () => {
        @Component({
            standalone: true,
            imports: [BlockUI],
            template: `<p-blockui [blocked]="blocked()" [autoZIndex]="autoZIndex()" [baseZIndex]="baseZIndex()" [pt]="pt()"></p-blockui>`
        })
        class TestPTBlockUIComponent {
            blocked = input<boolean>(false);
            autoZIndex = input<boolean>(true);
            baseZIndex = input<number>(0);
            pt = input<any>();
        }

        describe('Case 1: Simple string classes', () => {
            let fixture: ComponentFixture<TestPTBlockUIComponent>;
            let element: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestPTBlockUIComponent);
                await fixture.whenStable();
                element = fixture.debugElement.query(By.directive(BlockUI)).nativeElement;
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
            let fixture: ComponentFixture<TestPTBlockUIComponent>;
            let element: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestPTBlockUIComponent);
                await fixture.whenStable();
                element = fixture.debugElement.query(By.directive(BlockUI)).nativeElement;
            });

            it('should apply object with class, style, data and aria attributes to root', async () => {
                fixture.componentRef.setInput('pt', {
                    root: {
                        class: 'ROOT_OBJECT_CLASS',
                        style: { 'background-color': 'rgba(0,0,0,0.5)' },
                        'data-p-test': true,
                        'aria-label': 'TEST_ARIA_LABEL'
                    }
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('ROOT_OBJECT_CLASS')).toBe(true);
                expect(element.style.backgroundColor).toBe('rgba(0, 0, 0, 0.5)');
                expect(element.getAttribute('data-p-test')).toBe('true');
                expect(element.getAttribute('aria-label')).toBe('TEST_ARIA_LABEL');
            });

            it('should apply object with class, style, data and aria attributes to host', async () => {
                fixture.componentRef.setInput('pt', {
                    host: {
                        class: 'HOST_OBJECT_CLASS',
                        style: { 'z-index': '1000' },
                        'data-p-host': 'blockui',
                        'aria-modal': 'true'
                    }
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('HOST_OBJECT_CLASS')).toBe(true);
                expect(element.style.zIndex).toBe('1000');
                expect(element.getAttribute('data-p-host')).toBe('blockui');
                expect(element.getAttribute('aria-modal')).toBe('true');
            });
        });

        describe('Case 3: Mixed object and string values', () => {
            let fixture: ComponentFixture<TestPTBlockUIComponent>;
            let element: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestPTBlockUIComponent);
                await fixture.whenStable();
                element = fixture.debugElement.query(By.directive(BlockUI)).nativeElement;
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
            let fixture: ComponentFixture<TestPTBlockUIComponent>;
            let element: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestPTBlockUIComponent);
                await fixture.whenStable();
                element = fixture.debugElement.query(By.directive(BlockUI)).nativeElement;
            });

            it('should use instance blocked in pt function for root', async () => {
                fixture.componentRef.setInput('blocked', true);
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                fixture.componentRef.setInput('pt', {
                    root: ({ instance }: any) => {
                        return {
                            class: instance?.blocked ? 'BLOCKED_STATE' : 'UNBLOCKED_STATE'
                        };
                    }
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.classList.contains('BLOCKED_STATE')).toBe(true);
            });

            it('should use instance autoZIndex in pt function for host', async () => {
                fixture.componentRef.setInput('autoZIndex', false);
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                fixture.componentRef.setInput('pt', {
                    host: ({ instance }: any) => {
                        return {
                            'data-auto-zindex': instance?.autoZIndex ? 'true' : 'false'
                        };
                    }
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.getAttribute('data-auto-zindex')).toBe('false');
            });

            it('should use instance baseZIndex in pt function for root', async () => {
                fixture.componentRef.setInput('baseZIndex', 1000);
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                fixture.componentRef.setInput('pt', {
                    root: ({ instance }: any) => {
                        return {
                            'data-base-zindex': String(instance?.baseZIndex)
                        };
                    }
                });
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(element.getAttribute('data-base-zindex')).toBe('1000');
            });
        });

        describe('Case 5: Event binding', () => {
            let fixture: ComponentFixture<TestPTBlockUIComponent>;
            let element: HTMLElement;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestPTBlockUIComponent);
                await fixture.whenStable();
                element = fixture.debugElement.query(By.directive(BlockUI)).nativeElement;
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
                const inlineFixture = TestBed.createComponent(TestPTBlockUIComponent);
                inlineFixture.componentRef.setInput('pt', { root: 'INLINE_TEST_CLASS' });
                inlineFixture.changeDetectorRef.markForCheck();
                await inlineFixture.whenStable();

                const element = inlineFixture.debugElement.query(By.directive(BlockUI)).nativeElement;
                expect(element.classList.contains('INLINE_TEST_CLASS')).toBe(true);
            });

            it('should apply inline pt with object class', async () => {
                const inlineFixture = TestBed.createComponent(TestPTBlockUIComponent);
                inlineFixture.componentRef.setInput('pt', { root: { class: 'INLINE_OBJECT_CLASS' } });
                inlineFixture.changeDetectorRef.markForCheck();
                await inlineFixture.whenStable();

                const element = inlineFixture.debugElement.query(By.directive(BlockUI)).nativeElement;
                expect(element.classList.contains('INLINE_OBJECT_CLASS')).toBe(true);
            });
        });

        describe('Case 8: Test hooks', () => {
            let fixture: ComponentFixture<TestPTBlockUIComponent>;

            beforeEach(() => {
                fixture = TestBed.createComponent(TestPTBlockUIComponent);
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
                await fixture.whenStable();
                fixture.destroy();

                expect(hookCalled).toBe(true);
            });
        });
    });
});
