import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InstallationComponent } from './installation';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: InstallationComponent }])],
    exports: [RouterModule]
})
export class InstallationRoutingModule {}
