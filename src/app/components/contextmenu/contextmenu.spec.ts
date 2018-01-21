import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContextMenu, ContextMenuSub } from './contextmenu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

describe('Accordion', () => {
  
  let contextmenu: ContextMenu;
  let fixture: ComponentFixture<ContextMenu>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterModule
      ],
      declarations: [
        ContextMenu,
        ContextMenuSub
      ]
    });
    
    fixture = TestBed.createComponent(ContextMenu);
    contextmenu = fixture.componentInstance;
  });
});
