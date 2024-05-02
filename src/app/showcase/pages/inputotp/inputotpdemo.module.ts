import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputOtpDemo } from './inputotpdemo';
import { InputOtpDemoRoutingModule } from './inputotpdemo-routing.module';
import { InputOtpDocModule } from '@doc/inputotp/inputotpdoc.module';

@NgModule({
    imports: [CommonModule, InputOtpDemoRoutingModule, InputOtpDocModule],
    declarations: [InputOtpDemo]
})
export class InputOtpDemoModule {}
