import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OrderList } from './orderlist';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('OrderList', () => {
  
  let orderlist: OrderList;
  let fixture: ComponentFixture<OrderList>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        OrderList
      ]
    });
    
    fixture = TestBed.createComponent(OrderList);
    orderlist = fixture.componentInstance;
  });
});
