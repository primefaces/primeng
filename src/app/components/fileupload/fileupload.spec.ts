import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FileUpload } from './fileupload';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FileUpload', () => {
  
  let fileupload: FileUpload;
  let fixture: ComponentFixture<FileUpload>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        FileUpload
      ]
    });
    
    fixture = TestBed.createComponent(FileUpload);
    fileupload = fixture.componentInstance;
  });
});
