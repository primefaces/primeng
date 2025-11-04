import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'figma-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                PrimeIcons library is now available on
                <a href="https://www.figma.com/community/file/1354343849355792252/primeicons" target="_blank" rel="noopener noreferrer">Figma Community</a>. By adding them as a library, you can easily use these icons in your designs.
            </p>
        </app-docsectiontext>
    `
})
export class FigmaDoc {}
