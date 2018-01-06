import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MegaMenu } from './megamenu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MegaMenu', () => {
  
  let megamenu: MegaMenu;
  let fixture: ComponentFixture<MegaMenu>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        MegaMenu
      ]
    });
    
    fixture = TestBed.createComponent(MegaMenu);
    megamenu = fixture.componentInstance;
  });
});
