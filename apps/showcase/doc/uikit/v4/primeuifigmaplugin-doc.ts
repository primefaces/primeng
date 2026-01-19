import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'prime-ui-figma-plugin-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: `<app-docsectiontext>
        <p>
            PrimeUI Theme Generator Figma plugin is the official tool developed by PrimeTek that provides built-in synchronization capabilities to automate the theme code generation process. Visit the
            <a target="_blank" rel="noopener noreferrer" href="https://www.figma.com/community/plugin/1592914021886732603/primeui-theme-generator">plugin website</a> to learn more about this workflow.
        </p>
    </app-docsectiontext>`
})
export class PrimeUIFigmaPluginDoc {}
