import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutoFocusDocModule } from '../../doc/autofocus/autofocusdoc.module';
import { AutoFocusDemoRoutingModule } from './autofocusdemo-routing.module';
import { AutoFocusDemo } from './autofocusdemo';

@NgModule({
    imports: [CommonModule, AutoFocusDemoRoutingModule, AutoFocusDocModule],
    declarations: [AutoFocusDemo]
})
export class AutoFocusDemoModule {}
