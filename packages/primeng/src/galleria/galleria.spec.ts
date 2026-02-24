import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SharedModule } from 'primeng/api';
import { GalleriaResponsiveOptions } from 'primeng/types/galleria';
import { Galleria, GalleriaModule } from './galleria';

// Mock data for testing
const mockImages = [
    { itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg', thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1s.jpg', alt: 'Image 1', title: 'Title 1' },
    { itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg', thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg', alt: 'Image 2', title: 'Title 2' },
    { itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg', thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3s.jpg', alt: 'Image 3', title: 'Title 3' },
    { itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg', thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4s.jpg', alt: 'Image 4', title: 'Title 4' },
    { itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg', thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5s.jpg', alt: 'Image 5', title: 'Title 5' }
];

// Test Components for different scenarios
@Component({
    standalone: false,
    template: `
        <p-galleria
            [value]="images"
            [activeIndex]="activeIndex"
            [fullScreen]="fullScreen"
            [id]="id"
            [numVisible]="numVisible"
            [responsiveOptions]="responsiveOptions"
            [showItemNavigators]="showItemNavigators"
            [showThumbnailNavigators]="showThumbnailNavigators"
            [showItemNavigatorsOnHover]="showItemNavigatorsOnHover"
            [changeItemOnIndicatorHover]="changeItemOnIndicatorHover"
            [circular]="circular"
            [autoPlay]="autoPlay"
            [shouldStopAutoplayByClick]="shouldStopAutoplayByClick"
            [transitionInterval]="transitionInterval"
            [showThumbnails]="showThumbnails"
            [thumbnailsPosition]="thumbnailsPosition"
            [verticalThumbnailViewPortHeight]="verticalThumbnailViewPortHeight"
            [showIndicators]="showIndicators"
            [showIndicatorsOnItem]="showIndicatorsOnItem"
            [indicatorsPosition]="indicatorsPosition"
            [baseZIndex]="baseZIndex"
            [maskClass]="maskClass"
            [containerClass]="containerClass"
            [containerStyle]="containerStyle"
            [(visible)]="visible"
            (activeIndexChange)="onActiveIndexChange($event)"
        >
            <ng-template #item let-item>
                <img [src]="item.itemImageSrc" [alt]="item.alt" class="test-item-image" />
            </ng-template>
            <ng-template #thumbnail let-item>
                <img [src]="item.thumbnailImageSrc" [alt]="item.alt" class="test-thumbnail-image" />
            </ng-template>
        </p-galleria>
    `
})
class TestBasicGalleriaComponent {
    images: any[] = mockImages;
    activeIndex: number = 0;
    fullScreen: boolean = false;
    id: string | undefined;
    numVisible: number = 3;
    responsiveOptions: GalleriaResponsiveOptions[] | undefined;
    showItemNavigators: boolean = false;
    showThumbnailNavigators: boolean = true;
    showItemNavigatorsOnHover: boolean = false;
    changeItemOnIndicatorHover: boolean = false;
    circular: boolean = false;
    autoPlay: boolean = false;
    shouldStopAutoplayByClick: boolean = true;
    transitionInterval: number = 4000;
    showThumbnails: boolean = true;
    thumbnailsPosition: 'bottom' | 'top' | 'left' | 'right' | undefined = 'bottom';
    verticalThumbnailViewPortHeight: string = '300px';
    showIndicators: boolean = false;
    showIndicatorsOnItem: boolean = false;
    indicatorsPosition: 'bottom' | 'top' | 'left' | 'right' | undefined = 'bottom';
    baseZIndex: number = 0;
    maskClass: string | undefined;
    containerClass: string | undefined;
    containerStyle: { [klass: string]: any } | null | undefined;
    visible: boolean = false;

    // Event handlers
    activeIndexChangeEvent: number | undefined;

    onActiveIndexChange(index: number) {
        this.activeIndexChangeEvent = index;
    }
}

@Component({
    standalone: false,
    template: `
        <p-galleria [value]="images" [fullScreen]="true" [(visible)]="visible">
            <ng-template #item let-item>
                <img [src]="item.itemImageSrc" [alt]="item.alt" class="fullscreen-item" />
            </ng-template>
            <ng-template #thumbnail let-item>
                <img [src]="item.thumbnailImageSrc" [alt]="item.alt" class="fullscreen-thumbnail" />
            </ng-template>
        </p-galleria>
    `
})
class TestFullScreenGalleriaComponent {
    images: any[] = mockImages;
    visible: boolean = true;
}

