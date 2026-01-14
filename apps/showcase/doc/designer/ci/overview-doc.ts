import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'overview-doc',
    standalone: true,
    imports: [CommonModule, AppDocSectionText, RouterModule],
    template: `<app-docsectiontext>
        <p>
            The Figma UI Kit and the theming api is fully synchorized, meaning the design tokens in Figma map to the corresponding properties in a theme preset. The Theme Designer offers a feature to create a theme by uploading a tokens.json file
            that is exported from the Token Studio plugin in Figma. Once the theme is converted, it can either be edited further in the visual editor or downloaded as a zip file to access the full code. Visit the
            <a routerLink="/designer/guide#figma">Figma</a>
            section at the designer documentation for more information.
        </p>
        <p>
            Manually exporting the tokens file from Figma and uploading it to the online designer tool may quickly become tedious in active development cycles. As a solution, theme designer provides a remote API that can be integrated into your CI
            pipeline.
        </p>
        <img class="rounded-lg" src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/common.images/designer/themedesigner-ci.jpg" />
    </app-docsectiontext>`
})
export class OverviewDoc {}
