import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidebarDocModule } from '../../doc/sidebar/sidebardoc.module';
import { SidebarDemo } from './sidebardemo';
import { SidebarDemoRoutingModule } from './sidebardemo-routing.module';

@NgModule({
    imports: [CommonModule, SidebarDemoRoutingModule, SidebarDocModule],
    declarations: [SidebarDemo]
})
export class SidebarDemoModule {}
