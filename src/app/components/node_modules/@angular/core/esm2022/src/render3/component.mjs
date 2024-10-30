/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getNullInjector } from '../di/r3_injector';
import { ComponentFactory } from './component_ref';
import { getComponentDef } from './definition';
import { assertComponentDef } from './errors';
/**
 * Creates a `ComponentRef` instance based on provided component type and a set of options.
 *
 * @usageNotes
 *
 * The example below demonstrates how the `createComponent` function can be used
 * to create an instance of a ComponentRef dynamically and attach it to an ApplicationRef,
 * so that it gets included into change detection cycles.
 *
 * Note: the example uses standalone components, but the function can also be used for
 * non-standalone components (declared in an NgModule) as well.
 *
 * ```typescript
 * @Component({
 *   standalone: true,
 *   template: `Hello {{ name }}!`
 * })
 * class HelloComponent {
 *   name = 'Angular';
 * }
 *
 * @Component({
 *   standalone: true,
 *   template: `<div id="hello-component-host"></div>`
 * })
 * class RootComponent {}
 *
 * // Bootstrap an application.
 * const applicationRef = await bootstrapApplication(RootComponent);
 *
 * // Locate a DOM node that would be used as a host.
 * const hostElement = document.getElementById('hello-component-host');
 *
 * // Get an `EnvironmentInjector` instance from the `ApplicationRef`.
 * const environmentInjector = applicationRef.injector;
 *
 * // We can now create a `ComponentRef` instance.
 * const componentRef = createComponent(HelloComponent, {hostElement, environmentInjector});
 *
 * // Last step is to register the newly created ref using the `ApplicationRef` instance
 * // to include the component view into change detection cycles.
 * applicationRef.attachView(componentRef.hostView);
 * componentRef.changeDetectorRef.detectChanges();
 * ```
 *
 * @param component Component class reference.
 * @param options Set of options to use:
 *  * `environmentInjector`: An `EnvironmentInjector` instance to be used for the component, see
 * additional info about it [here](/guide/standalone-components#environment-injectors).
 *  * `hostElement` (optional): A DOM node that should act as a host node for the component. If not
 * provided, Angular creates one based on the tag name used in the component selector (and falls
 * back to using `div` if selector doesn't have tag name info).
 *  * `elementInjector` (optional): An `ElementInjector` instance, see additional info about it
 * [here](/guide/hierarchical-dependency-injection#elementinjector).
 *  * `projectableNodes` (optional): A list of DOM nodes that should be projected through
 *                      [`<ng-content>`](api/core/ng-content) of the new component instance.
 * @returns ComponentRef instance that represents a given Component.
 *
 * @publicApi
 */
export function createComponent(component, options) {
    ngDevMode && assertComponentDef(component);
    const componentDef = getComponentDef(component);
    const elementInjector = options.elementInjector || getNullInjector();
    const factory = new ComponentFactory(componentDef);
    return factory.create(elementInjector, options.projectableNodes, options.hostElement, options.environmentInjector);
}
/**
 * Creates an object that allows to retrieve component metadata.
 *
 * @usageNotes
 *
 * The example below demonstrates how to use the function and how the fields
 * of the returned object map to the component metadata.
 *
 * ```typescript
 * @Component({
 *   standalone: true,
 *   selector: 'foo-component',
 *   template: `
 *     <ng-content></ng-content>
 *     <ng-content select="content-selector-a"></ng-content>
 *   `,
 * })
 * class FooComponent {
 *   @Input('inputName') inputPropName: string;
 *   @Output('outputName') outputPropName = new EventEmitter<void>();
 * }
 *
 * const mirror = reflectComponentType(FooComponent);
 * expect(mirror.type).toBe(FooComponent);
 * expect(mirror.selector).toBe('foo-component');
 * expect(mirror.isStandalone).toBe(true);
 * expect(mirror.inputs).toEqual([{propName: 'inputName', templateName: 'inputPropName'}]);
 * expect(mirror.outputs).toEqual([{propName: 'outputName', templateName: 'outputPropName'}]);
 * expect(mirror.ngContentSelectors).toEqual([
 *   '*',                 // first `<ng-content>` in a template, the selector defaults to `*`
 *   'content-selector-a' // second `<ng-content>` in a template
 * ]);
 * ```
 *
 * @param component Component class reference.
 * @returns An object that allows to retrieve component metadata.
 *
 * @publicApi
 */
