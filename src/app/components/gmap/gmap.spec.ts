import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GMap } from './gmap';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('GMap', () => {
  
  let gmap: GMap;
  let fixture: ComponentFixture<GMap>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        GMap
      ]
    });
    
    fixture = TestBed.createComponent(GMap);
    gmap = fixture.componentInstance;
  });
});
