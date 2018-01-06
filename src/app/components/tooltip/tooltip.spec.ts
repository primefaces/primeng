import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Tooltip } from './tooltip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Tooltip', () => {
  
  let tooltip: Tooltip;
  let fixture: ComponentFixture<Tooltip>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Tooltip
      ]
    });
    
    fixture = TestBed.createComponent(Tooltip);
    tooltip = fixture.componentInstance;
  });
});
