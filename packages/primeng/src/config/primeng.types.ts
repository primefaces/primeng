import type { ElementRef, TemplateRef } from '@angular/core';
import type { OverlayOptions, PassThroughOptions, Translation } from 'primeng/api';
import { FieldsetPassThrough } from 'primeng/fieldset';
import { BadgePassThrough } from 'primeng/types/badge';
import type { ButtonPassThrough } from 'primeng/types/button';
import type { PanelPassThrough } from 'primeng/types/panel';
import type { AccordionPassThrough } from 'primeng/types/accordion';
import type { CardPassThrough } from 'primeng/types/card';
import type { DividerPassThrough } from 'primeng/types/divider';
import type { MenuPassThrough } from 'primeng/types/menu';
import type { MenubarPassThrough } from 'primeng/types/menubar';
import type { ScrollPanelPassThrough } from 'primeng/types/scrollpanel';
import type { SplitterPassThrough } from 'primeng/types/splitter';
import type { StepperPassThrough } from 'primeng/types/stepper';
import type { ToolbarPassThrough } from 'primeng/types/toolbar';
import type { TabsPassThrough } from 'primeng/types/tabs';
import type { SpeedDialPassThrough } from 'primeng/types/speeddial';
import type { SplitButtonPassThrough } from 'primeng/types/splitbutton';

/** ZIndex configuration */
export type ZIndex = {
    modal: number;
    overlay: number;
    menu: number;
    tooltip: number;
};

/** Theme configuration */
export type ThemeType = { preset?: any; options?: any } | 'none' | boolean | undefined;

export type ThemeConfigType = {
    theme?: ThemeType;
    csp?: {
        nonce: string | undefined;
    };
};

export interface GlobalPassThrough {
    accordion?: AccordionPassThrough;
    card?: CardPassThrough;
    divider?: DividerPassThrough;
    menu?: MenuPassThrough;
    menubar?: MenubarPassThrough;
    scrollPanel?: ScrollPanelPassThrough;
    speedDial?: SpeedDialPassThrough;
    splitButton?: SplitButtonPassThrough;
    splitter?: SplitterPassThrough;
    stepper?: StepperPassThrough;
    tabs?: TabsPassThrough;
    toolbar?: ToolbarPassThrough;
    panel?: PanelPassThrough;
    button?: ButtonPassThrough;
    badge?: BadgePassThrough;
    fieldset?: FieldsetPassThrough;
    global?: {
        css?: string;
    };
    [key: string]: any;
}

export type PrimeNGConfigType = {
    ripple?: boolean;
    overlayAppendTo?: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
    /**
     * @deprecated Since v20. Use `inputVariant` instead.
     */
    inputStyle?: 'outlined' | 'filled';
    inputVariant?: 'outlined' | 'filled';
    overlayOptions?: OverlayOptions;
    translation?: Translation;
    /**
     * @experimental
     * This property is not yet implemented. It will be available in a future release.
     */
    unstyled?: boolean;
    zIndex?: ZIndex | null | undefined;
    pt?: GlobalPassThrough | null | undefined;
    ptOptions?: PassThroughOptions | null | undefined;
    filterMatchModeOptions?: any;
} & ThemeConfigType;
