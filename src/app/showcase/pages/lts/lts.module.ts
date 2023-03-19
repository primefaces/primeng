import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LtsDocModule } from '../../doc/lts/ltsdoc.module';
import { LTSRoutingModule } from './lts-routing.module';
import { LTSComponent } from './lts.component';

@NgModule({
    imports: [CommonModule, LTSRoutingModule, LtsDocModule],
    declarations: [LTSComponent]
})
export class LTSModule {}
