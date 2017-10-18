"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var GMap = (function () {
    function GMap(el, differs, cd, zone) {
        this.el = el;
        this.cd = cd;
        this.zone = zone;
        this.onMapClick = new core_1.EventEmitter();
        this.onOverlayClick = new core_1.EventEmitter();
        this.onOverlayDragStart = new core_1.EventEmitter();
        this.onOverlayDrag = new core_1.EventEmitter();
        this.onOverlayDragEnd = new core_1.EventEmitter();
        this.onMapReady = new core_1.EventEmitter();
        this.onMapDragEnd = new core_1.EventEmitter();
        this.onZoomChanged = new core_1.EventEmitter();
        this.differ = differs.find([]).create(null);
    }
    GMap.prototype.ngAfterViewChecked = function () {
        if (!this.map && this.el.nativeElement.offsetParent) {
            this.initialize();
        }
    };
    GMap.prototype.initialize = function () {
        var _this = this;
        this.map = new google.maps.Map(this.el.nativeElement.children[0], this.options);
        this.onMapReady.emit({
            map: this.map
        });
        if (this.overlays) {
            for (var _i = 0, _a = this.overlays; _i < _a.length; _i++) {
                var overlay = _a[_i];
                overlay.setMap(this.map);
                this.bindOverlayEvents(overlay);
            }
        }
        this.map.addListener('click', function (event) {
            _this.zone.run(function () {
                _this.onMapClick.emit(event);
            });
        });
        this.map.addListener('dragend', function (event) {
            _this.zone.run(function () {
                _this.onMapDragEnd.emit(event);
            });
        });
        this.map.addListener('zoom_changed', function (event) {
            _this.zone.run(function () {
                _this.onZoomChanged.emit(event);
            });
        });
    };
    GMap.prototype.bindOverlayEvents = function (overlay) {
        var _this = this;
        overlay.addListener('click', function (event) {
            _this.zone.run(function () {
                _this.onOverlayClick.emit({
                    originalEvent: event,
                    'overlay': overlay,
                    map: _this.map
                });
            });
        });
        if (overlay.getDraggable()) {
            this.bindDragEvents(overlay);
        }
    };
    GMap.prototype.ngDoCheck = function () {
        var _this = this;
        var changes = this.differ.diff(this.overlays);
        if (changes && this.map) {
            changes.forEachRemovedItem(function (record) { record.item.setMap(null); });
            changes.forEachAddedItem(function (record) {
                record.item.setMap(_this.map);
                record.item.addListener('click', function (event) {
                    _this.zone.run(function () {
                        _this.onOverlayClick.emit({
                            originalEvent: event,
                            overlay: record.item,
                            map: _this.map
                        });
                    });
                });
                if (record.item.getDraggable()) {
                    _this.bindDragEvents(record.item);
                }
            });
        }
    };
    GMap.prototype.bindDragEvents = function (overlay) {
        var _this = this;
        overlay.addListener('dragstart', function (event) {
            _this.zone.run(function () {
                _this.onOverlayDragStart.emit({
                    originalEvent: event,
                    overlay: overlay,
                    map: _this.map
                });
            });
        });
        overlay.addListener('drag', function (event) {
            _this.zone.run(function () {
                _this.onOverlayDrag.emit({
                    originalEvent: event,
                    overlay: overlay,
                    map: _this.map
                });
            });
        });
        overlay.addListener('dragend', function (event) {
            _this.zone.run(function () {
                _this.onOverlayDragEnd.emit({
                    originalEvent: event,
                    overlay: overlay,
                    map: _this.map
                });
            });
        });
    };
    GMap.prototype.getMap = function () {
        return this.map;
    };
    return GMap;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], GMap.prototype, "style", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], GMap.prototype, "styleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], GMap.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], GMap.prototype, "overlays", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GMap.prototype, "onMapClick", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GMap.prototype, "onOverlayClick", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GMap.prototype, "onOverlayDragStart", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GMap.prototype, "onOverlayDrag", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GMap.prototype, "onOverlayDragEnd", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GMap.prototype, "onMapReady", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GMap.prototype, "onMapDragEnd", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GMap.prototype, "onZoomChanged", void 0);
GMap = __decorate([
    core_1.Component({
        selector: 'p-gmap',
        template: "<div [ngStyle]=\"style\" [class]=\"styleClass\"></div>"
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.IterableDiffers, core_1.ChangeDetectorRef, core_1.NgZone])
], GMap);
exports.GMap = GMap;
var GMapModule = (function () {
    function GMapModule() {
    }
    return GMapModule;
}());
GMapModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        exports: [GMap],
        declarations: [GMap]
    })
], GMapModule);
exports.GMapModule = GMapModule;
//# sourceMappingURL=gmap.js.map