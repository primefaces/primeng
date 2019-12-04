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
                    "#FF6384",
                    "#4BC0C0",
                    "#FFCE56",
                    "#E7E9ED",
                    "#36A2EB"
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
        chart.type = "polarArea";
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css("canvas"))).toBeTruthy();
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
                    "#FF6384",
                    "#4BC0C0",
                    "#FFCE56",
                    "#E7E9ED",
                    "#36A2EB"
                ],
                label: 'My dataset'
            }],
            labels: [
                "Red",
                "Green",
                "Yellow",
                "Grey",
                "Blue"
            ],
            responsive:true
        };
        chart.height = '200px';
        chart.width = '200px';
        chart.type = "polarArea";
        const canvasOnClickSpy = spyOn(chart,"onCanvasClick").and.callThrough();
        const canvas = fixture.debugElement.query(By.css("canvas"));
        fixture.detectChanges();

        canvas.nativeElement.click();
        expect(canvasOnClickSpy).toHaveBeenCalled();
    });

    it('should refresh chart', () => {
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
                    "#FF6384",
                    "#4BC0C0",
                    "#FFCE56",
                    "#E7E9ED",
                    "#36A2EB"
                ],
                label: 'My dataset'
            }],
            labels: [
                "Red",
                "Green",
                "Yellow",
                "Grey",
                "Blue"
            ],
        };
        chart.type = "polarArea";
        fixture.detectChanges();
        const updateSpy = spyOn(chart.chart,"update").and.callThrough();

        chart.refresh();
        expect(updateSpy).toHaveBeenCalled();
    });

    it('should reinit chart', () => {
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
                    "#FF6384",
                    "#4BC0C0",
                    "#FFCE56",
                    "#E7E9ED",
                    "#36A2EB"
                ],
                label: 'My dataset'
            }],
            labels: [
                "Red",
                "Green",
                "Yellow",
                "Grey",
                "Blue"
            ],
        };
        chart.type = "polarArea";
        fixture.detectChanges();
        const destroySpy = spyOn(chart.chart,"destroy").and.callThrough();
        const initChartSpy = spyOn(chart,"initChart").and.callThrough();

        chart.reinit();
        expect(destroySpy).toHaveBeenCalled();
        expect(initChartSpy).toHaveBeenCalled();
    });

    it('should get canvas, image and generateLegend', () => {
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
                    "#FF6384",
                    "#4BC0C0",
                    "#FFCE56",
                    "#E7E9ED",
                    "#36A2EB"
                ],
                label: 'My dataset'
            }],
            labels: [
                "Red",
                "Green",
                "Yellow",
                "Grey",
                "Blue"
            ],
        };
        chart.type = "polarArea";
        fixture.detectChanges();

        const legend = chart.generateLegend();
        const image = chart.getBase64Image();
        const canvas = chart.getCanvas();

        expect(canvas.tagName).toEqual("CANVAS");
        expect(image).toContain("data");
        expect(legend).toContain("legend");
    });
});
