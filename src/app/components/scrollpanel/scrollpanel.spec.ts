import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ScrollPanel } from './scrollpanel';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ScrollPanel', () => {
  
  let scrollpanel: ScrollPanel;
  let fixture: ComponentFixture<ScrollPanel>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        ScrollPanel
      ]
    });
    
    fixture = TestBed.createComponent(ScrollPanel);
    scrollpanel = fixture.componentInstance;
  });
});
