import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StyleClassDocModule } from '../../doc/styleclass/styleclassdoc.module';
import { StyleClassDemo } from './styleclassdemo';
import { StyleClassDemoRoutingModule } from './styleclassdemo-routing.module';

@NgModule({
    imports: [CommonModule, StyleClassDemoRoutingModule, StyleClassDocModule],
    declarations: [StyleClassDemo]
})
export class StyleClassDemoModule {}
