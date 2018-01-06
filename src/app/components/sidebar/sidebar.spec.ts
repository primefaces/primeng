import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Sidebar } from './sidebar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Sidebar', () => {
  
  let sidebar: Sidebar;
  let fixture: ComponentFixture<Sidebar>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Sidebar
      ]
    });
    
    fixture = TestBed.createComponent(Sidebar);
    sidebar = fixture.componentInstance;
  });
});
