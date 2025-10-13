import type { ElementRef, TemplateRef } from '@angular/core';
import type { OverlayOptions, PassThroughOptions, Translation } from 'primeng/api';
import { FieldsetPassThrough } from 'primeng/fieldset';
import { ScrollPanelPassThrough } from 'primeng/scrollpanel';
import type { AccordionPassThrough } from 'primeng/types/accordion';
import type { AutoCompletePassThrough } from 'primeng/types/autocomplete';
import type { AvatarPassThrough } from 'primeng/types/avatar';
import type { AvatarGroupPassThrough } from 'primeng/types/avatargroup';
import { BadgePassThrough } from 'primeng/types/badge';
import type { BlockUIPassThrough } from 'primeng/types/blockui';
import type { BreadcrumbPassThrough } from 'primeng/types/breadcrumb';
import type { ButtonPassThrough } from 'primeng/types/button';
import type { CardPassThrough } from 'primeng/types/card';
import type { CarouselPassThrough } from 'primeng/types/carousel';
import type { CheckboxPassThrough } from 'primeng/types/checkbox';
import type { ChipPassThrough } from 'primeng/types/chip';
import type { ColorPickerPassThrough } from 'primeng/types/colorpicker';
import type { ConfirmDialogPassThrough } from 'primeng/types/confirmdialog';
import type { ConfirmPopupPassThrough } from 'primeng/types/confirmpopup';
import type { DialogPassThrough } from 'primeng/types/dialog';
import type { DividerPassThrough } from 'primeng/types/divider';
import type { DockPassThrough } from 'primeng/types/dock';
import type { DrawerPassThrough } from 'primeng/types/drawer';
import type { EditorPassThrough } from 'primeng/types/editor';
import type { FileUploadPassThrough } from 'primeng/types/fileupload';
import type { FloatLabelPassThrough } from 'primeng/types/floatlabel';
import type { FluidPassThrough } from 'primeng/types/fluid';
import type { GalleriaPassThrough } from 'primeng/types/galleria';
import type { IconFieldPassThrough } from 'primeng/types/iconfield';
import type { IftaLabelPassThrough } from 'primeng/types/iftalabel';
import type { ImagePassThrough } from 'primeng/types/image';
import type { ImageComparePassThrough } from 'primeng/types/imagecompare';
import type { InplacePassThrough } from 'primeng/types/inplace';
import type { InputGroupPassThrough } from 'primeng/types/inputgroup';
import type { InputGroupAddonPassThrough } from 'primeng/types/inputgroupaddon';
import type { InputIconPassThrough } from 'primeng/types/inputicon';
import type { InputMaskPassThrough } from 'primeng/types/inputmask';
import type { InputNumberPassThrough } from 'primeng/types/inputnumber';
import type { InputOtpPassThrough } from 'primeng/types/inputotp';
import type { InputTextPassThrough } from 'primeng/types/inputtext';
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
import type { SelectButtonPassThrough } from 'primeng/types/selectbutton';
import type { SkeletonPassThrough } from 'primeng/types/skeleton';
import type { SliderPassThrough } from 'primeng/types/slider';
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
import type { ToggleButtonPassThrough } from 'primeng/types/togglebutton';
import type { ToggleSwitchPassThrough } from 'primeng/types/toggleswitch';
import type { ToolbarPassThrough } from 'primeng/types/toolbar';
import type { TreePassThrough } from 'primeng/types/tree';
import type { TreeSelectPassThrough } from 'primeng/types/treeselect';

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
    autoComplete?: AutoCompletePassThrough;
    avatar?: AvatarPassThrough;
    avatarGroup?: AvatarGroupPassThrough;
    blockUI?: BlockUIPassThrough;
    breadcrumb?: BreadcrumbPassThrough;
    card?: CardPassThrough;
    carousel?: CarouselPassThrough;
    checkbox?: CheckboxPassThrough;
    chip?: ChipPassThrough;
    colorPicker?: ColorPickerPassThrough;
    confirmDialog?: ConfirmDialogPassThrough;
    confirmPopup?: ConfirmPopupPassThrough;
    dialog?: DialogPassThrough;
    divider?: DividerPassThrough;
    dock?: DockPassThrough;
    megaMenu?: MegaMenuPassThrough;
    drawer?: DrawerPassThrough;
    editor?: EditorPassThrough;
    fileUpload?: FileUploadPassThrough;
    floatLabel?: FloatLabelPassThrough;
    menu?: MenuPassThrough;
    menubar?: MenubarPassThrough;
    fluid?: FluidPassThrough;
    galleria?: GalleriaPassThrough;
    iconField?: IconFieldPassThrough;
    iftaLabel?: IftaLabelPassThrough;
    inputIcon?: InputIconPassThrough;
    image?: ImagePassThrough;
    imageCompare?: ImageComparePassThrough;
    inplace?: InplacePassThrough;
    inputText?: InputTextPassThrough;
    inputGroup?: InputGroupPassThrough;
    inputGroupAddon?: InputGroupAddonPassThrough;
    inputMask?: InputMaskPassThrough;
    inputNumber?: InputNumberPassThrough;
    inputOtp?: InputOtpPassThrough;
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
    selectButton?: SelectButtonPassThrough;
    skeleton?: SkeletonPassThrough;
    slider?: SliderPassThrough;
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
    toggleButton?: ToggleButtonPassThrough;
    toggleSwitch?: ToggleSwitchPassThrough;
    toolbar?: ToolbarPassThrough;
    tree?: TreePassThrough;
    treeSelect?: TreeSelectPassThrough;
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
