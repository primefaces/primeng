import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputOtpDemo } from './inputotpdemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: InputOtpDemo }])],
    exports: [RouterModule]
})
export class InputOtpDemoRoutingModule {}
