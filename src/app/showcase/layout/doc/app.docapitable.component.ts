import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewContainerRef, booleanAttribute, numberAttribute } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from '../../service/appconfigservice';

@Component({
    selector: 'app-docapitable',
    template: ` <ng-container *ngIf="data">
        <div *ngIf="parentId" class="my-3 pt-3">
            <app-docsectiontext [parentId]="parentId" [parentTitle]="parentTitle" [parentDescription]="parentDescription" [level]="2"></app-docsectiontext>
        </div>
        <app-docsectiontext [id]="id" [title]="label" [level]="3">
            <p>{{ description || null }}</p>
        </app-docsectiontext>

        <div class="doc-tablewrapper mt-3" *ngIf="!data[0].data">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th *ngFor="let key of getKeys(data[0])">
                            <ng-container *ngIf="key !== 'readonly' && key !== 'optional' && key !== 'deprecated'">
                                {{ key }}
                            </ng-container>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let prop of data">
                        <td *ngFor="let entry of getEntries(prop)">
                            <ng-container *ngIf="entry[0] !== 'readonly' && entry[0] !== 'optional' && entry[0] !== 'deprecated'">
                                <span *ngIf="entry[0] === 'name'" [attr.id]="id + '.' + entry[1]" class="doc-option-name" [ngClass]="{ 'line-through cursor-pointer': !!prop.deprecated }" [attr.title]="prop.deprecated"
                                    >{{ entry[1] || '-' }}<a (click)="navigate($event, entry[1])" class="doc-option-link"><i class="pi pi-link"></i></a
                                ></span>
                                <span *ngIf="entry[0] === 'type'" class="doc-option-type">{{ entry[1] || '-' }}</span>
                                <ng-container *ngIf="entry[0] === 'parameters'">
                                    <div class="doc-option-params" *ngIf="entry[1].name; else nullValue">
                                        <span *ngIf="entry[1].name" [ngClass]="{ 'doc-option-parameter-name': label === 'Emitters', 'text-primary-700': label === 'Templates' }">{{ entry[1].name }} :</span>
                                        <ng-container *ngFor="let value of getType(entry[1].type); let i = index"
                                            >{{ i !== 0 ? ' |' : ' ' }}
                                            <a
                                                *ngIf="isLinkType(value); else elseBlock"
                                                (click)="scrollToLinkedElement($event, value, prop)"
                                                [ngClass]="{ 'doc-option-parameter-type': label === 'Emitters', 'text-primary-700': label === 'Templates' }"
                                                >{{ value || '-' }}</a
                                            >
                                            <ng-template #elseBlock>
                                                <span [ngClass]="{ 'doc-option-parameter-type': label === 'Emitters', 'text-primary-700': label === 'Templates' }">{{ value }}</span>
                                            </ng-template>
                                        </ng-container>
                                    </div>
                                    <ng-template #nullValue>
                                        <span>null</span>
                                    </ng-template>
                                </ng-container>
                                <span
                                    [ngClass]="{
                                        'doc-option-dark': isDarkMode && entry[0] === 'default',
                                        'doc-option-light': !isDarkMode && entry[0] === 'default',
                                        'doc-option-default': entry[0] === 'default',
                                        'doc-option-description': entry[0] === 'description'
                                    }"
                                    *ngIf="entry[0] !== 'name' && entry[0] !== 'type' && entry[0] !== 'parameters'"
                                    [id]="id + '.' + entry[0]"
                                    >{{ entry[1] }}
                                </span>
                            </ng-container>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <ng-container *ngIf="data[0].data && data[0].data.length > 0">
            <ng-container *ngFor="let childData of data">
                <app-docapitable [id]="childData.id" [data]="childData.data" [label]="childData.label" [description]="childData.description" [relatedProp]="childData.relatedProp"></app-docapitable>
            </ng-container>
        </ng-container>
    </ng-container>`,
    styles: [
        `
            .parameter-bold {
                font-weight: bold;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppDocApiTable {
    @Input() id: string;

    @Input() label: string;

    @Input() data: any[];

    @Input() description: string;

    @Input() relatedProp: string;

    @Input() parentTitle: string;

    @Input() parentDescription: string;

    @Input() parentId: string;

    @Input({ transform: numberAttribute }) level: number;

    @Input({ transform: booleanAttribute }) isInterface: boolean = false;

    constructor(public viewContainerRef: ViewContainerRef, public router: Router, public location: Location, private configService: AppConfigService) {}

    get isDarkMode(): boolean {
        return this.configService.config().darkMode;
    }

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
        if (this.label === 'Templates') {
            return value?.split('|');
        }
        if (this.label === 'Methods' && !value) {
            return ['-'];
        }

        return value?.split('|').map((item) => item.replace(/(\[|\]|<|>).*$/gm, '').trim());
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
        if (document && document.createElement) {
            const section = this.label === 'Emitters' ? 'Events' : this.label;
            const elementId = `api.${this.id.split('.')[1].toLowerCase()}.${section.toLowerCase()}.${value}`;

            setTimeout(() => {
                this.scrollToLabelById(elementId);
            }, 1);

            event.preventDefault();
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
