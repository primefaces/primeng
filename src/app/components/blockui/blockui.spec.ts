import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BlockUI } from './blockui';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BlockUI', () => {
  
  let blockui: BlockUI;
  let fixture: ComponentFixture<BlockUI>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        BlockUI
      ]
    });
    
    fixture = TestBed.createComponent(BlockUI);
    blockui = fixture.componentInstance;
  });
});
