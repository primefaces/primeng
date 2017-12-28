import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PanelMenu } from './panelmenu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PanelMenu', () => {
  
  let panelmenu: PanelMenu;
  let fixture: ComponentFixture<PanelMenu>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        PanelMenu
      ]
    });
    
    fixture = TestBed.createComponent(PanelMenu);
    panelmenu = fixture.componentInstance;
  });
});
