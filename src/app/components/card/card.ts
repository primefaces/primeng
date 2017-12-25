import { NgModule, Component, Input, Output, EventEmitter, ElementRef, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, Header, Footer } from '../common/shared';
import { BlockableUI } from '../common/blockableui';

@Component({
    selector: 'p-card',
    template: `
        <div [ngClass]="'ui-card ui-widget ui-widget-content ui-corner-all'" [ngStyle]="style" [class]="styleClass">
            <div class="ui-card-header" *ngIf="headerFacet">
               <ng-content select="p-header"></ng-content>
            </div>
            <div class="ui-card-body">
                <div class="ui-card-title" *ngIf="title">{{title}}</div>
                <div class="ui-card-subtitle" *ngIf="subtitle">{{subtitle}}</div>
                <div class="ui-card-content">
                    <ng-content></ng-content>
                </div>
                <div class="ui-card-footer" *ngIf="footerFacet">
                    <ng-content select="p-footer"></ng-content>
                </div>
            </div>
        </div>
    `
})
export class Card implements BlockableUI {

    @Input() title: string;

    @Input() subtitle: string;

    @Input() style: any;

    @Input() styleClass: string;

    @ContentChild(Header) headerFacet;

    @ContentChild(Footer) footerFacet;

    constructor(private el: ElementRef) { }

    getBlockableElement(): HTMLElement  {
        return this.el.nativeElement.children[0];
    }

}

@NgModule({
    imports: [CommonModule],
    exports: [Card, SharedModule],
    declarations: [Card]
})
export class CardModule { }
