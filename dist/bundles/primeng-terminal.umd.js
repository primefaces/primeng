(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common'), require('primeng/dom'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('primeng/terminal', ['exports', '@angular/core', '@angular/forms', '@angular/common', 'primeng/dom', 'rxjs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.terminal = {}), global.ng.core, global.ng.forms, global.ng.common, global.primeng.dom, global.rxjs));
}(this, (function (exports, core, forms, common, dom, rxjs) { 'use strict';

    var TerminalService = /** @class */ (function () {
        function TerminalService() {
            this.commandSource = new rxjs.Subject();
            this.responseSource = new rxjs.Subject();
            this.commandHandler = this.commandSource.asObservable();
            this.responseHandler = this.responseSource.asObservable();
        }
        TerminalService.prototype.sendCommand = function (command) {
            if (command) {
                this.commandSource.next(command);
            }
        };
        TerminalService.prototype.sendResponse = function (response) {
            if (response) {
                this.responseSource.next(response);
            }
        };
        return TerminalService;
    }());
    TerminalService.decorators = [
        { type: core.Injectable }
    ];

    var Terminal = /** @class */ (function () {
        function Terminal(el, terminalService, cd) {
            var _this = this;
            this.el = el;
            this.terminalService = terminalService;
            this.cd = cd;
            this.commands = [];
            this.subscription = terminalService.responseHandler.subscribe(function (response) {
                _this.commands[_this.commands.length - 1].response = response;
                _this.commandProcessed = true;
            });
        }
        Terminal.prototype.ngAfterViewInit = function () {
            this.container = dom.DomHandler.find(this.el.nativeElement, '.p-terminal')[0];
        };
        Terminal.prototype.ngAfterViewChecked = function () {
            if (this.commandProcessed) {
                this.container.scrollTop = this.container.scrollHeight;
                this.commandProcessed = false;
            }
        };
        Object.defineProperty(Terminal.prototype, "response", {
            set: function (value) {
                if (value) {
                    this.commands[this.commands.length - 1].response = value;
                    this.commandProcessed = true;
                }
            },
            enumerable: false,
            configurable: true
        });
        Terminal.prototype.handleCommand = function (event) {
            if (event.keyCode == 13) {
                this.commands.push({ text: this.command });
                this.terminalService.sendCommand(this.command);
                this.command = '';
            }
        };
        Terminal.prototype.focus = function (element) {
            element.focus();
        };
        Terminal.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        return Terminal;
    }());
    Terminal.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-terminal',
                    template: "\n        <div [ngClass]=\"'p-terminal p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\" (click)=\"focus(in)\">\n            <div *ngIf=\"welcomeMessage\">{{welcomeMessage}}</div>\n            <div class=\"p-terminal-content\">\n                <div *ngFor=\"let command of commands\">\n                    <span class=\"p-terminal-prompt\">{{prompt}}</span>\n                    <span class=\"p-terminal-command\">{{command.text}}</span>\n                    <div class=\"p-terminal-response\">{{command.response}}</div>\n                </div>\n            </div>\n            <div class=\"p-terminal-prompt-container\">\n                <span class=\"p-terminal-content-prompt\">{{prompt}}</span>\n                <input #in type=\"text\" [(ngModel)]=\"command\" class=\"p-terminal-input\" autocomplete=\"off\" (keydown)=\"handleCommand($event)\" autofocus>\n            </div>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-terminal{height:18rem;overflow:auto}.p-terminal-prompt-container{align-items:center;display:flex}.p-terminal-input{background-color:transparent;border:0;color:inherit;flex:1 1 auto;outline:0 none;padding:0}.p-terminal-input::-ms-clear{display:none}"]
                },] }
    ];
    Terminal.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: TerminalService },
        { type: core.ChangeDetectorRef }
    ]; };
    Terminal.propDecorators = {
        welcomeMessage: [{ type: core.Input }],
        prompt: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        response: [{ type: core.Input }]
    };
    var TerminalModule = /** @class */ (function () {
        function TerminalModule() {
        }
        return TerminalModule;
    }());
    TerminalModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, forms.FormsModule],
                    exports: [Terminal],
                    declarations: [Terminal]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Terminal = Terminal;
    exports.TerminalModule = TerminalModule;
    exports.TerminalService = TerminalService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-terminal.umd.js.map
