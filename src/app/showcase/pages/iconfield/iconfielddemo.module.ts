import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconFieldDemo } from './iconfielddemo';
import { IconFieldDocModule } from '../../doc/iconfield/iconfielddoc.module';
import { IconFieldDemoRoutingModule } from './iconfielddemo-routing.module';

@NgModule({
    imports: [CommonModule, IconFieldDocModule, IconFieldDemoRoutingModule],
    declarations: [IconFieldDemo]
})
export class IconFieldDemoModule {}
