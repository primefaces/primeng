import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FieldsetDocModule } from '../../doc/fieldset/fieldsetdoc.module';
import { FieldsetDemo } from './fieldsetdemo';
import { FieldsetDemoRoutingModule } from './fieldsetdemo-routing.module';

@NgModule({
    imports: [CommonModule, FieldsetDemoRoutingModule, FieldsetDocModule],
    declarations: [FieldsetDemo]
})
export class FieldsetDemoModule {}
