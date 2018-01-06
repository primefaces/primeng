import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Button } from './button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Button', () => {
  
  let button: Button;
  let fixture: ComponentFixture<Button>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Button
      ]
    });
    
    fixture = TestBed.createComponent(Button);
    button = fixture.componentInstance;
  });
});
