import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Draggable } from './dragdrop';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Draggable', () => {
  
  let draggable: Draggable;
  let fixture: ComponentFixture<Draggable>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Draggable
      ]
    });
    
    fixture = TestBed.createComponent(Draggable);
    draggable = fixture.componentInstance;
  });
});
