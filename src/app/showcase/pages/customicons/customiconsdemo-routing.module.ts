import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomIconsDemoComponent } from './customiconsdemo.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: CustomIconsDemoComponent }])],
    exports: [RouterModule]
})
export class CustomIconsDemoRoutingModule {}
