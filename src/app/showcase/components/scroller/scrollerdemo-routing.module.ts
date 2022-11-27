import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollerDemo } from './scrollerdemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ScrollerDemo }])],
    exports: [RouterModule]
})
export class ScrollerDemoRoutingModule {}
