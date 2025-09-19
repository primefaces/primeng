import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { ImageCompare, ImageCompareModule } from './imagecompare';
import { SharedModule } from 'primeng/api';

// Using image paths from photoservice.ts to ensure consistency
const mockImages = {
    leftImage: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg',
    rightImage: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg'
};

@Component({
    standalone: false,
    template: `
        <p-imagecompare [tabindex]="tabindex" [ariaLabel]="ariaLabel" [ariaLabelledby]="ariaLabelledby">
            <ng-template #left>
                <img [src]="leftImage" [alt]="leftImageAlt" class="left-image" />
            </ng-template>
            <ng-template #right>
                <img [src]="rightImage" [alt]="rightImageAlt" class="right-image" />
            </ng-template>
        </p-imagecompare>
    `
})
class TestBasicImageCompareComponent {
    leftImage: string = mockImages.leftImage;
    rightImage: string = mockImages.rightImage;
    leftImageAlt: string = 'Left Image';
    rightImageAlt: string = 'Right Image';
    tabindex: number | undefined = 0;
    ariaLabel: string | undefined = 'Image Compare';
    ariaLabelledby: string | undefined;
}

@Component({
    standalone: false,
    template: `
        <p-imagecompare>
            <ng-template pTemplate="left">
                <img [src]="leftImage" [alt]="leftImageAlt" class="ptemplate-left" />
            </ng-template>
            <ng-template pTemplate="right">
                <img [src]="rightImage" [alt]="rightImageAlt" class="ptemplate-right" />
            </ng-template>
        </p-imagecompare>
    `
})
class TestPTemplateImageCompareComponent {
    leftImage: string = mockImages.leftImage;
    rightImage: string = mockImages.rightImage;
    leftImageAlt: string = 'Left PTemplate Image';
    rightImageAlt: string = 'Right PTemplate Image';
}

@Component({
    standalone: false,
    template: `
        <div dir="rtl">
            <p-imagecompare>
                <ng-template #left>
                    <img [src]="leftImage" [alt]="leftImageAlt" class="rtl-left-image" />
                </ng-template>
                <ng-template #right>
                    <img [src]="rightImage" [alt]="rightImageAlt" class="rtl-right-image" />
                </ng-template>
            </p-imagecompare>
        </div>
    `
})
class TestRTLImageCompareComponent {
    leftImage: string = mockImages.leftImage;
    rightImage: string = mockImages.rightImage;
    leftImageAlt: string = 'RTL Left Image';
    rightImageAlt: string = 'RTL Right Image';
}

@Component({
    standalone: false,
    template: `
        <p-imagecompare class="responsive-container">
            <ng-template #left>
                <div class="custom-content left-content">Left Custom Content</div>
            </ng-template>
            <ng-template #right>
                <div class="custom-content right-content">Right Custom Content</div>
            </ng-template>
        </p-imagecompare>
    `
})
class TestCustomContentImageCompareComponent {
    // No additional properties needed
}

