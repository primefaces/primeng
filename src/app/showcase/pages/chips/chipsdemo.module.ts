import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChipsModule } from '@alamote/primeng/chips';
import { ChipsDocModule } from '../../doc/chips/chipsdoc.module';
import { ChipsDemo } from './chipsdemo';
import { ChipsDemoRoutingModule } from './chipsdemo-routing.module';

@NgModule({
    imports: [CommonModule, ChipsDemoRoutingModule, ChipsModule, ChipsDocModule],
    declarations: [ChipsDemo]
})
export class ChipsDemoModule {}
