import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CascadeSelectDocModule } from '@doc/cascadeselect/cascasdeselectdoc.module';
import { CascadeSelectDemo } from './cascadeselectdemo';
import { CascadeSelectDemoRoutingModule } from './cascadeselectdemo-routing.module';

@NgModule({
    imports: [CommonModule, CascadeSelectDemoRoutingModule, CascadeSelectDocModule],
    declarations: [CascadeSelectDemo]
})
export class CascadeSelectDemoModule {}
