import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';

@Component({
    selector: 'voltui-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                Tailwind CSS is perfect fit for the unstyled mode, PrimeTek has even initiated a new UI library called <a href="https://volt.primevue.org" target="_blank" rel="noopener noreferrer">Volt UI</a> based on the unstyled PrimeVue and
                Tailwind CSS v4. Volt follows the code ownership model where the components are located in the application codebase rather than node_modules. All components within Volt are essentially wrapped versions of the unstyled equivalents,
                with an added layer of theming through Tailwind CSS v4. This approach, along with the templating features, offers complete control over the theming and presentation.
            </p>
            <p>
                Volt will also be available for PrimeReact. In the future, PrimeTek may bring Volt to Angular via PrimeNG if there is significant community demand. Currently, Volt-Vue can serve as a reference when styling your unstyled PrimeNG
                components with Tailwind CSS.
            </p>
        </app-docsectiontext>
    `
})
export class VoltUIDoc {}
