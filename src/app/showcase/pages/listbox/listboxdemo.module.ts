import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListboxDocModule } from '../../doc/listbox/listboxdoc.module';
import { ListboxDemo } from './listboxdemo';
import { ListboxDemoRoutingModule } from './listboxdemo-routing.module';

@NgModule({
    imports: [CommonModule, ListboxDemoRoutingModule, ListboxDocModule],
    declarations: [ListboxDemo]
})
export class ListboxDemoModule {}
