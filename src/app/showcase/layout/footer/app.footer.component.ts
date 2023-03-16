import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
        <div class="layout-footer">
            <div>
                <span>PrimeNG {{ version }} by </span>
                <a href="https://www.primetek.com.tr">PrimeTek</a>
            </div>
        </div>
    `
})
export class AppFooterComponent {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    version = require('package.json') && require('package.json').version;
}
