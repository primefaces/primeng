import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

interface Props {
    id?: string;
    label?: string;
    data?: any[];
    description?: string;
    relatedProp?: string;
    level?: number;
}

@Component({
    selector: 'app-docapitable',
    templateUrl: './app.docapitable.component.html'
})
export class AppDocApiTable implements OnInit {

    @Input() id: string;

    @Input() label: string;

    @Input() data: any[];

    @Input() description: string;

    @Input() relatedProp: string;

    @Input() level: number;

    constructor(public viewContainerRef: ViewContainerRef, public router: Router){}

    ngOnInit() {
    }

    getKeys(object) {
        return Object.keys(object);
    }

    getEntries(object) {
        return Object.entries(object);
    }

    ngAfterViewInit() {}

    getType(value) {
        if(this.label === 'Templates') {
            return value?.split('|');
        }

        return value?.split('|').map(item => item.replace(/(\[|\]|<|>).*$/gm, '').trim());
    }

    isLinkType(value) {
        if (this.label === 'Templates') return false;
        const validValues = ['confirmationoptions', 'toastmessageoptions'];

        return value.toLowerCase().includes(this.id.split('.')[1]) || validValues.includes(value.toLowerCase());
    }

    setLinkPath(value, type) {
        const currentRoute = this.router.url;
        let componentName = this.id.split('.')[1];

        const validValues = ['menuitem', 'confirmationoptions'];
        let definationType = type ? type : value.includes('Type') ? 'types' : value.includes('Event') ? 'events' : validValues.includes(value.toLowerCase()) ? 'options' : 'interfaces';

        if (componentName.includes('toast')) {
            componentName = 'toast';
        }

        return definationType === 'options' ? `/${currentRoute}/#api.${definationType}.${value}` : `/${currentRoute}/#api.${componentName}.${definationType}.${value}`;
    }

    relatedPropValue(value) {
        return this.findRelatedProps(value).secondPart;
    }

    setRelatedPropPath(value) {
        let { firstPart, secondPart } = this.findRelatedProps(value);

        const docName = this.router.url;

        firstPart = firstPart.toLowerCase().replace(docName, '');

        return this.setLinkPath(secondPart, firstPart);
    }

    findRelatedProps(value) {
        let firstPart = '';
        let secondPart = '';

        if (value.includes('.')) {
            const parts = value.split('.');

            firstPart = parts[0].trim();
            secondPart = parts[1].trim();
        } else if (value.includes('[')) {
            const start = value.indexOf("['") + 2;
            const end = value.indexOf("']");

            firstPart = value.slice(0, start - 2).trim();
            secondPart = value.slice(start, end).trim();
        }

        return { firstPart, secondPart };
    }

    componentLevel() {
        if (this.label === 'Interfaces' || this.label === 'Events') {
            return 2;
        } else if (this.level === 3) {
            return 3;
        }

        return this.data[0].data ? 1 : 2;
    }
}
