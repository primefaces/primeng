import { ConfigurationDoc } from '@/doc/guides/rtl/configurationdoc';
import { LimitationsDoc } from '@/doc/guides/rtl/limitationsdoc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    selector: 'rtl-demo',
    standalone: true,
    imports: [AppDoc],
    templateUrl: './rtldemo.component.html'
})
export class RTLDemoComponent {
    docs = [
        {
            id: 'configuration',
            label: 'Configuration',
            component: ConfigurationDoc
        },
        {
            id: 'limitations',
            label: 'Limitations',
            component: LimitationsDoc
        }
    ];
}
