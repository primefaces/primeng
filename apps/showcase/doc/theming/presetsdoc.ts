import { Component } from '@angular/core';

@Component({
    selector: 'presets-doc',
    template: `
        <app-docsectiontext>
            <p>
                Aura, Material, Lara and Nora are the available built-in options, created to demonstrate the power of the design-agnostic theming. Aura is PrimeTek's own vision, Material follows Google Material Design v2, Lara is based on Bootstrap
                and Nora is inspired by enterprise applications. Visit the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@layer" target="_blank" rel="noopener noreferrer">source code</a> to learn more about the structure of presets. You
                may use them out of the box with modifications or utilize them as reference in case you need to build your own presets from scratch.
            </p>
        </app-docsectiontext>
    `
    standalone: false
})
export class PresetsDoc {}
