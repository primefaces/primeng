import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Terminal } from './terminal';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Terminal', () => {
  
  let terminal: Terminal;
  let fixture: ComponentFixture<Terminal>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Terminal
      ]
    });
    
    fixture = TestBed.createComponent(Terminal);
    terminal = fixture.componentInstance;
  });
});
