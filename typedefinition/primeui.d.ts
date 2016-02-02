// Type definitions for PrimeUI 3.0

/// <reference path="jqueryui.d.ts"/>

declare module PrimeUI {

    //puiinputtext
    interface InputTextOptions {
    }

    //puibutton
    interface ButtonOptions {
        value?: string;
        icon?: string;
        iconPos?: string;
        click?: (event?: Event) => void;
    }

    //Spinner
    interface SpinnerOptions {
        max?: number;
        min?: number;
        step?: number;
        prefix?: string;
        suffix?: string;
    }

    //Panel
    interface PanelOptions {
        toggleable?: boolean;
        toggleDuration?: any;
        toggleOrientation?: string;
        collapsed?: boolean;
        closable?: boolean;
        closeDuration: any;
        title?: string;
        beforeCollapse: (event?: Event) => void;
        afterCollapse: (event?: Event) => void;
        beforeExpand: (event?: Event) => void;
        afterExpand: (event?: Event) => void;
        beforeClose: (event?: Event) => void;
        afterClose: (event?: Event) => void;
        enhanced?: boolean;
    }

    //Fieldset
    interface FieldsetOptions {
        toggleable?: boolean;
        toggleDuration?: any;
        collapsed?: boolean;
        beforeToggle: (event?: Event, collapsed?: boolean) => void;
        afterToggle: (event?: Event, collapsed?: boolean) => void;
        enhanced?: boolean;
    }

    //Rating
    interface RatingOptions {
        stars?: number;
        cancel?: boolean;
        rate?: (event?: Event, value?: number) => void;
        oncancel?: (event?: Event) => void;
        disabled?: boolean;
        readonly?: boolean;
        value?: number;
    }

    //Password
    interface PasswordOptions {
        promptLabel?: string;
        weakLabel?: string;
        goodLabel?: string;
        strongLabel?: string;
        inline?: boolean;
    }

    //Dialog
    interface DialogOptions {
        title?: string;
        draggable?: boolean;
        resizable?: boolean;
        location?: string;
        minWidth?: number;
        minHeight?: number;
        height?: any;
        width?: any;
        visible?: boolean;
        modal?: boolean;
        showEffect?: string;
        hideEffect?: string;
        effectSpeed?: any;
        closeOnEscape?: boolean;
        rtl?: boolean;
        closable?: boolean;
        minimizable?: boolean;
        maximizable?: boolean;
        responsive?: boolean;
        beforeShow?: (event?: Event) => void;
        afterShow?: (event?: Event) => void;
        beforeHide?: (event?: Event) => void;
        afterHide?: (event?: Event) => void;
        minimize?: (event?: Event) => void;
        maximize?: (event?: Event) => void;
        enhanced?: boolean;
    }

    //Togglebutton
    interface ToggleButtonEventParams {
        checked?: boolean;
    }

    interface ToggleButtonOptions {
        onLabel?: string;
        offLabel?: string;
        onIcon?: string;
        offIcon?: string;
        change?: (event?: Event, ui?: ToggleButtonEventParams) => void;
        checked?: boolean;
        disabled?: boolean;
        style?: string;
        styleClass?: string;
    }

    //TabView
    interface TabViewEventParams {
        index?: number;
    }

    interface TabViewEffectOptions {
        name?: string;
        duration?: any;
    }

    interface TabViewOptions {
        activeIndex?: number;
        orientation?: string;
        effect?: TabViewEffectOptions;
        change?: (event?: Event, ui?: TabViewEventParams) => void;
        close?: (event?: Event, ui?: TabViewEventParams) => void;
    }

    //RadioButton
    interface RadioButtonOptions {
        value?: any;
    }

    //Accordion
    interface AccordionEventParams {
        index?: number;
    }

    interface AccordionOptions {
        activeIndex?: any;
        multiple?: boolean;
        change?: (event?: Event, ui?: AccordionEventParams) => void;
    }

    //InputTextarea
    interface InputTextareaOptions {
        autoResize?: boolean;
        autoComplete?: boolean;
        maxlength?: number;
        counter?: number;
        counterTemplate?: string;
        minQueryLength?: number;
        queryDelay?: number;
        completeSource?: Function;
    }

    //Galleria
    interface GalleriaOptions {
        panelWidth?: number;
        panelHeight?: number;
        frameWidth?: number;
        activeIndex?: number;
        showFilmstrip?: boolean;
        autoPlay?: boolean;
        transitionInterval?: number;
        effect?: string;
        effectSpeed?: any;
        showCaption?: boolean;
        customContent?: boolean;
    }

    //Listbox
    interface ListboxEventParams {
        value?: any;
        index?: any;
    }

