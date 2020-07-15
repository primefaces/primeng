import { NgModule, Component, Input, ElementRef, ContentChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, Header, Footer } from 'primeng/api';
import { BlockableUI } from 'primeng/api';

@Component({
    selector: 'p-card',
    template: `
        <div [ngClass]="'p-card p-component'" [ngStyle]="style" [class]="styleClass">
            <div class="p-card-header" *ngIf="headerFacet">
               <ng-content select="p-header"></ng-content>
            </div>
            <div class="p-card-body">
                <div class="p-card-title" *ngIf="header">{{header}}</div>
                <div class="p-card-subtitle" *ngIf="subheader">{{subheader}}</div>
                <div class="p-card-content">
                    <ng-content></ng-content>
                </div>
                <div class="p-card-footer" *ngIf="footerFacet">
                    <ng-content select="p-footer"></ng-content>
                </div>
            </div>
        </div>
    `,
   changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./card.css']
})
export class Card implements BlockableUI {

    @Input() header: string;

    @Input() subheader: string;

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
