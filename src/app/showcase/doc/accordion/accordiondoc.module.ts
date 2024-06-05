import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';

import { BasicDoc } from './basicdoc';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
    exports: [AppDocModule],
    declarations: [BasicDoc],
    imports: [CommonModule, AppCodeModule, AppDocModule, AccordionModule, ButtonModule, RouterModule, AvatarModule, BadgeModule, FormsModule]
})
export class AccordionDocModule {}
