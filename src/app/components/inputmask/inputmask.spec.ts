import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputMask } from './inputmask';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('InputMask', () => {
  
  let inputmask: InputMask;
  let fixture: ComponentFixture<InputMask>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        InputMask
      ]
    });
    
    fixture = TestBed.createComponent(InputMask);
    inputmask = fixture.componentInstance;
  });
});
