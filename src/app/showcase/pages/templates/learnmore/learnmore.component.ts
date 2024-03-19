import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as templateData from './templatedata.json';
@Component({
    selector: 'templates',
    templateUrl: './learnmore.component.html',
    styleUrl:"./learnmore.scss"
})
export class LearnMoreComponent implements OnInit {

    id: string;

    selectedTemplate

    constructor(private route: ActivatedRoute) {}

    ngOnInit(){
        this.id = this.route.snapshot.paramMap.get('id');
        this.selectedTemplate = templateData.templates.find((item: any) => item.name === this.id)?.data;
    }
 
}
