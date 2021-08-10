(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/dom'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define('primeng/slidemenu', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/dom', '@angular/router'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.slidemenu = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.dom, global.ng.router));
}(this, (function (exports, core, animations, common, dom, router) { 'use strict';

    var SlideMenuSub = /** @class */ (function () {
        function SlideMenuSub(slideMenu) {
            this.backLabel = 'Back';
            this.easing = 'ease-out';
            this.slideMenu = slideMenu;
        }
        SlideMenuSub.prototype.itemClick = function (event, item, listitem) {
            var _this = this;
            if (item.disabled) {
                event.preventDefault();
                return;
            }
            if (!item.url) {
                event.preventDefault();
            }
            if (item.command) {
                item.command({
                    originalEvent: event,
                    item: item
                });
            }
            if (item.items && !this.slideMenu.animating) {
                this.slideMenu.left -= this.slideMenu.menuWidth;
                this.activeItem = listitem;
                this.slideMenu.animating = true;
                setTimeout(function () { return _this.slideMenu.animating = false; }, this.effectDuration);
            }
            if (!item.items && this.slideMenu.popup) {
                this.slideMenu.hide();
            }
        };
        SlideMenuSub.prototype.ngOnDestroy = function () {
            this.activeItem = null;
        };
        return SlideMenuSub;
    }());
    SlideMenuSub.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-slideMenuSub',
                    template: "\n        <ul [ngClass]=\"{'p-slidemenu-rootlist':root, 'p-submenu-list':!root, 'p-active-submenu': (-slideMenu.left == (index * menuWidth))}\"\n            [style.width.px]=\"menuWidth\" [style.left.px]=\"root ? slideMenu.left : slideMenu.menuWidth\"\n            [style.transitionProperty]=\"root ? 'left' : 'none'\" [style.transitionDuration]=\"effectDuration + 'ms'\" [style.transitionTimingFunction]=\"easing\">\n            <ng-template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li *ngIf=\"child.separator\" class=\"p-menu-separator\" [ngClass]=\"{'p-hidden': child.visible === false}\">\n                <li *ngIf=\"!child.separator\" #listitem [ngClass]=\"{'p-menuitem':true,'p-menuitem-active':listitem==activeItem,'p-hidden': child.visible === false}\"\n                    [class]=\"child.styleClass\" [ngStyle]=\"child.style\">\n                    <a *ngIf=\"!child.routerLink\" [attr.href]=\"child.url\" class=\"p-menuitem-link\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\"\n                        [ngClass]=\"{'p-disabled':child.disabled}\" [attr.tabindex]=\"child.disabled ? null : '0'\"\n                        (click)=\"itemClick($event, child, listitem)\">\n                        <span class=\"p-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"p-menuitem-text\">{{child.label}}</span>\n                        <span class=\"p-submenu-icon pi pi-fw pi-angle-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" [routerLink]=\"child.routerLink\" [queryParams]=\"child.queryParams\" [routerLinkActive]=\"'p-menuitem-link-active'\"\n                        [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\" [href]=\"child.url\" class=\"p-menuitem-link\"\n                        [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" [attr.tabindex]=\"child.disabled ? null : '0'\"\n                        [ngClass]=\"{'p-disabled':child.disabled}\"\n                        (click)=\"itemClick($event, child, listitem)\"\n                        [fragment]=\"child.fragment\" [queryParamsHandling]=\"child.queryParamsHandling\" [preserveFragment]=\"child.preserveFragment\" [skipLocationChange]=\"child.skipLocationChange\" [replaceUrl]=\"child.replaceUrl\" [state]=\"child.state\">\n                        <span class=\"p-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"p-menuitem-text\">{{child.label}}</span>\n                        <span class=\"p-submenu-icon pi pi-fw pi-caret-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <p-slideMenuSub class=\"p-submenu\" [item]=\"child\" [index]=\"index + 1\" [menuWidth]=\"menuWidth\" *ngIf=\"child.items\"></p-slideMenuSub>\n                </li>\n            </ng-template>\n        </ul>\n    ",
                    encapsulation: core.ViewEncapsulation.None
                },] }
    ];
    SlideMenuSub.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return SlideMenu; }),] }] }
    ]; };
    SlideMenuSub.propDecorators = {
        item: [{ type: core.Input }],
        root: [{ type: core.Input }],
        backLabel: [{ type: core.Input }],
        menuWidth: [{ type: core.Input }],
        effectDuration: [{ type: core.Input }],
        easing: [{ type: core.Input }],
        index: [{ type: core.Input }]
    };
    var SlideMenu = /** @class */ (function () {
        function SlideMenu(el, renderer, cd) {
            this.el = el;
            this.renderer = renderer;
            this.cd = cd;
            this.menuWidth = 190;
            this.viewportHeight = 180;
            this.effectDuration = 250;
            this.easing = 'ease-out';
            this.backLabel = 'Back';
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
            this.hideTransitionOptions = '.1s linear';
            this.onShow = new core.EventEmitter();
            this.onHide = new core.EventEmitter();
            this.left = 0;
            this.animating = false;
        }
        SlideMenu.prototype.ngAfterViewChecked = function () {
            if (!this.viewportUpdated && !this.popup && this.containerViewChild) {
                this.updateViewPort();
                this.viewportUpdated = true;
            }
        };
        Object.defineProperty(SlideMenu.prototype, "container", {
            set: function (element) {
                this.containerViewChild = element;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SlideMenu.prototype, "backward", {
            set: function (element) {
                this.backwardViewChild = element;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SlideMenu.prototype, "slideMenuContent", {
            set: function (element) {
                this.slideMenuContentViewChild = element;
            },
            enumerable: false,
            configurable: true
        });
        SlideMenu.prototype.updateViewPort = function () {
            this.slideMenuContentViewChild.nativeElement.style.height = this.viewportHeight - dom.DomHandler.getHiddenElementOuterHeight(this.backwardViewChild.nativeElement) + 'px';
        };
        SlideMenu.prototype.toggle = function (event) {
            if (this.visible)
                this.hide();
            else
                this.show(event);
            this.preventDocumentDefault = true;
        };
        SlideMenu.prototype.show = function (event) {
            this.target = event.currentTarget;
            this.visible = true;
            this.preventDocumentDefault = true;
            this.cd.markForCheck();
        };
        SlideMenu.prototype.onOverlayAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                    if (this.popup) {
                        this.updateViewPort();
                        this.moveOnTop();
                        this.onShow.emit({});
                        this.appendOverlay();
                        dom.DomHandler.absolutePosition(this.containerViewChild.nativeElement, this.target);
                        this.bindDocumentClickListener();
                        this.bindDocumentResizeListener();
                        this.bindScrollListener();
                    }
                    break;
                case 'void':
                    this.onOverlayHide();
                    this.onHide.emit({});
                    break;
            }
        };
        SlideMenu.prototype.appendOverlay = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.containerViewChild.nativeElement);
                else
                    dom.DomHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
            }
        };
        SlideMenu.prototype.restoreOverlayAppend = function () {
            if (this.container && this.appendTo) {
                this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
            }
        };
        SlideMenu.prototype.moveOnTop = function () {
            if (this.autoZIndex) {
                this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
            }
        };
        SlideMenu.prototype.hide = function () {
            this.visible = false;
            this.cd.markForCheck();
        };
        SlideMenu.prototype.onWindowResize = function () {
            this.hide();
        };
        SlideMenu.prototype.onClick = function (event) {
            this.preventDocumentDefault = true;
        };
        SlideMenu.prototype.goBack = function () {
            this.left += this.menuWidth;
        };
        SlideMenu.prototype.bindDocumentClickListener = function () {
            var _this = this;
            if (!this.documentClickListener) {
                var documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
                this.documentClickListener = this.renderer.listen(documentTarget, 'click', function () {
                    if (!_this.preventDocumentDefault) {
                        _this.hide();
                        _this.cd.detectChanges();
                    }
                    _this.preventDocumentDefault = false;
                });
            }
        };
        SlideMenu.prototype.unbindDocumentClickListener = function () {
            if (this.documentClickListener) {
                this.documentClickListener();
                this.documentClickListener = null;
            }
        };
        SlideMenu.prototype.bindDocumentResizeListener = function () {
            this.documentResizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.documentResizeListener);
        };
        SlideMenu.prototype.unbindDocumentResizeListener = function () {
            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        };
        SlideMenu.prototype.bindScrollListener = function () {
            var _this = this;
            if (!this.scrollHandler) {
                this.scrollHandler = new dom.ConnectedOverlayScrollHandler(this.target, function () {
                    if (_this.visible) {
                        _this.hide();
                    }
                });
            }
            this.scrollHandler.bindScrollListener();
        };
        SlideMenu.prototype.unbindScrollListener = function () {
            if (this.scrollHandler) {
                this.scrollHandler.unbindScrollListener();
            }
        };
        SlideMenu.prototype.onOverlayHide = function () {
            this.unbindDocumentClickListener();
            this.unbindDocumentResizeListener();
            this.unbindScrollListener();
            this.preventDocumentDefault = false;
            this.target = null;
            this.left = 0;
        };
        SlideMenu.prototype.ngOnDestroy = function () {
            if (this.popup) {
                if (this.scrollHandler) {
                    this.scrollHandler.destroy();
                    this.scrollHandler = null;
                }
                this.restoreOverlayAppend();
                this.onOverlayHide();
            }
        };
        return SlideMenu;
    }());
    SlideMenu.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-slideMenu',
                    template: "\n        <div #container [ngClass]=\"{'p-slidemenu p-component':true, 'p-slidemenu-overlay':popup}\"\n            [class]=\"styleClass\" [ngStyle]=\"style\" (click)=\"onClick($event)\"\n            [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" [@.disabled]=\"popup !== true\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" *ngIf=\"!popup || visible\">\n            <div class=\"p-slidemenu-wrapper\" [style.height]=\"left ? viewportHeight + 'px' : 'auto'\">\n                <div #slideMenuContent class=\"p-slidemenu-content\">\n                    <p-slideMenuSub [item]=\"model\" root=\"root\" [index]=\"0\" [menuWidth]=\"menuWidth\" [effectDuration]=\"effectDuration\" [easing]=\"easing\"></p-slideMenuSub>\n                </div>\n                <div #backward class=\"p-slidemenu-backward\" [style.display]=\"left ? 'block' : 'none'\" (click)=\"goBack()\">\n                    <span class=\"p-slidemenu-backward-icon pi pi-fw pi-caret-left\"></span><span>{{backLabel}}</span>\n                </div>\n            </div>\n        </div>\n    ",
                    animations: [
                        animations.trigger('overlayAnimation', [
                            animations.transition(':enter', [
                                animations.style({ opacity: 0, transform: 'scaleY(0.8)' }),
                                animations.animate('{{showTransitionParams}}')
                            ]),
                            animations.transition(':leave', [
                                animations.animate('{{hideTransitionParams}}', animations.style({ opacity: 0 }))
                            ])
                        ])
                    ],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-slidemenu{width:12.5rem}.p-slidemenu.p-slidemenu-overlay{position:absolute}.p-slidemenu ul{list-style:none;margin:0;padding:0}.p-slidemenu .p-slidemenu-rootlist{position:absolute;top:0}.p-slidemenu .p-submenu-list{display:none;position:absolute;top:0;width:12.5rem}.p-slidemenu .p-menuitem-link{align-items:center;cursor:pointer;display:flex;overflow:hidden;text-decoration:none}.p-slidemenu .p-menuitem-icon,.p-slidemenu .p-menuitem-text{vertical-align:middle}.p-slidemenu .p-menuitem{position:relative}.p-slidemenu .p-menuitem-link .p-submenu-icon{margin-left:auto}.p-slidemenu .p-slidemenu-wrapper{position:relative}.p-slidemenu .p-slidemenu-content{overflow-x:hidden;overflow-y:auto;position:relative}.p-slidemenu-backward{bottom:0;cursor:pointer;display:none;position:absolute;width:100%}.p-slidemenu-backward .p-slidemenu-backward-icon,.p-slidemenu-backward span{vertical-align:middle}.p-slidemenu .p-menuitem-active{position:static}.p-slidemenu .p-menuitem-active>.p-submenu>.p-submenu-list{display:block}.p-slidemenu .p-active-submenu>.p-menuitem-active>.p-submenu>.p-submenu-list,.p-slidemenu ul:not(.p-active-submenu)>.p-menuitem:not(.p-menuitem-active){display:none}.p-slidemenu .p-active-submenu>.p-menuitem-active~.p-menuitem{display:block}"]
                },] }
    ];
    SlideMenu.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.Renderer2 },
        { type: core.ChangeDetectorRef }
    ]; };
    SlideMenu.propDecorators = {
        model: [{ type: core.Input }],
        popup: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        menuWidth: [{ type: core.Input }],
        viewportHeight: [{ type: core.Input }],
        effectDuration: [{ type: core.Input }],
        easing: [{ type: core.Input }],
        backLabel: [{ type: core.Input }],
        appendTo: [{ type: core.Input }],
        autoZIndex: [{ type: core.Input }],
        baseZIndex: [{ type: core.Input }],
        showTransitionOptions: [{ type: core.Input }],
        hideTransitionOptions: [{ type: core.Input }],
        onShow: [{ type: core.Output }],
        onHide: [{ type: core.Output }],
        container: [{ type: core.ViewChild, args: ['container',] }],
        backward: [{ type: core.ViewChild, args: ['backward',] }],
        slideMenuContent: [{ type: core.ViewChild, args: ['slideMenuContent',] }]
    };
    var SlideMenuModule = /** @class */ (function () {
        function SlideMenuModule() {
        }
        return SlideMenuModule;
    }());
    SlideMenuModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, router.RouterModule],
                    exports: [SlideMenu, router.RouterModule],
                    declarations: [SlideMenu, SlideMenuSub]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.SlideMenu = SlideMenu;
    exports.SlideMenuModule = SlideMenuModule;
    exports.SlideMenuSub = SlideMenuSub;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-slidemenu.umd.js.map
