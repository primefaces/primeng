import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'overview-doc',
    standalone: true,
    imports: [CommonModule, AppCodeModule, AppDocModule, RouterModule],
    template: `<app-docsectiontext>
        <p>
            The <a routerLink="/theming">theming api</a> is open and source freely available with an extensive documentation. Theme Designer is a tool build on top of this theming api with important features to make theming easier. Designer consists
            of 4 key features; The <b>visual editor</b> provides a UI to edit the complete set of tokens. The <b>figma to code</b> generator is extremely useful to automate the design to code process and integrates seamlessly with the Figma UI Kit.
            The themes are saved in the <b>cloud storage </b>to be accessible from anywhere and any device and finally the <b>migration assistant</b> automatically updates your themes to the latest library version.
        </p>
    </app-docsectiontext>`
})
export class OverviewDoc {}
