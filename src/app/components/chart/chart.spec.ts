import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UIChart } from './chart';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UIChart', () => {

    let chart: UIChart;
    let fixture: ComponentFixture<UIChart>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
            ],
            declarations: [
                UIChart
            ]
        });

        fixture = TestBed.createComponent(UIChart);
        chart = fixture.componentInstance;
    });

    it('should created', () => {
        const testData = {
            datasets: [{
                data: [
                    11,
                    16,
                    7,
                    3,
                    14
                ],
                backgroundColor: [
                    "#42A5F5",
                    "#66BB6A",
                    "#FFA726",
                    "#26C6DA",
                    "#7E57C2"
                ],
                label: 'My dataset'
            }],
            labels: [
                "Red",
                "Green",
                "Yellow",
                "Grey",
                "Blue"
            ]
        };

        chart.data = testData;
        const chartType = "polarArea";
        chart.type = chartType;
        const testPlugin = { id: 'test-plugin' };
        chart.plugins = [testPlugin];
        const testOptions = { test: '123' };
        chart.options = {...testOptions};
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css("canvas"))).toBeTruthy();

        expect(chart.chart.config.type).toEqual(chartType);
        expect(chart.chart.data).toEqual(testData);
        expect(chart.chart.config.plugins).toContain(testPlugin);
    });


    it('should call onCanvasClick', () => {
        chart.data = {
            datasets: [{
                data: [
                    11,
                    16,
                    7,
                    3,
                    14
                ],
                backgroundColor: [
                    "#42A5F5",
                    "#66BB6A",
                    "#FFA726",
                    "#26C6DA",
                    "#7E57C2"
                ],
                label: 'My dataset'
            }],
            labels: [
                "Red",
                "Green",
                "Yellow",
                "Grey",
                "Blue"
            ]
        };
        chart.height = '200px';
        chart.width = '200px';
        chart.type = "polarArea";
        const canvasOnClickSpy = spyOn(chart, "onCanvasClick").and.callThrough();
        const canvas = fixture.debugElement.query(By.css("canvas"));
        fixture.detectChanges();

        canvas.nativeElement.click();
        expect(canvasOnClickSpy).toHaveBeenCalled();
    });
});
