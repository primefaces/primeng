import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';

@Component({
    selector: 'license-doc',
    standalone: true,
    imports: [CommonModule, AppCodeModule, AppDocModule],
    template: `<app-docsectiontext>
        <p>
            A license key is required to be able to use all the services provided by the designer. Without a license, the visual editor is still available for trial purposes with various options such as downloads, and cloud storage disabled. The
            license key can be purchased at
            <a href="https://primefaces.org/store/designer.xhtml">PrimeStore</a>, it is valid for 1 year and needs to be renewed manually after a year.
        </p>
    </app-docsectiontext>`
})
export class LicenseDoc {}
