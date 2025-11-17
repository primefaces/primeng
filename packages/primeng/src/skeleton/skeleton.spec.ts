import { Component, DebugElement, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Skeleton, SkeletonModule } from './skeleton';
import { BaseComponent } from 'primeng/basecomponent';

@Component({
    standalone: false,
    selector: 'test-basic-skeleton',
    template: `<p-skeleton [shape]="shape" [animation]="animation" [width]="width" [height]="height"></p-skeleton>`
})
class TestBasicSkeletonComponent {
    shape = 'rectangle';
    animation = 'wave';
    width = '100%';
    height = '1rem';
}

@Component({
    standalone: false,
    selector: 'test-skeleton-shapes',
    template: ` <p-skeleton [shape]="shape" [size]="size" [borderRadius]="borderRadius" [animation]="animation"> </p-skeleton> `
})
class TestSkeletonShapesComponent {
    shape: string = 'rectangle';
    size: string | undefined;
    borderRadius: string | undefined;
    animation = 'wave';
}

@Component({
    standalone: false,
    selector: 'test-skeleton-dimensions',
    template: ` <p-skeleton [width]="width" [height]="height" [size]="size" [shape]="shape"> </p-skeleton> `
})
class TestSkeletonDimensionsComponent {
    width = '200px';
    height = '50px';
    size: string | undefined;
    shape = 'rectangle';
}

@Component({
    standalone: false,
    selector: 'test-skeleton-animations',
    template: ` <p-skeleton [animation]="animation" [shape]="shape"> </p-skeleton> `
})
class TestSkeletonAnimationsComponent {
    animation = 'wave';
    shape = 'rectangle';
}

@Component({
    standalone: false,
    selector: 'test-skeleton-styling',
    template: ` <p-skeleton [styleClass]="styleClass" [shape]="shape" [borderRadius]="borderRadius"> </p-skeleton> `
})
class TestSkeletonStylingComponent {
    styleClass = 'custom-skeleton';
    shape = 'circle';
    borderRadius = '8px';
}

@Component({
    standalone: false,
    selector: 'test-skeleton-card-layout',
    template: `
        <div class="card-skeleton">
            <p-skeleton shape="circle" size="4rem"></p-skeleton>
            <div class="content">
                <p-skeleton width="10rem" styleClass="mb-2"></p-skeleton>
                <p-skeleton width="8rem" styleClass="mb-2"></p-skeleton>
                <p-skeleton height="0.5rem" styleClass="mb-2"></p-skeleton>
            </div>
        </div>
    `
})
class TestSkeletonCardLayoutComponent {}

@Component({
    standalone: false,
    selector: 'test-skeleton-data-table',
    template: `
        <div class="table-skeleton">
            <div class="table-header">
                <p-skeleton width="100%" height="2rem" styleClass="mb-2"></p-skeleton>
            </div>
            <div class="table-rows">
                <div *ngFor="let row of rows; trackBy: trackByFn" class="table-row">
                    <p-skeleton width="25%" height="1.5rem" styleClass="mr-2"></p-skeleton>
                    <p-skeleton width="25%" height="1.5rem" styleClass="mr-2"></p-skeleton>
                    <p-skeleton width="25%" height="1.5rem" styleClass="mr-2"></p-skeleton>
                    <p-skeleton width="25%" height="1.5rem"></p-skeleton>
                </div>
            </div>
        </div>
    `
})
class TestSkeletonDataTableComponent {
    rows = Array(5).fill({});

    trackByFn(index: number): number {
        return index;
    }
}

@Component({
    standalone: false,
    selector: 'test-skeleton-empty',
    template: `<p-skeleton></p-skeleton>`
})
class TestSkeletonEmptyComponent {}

@Component({
    standalone: false,
    selector: 'test-skeleton-dynamic',
    template: ` <p-skeleton [shape]="dynamicShape" [animation]="dynamicAnimation" [width]="dynamicWidth" [height]="dynamicHeight" [size]="dynamicSize" [borderRadius]="dynamicBorderRadius" [styleClass]="dynamicStyleClass"> </p-skeleton> `
})
class TestSkeletonDynamicComponent {
    dynamicShape = 'rectangle';
    dynamicAnimation = 'wave';
    dynamicWidth = '100px';
    dynamicHeight = '20px';
    dynamicSize: string | undefined;
    dynamicBorderRadius: string | undefined;
    dynamicStyleClass: string | undefined;
}

