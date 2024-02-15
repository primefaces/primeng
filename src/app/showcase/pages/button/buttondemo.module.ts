import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonDocModule } from '../../doc/button/buttondoc.module';
import { ButtonDemo } from './buttondemo';
import { ButtonDemoRoutingModule } from './buttondemo-routing.module';

@NgModule({
    imports: [CommonModule, ButtonDemoRoutingModule, ButtonDocModule],
    declarations: [ButtonDemo]
})
export class ButtonDemoModule {}
