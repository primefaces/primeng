import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputtextareaDocModule } from '../../doc/inputtextarea/inputtextareadoc.module';
import { InputTextareaDemo } from './inputtextareademo';
import { InputTextareaDemoRoutingModule } from './inputtextareademo-routing.module';

@NgModule({
    imports: [CommonModule, InputTextareaDemoRoutingModule, InputtextareaDocModule],
    declarations: [InputTextareaDemo]
})
export class InputTextareaDemoModule {}
