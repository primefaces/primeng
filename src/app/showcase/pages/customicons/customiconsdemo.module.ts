import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomIconsDocModule } from '../../doc/customicons/customicons.module';
import { CustomIconsDemoRoutingModule } from './customiconsdemo-routing.module';
import { CustomIconsDemoComponent } from './customiconsdemo.component';

@NgModule({
    imports: [CommonModule, CustomIconsDemoRoutingModule, CustomIconsDocModule],
    declarations: [CustomIconsDemoComponent]
})
export class CustomIconsDemoModule {}
