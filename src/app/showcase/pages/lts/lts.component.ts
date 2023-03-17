import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    templateUrl: './lts.component.html'
})
export class LTSComponent {
    constructor(private titleService: Title, private metaService: Meta) {
        this.titleService.setTitle('Long Term Support - PrimeNG');
        this.metaService.updateTag({ name: 'description', content: 'Long Term Support' });
    }
}
