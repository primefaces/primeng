import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, inject, InjectionToken, Input, NgModule, QueryList, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { equals } from '@primeuix/utils';
import { BlockableUI, Footer, Header, PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/pbind';
import { CardStyle } from './style/cardstyle';

const CARD_INSTANCE = new InjectionToken<Card>('CARD_INSTANCE');

/**
 * Card is a flexible container component.
 * @group Components
 */
@Component({
    selector: 'p-card',
    standalone: true,
    imports: [CommonModule, SharedModule, Bind],
    template: `
        <div [pBind]="ptm('header')" [class]="cx('header')" *ngIf="headerFacet || headerTemplate || _headerTemplate">
            <ng-content select="p-header"></ng-content>
            <ng-container *ngTemplateOutlet="headerTemplate || _headerTemplate"></ng-container>
        </div>
        <div [pBind]="ptm('body')" [class]="cx('body')">
            <div [pBind]="ptm('title')" [class]="cx('title')" *ngIf="header || titleTemplate || _titleTemplate">
                <ng-container *ngIf="header && !_titleTemplate && !titleTemplate">{{ header }}</ng-container>
                <ng-container *ngTemplateOutlet="titleTemplate || _titleTemplate"></ng-container>
            </div>
            <div [pBind]="ptm('subtitle')" [class]="cx('subtitle')" *ngIf="subheader || subtitleTemplate || _subtitleTemplate">
                <ng-container *ngIf="subheader && !_subtitleTemplate && !subtitleTemplate">{{ subheader }}</ng-container>
                <ng-container *ngTemplateOutlet="subtitleTemplate || _subtitleTemplate"></ng-container>
            </div>
            <div [pBind]="ptm('content')" [class]="cx('content')">
                <ng-content></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate"></ng-container>
            </div>
            <div [pBind]="ptm('footer')" [class]="cx('footer')" *ngIf="footerFacet || footerTemplate || _footerTemplate">
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate || _footerTemplate"></ng-container>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [CardStyle, { provide: CARD_INSTANCE, useExisting: Card }, { provide: PARENT_INSTANCE, useExisting: Card }],
    host: {
        '[class]': "cn(cx('root'), styleClass)",
        '[style]': '_style()'
    },
    hostDirectives: [Bind]
})
export class Card extends BaseComponent implements BlockableUI {
    $pcCard: Card | undefined = inject(CARD_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });
    /**
     * Header of the card.
     * @group Props
     */
    @Input() header: string | undefined;
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
     * @deprecated since v20.0.0, use `class` instead.
     * @group Props
     */
    @Input() styleClass: string | undefined;

    @ContentChild(Header) headerFacet: TemplateRef<any> | undefined;

    @ContentChild(Footer) footerFacet: TemplateRef<any> | undefined;

    @ContentChild('header', { descendants: false }) headerTemplate: TemplateRef<any> | undefined;

    @ContentChild('title', { descendants: false }) titleTemplate: TemplateRef<any> | undefined;

    @ContentChild('subtitle', { descendants: false }) subtitleTemplate: TemplateRef<any> | undefined;

    @ContentChild('content', { descendants: false }) contentTemplate: TemplateRef<any> | undefined;

    @ContentChild('footer', { descendants: false }) footerTemplate: TemplateRef<any> | undefined;

    _headerTemplate: TemplateRef<any> | undefined;

    _titleTemplate: TemplateRef<any> | undefined;

    _subtitleTemplate: TemplateRef<any> | undefined;

    _contentTemplate: TemplateRef<any> | undefined;

    _footerTemplate: TemplateRef<any> | undefined;

    _style = signal<{ [klass: string]: any } | null | undefined>(null);

    _componentStyle = inject(CardStyle);

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    onAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this._headerTemplate = item.template;
                    break;

                case 'title':
                    this._titleTemplate = item.template;
                    break;

                case 'subtitle':
                    this._subtitleTemplate = item.template;
                    break;

                case 'content':
                    this._contentTemplate = item.template;
                    break;

                case 'footer':
                    this._footerTemplate = item.template;
                    break;

                default:
                    this._contentTemplate = item.template;
                    break;
            }
        });
    }

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}

@NgModule({
    imports: [Card, SharedModule, Bind],
    exports: [Card, SharedModule, Bind]
})
export class CardModule {}
