import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardDocModule } from '@doc/card/carddoc.module';
import { CardDemo } from './carddemo';
import { CardDemoRoutingModule } from './carddemo-routing.module';

@NgModule({
    imports: [CommonModule, CardDemoRoutingModule, CardDocModule],
    declarations: [CardDemo]
})
export class CardDemoModule {}
