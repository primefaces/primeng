// Type definitions for PrimeUI 3.0

/// <reference path="jqueryui.d.ts"/>

declare module PrimeUI {

    //InputText
    interface InputTextOptions extends InputTextEvents {
    }

    interface InputTextEvents {
    }

    interface InputText extends JQueryUI.Widget, InputTextOptions {
    }

    //Button
    interface ButtonOptions {
        value?: string;
        icon?: string;
        iconPos?: string;
        click?: (event?: Event) => void;
    }

    interface Button extends JQueryUI.Widget, ButtonOptions {
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
}