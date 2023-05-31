import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { AppCodeModule } from './code/app.code.component';
import { AppDocApiSection } from './docapisection/app.docapisection.component';
import { AppDocSectionsComponent } from './docsection/app.docsection.component';
import { AppDocSectionNavComponent } from './docsectionnav/app.docsection-nav.component';
import { AppDocSectionTextComponent } from './docsectiontext/app.docsectiontext.component';
import { AppDevelopmentSection } from './developmentsection/app.developmentsection.component';
import { AppDocApiTable } from './docapitable/app.docapitable.component';
import { AppDoc } from './app.doc.component';

@NgModule({
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, TooltipModule, AppCodeModule],
    exports: [AppDocSectionTextComponent, AppDocApiSection, AppDocSectionNavComponent, AppDocSectionsComponent, AppDevelopmentSection, AppDoc, AppDocApiTable],
    declarations: [AppDocSectionTextComponent, AppDocApiSection, AppDocSectionNavComponent, AppDocSectionsComponent, AppDevelopmentSection, AppDoc, AppDocApiTable]
})
export class AppDocModule {}
