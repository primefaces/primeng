import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlockUIDocModule } from '@doc/blockui/blockuidoc.module';
import { BlockUIDemo } from './blockuidemo';
import { BlockUIDemoRoutingModule } from './blockuidemo-routing.module';

@NgModule({
    imports: [CommonModule, BlockUIDemoRoutingModule, BlockUIDocModule],
    declarations: [BlockUIDemo]
})
export class BlockUIDemoModule {}