    interface ListboxOptions {
        value?: any;
        scrollHeight?: number;
        content?: any;
        data?: any;
        template?: any;
        style?: string;
        styleClass?: string;
        multiple?: boolean;
        enhanced?: boolean;
        change?: (event?: Event, ui?: ListboxEventParams) => void;
    }

    //Growl
    interface GrowlOptions {
        sticky?: boolean;
        life?: number;
        appendTo?: any;
    }

    //Carousel
    interface CarouselOptions {
        numVisible?: number;
        firstVisible?: number;
        headerText?: string;
        effectDuration?: any;
        circular?: boolean;
        breakpoint?: boolean;
        responsive?: boolean;
        autoplayInterval?: number;
        easing?: string;
        pageLinks?: number;
        style?: string;
        styleClass?: string;
    }

    //InputSwitch
    interface InputSwitchEventParams {
        checked?: boolean;
    }

    interface InputSwichOptions {
        onLabel?: string;
        offLabel?: string;
        change?: (event?: Event, ui?: InputSwitchEventParams) => void;
    }

    //SelectButton
    interface SelectbuttonEventParams {
        value?: any;
        index?: any;
    }

    interface SelectbuttonOptions {
        value?: any;
        formfield?: string;
        unselectable?: boolean;
        tabindex?: number;
        style?: string;
        styleClass?: string;
        multiple?: boolean;
        enhanced?: boolean;
        change?: (event?: Event, ui?: ListboxEventParams) => void;
    }
}

interface JQuery {

    puiinputtext(): JQuery;
    puiinputtext(methodName: 'destroy'): void;
    puiinputtext(methodName: 'disable'): void;
    puiinputtext(methodName: 'enable'): void;
    puiinputtext(methodName: 'refresh'): void;
    puiinputtext(methodName: 'widget'): JQuery;
    puiinputtext(methodName: string): JQuery;
    puiinputtext(options: PrimeUI.InputTextOptions): JQuery;
    puiinputtext(optionLiteral: string, optionName: string): any;
    puiinputtext(optionLiteral: string, options: PrimeUI.InputTextOptions): any;
    puiinputtext(optionLiteral: string, optionName: string, optionValue: any): JQuery;

    puibutton(): JQuery;
    puibutton(methodName: 'destroy'): void;
    puibutton(methodName: 'disable'): void;
    puibutton(methodName: 'enable'): void;
    puibutton(methodName: 'refresh'): void;
    puibutton(methodName: 'widget'): JQuery;
    puibutton(methodName: string): JQuery;
    puibutton(options: PrimeUI.ButtonOptions): JQuery;
    puibutton(optionLiteral: string, optionName: string): any;
    puibutton(optionLiteral: string, options: PrimeUI.ButtonOptions): any;
    puibutton(optionLiteral: string, optionName: string, optionValue: any): JQuery;

    puispinner(): JQuery;
    puispinner(methodName: 'destroy'): void;
    puispinner(methodName: 'disable'): void;
    puispinner(methodName: 'enable'): void;
    puispinner(methodName: 'refresh'): void;
    puispinner(methodName: 'widget'): JQuery;
    puispinner(methodName: string): JQuery;
    puispinner(options: PrimeUI.SpinnerOptions): JQuery;
    puispinner(optionLiteral: string, optionName: string): any;
    puispinner(optionLiteral: string, options: PrimeUI.SpinnerOptions): any;
    puispinner(optionLiteral: string, optionName: string, optionValue: any): JQuery;

    puipanel(): JQuery;
    puipanel(methodName: 'destroy'): void;
    puipanel(methodName: 'disable'): void;
    puipanel(methodName: 'enable'): void;
    puipanel(methodName: 'refresh'): void;
    puipanel(methodName: 'widget'): JQuery;
    puipanel(methodName: string): JQuery;
    puipanel(options: PrimeUI.PanelOptions): JQuery;
    puipanel(optionLiteral: string, optionName: string): any;
    puipanel(optionLiteral: string, options: PrimeUI.PanelOptions): any;
    puipanel(optionLiteral: string, optionName: string, optionValue: any): JQuery;

    puifieldset(): JQuery;
    puifieldset(methodName: 'destroy'): void;
    puifieldset(methodName: 'disable'): void;
    puifieldset(methodName: 'enable'): void;
    puifieldset(methodName: 'refresh'): void;
    puifieldset(methodName: 'widget'): JQuery;
    puifieldset(methodName: string): JQuery;
    puifieldset(options: PrimeUI.FieldsetOptions): JQuery;
    puifieldset(optionLiteral: string, optionName: string): any;
    puifieldset(optionLiteral: string, options: PrimeUI.FieldsetOptions): any;
    puifieldset(optionLiteral: string, optionName: string, optionValue: any): JQuery;

