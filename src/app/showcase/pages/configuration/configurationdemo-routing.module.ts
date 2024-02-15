import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigurationDemoComponent } from './configurationdemo.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ConfigurationDemoComponent }])],
    exports: [RouterModule]
})
export class ConfigurationDemoRoutingModule {}
