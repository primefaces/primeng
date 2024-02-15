import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './notfound.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: NotFoundComponent }])],
    exports: [RouterModule]
})
export class NotFoundRoutingModule {}
