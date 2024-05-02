import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KeyFilterDocModule } from '@doc/keyfilter/keyfilterdoc.module';
import { KeyFilterDemo } from './keyfilterdemo';
import { KeyFilterDemoRoutingModule } from './keyfilterdemo-routing.module';

@NgModule({
    imports: [CommonModule, KeyFilterDemoRoutingModule, KeyFilterDocModule],
    declarations: [KeyFilterDemo]
})
export class KeyFilterDemoModule {}
