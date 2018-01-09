import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Editor } from './editor';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Editor', () => {
  
  let editor: Editor;
  let fixture: ComponentFixture<Editor>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Editor
      ]
    });
    
    fixture = TestBed.createComponent(Editor);
    editor = fixture.componentInstance;
  });
});
