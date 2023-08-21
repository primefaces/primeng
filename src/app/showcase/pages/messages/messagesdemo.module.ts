import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessagesDocModule } from '../../doc/messages/messagesdoc.module';
import { MessagesDemo } from './messagesdemo';
import { MessagesDemoRoutingModule } from './messagesdemo-routing.module';

@NgModule({
    imports: [CommonModule, MessagesDemoRoutingModule, MessagesDocModule],
    declarations: [MessagesDemo]
})
export class MessagesDemoModule {}
