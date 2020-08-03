import {NgModule,Component,Input,Output,EventEmitter,ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, AfterContentInit, TemplateRef, QueryList, ContentChildren} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {PrimeTemplate} from 'primeng/api';

@Component({
    selector: 'p-inplaceDisplay',
    template: '<ng-content></ng-content>'
})
export class InplaceDisplay {}

@Component({
    selector: 'p-inplaceContent',
    template: '<ng-content></ng-content>'
})
export class InplaceContent {}

@Component({
    selector: 'p-inplace',
    template: `
        <div [ngClass]="{'p-inplace p-component': true, 'p-inplace-closable': closable}" [ngStyle]="style" [class]="styleClass">
            <div class="p-inplace-display" (click)="onActivateClick($event)" tabindex="0" (keydown)="onKeydown($event)"   
                [ngClass]="{'p-disabled':disabled}" *ngIf="!active">
                <ng-content select="[pInplaceDisplay]"></ng-content>
                <ng-container *ngTemplateOutlet="displayTemplate"></ng-container>
            </div>
            <div class="p-inplace-content" *ngIf="active">
                <ng-content select="[pInplaceContent]"></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                <button type="button" [icon]="closeIcon" pButton (click)="onDeactivateClick($event)" *ngIf="closable"></button>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./inplace.css']
})
export class Inplace implements AfterContentInit {

    @Input() active: boolean;

    @Input() closable: boolean;

    @Input() disabled: boolean;

    @Input() preventClick: boolean;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() closeIcon: string = 'pi pi-times';

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @Output() onActivate: EventEmitter<any> = new EventEmitter();

    @Output() onDeactivate: EventEmitter<any> = new EventEmitter();

    hover: boolean;

    displayTemplate: TemplateRef<any>;

    contentTemplate: TemplateRef<any>;

    constructor(public cd: ChangeDetectorRef) {}

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'display':
                    this.displayTemplate = item.template;
                break;

                case 'content':
                    this.contentTemplate = item.template;
                break;
            }
        });
    }

    onActivateClick(event) {
        if (!this.preventClick)
            this.activate(event);
    }

    onDeactivateClick(event) {
        if (!this.preventClick)
            this.deactivate(event);
    }

    activate(event?: Event) {
        if (!this.disabled) {
            this.active = true;
            this.onActivate.emit(event);
            this.cd.markForCheck();
        }
    }

    deactivate(event?: Event) {
        if (!this.disabled) {
            this.active = false;
            this.hover = false;
            this.onDeactivate.emit(event);
            this.cd.markForCheck();
        }
    }

    onKeydown(event: KeyboardEvent) {
        if (event.which === 13) {
            this.activate(event);
            event.preventDefault();
        }
    }
}

@NgModule({
    imports: [CommonModule,ButtonModule],
    exports: [Inplace,InplaceDisplay,InplaceContent,ButtonModule],
    declarations: [Inplace,InplaceDisplay,InplaceContent]
})
export class InplaceModule { }
