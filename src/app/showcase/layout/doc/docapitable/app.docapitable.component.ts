import { ChangeDetectionStrategy, Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-docapitable',
    templateUrl: './app.docapitable.component.html',
    styleUrls: ['./app.docapitable.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppDocApiTable implements OnInit {

    @Input() id: string;

    @Input() label: string;

    @Input() data: any[];

    @Input() description: string;

    @Input() relatedProp: string;

    @Input() parentTitle: string;

    @Input() level: number;

    constructor(public viewContainerRef: ViewContainerRef, public router: Router, public location: Location){}

    ngOnInit() {}

    navigate(event, param) {
        if (typeof window !== undefined) {
            const parentElement = event.currentTarget.parentElement;
            this.location.go(this.location.path() + '#' + this.id + '.' + param);

            setTimeout(() => {
                parentElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }, 1);
            event.preventDefault();
        }
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
        if(this.label === 'Methods' && !value) {
            return ['-'];
        }
        
        return value?.split('|').map(item => item.replace(/(\[|\]|<|>).*$/gm, '').trim());
    }

    isLinkType(value) {
        if (this.label === 'Templates') return false;
        const validValues = ['confirmationoptions', 'toastmessageoptions'];
        return value.toLowerCase().includes(this.id.split('.')[1].toLowerCase()) || validValues.includes(value.toLowerCase());
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

    scrollToLinkedElement(event, value) {
        if(document && document.createElement) {
            const section = this.label === 'Emitters' ? 'Events' : this.label;
            const elementId = `api.${this.id.split('.')[1].toLowerCase()}.${section.toLowerCase()}.${value}`;

            setTimeout(() => {
                this.scrollToLabelById(elementId)
            }, 1);

            event.preventDefault()
        }
    }

    scrollToLabelById(id) {
        if (typeof document !== undefined) {
            const label = document.getElementById(id);
            this.location.go(`${this.location.path()}/#${id}`);
            label && label.parentElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
    }
}
