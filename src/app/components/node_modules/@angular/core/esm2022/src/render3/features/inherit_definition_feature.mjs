/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { RuntimeError } from '../../errors';
import { EMPTY_ARRAY, EMPTY_OBJ } from '../../util/empty';
import { fillProperties } from '../../util/property';
import { isComponentDef } from '../interfaces/type_checks';
import { mergeHostAttrs } from '../util/attrs_utils';
import { stringifyForError } from '../util/stringify_utils';
export function getSuperType(type) {
    return Object.getPrototypeOf(type.prototype).constructor;
}
/**
 * Merges the definition from a super class to a sub class.
 * @param definition The definition that is a SubClass of another directive of component
 *
 * @codeGenApi
 */
export function ɵɵInheritDefinitionFeature(definition) {
    let superType = getSuperType(definition.type);
    let shouldInheritFields = true;
    const inheritanceChain = [definition];
    while (superType) {
        let superDef = undefined;
        if (isComponentDef(definition)) {
            // Don't use getComponentDef/getDirectiveDef. This logic relies on inheritance.
            superDef = superType.ɵcmp || superType.ɵdir;
        }
        else {
            if (superType.ɵcmp) {
                throw new RuntimeError(903 /* RuntimeErrorCode.INVALID_INHERITANCE */, ngDevMode &&
                    `Directives cannot inherit Components. Directive ${stringifyForError(definition.type)} is attempting to extend component ${stringifyForError(superType)}`);
            }
            // Don't use getComponentDef/getDirectiveDef. This logic relies on inheritance.
            superDef = superType.ɵdir;
        }
        if (superDef) {
            if (shouldInheritFields) {
                inheritanceChain.push(superDef);
                // Some fields in the definition may be empty, if there were no values to put in them that
                // would've justified object creation. Unwrap them if necessary.
                const writeableDef = definition;
                writeableDef.inputs = maybeUnwrapEmpty(definition.inputs);
                writeableDef.inputTransforms = maybeUnwrapEmpty(definition.inputTransforms);
                writeableDef.declaredInputs = maybeUnwrapEmpty(definition.declaredInputs);
                writeableDef.outputs = maybeUnwrapEmpty(definition.outputs);
                // Merge hostBindings
                const superHostBindings = superDef.hostBindings;
                superHostBindings && inheritHostBindings(definition, superHostBindings);
                // Merge queries
                const superViewQuery = superDef.viewQuery;
                const superContentQueries = superDef.contentQueries;
                superViewQuery && inheritViewQuery(definition, superViewQuery);
                superContentQueries && inheritContentQueries(definition, superContentQueries);
                // Merge inputs and outputs
                mergeInputsWithTransforms(definition, superDef);
                fillProperties(definition.outputs, superDef.outputs);
                // Merge animations metadata.
                // If `superDef` is a Component, the `data` field is present (defaults to an empty object).
                if (isComponentDef(superDef) && superDef.data.animation) {
                    // If super def is a Component, the `definition` is also a Component, since Directives can
                    // not inherit Components (we throw an error above and cannot reach this code).
                    const defData = definition.data;
                    defData.animation = (defData.animation || []).concat(superDef.data.animation);
                }
            }
            // Run parent features
            const features = superDef.features;
            if (features) {
                for (let i = 0; i < features.length; i++) {
                    const feature = features[i];
                    if (feature && feature.ngInherit) {
                        feature(definition);
                    }
                    // If `InheritDefinitionFeature` is a part of the current `superDef`, it means that this
                    // def already has all the necessary information inherited from its super class(es), so we
                    // can stop merging fields from super classes. However we need to iterate through the
                    // prototype chain to look for classes that might contain other "features" (like
                    // NgOnChanges), which we should invoke for the original `definition`. We set the
                    // `shouldInheritFields` flag to indicate that, essentially skipping fields inheritance
                    // logic and only invoking functions from the "features" list.
                    if (feature === ɵɵInheritDefinitionFeature) {
                        shouldInheritFields = false;
                    }
                }
            }
        }
        superType = Object.getPrototypeOf(superType);
    }
    mergeHostAttrsAcrossInheritance(inheritanceChain);
}
function mergeInputsWithTransforms(target, source) {
    for (const key in source.inputs) {
        if (!source.inputs.hasOwnProperty(key)) {
            continue;
        }
        if (target.inputs.hasOwnProperty(key)) {
            continue;
        }
        const value = source.inputs[key];
        if (value === undefined) {
            continue;
        }
        target.inputs[key] = value;
        target.declaredInputs[key] = source.declaredInputs[key];
        // If the input is inherited, and we have a transform for it, we also inherit it.
        // Note that transforms should not be inherited if the input has its own metadata
        // in the `source` directive itself already (i.e. the input is re-declared/overridden).
        if (source.inputTransforms !== null) {
            // Note: transforms are stored with their minified names.
            // Perf: only access the minified name when there are source transforms.
            const minifiedName = Array.isArray(value) ? value[0] : value;
            if (!source.inputTransforms.hasOwnProperty(minifiedName)) {
                continue;
            }
            target.inputTransforms ??= {};
            target.inputTransforms[minifiedName] = source.inputTransforms[minifiedName];
        }
    }
}
/**
 * Merge the `hostAttrs` and `hostVars` from the inherited parent to the base class.
 *
 * @param inheritanceChain A list of `WritableDefs` starting at the top most type and listing
 * sub-types in order. For each type take the `hostAttrs` and `hostVars` and merge it with the child
 * type.
 */
