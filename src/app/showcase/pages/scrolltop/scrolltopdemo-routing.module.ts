import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollTopDemo } from './scrolltopdemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ScrollTopDemo }])],
    exports: [RouterModule]
})
export class ScrollTopDemoRoutingModule {}
