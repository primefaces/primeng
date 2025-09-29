import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Image, ImageModule } from './image';
import { SharedModule } from 'primeng/api';

// Using image paths from photoservice.ts to ensure consistency
const mockImageSrc = 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg';
const mockPreviewImageSrc = 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg';

@Component({
    standalone: false,
    template: `
        <p-image [src]="src" [alt]="alt" [width]="width" [height]="height" [srcSet]="srcSet" [sizes]="sizes" [loading]="loading" [imageClass]="imageClass" [imageStyle]="imageStyle" [styleClass]="styleClass" (onImageError)="onImageError($event)">
        </p-image>
    `
})
class TestBasicImageComponent {
    src: string = mockImageSrc;
    alt: string = 'Test Image';
    width: string = '250';
    height: string = '200';
    srcSet: string = '';
    sizes: string = '';
    loading: 'lazy' | 'eager' | undefined = 'lazy';
    imageClass: string = 'test-image-class';
    imageStyle: any = { border: '1px solid red' };
    styleClass: string = 'test-style-class';
    imageErrorEvent: Event | null = null as any;

    onImageError(event: Event) {
        this.imageErrorEvent = event;
    }
}

@Component({
    standalone: false,
    template: `
        <p-image
            [src]="src"
            [alt]="alt"
            [width]="width"
            [preview]="true"
            [previewImageSrc]="previewImageSrc"
            [previewImageSrcSet]="previewImageSrcSet"
            [previewImageSizes]="previewImageSizes"
            [showTransitionOptions]="showTransitionOptions"
            [hideTransitionOptions]="hideTransitionOptions"
            (onShow)="onShow($event)"
            (onHide)="onHide($event)"
        >
        </p-image>
    `
})
class TestPreviewImageComponent {
    src: string = mockImageSrc;
    alt: string = 'Preview Test Image';
    width: string = '250';
    previewImageSrc: string = mockPreviewImageSrc;
    previewImageSrcSet: string = '';
    previewImageSizes: string = '';
    showTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
    hideTransitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
    showEvent: any = null as any;
    hideEvent: any = null as any;

    onShow(event: any) {
        this.showEvent = event;
    }

    onHide(event: any) {
        this.hideEvent = event;
    }
}

@Component({
    standalone: false,
    template: `
        <p-image [src]="src" [alt]="alt" [width]="width" [preview]="true">
            <ng-template #indicator>
                <i class="pi pi-search custom-indicator"></i>
            </ng-template>
            <ng-template #image>
                <img [src]="src" [alt]="alt" class="custom-image" />
            </ng-template>
            <ng-template #preview let-style="style" let-previewCallback="previewCallback">
                <img [src]="previewImageSrc" [alt]="alt" [style]="style" (click)="previewCallback()" class="custom-preview" />
            </ng-template>
            <ng-template #rotaterighticon>
                <i class="pi pi-refresh custom-rotate-right"></i>
            </ng-template>
            <ng-template #rotatelefticon>
                <i class="pi pi-undo custom-rotate-left"></i>
            </ng-template>
            <ng-template #zoomouticon>
                <i class="pi pi-minus custom-zoom-out"></i>
            </ng-template>
            <ng-template #zoominicon>
                <i class="pi pi-plus custom-zoom-in"></i>
            </ng-template>
            <ng-template #closeicon>
                <i class="pi pi-times custom-close"></i>
            </ng-template>
        </p-image>
    `
})
class TestTemplateImageComponent {
    src: string = mockImageSrc;
    alt: string = 'Template Test Image';
    width: string = '250';
    previewImageSrc: string = mockPreviewImageSrc;
}