export function reflectComponentType(component) {
    const componentDef = getComponentDef(component);
    if (!componentDef)
        return null;
    const factory = new ComponentFactory(componentDef);
    return {
        get selector() {
            return factory.selector;
        },
        get type() {
            return factory.componentType;
        },
        get inputs() {
            return factory.inputs;
        },
        get outputs() {
            return factory.outputs;
        },
        get ngContentSelectors() {
            return factory.ngContentSelectors;
        },
        get isStandalone() {
            return componentDef.standalone;
        },
        get isSignal() {
            return componentDef.signals;
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBR0gsT0FBTyxFQUFzQixlQUFlLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUl2RSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzdDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUU1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyREc7QUFDSCxNQUFNLFVBQVUsZUFBZSxDQUFJLFNBQWtCLEVBQUUsT0FLdEQ7SUFDQyxTQUFTLElBQUksa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0MsTUFBTSxZQUFZLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBRSxDQUFDO0lBQ2pELE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxlQUFlLElBQUksZUFBZSxFQUFFLENBQUM7SUFDckUsTUFBTSxPQUFPLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBSSxZQUFZLENBQUMsQ0FBQztJQUN0RCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQ2pCLGVBQWUsRUFBRSxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNuRyxDQUFDO0FBNkNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNDRztBQUNILE1BQU0sVUFBVSxvQkFBb0IsQ0FBSSxTQUFrQjtJQUN4RCxNQUFNLFlBQVksR0FBRyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEQsSUFBSSxDQUFDLFlBQVk7UUFBRSxPQUFPLElBQUksQ0FBQztJQUUvQixNQUFNLE9BQU8sR0FBRyxJQUFJLGdCQUFnQixDQUFJLFlBQVksQ0FBQyxDQUFDO0lBQ3RELE9BQU87UUFDTCxJQUFJLFFBQVE7WUFDVixPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDMUIsQ0FBQztRQUNELElBQUksSUFBSTtZQUNOLE9BQU8sT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUMvQixDQUFDO1FBQ0QsSUFBSSxNQUFNO1lBS1IsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ3hCLENBQUM7UUFDRCxJQUFJLE9BQU87WUFDVCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDekIsQ0FBQztRQUNELElBQUksa0JBQWtCO1lBQ3BCLE9BQU8sT0FBTyxDQUFDLGtCQUFrQixDQUFDO1FBQ3BDLENBQUM7UUFDRCxJQUFJLFlBQVk7WUFDZCxPQUFPLFlBQVksQ0FBQyxVQUFVLENBQUM7UUFDakMsQ0FBQztRQUNELElBQUksUUFBUTtZQUNWLE9BQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQztRQUM5QixDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSAnLi4vZGkvaW5qZWN0b3InO1xuaW1wb3J0IHtFbnZpcm9ubWVudEluamVjdG9yLCBnZXROdWxsSW5qZWN0b3J9IGZyb20gJy4uL2RpL3IzX2luamVjdG9yJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3R5cGUnO1xuaW1wb3J0IHtDb21wb25lbnRSZWZ9IGZyb20gJy4uL2xpbmtlci9jb21wb25lbnRfZmFjdG9yeSc7XG5cbmltcG9ydCB7Q29tcG9uZW50RmFjdG9yeX0gZnJvbSAnLi9jb21wb25lbnRfcmVmJztcbmltcG9ydCB7Z2V0Q29tcG9uZW50RGVmfSBmcm9tICcuL2RlZmluaXRpb24nO1xuaW1wb3J0IHthc3NlcnRDb21wb25lbnREZWZ9IGZyb20gJy4vZXJyb3JzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgYENvbXBvbmVudFJlZmAgaW5zdGFuY2UgYmFzZWQgb24gcHJvdmlkZWQgY29tcG9uZW50IHR5cGUgYW5kIGEgc2V0IG9mIG9wdGlvbnMuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiBUaGUgZXhhbXBsZSBiZWxvdyBkZW1vbnN0cmF0ZXMgaG93IHRoZSBgY3JlYXRlQ29tcG9uZW50YCBmdW5jdGlvbiBjYW4gYmUgdXNlZFxuICogdG8gY3JlYXRlIGFuIGluc3RhbmNlIG9mIGEgQ29tcG9uZW50UmVmIGR5bmFtaWNhbGx5IGFuZCBhdHRhY2ggaXQgdG8gYW4gQXBwbGljYXRpb25SZWYsXG4gKiBzbyB0aGF0IGl0IGdldHMgaW5jbHVkZWQgaW50byBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlcy5cbiAqXG4gKiBOb3RlOiB0aGUgZXhhbXBsZSB1c2VzIHN0YW5kYWxvbmUgY29tcG9uZW50cywgYnV0IHRoZSBmdW5jdGlvbiBjYW4gYWxzbyBiZSB1c2VkIGZvclxuICogbm9uLXN0YW5kYWxvbmUgY29tcG9uZW50cyAoZGVjbGFyZWQgaW4gYW4gTmdNb2R1bGUpIGFzIHdlbGwuXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogQENvbXBvbmVudCh7XG4gKiAgIHN0YW5kYWxvbmU6IHRydWUsXG4gKiAgIHRlbXBsYXRlOiBgSGVsbG8ge3sgbmFtZSB9fSFgXG4gKiB9KVxuICogY2xhc3MgSGVsbG9Db21wb25lbnQge1xuICogICBuYW1lID0gJ0FuZ3VsYXInO1xuICogfVxuICpcbiAqIEBDb21wb25lbnQoe1xuICogICBzdGFuZGFsb25lOiB0cnVlLFxuICogICB0ZW1wbGF0ZTogYDxkaXYgaWQ9XCJoZWxsby1jb21wb25lbnQtaG9zdFwiPjwvZGl2PmBcbiAqIH0pXG4gKiBjbGFzcyBSb290Q29tcG9uZW50IHt9XG4gKlxuICogLy8gQm9vdHN0cmFwIGFuIGFwcGxpY2F0aW9uLlxuICogY29uc3QgYXBwbGljYXRpb25SZWYgPSBhd2FpdCBib290c3RyYXBBcHBsaWNhdGlvbihSb290Q29tcG9uZW50KTtcbiAqXG4gKiAvLyBMb2NhdGUgYSBET00gbm9kZSB0aGF0IHdvdWxkIGJlIHVzZWQgYXMgYSBob3N0LlxuICogY29uc3QgaG9zdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVsbG8tY29tcG9uZW50LWhvc3QnKTtcbiAqXG4gKiAvLyBHZXQgYW4gYEVudmlyb25tZW50SW5qZWN0b3JgIGluc3RhbmNlIGZyb20gdGhlIGBBcHBsaWNhdGlvblJlZmAuXG4gKiBjb25zdCBlbnZpcm9ubWVudEluamVjdG9yID0gYXBwbGljYXRpb25SZWYuaW5qZWN0b3I7XG4gKlxuICogLy8gV2UgY2FuIG5vdyBjcmVhdGUgYSBgQ29tcG9uZW50UmVmYCBpbnN0YW5jZS5cbiAqIGNvbnN0IGNvbXBvbmVudFJlZiA9IGNyZWF0ZUNvbXBvbmVudChIZWxsb0NvbXBvbmVudCwge2hvc3RFbGVtZW50LCBlbnZpcm9ubWVudEluamVjdG9yfSk7XG4gKlxuICogLy8gTGFzdCBzdGVwIGlzIHRvIHJlZ2lzdGVyIHRoZSBuZXdseSBjcmVhdGVkIHJlZiB1c2luZyB0aGUgYEFwcGxpY2F0aW9uUmVmYCBpbnN0YW5jZVxuICogLy8gdG8gaW5jbHVkZSB0aGUgY29tcG9uZW50IHZpZXcgaW50byBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlcy5cbiAqIGFwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAqIGNvbXBvbmVudFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gY29tcG9uZW50IENvbXBvbmVudCBjbGFzcyByZWZlcmVuY2UuXG4gKiBAcGFyYW0gb3B0aW9ucyBTZXQgb2Ygb3B0aW9ucyB0byB1c2U6XG4gKiAgKiBgZW52aXJvbm1lbnRJbmplY3RvcmA6IEFuIGBFbnZpcm9ubWVudEluamVjdG9yYCBpbnN0YW5jZSB0byBiZSB1c2VkIGZvciB0aGUgY29tcG9uZW50LCBzZWVcbiAqIGFkZGl0aW9uYWwgaW5mbyBhYm91dCBpdCBbaGVyZV0oL2d1aWRlL3N0YW5kYWxvbmUtY29tcG9uZW50cyNlbnZpcm9ubWVudC1pbmplY3RvcnMpLlxuICogICogYGhvc3RFbGVtZW50YCAob3B0aW9uYWwpOiBBIERPTSBub2RlIHRoYXQgc2hvdWxkIGFjdCBhcyBhIGhvc3Qgbm9kZSBmb3IgdGhlIGNvbXBvbmVudC4gSWYgbm90XG4gKiBwcm92aWRlZCwgQW5ndWxhciBjcmVhdGVzIG9uZSBiYXNlZCBvbiB0aGUgdGFnIG5hbWUgdXNlZCBpbiB0aGUgY29tcG9uZW50IHNlbGVjdG9yIChhbmQgZmFsbHNcbiAqIGJhY2sgdG8gdXNpbmcgYGRpdmAgaWYgc2VsZWN0b3IgZG9lc24ndCBoYXZlIHRhZyBuYW1lIGluZm8pLlxuICogICogYGVsZW1lbnRJbmplY3RvcmAgKG9wdGlvbmFsKTogQW4gYEVsZW1lbnRJbmplY3RvcmAgaW5zdGFuY2UsIHNlZSBhZGRpdGlvbmFsIGluZm8gYWJvdXQgaXRcbiAqIFtoZXJlXSgvZ3VpZGUvaGllcmFyY2hpY2FsLWRlcGVuZGVuY3ktaW5qZWN0aW9uI2VsZW1lbnRpbmplY3RvcikuXG4gKiAgKiBgcHJvamVjdGFibGVOb2Rlc2AgKG9wdGlvbmFsKTogQSBsaXN0IG9mIERPTSBub2RlcyB0aGF0IHNob3VsZCBiZSBwcm9qZWN0ZWQgdGhyb3VnaFxuICogICAgICAgICAgICAgICAgICAgICAgW2A8bmctY29udGVudD5gXShhcGkvY29yZS9uZy1jb250ZW50KSBvZiB0aGUgbmV3IGNvbXBvbmVudCBpbnN0YW5jZS5cbiAqIEByZXR1cm5zIENvbXBvbmVudFJlZiBpbnN0YW5jZSB0aGF0IHJlcHJlc2VudHMgYSBnaXZlbiBDb21wb25lbnQuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50PEM+KGNvbXBvbmVudDogVHlwZTxDPiwgb3B0aW9uczoge1xuICBlbnZpcm9ubWVudEluamVjdG9yOiBFbnZpcm9ubWVudEluamVjdG9yLFxuICBob3N0RWxlbWVudD86IEVsZW1lbnQsXG4gIGVsZW1lbnRJbmplY3Rvcj86IEluamVjdG9yLFxuICBwcm9qZWN0YWJsZU5vZGVzPzogTm9kZVtdW10sXG59KTogQ29tcG9uZW50UmVmPEM+IHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydENvbXBvbmVudERlZihjb21wb25lbnQpO1xuICBjb25zdCBjb21wb25lbnREZWYgPSBnZXRDb21wb25lbnREZWYoY29tcG9uZW50KSE7XG4gIGNvbnN0IGVsZW1lbnRJbmplY3RvciA9IG9wdGlvbnMuZWxlbWVudEluamVjdG9yIHx8IGdldE51bGxJbmplY3RvcigpO1xuICBjb25zdCBmYWN0b3J5ID0gbmV3IENvbXBvbmVudEZhY3Rvcnk8Qz4oY29tcG9uZW50RGVmKTtcbiAgcmV0dXJuIGZhY3RvcnkuY3JlYXRlKFxuICAgICAgZWxlbWVudEluamVjdG9yLCBvcHRpb25zLnByb2plY3RhYmxlTm9kZXMsIG9wdGlvbnMuaG9zdEVsZW1lbnQsIG9wdGlvbnMuZW52aXJvbm1lbnRJbmplY3Rvcik7XG59XG5cbi8qKlxuICogQW4gaW50ZXJmYWNlIHRoYXQgZGVzY3JpYmVzIHRoZSBzdWJzZXQgb2YgY29tcG9uZW50IG1ldGFkYXRhXG4gKiB0aGF0IGNhbiBiZSByZXRyaWV2ZWQgdXNpbmcgdGhlIGByZWZsZWN0Q29tcG9uZW50VHlwZWAgZnVuY3Rpb24uXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbXBvbmVudE1pcnJvcjxDPiB7XG4gIC8qKlxuICAgKiBUaGUgY29tcG9uZW50J3MgSFRNTCBzZWxlY3Rvci5cbiAgICovXG4gIGdldCBzZWxlY3RvcigpOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgdHlwZSBvZiBjb21wb25lbnQgdGhlIGZhY3Rvcnkgd2lsbCBjcmVhdGUuXG4gICAqL1xuICBnZXQgdHlwZSgpOiBUeXBlPEM+O1xuICAvKipcbiAgICogVGhlIGlucHV0cyBvZiB0aGUgY29tcG9uZW50LlxuICAgKi9cbiAgZ2V0IGlucHV0cygpOiBSZWFkb25seUFycmF5PHtcbiAgICByZWFkb25seSBwcm9wTmFtZTogc3RyaW5nLFxuICAgIHJlYWRvbmx5IHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIHJlYWRvbmx5IHRyYW5zZm9ybT86ICh2YWx1ZTogYW55KSA9PiBhbnksXG4gIH0+O1xuICAvKipcbiAgICogVGhlIG91dHB1dHMgb2YgdGhlIGNvbXBvbmVudC5cbiAgICovXG4gIGdldCBvdXRwdXRzKCk6IFJlYWRvbmx5QXJyYXk8e3JlYWRvbmx5IHByb3BOYW1lOiBzdHJpbmcsIHJlYWRvbmx5IHRlbXBsYXRlTmFtZTogc3RyaW5nfT47XG4gIC8qKlxuICAgKiBTZWxlY3RvciBmb3IgYWxsIDxuZy1jb250ZW50PiBlbGVtZW50cyBpbiB0aGUgY29tcG9uZW50LlxuICAgKi9cbiAgZ2V0IG5nQ29udGVudFNlbGVjdG9ycygpOiBSZWFkb25seUFycmF5PHN0cmluZz47XG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoaXMgY29tcG9uZW50IGlzIG1hcmtlZCBhcyBzdGFuZGFsb25lLlxuICAgKiBOb3RlOiBhbiBleHRyYSBmbGFnLCBub3QgcHJlc2VudCBpbiBgQ29tcG9uZW50RmFjdG9yeWAuXG4gICAqL1xuICBnZXQgaXNTdGFuZGFsb25lKCk6IGJvb2xlYW47XG4gIC8qKlxuICAgKiAvLyBUT0RPKHNpZ25hbHMpOiBSZW1vdmUgaW50ZXJuYWwgYW5kIGFkZCBwdWJsaWMgZG9jdW1lbnRhdGlvblxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGdldCBpc1NpZ25hbCgpOiBib29sZWFuO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gb2JqZWN0IHRoYXQgYWxsb3dzIHRvIHJldHJpZXZlIGNvbXBvbmVudCBtZXRhZGF0YS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqIFRoZSBleGFtcGxlIGJlbG93IGRlbW9uc3RyYXRlcyBob3cgdG8gdXNlIHRoZSBmdW5jdGlvbiBhbmQgaG93IHRoZSBmaWVsZHNcbiAqIG9mIHRoZSByZXR1cm5lZCBvYmplY3QgbWFwIHRvIHRoZSBjb21wb25lbnQgbWV0YWRhdGEuXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogQENvbXBvbmVudCh7XG4gKiAgIHN0YW5kYWxvbmU6IHRydWUsXG4gKiAgIHNlbGVjdG9yOiAnZm9vLWNvbXBvbmVudCcsXG4gKiAgIHRlbXBsYXRlOiBgXG4gKiAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICogICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNvbnRlbnQtc2VsZWN0b3ItYVwiPjwvbmctY29udGVudD5cbiAqICAgYCxcbiAqIH0pXG4gKiBjbGFzcyBGb29Db21wb25lbnQge1xuICogICBASW5wdXQoJ2lucHV0TmFtZScpIGlucHV0UHJvcE5hbWU6IHN0cmluZztcbiAqICAgQE91dHB1dCgnb3V0cHV0TmFtZScpIG91dHB1dFByb3BOYW1lID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICogfVxuICpcbiAqIGNvbnN0IG1pcnJvciA9IHJlZmxlY3RDb21wb25lbnRUeXBlKEZvb0NvbXBvbmVudCk7XG4gKiBleHBlY3QobWlycm9yLnR5cGUpLnRvQmUoRm9vQ29tcG9uZW50KTtcbiAqIGV4cGVjdChtaXJyb3Iuc2VsZWN0b3IpLnRvQmUoJ2Zvby1jb21wb25lbnQnKTtcbiAqIGV4cGVjdChtaXJyb3IuaXNTdGFuZGFsb25lKS50b0JlKHRydWUpO1xuICogZXhwZWN0KG1pcnJvci5pbnB1dHMpLnRvRXF1YWwoW3twcm9wTmFtZTogJ2lucHV0TmFtZScsIHRlbXBsYXRlTmFtZTogJ2lucHV0UHJvcE5hbWUnfV0pO1xuICogZXhwZWN0KG1pcnJvci5vdXRwdXRzKS50b0VxdWFsKFt7cHJvcE5hbWU6ICdvdXRwdXROYW1lJywgdGVtcGxhdGVOYW1lOiAnb3V0cHV0UHJvcE5hbWUnfV0pO1xuICogZXhwZWN0KG1pcnJvci5uZ0NvbnRlbnRTZWxlY3RvcnMpLnRvRXF1YWwoW1xuICogICAnKicsICAgICAgICAgICAgICAgICAvLyBmaXJzdCBgPG5nLWNvbnRlbnQ+YCBpbiBhIHRlbXBsYXRlLCB0aGUgc2VsZWN0b3IgZGVmYXVsdHMgdG8gYCpgXG4gKiAgICdjb250ZW50LXNlbGVjdG9yLWEnIC8vIHNlY29uZCBgPG5nLWNvbnRlbnQ+YCBpbiBhIHRlbXBsYXRlXG4gKiBdKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBjb21wb25lbnQgQ29tcG9uZW50IGNsYXNzIHJlZmVyZW5jZS5cbiAqIEByZXR1cm5zIEFuIG9iamVjdCB0aGF0IGFsbG93cyB0byByZXRyaWV2ZSBjb21wb25lbnQgbWV0YWRhdGEuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVmbGVjdENvbXBvbmVudFR5cGU8Qz4oY29tcG9uZW50OiBUeXBlPEM+KTogQ29tcG9uZW50TWlycm9yPEM+fG51bGwge1xuICBjb25zdCBjb21wb25lbnREZWYgPSBnZXRDb21wb25lbnREZWYoY29tcG9uZW50KTtcbiAgaWYgKCFjb21wb25lbnREZWYpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGZhY3RvcnkgPSBuZXcgQ29tcG9uZW50RmFjdG9yeTxDPihjb21wb25lbnREZWYpO1xuICByZXR1cm4ge1xuICAgIGdldCBzZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgcmV0dXJuIGZhY3Rvcnkuc2VsZWN0b3I7XG4gICAgfSxcbiAgICBnZXQgdHlwZSgpOiBUeXBlPEM+IHtcbiAgICAgIHJldHVybiBmYWN0b3J5LmNvbXBvbmVudFR5cGU7XG4gICAgfSxcbiAgICBnZXQgaW5wdXRzKCk6IFJlYWRvbmx5QXJyYXk8e1xuICAgICAgcHJvcE5hbWU6IHN0cmluZyxcbiAgICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgICAgdHJhbnNmb3JtPzogKHZhbHVlOiBhbnkpID0+IGFueSxcbiAgICB9PiB7XG4gICAgICByZXR1cm4gZmFjdG9yeS5pbnB1dHM7XG4gICAgfSxcbiAgICBnZXQgb3V0cHV0cygpOiBSZWFkb25seUFycmF5PHtwcm9wTmFtZTogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZ30+IHtcbiAgICAgIHJldHVybiBmYWN0b3J5Lm91dHB1dHM7XG4gICAgfSxcbiAgICBnZXQgbmdDb250ZW50U2VsZWN0b3JzKCk6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPiB7XG4gICAgICByZXR1cm4gZmFjdG9yeS5uZ0NvbnRlbnRTZWxlY3RvcnM7XG4gICAgfSxcbiAgICBnZXQgaXNTdGFuZGFsb25lKCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIGNvbXBvbmVudERlZi5zdGFuZGFsb25lO1xuICAgIH0sXG4gICAgZ2V0IGlzU2lnbmFsKCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIGNvbXBvbmVudERlZi5zaWduYWxzO1xuICAgIH0sXG4gIH07XG59XG4iXX0=