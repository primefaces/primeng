import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Password } from './password';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Password', () => {
  
  let password: Password;
  let fixture: ComponentFixture<Password>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Password
      ]
    });
    
    fixture = TestBed.createComponent(Password);
    password = fixture.componentInstance;
  });
});
