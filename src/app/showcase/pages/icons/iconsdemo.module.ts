import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsDocModule } from '../../doc/icons/icons.module';
import { IconsDemoRoutingModule } from './iconsdemo-routing.module';
import { IconsDemoComponent } from './iconsdemo.component';

@NgModule({
    imports: [CommonModule, IconsDemoRoutingModule, IconsDocModule],
    declarations: [IconsDemoComponent]
})
export class IconsDemoModule {}
