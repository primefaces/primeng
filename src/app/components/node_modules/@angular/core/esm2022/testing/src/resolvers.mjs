/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Component, Directive, NgModule, Pipe, ɵReflectionCapabilities as ReflectionCapabilities } from '@angular/core';
import { MetadataOverrider } from './metadata_overrider';
const reflection = new ReflectionCapabilities();
/**
 * Allows to override ivy metadata for tests (via the `TestBed`).
 */
class OverrideResolver {
    constructor() {
        this.overrides = new Map();
        this.resolved = new Map();
    }
    addOverride(type, override) {
        const overrides = this.overrides.get(type) || [];
        overrides.push(override);
        this.overrides.set(type, overrides);
        this.resolved.delete(type);
    }
    setOverrides(overrides) {
        this.overrides.clear();
        overrides.forEach(([type, override]) => {
            this.addOverride(type, override);
        });
    }
    getAnnotation(type) {
        const annotations = reflection.annotations(type);
        // Try to find the nearest known Type annotation and make sure that this annotation is an
        // instance of the type we are looking for, so we can use it for resolution. Note: there might
        // be multiple known annotations found due to the fact that Components can extend Directives (so
        // both Directive and Component annotations would be present), so we always check if the known
        // annotation has the right type.
        for (let i = annotations.length - 1; i >= 0; i--) {
            const annotation = annotations[i];
            const isKnownType = annotation instanceof Directive || annotation instanceof Component ||
                annotation instanceof Pipe || annotation instanceof NgModule;
            if (isKnownType) {
                return annotation instanceof this.type ? annotation : null;
            }
        }
        return null;
    }
    resolve(type) {
        let resolved = this.resolved.get(type) || null;
        if (!resolved) {
            resolved = this.getAnnotation(type);
            if (resolved) {
                const overrides = this.overrides.get(type);
                if (overrides) {
                    const overrider = new MetadataOverrider();
                    overrides.forEach(override => {
                        resolved = overrider.overrideMetadata(this.type, resolved, override);
                    });
                }
            }
            this.resolved.set(type, resolved);
        }
        return resolved;
    }
}
export class DirectiveResolver extends OverrideResolver {
    get type() {
        return Directive;
    }
}
export class ComponentResolver extends OverrideResolver {
    get type() {
        return Component;
    }
}
export class PipeResolver extends OverrideResolver {
    get type() {
        return Pipe;
    }
}
export class NgModuleResolver extends OverrideResolver {
    get type() {
        return NgModule;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS90ZXN0aW5nL3NyYy9yZXNvbHZlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBUSx1QkFBdUIsSUFBSSxzQkFBc0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUc1SCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUV2RCxNQUFNLFVBQVUsR0FBRyxJQUFJLHNCQUFzQixFQUFFLENBQUM7QUFXaEQ7O0dBRUc7QUFDSCxNQUFlLGdCQUFnQjtJQUEvQjtRQUNVLGNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBb0MsQ0FBQztRQUN4RCxhQUFRLEdBQUcsSUFBSSxHQUFHLEVBQXFCLENBQUM7SUF1RGxELENBQUM7SUFuREMsV0FBVyxDQUFDLElBQWUsRUFBRSxRQUE2QjtRQUN4RCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakQsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELFlBQVksQ0FBQyxTQUFrRDtRQUM3RCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZCLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGFBQWEsQ0FBQyxJQUFlO1FBQzNCLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakQseUZBQXlGO1FBQ3pGLDhGQUE4RjtRQUM5RixnR0FBZ0c7UUFDaEcsOEZBQThGO1FBQzlGLGlDQUFpQztRQUNqQyxLQUFLLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNqRCxNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsTUFBTSxXQUFXLEdBQUcsVUFBVSxZQUFZLFNBQVMsSUFBSSxVQUFVLFlBQVksU0FBUztnQkFDbEYsVUFBVSxZQUFZLElBQUksSUFBSSxVQUFVLFlBQVksUUFBUSxDQUFDO1lBQ2pFLElBQUksV0FBVyxFQUFFLENBQUM7Z0JBQ2hCLE9BQU8sVUFBVSxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQTBCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUM3RSxDQUFDO1FBQ0gsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFlO1FBQ3JCLElBQUksUUFBUSxHQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQztRQUV2RCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDZCxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxJQUFJLFFBQVEsRUFBRSxDQUFDO2dCQUNiLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLFNBQVMsRUFBRSxDQUFDO29CQUNkLE1BQU0sU0FBUyxHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQztvQkFDMUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTt3QkFDM0IsUUFBUSxHQUFHLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDeEUsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztZQUNILENBQUM7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7Q0FDRjtBQUdELE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxnQkFBMkI7SUFDaEUsSUFBYSxJQUFJO1FBQ2YsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLGlCQUFrQixTQUFRLGdCQUEyQjtJQUNoRSxJQUFhLElBQUk7UUFDZixPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sWUFBYSxTQUFRLGdCQUFzQjtJQUN0RCxJQUFhLElBQUk7UUFDZixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxnQkFBMEI7SUFDOUQsSUFBYSxJQUFJO1FBQ2YsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50LCBEaXJlY3RpdmUsIE5nTW9kdWxlLCBQaXBlLCBUeXBlLCDJtVJlZmxlY3Rpb25DYXBhYmlsaXRpZXMgYXMgUmVmbGVjdGlvbkNhcGFiaWxpdGllc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TWV0YWRhdGFPdmVycmlkZX0gZnJvbSAnLi9tZXRhZGF0YV9vdmVycmlkZSc7XG5pbXBvcnQge01ldGFkYXRhT3ZlcnJpZGVyfSBmcm9tICcuL21ldGFkYXRhX292ZXJyaWRlcic7XG5cbmNvbnN0IHJlZmxlY3Rpb24gPSBuZXcgUmVmbGVjdGlvbkNhcGFiaWxpdGllcygpO1xuXG4vKipcbiAqIEJhc2UgaW50ZXJmYWNlIHRvIHJlc29sdmUgYEBDb21wb25lbnRgLCBgQERpcmVjdGl2ZWAsIGBAUGlwZWAgYW5kIGBATmdNb2R1bGVgLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlc29sdmVyPFQ+IHtcbiAgYWRkT3ZlcnJpZGUodHlwZTogVHlwZTxhbnk+LCBvdmVycmlkZTogTWV0YWRhdGFPdmVycmlkZTxUPik6IHZvaWQ7XG4gIHNldE92ZXJyaWRlcyhvdmVycmlkZXM6IEFycmF5PFtUeXBlPGFueT4sIE1ldGFkYXRhT3ZlcnJpZGU8VD5dPik6IHZvaWQ7XG4gIHJlc29sdmUodHlwZTogVHlwZTxhbnk+KTogVHxudWxsO1xufVxuXG4vKipcbiAqIEFsbG93cyB0byBvdmVycmlkZSBpdnkgbWV0YWRhdGEgZm9yIHRlc3RzICh2aWEgdGhlIGBUZXN0QmVkYCkuXG4gKi9cbmFic3RyYWN0IGNsYXNzIE92ZXJyaWRlUmVzb2x2ZXI8VD4gaW1wbGVtZW50cyBSZXNvbHZlcjxUPiB7XG4gIHByaXZhdGUgb3ZlcnJpZGVzID0gbmV3IE1hcDxUeXBlPGFueT4sIE1ldGFkYXRhT3ZlcnJpZGU8VD5bXT4oKTtcbiAgcHJpdmF0ZSByZXNvbHZlZCA9IG5ldyBNYXA8VHlwZTxhbnk+LCBUfG51bGw+KCk7XG5cbiAgYWJzdHJhY3QgZ2V0IHR5cGUoKTogYW55O1xuXG4gIGFkZE92ZXJyaWRlKHR5cGU6IFR5cGU8YW55Piwgb3ZlcnJpZGU6IE1ldGFkYXRhT3ZlcnJpZGU8VD4pIHtcbiAgICBjb25zdCBvdmVycmlkZXMgPSB0aGlzLm92ZXJyaWRlcy5nZXQodHlwZSkgfHwgW107XG4gICAgb3ZlcnJpZGVzLnB1c2gob3ZlcnJpZGUpO1xuICAgIHRoaXMub3ZlcnJpZGVzLnNldCh0eXBlLCBvdmVycmlkZXMpO1xuICAgIHRoaXMucmVzb2x2ZWQuZGVsZXRlKHR5cGUpO1xuICB9XG5cbiAgc2V0T3ZlcnJpZGVzKG92ZXJyaWRlczogQXJyYXk8W1R5cGU8YW55PiwgTWV0YWRhdGFPdmVycmlkZTxUPl0+KSB7XG4gICAgdGhpcy5vdmVycmlkZXMuY2xlYXIoKTtcbiAgICBvdmVycmlkZXMuZm9yRWFjaCgoW3R5cGUsIG92ZXJyaWRlXSkgPT4ge1xuICAgICAgdGhpcy5hZGRPdmVycmlkZSh0eXBlLCBvdmVycmlkZSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRBbm5vdGF0aW9uKHR5cGU6IFR5cGU8YW55Pik6IFR8bnVsbCB7XG4gICAgY29uc3QgYW5ub3RhdGlvbnMgPSByZWZsZWN0aW9uLmFubm90YXRpb25zKHR5cGUpO1xuICAgIC8vIFRyeSB0byBmaW5kIHRoZSBuZWFyZXN0IGtub3duIFR5cGUgYW5ub3RhdGlvbiBhbmQgbWFrZSBzdXJlIHRoYXQgdGhpcyBhbm5vdGF0aW9uIGlzIGFuXG4gICAgLy8gaW5zdGFuY2Ugb2YgdGhlIHR5cGUgd2UgYXJlIGxvb2tpbmcgZm9yLCBzbyB3ZSBjYW4gdXNlIGl0IGZvciByZXNvbHV0aW9uLiBOb3RlOiB0aGVyZSBtaWdodFxuICAgIC8vIGJlIG11bHRpcGxlIGtub3duIGFubm90YXRpb25zIGZvdW5kIGR1ZSB0byB0aGUgZmFjdCB0aGF0IENvbXBvbmVudHMgY2FuIGV4dGVuZCBEaXJlY3RpdmVzIChzb1xuICAgIC8vIGJvdGggRGlyZWN0aXZlIGFuZCBDb21wb25lbnQgYW5ub3RhdGlvbnMgd291bGQgYmUgcHJlc2VudCksIHNvIHdlIGFsd2F5cyBjaGVjayBpZiB0aGUga25vd25cbiAgICAvLyBhbm5vdGF0aW9uIGhhcyB0aGUgcmlnaHQgdHlwZS5cbiAgICBmb3IgKGxldCBpID0gYW5ub3RhdGlvbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGNvbnN0IGFubm90YXRpb24gPSBhbm5vdGF0aW9uc1tpXTtcbiAgICAgIGNvbnN0IGlzS25vd25UeXBlID0gYW5ub3RhdGlvbiBpbnN0YW5jZW9mIERpcmVjdGl2ZSB8fCBhbm5vdGF0aW9uIGluc3RhbmNlb2YgQ29tcG9uZW50IHx8XG4gICAgICAgICAgYW5ub3RhdGlvbiBpbnN0YW5jZW9mIFBpcGUgfHwgYW5ub3RhdGlvbiBpbnN0YW5jZW9mIE5nTW9kdWxlO1xuICAgICAgaWYgKGlzS25vd25UeXBlKSB7XG4gICAgICAgIHJldHVybiBhbm5vdGF0aW9uIGluc3RhbmNlb2YgdGhpcy50eXBlID8gYW5ub3RhdGlvbiBhcyB1bmtub3duIGFzIFQgOiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJlc29sdmUodHlwZTogVHlwZTxhbnk+KTogVHxudWxsIHtcbiAgICBsZXQgcmVzb2x2ZWQ6IFR8bnVsbCA9IHRoaXMucmVzb2x2ZWQuZ2V0KHR5cGUpIHx8IG51bGw7XG5cbiAgICBpZiAoIXJlc29sdmVkKSB7XG4gICAgICByZXNvbHZlZCA9IHRoaXMuZ2V0QW5ub3RhdGlvbih0eXBlKTtcbiAgICAgIGlmIChyZXNvbHZlZCkge1xuICAgICAgICBjb25zdCBvdmVycmlkZXMgPSB0aGlzLm92ZXJyaWRlcy5nZXQodHlwZSk7XG4gICAgICAgIGlmIChvdmVycmlkZXMpIHtcbiAgICAgICAgICBjb25zdCBvdmVycmlkZXIgPSBuZXcgTWV0YWRhdGFPdmVycmlkZXIoKTtcbiAgICAgICAgICBvdmVycmlkZXMuZm9yRWFjaChvdmVycmlkZSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlZCA9IG92ZXJyaWRlci5vdmVycmlkZU1ldGFkYXRhKHRoaXMudHlwZSwgcmVzb2x2ZWQhLCBvdmVycmlkZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMucmVzb2x2ZWQuc2V0KHR5cGUsIHJlc29sdmVkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzb2x2ZWQ7XG4gIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgRGlyZWN0aXZlUmVzb2x2ZXIgZXh0ZW5kcyBPdmVycmlkZVJlc29sdmVyPERpcmVjdGl2ZT4ge1xuICBvdmVycmlkZSBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gRGlyZWN0aXZlO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21wb25lbnRSZXNvbHZlciBleHRlbmRzIE92ZXJyaWRlUmVzb2x2ZXI8Q29tcG9uZW50PiB7XG4gIG92ZXJyaWRlIGdldCB0eXBlKCkge1xuICAgIHJldHVybiBDb21wb25lbnQ7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBpcGVSZXNvbHZlciBleHRlbmRzIE92ZXJyaWRlUmVzb2x2ZXI8UGlwZT4ge1xuICBvdmVycmlkZSBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gUGlwZTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTmdNb2R1bGVSZXNvbHZlciBleHRlbmRzIE92ZXJyaWRlUmVzb2x2ZXI8TmdNb2R1bGU+IHtcbiAgb3ZlcnJpZGUgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuIE5nTW9kdWxlO1xuICB9XG59XG4iXX0=