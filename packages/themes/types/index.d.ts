import { AccordionDesignTokens } from './accordion';
import { AutoCompleteDesignTokens } from './autocomplete';
import { AvatarDesignTokens } from './avatar';
import { BadgeDesignTokens } from './badge';
import { BlockUIDesignTokens } from './blockui';
import { BreadcrumbDesignTokens } from './breadcrumb';
import { ButtonDesignTokens } from './button';
import { CardDesignTokens } from './card';
import { CarouselDesignTokens } from './carousel';
import { CascadeSelectDesignTokens } from './cascadeselect';
import { CheckboxDesignTokens } from './checkbox';
import { ChipDesignTokens } from './chip';
import { ColorPickerDesignTokens } from './colorpicker';
import { ConfirmDialogDesignTokens } from './confirmdialog';
import { ConfirmPopupDesignTokens } from './confirmpopup';
import { ContextMenuDesignTokens } from './contextmenu';
import { DataTableDesignTokens } from './datatable';
import { DataViewDesignTokens } from './dataview';
import { DatePickerDesignTokens } from './datepicker';
import { DialogDesignTokens } from './dialog';
import { DividerDesignTokens } from './divider';
import { DockDesignTokens } from './dock';
import { DrawerDesignTokens } from './drawer';
import { EditorDesignTokens } from './editor';
import { FieldsetDesignTokens } from './fieldset';
import { FileUploadDesignTokens } from './fileupload';
import { FloatLabelDesignTokens } from './floatlabel';
import { GalleriaDesignTokens } from './galleria';
import { IconFieldDesignTokens } from './iconfield';
import { IftaLabelDesignTokens } from './iftalabel';
import { ImageDesignTokens } from './image';
import { ImageCompareDesignTokens } from './imagecompare';
import { InlineMessageDesignTokens } from './inlinemessage';
import { InplaceDesignTokens } from './inplace';
import { InputChipsDesignTokens } from './inputchips';
import { InputGroupDesignTokens } from './inputgroup';
import { InputNumberDesignTokens } from './inputnumber';
import { InputOtpDesignTokens } from './inputotp';
import { InputTextDesignTokens } from './inputtext';
import { KnobDesignTokens } from './knob';
import { ListboxDesignTokens } from './listbox';
import { MegaMenuDesignTokens } from './megamenu';
import { MenuDesignTokens } from './menu';
import { MenubarDesignTokens } from './menubar';
import { MessageDesignTokens } from './message';
import { MeterGroupDesignTokens } from './metergroup';
import { MultiSelectDesignTokens } from './multiselect';
import { OrderListDesignTokens } from './orderlist';
import { OrganizationChartDesignTokens } from './organizationchart';
import { OverlayBadgeDesignTokens } from './overlaybadge';
import { PaginatorDesignTokens } from './paginator';
import { PanelDesignTokens } from './panel';
import { PanelMenuDesignTokens } from './panelmenu';
import { PasswordDesignTokens } from './password';
import { PickListDesignTokens } from './picklist';
import { PopoverDesignTokens } from './popover';
import { ProgressBarDesignTokens } from './progressbar';
import { ProgressSpinnerDesignTokens } from './progressspinner';
import { RadioButtonDesignTokens } from './radiobutton';
import { RatingDesignTokens } from './rating';
import { RippleDesignTokens } from './ripple';
import { ScrollPanelDesignTokens } from './scrollpanel';
import { SelectDesignTokens } from './select';
import { SelectButtonDesignTokens } from './selectbutton';
import { SkeletonDesignTokens } from './skeleton';
import { SliderDesignTokens } from './slider';
import { SpeedDialDesignTokens } from './speeddial';
import { SplitButtonDesignTokens } from './splitbutton';
import { SplitterDesignTokens } from './splitter';
import { StepperDesignTokens } from './stepper';
import { StepsDesignTokens } from './steps';
import { TabmenuDesignTokens } from './tabmenu';
import { TabsDesignTokens } from './tabs';
import { TabViewDesignTokens } from './tabview';
import { TagDesignTokens } from './tag';
import { TerminalDesignTokens } from './terminal';
import { TextareaDesignTokens } from './textarea';
import { TieredMenuDesignTokens } from './tieredmenu';
import { TimelineDesignTokens } from './timeline';
import { ToastDesignTokens } from './toast';
import { ToggleButtonDesignTokens } from './togglebutton';
import { ToggleSwitchDesignTokens } from './toggleswitch';
import { ToolbarDesignTokens } from './toolbar';
import { TooltipDesignTokens } from './tooltip';
import { TreeDesignTokens } from './tree';
import { TreeSelectDesignTokens } from './treeselect';
import { TreeTableDesignTokens } from './treetable';
import { VirtualScrollerDesignTokens } from './virtualscroller';

/**
 *
 * [Live Demo](https://www.primeng.org/)
 *
 * @module themes
 *
 */
