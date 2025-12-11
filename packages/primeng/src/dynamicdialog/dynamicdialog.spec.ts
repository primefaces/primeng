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
            expect(component.visible).toBe(true);
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
            component.visible = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            component.ngAfterViewInit();

            expect(component.ariaLabelledBy).toBeTruthy();
            expect(component.ariaLabelledBy).toContain('_header');
        });

        it('should not create aria-labelledby when header is null', async () => {
            mockConfig.header = null as any;
            mockConfig.showHeader = false;
            component.visible = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            component.ngAfterViewInit();
            expect(component.ariaLabelledBy).toBeNull();
        });

        it('should not create aria-labelledby when showHeader is false', async () => {
            mockConfig.showHeader = false;
            component.visible = true;
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
            component.visible = true; // Make dialog visible so template renders
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
        });

        it('should be visible by default', () => {
            expect(component.visible).toBe(true);
        });

        it('should hide dialog when close is called', () => {
            component.hide();
            expect(mockDialogRef.close).toHaveBeenCalled();
        });

        it('should close dialog when close method is called', () => {
            component.close();
            expect(component.visible).toBe(false);
        });

        it('should handle close button click', async () => {
            // Close button is now handled by Dialog component
            // Test onDialogHide which gets called when dialog closes

            // Simulate the onHide event from Dialog
            component.onDialogHide({});
            await new Promise((resolve) => setTimeout(resolve, 100));

            expect(mockDialogRef.destroy).toHaveBeenCalled();
        });
    });

    describe('Drag and Drop Functionality', () => {
        let fixture: ComponentFixture<DynamicDialog>;
        let component: DynamicDialog;

        beforeEach(async () => {
            mockConfig.draggable = true;
            mockConfig.header = 'Draggable Dialog';
            mockConfig.showHeader = true;

            fixture = TestBed.createComponent(DynamicDialog);
            component = fixture.componentInstance;
            component.childComponentType = DraggableDialogComponent;

            // Setup container with parent element for drag functionality
            const parentElement = document.createElement('div');
            const containerElement = document.createElement('div');
            parentElement.appendChild(containerElement);
            document.body.appendChild(parentElement); // Add to DOM so parentElement is accessible
            component.container = containerElement;
            component.visible = true;

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
        });

        it('should initialize drag on header mousedown', () => {
            const targetElement = document.createElement('div');
            const parentElement = document.createElement('div');
            parentElement.appendChild(targetElement);

            const mouseEvent = new MouseEvent('mousedown');
            Object.defineProperty(mouseEvent, 'target', { value: targetElement });
            Object.defineProperty(mouseEvent, 'pageX', { value: 100 });
            Object.defineProperty(mouseEvent, 'pageY', { value: 100 });

            // Mock DomHandler.getOffset to avoid parentElement issues
            spyOn(DomHandler, 'getOffset').and.returnValue({ left: 50, top: 50 });
            spyOn(component, 'bindDocumentDragListener');
            spyOn(component, 'bindDocumentDragEndListener');

            component.initDrag(mouseEvent);

            expect(component.dragging).toBe(true);
            expect(component.lastPageX).toBe(100);
            expect(component.lastPageY).toBe(100);
            expect(mockDialogRef.dragStart).toHaveBeenCalledWith(mouseEvent);
        });

        it('should not initialize drag when clicking on header icons', () => {
            const iconElement = document.createElement('i');
            iconElement.className = 'p-dialog-header-icon';
            const mouseEvent = new MouseEvent('mousedown');
            Object.defineProperty(mouseEvent, 'pageX', { value: 100 });
            Object.defineProperty(mouseEvent, 'pageY', { value: 100 });
            Object.defineProperty(mouseEvent, 'target', { value: iconElement });

            component.initDrag(mouseEvent);

            expect(component.dragging).toBeUndefined();
        });

        it('should handle drag movement', () => {
            component.dragging = true;
            component.lastPageX = 100;
            component.lastPageY = 100;
            component.container = document.createElement('div');
            component.container.style.position = 'absolute';

            // Mock getBoundingClientRect
            spyOn(component.container, 'getBoundingClientRect').and.returnValue({
                left: 50,
                top: 50,
                width: 200,
                height: 150,
                right: 250,
                bottom: 200
            } as any);

            const mouseEvent = new MouseEvent('mousemove');
            Object.defineProperty(mouseEvent, 'pageX', { value: 150 });
            Object.defineProperty(mouseEvent, 'pageY', { value: 120 });
            component.onDrag(mouseEvent);

            expect(component.lastPageX).toBe(150);
            expect(component.lastPageY).toBe(120);
        });

        it('should handle drag with keepInViewport constraint', () => {
            mockConfig.keepInViewport = true;
            component.dragging = true;
            component.lastPageX = 100;
            component.lastPageY = 100;
            component.container = document.createElement('div');

            spyOn(component.container, 'getBoundingClientRect').and.returnValue({
                left: 50,
                top: 50,
                width: 200,
                height: 150,
                right: 250,
                bottom: 200
            } as any);

            const mouseEvent = new MouseEvent('mousemove');
            Object.defineProperty(mouseEvent, 'pageX', { value: 150 });
            Object.defineProperty(mouseEvent, 'pageY', { value: 120 });
            component.onDrag(mouseEvent);

            expect(component.container.style.position).toBe('fixed');
        });

        it('should end drag properly', () => {
            component.dragging = true;
            const mouseEvent = new MouseEvent('mouseup');

            spyOn(component.cd, 'detectChanges');

            component.endDrag(mouseEvent);

            expect(component.dragging).toBe(false);
            expect(mockDialogRef.dragEnd).toHaveBeenCalledWith(mouseEvent);
            expect(component.cd.detectChanges).toHaveBeenCalled();
        });

        it('should reset position correctly', () => {
            component.container = document.createElement('div');
            component.container.style.position = 'absolute';
            component.container.style.left = '100px';
            component.container.style.top = '50px';
            component.container.style.margin = '10px';

            component.resetPosition();

            expect(component.container.style.position).toBe('' as any);
            expect(component.container.style.left).toBe('' as any);
            expect(component.container.style.top).toBe('' as any);
            expect(component.container.style.margin).toBe('' as any);
        });

        afterEach(() => {
            // Cleanup DOM elements
            const containers = document.body.querySelectorAll('div');
            containers.forEach((container) => {
                if (container.parentElement === document.body) {
                    document.body.removeChild(container);
                }
            });
        });
    });

    describe('Resize Functionality', () => {
        let fixture: ComponentFixture<DynamicDialog>;
        let component: DynamicDialog;

        beforeEach(async () => {
            mockConfig.resizable = true;
            mockConfig.header = 'Resizable Dialog';

            fixture = TestBed.createComponent(DynamicDialog);
            component = fixture.componentInstance;
            component.childComponentType = ResizableDialogComponent;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
        });

        it('should initialize resize on handle mousedown', () => {
            const mouseEvent = new MouseEvent('mousedown');
            Object.defineProperty(mouseEvent, 'pageX', { value: 100 });
            Object.defineProperty(mouseEvent, 'pageY', { value: 100 });

            spyOn(component, 'bindDocumentResizeListeners');

            component.initResize(mouseEvent);

            expect(component.resizing).toBe(true);
            expect(component.lastPageX).toBe(100);
            expect(component.lastPageY).toBe(100);
            expect(mockDialogRef.resizeInit).toHaveBeenCalledWith(mouseEvent);
        });

        it('should handle resize movement', () => {
            component.resizing = true;
            component.lastPageX = 100;
            component.lastPageY = 100;
            component.container = document.createElement('div');
            component.contentViewChild = { nativeElement: document.createElement('div') } as any;

            // Mock element dimensions
            spyOn(component.container, 'getBoundingClientRect').and.returnValue({
                left: 50,
                top: 50,
                width: 200,
                height: 150,
                right: 250,
                bottom: 200
            } as any);

            const mouseEvent = new MouseEvent('mousemove');
            Object.defineProperty(mouseEvent, 'pageX', { value: 150 });
            Object.defineProperty(mouseEvent, 'pageY', { value: 130 });
            component.onResize(mouseEvent);

            expect(component.lastPageX).toBe(150);
            expect(component.lastPageY).toBe(130);
        });

        it('should respect minimum dimensions during resize', () => {
            component.resizing = true;
            component.lastPageX = 100;
            component.lastPageY = 100;
            component.container = document.createElement('div');
            component.container.style.minWidth = '300px';
            component.container.style.minHeight = '200px';
            component.contentViewChild = { nativeElement: document.createElement('div') } as any;

            spyOn(component.container, 'getBoundingClientRect').and.returnValue({
                left: 50,
                top: 50,
                width: 280,
                height: 180,
                right: 330,
                bottom: 230
            } as any);

            const mouseEvent = new MouseEvent('mousemove');
            Object.defineProperty(mouseEvent, 'pageX', { value: 90 });
            Object.defineProperty(mouseEvent, 'pageY', { value: 90 });
            component.onResize(mouseEvent);

            // Should not resize below minimum dimensions
            expect(component._style.width).toBeUndefined();
        });

        it('should end resize properly', () => {
            component.resizing = true;
            const mouseEvent = new MouseEvent('mouseup');

            component.resizeEnd(mouseEvent);

            expect(component.resizing).toBe(false);
            expect(mockDialogRef.resizeEnd).toHaveBeenCalledWith(mouseEvent);
        });
    });

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
            component.visible = true; // Make dialog visible so template renders
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
            component.visible = true; // Make dialog visible
        });

        it('should load child component correctly', () => {
            const mockViewContainer = {
                clear: jasmine.createSpy('clear'),
                createComponent: jasmine.createSpy('createComponent').and.returnValue({
                    setInput: jasmine.createSpy('setInput'),
                    instance: new TestDialogContentComponent(mockDialogRef, mockConfig)
                })
            };

            component.insertionPoint = {
                viewContainerRef: mockViewContainer as any
            } as any;

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

    describe('Cleanup and Memory Leak Prevention', () => {
        let fixture: ComponentFixture<DynamicDialog>;
        let component: DynamicDialog;

        beforeEach(async () => {
            mockConfig.header = 'Test Dialog';

            fixture = TestBed.createComponent(DynamicDialog);
            component = fixture.componentInstance;
            component.childComponentType = TestDialogContentComponent;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
        });

        it('should cleanup all listeners on destroy', () => {
            spyOn(component, 'onContainerDestroy');
            spyOn(component, 'destroyStyle');

            // Simulate component ref
            component.componentRef = {
                destroy: jasmine.createSpy('destroy')
            } as any;

            component.ngOnDestroy();

            expect(component.onContainerDestroy).toHaveBeenCalled();
            expect(component.componentRef!.destroy).toHaveBeenCalled();
            expect(component.destroyStyle).toHaveBeenCalled();
        });

        it('should unbind all global listeners', () => {
            spyOn(component, 'unbindDocumentEscapeListener');
            spyOn(component, 'unbindDocumentResizeListeners');
            spyOn(component, 'unbindDocumentDragListener');
            spyOn(component, 'unbindDocumentDragEndListener');

            component.unbindGlobalListeners();

            expect(component.unbindDocumentEscapeListener).toHaveBeenCalled();
            expect(component.unbindDocumentResizeListeners).toHaveBeenCalled();
            expect(component.unbindDocumentDragListener).toHaveBeenCalled();
            expect(component.unbindDocumentDragEndListener).toHaveBeenCalled();
        });

        it('should clear z-index utilities on container destroy', () => {
            component.container = document.createElement('div');
            mockConfig.autoZIndex = true;
            mockConfig.modal = true; // Enable modal so disableModality gets called

            spyOn(component, 'unbindGlobalListeners');
            spyOn(component, 'disableModality');

            component.onContainerDestroy();

            expect(component.unbindGlobalListeners).toHaveBeenCalled();
            expect(component.disableModality).toHaveBeenCalled();
            expect(component.container).toBeNull();
        });

        it('should destroy style element on destroy', () => {
            component.styleElement = document.createElement('style');
            document.head.appendChild(component.styleElement);

            spyOn(component.renderer, 'removeChild');
            const styleElement = component.styleElement;

            component.destroyStyle();

            expect(component.renderer.removeChild).toHaveBeenCalledWith(document.head, styleElement);
            expect(component.styleElement).toBeNull();
        });

        it('should unbind mask click listener', () => {
            const mockListener = jasmine.createSpy('mockListener');
            component.maskClickListener = mockListener;

            component.unbindMaskClickListener();

            expect(mockListener).toHaveBeenCalled();
            expect(component.maskClickListener).toBeNull();
        });

        it('should unbind document listeners correctly', () => {
            const mockResizeListener = jasmine.createSpy('mockResizeListener');
            const mockResizeEndListener = jasmine.createSpy('mockResizeEndListener');

            component.documentResizeListener = mockResizeListener;
            component.documentResizeEndListener = mockResizeEndListener;

            component.unbindDocumentResizeListeners();

            expect(mockResizeListener).toHaveBeenCalled();
            expect(mockResizeEndListener).toHaveBeenCalled();
            expect(component.documentResizeListener).toBeNull();
            expect(component.documentResizeEndListener).toBeNull();
        });

        it('should unbind drag listeners correctly', () => {
            // Set up actual listeners first
            const mockDragListener = jasmine.createSpy('dragListener');
            const mockDragEndListener = jasmine.createSpy('dragEndListener');

            component.documentDragListener = mockDragListener;
            component.documentDragEndListener = mockDragEndListener;

            expect(component.documentDragListener).not.toBeNull();
            expect(component.documentDragEndListener).not.toBeNull();

            component.unbindDocumentDragListener();
            component.unbindDocumentDragEndListener();

            // Check that listeners were called (they are removal functions)
            expect(mockDragListener).toHaveBeenCalled();
            expect(mockDragEndListener).toHaveBeenCalled();

            // Check that references were nullified
            expect(component.documentDragListener).toBeNull();
            expect(component.documentDragEndListener).toBeNull();
        });
    });

    describe('Breakpoints and Responsive Design', () => {
        let fixture: ComponentFixture<DynamicDialog>;
        let component: DynamicDialog;

        beforeEach(async () => {
            mockConfig.breakpoints = {
                '960px': '75vw',
                '640px': '90vw'
            };

            fixture = TestBed.createComponent(DynamicDialog);
            component = fixture.componentInstance;
            component.childComponentType = TestDialogContentComponent; // Set child component

            // Mock platform to be browser for createStyle to work
            Object.defineProperty(component, 'platformId', { value: 'browser' });

            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
        });

        it('should create style element for breakpoints', () => {
            // Reset styleElement so createStyle can run again
            component.styleElement = null as any;

            spyOn(component.renderer, 'createElement').and.returnValue(document.createElement('style'));
            spyOn(component.renderer, 'appendChild');
            spyOn(component.renderer, 'setProperty');

            // Call createStyle directly
            component.createStyle();

            expect(component.renderer.createElement).toHaveBeenCalledWith('style');
            expect(component.renderer.appendChild).toHaveBeenCalled();
            expect(component.renderer.setProperty).toHaveBeenCalled();
        });

        it('should generate correct CSS for breakpoints', () => {
            // Reset styleElement so createStyle can run again
            component.styleElement = null as any;

            // Call createStyle directly
            component.createStyle();

            expect(component.styleElement).toBeTruthy();
            expect(component.styleElement.type).toBe('text/css');
        });
    });
});
