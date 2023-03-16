import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MegaMenuDocModule } from '../../doc/megamenu/megamenudoc.module';
import { MegaMenuDemo } from './megamenudemo';
import { MegaMenuDemoRoutingModule } from './megamenudemo-routing.module';

@NgModule({
    imports: [CommonModule, MegaMenuDemoRoutingModule, MegaMenuDocModule],
    declarations: [MegaMenuDemo]
})
export class MegaMenuDemoModule {}
