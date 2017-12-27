import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Menubar } from './menubar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Menubar', () => {
  
  let menubar: Menubar;
  let fixture: ComponentFixture<Menubar>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Menubar
      ]
    });
    
    fixture = TestBed.createComponent(Menubar);
    menubar = fixture.componentInstance;
  });
});
