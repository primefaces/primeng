import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Code } from '@domain/code';

@Component({
    templateUrl: './lts.component.html'
})
export class LTSComponent {
    constructor(
        private titleService: Title,
        private metaService: Meta
    ) {
        this.titleService.setTitle('Long Term Support - PrimeNG');
        this.metaService.updateTag({ name: 'description', content: 'Long Term Support' });
    }

    code: Code = {
        typescript: `import { Component } from '@angular/core';
import { LicenseManager } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    LicenseManager.verify('LICENSE_KEY', 'PASS_KEY');
    
}`
    };
}
