import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThemingDocModule } from '../../doc/theming/themingdoc.module';
import { ThemingRoutingModule } from './theming-routing.module';
import { ThemingComponent } from './theming.component';

@NgModule({
    imports: [CommonModule, ThemingRoutingModule, ThemingDocModule],
    declarations: [ThemingComponent]
})
export class ThemingModule {}
