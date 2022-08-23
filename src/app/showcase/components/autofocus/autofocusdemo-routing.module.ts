import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoFocusDemo } from './autofocusdemo.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: AutoFocusDemo }
    ])],
    exports: [RouterModule]
})
export class AutoFocusDemoRoutingModule { }
