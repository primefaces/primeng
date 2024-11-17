import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
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
