import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PartnersComponent } from './partners.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: PartnersComponent }])],
    exports: [RouterModule]
})
export class PartnersRoutingModule {}