    puirating(): JQuery;
    puirating(methodName: 'destroy'): void;
    puirating(methodName: 'disable'): void;
    puirating(methodName: 'enable'): void;
    puirating(methodName: 'refresh'): void;
    puirating(methodName: 'widget'): JQuery;
    puirating(methodName: string): JQuery;
    puirating(options: PrimeUI.RatingOptions): JQuery;
    puirating(optionLiteral: string, optionName: string): any;
    puirating(optionLiteral: string, options: PrimeUI.RatingOptions): any;
    puirating(optionLiteral: string, optionName: string, optionValue: any): JQuery;

    puipassword(): JQuery;
    puipassword(methodName: 'destroy'): void;
    puipassword(methodName: 'disable'): void;
    puipassword(methodName: 'enable'): void;
    puipassword(methodName: 'refresh'): void;
    puipassword(methodName: 'widget'): JQuery;
    puipassword(methodName: string): JQuery;
    puipassword(options: PrimeUI.PasswordOptions): JQuery;
    puipassword(optionLiteral: string, optionName: string): any;
    puipassword(optionLiteral: string, options: PrimeUI.PasswordOptions): any;
    puipassword(optionLiteral: string, optionName: string, optionValue: any): JQuery;

    puidialog(): JQuery;
    puidialog(methodName: 'destroy'): void;
    puidialog(methodName: 'disable'): void;
    puidialog(methodName: 'enable'): void;
    puidialog(methodName: 'refresh'): void;
    puidialog(methodName: 'widget'): JQuery;
    puidialog(methodName: string): JQuery;
    puidialog(options: PrimeUI.DialogOptions): JQuery;
    puidialog(optionLiteral: string, optionName: string): any;
    puidialog(optionLiteral: string, options: PrimeUI.DialogOptions): any;
    puidialog(optionLiteral: string, optionName: string, optionValue: any): JQuery;

    puitogglebutton(): JQuery;
    puitogglebutton(methodName: 'destroy'): void;
    puitogglebutton(methodName: 'disable'): void;
    puitogglebutton(methodName: 'enable'): void;
    puitogglebutton(methodName: 'refresh'): void;
    puitogglebutton(methodName: 'widget'): JQuery;
    puitogglebutton(methodName: string): JQuery;
    puitogglebutton(options: PrimeUI.ToggleButtonOptions): JQuery;
    puitogglebutton(optionLiteral: string, optionName: string): any;
    puitogglebutton(optionLiteral: string, options: PrimeUI.ToggleButtonOptions): any;
    puitogglebutton(optionLiteral: string, optionName: string, optionValue: any): JQuery;

    puitabview(): JQuery;
    puitabview(methodName: 'destroy'): void;
    puitabview(methodName: 'disable'): void;
    puitabview(methodName: 'enable'): void;
    puitabview(methodName: 'refresh'): void;
    puitabview(methodName: 'widget'): JQuery;
    puitabview(methodName: string): JQuery;
    puitabview(options: PrimeUI.TabViewOptions): JQuery;
    puitabview(optionLiteral: string, optionName: string): any;
    puitabview(optionLiteral: string, options: PrimeUI.TabViewOptions): any;
    puitabview(optionLiteral: string, optionName: string, optionValue: any): JQuery;

    puiradiobutton(): JQuery;
    puiradiobutton(methodName: 'destroy'): void;
    puiradiobutton(methodName: 'disable'): void;
    puiradiobutton(methodName: 'enable'): void;
    puiradiobutton(methodName: 'refresh'): void;
    puiradiobutton(methodName: 'widget'): JQuery;
    puiradiobutton(methodName: string): JQuery;
    puiradiobutton(options: PrimeUI.RadioButtonOptions): JQuery;
    puiradiobutton(optionLiteral: string, optionName: string): any;
    puiradiobutton(optionLiteral: string, options: PrimeUI.RadioButtonOptions): any;
    puiradiobutton(optionLiteral: string, optionName: string, optionValue: any): JQuery;

    puiaccordion(): JQuery;
    puiaccordion(methodName: 'destroy'): void;
    puiaccordion(methodName: 'disable'): void;
    puiaccordion(methodName: 'enable'): void;
    puiaccordion(methodName: 'refresh'): void;
    puiaccordion(methodName: 'widget'): JQuery;
    puiaccordion(methodName: string): JQuery;
    puiaccordion(options: PrimeUI.AccordionOptions): JQuery;
    puiaccordion(optionLiteral: string, optionName: string): any;
    puiaccordion(optionLiteral: string, options: PrimeUI.AccordionOptions): any;
    puiaccordion(optionLiteral: string, optionName: string, optionValue: any): JQuery;

