import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RippleDocModule } from '@doc/ripple/rippledoc.module';
import { RippleDemo } from './rippledemo';
import { RippleDemoRoutingModule } from './rippledemo-routing.module';

@NgModule({
    imports: [CommonModule, RippleDemoRoutingModule, RippleDocModule],
    declarations: [RippleDemo]
})
export class RippleDemoModule {}
