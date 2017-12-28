import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CodeHighlighter } from './codehighlighter';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CodeHighlighter', () => {
  
  let codehighlighter: CodeHighlighter;
  let fixture: ComponentFixture<CodeHighlighter>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        CodeHighlighter
      ]
    });
    
    fixture = TestBed.createComponent(CodeHighlighter);
    codehighlighter = fixture.componentInstance;
  });
});