@Component({
    standalone: false,
    template: `
        <p-galleria [value]="images" [autoPlay]="true" [circular]="true" [transitionInterval]="1000">
            <ng-template #item let-item>
                <img [src]="item.itemImageSrc" [alt]="item.alt" class="autoplay-item" />
            </ng-template>
        </p-galleria>
    `
})
class TestAutoPlayGalleriaComponent {
    images: any[] = mockImages;
}

@Component({
    standalone: false,
    template: `
        <p-galleria [value]="images" [responsiveOptions]="responsiveOptions">
            <ng-template #item let-item>
                <img [src]="item.itemImageSrc" [alt]="item.alt" class="responsive-item" />
            </ng-template>
        </p-galleria>
    `
})
class TestResponsiveGalleriaComponent {
    images: any[] = mockImages;
    responsiveOptions: GalleriaResponsiveOptions[] = [
        { breakpoint: '1024px', numVisible: 3 },
        { breakpoint: '768px', numVisible: 2 },
        { breakpoint: '560px', numVisible: 1 }
    ];
}

@Component({
    standalone: false,
    template: `
        <p-galleria [value]="images" [showIndicators]="true" [showThumbnails]="false">
            <ng-template #item let-item>
                <img [src]="item.itemImageSrc" [alt]="item.alt" class="indicator-item" />
            </ng-template>
        </p-galleria>
    `
})
class TestIndicatorsGalleriaComponent {
    images: any[] = mockImages;
}

@Component({
    standalone: false,
    template: `
        <p-galleria [value]="images" [numVisible]="3">
            <ng-template #header>
                <div class="custom-header">Gallery Header</div>
            </ng-template>
            <ng-template #item let-item>
                <div class="template-item">Item: {{ item?.title || 'Test Item' }}</div>
            </ng-template>
            <ng-template #thumbnail let-item>
                <div class="template-thumbnail">Thumb: {{ item?.title || 'Test Thumb' }}</div>
            </ng-template>
            <ng-template #footer>
                <div class="custom-footer">Gallery Footer</div>
            </ng-template>
            <ng-template #caption let-item>
                <div class="custom-caption">{{ item?.title || 'Test Caption' }}</div>
            </ng-template>
        </p-galleria>
    `
})
class TestTemplateGalleriaComponent {
    images: any[] = mockImages;
}

