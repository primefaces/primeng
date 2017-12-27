import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AutoComplete } from './autocomplete';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AutoComplete', () => {
  
  let autocomplete: AutoComplete;
  let fixture: ComponentFixture<AutoComplete>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        AutoComplete
      ]
    });
    
    fixture = TestBed.createComponent(AutoComplete);
    autocomplete = fixture.componentInstance;
  });
});
