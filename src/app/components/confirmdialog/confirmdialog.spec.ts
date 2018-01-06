import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ConfirmDialog } from './confirmdialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ConfirmDialog', () => {
  
  let confirmdialog: ConfirmDialog;
  let fixture: ComponentFixture<ConfirmDialog>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        ConfirmDialog
      ]
    });
    
    fixture = TestBed.createComponent(ConfirmDialog);
    confirmdialog = fixture.componentInstance;
  });
});
