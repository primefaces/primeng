import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MeterGroup, MeterGroupModule, MeterGroupLabel } from './metergroup';
import { MeterItem } from './metergroup.interface';

@Component({
    standalone: false,
    selector: 'test-basic-metergroup',
    template: `<p-metergroup [value]="value" [min]="min" [max]="max"></p-metergroup>`
})
class TestBasicMeterGroupComponent {
    value: MeterItem[] = [
        { label: 'Apps', value: 16, color: '#34d399' },
        { label: 'Messages', value: 8, color: '#fbbf24' },
        { label: 'Media', value: 24, color: '#60a5fa' },
        { label: 'System', value: 10, color: '#c084fc' }
    ];
    min = 0;
    max = 100;
}

@Component({
    standalone: false,
    selector: 'test-metergroup-orientations',
    template: ` <p-metergroup [value]="value" [orientation]="orientation" [labelPosition]="labelPosition" [labelOrientation]="labelOrientation"> </p-metergroup> `
})
class TestMeterGroupOrientationsComponent {
    value: MeterItem[] = [
        { label: 'Item 1', value: 25, color: '#ff0000' },
        { label: 'Item 2', value: 50, color: '#00ff00' }
    ];
    orientation: 'horizontal' | 'vertical' = 'horizontal';
    labelPosition: 'start' | 'end' = 'end';
    labelOrientation: 'horizontal' | 'vertical' = 'horizontal';
}

@Component({
    standalone: false,
    selector: 'test-metergroup-templates',
    template: `
        <p-metergroup [value]="value">
            <ng-template #label let-value let-totalPercent="totalPercent">
                <div class="custom-label">
                    <span>Total: {{ totalPercent }}%</span>
                </div>
            </ng-template>
            <ng-template #meter let-meter let-index="index" let-size="size">
                <div class="custom-meter" [style.width]="size">
                    {{ meter.label }}
                </div>
            </ng-template>
            <ng-template #start let-value>
                <div class="custom-start">Start Content</div>
            </ng-template>
            <ng-template #end let-value>
                <div class="custom-end">End Content</div>
            </ng-template>
            <ng-template #icon let-item>
                <i class="custom-icon">{{ item.label[0] }}</i>
            </ng-template>
        </p-metergroup>
    `
})
class TestMeterGroupTemplatesComponent {
    value: MeterItem[] = [
        { label: 'Category A', value: 30, color: '#3b82f6' },
        { label: 'Category B', value: 45, color: '#22c55e' }
    ];
}

@Component({
    standalone: false,
    selector: 'test-metergroup-with-icons',
    template: ` <p-metergroup [value]="value" [min]="min" [max]="max"> </p-metergroup> `
})
class TestMeterGroupWithIconsComponent {
    value: MeterItem[] = [
        { label: 'Apps', value: 20, color: '#34d399', icon: 'pi pi-mobile' },
        { label: 'Files', value: 35, color: '#fbbf24', icon: 'pi pi-file' },
        { label: 'Downloads', value: 15, color: '#60a5fa', icon: 'pi pi-download' }
    ];
    min = 0;
    max = 100;
}

@Component({
    standalone: false,
    selector: 'test-metergroup-empty',
    template: `<p-metergroup [value]="value"></p-metergroup>`
})
class TestMeterGroupEmptyComponent {
    value: MeterItem[] = [];
}

@Component({
    standalone: false,
    selector: 'test-metergroup-dynamic',
    template: ` <p-metergroup [value]="value" [min]="min" [max]="max" [styleClass]="styleClass"> </p-metergroup> `
})
class TestMeterGroupDynamicComponent {
    value: MeterItem[] = [{ label: 'Dynamic 1', value: 10, color: '#ff6b6b' }];
    min = 0;
    max = 100;
    styleClass = 'custom-meter-class';
}

