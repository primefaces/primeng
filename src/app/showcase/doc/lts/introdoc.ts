import { Component, Input } from '@angular/core';

@Component({
    selector: 'intro-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Angular is a fast paced technology with a new major version <a href="https://angular.io/guide/releases">every 6 months</a>. PrimeNG release cycle is aligned with Angular and every 6 months a new major PrimeNG version is released that
                is compatible with the latest Angular core. We are aware that majority of the existing applications prefer to remain at a previous version due to stability requirements instead of upgrading to the latest version immediately.
            </p>
            <p>
                PrimeNG LTS is an annual subscription based service to provide a license for the finest compatible version suited to you. LTS covers the prior two versions from the latest release, this means up to <b>18 months</b> of almost weekly
                releases to bring the latest defect fixes and security updates to your project. As an example, when PrimeNG moves to Angular 9, PrimeNG 7 and 8 will move to LTS support whereas STS (short term support) versions of PrimeNG 9 will be
                open source under MIT license for at least 6 months until PrimeNG 10 is released. Here is a timeline to visualize the LTS support.
            </p>
        </app-docsectiontext>
        <div class="card">
            <img alt="LTS" src="https://primefaces.org/cdn/primeng/images/lts-timeline.jpg" style="width: 100%" />
        </div>
    </section>`
})
export class IntroDoc {
    @Input() id: string;

    @Input() title: string;
}
