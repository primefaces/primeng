import type { ElementRef, TemplateRef } from '@angular/core';
import type { OverlayOptions, PassThroughOptions, Translation } from 'primeng/api';
import { FieldsetPassThrough } from 'primeng/fieldset';
import { ScrollPanelPassThrough } from 'primeng/scrollpanel';
import type { AccordionPassThrough } from 'primeng/types/accordion';
import type { AvatarPassThrough } from 'primeng/types/avatar';
import type { AvatarGroupPassThrough } from 'primeng/types/avatargroup';
import { BadgePassThrough } from 'primeng/types/badge';
import type { BlockUIPassThrough } from 'primeng/types/blockui';
import type { BreadcrumbPassThrough } from 'primeng/types/breadcrumb';
import type { ButtonPassThrough } from 'primeng/types/button';
import type { CardPassThrough } from 'primeng/types/card';
import type { CarouselPassThrough } from 'primeng/types/carousel';
import type { ChipPassThrough } from 'primeng/types/chip';
import type { ConfirmDialogPassThrough } from 'primeng/types/confirmdialog';
import type { ConfirmPopupPassThrough } from 'primeng/types/confirmpopup';
import type { DialogPassThrough } from 'primeng/types/dialog';
import type { DividerPassThrough } from 'primeng/types/divider';
import type { DockPassThrough } from 'primeng/types/dock';
import type { DrawerPassThrough } from 'primeng/types/drawer';
import type { FileUploadPassThrough } from 'primeng/types/fileupload';
import type { FluidPassThrough } from 'primeng/types/fluid';
import type { GalleriaPassThrough } from 'primeng/types/galleria';
import type { ImagePassThrough } from 'primeng/types/image';
import type { ImageComparePassThrough } from 'primeng/types/imagecompare';
import type { InplacePassThrough } from 'primeng/types/inplace';
import type { InputNumberPassThrough } from 'primeng/types/inputnumber';
import type { KnobPassThrough } from 'primeng/types/knob';
import type { MegaMenuPassThrough } from 'primeng/types/megamenu';
import type { MenuPassThrough } from 'primeng/types/menu';
import type { MenubarPassThrough } from 'primeng/types/menubar';
import { MessagePassThrough } from 'primeng/types/message';
import type { MeterGroupPassThrough } from 'primeng/types/metergroup';
import type { OrderListPassThrough } from 'primeng/types/orderlist';
import { OverlayBadgePassThrough } from 'primeng/types/overlaybadge';
import type { PanelPassThrough } from 'primeng/types/panel';
import type { PanelMenuPassThrough } from 'primeng/types/panelmenu';
import type { PopoverPassThrough } from 'primeng/types/popover';
import type { ProgressBarPassThrough } from 'primeng/types/progressbar';
import type { ProgressSpinnerPassThrough } from 'primeng/types/progressspinner';
import type { RadioButtonPassThrough } from 'primeng/types/radiobutton';
import type { RatingPassThrough } from 'primeng/types/rating';
import type { ScrollerPassThrough } from 'primeng/types/scroller';
import type { ScrollTopPassThrough } from 'primeng/types/scrolltop';
import type { SelectPassThrough } from 'primeng/types/select';
import type { SkeletonPassThrough } from 'primeng/types/skeleton';
import type { SpeedDialPassThrough } from 'primeng/types/speeddial';
import type { SplitButtonPassThrough } from 'primeng/types/splitbutton';
import type { SplitterPassThrough } from 'primeng/types/splitter';
import type { StepperPassThrough } from 'primeng/types/stepper';
import { TabsPassThrough } from 'primeng/types/tabs';
import type { TagPassThrough } from 'primeng/types/tag';
import type { TerminalPassThrough } from 'primeng/types/terminal';
import type { TieredMenuPassThrough } from 'primeng/types/tieredmenu';
import type { TimelinePassThrough } from 'primeng/types/timeline';
import type { ToastPassThrough } from 'primeng/types/toast';
import type { ToolbarPassThrough } from 'primeng/types/toolbar';
import type { TreePassThrough } from 'primeng/types/tree';

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

type NewType = SpeedDialPassThrough;

export interface GlobalPassThrough {
    accordion?: AccordionPassThrough;
    avatar?: AvatarPassThrough;
    avatarGroup?: AvatarGroupPassThrough;
    blockUI?: BlockUIPassThrough;
    breadcrumb?: BreadcrumbPassThrough;
    card?: CardPassThrough;
    carousel?: CarouselPassThrough;
    chip?: ChipPassThrough;
    confirmDialog?: ConfirmDialogPassThrough;
    confirmPopup?: ConfirmPopupPassThrough;
    dialog?: DialogPassThrough;
    divider?: DividerPassThrough;
    dock?: DockPassThrough;
    megaMenu?: MegaMenuPassThrough;
    drawer?: DrawerPassThrough;
    fileUpload?: FileUploadPassThrough;
    menu?: MenuPassThrough;
    menubar?: MenubarPassThrough;
    fluid?: FluidPassThrough;
    galleria?: GalleriaPassThrough;
    image?: ImagePassThrough;
    imageCompare?: ImageComparePassThrough;
    inplace?: InplacePassThrough;
    inputNumber?: InputNumberPassThrough;
    knob?: KnobPassThrough;
    popover?: PopoverPassThrough;
    message?: MessagePassThrough;
    meterGroup?: MeterGroupPassThrough;
    orderList?: OrderListPassThrough;
    overlayBadge?: OverlayBadgePassThrough;
    progressBar?: ProgressBarPassThrough;
    progressSpinner?: ProgressSpinnerPassThrough;
    radioButton?: RadioButtonPassThrough;
    rating?: RatingPassThrough;
    scroller?: ScrollerPassThrough;
    scrollPanel?: ScrollPanelPassThrough;
    scrollTop?: ScrollTopPassThrough;
    select?: SelectPassThrough;
    skeleton?: SkeletonPassThrough;
    speedDial?: SpeedDialPassThrough;
    splitButton?: SplitButtonPassThrough;
    splitter?: SplitterPassThrough;
    stepper?: StepperPassThrough;
    tabs?: TabsPassThrough;
    tieredMenu?: TieredMenuPassThrough;
    timeline?: TimelinePassThrough;
    tag?: TagPassThrough;
    terminal?: TerminalPassThrough;
    toast?: ToastPassThrough;
    toolbar?: ToolbarPassThrough;
    tree?: TreePassThrough;
    panel?: PanelPassThrough;
    panelMenu?: PanelMenuPassThrough;
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
