import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { ApiDoc } from './apidoc';
import { BuiltInConstraintsDoc } from './builtinconstraintsdoc';
import { CustomConstraintsDoc } from './customconstraintsdoc';
import { ImportDoc } from './importdoc';
import { TableIntegrationDoc } from './tableintegrationdoc';
import { UsageDoc } from './usagedoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, RouterModule, TableModule],
    exports: [AppDocModule],
    declarations: [ApiDoc, BuiltInConstraintsDoc, CustomConstraintsDoc, ImportDoc, UsageDoc, TableIntegrationDoc]
})
export class FilterServiceDocModule {}
