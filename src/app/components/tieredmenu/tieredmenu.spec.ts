import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TieredMenu } from './tieredmenu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TieredMenu', () => {
  
  let tieredmenu: TieredMenu;
  let fixture: ComponentFixture<TieredMenu>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        TieredMenu
      ]
    });
    
    fixture = TestBed.createComponent(TieredMenu);
    tieredmenu = fixture.componentInstance;
  });
});
