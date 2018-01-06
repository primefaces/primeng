import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Listbox } from './listbox';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Listbox', () => {
  
  let listbox: Listbox;
  let fixture: ComponentFixture<Listbox>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Listbox
      ]
    });
    
    fixture = TestBed.createComponent(Listbox);
    listbox = fixture.componentInstance;
  });
});