    puiinputtextarea(): JQuery;
    puiinputtextarea(methodName: 'destroy'): void;
    puiinputtextarea(methodName: 'disable'): void;
    puiinputtextarea(methodName: 'enable'): void;
    puiinputtextarea(methodName: 'refresh'): void;
    puiinputtextarea(methodName: 'widget'): JQuery;
    puiinputtextarea(methodName: string): JQuery;
    puiinputtextarea(options: PrimeUI.InputTextareaOptions): JQuery;
    puiinputtextarea(optionLiteral: string, optionName: string): any;
    puiinputtextarea(optionLiteral: string, options: PrimeUI.InputTextareaOptions): any;
    puiinputtextarea(optionLiteral: string, optionName: string, optionValue: any): JQuery;

    puigalleria(): JQuery;
    puigalleria(methodName: 'destroy'): void;
    puigalleria(methodName: 'disable'): void;
    puigalleria(methodName: 'enable'): void;
    puigalleria(methodName: 'refresh'): void;
    puigalleria(methodName: 'widget'): JQuery;
    puigalleria(methodName: string): JQuery;
    puigalleria(options: PrimeUI.GalleriaOptions): JQuery;
    puigalleria(optionLiteral: string, optionName: string): any;
    puigalleria(optionLiteral: string, options: PrimeUI.GalleriaOptions): any;
    puigalleria(optionLiteral: string, optionName: string, optionValue: any): JQuery;

    puilistbox(): JQuery;
    puilistbox(methodName: 'destroy'): void;
    puilistbox(methodName: 'disable'): void;
    puilistbox(methodName: 'enable'): void;
    puilistbox(methodName: 'refresh'): void;
    puilistbox(methodName: 'widget'): JQuery;
    puilistbox(methodName: string): JQuery;
    puilistbox(options: PrimeUI.ListboxOptions): JQuery;
    puilistbox(optionLiteral: string, optionName: string): any;
    puilistbox(optionLiteral: string, options: PrimeUI.ListboxOptions): any;
    puilistbox(optionLiteral: string, optionName: string, optionValue: any): JQuery;

    puigrowl(): JQuery;
    puigrowl(methodName: 'destroy'): void;
    puigrowl(methodName: 'disable'): void;
    puigrowl(methodName: 'enable'): void;
    puigrowl(methodName: 'refresh'): void;
    puigrowl(methodName: 'widget'): JQuery;
    puigrowl(methodName: string): JQuery;
    puigrowl(options: PrimeUI.GrowlOptions): JQuery;
    puigrowl(optionLiteral: string, optionName: string): any;
    puigrowl(optionLiteral: string, options: PrimeUI.GrowlOptions): any;
    puigrowl(optionLiteral: string, optionName: string, optionValue: any): JQuery;

    puicarousel(): JQuery;
    puicarousel(methodName: 'destroy'): void;
    puicarousel(methodName: 'disable'): void;
    puicarousel(methodName: 'enable'): void;
    puicarousel(methodName: 'refresh'): void;
    puicarousel(methodName: 'widget'): JQuery;
    puicarousel(methodName: string): JQuery;
    puicarousel(options: PrimeUI.CarouselOptions): JQuery;
    puicarousel(optionLiteral: string, optionName: string): any;
    puicarousel(optionLiteral: string, options: PrimeUI.CarouselOptions): any;
    puicarousel(optionLiteral: string, optionName: string, optionValue: any): JQuery;

    puiswitch(): JQuery;
    puiswitch(methodName: 'destroy'): void;
    puiswitch(methodName: 'disable'): void;
    puiswitch(methodName: 'enable'): void;
    puiswitch(methodName: 'refresh'): void;
    puiswitch(methodName: 'widget'): JQuery;
    puiswitch(methodName: string): JQuery;
    puiswitch(options: PrimeUI.InputSwichOptions): JQuery;
    puiswitch(optionLiteral: string, optionName: string): any;
    puiswitch(optionLiteral: string, options: PrimeUI.InputSwichOptions): any;
    puiswitch(optionLiteral: string, optionName: string, optionValue: any): JQuery;

    puiselectbutton(): JQuery;
    puiselectbutton(methodName: 'destroy'): void;
    puiselectbutton(methodName: 'disable'): void;
    puiselectbutton(methodName: 'enable'): void;
    puiselectbutton(methodName: 'refresh'): void;
    puiselectbutton(methodName: 'widget'): JQuery;
    puiselectbutton(methodName: string): JQuery;
    puiselectbutton(options: PrimeUI.CarouselOptions): JQuery;
    puiselectbutton(optionLiteral: string, optionName: string): any;
    puiselectbutton(optionLiteral: string, options: PrimeUI.SelectbuttonOptions): any;
    puiselectbutton(optionLiteral: string, optionName: string, optionValue: any): JQuery;
}