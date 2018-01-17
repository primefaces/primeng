import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FileUpload } from './fileupload';
import {ButtonModule} from '../button/button';
import {MessagesModule} from '../messages/messages';
import {ProgressBarModule} from '../progressbar/progressbar';
import {SharedModule} from '../common/shared';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FileUpload', () => {
  
  let fileupload: FileUpload;
  let fixture: ComponentFixture<FileUpload>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule,
        ButtonModule,
        ProgressBarModule,
        MessagesModule
      ],
      declarations: [
        FileUpload
      ]
    });
    
    fixture = TestBed.createComponent(FileUpload);
    fileupload = fixture.componentInstance;
  });it('', () => {});
});
