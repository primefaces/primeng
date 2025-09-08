import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';

@Component({
    selector: 'base-doc',
    standalone: true,
    imports: [CommonModule, AppCodeModule, AppDocModule],
    template: `<app-docsectiontext>
        <p>
            In the new theme section, all of the built-in themes are available to use as the base. These are; <i>Aura</i>, <i>Material</i>, <i>Lara</i> and <i>Nora</i>. Each have their own characteristics, and it is recommended to choose the one that
            best suits your requirements.
        </p>
    </app-docsectiontext>`
})
export class BaseDoc {}
