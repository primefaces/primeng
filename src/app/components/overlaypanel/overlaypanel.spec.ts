import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OverlayPanel } from './overlaypanel';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('OverlayPanel', () => {
  
  let overlaypanel: OverlayPanel;
  let fixture: ComponentFixture<OverlayPanel>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        OverlayPanel
      ]
    });
    
    fixture = TestBed.createComponent(OverlayPanel);
    overlaypanel = fixture.componentInstance;
  });
});