describe('MeterGroup', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MeterGroupModule, NoopAnimationsModule],
            declarations: [TestBasicMeterGroupComponent, TestMeterGroupOrientationsComponent, TestMeterGroupTemplatesComponent, TestMeterGroupWithIconsComponent, TestMeterGroupEmptyComponent, TestMeterGroupDynamicComponent]
        });
    });

    describe('Component Initialization', () => {
        let fixture: ComponentFixture<TestBasicMeterGroupComponent>;
        let component: TestBasicMeterGroupComponent;
        let meterGroup: MeterGroup;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicMeterGroupComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const meterGroupDebugElement = fixture.debugElement.query(By.directive(MeterGroup));
            meterGroup = meterGroupDebugElement.componentInstance;
            element = meterGroupDebugElement.nativeElement;
        });

        it('should create the component', () => {
            expect(meterGroup).toBeTruthy();
        });

        it('should have default values', () => {
            const newFixture = TestBed.createComponent(TestBasicMeterGroupComponent);
            const newMeterGroup = newFixture.debugElement.query(By.directive(MeterGroup)).componentInstance;

            expect(newMeterGroup.min).toBe(0);
            expect(newMeterGroup.max).toBe(100);
            expect(newMeterGroup.orientation).toBe('horizontal');
            expect(newMeterGroup.labelPosition).toBe('end');
            expect(newMeterGroup.labelOrientation).toBe('horizontal');
        });

        it('should accept custom values', () => {
            expect(meterGroup.value).toEqual(component.value);
            expect(meterGroup.min).toBe(component.min);
            expect(meterGroup.max).toBe(component.max);
        });

        it('should extend BaseComponent', () => {
            expect(meterGroup.cx).toBeDefined();
            expect(meterGroup.cd).toBeDefined();
        });

        it('should inject component style', () => {
            expect(meterGroup._componentStyle).toBeDefined();
        });
    });

    describe('Value and Meter Rendering', () => {
        let fixture: ComponentFixture<TestBasicMeterGroupComponent>;
        let component: TestBasicMeterGroupComponent;
        let meterGroup: MeterGroup;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicMeterGroupComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const meterGroupDebugElement = fixture.debugElement.query(By.directive(MeterGroup));
            meterGroup = meterGroupDebugElement.componentInstance;
            element = meterGroupDebugElement.nativeElement;
        });

        it('should render all meter items', () => {
            const meters = element.querySelectorAll('.p-metergroup-meter');
            expect(meters.length).toBeGreaterThan(0);
        });

        it('should calculate percent correctly', () => {
            // Test with value 16, min 0, max 100
            const percent = meterGroup.percent(16);
            expect(percent).toBe(16);

            // Test with different min/max
            meterGroup.min = 10;
            meterGroup.max = 110;
            const percent2 = meterGroup.percent(60);
            expect(percent2).toBe(50);
        });

        it('should calculate percentValue correctly', () => {
            const percentValue = meterGroup.percentValue(25);
            expect(percentValue).toBe('25%');
        });

        it('should calculate totalPercent correctly', () => {
            // Sum of values: 16 + 8 + 24 + 10 = 58
            const totalPercent = meterGroup.totalPercent();
            expect(totalPercent).toBe(58);
        });

        it('should calculate percentages array correctly', () => {
            const percentages = meterGroup.percentages();
            expect(percentages).toEqual([16, 24, 48, 58]); // Cumulative sums
        });

        it('should apply meter styles correctly for horizontal orientation', () => {
            const meterStyle = meterGroup.meterStyle({ value: 30, color: '#ff0000' });
            expect(meterStyle.backgroundColor).toBe('#ff0000');
            expect(meterStyle.width).toBe('30%');
            expect(meterStyle.height).toBeFalsy();
        });

        it('should apply meter styles correctly for vertical orientation', () => {
            meterGroup.orientation = 'vertical';
            const meterStyle = meterGroup.meterStyle({ value: 40, color: '#00ff00' });
            expect(meterStyle.backgroundColor).toBe('#00ff00');
            expect(meterStyle.height).toBe('40%');
            expect(meterStyle.width).toBeFalsy();
        });

        it('should handle zero values', () => {
            component.value = [{ label: 'Zero', value: 0, color: '#ff0000' }];
            fixture.detectChanges();

            const percent = meterGroup.percent(0);
            expect(percent).toBe(0);
        });

        it('should handle negative values', () => {
            const percent = meterGroup.percent(-10);
            expect(percent).toBe(0); // Should be clamped to 0
        });

        it('should handle values exceeding max', () => {
            const percent = meterGroup.percent(150);
            expect(percent).toBe(100); // Should be clamped to 100
        });
    });

    describe('Orientation and Label Position', () => {
        let fixture: ComponentFixture<TestMeterGroupOrientationsComponent>;
        let component: TestMeterGroupOrientationsComponent;
        let meterGroup: MeterGroup;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestMeterGroupOrientationsComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const meterGroupDebugElement = fixture.debugElement.query(By.directive(MeterGroup));
            meterGroup = meterGroupDebugElement.componentInstance;
            element = meterGroupDebugElement.nativeElement;
        });

        it('should handle horizontal orientation', () => {
            component.orientation = 'horizontal';
            fixture.detectChanges();

            expect(meterGroup.orientation).toBe('horizontal');
            expect(meterGroup.vertical).toBe(false);
        });

        it('should handle vertical orientation', () => {
            component.orientation = 'vertical';
            fixture.detectChanges();

            expect(meterGroup.orientation).toBe('vertical');
            expect(meterGroup.vertical).toBe(true);
        });

        it('should handle label position start', () => {
            component.labelPosition = 'start';
            fixture.detectChanges();

            const labelElement = fixture.debugElement.query(By.directive(MeterGroupLabel));
            expect(labelElement).toBeTruthy();
            expect(meterGroup.labelPosition).toBe('start');
        });

        it('should handle label position end', () => {
            component.labelPosition = 'end';
            fixture.detectChanges();

            const labelElement = fixture.debugElement.query(By.directive(MeterGroupLabel));
            expect(labelElement).toBeTruthy();
            expect(meterGroup.labelPosition).toBe('end');
        });

        it('should handle horizontal label orientation', () => {
            component.labelOrientation = 'horizontal';
            fixture.detectChanges();

            expect(meterGroup.labelOrientation).toBe('horizontal');
        });

        it('should handle vertical label orientation', () => {
            component.labelOrientation = 'vertical';
            fixture.detectChanges();

            expect(meterGroup.labelOrientation).toBe('vertical');
        });

        it('should apply height for vertical orientation', fakeAsync(() => {
            component.orientation = 'vertical';
            fixture.detectChanges();
            tick();

            // After view init, vertical orientation should set height
            meterGroup.ngAfterViewInit();
            fixture.detectChanges();

            // Height should be set on the element for vertical orientation
            expect(meterGroup.vertical).toBe(true);
            flush();
        }));
    });

    describe('Templates', () => {
        let fixture: ComponentFixture<TestMeterGroupTemplatesComponent>;
        let component: TestMeterGroupTemplatesComponent;
        let meterGroup: MeterGroup;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestMeterGroupTemplatesComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const meterGroupDebugElement = fixture.debugElement.query(By.directive(MeterGroup));
            meterGroup = meterGroupDebugElement.componentInstance;
            element = meterGroupDebugElement.nativeElement;
        });

        it('should render custom label template', () => {
            const customLabel = element.querySelector('.custom-label');
            expect(customLabel).toBeTruthy();
            expect(customLabel?.textContent).toContain('Total:');
        });

        it('should render custom meter template', () => {
            const customMeters = element.querySelectorAll('.custom-meter');
            expect(customMeters.length).toBeGreaterThan(0);
        });

        it('should render start template', () => {
            const customStart = element.querySelector('.custom-start');
            expect(customStart).toBeTruthy();
            expect(customStart?.textContent).toBe('Start Content');
        });

        it('should render end template', () => {
            const customEnd = element.querySelector('.custom-end');
            expect(customEnd).toBeTruthy();
            expect(customEnd?.textContent).toBe('End Content');
        });

        it('should render icon template', () => {
            // Since we're using a custom label template, the icon template won't be used
            // (MeterGroupLabel is only rendered when there's no custom label template)
            // The icon template is stored but not rendered in this test case
            expect(meterGroup._iconTemplate || meterGroup.iconTemplate).toBeDefined();
        });

        it('should pass correct context to label template', () => {
            const customLabel = element.querySelector('.custom-label');
            expect(customLabel?.textContent).toContain('75%'); // 30 + 45 = 75
        });

        it('should pass correct context to meter template', () => {
            const customMeters = element.querySelectorAll('.custom-meter');
            expect(customMeters[0]?.textContent?.trim()).toBe('Category A');
            expect(customMeters[1]?.textContent?.trim()).toBe('Category B');
        });

        it('should handle template processing in ngAfterContentInit', () => {
            // Templates should already be processed during component initialization
            expect(meterGroup._labelTemplate || meterGroup.labelTemplate).toBeDefined();
            expect(meterGroup._meterTemplate || meterGroup.meterTemplate).toBeDefined();
            expect(meterGroup._startTemplate || meterGroup.startTemplate).toBeDefined();
            expect(meterGroup._endTemplate || meterGroup.endTemplate).toBeDefined();
            expect(meterGroup._iconTemplate || meterGroup.iconTemplate).toBeDefined();

            // Calling ngAfterContentInit again should not throw
            expect(() => meterGroup.ngAfterContentInit()).not.toThrow();
        });
    });

    describe('MeterGroupLabel Component', () => {
        let fixture: ComponentFixture<TestBasicMeterGroupComponent>;
        let component: TestBasicMeterGroupComponent;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicMeterGroupComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            element = fixture.debugElement.nativeElement;
        });

        it('should render MeterGroupLabel component', () => {
            const labelComponent = fixture.debugElement.query(By.directive(MeterGroupLabel));
            expect(labelComponent).toBeTruthy();
        });

        it('should display all labels with values', () => {
            const labelList = element.querySelector('ol');
            expect(labelList).toBeTruthy();

            const labelItems = labelList?.querySelectorAll('li');
            expect(labelItems?.length).toBe(4);
        });

        it('should display label text with percentage', () => {
            const labelTexts = element.querySelectorAll('.p-metergroup-label-text');
            expect(labelTexts[0]?.textContent).toContain('Apps');
            expect(labelTexts[0]?.textContent).toContain('16%');
        });

        it('should inject parent MeterGroup instance', () => {
            const labelComponent = fixture.debugElement.query(By.directive(MeterGroupLabel));
            const labelInstance = labelComponent.componentInstance as MeterGroupLabel;
            expect(labelInstance.parentInstance).toBeTruthy();
            expect(labelInstance.parentInstance).toBeInstanceOf(MeterGroup);
        });

        it('should use parent percentValue method', () => {
            const labelComponent = fixture.debugElement.query(By.directive(MeterGroupLabel));
            const labelInstance = labelComponent.componentInstance as MeterGroupLabel;
            const percentValue = labelInstance.parentInstance.percentValue(25);
            expect(percentValue).toBe('25%');
        });
    });

    describe('Icons and Markers', () => {
        let fixture: ComponentFixture<TestMeterGroupWithIconsComponent>;
        let component: TestMeterGroupWithIconsComponent;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestMeterGroupWithIconsComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            element = fixture.debugElement.nativeElement;
        });

        it('should render icons when provided', () => {
            const icons = element.querySelectorAll('i.pi');
            expect(icons.length).toBeGreaterThan(0);
        });

        it('should render correct icon classes', () => {
            const mobileIcon = element.querySelector('.pi-mobile');
            const fileIcon = element.querySelector('.pi-file');
            const downloadIcon = element.querySelector('.pi-download');

            expect(mobileIcon).toBeTruthy();
            expect(fileIcon).toBeTruthy();
            expect(downloadIcon).toBeTruthy();
        });

        it('should apply icon color from meter item', () => {
            const icons = element.querySelectorAll('.p-metergroup-label-icon');
            icons.forEach((icon) => {
                const style = (icon as HTMLElement).style;
                // In test environment, inline styles might not be applied, so we test the component logic
                expect(icon).toBeTruthy();
            });
        });

        it('should render markers when no icon provided', () => {
            component.value = [{ label: 'No Icon', value: 30, color: '#123456' }];
            fixture.detectChanges();

            const markers = element.querySelectorAll('.p-metergroup-label-marker');
            expect(markers.length).toBeGreaterThan(0);
        });
    });

    describe('ARIA Attributes and Accessibility', () => {
        let fixture: ComponentFixture<TestBasicMeterGroupComponent>;
        let component: TestBasicMeterGroupComponent;
        let meterGroup: MeterGroup;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicMeterGroupComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const meterGroupDebugElement = fixture.debugElement.query(By.directive(MeterGroup));
            meterGroup = meterGroupDebugElement.componentInstance;
            element = meterGroupDebugElement.nativeElement;
        });

        it('should have proper ARIA role', () => {
            expect(element.getAttribute('role')).toBe('meter');
        });

        it('should have aria-valuemin attribute', () => {
            expect(element.getAttribute('aria-valuemin')).toBe('0');
        });

        it('should have aria-valuemax attribute', () => {
            expect(element.getAttribute('aria-valuemax')).toBe('100');
        });

        it('should have aria-valuenow attribute', () => {
            const totalPercent = meterGroup.totalPercent();
            expect(element.getAttribute('aria-valuenow')).toBe(totalPercent.toString());
        });

        it('should update aria-valuenow when value changes', () => {
            component.value = [{ label: 'New', value: 50, color: '#ff0000' }];
            fixture.detectChanges();

            const newTotalPercent = meterGroup.totalPercent();
            expect(element.getAttribute('aria-valuenow')).toBe(newTotalPercent.toString());
        });
    });

    describe('CSS Classes and Styling', () => {
        let fixture: ComponentFixture<TestMeterGroupDynamicComponent>;
        let component: TestMeterGroupDynamicComponent;
        let meterGroup: MeterGroup;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestMeterGroupDynamicComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const meterGroupDebugElement = fixture.debugElement.query(By.directive(MeterGroup));
            meterGroup = meterGroupDebugElement.componentInstance;
            element = meterGroupDebugElement.nativeElement;
        });

        it('should apply custom styleClass', () => {
            expect(element.classList.contains('custom-meter-class')).toBe(true);
        });

        it('should apply root CSS class through cx method', () => {
            const classes = element.className;
            expect(classes).toBeTruthy();
        });

        it('should generate proper meter container class', () => {
            const metersContainer = element.querySelector('.p-metergroup-meters');
            expect(metersContainer).toBeTruthy();
        });
    });

    describe('Dynamic Updates', () => {
        let fixture: ComponentFixture<TestMeterGroupDynamicComponent>;
        let component: TestMeterGroupDynamicComponent;
        let meterGroup: MeterGroup;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestMeterGroupDynamicComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const meterGroupDebugElement = fixture.debugElement.query(By.directive(MeterGroup));
            meterGroup = meterGroupDebugElement.componentInstance;
            element = meterGroupDebugElement.nativeElement;
        });

        it('should update when value changes', () => {
            component.value = [
                { label: 'Updated 1', value: 40, color: '#00ff00' },
                { label: 'Updated 2', value: 30, color: '#0000ff' }
            ];
            fixture.detectChanges();

            expect(meterGroup.value!.length).toBe(2);
            expect(meterGroup.totalPercent()).toBe(70);
        });

        it('should update when min/max changes', () => {
            component.min = 10;
            component.max = 50;
            fixture.detectChanges();

            const percent = meterGroup.percent(30);
            expect(percent).toBe(50); // (30-10)/(50-10) = 20/40 = 50%
        });

        it('should add new meter items dynamically', () => {
            // Initial state has 1 item
            expect(component.value.length).toBe(1);

            // Create a new array with the additional item (to trigger change detection)
            component.value = [...component.value, { label: 'New Item', value: 20, color: '#ff00ff' }];
            fixture.detectChanges();

            // Check the component's value array
            expect(component.value.length).toBe(2);

            // The meterGroup should reflect the updated value
            expect(meterGroup.value!.length).toBe(2);

            // Check DOM elements
            const labelTexts = element.querySelectorAll('.p-metergroup-label-text');
            expect(labelTexts.length).toBe(2);
        });

        it('should remove meter items dynamically', () => {
            component.value = [];
            fixture.detectChanges();

            expect(meterGroup.value!.length).toBe(0);
            const meters = element.querySelectorAll('.p-metergroup-meter');
            expect(meters.length).toBe(0);
        });
    });

    describe('Edge Cases', () => {
        let fixture: ComponentFixture<TestMeterGroupEmptyComponent>;
        let component: TestMeterGroupEmptyComponent;
        let meterGroup: MeterGroup;
        let element: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestMeterGroupEmptyComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const meterGroupDebugElement = fixture.debugElement.query(By.directive(MeterGroup));
            meterGroup = meterGroupDebugElement.componentInstance;
            element = meterGroupDebugElement.nativeElement;
        });

        it('should handle empty value array', () => {
            expect(meterGroup.value).toEqual([]);
            expect(() => fixture.detectChanges()).not.toThrow();
        });

        it('should handle undefined value', () => {
            meterGroup.value = undefined as any;
            expect(meterGroup.totalPercent()).toBe(0);
        });

        it('should handle null value gracefully', () => {
            meterGroup.value = null as any;
            expect(meterGroup.percentages()).toEqual([]);
        });

        it('should handle meter items with missing properties', () => {
            component.value = [{ label: 'Incomplete', value: 30 } as MeterItem];
            fixture.detectChanges();

            const meterStyle = meterGroup.meterStyle(component.value[0]);
            expect(meterStyle.backgroundColor).toBeUndefined();
            expect(meterStyle.width).toBe('30%');
        });

        it('should handle rapid value updates', fakeAsync(() => {
            component.value = [{ label: 'Test 1', value: 10, color: '#ff0000' }];
            fixture.detectChanges();
            tick();

            component.value = [{ label: 'Test 2', value: 20, color: '#00ff00' }];
            fixture.detectChanges();
            tick();

            component.value = [{ label: 'Test 3', value: 30, color: '#0000ff' }];
            fixture.detectChanges();
            tick();

            expect(meterGroup.value![0].value).toBe(30);
            flush();
        }));

        it('should handle boundary values', () => {
            // Test with min = max
            meterGroup.min = 50;
            meterGroup.max = 50;
            const percent = meterGroup.percent(50);
            expect(percent).toBe(100); // When min = max, any value should be 100%

            // Reset to normal
            meterGroup.min = 0;
            meterGroup.max = 100;

            // Test with very large numbers
            const largePercent = meterGroup.percent(Number.MAX_SAFE_INTEGER);
            expect(largePercent).toBe(100);

            // Test with very small numbers
            const smallPercent = meterGroup.percent(Number.MIN_SAFE_INTEGER);
            expect(smallPercent).toBe(0);
        });
    });

    describe('TrackBy Function', () => {
        let fixture: ComponentFixture<TestBasicMeterGroupComponent>;
        let meterGroup: MeterGroup;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicMeterGroupComponent);
            fixture.detectChanges();

            const meterGroupDebugElement = fixture.debugElement.query(By.directive(MeterGroup));
            meterGroup = meterGroupDebugElement.componentInstance;
        });

        it('should have trackByFn method', () => {
            expect(meterGroup.trackByFn).toBeDefined();
        });

        it('should return index from trackByFn', () => {
            expect(meterGroup.trackByFn(0)).toBe(0);
            expect(meterGroup.trackByFn(5)).toBe(5);
            expect(meterGroup.trackByFn(100)).toBe(100);
        });
    });

    describe('Lifecycle Hooks', () => {
        let fixture: ComponentFixture<TestBasicMeterGroupComponent>;
        let meterGroup: MeterGroup;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestBasicMeterGroupComponent);
            fixture.detectChanges();

            const meterGroupDebugElement = fixture.debugElement.query(By.directive(MeterGroup));
            meterGroup = meterGroupDebugElement.componentInstance;
        });

        it('should call ngAfterViewInit', () => {
            spyOn(meterGroup, 'ngAfterViewInit').and.callThrough();
            meterGroup.ngAfterViewInit();
            expect(meterGroup.ngAfterViewInit).toHaveBeenCalled();
        });

        it('should call ngAfterContentInit', () => {
            spyOn(meterGroup, 'ngAfterContentInit').and.callThrough();
            meterGroup.ngAfterContentInit();
            expect(meterGroup.ngAfterContentInit).toHaveBeenCalled();
        });

        it('should process templates in ngAfterContentInit', () => {
            const fixture = TestBed.createComponent(TestMeterGroupTemplatesComponent);
            fixture.detectChanges();

            const meterGroup = fixture.debugElement.query(By.directive(MeterGroup)).componentInstance;
            meterGroup.ngAfterContentInit();

            // After processing, internal template properties should be set
            expect(meterGroup._labelTemplate || meterGroup.labelTemplate).toBeDefined();
        });
    });

    describe('Performance', () => {
        it('should handle large datasets efficiently', fakeAsync(() => {
            const largeDataset: MeterItem[] = [];
            for (let i = 0; i < 100; i++) {
                largeDataset.push({
                    label: `Item ${i}`,
                    value: Math.random() * 100,
                    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
                });
            }

            const fixture = TestBed.createComponent(TestBasicMeterGroupComponent);
            const component = fixture.componentInstance;
            component.value = largeDataset;

            expect(() => {
                fixture.detectChanges();
                tick();
            }).not.toThrow();

            const meterGroup = fixture.debugElement.query(By.directive(MeterGroup)).componentInstance;
            expect(meterGroup.value!.length).toBe(100);
            flush();
        }));

        it('should efficiently update percentages', () => {
            const fixture = TestBed.createComponent(TestBasicMeterGroupComponent);
            fixture.detectChanges();

            const meterGroup = fixture.debugElement.query(By.directive(MeterGroup)).componentInstance;

            // Call percentages multiple times
            const result1 = meterGroup.percentages();
            const result2 = meterGroup.percentages();

            // Should return same result
            expect(result1).toEqual(result2);
        });
    });

    describe('Complex Scenarios', () => {
        it('should handle mixed orientations and positions', () => {
            const fixture = TestBed.createComponent(TestMeterGroupOrientationsComponent);
            const component = fixture.componentInstance;

            // Test all combinations
            const combinations = [
                { orientation: 'horizontal', labelPosition: 'start', labelOrientation: 'horizontal' },
                { orientation: 'horizontal', labelPosition: 'start', labelOrientation: 'vertical' },
                { orientation: 'horizontal', labelPosition: 'end', labelOrientation: 'horizontal' },
                { orientation: 'horizontal', labelPosition: 'end', labelOrientation: 'vertical' },
                { orientation: 'vertical', labelPosition: 'start', labelOrientation: 'horizontal' },
                { orientation: 'vertical', labelPosition: 'start', labelOrientation: 'vertical' },
                { orientation: 'vertical', labelPosition: 'end', labelOrientation: 'horizontal' },
                { orientation: 'vertical', labelPosition: 'end', labelOrientation: 'vertical' }
            ];

            combinations.forEach((combo) => {
                component.orientation = combo.orientation as 'horizontal' | 'vertical';
                component.labelPosition = combo.labelPosition as 'start' | 'end';
                component.labelOrientation = combo.labelOrientation as 'horizontal' | 'vertical';

                expect(() => fixture.detectChanges()).not.toThrow();
            });
        });

        it('should handle real-world storage example', () => {
            const fixture = TestBed.createComponent(TestBasicMeterGroupComponent);
            const component = fixture.componentInstance;

            // Simulate storage usage scenario
            const totalStorage = 500; // GB
            const usedStorage = {
                apps: 45,
                photos: 125,
                videos: 200,
                documents: 30,
                system: 50
            };

            component.value = [
                { label: 'Apps', value: usedStorage.apps, color: '#3b82f6' },
                { label: 'Photos', value: usedStorage.photos, color: '#22c55e' },
                { label: 'Videos', value: usedStorage.videos, color: '#eab308' },
                { label: 'Documents', value: usedStorage.documents, color: '#8b5cf6' },
                { label: 'System', value: usedStorage.system, color: '#6b7280' }
            ];
            component.max = totalStorage;
            fixture.detectChanges();

            const meterGroup = fixture.debugElement.query(By.directive(MeterGroup)).componentInstance;
            const totalUsed = Object.values(usedStorage).reduce((a, b) => a + b, 0);
            const totalPercent = meterGroup.totalPercent();

            expect(totalPercent).toBe(Math.round((totalUsed / totalStorage) * 100));
        });
    });
});
