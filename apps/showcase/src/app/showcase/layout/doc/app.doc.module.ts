import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { AppCodeModule } from './app.code.component';
import { AppDocApiSection } from './app.docapisection.component';
import { AppDocSectionsComponent } from './app.docsection.component';
import { AppDocSectionNavComponent } from './app.docsection-nav.component';
import { AppDocSectionTextComponent } from './app.docsectiontext.component';
import { AppDevelopmentSection } from './app.developmentsection.component';
import { AppDocApiTable } from './app.docapitable.component';
import { AppDoc } from './app.doc.component';
import { RouterModule } from '@angular/router';
import { AppDocThemingSectionComponent } from './app.docthemingsection.component';
import { AppDocFeaturesSection } from './app.docfeaturessection.component';
import { AppDocService } from './app.doc.service';

@NgModule({
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, TooltipModule, AppCodeModule, RouterModule],
    exports: [AppDocSectionTextComponent, AppDocApiSection, AppDocFeaturesSection, AppDocSectionNavComponent, AppDocSectionsComponent, AppDevelopmentSection, AppDoc, AppDocApiTable, AppDocThemingSectionComponent],
    declarations: [AppDocFeaturesSection, AppDocSectionTextComponent, AppDocApiSection, AppDocSectionNavComponent, AppDocSectionsComponent, AppDevelopmentSection, AppDoc, AppDocApiTable, AppDocThemingSectionComponent],
    providers: [AppDocService]
})
export class AppDocModule {}
