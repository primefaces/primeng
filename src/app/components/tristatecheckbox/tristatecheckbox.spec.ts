import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TriStateCheckbox } from './tristatecheckbox';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TriStateCheckbox', () => {
  
  let tristate: TriStateCheckbox;
  let fixture: ComponentFixture<TriStateCheckbox>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        TriStateCheckbox
      ]
    });
    
    fixture = TestBed.createComponent(TriStateCheckbox);
    tristate = fixture.componentInstance;
  });
});
