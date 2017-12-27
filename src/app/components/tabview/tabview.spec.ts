import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TabView } from './tabview';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TabView', () => {
  
  let tabview: TabView;
  let fixture: ComponentFixture<TabView>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        TabView
      ]
    });
    
    fixture = TestBed.createComponent(TabView);
    tabview = fixture.componentInstance;
  });
});
