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
        const canvasOnClickSpy = spyOn(chart,"onCanvasClick").and.callThrough();
        const canvas = fixture.debugElement.query(By.css("canvas"));
        fixture.detectChanges();

        canvas.nativeElement.click();
        expect(canvasOnClickSpy).toHaveBeenCalled();
    });
});
