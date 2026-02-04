import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DomHandler } from 'primeng/dom';
import { ZIndexUtils } from 'primeng/utils';
import { Subject } from 'rxjs';
import { DynamicDialog } from './dynamicdialog';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { DynamicDialogRef } from './dynamicdialog-ref';

// Test components to be used in dynamic dialogs
@Component({
    standalone: false,
    template: `
        <div class="test-component">
            <h3>Test Component Content</h3>
            <p>Data: {{ data }}</p>
            <button class="test-button" (click)="closeDialog()">Close</button>
        </div>
    `
})
class TestDialogContentComponent {
    data: any;

    constructor(
        private dialogRef: DynamicDialogRef,
        private config: DynamicDialogConfig
    ) {
        this.data = this.config.data;
    }

    closeDialog() {
        this.dialogRef.close('closed from component');
    }
}

@Component({
    standalone: false,
    template: `
        <div class="nested-dialog-content">
            <h3>Nested Dialog</h3>
            <p>Level: {{ level }}</p>
            <button class="close-nested" (click)="closeDialog()">Close</button>
        </div>
    `
})
class NestedDialogContentComponent {
    level: number;

    constructor(
        private dialogRef: DynamicDialogRef,
        private config: DynamicDialogConfig
    ) {
        this.level = this.config.data?.level || 1;
    }

    closeDialog() {
        this.dialogRef.close(`closed from level ${this.level}`);
    }
}

@Component({
    standalone: false,
    template: `
        <div class="dialog-within-dialog-content">
            <h3>Dialog Within Dialog</h3>
            <button class="inner-dialog-trigger" (click)="closeDialog()">Close</button>
        </div>
    `
})
class DialogWithinDialogComponent {
    constructor(private dialogRef: DynamicDialogRef) {}

    closeDialog() {
        this.dialogRef.close('inner dialog closed');
    }
}

@Component({
    standalone: false,
    template: `
        <div class="maximizable-content">
            <h3>Maximizable Dialog</h3>
            <p>This dialog can be maximized</p>
            <div style="height: 200px; overflow-y: auto;">
                <p *ngFor="let item of items">{{ item }}</p>
            </div>
        </div>
    `
})
class MaximizableDialogComponent {
    items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);
}

@Component({
    standalone: false,
    template: `
        <div class="resizable-content">
            <h3>Resizable Dialog</h3>
            <p>This dialog can be resized</p>
            <textarea style="width: 100%; height: 150px;" placeholder="Resize me"></textarea>
        </div>
    `
})
class ResizableDialogComponent {}

@Component({
    standalone: false,
    template: `
        <div class="draggable-content">
            <h3>Draggable Dialog</h3>
            <p>Drag me around using the header</p>
        </div>
    `
})
class DraggableDialogComponent {}

