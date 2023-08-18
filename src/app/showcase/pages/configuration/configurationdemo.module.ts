import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigurationDocModule } from '../../doc/configuration/configurationdoc.module';
import { ConfigurationDemoRoutingModule } from './configurationdemo-routing.module';
import { ConfigurationDemoComponent } from './configurationdemo.component';

@NgModule({
    imports: [CommonModule, ConfigurationDemoRoutingModule, ConfigurationDocModule],
    declarations: [ConfigurationDemoComponent]
})
export class ConfigurationDemoModule {}
