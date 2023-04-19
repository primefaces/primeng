import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToolbarDocModule } from '../../doc/toolbar/toolbardoc.module';
import { ToolbarDemo } from './toolbardemo';
import { ToolbarDemoRoutingModule } from './toolbardemo-routing.module';

@NgModule({
    imports: [CommonModule, ToolbarDemoRoutingModule, ToolbarDocModule],
    declarations: [ToolbarDemo]
})
export class ToolbarDemoModule {}