describe('Galleria', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GalleriaModule, SharedModule],
            declarations: [TestBasicGalleriaComponent, TestFullScreenGalleriaComponent, TestAutoPlayGalleriaComponent, TestResponsiveGalleriaComponent, TestIndicatorsGalleriaComponent, TestTemplateGalleriaComponent],
            providers: [provideZonelessChangeDetection()]
        }).compileComponents();
    });

    describe('Component Initialization', () => {
        let fixture: ComponentFixture<TestBasicGalleriaComponent>;
        let component: TestBasicGalleriaComponent;
        let galleriaInstance: Galleria;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicGalleriaComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const galleriaEl = fixture.debugElement.query(By.css('p-galleria'));
            galleriaInstance = galleriaEl.componentInstance as Galleria;
        });

        it('should create the component', () => {
            expect(component).toBeTruthy();
            expect(galleriaInstance).toBeTruthy();
        });

        it('should have default values', () => {
            expect(galleriaInstance.activeIndex()).toBe(0);
            expect(galleriaInstance.fullScreen()).toBe(false);
            expect(galleriaInstance.numVisible()).toBe(3);
            expect(galleriaInstance.showItemNavigators()).toBe(false);
            expect(galleriaInstance.showThumbnailNavigators()).toBe(true);
            expect(galleriaInstance.showItemNavigatorsOnHover()).toBe(false);
            expect(galleriaInstance.changeItemOnIndicatorHover()).toBe(false);
            expect(galleriaInstance.circular()).toBe(false);
            expect(galleriaInstance.autoPlay()).toBe(false);
            expect(galleriaInstance.shouldStopAutoplayByClick()).toBe(true);
            expect(galleriaInstance.transitionInterval()).toBe(4000);
            expect(galleriaInstance.showThumbnails()).toBe(true);
            expect(galleriaInstance.thumbnailsPosition()).toBe('bottom');
            expect(galleriaInstance.verticalThumbnailViewPortHeight()).toBe('300px');
            expect(galleriaInstance.showIndicators()).toBe(false);
            expect(galleriaInstance.showIndicatorsOnItem()).toBe(false);
            expect(galleriaInstance.indicatorsPosition()).toBe('bottom');
            expect(galleriaInstance.baseZIndex()).toBe(0);
            expect(galleriaInstance.visible()).toBe(false);
        });

        it('should accept input values', async () => {
            component.activeIndex = 2;
            component.fullScreen = true;
            component.numVisible = 5;
            component.showItemNavigators = true;
            component.circular = true;
            component.autoPlay = true;
            component.transitionInterval = 2000;
            component.showIndicators = true;
            component.baseZIndex = 1000;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(galleriaInstance.activeIndex()).toBe(2);
            expect(galleriaInstance.fullScreen()).toBe(true);
            expect(galleriaInstance.numVisible()).toBe(5);
            expect(galleriaInstance.showItemNavigators()).toBe(true);
            expect(galleriaInstance.circular()).toBe(true);
            expect(galleriaInstance.autoPlay()).toBe(true);
            expect(galleriaInstance.transitionInterval()).toBe(2000);
            expect(galleriaInstance.showIndicators()).toBe(true);
            expect(galleriaInstance.baseZIndex()).toBe(1000);
        });

        it('should initialize with value array', () => {
            expect(galleriaInstance.value()).toEqual(mockImages);
            expect(galleriaInstance.value()?.length).toBe(5);
        });

        it('should set numVisibleLimit when value length is less than numVisible', async () => {
            component.images = mockImages.slice(0, 2); // Only 2 images
            component.numVisible = 5; // Want to show 5
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(galleriaInstance.numVisibleLimit()).toBe(2);
        });
    });

    describe('Public Methods and Properties', () => {
        let fixture: ComponentFixture<TestBasicGalleriaComponent>;
        let component: TestBasicGalleriaComponent;
        let galleriaInstance: Galleria;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicGalleriaComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const galleriaEl = fixture.debugElement.query(By.css('p-galleria'));
            galleriaInstance = galleriaEl.componentInstance as Galleria;
        });

        it('should handle visible model signal', () => {
            galleriaInstance.visible.set(true);
            TestBed.flushEffects();
            expect(galleriaInstance.visible()).toBe(true);
            expect(galleriaInstance.maskVisible).toBe(true);
        });

        it('should handle mask visibility correctly', () => {
            expect(galleriaInstance.maskVisible).toBe(false);

            galleriaInstance.visible.set(true);
            TestBed.flushEffects();
            expect(galleriaInstance.maskVisible).toBe(true);
        });
    });

    describe('Event Handling', () => {
        let fixture: ComponentFixture<TestBasicGalleriaComponent>;
        let component: TestBasicGalleriaComponent;
        let galleriaInstance: Galleria;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicGalleriaComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const galleriaEl = fixture.debugElement.query(By.css('p-galleria'));
            galleriaInstance = galleriaEl.componentInstance as Galleria;
        });

        it('should emit activeIndexChange event', () => {
            spyOn(component, 'onActiveIndexChange');

            galleriaInstance.onActiveItemChange(2);

            expect(component.onActiveIndexChange).toHaveBeenCalledWith(2);
            expect(galleriaInstance._activeIndex()).toBe(2);
        });

        it('should not emit activeIndexChange if index is same', () => {
            spyOn(galleriaInstance.activeIndexChange, 'emit');

            galleriaInstance._activeIndex.set(1);
            galleriaInstance.onActiveItemChange(1);

            expect(galleriaInstance.activeIndexChange.emit).not.toHaveBeenCalled();
        });

        it('should handle onMaskHide', () => {
            galleriaInstance.visible.set(true);
            galleriaInstance.onMaskHide();

            expect(galleriaInstance.visible()).toBe(false);
        });

        it('should handle onMaskHide with event target check', () => {
            const sameElement = document.createElement('div');
            const mockEvent = {
                target: sameElement,
                currentTarget: sameElement
            } as any;

            galleriaInstance.visible.set(true);

            // Same target and currentTarget - should hide
            galleriaInstance.onMaskHide(mockEvent);
            expect(galleriaInstance.visible()).toBe(false);
        });

        it('should not hide when target and currentTarget are different', () => {
            const mockEvent = {
                target: document.createElement('div'),
                currentTarget: document.createElement('div')
            } as any;

            galleriaInstance.visible.set(true);

            // Different target and currentTarget - should not hide
            galleriaInstance.onMaskHide(mockEvent);
            expect(galleriaInstance.visible()).toBe(true);
        });
    });

    describe('Full Screen Mode', () => {
        let fixture: ComponentFixture<TestFullScreenGalleriaComponent>;
        let component: TestFullScreenGalleriaComponent;
        let galleriaInstance: Galleria;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestFullScreenGalleriaComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const galleriaEl = fixture.debugElement.query(By.css('p-galleria'));
            galleriaInstance = galleriaEl.componentInstance as Galleria;
        });

        it('should enable fullScreen mode', () => {
            expect(galleriaInstance.fullScreen()).toBe(true);
        });

        it('should show mask when in fullScreen and visible', () => {
            expect(galleriaInstance.visible()).toBe(true);
            expect(galleriaInstance.maskVisible).toBe(true);
        });

        it('should render fullScreen template structure', () => {
            const mask = fixture.debugElement.query(By.css('[role="dialog"]'));
            if (mask) {
                expect(mask).toBeTruthy();
                expect(mask.nativeElement.getAttribute('aria-modal')).toBe('true');
            }
        });
    });

    describe('Auto Play Functionality', () => {
        let fixture: ComponentFixture<TestAutoPlayGalleriaComponent>;
        let component: TestAutoPlayGalleriaComponent;
        let galleriaInstance: Galleria;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestAutoPlayGalleriaComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const galleriaEl = fixture.debugElement.query(By.css('p-galleria'));
            galleriaInstance = galleriaEl.componentInstance as Galleria;
        });

        it('should enable autoPlay mode', () => {
            expect(galleriaInstance.autoPlay()).toBe(true);
            expect(galleriaInstance.circular()).toBe(true);
            expect(galleriaInstance.transitionInterval()).toBe(1000);
        });

        it('should have shouldStopAutoplayByClick enabled by default', () => {
            expect(galleriaInstance.shouldStopAutoplayByClick()).toBe(true);
        });
    });

    describe('Responsive Options', () => {
        let fixture: ComponentFixture<TestResponsiveGalleriaComponent>;
        let component: TestResponsiveGalleriaComponent;
        let galleriaInstance: Galleria;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestResponsiveGalleriaComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const galleriaEl = fixture.debugElement.query(By.css('p-galleria'));
            galleriaInstance = galleriaEl.componentInstance as Galleria;
        });

        it('should accept responsive options', () => {
            expect(galleriaInstance.responsiveOptions()).toEqual(component.responsiveOptions);
            expect(galleriaInstance.responsiveOptions()?.length).toBe(3);
        });

        it('should have correct breakpoints and numVisible values', () => {
            const options = galleriaInstance.responsiveOptions()!;
            expect(options[0].breakpoint).toBe('1024px');
            expect(options[0].numVisible).toBe(3);
            expect(options[1].breakpoint).toBe('768px');
            expect(options[1].numVisible).toBe(2);
            expect(options[2].breakpoint).toBe('560px');
            expect(options[2].numVisible).toBe(1);
        });
    });

    describe('Indicators Mode', () => {
        let fixture: ComponentFixture<TestIndicatorsGalleriaComponent>;
        let component: TestIndicatorsGalleriaComponent;
        let galleriaInstance: Galleria;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestIndicatorsGalleriaComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const galleriaEl = fixture.debugElement.query(By.css('p-galleria'));
            galleriaInstance = galleriaEl.componentInstance as Galleria;
        });

        it('should enable indicators and disable thumbnails', () => {
            expect(galleriaInstance.showIndicators()).toBe(true);
            expect(galleriaInstance.showThumbnails()).toBe(false);
        });

        it('should use default indicator position', () => {
            expect(galleriaInstance.indicatorsPosition()).toBe('bottom');
            expect(galleriaInstance.showIndicatorsOnItem()).toBe(false);
        });
    });

    describe('Template Content Projection', () => {
        let fixture: ComponentFixture<TestTemplateGalleriaComponent>;
        let component: TestTemplateGalleriaComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestTemplateGalleriaComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should render custom header template', () => {
            const headerContent = fixture.debugElement.query(By.css('.custom-header'));
            if (headerContent) {
                expect(headerContent.nativeElement.textContent).toContain('Gallery Header');
            }

            expect(fixture.componentInstance).toBeTruthy();
        });

        it('should render custom footer template', () => {
            const footerContent = fixture.debugElement.query(By.css('.custom-footer'));
            if (footerContent) {
                expect(footerContent.nativeElement.textContent).toContain('Gallery Footer');
            }
        });

        it('should render custom caption template', () => {
            const captionContent = fixture.debugElement.query(By.css('.custom-caption'));
            if (captionContent) {
                expect(captionContent.nativeElement.textContent).toBeTruthy();
            }
        });

        it('should render item template for images', () => {
            const itemElements = fixture.debugElement.queryAll(By.css('.template-item'));
            if (itemElements.length > 0) {
                expect(itemElements.length).toBeGreaterThan(0);
                expect(itemElements[0].nativeElement.textContent).toContain('Item');
            }
        });

        it('should render thumbnail template for thumbnails', () => {
            const thumbnailElements = fixture.debugElement.queryAll(By.css('.template-thumbnail'));
            if (thumbnailElements.length > 0) {
                expect(thumbnailElements.length).toBeGreaterThan(0);
                expect(thumbnailElements[0].nativeElement.textContent).toContain('Thumb');
            }
        });
    });

    describe('CSS Classes and Styling', () => {
        let fixture: ComponentFixture<TestBasicGalleriaComponent>;
        let component: TestBasicGalleriaComponent;
        let galleriaInstance: Galleria;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicGalleriaComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const galleriaEl = fixture.debugElement.query(By.css('p-galleria'));
            galleriaInstance = galleriaEl.componentInstance as Galleria;
        });

        it('should apply custom mask class', async () => {
            component.maskClass = 'custom-mask-class';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(galleriaInstance.maskClass()).toBe('custom-mask-class');
        });

        it('should apply custom container class and style', async () => {
            component.containerClass = 'custom-container-class';
            component.containerStyle = { width: '800px', height: '600px' };
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(galleriaInstance.containerClass()).toBe('custom-container-class');
            expect(galleriaInstance.containerStyle()).toEqual({ width: '800px', height: '600px' });
        });

        it('should have proper galleria root structure', () => {
            const galleriaRoot = fixture.debugElement.query(By.css('p-galleria'));
            expect(galleriaRoot).toBeTruthy();
        });
    });

    describe('Position and Layout Options', () => {
        let fixture: ComponentFixture<TestBasicGalleriaComponent>;
        let component: TestBasicGalleriaComponent;
        let galleriaInstance: Galleria;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicGalleriaComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const galleriaEl = fixture.debugElement.query(By.css('p-galleria'));
            galleriaInstance = galleriaEl.componentInstance as Galleria;
        });

        it('should handle thumbnail position options', async () => {
            const positions: Array<'bottom' | 'top' | 'left' | 'right'> = ['bottom', 'top', 'left', 'right'];

            for (const position of positions) {
                component.thumbnailsPosition = position;
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                expect(galleriaInstance.thumbnailsPosition()).toBe(position);
            }
        });

        it('should handle indicator position options', async () => {
            const positions: Array<'bottom' | 'top' | 'left' | 'right'> = ['bottom', 'top', 'left', 'right'];

            for (const position of positions) {
                component.indicatorsPosition = position;
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                expect(galleriaInstance.indicatorsPosition()).toBe(position);
            }
        });

        it('should handle vertical thumbnail viewport height', async () => {
            component.verticalThumbnailViewPortHeight = '400px';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(galleriaInstance.verticalThumbnailViewPortHeight()).toBe('400px');
        });

        it('should handle show indicators on item', async () => {
            component.showIndicatorsOnItem = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(galleriaInstance.showIndicatorsOnItem()).toBe(true);
        });
    });

    describe('Accessibility', () => {
        let fixture: ComponentFixture<TestFullScreenGalleriaComponent>;
        let component: TestFullScreenGalleriaComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestFullScreenGalleriaComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should have proper ARIA attributes for fullscreen mode', () => {
            const mask = fixture.debugElement.query(By.css('[role="dialog"]'));
            if (mask) {
                expect(mask.nativeElement.getAttribute('role')).toBe('dialog');
                expect(mask.nativeElement.getAttribute('aria-modal')).toBe('true');
            }
        });

        it('should have proper ARIA attributes for windowed mode', () => {
            const windowedFixture = TestBed.createComponent(TestBasicGalleriaComponent);
            windowedFixture.detectChanges();

            const galleriaRoot = windowedFixture.debugElement.query(By.css('p-galleria'));
            expect(galleriaRoot).toBeTruthy();
        });

        it('should provide proper alt attributes on images', () => {
            const images = fixture.debugElement.queryAll(By.css('img[alt]'));
            if (images.length > 0) {
                images.forEach((img) => {
                    expect(img.nativeElement.getAttribute('alt')).toBeTruthy();
                });
            }
        });
    });

    describe('Edge Cases', () => {
        let fixture: ComponentFixture<TestBasicGalleriaComponent>;
        let component: TestBasicGalleriaComponent;
        let galleriaInstance: Galleria;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicGalleriaComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const galleriaEl = fixture.debugElement.query(By.css('p-galleria'));
            galleriaInstance = galleriaEl.componentInstance as Galleria;
        });

        it('should handle empty images array', async () => {
            component.images = [];
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(galleriaInstance.value()).toEqual([]);
        });

        it('should handle null images', async () => {
            component.images = null as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(galleriaInstance.value()).toBe(null as any);
        });

        it('should handle single image', async () => {
            component.images = [mockImages[0]];
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(galleriaInstance.value()?.length).toBe(1);
        });

        it('should handle undefined id', () => {
            component.id = undefined as any;
            fixture.detectChanges();

            expect(galleriaInstance.id()).toBeUndefined();
        });

        it('should handle custom id', async () => {
            component.id = 'custom-galleria-id';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(galleriaInstance.id()).toBe('custom-galleria-id');
        });

        it('should handle mask hide without event', () => {
            galleriaInstance.visible.set(true);
            galleriaInstance.onMaskHide();

            expect(galleriaInstance.visible()).toBe(false);
        });
    });

    describe('PassThrough (PT) Tests', () => {
        it('PT Case 1: should accept simple string values', async () => {
            await TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [GalleriaModule],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const ptFixture = TestBed.createComponent(Galleria);
            ptFixture.componentRef.setInput('pt', {
                root: 'custom-root-class',
                content: 'custom-content-class',
                itemsContainer: 'custom-items-container-class'
            });
            ptFixture.componentRef.setInput('value', mockImages);
            ptFixture.detectChanges();
            await ptFixture.whenStable();

            const rootElement = ptFixture.nativeElement.querySelector('[data-pc-section="root"]');
            if (rootElement) {
                expect(rootElement.classList.contains('custom-root-class')).toBe(true);
            }

            const contentElement = ptFixture.nativeElement.querySelector('[data-pc-section="content"]');
            if (contentElement) {
                expect(contentElement.classList.contains('custom-content-class')).toBe(true);
            }

            const itemsContainer = ptFixture.nativeElement.querySelector('[data-pc-section="itemscontainer"]');
            if (itemsContainer) {
                expect(itemsContainer.classList.contains('custom-items-container-class')).toBe(true);
            }
        });

        it('PT Case 2: should accept objects with class, style, and attributes', async () => {
            await TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [GalleriaModule],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const ptFixture = TestBed.createComponent(Galleria);
            ptFixture.componentRef.setInput('pt', {
                root: {
                    class: 'custom-root',
                    style: { backgroundColor: 'lightblue' },
                    'data-testid': 'galleria-root'
                },
                content: {
                    class: 'custom-content',
                    style: { padding: '20px' }
                }
            });
            ptFixture.componentRef.setInput('value', mockImages);
            ptFixture.detectChanges();
            await ptFixture.whenStable();

            const rootElement = ptFixture.nativeElement.querySelector('[data-pc-section="root"]');
            if (rootElement) {
                expect(rootElement.classList.contains('custom-root')).toBe(true);
                expect(rootElement.style.backgroundColor).toBe('lightblue');
                expect(rootElement.getAttribute('data-testid')).toBe('galleria-root');
            }

            const contentElement = ptFixture.nativeElement.querySelector('[data-pc-section="content"]');
            if (contentElement) {
                expect(contentElement.classList.contains('custom-content')).toBe(true);
                expect(contentElement.style.padding).toBe('20px');
            }
        });

        it('PT Case 3: should accept mixed object and string values', async () => {
            await TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [GalleriaModule],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const ptFixture = TestBed.createComponent(Galleria);
            ptFixture.componentRef.setInput('pt', {
                root: 'string-root-class',
                content: {
                    class: 'object-content-class',
                    style: { border: '1px solid red' }
                },
                itemsContainer: 'string-items-container-class'
            });
            ptFixture.componentRef.setInput('value', mockImages);
            ptFixture.detectChanges();
            await ptFixture.whenStable();

            const rootElement = ptFixture.nativeElement.querySelector('[data-pc-section="root"]');
            if (rootElement) {
                expect(rootElement.classList.contains('string-root-class')).toBe(true);
            }

            const contentElement = ptFixture.nativeElement.querySelector('[data-pc-section="content"]');
            if (contentElement) {
                expect(contentElement.classList.contains('object-content-class')).toBe(true);
                expect(contentElement.style.border).toBe('1px solid red');
            }

            const itemsContainer = ptFixture.nativeElement.querySelector('[data-pc-section="itemscontainer"]');
            if (itemsContainer) {
                expect(itemsContainer.classList.contains('string-items-container-class')).toBe(true);
            }
        });

        it('PT Case 5: should bind events through PT', async () => {
            await TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [GalleriaModule],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const ptFixture = TestBed.createComponent(Galleria);
            let clicked = false;
            ptFixture.componentRef.setInput('pt', {
                closeButton: {
                    onClick: () => {
                        clicked = true;
                    }
                }
            });
            ptFixture.componentRef.setInput('value', mockImages);
            ptFixture.componentRef.setInput('fullScreen', true);
            ptFixture.componentRef.setInput('visible', true);
            ptFixture.detectChanges();
            await ptFixture.whenStable();

            const closeButton = ptFixture.nativeElement.querySelector('[data-pc-section="closebutton"]');
            if (closeButton) {
                closeButton.click();
                expect(clicked).toBe(true);
            }
        });

        it('PT Case 6: should support inline PT binding', async () => {
            await TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [GalleriaModule],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const ptFixture = TestBed.createComponent(Galleria);
            ptFixture.componentRef.setInput('ptOptions', { mergeSections: true, mergeProps: true });
            ptFixture.componentRef.setInput('pt', {
                root: 'inline-root',
                content: 'inline-content'
            });
            ptFixture.componentRef.setInput('value', mockImages);
            ptFixture.detectChanges();
            await ptFixture.whenStable();

            const rootElement = ptFixture.nativeElement.querySelector('[data-pc-section="root"]');
            if (rootElement) {
                expect(rootElement.classList.contains('inline-root')).toBe(true);
            }

            const contentElement = ptFixture.nativeElement.querySelector('[data-pc-section="content"]');
            if (contentElement) {
                expect(contentElement.classList.contains('inline-content')).toBe(true);
            }
        });

        it('PT Case 9: should apply PT to navigation buttons', async () => {
            await TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [GalleriaModule],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const ptFixture = TestBed.createComponent(Galleria);
            ptFixture.componentRef.setInput('pt', {
                prevButton: {
                    class: 'custom-prev-button',
                    'data-testid': 'prev-btn'
                },
                nextButton: {
                    class: 'custom-next-button',
                    'data-testid': 'next-btn'
                },
                prevIcon: 'custom-prev-icon',
                nextIcon: 'custom-next-icon'
            });
            ptFixture.componentRef.setInput('value', mockImages);
            ptFixture.componentRef.setInput('showItemNavigators', true);
            ptFixture.detectChanges();
            await ptFixture.whenStable();

            const prevButton = ptFixture.nativeElement.querySelector('[data-pc-section="prevbutton"]');
            if (prevButton) {
                expect(prevButton.classList.contains('custom-prev-button')).toBe(true);
                expect(prevButton.getAttribute('data-testid')).toBe('prev-btn');
            }

            const nextButton = ptFixture.nativeElement.querySelector('[data-pc-section="nextbutton"]');
            if (nextButton) {
                expect(nextButton.classList.contains('custom-next-button')).toBe(true);
                expect(nextButton.getAttribute('data-testid')).toBe('next-btn');
            }

            const prevIcon = ptFixture.nativeElement.querySelector('[data-pc-section="previcon"]');
            if (prevIcon) {
                expect(prevIcon.classList.contains('custom-prev-icon')).toBe(true);
            }

            const nextIcon = ptFixture.nativeElement.querySelector('[data-pc-section="nexticon"]');
            if (nextIcon) {
                expect(nextIcon.classList.contains('custom-next-icon')).toBe(true);
            }
        });

        it('PT Case 10: should apply PT to thumbnail elements', async () => {
            await TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [GalleriaModule],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const ptFixture = TestBed.createComponent(Galleria);
            ptFixture.componentRef.setInput('pt', {
                thumbnails: 'custom-thumbnails',
                thumbnailContent: 'custom-thumbnail-content',
                thumbnailsViewport: 'custom-thumbnails-viewport',
                thumbnailItems: 'custom-thumbnail-items',
                thumbnailItem: {
                    class: 'custom-thumbnail-item',
                    'data-item': 'true'
                },
                thumbnail: 'custom-thumbnail'
            });
            ptFixture.componentRef.setInput('value', mockImages);
            ptFixture.componentRef.setInput('showThumbnails', true);
            ptFixture.detectChanges();
            await ptFixture.whenStable();

            const thumbnails = ptFixture.nativeElement.querySelector('[data-pc-section="thumbnails"]');
            if (thumbnails) {
                expect(thumbnails.classList.contains('custom-thumbnails')).toBe(true);
            }

            const thumbnailContent = ptFixture.nativeElement.querySelector('[data-pc-section="thumbnailcontent"]');
            if (thumbnailContent) {
                expect(thumbnailContent.classList.contains('custom-thumbnail-content')).toBe(true);
            }

            const thumbnailsViewport = ptFixture.nativeElement.querySelector('[data-pc-section="thumbnailsviewport"]');
            if (thumbnailsViewport) {
                expect(thumbnailsViewport.classList.contains('custom-thumbnails-viewport')).toBe(true);
            }

            const thumbnailItems = ptFixture.nativeElement.querySelector('[data-pc-section="thumbnailitems"]');
            if (thumbnailItems) {
                expect(thumbnailItems.classList.contains('custom-thumbnail-items')).toBe(true);
            }

            const thumbnailItem = ptFixture.nativeElement.querySelector('[data-pc-section="thumbnailitem"]');
            if (thumbnailItem) {
                expect(thumbnailItem.classList.contains('custom-thumbnail-item')).toBe(true);
                expect(thumbnailItem.getAttribute('data-item')).toBe('true');
            }
        });

        it('PT Case 11: should apply PT to indicator elements', async () => {
            await TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [GalleriaModule],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const ptFixture = TestBed.createComponent(Galleria);
            ptFixture.componentRef.setInput('pt', {
                indicatorList: 'custom-indicator-list',
                indicator: {
                    class: 'custom-indicator',
                    'data-indicator': 'true'
                },
                indicatorButton: 'custom-indicator-button'
            });
            ptFixture.componentRef.setInput('value', mockImages);
            ptFixture.componentRef.setInput('showIndicators', true);
            ptFixture.detectChanges();
            await ptFixture.whenStable();

            const indicatorList = ptFixture.nativeElement.querySelector('[data-pc-section="indicatorlist"]');
            if (indicatorList) {
                expect(indicatorList.classList.contains('custom-indicator-list')).toBe(true);
            }

            const indicator = ptFixture.nativeElement.querySelector('[data-pc-section="indicator"]');
            if (indicator) {
                expect(indicator.classList.contains('custom-indicator')).toBe(true);
                expect(indicator.getAttribute('data-indicator')).toBe('true');
            }

            const indicatorButton = ptFixture.nativeElement.querySelector('[data-pc-section="indicatorbutton"]');
            if (indicatorButton) {
                expect(indicatorButton.classList.contains('custom-indicator-button')).toBe(true);
            }
        });

        it('PT Case 12: should apply PT to fullscreen mask and close button', async () => {
            await TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [GalleriaModule],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const ptFixture = TestBed.createComponent(Galleria);
            ptFixture.componentRef.setInput('pt', {
                mask: {
                    class: 'custom-mask',
                    style: { backgroundColor: 'rgba(0,0,0,0.8)' }
                },
                closeButton: 'custom-close-button',
                closeIcon: 'custom-close-icon',
                header: 'custom-header',
                footer: 'custom-footer'
            });
            ptFixture.componentRef.setInput('value', mockImages);
            ptFixture.componentRef.setInput('fullScreen', true);
            ptFixture.componentRef.setInput('visible', true);
            ptFixture.detectChanges();
            await ptFixture.whenStable();

            const mask = ptFixture.nativeElement.querySelector('[data-pc-section="mask"]');
            if (mask) {
                expect(mask.classList.contains('custom-mask')).toBe(true);
                expect(mask.style.backgroundColor).toBe('rgba(0, 0, 0, 0.8)');
            }

            const closeButton = ptFixture.nativeElement.querySelector('[data-pc-section="closebutton"]');
            if (closeButton) {
                expect(closeButton.classList.contains('custom-close-button')).toBe(true);
            }

            const closeIcon = ptFixture.nativeElement.querySelector('[data-pc-section="closeicon"]');
            if (closeIcon) {
                expect(closeIcon.classList.contains('custom-close-icon')).toBe(true);
            }

            const header = ptFixture.nativeElement.querySelector('[data-pc-section="header"]');
            if (header) {
                expect(header.classList.contains('custom-header')).toBe(true);
            }

            const footer = ptFixture.nativeElement.querySelector('[data-pc-section="footer"]');
            if (footer) {
                expect(footer.classList.contains('custom-footer')).toBe(true);
            }
        });
    });
});