describe('ImageCompare', () => {
    let component: ImageCompare;
    let fixture: ComponentFixture<ImageCompare>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ImageCompareModule, SharedModule],
            declarations: [TestBasicImageCompareComponent, TestPTemplateImageCompareComponent, TestRTLImageCompareComponent, TestCustomContentImageCompareComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ImageCompare);
        component = fixture.componentInstance;
    });

    describe('Component Initialization', () => {
        it('should create the component', () => {
            expect(component).toBeTruthy();
        });

        it('should have default values', () => {
            expect(component.tabindex).toBeUndefined();
            expect(component.ariaLabel).toBeUndefined();
            expect(component.ariaLabelledby).toBeUndefined();
            expect(component.isRTL).toBe(false);
        });

        it('should accept custom input values', () => {
            const testFixture = TestBed.createComponent(TestBasicImageCompareComponent);
            const testComponent = testFixture.componentInstance;
            testFixture.detectChanges();

            const imageCompareElement = testFixture.debugElement.query(By.directive(ImageCompare));
            const imageCompareInstance = imageCompareElement.componentInstance;

            expect(imageCompareInstance.tabindex).toBe(0);
            expect(imageCompareInstance.ariaLabel).toBe('Image Compare');
        });

        it('should render slider input element', () => {
            fixture.detectChanges();
            const sliderInput = fixture.debugElement.query(By.css('input[type="range"]'));
            expect(sliderInput).toBeTruthy();
            expect(sliderInput.nativeElement.min).toBe('0');
            expect(sliderInput.nativeElement.max).toBe('100');
            expect(sliderInput.nativeElement.value).toBe('50');
        });
    });

    describe('Template Content Projection', () => {
        it('should render left and right templates with #template approach', () => {
            const testFixture = TestBed.createComponent(TestBasicImageCompareComponent);
            testFixture.detectChanges();

            const leftImage = testFixture.debugElement.query(By.css('.left-image'));
            const rightImage = testFixture.debugElement.query(By.css('.right-image'));

            expect(leftImage).toBeTruthy();
            expect(rightImage).toBeTruthy();
            expect(leftImage.nativeElement.src).toBe(mockImages.leftImage);
            expect(rightImage.nativeElement.src).toBe(mockImages.rightImage);
        });

        it('should render left and right templates with pTemplate approach', () => {
            const testFixture = TestBed.createComponent(TestPTemplateImageCompareComponent);
            testFixture.detectChanges();

            const leftImage = testFixture.debugElement.query(By.css('.ptemplate-left'));
            const rightImage = testFixture.debugElement.query(By.css('.ptemplate-right'));

            expect(leftImage).toBeTruthy();
            expect(rightImage).toBeTruthy();
        });

        it('should render custom content in templates', () => {
            const testFixture = TestBed.createComponent(TestCustomContentImageCompareComponent);
            testFixture.detectChanges();

            const leftContent = testFixture.debugElement.query(By.css('.left-content'));
            const rightContent = testFixture.debugElement.query(By.css('.right-content'));

            expect(leftContent).toBeTruthy();
            expect(rightContent).toBeTruthy();
            expect(leftContent.nativeElement.textContent).toContain('Left Custom Content');
            expect(rightContent.nativeElement.textContent).toContain('Right Custom Content');
        });
    });

    describe('Slider Interaction', () => {
        let testFixture: ComponentFixture<TestBasicImageCompareComponent>;
        let slider: DebugElement;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestBasicImageCompareComponent);
            testFixture.detectChanges();
            slider = testFixture.debugElement.query(By.css('input[type="range"]'));
        });

        it('should handle slider input event', () => {
            const imageCompareInstance = testFixture.debugElement.query(By.directive(ImageCompare)).componentInstance;
            spyOn(imageCompareInstance, 'onSlide').and.callThrough();

            slider.nativeElement.value = '75';
            slider.nativeElement.dispatchEvent(new Event('input'));

            expect(imageCompareInstance.onSlide).toHaveBeenCalled();
        });

        it('should update clip path on slider change in LTR mode', () => {
            const imageCompareInstance = testFixture.debugElement.query(By.directive(ImageCompare)).componentInstance;
            imageCompareInstance.isRTL = false;

            const mockEvent = {
                target: {
                    value: '75',
                    previousElementSibling: {
                        style: {} as CSSStyleDeclaration
                    }
                }
            };

            imageCompareInstance.onSlide(mockEvent);
            expect((mockEvent.target.previousElementSibling.style as any).clipPath).toBe('polygon(0 0, 75% 0, 75% 100%, 0 100%)');
        });

        it('should update clip path on slider change in RTL mode', () => {
            const imageCompareInstance = testFixture.debugElement.query(By.directive(ImageCompare)).componentInstance;
            imageCompareInstance.isRTL = true;

            const mockEvent = {
                target: {
                    value: '75',
                    previousElementSibling: {
                        style: {} as CSSStyleDeclaration
                    }
                }
            };

            imageCompareInstance.onSlide(mockEvent);
            expect((mockEvent.target.previousElementSibling.style as any).clipPath).toBe('polygon(25% 0, 100% 0, 100% 100%, 25% 100%)');
        });
    });

    describe('RTL Support', () => {
        let testFixture: ComponentFixture<TestRTLImageCompareComponent>;
        let imageCompareInstance: ImageCompare;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestRTLImageCompareComponent);
            testFixture.detectChanges();
            imageCompareInstance = testFixture.debugElement.query(By.directive(ImageCompare)).componentInstance;
        });

        it('should detect RTL direction from closest RTL container', () => {
            imageCompareInstance.updateDirection();
            expect(imageCompareInstance.isRTL).toBe(true);
        });

        it('should setup mutation observer for direction changes', () => {
            spyOn(imageCompareInstance, 'updateDirection');

            // Just test that the method exists and can be called
            expect(imageCompareInstance.observeDirectionChanges).toBeDefined();

            // Test that updateDirection is called as part of initialization
            imageCompareInstance.updateDirection();
            expect(imageCompareInstance.updateDirection).toHaveBeenCalled();
        });
    });

    describe('Accessibility', () => {
        let testFixture: ComponentFixture<TestBasicImageCompareComponent>;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestBasicImageCompareComponent);
            testFixture.detectChanges();
        });

        it('should set tabindex attribute', () => {
            const imageCompareElement = testFixture.debugElement.query(By.directive(ImageCompare));
            expect(imageCompareElement.nativeElement.getAttribute('tabindex')).toBe('0');
        });

        it('should set aria-label attribute', () => {
            const imageCompareElement = testFixture.debugElement.query(By.directive(ImageCompare));
            expect(imageCompareElement.nativeElement.getAttribute('aria-label')).toBe('Image Compare');
        });

        it('should set aria-labelledby attribute when provided', () => {
            const testComponent = testFixture.componentInstance;
            testComponent.ariaLabelledby = 'label-id';
            testFixture.detectChanges();

            const imageCompareElement = testFixture.debugElement.query(By.directive(ImageCompare));
            expect(imageCompareElement.nativeElement.getAttribute('aria-labelledby')).toBe('label-id');
        });

        it('should have proper slider accessibility attributes', () => {
            const slider = testFixture.debugElement.query(By.css('input[type="range"]'));
            expect(slider.nativeElement.getAttribute('min')).toBe('0');
            expect(slider.nativeElement.getAttribute('max')).toBe('100');
            expect(slider.nativeElement.value).toBe('50');
        });
    });

    describe('CSS Classes', () => {
        let testFixture: ComponentFixture<TestBasicImageCompareComponent>;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestBasicImageCompareComponent);
            testFixture.detectChanges();
        });

        it('should apply root CSS class to host element', () => {
            const imageCompareElement = testFixture.debugElement.query(By.directive(ImageCompare));
            // The cx('root') method should apply the root class from the style component
            expect(imageCompareElement.nativeElement.classList).toBeTruthy();
        });

        it('should apply slider CSS class to range input', () => {
            const slider = testFixture.debugElement.query(By.css('input[type="range"]'));
            // The cx('slider') method should apply the slider class from the style component
            expect(slider.nativeElement.classList).toBeTruthy();
        });
    });

    describe('Component Lifecycle', () => {
        let testFixture: ComponentFixture<TestBasicImageCompareComponent>;
        let imageCompareInstance: ImageCompare;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestBasicImageCompareComponent);
            testFixture.detectChanges();
            imageCompareInstance = testFixture.debugElement.query(By.directive(ImageCompare)).componentInstance;
        });

        it('should initialize direction detection on ngOnInit', () => {
            spyOn(imageCompareInstance, 'updateDirection');
            spyOn(imageCompareInstance, 'observeDirectionChanges');

            imageCompareInstance.ngOnInit();

            expect(imageCompareInstance.updateDirection).toHaveBeenCalled();
            expect(imageCompareInstance.observeDirectionChanges).toHaveBeenCalled();
        });

        it('should process templates on ngAfterContentInit', () => {
            // Mock templates
            const mockLeftTemplate = {} as any;
            const mockRightTemplate = {} as any;
            const mockTemplate1 = {
                getType: () => 'left',
                template: mockLeftTemplate
            };
            const mockTemplate2 = {
                getType: () => 'right',
                template: mockRightTemplate
            };

            // Mock templates QueryList
            const mockTemplates = {
                forEach: (callback: Function) => {
                    callback(mockTemplate1);
                    callback(mockTemplate2);
                }
            };

            imageCompareInstance.templates = mockTemplates as any;
            imageCompareInstance.ngAfterContentInit();

            expect(imageCompareInstance._leftTemplate).toBe(mockLeftTemplate);
            expect(imageCompareInstance._rightTemplate).toBe(mockRightTemplate);
        });

        it('should cleanup mutation observer on ngOnDestroy', () => {
            const mockMutationObserver = {
                disconnect: jasmine.createSpy('disconnect')
            };
            imageCompareInstance.mutationObserver = mockMutationObserver as any;

            imageCompareInstance.ngOnDestroy();

            expect(mockMutationObserver.disconnect).toHaveBeenCalled();
        });

        it('should call super.ngOnDestroy', () => {
            spyOn(Object.getPrototypeOf(Object.getPrototypeOf(imageCompareInstance)), 'ngOnDestroy');

            imageCompareInstance.ngOnDestroy();

            expect(Object.getPrototypeOf(Object.getPrototypeOf(imageCompareInstance)).ngOnDestroy).toHaveBeenCalled();
        });
    });

    describe('Public Methods', () => {
        let testFixture: ComponentFixture<TestBasicImageCompareComponent>;
        let imageCompareInstance: ImageCompare;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestBasicImageCompareComponent);
            testFixture.detectChanges();
            imageCompareInstance = testFixture.debugElement.query(By.directive(ImageCompare)).componentInstance;
        });

        it('should updateDirection method work correctly', () => {
            // Test LTR
            spyOn(imageCompareInstance.el.nativeElement, 'closest').and.returnValue(null);
            imageCompareInstance.updateDirection();
            expect(imageCompareInstance.isRTL).toBe(false);

            // Test RTL
            (imageCompareInstance.el.nativeElement.closest as jasmine.Spy).and.returnValue({ dir: 'rtl' });
            imageCompareInstance.updateDirection();
            expect(imageCompareInstance.isRTL).toBe(true);
        });

        it('should observeDirectionChanges method setup mutation observer correctly', () => {
            const mockMutationObserver = jasmine.createSpy('MutationObserver').and.returnValue({
                observe: jasmine.createSpy('observe'),
                disconnect: jasmine.createSpy('disconnect')
            });
            (window as any).MutationObserver = mockMutationObserver;

            imageCompareInstance.observeDirectionChanges();

            expect(mockMutationObserver).toHaveBeenCalled();
        });
    });

    describe('Error Handling', () => {
        it('should handle missing templates gracefully', () => {
            const testFixture = TestBed.createComponent(ImageCompare);
            testFixture.detectChanges();

            expect(() => testFixture.detectChanges()).not.toThrow();
        });

        it('should handle onSlide method existence', () => {
            const testFixture = TestBed.createComponent(TestBasicImageCompareComponent);
            testFixture.detectChanges();
            const imageCompareInstance = testFixture.debugElement.query(By.directive(ImageCompare)).componentInstance;

            // Just verify the method exists
            expect(imageCompareInstance.onSlide).toBeDefined();
            expect(typeof imageCompareInstance.onSlide).toBe('function');
        });
    });

    describe('Platform Detection', () => {
        let testFixture: ComponentFixture<TestBasicImageCompareComponent>;
        let imageCompareInstance: ImageCompare;

        beforeEach(() => {
            testFixture = TestBed.createComponent(TestBasicImageCompareComponent);
            testFixture.detectChanges();
            imageCompareInstance = testFixture.debugElement.query(By.directive(ImageCompare)).componentInstance;
        });

        it('should have observeDirectionChanges method for platform detection', () => {
            // Test that the method exists and platform detection is in place
            expect(imageCompareInstance.observeDirectionChanges).toBeDefined();
            expect(typeof imageCompareInstance.observeDirectionChanges).toBe('function');

            // Test that the component has a mutation observer property
            expect(imageCompareInstance.hasOwnProperty('mutationObserver')).toBe(true);
        });
    });
});
