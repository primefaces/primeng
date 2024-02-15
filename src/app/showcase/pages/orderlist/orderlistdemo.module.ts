import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderlistDocModule } from '../../doc/orderlist/orderlistdoc.module';
import { OrderListDemo } from './orderlistdemo';
import { OrderListDemoRoutingModule } from './orderlistdemo-routing.module';

@NgModule({
    imports: [CommonModule, OrderListDemoRoutingModule, OrderlistDocModule],
    declarations: [OrderListDemo]
})
export class OrderListDemoModule {}
