import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UIKitComponent } from './uikit.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: UIKitComponent }])],
    exports: [RouterModule]
})
export class UIKitRoutingModule {}
