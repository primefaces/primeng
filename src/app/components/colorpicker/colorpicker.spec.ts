import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ColorPicker } from './colorpicker';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ColorPicker', () => {
  
  let colorpicker: ColorPicker;
  let fixture: ComponentFixture<ColorPicker>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        ColorPicker
      ]
    });
    
    fixture = TestBed.createComponent(ColorPicker);
    colorpicker = fixture.componentInstance;
  });
});