function mergeHostAttrsAcrossInheritance(inheritanceChain) {
    let hostVars = 0;
    let hostAttrs = null;
    // We process the inheritance order from the base to the leaves here.
    for (let i = inheritanceChain.length - 1; i >= 0; i--) {
        const def = inheritanceChain[i];
        // For each `hostVars`, we need to add the superclass amount.
        def.hostVars = (hostVars += def.hostVars);
        // for each `hostAttrs` we need to merge it with superclass.
        def.hostAttrs =
            mergeHostAttrs(def.hostAttrs, hostAttrs = mergeHostAttrs(hostAttrs, def.hostAttrs));
    }
}
function maybeUnwrapEmpty(value) {
    if (value === EMPTY_OBJ) {
        return {};
    }
    else if (value === EMPTY_ARRAY) {
        return [];
    }
    else {
        return value;
    }
}
function inheritViewQuery(definition, superViewQuery) {
    const prevViewQuery = definition.viewQuery;
    if (prevViewQuery) {
        definition.viewQuery = (rf, ctx) => {
            superViewQuery(rf, ctx);
            prevViewQuery(rf, ctx);
        };
    }
    else {
        definition.viewQuery = superViewQuery;
    }
}
function inheritContentQueries(definition, superContentQueries) {
    const prevContentQueries = definition.contentQueries;
    if (prevContentQueries) {
        definition.contentQueries = (rf, ctx, directiveIndex) => {
            superContentQueries(rf, ctx, directiveIndex);
            prevContentQueries(rf, ctx, directiveIndex);
        };
    }
    else {
        definition.contentQueries = superContentQueries;
    }
}
function inheritHostBindings(definition, superHostBindings) {
    const prevHostBindings = definition.hostBindings;
    if (prevHostBindings) {
        definition.hostBindings = (rf, ctx) => {
            superHostBindings(rf, ctx);
            prevHostBindings(rf, ctx);
        };
    }
    else {
        definition.hostBindings = superHostBindings;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5oZXJpdF9kZWZpbml0aW9uX2ZlYXR1cmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2ZlYXR1cmVzL2luaGVyaXRfZGVmaW5pdGlvbl9mZWF0dXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQW1CLE1BQU0sY0FBYyxDQUFDO0FBRTVELE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBR25ELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFMUQsTUFBTSxVQUFVLFlBQVksQ0FBQyxJQUFlO0lBRTFDLE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDO0FBQzNELENBQUM7QUFJRDs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSwwQkFBMEIsQ0FBQyxVQUErQztJQUN4RixJQUFJLFNBQVMsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlDLElBQUksbUJBQW1CLEdBQUcsSUFBSSxDQUFDO0lBQy9CLE1BQU0sZ0JBQWdCLEdBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFckQsT0FBTyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLFFBQVEsR0FBa0QsU0FBUyxDQUFDO1FBQ3hFLElBQUksY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDL0IsK0VBQStFO1lBQy9FLFFBQVEsR0FBRyxTQUFTLENB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LENBQUMsWUFBWSxDQUFDO0lBQ2pELElBQUksZ0JBQWdCLEVBQUUsQ0FBQztRQUNyQixVQUFVLENBQUMsWUFBWSxHQUFHLENBQUMsRUFBZSxFQUFFLEdBQVEsRUFBRSxFQUFFO1lBQ3RELGlCQUFpQixDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMzQixnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztTQUFNLENBQUM7UUFDTixVQUFVLENBQUMsWUFBWSxHQUFHLGlCQUFpQixDQUFDO0lBQzlDLENBQUM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UnVudGltZUVycm9yLCBSdW50aW1lRXJyb3JDb2RlfSBmcm9tICcuLi8uLi9lcnJvcnMnO1xuaW1wb3J0IHtUeXBlLCBXcml0YWJsZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3R5cGUnO1xuaW1wb3J0IHtFTVBUWV9BUlJBWSwgRU1QVFlfT0JKfSBmcm9tICcuLi8uLi91dGlsL2VtcHR5JztcbmltcG9ydCB7ZmlsbFByb3BlcnRpZXN9IGZyb20gJy4uLy4uL3V0aWwvcHJvcGVydHknO1xuaW1wb3J0IHtDb21wb25lbnREZWYsIENvbnRlbnRRdWVyaWVzRnVuY3Rpb24sIERpcmVjdGl2ZURlZiwgRGlyZWN0aXZlRGVmRmVhdHVyZSwgSG9zdEJpbmRpbmdzRnVuY3Rpb24sIFJlbmRlckZsYWdzLCBWaWV3UXVlcmllc0Z1bmN0aW9ufSBmcm9tICcuLi9pbnRlcmZhY2VzL2RlZmluaXRpb24nO1xuaW1wb3J0IHtUQXR0cmlidXRlc30gZnJvbSAnLi4vaW50ZXJmYWNlcy9ub2RlJztcbmltcG9ydCB7aXNDb21wb25lbnREZWZ9IGZyb20gJy4uL2ludGVyZmFjZXMvdHlwZV9jaGVja3MnO1xuaW1wb3J0IHttZXJnZUhvc3RBdHRyc30gZnJvbSAnLi4vdXRpbC9hdHRyc191dGlscyc7XG5pbXBvcnQge3N0cmluZ2lmeUZvckVycm9yfSBmcm9tICcuLi91dGlsL3N0cmluZ2lmeV91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdXBlclR5cGUodHlwZTogVHlwZTxhbnk+KTogVHlwZTxhbnk+JlxuICAgIHvJtWNtcD86IENvbXBvbmVudERlZjxhbnk+LCDJtWRpcj86IERpcmVjdGl2ZURlZjxhbnk+fSB7XG4gIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2YodHlwZS5wcm90b3R5cGUpLmNvbnN0cnVjdG9yO1xufVxuXG50eXBlIFdyaXRhYmxlRGVmID0gV3JpdGFibGU8RGlyZWN0aXZlRGVmPGFueT58Q29tcG9uZW50RGVmPGFueT4+O1xuXG4vKipcbiAqIE1lcmdlcyB0aGUgZGVmaW5pdGlvbiBmcm9tIGEgc3VwZXIgY2xhc3MgdG8gYSBzdWIgY2xhc3MuXG4gKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiB0aGF0IGlzIGEgU3ViQ2xhc3Mgb2YgYW5vdGhlciBkaXJlY3RpdmUgb2YgY29tcG9uZW50XG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVJbmhlcml0RGVmaW5pdGlvbkZlYXR1cmUoZGVmaW5pdGlvbjogRGlyZWN0aXZlRGVmPGFueT58Q29tcG9uZW50RGVmPGFueT4pOiB2b2lkIHtcbiAgbGV0IHN1cGVyVHlwZSA9IGdldFN1cGVyVHlwZShkZWZpbml0aW9uLnR5cGUpO1xuICBsZXQgc2hvdWxkSW5oZXJpdEZpZWxkcyA9IHRydWU7XG4gIGNvbnN0IGluaGVyaXRhbmNlQ2hhaW46IFdyaXRhYmxlRGVmW10gPSBbZGVmaW5pdGlvbl07XG5cbiAgd2hpbGUgKHN1cGVyVHlwZSkge1xuICAgIGxldCBzdXBlckRlZjogRGlyZWN0aXZlRGVmPGFueT58Q29tcG9uZW50RGVmPGFueT58dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIGlmIChpc0NvbXBvbmVudERlZihkZWZpbml0aW9uKSkge1xuICAgICAgLy8gRG9uJ3QgdXNlIGdldENvbXBvbmVudERlZi9nZXREaXJlY3RpdmVEZWYuIFRoaXMgbG9naWMgcmVsaWVzIG9uIGluaGVyaXRhbmNlLlxuICAgICAgc3VwZXJEZWYgPSBzdXBlclR5cGUuybVjbXAgfHwgc3VwZXJUeXBlLsm1ZGlyO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc3VwZXJUeXBlLsm1Y21wKSB7XG4gICAgICAgIHRocm93IG5ldyBSdW50aW1lRXJyb3IoXG4gICAgICAgICAgICBSdW50aW1lRXJyb3JDb2RlLklOVkFMSURfSU5IRVJJVEFOQ0UsXG4gICAgICAgICAgICBuZ0Rldk1vZGUgJiZcbiAgICAgICAgICAgICAgICBgRGlyZWN0aXZlcyBjYW5ub3QgaW5oZXJpdCBDb21wb25lbnRzLiBEaXJlY3RpdmUgJHtcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5naWZ5Rm9yRXJyb3IoZGVmaW5pdGlvbi50eXBlKX0gaXMgYXR0ZW1wdGluZyB0byBleHRlbmQgY29tcG9uZW50ICR7XG4gICAgICAgICAgICAgICAgICAgIHN0cmluZ2lmeUZvckVycm9yKHN1cGVyVHlwZSl9YCk7XG4gICAgICB9XG4gICAgICAvLyBEb24ndCB1c2UgZ2V0Q29tcG9uZW50RGVmL2dldERpcmVjdGl2ZURlZi4gVGhpcyBsb2dpYyByZWxpZXMgb24gaW5oZXJpdGFuY2UuXG4gICAgICBzdXBlckRlZiA9IHN1cGVyVHlwZS7JtWRpcjtcbiAgICB9XG5cbiAgICBpZiAoc3VwZXJEZWYpIHtcbiAgICAgIGlmIChzaG91bGRJbmhlcml0RmllbGRzKSB7XG4gICAgICAgIGluaGVyaXRhbmNlQ2hhaW4ucHVzaChzdXBlckRlZik7XG4gICAgICAgIC8vIFNvbWUgZmllbGRzIGluIHRoZSBkZWZpbml0aW9uIG1heSBiZSBlbXB0eSwgaWYgdGhlcmUgd2VyZSBubyB2YWx1ZXMgdG8gcHV0IGluIHRoZW0gdGhhdFxuICAgICAgICAvLyB3b3VsZCd2ZSBqdXN0aWZpZWQgb2JqZWN0IGNyZWF0aW9uLiBVbndyYXAgdGhlbSBpZiBuZWNlc3NhcnkuXG4gICAgICAgIGNvbnN0IHdyaXRlYWJsZURlZiA9IGRlZmluaXRpb24gYXMgV3JpdGFibGVEZWY7XG4gICAgICAgIHdyaXRlYWJsZURlZi5pbnB1dHMgPSBtYXliZVVud3JhcEVtcHR5KGRlZmluaXRpb24uaW5wdXRzKTtcbiAgICAgICAgd3JpdGVhYmxlRGVmLmlucHV0VHJhbnNmb3JtcyA9IG1heWJlVW53cmFwRW1wdHkoZGVmaW5pdGlvbi5pbnB1dFRyYW5zZm9ybXMpO1xuICAgICAgICB3cml0ZWFibGVEZWYuZGVjbGFyZWRJbnB1dHMgPSBtYXliZVVud3JhcEVtcHR5KGRlZmluaXRpb24uZGVjbGFyZWRJbnB1dHMpO1xuICAgICAgICB3cml0ZWFibGVEZWYub3V0cHV0cyA9IG1heWJlVW53cmFwRW1wdHkoZGVmaW5pdGlvbi5vdXRwdXRzKTtcblxuICAgICAgICAvLyBNZXJnZSBob3N0QmluZGluZ3NcbiAgICAgICAgY29uc3Qgc3VwZXJIb3N0QmluZGluZ3MgPSBzdXBlckRlZi5ob3N0QmluZGluZ3M7XG4gICAgICAgIHN1cGVySG9zdEJpbmRpbmdzICYmIGluaGVyaXRIb3N0QmluZGluZ3MoZGVmaW5pdGlvbiwgc3VwZXJIb3N0QmluZGluZ3MpO1xuXG4gICAgICAgIC8vIE1lcmdlIHF1ZXJpZXNcbiAgICAgICAgY29uc3Qgc3VwZXJWaWV3UXVlcnkgPSBzdXBlckRlZi52aWV3UXVlcnk7XG4gICAgICAgIGNvbnN0IHN1cGVyQ29udGVudFF1ZXJpZXMgPSBzdXBlckRlZi5jb250ZW50UXVlcmllcztcbiAgICAgICAgc3VwZXJWaWV3UXVlcnkgJiYgaW5oZXJpdFZpZXdRdWVyeShkZWZpbml0aW9uLCBzdXBlclZpZXdRdWVyeSk7XG4gICAgICAgIHN1cGVyQ29udGVudFF1ZXJpZXMgJiYgaW5oZXJpdENvbnRlbnRRdWVyaWVzKGRlZmluaXRpb24sIHN1cGVyQ29udGVudFF1ZXJpZXMpO1xuXG4gICAgICAgIC8vIE1lcmdlIGlucHV0cyBhbmQgb3V0cHV0c1xuICAgICAgICBtZXJnZUlucHV0c1dpdGhUcmFuc2Zvcm1zKGRlZmluaXRpb24sIHN1cGVyRGVmKTtcbiAgICAgICAgZmlsbFByb3BlcnRpZXMoZGVmaW5pdGlvbi5vdXRwdXRzLCBzdXBlckRlZi5vdXRwdXRzKTtcblxuICAgICAgICAvLyBNZXJnZSBhbmltYXRpb25zIG1ldGFkYXRhLlxuICAgICAgICAvLyBJZiBgc3VwZXJEZWZgIGlzIGEgQ29tcG9uZW50LCB0aGUgYGRhdGFgIGZpZWxkIGlzIHByZXNlbnQgKGRlZmF1bHRzIHRvIGFuIGVtcHR5IG9iamVjdCkuXG4gICAgICAgIGlmIChpc0NvbXBvbmVudERlZihzdXBlckRlZikgJiYgc3VwZXJEZWYuZGF0YS5hbmltYXRpb24pIHtcbiAgICAgICAgICAvLyBJZiBzdXBlciBkZWYgaXMgYSBDb21wb25lbnQsIHRoZSBgZGVmaW5pdGlvbmAgaXMgYWxzbyBhIENvbXBvbmVudCwgc2luY2UgRGlyZWN0aXZlcyBjYW5cbiAgICAgICAgICAvLyBub3QgaW5oZXJpdCBDb21wb25lbnRzICh3ZSB0aHJvdyBhbiBlcnJvciBhYm92ZSBhbmQgY2Fubm90IHJlYWNoIHRoaXMgY29kZSkuXG4gICAgICAgICAgY29uc3QgZGVmRGF0YSA9IChkZWZpbml0aW9uIGFzIENvbXBvbmVudERlZjxhbnk+KS5kYXRhO1xuICAgICAgICAgIGRlZkRhdGEuYW5pbWF0aW9uID0gKGRlZkRhdGEuYW5pbWF0aW9uIHx8IFtdKS5jb25jYXQoc3VwZXJEZWYuZGF0YS5hbmltYXRpb24pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFJ1biBwYXJlbnQgZmVhdHVyZXNcbiAgICAgIGNvbnN0IGZlYXR1cmVzID0gc3VwZXJEZWYuZmVhdHVyZXM7XG4gICAgICBpZiAoZmVhdHVyZXMpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmZWF0dXJlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGZlYXR1cmUgPSBmZWF0dXJlc1tpXTtcbiAgICAgICAgICBpZiAoZmVhdHVyZSAmJiBmZWF0dXJlLm5nSW5oZXJpdCkge1xuICAgICAgICAgICAgKGZlYXR1cmUgYXMgRGlyZWN0aXZlRGVmRmVhdHVyZSkoZGVmaW5pdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIElmIGBJbmhlcml0RGVmaW5pdGlvbkZlYXR1cmVgIGlzIGEgcGFydCBvZiB0aGUgY3VycmVudCBgc3VwZXJEZWZgLCBpdCBtZWFucyB0aGF0IHRoaXNcbiAgICAgICAgICAvLyBkZWYgYWxyZWFkeSBoYXMgYWxsIHRoZSBuZWNlc3NhcnkgaW5mb3JtYXRpb24gaW5oZXJpdGVkIGZyb20gaXRzIHN1cGVyIGNsYXNzKGVzKSwgc28gd2VcbiAgICAgICAgICAvLyBjYW4gc3RvcCBtZXJnaW5nIGZpZWxkcyBmcm9tIHN1cGVyIGNsYXNzZXMuIEhvd2V2ZXIgd2UgbmVlZCB0byBpdGVyYXRlIHRocm91Z2ggdGhlXG4gICAgICAgICAgLy8gcHJvdG90eXBlIGNoYWluIHRvIGxvb2sgZm9yIGNsYXNzZXMgdGhhdCBtaWdodCBjb250YWluIG90aGVyIFwiZmVhdHVyZXNcIiAobGlrZVxuICAgICAgICAgIC8vIE5nT25DaGFuZ2VzKSwgd2hpY2ggd2Ugc2hvdWxkIGludm9rZSBmb3IgdGhlIG9yaWdpbmFsIGBkZWZpbml0aW9uYC4gV2Ugc2V0IHRoZVxuICAgICAgICAgIC8vIGBzaG91bGRJbmhlcml0RmllbGRzYCBmbGFnIHRvIGluZGljYXRlIHRoYXQsIGVzc2VudGlhbGx5IHNraXBwaW5nIGZpZWxkcyBpbmhlcml0YW5jZVxuICAgICAgICAgIC8vIGxvZ2ljIGFuZCBvbmx5IGludm9raW5nIGZ1bmN0aW9ucyBmcm9tIHRoZSBcImZlYXR1cmVzXCIgbGlzdC5cbiAgICAgICAgICBpZiAoZmVhdHVyZSA9PT0gybXJtUluaGVyaXREZWZpbml0aW9uRmVhdHVyZSkge1xuICAgICAgICAgICAgc2hvdWxkSW5oZXJpdEZpZWxkcyA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHN1cGVyVHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihzdXBlclR5cGUpO1xuICB9XG4gIG1lcmdlSG9zdEF0dHJzQWNyb3NzSW5oZXJpdGFuY2UoaW5oZXJpdGFuY2VDaGFpbik7XG59XG5cbmZ1bmN0aW9uIG1lcmdlSW5wdXRzV2l0aFRyYW5zZm9ybXM8VD4odGFyZ2V0OiBXcml0YWJsZURlZiwgc291cmNlOiBEaXJlY3RpdmVEZWY8YW55Pikge1xuICBmb3IgKGNvbnN0IGtleSBpbiBzb3VyY2UuaW5wdXRzKSB7XG4gICAgaWYgKCFzb3VyY2UuaW5wdXRzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAodGFyZ2V0LmlucHV0cy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSBzb3VyY2UuaW5wdXRzW2tleV07XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHRhcmdldC5pbnB1dHNba2V5XSA9IHZhbHVlO1xuICAgIHRhcmdldC5kZWNsYXJlZElucHV0c1trZXldID0gc291cmNlLmRlY2xhcmVkSW5wdXRzW2tleV07XG5cbiAgICAvLyBJZiB0aGUgaW5wdXQgaXMgaW5oZXJpdGVkLCBhbmQgd2UgaGF2ZSBhIHRyYW5zZm9ybSBmb3IgaXQsIHdlIGFsc28gaW5oZXJpdCBpdC5cbiAgICAvLyBOb3RlIHRoYXQgdHJhbnNmb3JtcyBzaG91bGQgbm90IGJlIGluaGVyaXRlZCBpZiB0aGUgaW5wdXQgaGFzIGl0cyBvd24gbWV0YWRhdGFcbiAgICAvLyBpbiB0aGUgYHNvdXJjZWAgZGlyZWN0aXZlIGl0c2VsZiBhbHJlYWR5IChpLmUuIHRoZSBpbnB1dCBpcyByZS1kZWNsYXJlZC9vdmVycmlkZGVuKS5cbiAgICBpZiAoc291cmNlLmlucHV0VHJhbnNmb3JtcyAhPT0gbnVsbCkge1xuICAgICAgLy8gTm90ZTogdHJhbnNmb3JtcyBhcmUgc3RvcmVkIHdpdGggdGhlaXIgbWluaWZpZWQgbmFtZXMuXG4gICAgICAvLyBQZXJmOiBvbmx5IGFjY2VzcyB0aGUgbWluaWZpZWQgbmFtZSB3aGVuIHRoZXJlIGFyZSBzb3VyY2UgdHJhbnNmb3Jtcy5cbiAgICAgIGNvbnN0IG1pbmlmaWVkTmFtZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWVbMF0gOiB2YWx1ZTtcbiAgICAgIGlmICghc291cmNlLmlucHV0VHJhbnNmb3Jtcy5oYXNPd25Qcm9wZXJ0eShtaW5pZmllZE5hbWUpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdGFyZ2V0LmlucHV0VHJhbnNmb3JtcyA/Pz0ge307XG4gICAgICB0YXJnZXQuaW5wdXRUcmFuc2Zvcm1zW21pbmlmaWVkTmFtZV0gPSBzb3VyY2UuaW5wdXRUcmFuc2Zvcm1zW21pbmlmaWVkTmFtZV07XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogTWVyZ2UgdGhlIGBob3N0QXR0cnNgIGFuZCBgaG9zdFZhcnNgIGZyb20gdGhlIGluaGVyaXRlZCBwYXJlbnQgdG8gdGhlIGJhc2UgY2xhc3MuXG4gKlxuICogQHBhcmFtIGluaGVyaXRhbmNlQ2hhaW4gQSBsaXN0IG9mIGBXcml0YWJsZURlZnNgIHN0YXJ0aW5nIGF0IHRoZSB0b3AgbW9zdCB0eXBlIGFuZCBsaXN0aW5nXG4gKiBzdWItdHlwZXMgaW4gb3JkZXIuIEZvciBlYWNoIHR5cGUgdGFrZSB0aGUgYGhvc3RBdHRyc2AgYW5kIGBob3N0VmFyc2AgYW5kIG1lcmdlIGl0IHdpdGggdGhlIGNoaWxkXG4gKiB0eXBlLlxuICovXG5mdW5jdGlvbiBtZXJnZUhvc3RBdHRyc0Fjcm9zc0luaGVyaXRhbmNlKGluaGVyaXRhbmNlQ2hhaW46IFdyaXRhYmxlRGVmW10pIHtcbiAgbGV0IGhvc3RWYXJzOiBudW1iZXIgPSAwO1xuICBsZXQgaG9zdEF0dHJzOiBUQXR0cmlidXRlc3xudWxsID0gbnVsbDtcbiAgLy8gV2UgcHJvY2VzcyB0aGUgaW5oZXJpdGFuY2Ugb3JkZXIgZnJvbSB0aGUgYmFzZSB0byB0aGUgbGVhdmVzIGhlcmUuXG4gIGZvciAobGV0IGkgPSBpbmhlcml0YW5jZUNoYWluLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgY29uc3QgZGVmID0gaW5oZXJpdGFuY2VDaGFpbltpXTtcbiAgICAvLyBGb3IgZWFjaCBgaG9zdFZhcnNgLCB3ZSBuZWVkIHRvIGFkZCB0aGUgc3VwZXJjbGFzcyBhbW91bnQuXG4gICAgZGVmLmhvc3RWYXJzID0gKGhvc3RWYXJzICs9IGRlZi5ob3N0VmFycyk7XG4gICAgLy8gZm9yIGVhY2ggYGhvc3RBdHRyc2Agd2UgbmVlZCB0byBtZXJnZSBpdCB3aXRoIHN1cGVyY2xhc3MuXG4gICAgZGVmLmhvc3RBdHRycyA9XG4gICAgICAgIG1lcmdlSG9zdEF0dHJzKGRlZi5ob3N0QXR0cnMsIGhvc3RBdHRycyA9IG1lcmdlSG9zdEF0dHJzKGhvc3RBdHRycywgZGVmLmhvc3RBdHRycykpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1heWJlVW53cmFwRW1wdHk8VD4odmFsdWU6IFRbXSk6IFRbXTtcbmZ1bmN0aW9uIG1heWJlVW53cmFwRW1wdHk8VD4odmFsdWU6IFQpOiBUO1xuZnVuY3Rpb24gbWF5YmVVbndyYXBFbXB0eSh2YWx1ZTogYW55KTogYW55IHtcbiAgaWYgKHZhbHVlID09PSBFTVBUWV9PQkopIHtcbiAgICByZXR1cm4ge307XG4gIH0gZWxzZSBpZiAodmFsdWUgPT09IEVNUFRZX0FSUkFZKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbmhlcml0Vmlld1F1ZXJ5KGRlZmluaXRpb246IFdyaXRhYmxlRGVmLCBzdXBlclZpZXdRdWVyeTogVmlld1F1ZXJpZXNGdW5jdGlvbjxhbnk+KSB7XG4gIGNvbnN0IHByZXZWaWV3UXVlcnkgPSBkZWZpbml0aW9uLnZpZXdRdWVyeTtcbiAgaWYgKHByZXZWaWV3UXVlcnkpIHtcbiAgICBkZWZpbml0aW9uLnZpZXdRdWVyeSA9IChyZiwgY3R4KSA9PiB7XG4gICAgICBzdXBlclZpZXdRdWVyeShyZiwgY3R4KTtcbiAgICAgIHByZXZWaWV3UXVlcnkocmYsIGN0eCk7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBkZWZpbml0aW9uLnZpZXdRdWVyeSA9IHN1cGVyVmlld1F1ZXJ5O1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaGVyaXRDb250ZW50UXVlcmllcyhcbiAgICBkZWZpbml0aW9uOiBXcml0YWJsZURlZiwgc3VwZXJDb250ZW50UXVlcmllczogQ29udGVudFF1ZXJpZXNGdW5jdGlvbjxhbnk+KSB7XG4gIGNvbnN0IHByZXZDb250ZW50UXVlcmllcyA9IGRlZmluaXRpb24uY29udGVudFF1ZXJpZXM7XG4gIGlmIChwcmV2Q29udGVudFF1ZXJpZXMpIHtcbiAgICBkZWZpbml0aW9uLmNvbnRlbnRRdWVyaWVzID0gKHJmLCBjdHgsIGRpcmVjdGl2ZUluZGV4KSA9PiB7XG4gICAgICBzdXBlckNvbnRlbnRRdWVyaWVzKHJmLCBjdHgsIGRpcmVjdGl2ZUluZGV4KTtcbiAgICAgIHByZXZDb250ZW50UXVlcmllcyhyZiwgY3R4LCBkaXJlY3RpdmVJbmRleCk7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBkZWZpbml0aW9uLmNvbnRlbnRRdWVyaWVzID0gc3VwZXJDb250ZW50UXVlcmllcztcbiAgfVxufVxuXG5mdW5jdGlvbiBpbmhlcml0SG9zdEJpbmRpbmdzKFxuICAgIGRlZmluaXRpb246IFdyaXRhYmxlRGVmLCBzdXBlckhvc3RCaW5kaW5nczogSG9zdEJpbmRpbmdzRnVuY3Rpb248YW55Pikge1xuICBjb25zdCBwcmV2SG9zdEJpbmRpbmdzID0gZGVmaW5pdGlvbi5ob3N0QmluZGluZ3M7XG4gIGlmIChwcmV2SG9zdEJpbmRpbmdzKSB7XG4gICAgZGVmaW5pdGlvbi5ob3N0QmluZGluZ3MgPSAocmY6IFJlbmRlckZsYWdzLCBjdHg6IGFueSkgPT4ge1xuICAgICAgc3VwZXJIb3N0QmluZGluZ3MocmYsIGN0eCk7XG4gICAgICBwcmV2SG9zdEJpbmRpbmdzKHJmLCBjdHgpO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgZGVmaW5pdGlvbi5ob3N0QmluZGluZ3MgPSBzdXBlckhvc3RCaW5kaW5ncztcbiAgfVxufVxuIl19