export interface ColorSchemeDesignToken<T> {
    colorScheme?: {
        light?: Omit<T, 'colorScheme'>;
        dark?: Omit<T, 'colorScheme'>;
    };
}

export interface DesignTokens<T> extends ColorSchemeDesignToken<T> {
    css?: any;
    extend?: {
        [key: string]: any;
    };
}

export interface PaletteDesignToken {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
    950?: string;
}

export interface ComponentsDesignTokens {
    accordion?: AccordionDesignTokens;
    autocomplete?: AutoCompleteDesignTokens;
    avatar?: AvatarDesignTokens;
    badge?: BadgeDesignTokens;
    blockui?: BlockUIDesignTokens;
    breadcrumb?: BreadcrumbDesignTokens;
    button?: ButtonDesignTokens;
    datepicker?: DatePickerDesignTokens;
    card?: CardDesignTokens;
    carousel?: CarouselDesignTokens;
    cascadeselect?: CascadeSelectDesignTokens;
    checkbox?: CheckboxDesignTokens;
    chip?: ChipDesignTokens;
    colorpicker?: ColorPickerDesignTokens;
    confirmdialog?: ConfirmDialogDesignTokens;
    confirmpopup?: ConfirmPopupDesignTokens;
    contextmenu?: ContextMenuDesignTokens;
    dataview?: DataViewDesignTokens;
    datatable?: DataTableDesignTokens;
    dialog?: DialogDesignTokens;
    divider?: DividerDesignTokens;
    dock?: DockDesignTokens;
    drawer?: DrawerDesignTokens;
    editor?: EditorDesignTokens;
    fieldset?: FieldsetDesignTokens;
    fileupload?: FileUploadDesignTokens;
    iftalabel?: IftaLabelDesignTokens;
    floatlabel?: FloatLabelDesignTokens;
    galleria?: GalleriaDesignTokens;
    iconfield?: IconFieldDesignTokens;
    image?: ImageDesignTokens;
    imagecompare?: ImageCompareDesignTokens;
    inlinemessage?: InlineMessageDesignTokens;
    inplace?: InplaceDesignTokens;
    inputchips?: InputChipsDesignTokens;
    inputgroup?: InputGroupDesignTokens;
    inputnumber?: InputNumberDesignTokens;
    inputotp?: InputOtpDesignTokens;
    inputtext?: InputTextDesignTokens;
    knob?: KnobDesignTokens;
    listbox?: ListboxDesignTokens;
    megamenu?: MegaMenuDesignTokens;
    menu?: MenuDesignTokens;
    menubar?: MenubarDesignTokens;
    message?: MessageDesignTokens;
    metergroup?: MeterGroupDesignTokens;
    multiselect?: MultiSelectDesignTokens;
    orderlist?: OrderListDesignTokens;
    organizationchart?: OrganizationChartDesignTokens;
    overlaybadge?: OverlayBadgeDesignTokens;
    popover?: PopoverDesignTokens;
    paginator?: PaginatorDesignTokens;
    password?: PasswordDesignTokens;
    panel?: PanelDesignTokens;
    panelmenu?: PanelMenuDesignTokens;
    picklist?: PickListDesignTokens;
    progressbar?: ProgressBarDesignTokens;
    progressspinner?: ProgressSpinnerDesignTokens;
    radiobutton?: RadioButtonDesignTokens;
    rating?: RatingDesignTokens;
    scrollpanel?: ScrollPanelDesignTokens;
    select?: SelectDesignTokens;
    selectbutton?: SelectButtonDesignTokens;
    skeleton?: SkeletonDesignTokens;
    slider?: SliderDesignTokens;
    speeddial?: SpeedDialDesignTokens;
    splitter?: SplitterDesignTokens;
    splitbutton?: SplitButtonDesignTokens;
    stepper?: StepperDesignTokens;
    steps?: StepsDesignTokens;
    tabmenu?: TabmenuDesignTokens;
    tabs?: TabsDesignTokens;
    tabview?: TabViewDesignTokens;
    textarea?: TextareaDesignTokens;
    tieredmenu?: TieredMenuDesignTokens;
    tag?: TagDesignTokens;
    terminal?: TerminalDesignTokens;
    timeline?: TimelineDesignTokens;
    togglebutton?: ToggleButtonDesignTokens;
    toggleswitch?: ToggleSwitchDesignTokens;
    tree?: TreeDesignTokens;
    treeselect?: TreeSelectDesignTokens;
    treetable?: TreeTableDesignTokens;
    toast?: ToastDesignTokens;
    toolbar?: ToolbarDesignTokens;
    virtualscroller?: VirtualScrollerDesignTokens;
    tooltip?: TooltipDesignTokens;
    ripple?: RippleDesignTokens;
    [key: string]: any;
}

export type Preset<T extends object> = {
    // base tokens
    [K in keyof T]?: T[K];
} & {
    components?: ComponentsDesignTokens;
};