describe('DynamicDialog', () => {
    let mockDialogRef: jasmine.SpyObj<DynamicDialogRef>;
    let mockConfig: DynamicDialogConfig;

    beforeEach(async () => {
        // Create spy objects
        mockDialogRef = jasmine.createSpyObj('DynamicDialogRef', ['close', 'destroy', 'dragStart', 'dragEnd', 'resizeInit', 'resizeEnd', 'maximize'], {
            onClose: new Subject(),
            onDestroy: new Subject(),
            onDragStart: new Subject(),
            onDragEnd: new Subject(),
            onResizeInit: new Subject(),
            onResizeEnd: new Subject(),
            onMaximize: new Subject(),
            onChildComponentLoaded: new Subject()
        });

        mockConfig = new DynamicDialogConfig();

        await TestBed.configureTestingModule({
            imports: [DynamicDialog],
            declarations: [TestDialogContentComponent, NestedDialogContentComponent, DialogWithinDialogComponent, MaximizableDialogComponent, ResizableDialogComponent, DraggableDialogComponent],
            providers: [{ provide: DynamicDialogRef, useValue: mockDialogRef }, { provide: DynamicDialogConfig, useValue: mockConfig }, provideZonelessChangeDetection()]
        }).compileComponents();
    });

    afterEach(async () => {
        // Clean up any pending animations/timers
        await new Promise((resolve) => setTimeout(resolve, 0));
    });

    describe('Component Initialization', () => {
        let fixture: ComponentFixture<DynamicDialog>;
        let component: DynamicDialog;

        beforeEach(async () => {
            mockConfig.header = 'Test Dialog';
            mockConfig.width = '500px';
            mockConfig.height = '400px';

            fixture = TestBed.createComponent(DynamicDialog);
            component = fixture.componentInstance;
            component.childComponentType = TestDialogContentComponent;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
        });

        it('should create the component', () => {
            expect(component).toBeTruthy();
        });

        it('should have default values', () => {
            expect(component.visible()).toBe(true);
            expect(component.maximized).toBeUndefined();
            expect(component.dragging).toBeUndefined();
            expect(component.resizing).toBeUndefined();
        });

        it('should initialize with config values', () => {
            expect(component.header).toBe('Test Dialog');
            expect(component.ddconfig.width).toBe('500px');
            expect(component.ddconfig.height).toBe('400px');
        });

        it('should generate unique dialog ID', () => {
            expect(component.dialogId).toBeTruthy();
            expect(component.id).toBeTruthy();
        });

        it('should create aria-labelledby when header is present', async () => {
            mockConfig.showHeader = true;
            component.visible.set(true);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            component.ngAfterViewInit();

            expect(component.ariaLabelledBy).toBeTruthy();
            expect(component.ariaLabelledBy).toContain('_header');
        });

        it('should not create aria-labelledby when header is null', async () => {
            mockConfig.header = null as any;
            mockConfig.showHeader = false;
            component.visible.set(true);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            component.ngAfterViewInit();
            expect(component.ariaLabelledBy).toBeNull();
        });

        it('should not create aria-labelledby when showHeader is false', async () => {
            mockConfig.showHeader = false;
            component.visible.set(true);
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            component.ngAfterViewInit();
            expect(component.ariaLabelledBy).toBeNull();
        });
    });

    describe('Dialog Display and Hide Behavior', () => {
        let fixture: ComponentFixture<DynamicDialog>;
        let component: DynamicDialog;

        beforeEach(async () => {
            mockConfig.header = 'Test Dialog';
            mockConfig.closable = true;
            mockConfig.showHeader = true;

            fixture = TestBed.createComponent(DynamicDialog);
            component = fixture.componentInstance;
            component.childComponentType = TestDialogContentComponent;
            component.visible.set(true); // Make dialog visible so template renders
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
        });

        it('should be visible by default', () => {
            expect(component.visible()).toBe(true);
        });

        it('should hide dialog when close is called', () => {
            component.hide();
            expect(mockDialogRef.close).toHaveBeenCalled();
        });

        it('should close dialog when close method is called', () => {
            component.close();
            expect(component.visible()).toBe(false);
        });

        it('should handle close button click', async () => {
            // Close button is now handled by Dialog component
            // Test onDialogHide which gets called when dialog closes

            // Simulate the onHide event from Dialog
            component.onDialogHide();
            await new Promise((resolve) => setTimeout(resolve, 100));

            expect(mockDialogRef.destroy).toHaveBeenCalled();
        });

        it('should call close on dialogRef on close icon click', async () => {
            component.visible.set(true);
            const closeButton = fixture.debugElement.query(By.css('.p-dialog-close-button'));
            closeButton.nativeElement.click();
            expect(mockDialogRef.close).toHaveBeenCalled();
            expect(component.visible()).toBe(false);
        });

        it('should call close on dialogRef on Escape key press', async () => {
            mockConfig.closeOnEscape = true;
            component.container = document.createElement('div');
            component.visible.set(true);

            const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27 });
            component.bindDocumentEscapeListener();

            // Simulate escape key press on document
            document.dispatchEvent(escapeEvent);
            expect(mockDialogRef.close).toHaveBeenCalled();
        });
    });

    // Note: Drag and Resize functionality is now handled by the underlying p-dialog component
    // These tests have been removed as they tested internal implementation details that no longer exist

    describe('Maximize and Minimize', () => {
        let fixture: ComponentFixture<DynamicDialog>;
        let component: DynamicDialog;

        beforeEach(async () => {
            mockConfig.maximizable = true;
            mockConfig.header = 'Maximizable Dialog';
            mockConfig.showHeader = true;

            fixture = TestBed.createComponent(DynamicDialog);
            component = fixture.componentInstance;
            component.childComponentType = MaximizableDialogComponent;
            component.visible.set(true); // Make dialog visible so template renders
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
        });

        it('should toggle maximize state', () => {
            expect(component.maximized).toBeUndefined();

            component.maximize();

            expect(component.maximized).toBe(true);
            expect(mockDialogRef.maximize).toHaveBeenCalledWith({ maximized: true });

            component.maximize();

            expect(component.maximized).toBe(false);
            expect(mockDialogRef.maximize).toHaveBeenCalledWith({ maximized: false });
        });

        it('should handle maximize button click', async () => {
            const maximizeButton = fixture.debugElement.query(By.css('.p-dialog-maximize-button'));
            expect(maximizeButton).toBeTruthy();

            maximizeButton.nativeElement.click();
            await new Promise((resolve) => setTimeout(resolve, 100));

            expect(component.maximized).toBe(true);
        });

        it('should apply maximized class when maximized', async () => {
            // Get the dialog element from Dialog component
            const dialogElement = fixture.debugElement.query(By.css('p-dialog'));
            expect(dialogElement).toBeTruthy();

            // Click the maximize button which is in the Dialog component
            const maximizeButton = fixture.debugElement.query(By.css('.p-dialog-maximize-button'));
            expect(maximizeButton).toBeTruthy();

            maximizeButton.nativeElement.click();
            await new Promise((resolve) => setTimeout(resolve, 100));
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            // Check that maximized state is set
            expect(component.maximized).toBe(true);
        });
    });

    describe('Focus Management and Accessibility', () => {
        let fixture: ComponentFixture<DynamicDialog>;
        let component: DynamicDialog;

        beforeEach(async () => {
            mockConfig.focusOnShow = true;
            mockConfig.focusTrap = true;
            mockConfig.header = 'Accessible Dialog';
            mockConfig.closeAriaLabel = 'Close Dialog';

            fixture = TestBed.createComponent(DynamicDialog);
            component = fixture.componentInstance;
            component.childComponentType = TestDialogContentComponent;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
        });

        it('should have correct ARIA attributes', async () => {
            component.ngAfterViewInit();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const dialogElement = fixture.debugElement.query(By.css('[role="dialog"]'));
            expect(dialogElement).toBeTruthy();
            expect(dialogElement.nativeElement.getAttribute('role')).toBe('dialog');
            expect(dialogElement.nativeElement.getAttribute('aria-modal')).toBe('true');
        });

        // Focus management is now handled by Dialog component, removing focus tests

        it('should handle escape key press', () => {
            mockConfig.closeOnEscape = true;
            component.container = document.createElement('div');
            component.container.style.zIndex = '1000';

            spyOn(component, 'hide');
            spyOn(ZIndexUtils, 'getCurrent').and.returnValue(1000);

            const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27 });
            component.bindDocumentEscapeListener();

            // Simulate escape key press on document
            document.dispatchEvent(escapeEvent);

            expect(component.hide).toHaveBeenCalled();
        });
    });

    describe('Modal and Mask Interaction', () => {
        let fixture: ComponentFixture<DynamicDialog>;
        let component: DynamicDialog;

        beforeEach(async () => {
            mockConfig.modal = true;
            mockConfig.dismissableMask = true;
            mockConfig.header = 'Modal Dialog';

            fixture = TestBed.createComponent(DynamicDialog);
            component = fixture.componentInstance;
            component.childComponentType = TestDialogContentComponent;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
        });

        it('should enable modality when modal is true', () => {
            mockConfig.modal = true;
            const wrapperElement = document.createElement('div');
            document.body.appendChild(wrapperElement);
            component.wrapper = wrapperElement;
            spyOn(component, 'enableModality').and.callThrough();

            // const animationEvent: AnimationEvent = {
            //     element: document.createElement('div'),
            //     toState: 'visible',
            //     fromState: 'void',
            //     totalTime: 150,
            //     phaseName: 'start',
            //     triggerName: 'animation',
            //     disabled: false
            // };

            // component.onAnimationStart(animationEvent);

            // expect(component.enableModality).toHaveBeenCalled();

            // // Cleanup
            // document.body.removeChild(wrapperElement);
        });

        it('should handle dismissable mask click', () => {
            component.wrapper = document.createElement('div');
            spyOn(component, 'hide');

            component.enableModality();

            // Simulate mask click
            const mouseEvent = new MouseEvent('mousedown');
            Object.defineProperty(mouseEvent, 'target', { value: component.wrapper });
            spyOn(component.wrapper, 'isSameNode').and.returnValue(true);

            component.wrapper.dispatchEvent(mouseEvent);

            expect(component.hide).toHaveBeenCalled();
        });

        it('should not close on mask click when dismissableMask is false', () => {
            mockConfig.dismissableMask = false;
            component.wrapper = document.createElement('div');
            spyOn(component, 'hide');

            component.enableModality();

            const mouseEvent = new MouseEvent('mousedown');
            component.wrapper.dispatchEvent(mouseEvent);

            expect(component.hide).not.toHaveBeenCalled();
        });

        it('should disable modality properly', () => {
            component.wrapper = document.createElement('div');
            component.enableModality();

            spyOn(component, 'unbindMaskClickListener');
            spyOn(component.cd, 'detectChanges');

            component.disableModality();

            expect(component.unbindMaskClickListener).toHaveBeenCalled();
            expect(component.cd.detectChanges).toHaveBeenCalled();
        });
    });

    describe('Template and Content Projection', () => {
        let fixture: ComponentFixture<DynamicDialog>;
        let component: DynamicDialog;

        beforeEach(async () => {
            mockConfig.header = 'Template Dialog';
            mockConfig.footer = 'Footer Content';
            mockConfig.showHeader = true;

            fixture = TestBed.createComponent(DynamicDialog);
            component = fixture.componentInstance;
            component.childComponentType = TestDialogContentComponent;
            component.visible.set(true); // Make dialog visible
        });

        it('should load child component correctly', () => {
            const mockViewContainer = {
                clear: jasmine.createSpy('clear'),
                createComponent: jasmine.createSpy('createComponent').and.returnValue({
                    setInput: jasmine.createSpy('setInput'),
                    instance: new TestDialogContentComponent(mockDialogRef, mockConfig)
                })
            };

            (component.insertionPoint as any) = () => ({
                viewContainerRef: mockViewContainer as any
            });

            component.loadChildComponent(TestDialogContentComponent);

            expect(mockViewContainer.clear).toHaveBeenCalled();
            expect(mockViewContainer.createComponent).toHaveBeenCalledWith(TestDialogContentComponent);
        });

        it('should display header content', async () => {
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const headerElement = fixture.debugElement.query(By.css('.p-dialog-title'));
            expect(headerElement).toBeTruthy();
            expect(headerElement.nativeElement.textContent.trim()).toBe('Template Dialog');
        });

        it('should display footer content', async () => {
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            // Footer is rendered as a plain div, not with .p-dialog-footer class in dynamic dialog
            const dialogContent = fixture.nativeElement;
            expect(dialogContent.textContent).toContain('Footer Content');
        });

        it('should hide header when showHeader is false', async () => {
            mockConfig.showHeader = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const headerElement = fixture.debugElement.query(By.css('.p-dialog-header'));
            expect(headerElement).toBeFalsy();
        });
    });

    describe('Dialog Within Dialog Edge Cases', () => {
        let fixture: ComponentFixture<DynamicDialog>;
        let component: DynamicDialog;

        beforeEach(async () => {
            mockConfig.header = 'Container Dialog';

            fixture = TestBed.createComponent(DynamicDialog);
            component = fixture.componentInstance;
            component.childComponentType = DialogWithinDialogComponent;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
        });

        it('should handle dialog opened within another dialog component', async () => {
            // Simulate opening a dialog within the current dialog component
            const innerDialogRef = new DynamicDialogRef();
            const innerDialogSpy = spyOn(innerDialogRef, 'close').and.callThrough();

            expect(innerDialogRef).toBeTruthy();
            expect(innerDialogRef.onClose).toBeTruthy();

            // Close the inner dialog
            innerDialogRef.close('inner closed');

            expect(innerDialogSpy).toHaveBeenCalledWith('inner closed');

            await new Promise((resolve) => setTimeout(resolve, 100));
        });

        it('should maintain separate dialog contexts', () => {
            // Each dialog should have its own config and ref
            expect(component.ddconfig).toBe(mockConfig);
            expect(component.ddconfig).toBe(mockConfig);

            // Inner dialogs should have their own contexts
            const innerDialogRef = new DynamicDialogRef();
            const innerConfig = new DynamicDialogConfig();
            innerConfig.header = 'Inner Dialog';

            expect(innerDialogRef).not.toBe(mockDialogRef);
            expect(innerConfig).not.toBe(mockConfig);
        });

        it('should handle mask clicks correctly with nested dialogs', () => {
            component.wrapper = document.createElement('div');
            mockConfig.dismissableMask = true;

            spyOn(component, 'hide');

            component.enableModality();

            // Simulate mask click on outer dialog
            const mouseEvent = new MouseEvent('mousedown');
            Object.defineProperty(mouseEvent, 'target', { value: component.wrapper });
            spyOn(component.wrapper, 'isSameNode').and.returnValue(true);

            component.wrapper.dispatchEvent(mouseEvent);

            expect(component.hide).toHaveBeenCalled();
        });
    });

    // Note: Cleanup, breakpoint and responsive design functionality is now handled by the underlying p-dialog component
    // These tests have been removed as they tested internal implementation details that no longer exist
});
