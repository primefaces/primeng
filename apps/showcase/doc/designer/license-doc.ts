import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'license-doc',
    standalone: true,
    imports: [CommonModule, AppDocSectionText],
    template: `<app-docsectiontext>
        <p>
            A license key is required to be able to use all the services provided by the designer. Without a license, the visual editor is still available for trial purposes with various options such as downloads, and cloud storage disabled. The
            license key can be purchased at
            <a href="https://primeui.store/designer">PrimeStore</a>, it is valid for 1 year and needs to be renewed manually after a year.
        </p>
    </app-docsectiontext>`
})
export class LicenseDoc {}