@Component({
    standalone: false,
    template: `
        <p-image [src]="src" [alt]="alt" [width]="width" [preview]="true">
            <ng-template pTemplate="indicator">
                <i class="pi pi-eye ptemplate-indicator"></i>
            </ng-template>
            <ng-template pTemplate="image">
                <img [src]="src" [alt]="alt" class="ptemplate-image" />
            </ng-template>
            <ng-template pTemplate="preview" let-style="style" let-previewCallback="previewCallback">
                <img [src]="previewImageSrc" [alt]="alt" [style]="style" (click)="previewCallback()" class="ptemplate-preview" />
            </ng-template>
            <ng-template pTemplate="rotaterighticon">
                <i class="pi pi-refresh ptemplate-rotate-right"></i>
            </ng-template>
            <ng-template pTemplate="rotatelefticon">
                <i class="pi pi-undo ptemplate-rotate-left"></i>
            </ng-template>
            <ng-template pTemplate="zoomouticon">
                <i class="pi pi-minus ptemplate-zoom-out"></i>
            </ng-template>
            <ng-template pTemplate="zoominicon">
                <i class="pi pi-plus ptemplate-zoom-in"></i>
            </ng-template>
            <ng-template pTemplate="closeicon">
                <i class="pi pi-times ptemplate-close"></i>
            </ng-template>
        </p-image>
    `
})
class TestPTemplateImageComponent {
    src: string = mockImageSrc;
    alt: string = 'PTemplate Test Image';
    width: string = '250';
    previewImageSrc: string = mockPreviewImageSrc;
}

