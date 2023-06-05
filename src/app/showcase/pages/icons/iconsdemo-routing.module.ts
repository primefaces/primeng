import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsDemoComponent } from './iconsdemo.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: IconsDemoComponent }])],
    exports: [RouterModule]
})
export class IconsDemoRoutingModule {}
