import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EditorDocModule } from '@doc/editor/editordoc.module';
import { EditorDemo } from './editordemo';
import { EditorDemoRoutingModule } from './editordemo-routing.module';

@NgModule({
    imports: [CommonModule, EditorDemoRoutingModule, EditorDocModule],
    declarations: [EditorDemo]
})
export class EditorDemoModule {}
