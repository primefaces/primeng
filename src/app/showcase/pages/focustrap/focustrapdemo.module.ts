import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FocusTrapDocModule } from '@doc/focustrap/focustrapdoc.module';
import { FocusTrapDemo } from './focustrapdemo';
import { FocusTrapDemoRoutingModule } from './focustrapdemo-routing.module';

@NgModule({
    imports: [CommonModule, FocusTrapDemoRoutingModule, FormsModule, FocusTrapDocModule],
    declarations: [FocusTrapDemo]
})
export class FocusTrapDemoModule {}