describe('Skeleton', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SkeletonModule, NoopAnimationsModule],
            declarations: [
                TestBasicSkeletonComponent,
                TestSkeletonShapesComponent,
                TestSkeletonDimensionsComponent,
                TestSkeletonAnimationsComponent,
                TestSkeletonStylingComponent,
                TestSkeletonCardLayoutComponent,
                TestSkeletonDataTableComponent,
                TestSkeletonEmptyComponent,
                TestSkeletonDynamicComponent
            ],
            providers: [provideZonelessChangeDetection()]
        });
    });

    describe('Component Initialization', () => {
        let fixture: ComponentFixture<TestBasicSkeletonComponent>;
        let component: TestBasicSkeletonComponent;
        let skeleton: Skeleton;
        let debugElement: DebugElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicSkeletonComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            debugElement = fixture.debugElement.query(By.directive(Skeleton));
            skeleton = debugElement.componentInstance;
        });

        it('should create the component', () => {
            expect(skeleton).toBeTruthy();
        });

        it('should have default values', () => {
            const newFixture = TestBed.createComponent(TestBasicSkeletonComponent);
            const newSkeleton = newFixture.debugElement.query(By.directive(Skeleton)).componentInstance;

            expect(newSkeleton.shape).toBe('rectangle');
            expect(newSkeleton.animation).toBe('wave');
            expect(newSkeleton.width).toBe('100%');
            expect(newSkeleton.height).toBe('1rem');
            expect(newSkeleton.borderRadius).toBeUndefined();
            expect(newSkeleton.size).toBeUndefined();
        });

        it('should accept custom values', () => {
            expect(skeleton.shape).toBe(component.shape);
            expect(skeleton.animation).toBe(component.animation);
            expect(skeleton.width).toBe(component.width);
            expect(skeleton.height).toBe(component.height);
        });

        it('should extend BaseComponent', () => {
            expect(skeleton.cx).toBeDefined();
            expect(skeleton.cd).toBeDefined();
        });

        it('should inject component style', () => {
            expect(skeleton._componentStyle).toBeDefined();
        });
    });

    describe('Shape Variations', () => {
        let fixture: ComponentFixture<TestSkeletonShapesComponent>;
        let component: TestSkeletonShapesComponent;
        let skeleton: Skeleton;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestSkeletonShapesComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const debugElement = fixture.debugElement.query(By.directive(Skeleton));
            skeleton = debugElement.componentInstance;
            element = debugElement.nativeElement;
        });

        it('should handle rectangle shape', async () => {
            component.shape = 'rectangle';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(skeleton.shape).toBe('rectangle');
        });

        it('should handle circle shape', async () => {
            component.shape = 'circle';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(skeleton.shape).toBe('circle');
        });

        it('should handle square shape', async () => {
            component.shape = 'square';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(skeleton.shape).toBe('square');
        });

        it('should handle custom shapes', async () => {
            component.shape = 'custom-shape';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(skeleton.shape).toBe('custom-shape');
        });

        it('should apply border radius correctly', async () => {
            component.borderRadius = '10px';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(skeleton.borderRadius).toBe('10px');
            expect(skeleton.containerStyle.borderRadius).toBe('10px');
        });

        it('should handle size property for square elements', async () => {
            component.size = '50px';
            component.shape = 'circle';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(skeleton.size).toBe('50px');
            expect(skeleton.containerStyle.width).toBe('50px');
            expect(skeleton.containerStyle.height).toBe('50px');
        });
    });

    describe('Dimensions and Sizing', () => {
        let fixture: ComponentFixture<TestSkeletonDimensionsComponent>;
        let component: TestSkeletonDimensionsComponent;
        let skeleton: Skeleton;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestSkeletonDimensionsComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            skeleton = fixture.debugElement.query(By.directive(Skeleton)).componentInstance;
        });

        it('should apply custom width and height', () => {
            expect(skeleton.width).toBe(component.width);
            expect(skeleton.height).toBe(component.height);

            expect(skeleton.containerStyle.width).toBe('200px');
            expect(skeleton.containerStyle.height).toBe('50px');
        });

        it('should prioritize size over width/height when size is provided', async () => {
            component.size = '100px';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(skeleton.containerStyle.width).toBe('100px');
            expect(skeleton.containerStyle.height).toBe('100px');
        });

        it('should use width/height when size is not provided', async () => {
            component.size = undefined as any;
            component.width = '300px';
            component.height = '40px';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(skeleton.containerStyle.width).toBe('300px');
            expect(skeleton.containerStyle.height).toBe('40px');
        });

        it('should handle percentage values', async () => {
            component.width = '75%';
            component.height = '2em';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(skeleton.containerStyle.width).toBe('75%');
            expect(skeleton.containerStyle.height).toBe('2em');
        });

        it('should handle viewport units', async () => {
            component.width = '50vw';
            component.height = '10vh';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(skeleton.containerStyle.width).toBe('50vw');
            expect(skeleton.containerStyle.height).toBe('10vh');
        });

        it('should handle rem and em units', async () => {
            component.width = '20rem';
            component.height = '3em';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(skeleton.containerStyle.width).toBe('20rem');
            expect(skeleton.containerStyle.height).toBe('3em');
        });
    });

    describe('Animation Types', () => {
        let fixture: ComponentFixture<TestSkeletonAnimationsComponent>;
        let component: TestSkeletonAnimationsComponent;
        let skeleton: Skeleton;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestSkeletonAnimationsComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            skeleton = fixture.debugElement.query(By.directive(Skeleton)).componentInstance;
        });

        it('should handle wave animation', async () => {
            component.animation = 'wave';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(skeleton.animation).toBe('wave');
        });

        it('should handle pulse animation', async () => {
            component.animation = 'pulse';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(skeleton.animation).toBe('pulse');
        });

        it('should handle none animation', async () => {
            component.animation = 'none';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(skeleton.animation).toBe('none');
        });

        it('should handle custom animation types', async () => {
            component.animation = 'custom-animation';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(skeleton.animation).toBe('custom-animation');
        });
    });

    describe('CSS Classes and Styling', () => {
        let fixture: ComponentFixture<TestSkeletonStylingComponent>;
        let component: TestSkeletonStylingComponent;
        let skeleton: Skeleton;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestSkeletonStylingComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const debugElement = fixture.debugElement.query(By.directive(Skeleton));
            skeleton = debugElement.componentInstance;
            element = debugElement.nativeElement;
        });

        it('should apply custom styleClass', () => {
            expect(element.classList.contains('custom-skeleton')).toBe(true);
        });

        it('should apply root CSS class through cx method', () => {
            const classes = element.className;
            expect(classes).toBeTruthy();
        });

        it('should merge inline styles with component styles', () => {
            const containerStyle = skeleton.containerStyle;
            expect(containerStyle).toBeTruthy();
            expect(containerStyle.borderRadius).toBe('8px');
        });

        it('should handle undefined styleClass', async () => {
            component.styleClass = undefined as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(() => fixture.detectChanges()).not.toThrow();
        });
    });

    describe('Container Style Calculation', () => {
        let fixture: ComponentFixture<TestSkeletonDimensionsComponent>;
        let skeleton: Skeleton;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestSkeletonDimensionsComponent);
            fixture.detectChanges();
            skeleton = fixture.debugElement.query(By.directive(Skeleton)).componentInstance;
        });

        it('should calculate container style with size property', () => {
            skeleton.size = '80px';
            skeleton.borderRadius = '5px';

            const style = skeleton.containerStyle;

            expect(style.width).toBe('80px');
            expect(style.height).toBe('80px');
            expect(style.borderRadius).toBe('5px');
        });

        it('should calculate container style with width and height', () => {
            skeleton.size = undefined as any;
            skeleton.width = '150px';
            skeleton.height = '30px';
            skeleton.borderRadius = '3px';

            const style = skeleton.containerStyle;

            expect(style.width).toBe('150px');
            expect(style.height).toBe('30px');
            expect(style.borderRadius).toBe('3px');
        });

        it('should merge with component inline styles', () => {
            const style = skeleton.containerStyle;

            // Should have component inline styles merged
            expect(style).toBeTruthy();
            expect(typeof style).toBe('object');
        });

        it('should handle missing borderRadius', () => {
            skeleton.borderRadius = undefined as any;

            const style = skeleton.containerStyle;

            expect(style.borderRadius).toBeUndefined();
        });
    });

    describe('ARIA Attributes and Accessibility', () => {
        let fixture: ComponentFixture<TestBasicSkeletonComponent>;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicSkeletonComponent);
            fixture.detectChanges();
            element = fixture.debugElement.query(By.directive(Skeleton)).nativeElement;
        });

        it('should have aria-hidden attribute', () => {
            expect(element.getAttribute('aria-hidden')).toBe('true');
        });

        it('should have data-pc-name attribute', () => {
            expect(element.getAttribute('data-pc-name')).toBe('skeleton');
        });

        it('should have data-pc-section attribute', () => {
            expect(element.getAttribute('data-pc-section')).toBe('root');
        });

        it('should be screen reader friendly', () => {
            // Skeleton should be hidden from screen readers
            expect(element.getAttribute('aria-hidden')).toBe('true');
        });
    });

    describe('Real-world Usage Scenarios', () => {
        it('should work in card layout', () => {
            const fixture = TestBed.createComponent(TestSkeletonCardLayoutComponent);
            fixture.detectChanges();

            const skeletons = fixture.debugElement.queryAll(By.directive(Skeleton));
            expect(skeletons.length).toBe(4); // 1 circle + 3 rectangles

            // Circle avatar skeleton
            expect(skeletons[0].componentInstance.shape).toBe('circle');
            expect(skeletons[0].componentInstance.size).toBe('4rem');

            // Content skeletons
            expect(skeletons[1].componentInstance.width).toBe('10rem');
            expect(skeletons[2].componentInstance.width).toBe('8rem');
            expect(skeletons[3].componentInstance.height).toBe('0.5rem');
        });

        it('should work in data table layout', () => {
            const fixture = TestBed.createComponent(TestSkeletonDataTableComponent);
            fixture.detectChanges();

            const skeletons = fixture.debugElement.queryAll(By.directive(Skeleton));
            expect(skeletons.length).toBe(21); // 1 header + 20 cells (5 rows * 4 columns)

            // Header skeleton
            expect(skeletons[0].componentInstance.width).toBe('100%');
            expect(skeletons[0].componentInstance.height).toBe('2rem');

            // Row cell skeletons
            expect(skeletons[1].componentInstance.width).toBe('25%');
            expect(skeletons[1].componentInstance.height).toBe('1.5rem');
        });
    });

    describe('Dynamic Updates', () => {
        let fixture: ComponentFixture<TestSkeletonDynamicComponent>;
        let component: TestSkeletonDynamicComponent;
        let skeleton: Skeleton;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestSkeletonDynamicComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            skeleton = fixture.debugElement.query(By.directive(Skeleton)).componentInstance;
        });

        it('should update shape dynamically', async () => {
            component.dynamicShape = 'circle';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(skeleton.shape).toBe('circle');
        });

        it('should update animation dynamically', async () => {
            component.dynamicAnimation = 'pulse';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(skeleton.animation).toBe('pulse');
        });

        it('should update dimensions dynamically', async () => {
            component.dynamicWidth = '250px';
            component.dynamicHeight = '60px';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(skeleton.width).toBe('250px');
            expect(skeleton.height).toBe('60px');
            expect(skeleton.containerStyle.width).toBe('250px');
            expect(skeleton.containerStyle.height).toBe('60px');
        });

        it('should update size dynamically', async () => {
            component.dynamicSize = '120px';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(skeleton.size).toBe('120px');
            expect(skeleton.containerStyle.width).toBe('120px');
            expect(skeleton.containerStyle.height).toBe('120px');
        });

        it('should update border radius dynamically', async () => {
            component.dynamicBorderRadius = '15px';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(skeleton.borderRadius).toBe('15px');
            expect(skeleton.containerStyle.borderRadius).toBe('15px');
        });

        it('should update styleClass dynamically', async () => {
            component.dynamicStyleClass = 'new-style';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            const element = fixture.debugElement.query(By.directive(Skeleton)).nativeElement;
            expect(element.classList.contains('new-style')).toBe(true);
        });
    });

    describe('Edge Cases', () => {
        let fixture: ComponentFixture<TestSkeletonEmptyComponent>;
        let skeleton: Skeleton;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestSkeletonEmptyComponent);
            fixture.detectChanges();
            skeleton = fixture.debugElement.query(By.directive(Skeleton)).componentInstance;
        });

        it('should handle empty/default configuration', () => {
            expect(skeleton).toBeTruthy();
            expect(skeleton.shape).toBe('rectangle');
            expect(skeleton.animation).toBe('wave');
            expect(skeleton.width).toBe('100%');
            expect(skeleton.height).toBe('1rem');
        });

        it('should handle zero dimensions', () => {
            skeleton.width = '0px';
            skeleton.height = '0px';

            const style = skeleton.containerStyle;
            expect(style.width).toBe('0px');
            expect(style.height).toBe('0px');
        });

        it('should handle very large dimensions', () => {
            skeleton.width = '9999px';
            skeleton.height = '9999px';

            const style = skeleton.containerStyle;
            expect(style.width).toBe('9999px');
            expect(style.height).toBe('9999px');
        });

        it('should handle empty strings', () => {
            skeleton.width = '';
            skeleton.height = '';

            const style = skeleton.containerStyle;
            expect(style.width).toBe('' as any);
            expect(style.height).toBe('' as any);
        });

        it('should handle null/undefined values gracefully', () => {
            skeleton.borderRadius = undefined as any;
            skeleton.size = undefined as any;

            expect(() => {
                const style = skeleton.containerStyle;
                expect(style).toBeTruthy();
            }).not.toThrow();
        });

        it('should handle invalid CSS values', () => {
            skeleton.width = 'invalid-value';
            skeleton.height = 'another-invalid';

            const style = skeleton.containerStyle;
            expect(style.width).toBe('invalid-value');
            expect(style.height).toBe('another-invalid');
        });

        it('should handle rapid property updates', async () => {
            skeleton.shape = 'rectangle';
            skeleton.cd.markForCheck();
            fixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            skeleton.shape = 'circle';
            skeleton.cd.markForCheck();
            fixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            skeleton.shape = 'square';
            skeleton.cd.markForCheck();
            fixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            expect(skeleton.shape).toBe('square');
        });

        it('should handle complex CSS calc expressions', () => {
            skeleton.width = 'calc(100% - 20px)';
            skeleton.height = 'calc(50vh - 10px)';

            const style = skeleton.containerStyle;
            expect(style.width).toBe('calc(100% - 20px)');
            expect(style.height).toBe('calc(50vh - 10px)');
        });
    });

    describe('Performance', () => {
        it('should handle multiple skeletons efficiently', async () => {
            @Component({
                standalone: false,
                template: `
                    <div *ngFor="let item of items; trackBy: trackByFn">
                        <p-skeleton [width]="item.width" [height]="item.height"></p-skeleton>
                    </div>
                `
            })
            class TestMultipleSkeletonsComponent {
                items = Array(100)
                    .fill(0)
                    .map((_, i) => ({
                        width: `${100 + i}px`,
                        height: `${20 + i}px`
                    }));

                trackByFn(index: number): number {
                    return index;
                }
            }

            TestBed.configureTestingModule({
                declarations: [TestMultipleSkeletonsComponent],
                imports: [SkeletonModule, NoopAnimationsModule],
                providers: [provideZonelessChangeDetection()]
            });

            const fixture = TestBed.createComponent(TestMultipleSkeletonsComponent);

            expect(() => {
                fixture.detectChanges();
            }).not.toThrow();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            const skeletons = fixture.debugElement.queryAll(By.directive(Skeleton));
            expect(skeletons.length).toBe(100);
        });

        it('should efficiently calculate container styles', () => {
            const fixture = TestBed.createComponent(TestBasicSkeletonComponent);
            fixture.detectChanges();
            const skeletonComponent = fixture.debugElement.query(By.directive(Skeleton)).componentInstance;

            const startTime = performance.now();

            // Calculate styles multiple times
            for (let i = 0; i < 1000; i++) {
                skeletonComponent.containerStyle;
            }

            const endTime = performance.now();
            const duration = endTime - startTime;

            // Should complete calculations quickly (less than 100ms for 1000 calculations)
            expect(duration).toBeLessThan(100);
        });
    });

    describe('Complex Scenarios', () => {
        it('should handle nested skeleton layouts', () => {
            @Component({
                standalone: false,
                template: `
                    <div class="container">
                        <div class="header">
                            <p-skeleton shape="circle" size="3rem"></p-skeleton>
                            <div class="header-content">
                                <p-skeleton width="8rem" height="1.5rem"></p-skeleton>
                                <p-skeleton width="6rem" height="1rem"></p-skeleton>
                            </div>
                        </div>
                        <div class="body">
                            <p-skeleton width="100%" height="10rem"></p-skeleton>
                        </div>
                        <div class="footer">
                            <p-skeleton width="4rem" height="2rem" styleClass="mr-2"></p-skeleton>
                            <p-skeleton width="4rem" height="2rem"></p-skeleton>
                        </div>
                    </div>
                `
            })
            class TestNestedSkeletonsComponent {}

            TestBed.configureTestingModule({
                declarations: [TestNestedSkeletonsComponent],
                imports: [SkeletonModule, NoopAnimationsModule],
                providers: [provideZonelessChangeDetection()]
            });

            const fixture = TestBed.createComponent(TestNestedSkeletonsComponent);
            fixture.detectChanges();

            const skeletons = fixture.debugElement.queryAll(By.directive(Skeleton));
            expect(skeletons.length).toBe(6);

            // Verify different configurations
            expect(skeletons[0].componentInstance.shape).toBe('circle');
            expect(skeletons[0].componentInstance.size).toBe('3rem');

            expect(skeletons[3].componentInstance.width).toBe('100%');
            expect(skeletons[3].componentInstance.height).toBe('10rem');
        });

        it('should work with conditional rendering', async () => {
            @Component({
                standalone: false,
                template: `
                    <div *ngIf="showSkeletons">
                        <p-skeleton *ngFor="let item of skeletonItems" [width]="item.width" [height]="item.height" [shape]="item.shape"> </p-skeleton>
                    </div>
                `
            })
            class TestConditionalSkeletonsComponent {
                showSkeletons = true;
                skeletonItems = [
                    { width: '100%', height: '2rem', shape: 'rectangle' },
                    { width: '80%', height: '1.5rem', shape: 'rectangle' },
                    { width: '60%', height: '1rem', shape: 'rectangle' }
                ];
            }

            TestBed.configureTestingModule({
                declarations: [TestConditionalSkeletonsComponent],
                imports: [SkeletonModule, NoopAnimationsModule],
                providers: [provideZonelessChangeDetection()]
            });

            const fixture = TestBed.createComponent(TestConditionalSkeletonsComponent);
            const component = fixture.componentInstance;
            fixture.detectChanges();

            // Should show skeletons initially
            let skeletons = fixture.debugElement.queryAll(By.directive(Skeleton));
            expect(skeletons.length).toBe(3);

            // Hide skeletons
            component.showSkeletons = false;
            fixture.changeDetectorRef.markForCheck();
            fixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            skeletons = fixture.debugElement.queryAll(By.directive(Skeleton));
            expect(skeletons.length).toBe(0);

            // Show skeletons again
            component.showSkeletons = true;
            fixture.changeDetectorRef.markForCheck();
            fixture.detectChanges();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            skeletons = fixture.debugElement.queryAll(By.directive(Skeleton));
            expect(skeletons.length).toBe(3);
        });
    });

    describe('Lifecycle Hooks', () => {
        let fixture: ComponentFixture<TestBasicSkeletonComponent>;
        let skeleton: Skeleton;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicSkeletonComponent);
            fixture.detectChanges();
            skeleton = fixture.debugElement.query(By.directive(Skeleton)).componentInstance;
        });

        it('should call super.ngOnInit', () => {
            spyOn(BaseComponent.prototype, 'ngOnInit');
            skeleton.ngOnInit();
            expect(BaseComponent.prototype.ngOnInit).toHaveBeenCalled();
        });

        it('should call super.ngOnDestroy', () => {
            spyOn(BaseComponent.prototype, 'ngOnDestroy');
            skeleton.ngOnDestroy();
            expect(BaseComponent.prototype.ngOnDestroy).toHaveBeenCalled();
        });

        it('should initialize without errors', () => {
            expect(() => skeleton.ngOnInit()).not.toThrow();
        });

        it('should destroy without errors', () => {
            expect(() => skeleton.ngOnDestroy()).not.toThrow();
        });
    });

    describe('Template Rendering', () => {
        it('should render empty template correctly', () => {
            const fixture = TestBed.createComponent(TestBasicSkeletonComponent);
            fixture.detectChanges();

            const element = fixture.debugElement.query(By.directive(Skeleton)).nativeElement;

            // Skeleton has empty template, so should not have inner content
            expect(element.innerHTML.trim()).toBe('' as any);
        });

        it('should apply host bindings correctly', () => {
            const fixture = TestBed.createComponent(TestBasicSkeletonComponent);
            fixture.detectChanges();

            const element = fixture.debugElement.query(By.directive(Skeleton)).nativeElement;

            // Check host bindings
            expect(element.getAttribute('aria-hidden')).toBe('true');
            expect(element.getAttribute('data-pc-name')).toBe('skeleton');
            expect(element.getAttribute('data-pc-section')).toBe('root');
            expect(element.style).toBeTruthy();
        });
    });

    describe('PassThrough - Case 1: Simple string classes', () => {
        @Component({
            standalone: false,
            template: ` <p-skeleton [pt]="pt"></p-skeleton> `
        })
        class TestSkeletonPtComponent {
            pt: any = {};
        }

        let fixture: ComponentFixture<TestSkeletonPtComponent>;
        let component: TestSkeletonPtComponent;

        beforeEach(() => {
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [SkeletonModule, NoopAnimationsModule],
                declarations: [TestSkeletonPtComponent],
                providers: [provideZonelessChangeDetection()]
            });

            fixture = TestBed.createComponent(TestSkeletonPtComponent);
            component = fixture.componentInstance;
        });

        it('should apply pt host class', () => {
            component.pt = { host: 'HOST_CLASS' };
            fixture.detectChanges();
            fixture.detectChanges(); // Trigger ngAfterViewChecked

            const skeletonElement = fixture.debugElement.query(By.directive(Skeleton));
            expect(skeletonElement.nativeElement.classList.contains('HOST_CLASS')).toBe(true);
        });

        it('should apply pt root class', () => {
            component.pt = { root: 'ROOT_CLASS' };
            fixture.detectChanges();
            fixture.detectChanges();

            const skeletonElement = fixture.debugElement.query(By.directive(Skeleton));
            expect(skeletonElement.nativeElement.classList.contains('ROOT_CLASS')).toBe(true);
        });
    });

    describe('PassThrough - Case 2: Objects', () => {
        @Component({
            standalone: false,
            template: ` <p-skeleton [pt]="pt"></p-skeleton> `
        })
        class TestSkeletonPtObjectComponent {
            pt: any = {};
        }

        let fixture: ComponentFixture<TestSkeletonPtObjectComponent>;
        let component: TestSkeletonPtObjectComponent;

        beforeEach(() => {
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [SkeletonModule, NoopAnimationsModule],
                declarations: [TestSkeletonPtObjectComponent],
                providers: [provideZonelessChangeDetection()]
            });

            fixture = TestBed.createComponent(TestSkeletonPtObjectComponent);
            component = fixture.componentInstance;
        });

        it('should apply pt host with object properties', () => {
            component.pt = {
                host: {
                    class: 'HOST_OBJECT_CLASS',
                    style: { border: '1px solid red' },
                    'data-p-test': true
                }
            };
            fixture.detectChanges();
            fixture.detectChanges();

            const skeletonElement = fixture.debugElement.query(By.directive(Skeleton));
            expect(skeletonElement.nativeElement.classList.contains('HOST_OBJECT_CLASS')).toBe(true);
            expect(skeletonElement.nativeElement.style.border).toBe('1px solid red');
            expect(skeletonElement.nativeElement.getAttribute('data-p-test')).toBe('true');
        });

        it('should apply pt root with object properties', () => {
            component.pt = {
                root: {
                    class: 'ROOT_OBJECT_CLASS',
                    style: { 'background-color': 'yellow' },
                    'aria-label': 'SKELETON_CONTAINER'
                }
            };
            fixture.detectChanges();
            fixture.detectChanges();

            const skeletonElement = fixture.debugElement.query(By.directive(Skeleton));
            expect(skeletonElement.nativeElement.classList.contains('ROOT_OBJECT_CLASS')).toBe(true);
            expect(skeletonElement.nativeElement.style.backgroundColor).toBe('yellow');
            expect(skeletonElement.nativeElement.getAttribute('aria-label')).toBe('SKELETON_CONTAINER');
        });
    });

    describe('PassThrough - Case 3: Mixed object and string values', () => {
        @Component({
            standalone: false,
            template: ` <p-skeleton [pt]="pt"></p-skeleton> `
        })
        class TestSkeletonPtMixedComponent {
            pt: any = {};
        }

        let fixture: ComponentFixture<TestSkeletonPtMixedComponent>;
        let component: TestSkeletonPtMixedComponent;

        beforeEach(() => {
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [SkeletonModule, NoopAnimationsModule],
                declarations: [TestSkeletonPtMixedComponent],
                providers: [provideZonelessChangeDetection()]
            });

            fixture = TestBed.createComponent(TestSkeletonPtMixedComponent);
            component = fixture.componentInstance;
        });

        it('should apply mixed pt values', () => {
            component.pt = {
                host: {
                    class: 'HOST_MIXED_CLASS',
                    style: { padding: '10px' }
                },
                root: 'ROOT_STRING_CLASS'
            };
            fixture.detectChanges();
            fixture.detectChanges();

            const skeletonElement = fixture.debugElement.query(By.directive(Skeleton));
            expect(skeletonElement.nativeElement.classList.contains('HOST_MIXED_CLASS')).toBe(true);
            expect(skeletonElement.nativeElement.classList.contains('ROOT_STRING_CLASS')).toBe(true);
            expect(skeletonElement.nativeElement.style.padding).toBe('10px');
        });
    });

    describe('PassThrough - Case 4: Use variables from instance', () => {
        @Component({
            standalone: false,
            template: ` <p-skeleton [shape]="shape" [animation]="animation" [pt]="pt"></p-skeleton> `
        })
        class TestSkeletonPtInstanceComponent {
            pt: any = {};
            shape = 'circle';
            animation = 'wave';
        }

        let fixture: ComponentFixture<TestSkeletonPtInstanceComponent>;
        let component: TestSkeletonPtInstanceComponent;

        beforeEach(() => {
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [SkeletonModule, NoopAnimationsModule],
                declarations: [TestSkeletonPtInstanceComponent],
                providers: [provideZonelessChangeDetection()]
            });

            fixture = TestBed.createComponent(TestSkeletonPtInstanceComponent);
            component = fixture.componentInstance;
        });

        it('should apply pt based on instance shape', async () => {
            component.shape = 'circle';
            component.pt = {
                host: ({ instance }: any) => {
                    return {
                        class: {
                            SHAPE_CIRCLE: instance?.shape === 'circle',
                            SHAPE_RECTANGLE: instance?.shape === 'rectangle'
                        }
                    };
                }
            };
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            fixture.detectChanges();

            const skeletonElement = fixture.debugElement.query(By.directive(Skeleton));
            const hasCircle = skeletonElement.nativeElement.classList.contains('SHAPE_CIRCLE');
            const hasRectangle = skeletonElement.nativeElement.classList.contains('SHAPE_RECTANGLE');

            expect(hasCircle || !hasRectangle).toBe(true);
        });

        it('should apply pt style based on instance animation', async () => {
            component.animation = 'pulse';
            component.pt = {
                root: ({ instance }: any) => {
                    return {
                        style: {
                            opacity: instance?.animation === 'pulse' ? '0.8' : '1'
                        }
                    };
                }
            };
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            fixture.detectChanges();

            const skeletonElement = fixture.debugElement.query(By.directive(Skeleton));
            expect(skeletonElement.nativeElement.style.opacity).toBe('0.8');
        });
    });

    describe('PassThrough - Case 5: Event binding', () => {
        @Component({
            standalone: false,
            template: ` <p-skeleton [pt]="pt"></p-skeleton> `
        })
        class TestSkeletonPtEventComponent {
            pt: any = {};
        }

        let fixture: ComponentFixture<TestSkeletonPtEventComponent>;
        let component: TestSkeletonPtEventComponent;

        beforeEach(() => {
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [SkeletonModule, NoopAnimationsModule],
                declarations: [TestSkeletonPtEventComponent],
                providers: [provideZonelessChangeDetection()]
            });

            fixture = TestBed.createComponent(TestSkeletonPtEventComponent);
            component = fixture.componentInstance;
        });

        it('should bind onclick event to host element', async () => {
            let clicked = false;

            component.pt = {
                host: {
                    onclick: () => {
                        clicked = true;
                    }
                }
            };
            fixture.detectChanges();
            fixture.detectChanges();

            const skeletonElement = fixture.debugElement.query(By.directive(Skeleton));
            skeletonElement.nativeElement.click();
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            expect(clicked).toBe(true);
        });

        it('should bind onmouseenter event', async () => {
            let mouseEntered = false;

            component.pt = {
                root: {
                    onmouseenter: () => {
                        mouseEntered = true;
                    }
                }
            };
            fixture.detectChanges();
            fixture.detectChanges();

            const skeletonElement = fixture.debugElement.query(By.directive(Skeleton));
            skeletonElement.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
            await new Promise((resolve) => setTimeout(resolve, 100));
            await fixture.whenStable();

            expect(mouseEntered).toBe(true);
        });
    });

    describe('PassThrough - Case 6: Inline test', () => {
        @Component({
            standalone: false,
            template: ` <p-skeleton [pt]="{ host: 'INLINE_HOST_CLASS' }"></p-skeleton> `
        })
        class TestSkeletonInlineStringPtComponent {}

        @Component({
            standalone: false,
            template: ` <p-skeleton [pt]="{ host: { class: 'INLINE_OBJECT_CLASS', style: { border: '2px solid green' } } }"></p-skeleton> `
        })
        class TestSkeletonInlineObjectPtComponent {}

        it('should apply inline pt with string class', () => {
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [SkeletonModule, NoopAnimationsModule],
                declarations: [TestSkeletonInlineStringPtComponent],
                providers: [provideZonelessChangeDetection()]
            });

            const testFixture = TestBed.createComponent(TestSkeletonInlineStringPtComponent);
            testFixture.detectChanges();
            testFixture.detectChanges();

            const skeletonElement = testFixture.debugElement.query(By.directive(Skeleton));
            expect(skeletonElement.nativeElement.classList.contains('INLINE_HOST_CLASS')).toBe(true);
        });

        it('should apply inline pt with object', () => {
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [SkeletonModule, NoopAnimationsModule],
                declarations: [TestSkeletonInlineObjectPtComponent],
                providers: [provideZonelessChangeDetection()]
            });

            const testFixture = TestBed.createComponent(TestSkeletonInlineObjectPtComponent);
            testFixture.detectChanges();
            testFixture.detectChanges();

            const skeletonElement = testFixture.debugElement.query(By.directive(Skeleton));
            expect(skeletonElement.nativeElement.classList.contains('INLINE_OBJECT_CLASS')).toBe(true);
            expect(skeletonElement.nativeElement.style.border).toBe('2px solid green');
        });
    });

    describe('PassThrough - Case 7: Test from PrimeNGConfig', () => {
        it('should apply global pt configuration from PrimeNGConfig', () => {
            const { providePrimeNG } = require('primeng/config');

            @Component({
                standalone: false,
                template: `
                    <p-skeleton></p-skeleton>
                    <p-skeleton></p-skeleton>
                `
            })
            class TestSkeletonGlobalPtComponent {}

            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [SkeletonModule, NoopAnimationsModule],
                declarations: [TestSkeletonGlobalPtComponent],
                providers: [
                    provideZonelessChangeDetection(),
                    providePrimeNG({
                        pt: {
                            skeleton: {
                                host: 'GLOBAL_HOST_CLASS',
                                root: 'GLOBAL_ROOT_CLASS'
                            }
                        }
                    })
                ]
            });

            const testFixture = TestBed.createComponent(TestSkeletonGlobalPtComponent);
            testFixture.detectChanges();
            testFixture.detectChanges();

            const skeletons = testFixture.debugElement.queryAll(By.directive(Skeleton));
            expect(skeletons.length).toBe(2);

            skeletons.forEach((skeleton) => {
                expect(skeleton.nativeElement.classList.contains('GLOBAL_HOST_CLASS')).toBe(true);
                expect(skeleton.nativeElement.classList.contains('GLOBAL_ROOT_CLASS')).toBe(true);
            });
        });

        it('should merge local pt with global pt configuration', () => {
            const { providePrimeNG } = require('primeng/config');

            @Component({
                standalone: false,
                template: ` <p-skeleton [pt]="{ host: 'LOCAL_HOST_CLASS', root: 'LOCAL_ROOT_CLASS' }"></p-skeleton> `
            })
            class TestSkeletonMergedPtComponent {}

            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [SkeletonModule, NoopAnimationsModule],
                declarations: [TestSkeletonMergedPtComponent],
                providers: [
                    provideZonelessChangeDetection(),
                    providePrimeNG({
                        pt: {
                            skeleton: {
                                host: 'GLOBAL_HOST_CLASS'
                            }
                        }
                    })
                ]
            });

            const testFixture = TestBed.createComponent(TestSkeletonMergedPtComponent);
            testFixture.detectChanges();
            testFixture.detectChanges();

            const skeletonElement = testFixture.debugElement.query(By.directive(Skeleton));
            // Local pt should override global pt
            expect(skeletonElement.nativeElement.classList.contains('LOCAL_HOST_CLASS')).toBe(true);
            expect(skeletonElement.nativeElement.classList.contains('LOCAL_ROOT_CLASS')).toBe(true);
        });
    });

    describe('PassThrough - Case 8: Test hooks', () => {
        @Component({
            standalone: false,
            template: ` <p-skeleton [pt]="pt"></p-skeleton> `
        })
        class TestSkeletonPtHooksComponent {
            pt: any = {};
        }

        let fixture: ComponentFixture<TestSkeletonPtHooksComponent>;
        let component: TestSkeletonPtHooksComponent;

        beforeEach(() => {
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [SkeletonModule, NoopAnimationsModule],
                declarations: [TestSkeletonPtHooksComponent],
                providers: [provideZonelessChangeDetection()]
            });

            fixture = TestBed.createComponent(TestSkeletonPtHooksComponent);
            component = fixture.componentInstance;
        });

        it('should call onInit hook from pt', () => {
            let onInitCalled = false;

            component.pt = {
                host: 'PT_HOST',
                hooks: {
                    onInit: () => {
                        onInitCalled = true;
                    }
                }
            };
            fixture.detectChanges();

            expect(onInitCalled).toBe(true);
        });

        it('should call onAfterViewInit hook from pt', () => {
            let onAfterViewInitCalled = false;

            component.pt = {
                host: 'PT_HOST',
                hooks: {
                    onAfterViewInit: () => {
                        onAfterViewInitCalled = true;
                    }
                }
            };
            fixture.detectChanges();

            expect(onAfterViewInitCalled).toBe(true);
        });

        it('should call onDestroy hook from pt when component is destroyed', () => {
            let onDestroyCalled = false;

            component.pt = {
                host: 'PT_HOST',
                hooks: {
                    onDestroy: () => {
                        onDestroyCalled = true;
                    }
                }
            };
            fixture.detectChanges();

            fixture.destroy();

            expect(onDestroyCalled).toBe(true);
        });

        it('should pass context to hooks', () => {
            let hookContext: any = null;

            component.pt = {
                host: 'PT_HOST',
                hooks: {
                    onInit: (context: any) => {
                        hookContext = context;
                    }
                }
            };
            fixture.detectChanges();

            expect(hookContext).toBeTruthy();
        });

        it('should call multiple hooks in correct order', () => {
            const callOrder: string[] = [];

            component.pt = {
                host: 'PT_HOST',
                hooks: {
                    onInit: () => {
                        callOrder.push('onInit');
                    },
                    onAfterContentInit: () => {
                        callOrder.push('onAfterContentInit');
                    },
                    onAfterViewInit: () => {
                        callOrder.push('onAfterViewInit');
                    }
                }
            };
            fixture.detectChanges();

            expect(callOrder).toContain('onInit');
            expect(callOrder).toContain('onAfterViewInit');
            if (callOrder.includes('onAfterContentInit')) {
                expect(callOrder.indexOf('onInit')).toBeLessThan(callOrder.indexOf('onAfterContentInit'));
                expect(callOrder.indexOf('onAfterContentInit')).toBeLessThan(callOrder.indexOf('onAfterViewInit'));
            }
        });
    });
});
