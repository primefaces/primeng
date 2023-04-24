import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SlideMenuDocModule } from '../../doc/slidemenu/slidemenudoc.module';
import { SlideMenuDemo } from './slidemenudemo';
import { SlideMenuDemoRoutingModule } from './slidemenudemo-routing.module';

@NgModule({
    imports: [CommonModule, SlideMenuDemoRoutingModule, SlideMenuDocModule],
    declarations: [SlideMenuDemo]
})
export class SlideMenuDemoModule {}
