import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Tree } from './tree';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Tree', () => {
  
  let tree: Tree;
  let fixture: ComponentFixture<Tree>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        Tree
      ]
    });
    
    fixture = TestBed.createComponent(Tree);
    tree = fixture.componentInstance;
  });
});
