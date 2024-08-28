import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContributionRoutingModule } from './contribution-routing.module';
import { ContributionComponent } from './contribution';
import { ContributionDocModule } from '@doc/contribution/contribution.module';

@NgModule({
    imports: [CommonModule, ContributionRoutingModule, ContributionDocModule],
    declarations: [ContributionComponent]
})
export class ContributionModule {}
