import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TabMenu } from './tabmenu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TabMenu', () => {
  
  let tabmenu: TabMenu;
  let fixture: ComponentFixture<TabMenu>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        TabMenu
      ]
    });
    
    fixture = TestBed.createComponent(TabMenu);
    tabmenu = fixture.componentInstance;
  });
});
