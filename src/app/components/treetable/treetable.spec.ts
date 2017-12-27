import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TreeTable } from './treetable';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TreeTable', () => {
  
  let treetable: TreeTable;
  let fixture: ComponentFixture<TreeTable>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        TreeTable
      ]
    });
    
    fixture = TestBed.createComponent(TreeTable);
    treetable = fixture.componentInstance;
  });
});
