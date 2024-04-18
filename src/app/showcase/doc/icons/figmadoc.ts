import { Component } from '@angular/core';

@Component({
    selector: 'figma-doc',
    template: `
        <app-docsectiontext>
            <p>
                PrimeIcons library is now available on <a href="https://www.figma.com/community/file/1354343849355792252/primeicons" target="_blank" rel="noopener noreferrer">Figma Community</a>. By adding them as a library, you can easily use these
                icons in your designs.
            </p>
        </app-docsectiontext>
    `
})
export class FigmaDoc {}
