import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-card {
    background: ${dt('card.background')};
    color: ${dt('card.color')};
    box-shadow: ${dt('card.shadow')};
    border-radius: ${dt('card.border.radius')};
    display: flex;
    flex-direction: column;
}

.p-card-caption {
    display: flex;
    flex-direction: column;
    gap: ${dt('card.caption.gap')};
}

.p-card-body {
    padding: ${dt('card.body.padding')};
    display: flex;
    flex-direction: column;
    gap: ${dt('card.body.gap')};
}

.p-card-title {
    font-size: ${dt('card.title.font.size')};
    font-weight: ${dt('card.title.font.weight')};
}

.p-card-subtitle {
    color: ${dt('card.subtitle.color')};
}
`;

const classes = {
    root: 'p-card p-component',
    header: 'p-card-header',
    body: 'p-card-body',
    caption: 'p-card-caption',
    title: 'p-card-title',
    subtitle: 'p-card-subtitle',
    content: 'p-card-content',
    footer: 'p-card-footer'
};

@Injectable()
export class CardStyle extends BaseStyle {
    name = 'card';

    theme = theme;

    classes = classes;
}

/**
 *
 * Card is a flexible container component.
 *
 * [Live Demo](https://www.primeng.org/card/)
 *
 * @module cardstyle
 *
 */
export enum CardClasses {
    /**
     * Class name of the root element
     */
    root = 'p-card',
    /**
     * Class name of the header element
     */
    header = 'p-card-header',
    /**
     * Class name of the body element
     */
    body = 'p-card-body',
    /**
     * Class name of the caption element
     */
    caption = 'p-card-caption',
    /**
     * Class name of the title element
     */
    title = 'p-card-title',
    /**
     * Class name of the subtitle element
     */
    subtitle = 'p-card-subtitle',
    /**
     * Class name of the content element
     */
    content = 'p-card-content',
    /**
     * Class name of the footer element
     */
    footer = 'p-card-footer'
}

export interface CardStyle extends BaseStyle {}
