import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorsDemoComponent } from './colors.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ColorsDemoComponent }])],
    exports: [RouterModule]
})
export class ColorsDemoRoutingModule {}
