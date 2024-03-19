import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'templates',
    templateUrl: './learnmore.component.html'
})
export class LearnMoreComponent {
    constructor(private titleService: Title, private metaService: Meta) {
        this.titleService.setTitle('Angular Application Templates - PrimeNG');
        this.metaService.updateTag({ name: 'description', content: 'PrimeNG Angular application templates.' });
    }
}
