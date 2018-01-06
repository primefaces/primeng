import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContextMenu } from './contextmenu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Accordion', () => {
  
  let contextmenu: ContextMenu;
  let fixture: ComponentFixture<ContextMenu>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        ContextMenu
      ]
    });
    
    fixture = TestBed.createComponent(ContextMenu);
    contextmenu = fixture.componentInstance;
  });
});
