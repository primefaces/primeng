import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputText } from './inputtext';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('InputText', () => {
  
  let inputtext: InputText;
  let fixture: ComponentFixture<InputText>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        InputText
      ]
    });
    
    fixture = TestBed.createComponent(InputText);
    inputtext = fixture.componentInstance;
  });
});
