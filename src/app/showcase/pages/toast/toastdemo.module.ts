import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastDocModule } from '../../doc/toast/toastdoc.module';
import { ToastDemo } from './toastdemo';
import { ToastDemoRoutingModule } from './toastdemo-routing.module';

@NgModule({
    imports: [CommonModule, ToastDemoRoutingModule, ToastDocModule],
    declarations: [ToastDemo]
})
export class ToastDemoModule {}
