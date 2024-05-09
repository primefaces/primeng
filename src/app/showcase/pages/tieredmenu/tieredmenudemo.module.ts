import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TieredMenuDocModule } from '@doc/tieredmenu/tieredmenudoc.module';
import { TieredMenuDemo } from './tieredmenudemo';
import { TieredMenuDemoRoutingModule } from './tieredmenudemo-routing.module';

@NgModule({
    imports: [CommonModule, TieredMenuDemoRoutingModule, TieredMenuDocModule],
    declarations: [TieredMenuDemo]
})
export class TieredMenuDemoModule {}
