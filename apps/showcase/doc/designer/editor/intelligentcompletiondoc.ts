import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';

@Component({
    selector: 'intelligent-completion-doc',
    standalone: true,
    imports: [CommonModule, AppCodeModule, AppDocModule],
    template: `<app-docsectiontext>
        <p>
            The editor is packed with features for improved user experience. The input fields in the editor are capable of displaying a color preview when the value is a color, and beginning the value with a curly brace opens up the autocompletion
            feature to list the available tokens to choose from. The <i>pi-sort-alt</i> symbol over the input, transfers the token between the common tokens and color scheme specific tokens so that you are able to define tokens based on light and
            dark mode as well.
        </p>
    </app-docsectiontext>`
})
export class IntelligentCompletionDoc {}
