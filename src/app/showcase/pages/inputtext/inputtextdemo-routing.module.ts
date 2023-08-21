import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputTextDemo } from './inputtextdemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: InputTextDemo, data: { doc: true } }])],
    exports: [RouterModule]
})
export class InputTextDemoRoutingModule {}
