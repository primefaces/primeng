import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputSwitch } from './inputswitch';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('InputSwitch', () => {
  
  let inputswitch: InputSwitch;
  let fixture: ComponentFixture<InputSwitch>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        InputSwitch
      ]
    });
    
    fixture = TestBed.createComponent(InputSwitch);
    inputswitch = fixture.componentInstance;
  });
});
