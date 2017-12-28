import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UIMessage } from './message';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UIMessage', () => {
  
  let message: UIMessage;
  let fixture: ComponentFixture<UIMessage>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        UIMessage
      ]
    });
    
    fixture = TestBed.createComponent(UIMessage);
    message = fixture.componentInstance;
  });
});
