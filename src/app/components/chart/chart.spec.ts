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
        NoopAnimationsModule
      ],
      declarations: [
        UIChart
      ]
    });
    
    fixture = TestBed.createComponent(UIChart);
    chart = fixture.componentInstance;
  });
});
