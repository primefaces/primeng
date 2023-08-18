import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutoCompleteDocModule } from '../../doc/autocomplete/autocompletedoc.module';

import { AutoCompleteDemo } from './autocompletedemo';
import { AutoCompleteDemoRoutingModule } from './autocompletedemo-routing.module';

@NgModule({
    imports: [CommonModule, AutoCompleteDemoRoutingModule, AutoCompleteDocModule],
    declarations: [AutoCompleteDemo]
})
export class AutoCompleteDemoModule {}
