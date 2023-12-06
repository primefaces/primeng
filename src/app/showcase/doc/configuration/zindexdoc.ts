import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'zindex-doc',
    template: `
        <app-docsectiontext>
            <p>
                ZIndexes are managed automatically to make sure layering of overlay components work seamlessly when combining multiple components. Still there may be cases where you'd like to configure the configure default values such as a custom
                layout where header section is fixed. In a case like this, dropdown needs to be displayed below the application header but a modal dialog should be displayed above. PrimeNG configuration offers the <i>zIndex</i> property to customize
                the default values for components categories. Default values are described below and can be customized when setting up PrimeNG.
            </p>
            <p class="doc-section-description">The ZIndex of all components is increased according to their groups in harmony with each other. When <i>autoZIndex</i> is false, each group increments its zIndex within itself.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class ZIndexDoc {
    code: Code = {
        typescript: `import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
        this.primengConfig.zIndex = {
            modal: 1100,    // dialog, sidebar
            overlay: 1000,  // dropdown, overlaypanel
            menu: 1000,     // overlay menus
            tooltip: 1100   // tooltip
        };
    }
}`
    };
}
