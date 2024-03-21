import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as templateData from './templatedata.json';
@Component({
    selector: 'templates',
    templateUrl: './learnmore.component.html',
    styleUrl: './learnmore.scss'
})
export class LearnMoreComponent implements OnInit {
    id: string;

    selectedTemplate: any;

    templateName: string;

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        const findSelectedTemplate = templateData.templates.find((item: any) => item.name === this.id);
        const { name, data } = findSelectedTemplate;
        this.selectedTemplate = data;
        this.templateName = name;

        if (!this.selectedTemplate) {
            this.router.navigateByUrl('/not-found');
        }
    }
}