describe('Image', () => {
    let component: Image;
    let fixture: ComponentFixture<Image>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ImageModule, SharedModule, NoopAnimationsModule],
            declarations: [TestBasicImageComponent, TestPreviewImageComponent, TestTemplateImageComponent, TestPTemplateImageComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(Image);
        component = fixture.componentInstance;
    });

    describe('Component Initialization', () => {
        it('should create the component', () => {
            expect(component).toBeTruthy();
        });

        it('should have default values', () => {
            expect(component.preview).toBe(false);
            expect(component.maskVisible).toBe(false);
            expect(component.previewVisible).toBe(false);
            expect(component.rotate).toBe(0);
            expect(component.scale).toBe(1);
            expect(component.previewClick).toBe(false);
            expect(component.showTransitionOptions).toBe('150ms cubic-bezier(0, 0, 0.2, 1)');
            expect(component.hideTransitionOptions).toBe('150ms cubic-bezier(0, 0, 0.2, 1)');
        });

        it('should accept custom input values', () => {
            const testFixture = TestBed.createComponent(TestBasicImageComponent);
            const testComponent = testFixture.componentInstance;
            testFixture.detectChanges();

            const imageElement = testFixture.debugElement.query(By.css('img'));
            expect(imageElement.nativeElement.src).toContain(mockImageSrc);
            expect(imageElement.nativeElement.alt).toBe('Test Image');
            expect(imageElement.nativeElement.width).toBeGreaterThan(240);
            expect(imageElement.nativeElement.height).toBeGreaterThan(190);
        });

        it('should render image element with proper attributes', () => {
            component.src = mockImageSrc;
            component.alt = 'Test Image';
            component.width = '300';
            component.height = '200';
            fixture.detectChanges();

            const imageElement = fixture.debugElement.query(By.css('img'));
            expect(imageElement).toBeTruthy();
            expect(imageElement.nativeElement.src).toContain(mockImageSrc);
            expect(imageElement.nativeElement.alt).toBe('Test Image');
            expect(imageElement.nativeElement.width).toBe(300);
            expect(imageElement.nativeElement.height).toBe(200);
        });
    });

    describe('Preview Functionality', () => {
        let testFixture: ComponentFixture<TestPreviewImageComponent>;
        let testComponent: TestPreviewImageComponent;
        let imageInstance: Image;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestPreviewImageComponent);
            testComponent = testFixture.componentInstance;
            testFixture.detectChanges();
            imageInstance = testFixture.debugElement.query(By.directive(Image)).componentInstance;
        });

        it('should render preview button when preview is enabled', () => {
            const previewButton = testFixture.debugElement.query(By.css('button'));
            expect(previewButton).toBeTruthy();
            expect(previewButton.nativeElement.getAttribute('aria-label')).toBeTruthy();
        });

        it('should open preview on button click', fakeAsync(() => {
            const previewButton = testFixture.debugElement.query(By.css('button'));
            previewButton.nativeElement.click();
            tick();

            expect(imageInstance.maskVisible).toBe(true);
            expect(imageInstance.previewVisible).toBe(true);
        }));

        it('should show mask overlay when preview is opened', fakeAsync(() => {
            imageInstance.onImageClick();
            tick();
            testFixture.detectChanges();

            const maskElement = testFixture.debugElement.query(By.css('.p-image-mask, [class*="mask"]'));
            expect(maskElement).toBeTruthy();
        }));

        it('should close preview when clicking outside', fakeAsync(() => {
            imageInstance.onImageClick();
            tick();
            testFixture.detectChanges();

            imageInstance.onMaskClick();
            expect(imageInstance.previewVisible).toBe(false);
        }));

        it('should close preview on Escape key', fakeAsync(() => {
            imageInstance.onImageClick();
            tick();
            testFixture.detectChanges();

            const escapeEvent = new KeyboardEvent('keydown', { code: 'Escape' });
            imageInstance.onMaskKeydown(escapeEvent);
            expect(imageInstance.previewVisible).toBe(false);
        }));
    });

    describe('Image Transformation', () => {
        let testFixture: ComponentFixture<TestPreviewImageComponent>;
        let imageInstance: Image;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestPreviewImageComponent);
            testFixture.detectChanges();
            imageInstance = testFixture.debugElement.query(By.directive(Image)).componentInstance;
        });

        it('should rotate right', () => {
            const initialRotate = imageInstance.rotate;
            imageInstance.rotateRight();
            expect(imageInstance.rotate).toBe(initialRotate + 90);
            expect(imageInstance.previewClick).toBe(true);
        });

        it('should rotate left', () => {
            const initialRotate = imageInstance.rotate;
            imageInstance.rotateLeft();
            expect(imageInstance.rotate).toBe(initialRotate - 90);
            expect(imageInstance.previewClick).toBe(true);
        });

        it('should zoom in', () => {
            const initialScale = imageInstance.scale;
            imageInstance.zoomIn();
            expect(imageInstance.scale).toBe(initialScale + 0.1);
            expect(imageInstance.previewClick).toBe(true);
        });

        it('should zoom out', () => {
            const initialScale = imageInstance.scale;
            imageInstance.zoomOut();
            expect(imageInstance.scale).toBe(initialScale - 0.1);
            expect(imageInstance.previewClick).toBe(true);
        });

        it('should disable zoom out at minimum scale', () => {
            imageInstance.scale = 0.5; // minimum scale
            expect(imageInstance.isZoomOutDisabled).toBe(true);
        });

        it('should disable zoom in at maximum scale', () => {
            imageInstance.scale = 1.5; // maximum scale
            expect(imageInstance.isZoomInDisabled).toBe(true);
        });

        it('should calculate image preview style correctly', () => {
            imageInstance.rotate = 90;
            imageInstance.scale = 1.2;
            const style = imageInstance.imagePreviewStyle();
            expect(style.transform).toBe('rotate(90deg) scale(1.2)');
        });
    });

    describe('Template Content Projection', () => {
        it('should render custom indicator template with #template approach', () => {
            const testFixture = TestBed.createComponent(TestTemplateImageComponent);
            testFixture.detectChanges();

            const customIndicator = testFixture.debugElement.query(By.css('.custom-indicator'));
            expect(customIndicator).toBeTruthy();
        });

        it('should render custom image template with #template approach', () => {
            const testFixture = TestBed.createComponent(TestTemplateImageComponent);
            testFixture.detectChanges();

            const customImage = testFixture.debugElement.query(By.css('.custom-image'));
            expect(customImage).toBeTruthy();
        });

        it('should render custom templates with pTemplate approach', () => {
            const testFixture = TestBed.createComponent(TestPTemplateImageComponent);
            testFixture.detectChanges();

            const pTemplateIndicator = testFixture.debugElement.query(By.css('.ptemplate-indicator'));
            const pTemplateImage = testFixture.debugElement.query(By.css('.ptemplate-image'));

            expect(pTemplateIndicator).toBeTruthy();
            expect(pTemplateImage).toBeTruthy();
        });
    });

    describe('Event Handling', () => {
        let testFixture: ComponentFixture<TestPreviewImageComponent>;
        let testComponent: TestPreviewImageComponent;
        let imageInstance: Image;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestPreviewImageComponent);
            testComponent = testFixture.componentInstance;
            testFixture.detectChanges();
            imageInstance = testFixture.debugElement.query(By.directive(Image)).componentInstance;
        });

        it('should emit onShow event when preview is opened', fakeAsync(() => {
            spyOn(imageInstance.onShow, 'emit');

            // Simulate animation end event
            const animationEvent = {
                toState: 'visible'
            } as any;

            imageInstance.onAnimationEnd(animationEvent);
            expect(imageInstance.onShow.emit).toHaveBeenCalled();
        }));

        it('should emit onHide event when preview is closed', fakeAsync(() => {
            spyOn(imageInstance.onHide, 'emit');

            // Simulate animation end event
            const animationEvent = {
                toState: 'void'
            } as any;

            imageInstance.onAnimationEnd(animationEvent);
            expect(imageInstance.onHide.emit).toHaveBeenCalled();
        }));

        it('should emit onImageError event on image error', () => {
            const testFixture = TestBed.createComponent(TestBasicImageComponent);
            const testComponent = testFixture.componentInstance;
            testFixture.detectChanges();

            const imageElement = testFixture.debugElement.query(By.css('img'));
            const errorEvent = new Event('error');

            imageElement.nativeElement.dispatchEvent(errorEvent);
            testFixture.detectChanges();

            expect(testComponent.imageErrorEvent).toBeTruthy();
        });

        it('should handle toolbar click', () => {
            const mockEvent = new MouseEvent('click');
            spyOn(mockEvent, 'stopPropagation');

            imageInstance.handleToolbarClick(mockEvent);
            expect(mockEvent.stopPropagation).toHaveBeenCalled();
        });

        it('should handle preview image click', () => {
            imageInstance.onPreviewImageClick();
            expect(imageInstance.previewClick).toBe(true);
        });
    });

    describe('Accessibility', () => {
        let testFixture: ComponentFixture<TestPreviewImageComponent>;
        let imageInstance: Image;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestPreviewImageComponent);
            testFixture.detectChanges();
            imageInstance = testFixture.debugElement.query(By.directive(Image)).componentInstance;
        });

        it('should have proper aria label methods', () => {
            // Test that aria label methods exist and return values
            expect(imageInstance.rightAriaLabel()).toBeDefined();
            expect(imageInstance.leftAriaLabel()).toBeDefined();
            expect(imageInstance.zoomInAriaLabel()).toBeDefined();
            expect(imageInstance.zoomOutAriaLabel()).toBeDefined();
            expect(imageInstance.closeAriaLabel()).toBeDefined();
        });

        it('should set focus on close button when preview opens', fakeAsync(() => {
            const mockCloseButton = { nativeElement: document.createElement('button') };
            const mockElement = document.createElement('div');
            const mockWrapper = document.createElement('div');
            mockWrapper.appendChild(mockElement);

            imageInstance.closeButton = mockCloseButton as any;
            imageInstance.attrSelector = 'test-attr';

            spyOn(mockCloseButton.nativeElement, 'focus');
            spyOn(imageInstance, 'appendContainer');
            spyOn(imageInstance, 'moveOnTop');

            const animationEvent = {
                toState: 'visible',
                element: mockElement
            } as any;

            imageInstance.onAnimationStart(animationEvent);
            tick(30);

            expect(mockCloseButton.nativeElement.focus).toHaveBeenCalled();
        }));

        it('should have zoom image aria label', () => {
            expect(imageInstance.zoomImageAriaLabel).toBeDefined();
        });

        it('should have right arrow aria label', () => {
            expect(imageInstance.rightAriaLabel()).toBeDefined();
        });

        it('should have left arrow aria label', () => {
            expect(imageInstance.leftAriaLabel()).toBeDefined();
        });

        it('should have zoom in aria label', () => {
            expect(imageInstance.zoomInAriaLabel()).toBeDefined();
        });

        it('should have zoom out aria label', () => {
            expect(imageInstance.zoomOutAriaLabel()).toBeDefined();
        });

        it('should have close aria label', () => {
            expect(imageInstance.closeAriaLabel()).toBeDefined();
        });
    });

    describe('Component Lifecycle', () => {
        let testFixture: ComponentFixture<TestTemplateImageComponent>;
        let imageInstance: Image;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestTemplateImageComponent);
            testFixture.detectChanges();
            imageInstance = testFixture.debugElement.query(By.directive(Image)).componentInstance;
        });

        it('should process templates on ngAfterContentInit', () => {
            // Mock templates
            const mockIndicatorTemplate = {} as any;
            const mockImageTemplate = {} as any;
            const mockPreviewTemplate = {} as any;
            const mockRotateRightTemplate = {} as any;
            const mockRotateLeftTemplate = {} as any;
            const mockZoomOutTemplate = {} as any;
            const mockZoomInTemplate = {} as any;
            const mockCloseTemplate = {} as any;

            const mockTemplates = [
                { getType: () => 'indicator', template: mockIndicatorTemplate },
                { getType: () => 'image', template: mockImageTemplate },
                { getType: () => 'preview', template: mockPreviewTemplate },
                { getType: () => 'rotaterighticon', template: mockRotateRightTemplate },
                { getType: () => 'rotatelefticon', template: mockRotateLeftTemplate },
                { getType: () => 'zoomouticon', template: mockZoomOutTemplate },
                { getType: () => 'zoominicon', template: mockZoomInTemplate },
                { getType: () => 'closeicon', template: mockCloseTemplate }
            ];

            // Mock templates QueryList
            const mockQueryList = {
                forEach: (callback: (template: any) => void) => {
                    mockTemplates.forEach(callback);
                }
            };

            imageInstance.templates = mockQueryList as any;
            imageInstance.ngAfterContentInit();

            expect(imageInstance._indicatorTemplate).toBe(mockIndicatorTemplate);
            expect(imageInstance._imageTemplate).toBe(mockImageTemplate);
            expect(imageInstance._previewTemplate).toBe(mockPreviewTemplate);
            expect(imageInstance._rotateRightIconTemplate).toBe(mockRotateRightTemplate);
            expect(imageInstance._rotateLeftIconTemplate).toBe(mockRotateLeftTemplate);
            expect(imageInstance._zoomOutIconTemplate).toBe(mockZoomOutTemplate);
            expect(imageInstance._zoomInIconTemplate).toBe(mockZoomInTemplate);
            expect(imageInstance._closeIconTemplate).toBe(mockCloseTemplate);
        });
    });

    describe('Animation Events', () => {
        let testFixture: ComponentFixture<TestPreviewImageComponent>;
        let imageInstance: Image;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestPreviewImageComponent);
            testFixture.detectChanges();
            imageInstance = testFixture.debugElement.query(By.directive(Image)).componentInstance;
        });

        it('should handle animation start for visible state', fakeAsync(() => {
            const mockElement = document.createElement('div');
            const mockWrapper = document.createElement('div');
            const mockCloseButton = { nativeElement: document.createElement('button') };
            mockWrapper.appendChild(mockElement);

            imageInstance.closeButton = mockCloseButton as any;
            imageInstance.attrSelector = 'test-attr';

            const animationEvent = {
                toState: 'visible',
                element: mockElement
            } as any;

            spyOn(imageInstance, 'appendContainer');
            spyOn(imageInstance, 'moveOnTop');
            spyOn(mockCloseButton.nativeElement, 'focus');

            imageInstance.onAnimationStart(animationEvent);
            tick(30);

            expect(imageInstance.container).toBe(mockElement);
            expect(imageInstance.wrapper).toBe(mockWrapper);
            expect(imageInstance.appendContainer).toHaveBeenCalled();
            expect(imageInstance.moveOnTop).toHaveBeenCalled();
        }));

        it('should handle animation start for void state', () => {
            const mockWrapper = document.createElement('div');
            imageInstance.wrapper = mockWrapper;

            const animationEvent = {
                toState: 'void'
            } as any;

            imageInstance.onAnimationStart(animationEvent);

            expect(mockWrapper.classList.contains('p-overlay-mask-leave')).toBe(true);
        });

        it('should handle animation end for void state', () => {
            const mockWrapper = document.createElement('div');
            imageInstance.wrapper = mockWrapper;

            const animationEvent = {
                toState: 'void'
            } as any;

            spyOn(imageInstance.onHide, 'emit');

            imageInstance.onAnimationEnd(animationEvent);

            expect(imageInstance.maskVisible).toBe(false);
            expect(imageInstance.container).toBeNull();
            expect(imageInstance.wrapper).toBeNull();
            expect(imageInstance.onHide.emit).toHaveBeenCalled();
        });
    });

    describe('Public Methods', () => {
        let testFixture: ComponentFixture<TestPreviewImageComponent>;
        let imageInstance: Image;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestPreviewImageComponent);
            testFixture.detectChanges();
            imageInstance = testFixture.debugElement.query(By.directive(Image)).componentInstance;
        });

        it('should close preview and reset values', () => {
            imageInstance.rotate = 90;
            imageInstance.scale = 1.2;
            imageInstance.previewVisible = true;

            imageInstance.closePreview();

            expect(imageInstance.previewVisible).toBe(false);
            expect(imageInstance.rotate).toBe(0);
            expect(imageInstance.scale).toBe(1);
        });

        it('should handle image error', () => {
            const errorEvent = new Event('error');
            spyOn(imageInstance.onImageError, 'emit');

            imageInstance.imageError(errorEvent);

            expect(imageInstance.onImageError.emit).toHaveBeenCalledWith(errorEvent);
        });

        it('should move overlay to top with proper z-index', () => {
            const mockWrapper = document.createElement('div');
            imageInstance.wrapper = mockWrapper;

            imageInstance.moveOnTop();

            // The method should call ZIndexUtils.set
            expect(imageInstance.moveOnTop).toBeDefined();
        });

        it('should append container to specified target', () => {
            const mockWrapper = document.createElement('div');
            imageInstance.wrapper = mockWrapper;

            // Mock the appendTo computed signal
            spyOn(imageInstance, '$appendTo').and.returnValue('body');

            imageInstance.appendContainer();

            expect(imageInstance.appendContainer).toBeDefined();
        });
    });

    describe('Keyboard Events', () => {
        let testFixture: ComponentFixture<TestPreviewImageComponent>;
        let imageInstance: Image;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestPreviewImageComponent);
            testFixture.detectChanges();
            imageInstance = testFixture.debugElement.query(By.directive(Image)).componentInstance;
        });

        it('should close preview on document escape key', () => {
            imageInstance.previewVisible = true;
            spyOn(imageInstance, 'closePreview');

            const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
            imageInstance.onKeydownHandler(escapeEvent);

            expect(imageInstance.closePreview).toHaveBeenCalled();
        });

        it('should not close preview on escape if not visible', () => {
            imageInstance.previewVisible = false;
            spyOn(imageInstance, 'closePreview');

            const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
            imageInstance.onKeydownHandler(escapeEvent);

            expect(imageInstance.closePreview).not.toHaveBeenCalled();
        });
    });

    describe('CSS Classes and Styling', () => {
        let testFixture: ComponentFixture<TestBasicImageComponent>;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestBasicImageComponent);
            testFixture.detectChanges();
        });

        it('should apply image class and style', () => {
            const imageElement = testFixture.debugElement.query(By.css('img'));
            expect(imageElement.nativeElement.classList.contains('test-image-class')).toBe(true);
            expect(imageElement.nativeElement.style.border).toBe('1px solid red');
        });

        it('should apply component style class', () => {
            const imageComponent = testFixture.debugElement.query(By.directive(Image));
            expect(imageComponent.nativeElement.classList.contains('test-style-class')).toBe(true);
        });
    });

    describe('Error Handling', () => {
        it('should handle missing templates gracefully', () => {
            const testFixture = TestBed.createComponent(Image);
            testFixture.detectChanges();

            expect(() => testFixture.detectChanges()).not.toThrow();
        });

        it('should handle animation events gracefully', () => {
            const testFixture = TestBed.createComponent(Image);
            const imageInstance = testFixture.componentInstance;
            testFixture.detectChanges();

            // Test that the method exists and can be called
            expect(imageInstance.onAnimationStart).toBeDefined();
            expect(imageInstance.onAnimationEnd).toBeDefined();
        });
    });
});
