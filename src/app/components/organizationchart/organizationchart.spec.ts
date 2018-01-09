import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OrganizationChart } from './organizationchart';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('OrganizationChart', () => {
  
  let organizationchart: OrganizationChart;
  let fixture: ComponentFixture<OrganizationChart>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        OrganizationChart
      ]
    });
    
    fixture = TestBed.createComponent(OrganizationChart);
    organizationchart = fixture.componentInstance;
  });
});
