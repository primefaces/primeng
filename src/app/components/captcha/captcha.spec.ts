import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Captcha } from './captcha';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Captcha', () => {
  
  let captcha: Captcha;
  let fixture: ComponentFixture<Captcha>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Captcha
      ]
    });
    
    fixture = TestBed.createComponent(Captcha);
    captcha = fixture.componentInstance;
  });
});
