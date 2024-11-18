import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `

.p-drawer {
    display: flex;
    flex-direction: column;
    pointer-events: auto;
    transform: translate3d(0px, 0px, 0px);
    position: relative;
    transition: transform 0.3s;
    background: ${dt('drawer.background')};
    color: ${dt('drawer.color')};
    border: 1px solid ${dt('drawer.border.color')};
    box-shadow: ${dt('drawer.shadow')};
}

.p-drawer-content {
    overflow-y: auto;
    flex-grow: 1;
    padding: ${dt('drawer.content.padding')};
}

.p-drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    padding: ${dt('drawer.header.padding')};
}

.p-drawer-footer {
    padding: ${dt('drawer.header.padding')};
}

.p-drawer-title {
    font-weight: ${dt('drawer.title.font.weight')};
    font-size: ${dt('drawer.title.font.size')};
}

.p-drawer-full .p-drawer {
    transition: none;
    transform: none;
    width: 100vw !important;
    height: 100vh !important;
    max-height: 100%;
    top: 0px !important;
    left: 0px !important;
    border-width: 1px;
}

/* PrimeVue animations

.p-drawer-left .p-drawer-enter-from,
.p-drawer-left .p-drawer-leave-to {
    transform: translateX(-100%);
}

.p-drawer-right .p-drawer-enter-from,
.p-drawer-right .p-drawer-leave-to {
    transform: translateX(100%);
}

.p-drawer-top .p-drawer-enter-from,
.p-drawer-top .p-drawer-leave-to {
    transform: translateY(-100%);
}

.p-drawer-bottom .p-drawer-enter-from,
.p-drawer-bottom .p-drawer-leave-to {
    transform: translateY(100%);
}

.p-drawer-full .p-drawer-enter-from,
.p-drawer-full .p-drawer-leave-to {
    opacity: 0;
}

.p-drawer-full .p-drawer-enter-active,
.p-drawer-full .p-drawer-leave-active {
    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
}
*/

.p-drawer-left .p-drawer {
    align-self: start;
    width: 20rem;
    height: 100%;
    border-right-width: 1px;
}

.p-drawer-right .p-drawer {
    align-self: end;
    width: 20rem;
    height: 100%;
    border-left-width: 1px;
}

.p-drawer-top .p-drawer {

    height: 10rem;
    width: 100%;
    border-bottom-width: 1px;
}

.p-drawer-bottom .p-drawer {
    height: 10rem;
    width: 100%;
    border-top-width: 1px;
}

.p-drawer-left .p-drawer-content,
.p-drawer-right .p-drawer-content,
.p-drawer-top .p-drawer-content,
.p-drawer-bottom .p-drawer-content {
    width: 100%;
    height: 100%;
}

.p-drawer-open {
    display: flex;
}

.p-drawer-top {
    justify-content: flex-start;
}

.p-drawer-bottom {
    justify-content: flex-end;
}
`;

const inlineStyles = {
    mask: ({ instance }) => ({
        position: 'fixed',
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: instance.position === 'top' ? 'flex-start' : instance.position === 'bottom' ? 'flex-end' : 'center'
    })
};

const classes = {
    mask: ({ instance }) => ({
        'p-drawer-mask': true,
        'p-overlay-mask p-overlay-mask-enter': instance.modal,
        'p-drawer-open': instance.containerVisible,
        'p-drawer-full': instance.fullScreen,
        [`p-drawer-${instance.position}`]: !!instance.position
    }),
    root: ({ instance }) => ({
        'p-drawer p-component': true,
        'p-drawer-full': instance.fullScreen
    }),
    header: 'p-drawer-header',
    title: 'p-drawer-title',
    pcCloseButton: 'p-drawer-close-button',
    content: 'p-drawer-content',
    footer: 'p-drawer-footer'
};

@Injectable()
export class DrawerStyle extends BaseStyle {
    name = 'drawer';

    theme = theme;

    classes = classes;

    inlineStyles = inlineStyles;
}
