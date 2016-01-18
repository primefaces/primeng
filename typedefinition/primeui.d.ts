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
        click?: (event?: Event): void;
    }
    //Spinner
    interface SpinnerOptions {
        max?: any; // number or string
        min?: any; // number or string
        step?: any; // number or string
        prefix?: any;
        suffix?: any;
        click?: (event?: Event) => void;
    }

    interface Spinner extends JQueryUI.Widget, SpinnerOptions {
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
}