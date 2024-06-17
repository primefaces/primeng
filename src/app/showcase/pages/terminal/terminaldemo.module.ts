import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TerminalDocModule } from '@doc/terminal/terminaldoc.module';
import { TerminalDemo } from './terminaldemo';
import { TerminalDemoRoutingModule } from './terminaldemo-routing.module';

@NgModule({
    imports: [CommonModule, TerminalDemoRoutingModule, TerminalDocModule],
    declarations: [TerminalDemo]
})
export class TerminalDemoModule {}
