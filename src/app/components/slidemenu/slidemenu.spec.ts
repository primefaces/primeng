import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SlideMenu } from './slidemenu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SlideMenu', () => {
  
  let slidemenu: SlideMenu;
  let fixture: ComponentFixture<SlideMenu>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        SlideMenu
      ]
    });
    
    fixture = TestBed.createComponent(SlideMenu);
    slidemenu = fixture.componentInstance;
  });
});
