import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Messages } from './messages';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Messages', () => {
  
  let messages: Messages;
  let fixture: ComponentFixture<Messages>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Messages
      ]
    });
    
    fixture = TestBed.createComponent(Messages);
    messages = fixture.componentInstance;
  });
});
