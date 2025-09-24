import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'typography-doc',
    standalone: true,
    imports: [CommonModule, AppDocSectionText],
    template: `<app-docsectiontext>
        <p>
            The components are not opinionated about the typography. Important properties such as the font family, font size, and line-height do not have design tokens since they can be inherited from the document. For preview purposes, the
            <i>settings</i> tab displays options to customize the base font and the font family of the document. These values are not available in the generated theme and need to be applied to your application at the document level.
        </p>
        <div class="px-8 pt-8 bg-surface-0 dark:bg-surface-900 rounded-2xl border border-surface" style="max-width: 48rem">
            <img alt="Designer Dashboard" src="https://primefaces.org/cdn/designer/guide-editor.png" class="w-full" />
        </div>
    </app-docsectiontext>`
})
export class TypographyDoc {}
