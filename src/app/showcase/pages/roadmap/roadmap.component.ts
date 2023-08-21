import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    templateUrl: './roadmap.component.html'
})
export class RoadmapComponent {
    constructor(private titleService: Title, private metaService: Meta) {
        this.titleService.setTitle('Roadmap - PrimeNG');
        this.metaService.updateTag({ name: 'description', content: 'PrimeNG Roadmap' });
    }
}
