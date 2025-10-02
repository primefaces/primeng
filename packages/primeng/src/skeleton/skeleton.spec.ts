import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
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
            ]
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

        it('should handle rectangle shape', () => {
            component.shape = 'rectangle';
            fixture.detectChanges();

            expect(skeleton.shape).toBe('rectangle');
        });

        it('should handle circle shape', () => {
            component.shape = 'circle';
            fixture.detectChanges();

            expect(skeleton.shape).toBe('circle');
        });

        it('should handle square shape', () => {
            component.shape = 'square';
            fixture.detectChanges();

            expect(skeleton.shape).toBe('square');
        });

        it('should handle custom shapes', () => {
            component.shape = 'custom-shape';
            fixture.detectChanges();

            expect(skeleton.shape).toBe('custom-shape');
        });

        it('should apply border radius correctly', () => {
            component.borderRadius = '10px';
            fixture.detectChanges();

            expect(skeleton.borderRadius).toBe('10px');
            expect(skeleton.containerStyle.borderRadius).toBe('10px');
        });

        it('should handle size property for square elements', () => {
            component.size = '50px';
            component.shape = 'circle';
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

        it('should prioritize size over width/height when size is provided', () => {
            component.size = '100px';
            fixture.detectChanges();

            expect(skeleton.containerStyle.width).toBe('100px');
            expect(skeleton.containerStyle.height).toBe('100px');
        });

        it('should use width/height when size is not provided', () => {
            component.size = undefined as any;
            component.width = '300px';
            component.height = '40px';
            fixture.detectChanges();

            expect(skeleton.containerStyle.width).toBe('300px');
            expect(skeleton.containerStyle.height).toBe('40px');
        });

        it('should handle percentage values', () => {
            component.width = '75%';
            component.height = '2em';
            fixture.detectChanges();

            expect(skeleton.containerStyle.width).toBe('75%');
            expect(skeleton.containerStyle.height).toBe('2em');
        });

        it('should handle viewport units', () => {
            component.width = '50vw';
            component.height = '10vh';
            fixture.detectChanges();

            expect(skeleton.containerStyle.width).toBe('50vw');
            expect(skeleton.containerStyle.height).toBe('10vh');
        });

        it('should handle rem and em units', () => {
            component.width = '20rem';
            component.height = '3em';
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

        it('should handle wave animation', () => {
            component.animation = 'wave';
            fixture.detectChanges();

            expect(skeleton.animation).toBe('wave');
        });

        it('should handle pulse animation', () => {
            component.animation = 'pulse';
            fixture.detectChanges();

            expect(skeleton.animation).toBe('pulse');
        });

        it('should handle none animation', () => {
            component.animation = 'none';
            fixture.detectChanges();

            expect(skeleton.animation).toBe('none');
        });

        it('should handle custom animation types', () => {
            component.animation = 'custom-animation';
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

        it('should handle undefined styleClass', () => {
            component.styleClass = undefined as any;
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

        it('should update shape dynamically', () => {
            component.dynamicShape = 'circle';
            fixture.detectChanges();

            expect(skeleton.shape).toBe('circle');
        });

        it('should update animation dynamically', () => {
            component.dynamicAnimation = 'pulse';
            fixture.detectChanges();

            expect(skeleton.animation).toBe('pulse');
        });

        it('should update dimensions dynamically', () => {
            component.dynamicWidth = '250px';
            component.dynamicHeight = '60px';
            fixture.detectChanges();

            expect(skeleton.width).toBe('250px');
            expect(skeleton.height).toBe('60px');
            expect(skeleton.containerStyle.width).toBe('250px');
            expect(skeleton.containerStyle.height).toBe('60px');
        });

        it('should update size dynamically', () => {
            component.dynamicSize = '120px';
            fixture.detectChanges();

            expect(skeleton.size).toBe('120px');
            expect(skeleton.containerStyle.width).toBe('120px');
            expect(skeleton.containerStyle.height).toBe('120px');
        });

        it('should update border radius dynamically', () => {
            component.dynamicBorderRadius = '15px';
            fixture.detectChanges();

            expect(skeleton.borderRadius).toBe('15px');
            expect(skeleton.containerStyle.borderRadius).toBe('15px');
        });

        it('should update styleClass dynamically', () => {
            component.dynamicStyleClass = 'new-style';
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

        it('should handle rapid property updates', fakeAsync(() => {
            skeleton.shape = 'rectangle';
            fixture.detectChanges();
            tick();

            skeleton.shape = 'circle';
            fixture.detectChanges();
            tick();

            skeleton.shape = 'square';
            fixture.detectChanges();
            tick();

            expect(skeleton.shape).toBe('square');
            flush();
        }));

        it('should handle complex CSS calc expressions', () => {
            skeleton.width = 'calc(100% - 20px)';
            skeleton.height = 'calc(50vh - 10px)';

            const style = skeleton.containerStyle;
            expect(style.width).toBe('calc(100% - 20px)');
            expect(style.height).toBe('calc(50vh - 10px)');
        });
    });

    describe('Performance', () => {
        it('should handle multiple skeletons efficiently', fakeAsync(() => {
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
                imports: [SkeletonModule]
            });

            const fixture = TestBed.createComponent(TestMultipleSkeletonsComponent);

            expect(() => {
                fixture.detectChanges();
                tick();
            }).not.toThrow();

            const skeletons = fixture.debugElement.queryAll(By.directive(Skeleton));
            expect(skeletons.length).toBe(100);
            flush();
        }));

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
                imports: [SkeletonModule]
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

        it('should work with conditional rendering', fakeAsync(() => {
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
                imports: [SkeletonModule]
            });

            const fixture = TestBed.createComponent(TestConditionalSkeletonsComponent);
            const component = fixture.componentInstance;
            fixture.detectChanges();

            // Should show skeletons initially
            let skeletons = fixture.debugElement.queryAll(By.directive(Skeleton));
            expect(skeletons.length).toBe(3);

            // Hide skeletons
            component.showSkeletons = false;
            fixture.detectChanges();
            tick();

            skeletons = fixture.debugElement.queryAll(By.directive(Skeleton));
            expect(skeletons.length).toBe(0);

            // Show skeletons again
            component.showSkeletons = true;
            fixture.detectChanges();
            tick();

            skeletons = fixture.debugElement.queryAll(By.directive(Skeleton));
            expect(skeletons.length).toBe(3);
            flush();
        }));
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
});
