import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PartnersRoutingModule } from './partners-routing.module';
import { PartnersComponent } from './partners.component';

@NgModule({
    declarations: [PartnersComponent],
    imports: [CommonModule, PartnersRoutingModule]
})
export class PartnersModule {}
