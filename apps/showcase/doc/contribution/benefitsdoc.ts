import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'benefits-doc',
    standalone: true,
    imports: [RouterModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                Contributing to PrimeNG comes with several benefits. Being part of an open-source project will enhance your career and open up exciting opportunities. Contributors and Committers will be listed on our
                <a routerLink="/team">team page</a>. You'll gain significant visibility in the developer community while improving yourself as a professional.
            </p>
            <p>You'll be invited to a private communication channel at Discord to get in touch with PrimeTek. In addition, contributors have access to all PrimeNG add-ons like Premium Templates, Blocks, and UI Kit free of charge.</p>
        </app-docsectiontext>
    `
})
export class BenefitsDoc {}
