import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputTextarea } from './inputtextarea';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('InputTextarea', () => {
  
  let inputtextarea: InputTextarea;
  let fixture: ComponentFixture<InputTextarea>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        InputTextarea
      ]
    });
    
    fixture = TestBed.createComponent(InputTextarea);
    inputtextarea = fixture.componentInstance;
  });
});
