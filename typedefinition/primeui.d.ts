// Type definitions for PrimeUI 3.0

/// <reference path="jqueryui.d.ts"/>

declare module PrimeUI {

    interface InputTextOptions extends InputTextEvents {
    }

    interface InputTextEvents {
    }

    interface InputText extends Widget, InputTextOptions {
    }
}

interface JQuery {

    puiinputtext(): JQuery;
    puiinputtext(methodName: 'destroy'): void;
    puiinputtext(methodName: 'disable'): void;
    puiinputtext(methodName: 'enable'): void;

}