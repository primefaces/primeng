import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SplitButton } from './splitbutton';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SplitButton', () => {
  
  let splitbutton: SplitButton;
  let fixture: ComponentFixture<SplitButton>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        SplitButton
      ]
    });
    
    fixture = TestBed.createComponent(SplitButton);
    splitbutton = fixture.componentInstance;
  });
});
