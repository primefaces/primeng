import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'zindex-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>
                ZIndexes are managed automatically to make sure layering of overlay components work seamlessly when combining multiple components. Still there may be cases where you'd like to configure the configure default values such as a custom
                layout where header section is fixed. In a case like this, dropdown needs to be displayed below the application header but a modal dialog should be displayed above. PrimeNG configuration offers the <i>zIndex</i> property to customize
                the default values for components categories. Default values are described below and can be customized when setting up PrimeNG.
            </p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class ZIndexDoc {
    code: Code = {
        typescript: `providePrimeNG({
    zIndex: {
        modal: 1100,    // dialog, sidebar
        overlay: 1000,  // dropdown, overlaypanel
        menu: 1000,     // overlay menus
        tooltip: 1100   // tooltip
    }
})`
    };
}
