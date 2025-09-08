import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'limitations-doc',
    standalone: true,
    imports: [CommonModule, AppCodeModule, AppDocModule, RouterModule],
    template: `<app-docsectiontext>
        <p>Current known technical limitations are listed at this section.</p>
        <ul class="leading-relaxed list-inside list-disc">
            <li>The border width token in Figma does not support multiple values, related <a href="https://github.com/tokens-studio/figma-plugin/issues/3237" target="_blank" rel="noopener noreferrer" class="doc-link">issue</a>.</li>
        </ul>
    </app-docsectiontext>`
})
export class LimitationsDoc {}
