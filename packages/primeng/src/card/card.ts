import { CommonModule, NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, inject, Input, NgModule, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { equals } from '@primeuix/utils';
import { BlockableUI, Footer, Header, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { CardStyle } from './style/cardstyle';

/**
 * Card is a flexible container component.
 * @group Components
 */
@Component({
    selector: 'p-card',
    imports: [NgTemplateOutlet, NgClass, NgStyle, SharedModule],
    template: `
        <div [ngClass]="'p-card p-component'" [ngStyle]="_style()" [class]="styleClass" [attr.data-pc-name]="'card'">
            @if (headerFacet || headerTemplate) {
                <div class="p-card-header">
                    <ng-content select="p-header"></ng-content>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                </div>
            }
            <div class="p-card-body">
                @if (_header || titleTemplate) {
                    <div class="p-card-title">
                        {{ _header }}
                        <ng-container *ngTemplateOutlet="titleTemplate"></ng-container>
                    </div>
                }
                @if (subheader || subtitleTemplate) {
                    <div class="p-card-subtitle">
                        {{ subheader }}
                        <ng-container *ngTemplateOutlet="subtitleTemplate"></ng-container>
                    </div>
                }
                <div class="p-card-content">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
                @if (footerFacet || footerTemplate) {
                    <div class="p-card-footer">
                        <ng-content select="p-footer"></ng-content>
                        <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                    </div>
                }
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [CardStyle]
})
export class Card extends BaseComponent implements BlockableUI {
    /**
     * Header of the card.
     * @group Props
     */
    @Input('header') _header: string | undefined;
    /**
     * Subheader of the card.
     * @group Props
     */
    @Input() subheader: string | undefined;
    /**
     * Inline style of the element.
     * @group Props
     */
    @Input() set style(value: { [klass: string]: any } | null | undefined) {
        if (!equals(this._style(), value)) {
            this._style.set(value);
        }
    }
    /**
     * Class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;

    @ContentChild(Header) headerFacet: TemplateRef<any> | undefined;

    @ContentChild(Footer) footerFacet: TemplateRef<any> | undefined;

    @ContentChild('header') headerTemplate: TemplateRef<any> | undefined;

    @ContentChild('title') titleTemplate: TemplateRef<any> | undefined;

    @ContentChild('subtitle') subtitleTemplate: TemplateRef<any> | undefined;

    @ContentChild('content') contentTemplate: TemplateRef<any> | undefined;

    @ContentChild('footer') footerTemplate: TemplateRef<any> | undefined;

    _style = signal<{ [klass: string]: any } | null | undefined>(null);

    _componentStyle = inject(CardStyle);

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }
}

@NgModule({
    imports: [Card, SharedModule],
    exports: [Card, SharedModule]
})
export class CardModule {}
