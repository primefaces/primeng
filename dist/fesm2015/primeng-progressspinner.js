import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

class ProgressSpinner {
    constructor() {
        this.strokeWidth = "2";
        this.fill = "none";
        this.animationDuration = "2s";
    }
}
ProgressSpinner.decorators = [
    { type: Component, args: [{
                selector: 'p-progressSpinner',
                template: `
        <div class="p-progress-spinner" [ngStyle]="style" [ngClass]="styleClass"  role="alert" aria-busy="true">
            <svg class="p-progress-spinner-svg" viewBox="25 25 50 50" [style.animation-duration]="animationDuration">
                <circle class="p-progress-spinner-circle" cx="50" cy="50" r="20" [attr.fill]="fill" [attr.stroke-width]="strokeWidth" stroke-miterlimit="10"/>
            </svg>
        </div>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-progress-spinner{display:inline-block;height:100px;margin:0 auto;position:relative;width:100px}.p-progress-spinner:before{content:\"\";display:block;padding-top:100%}.p-progress-spinner-svg{animation:p-progress-spinner-rotate 2s linear infinite;bottom:0;height:100%;left:0;margin:auto;position:absolute;right:0;top:0;transform-origin:center center;width:100%}.p-progress-spinner-circle{animation:p-progress-spinner-dash 1.5s ease-in-out infinite,p-progress-spinner-color 6s ease-in-out infinite;stroke:#d62d20;stroke-dasharray:89,200;stroke-dashoffset:0;stroke-linecap:round}@keyframes p-progress-spinner-rotate{to{transform:rotate(1turn)}}@keyframes p-progress-spinner-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}to{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@keyframes p-progress-spinner-color{0%,to{stroke:#d62d20}40%{stroke:#0057e7}66%{stroke:#008744}80%,90%{stroke:#ffa700}}"]
            },] }
];
ProgressSpinner.propDecorators = {
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    strokeWidth: [{ type: Input }],
    fill: [{ type: Input }],
    animationDuration: [{ type: Input }]
};
class ProgressSpinnerModule {
}
ProgressSpinnerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [ProgressSpinner],
                declarations: [ProgressSpinner]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { ProgressSpinner, ProgressSpinnerModule };
//# sourceMappingURL=primeng-progressspinner.js.map
