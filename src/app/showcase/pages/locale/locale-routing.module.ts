import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocaleComponent } from './locale.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: LocaleComponent }])],
    exports: [RouterModule]
})
export class LocaleRoutingModule {}
