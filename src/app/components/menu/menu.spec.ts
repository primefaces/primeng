import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Menu } from './menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Menu', () => {
  
  let menu: Menu;
  let fixture: ComponentFixture<Menu>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Menu
      ]
    });
    
    fixture = TestBed.createComponent(Menu);
    menu = fixture.componentInstance;
  });
});
