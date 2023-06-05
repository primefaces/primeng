import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InstallationRoutingModule } from './installation-routing.module';
import { InstallationComponent } from './installation';
import { InstallationDocModule } from '../../doc/installation/installationdoc.module';

@NgModule({
    imports: [CommonModule, InstallationRoutingModule, InstallationDocModule],
    declarations: [InstallationComponent]
})
export class InstallationModule {}
