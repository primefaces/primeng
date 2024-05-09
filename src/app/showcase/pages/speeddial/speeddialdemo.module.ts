import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpeedDialDocModule } from '@doc/speeddial/speeddialdoc.module';
import { SpeedDialDemo } from './speeddialdemo';
import { SpeedDialDemoRoutingModule } from './speeddialdemo-routing.module';

@NgModule({
    imports: [CommonModule, SpeedDialDemoRoutingModule, SpeedDialDocModule],
    declarations: [SpeedDialDemo]
})
export class SpeedDialDemoModule {}
