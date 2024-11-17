import { Component } from '@angular/core';

@Component({
    selector: 'migration-overview-doc',
    template: `
        <app-docsectiontext>
            <p>
                At PrimeTek, we have been developing UI component libraries since 2008. The web continues to undergo technological advancements, and as a result, we have to modernize and update our libraries to stay relevant. PrimeNG v18 is the
                next-generation version that fully embraces modern Web APIs and removes technical debt like the legacy-styled mode. Every component has been reviewed and enhanced.
            </p>
            <p>
                The most notable feature is the new <a href="/theming/styled" class="">styled mode</a> implementation. Previous iterations use SASS at an external repo called <i>PrimeNG-sass-theme</i> which requires compilation of a <i>theme.css</i>a
                file. This file had to be included in the application and need to be swapped at runtime for basic tasks like dark mode or primary color changes. In v18, styled mode is now part of the core, SASS is not used at all, and a new design
                token based architecture that fully utilizes CSS variables has been created. The new API is modern and superior to the legacy styled mode.
            </p>
            <p>
                Names of some of the components have been changed to more common alternatives for example, <i>Popover</i> replaced <i>OverlayPanel</i> and <i>InputSwitch</i> is now called <i>ToggleSwitch</i>. Each component has been reviewed for a
                consistent naming between CSS class names and sections. An example would be the <i>option</i> element of a Select component that uses <i>p-select-option</i> for the class name.
            </p>
            <p>
                Components have been utilized more within other components, for instance Dialog close button is not actually a PrimeNG button so that <i>closeButtonProps</i> can be used to enable the features of button like outlined, raised and more.
            </p>
        </app-docsectiontext>
    `
})
export class MigrationOverviewDoc {}
