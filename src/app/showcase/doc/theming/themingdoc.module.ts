import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { ArchitectureDoc } from './architecturedoc';
import { CSSVariablesDoc } from './cssvariablesdoc';
import { DesignerDoc } from './designerdoc';
import { LocalStylingDoc } from './localstylingdoc';
import { PrimeFlexDoc } from './primeflexdoc';
import { ScalingDoc } from './scalingdoc';
import { ThemesDoc } from './themesdoc';
import { UtilsDoc } from './utilsdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, ButtonModule],
    declarations: [ArchitectureDoc, CSSVariablesDoc, DesignerDoc, LocalStylingDoc, PrimeFlexDoc, ScalingDoc, ThemesDoc, UtilsDoc],
    exports: [AppDocModule]
})
export class ThemingDocModule {}
