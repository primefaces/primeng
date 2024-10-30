/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { concatStringsWithSpace } from '../../util/stringify';
import { assertFirstCreatePass } from '../assert';
import { getTView } from '../state';
/**
 * Compute the static styling (class/style) from `TAttributes`.
 *
 * This function should be called during `firstCreatePass` only.
 *
 * @param tNode The `TNode` into which the styling information should be loaded.
 * @param attrs `TAttributes` containing the styling information.
 * @param writeToHost Where should the resulting static styles be written?
 *   - `false` Write to `TNode.stylesWithoutHost` / `TNode.classesWithoutHost`
 *   - `true` Write to `TNode.styles` / `TNode.classes`
 */
export function computeStaticStyling(tNode, attrs, writeToHost) {
    ngDevMode &&
        assertFirstCreatePass(getTView(), 'Expecting to be called in first template pass only');
    let styles = writeToHost ? tNode.styles : null;
    let classes = writeToHost ? tNode.classes : null;
    let mode = 0;
    if (attrs !== null) {
        for (let i = 0; i < attrs.length; i++) {
            const value = attrs[i];
            if (typeof value === 'number') {
                mode = value;
            }
            else if (mode == 1 /* AttributeMarker.Classes */) {
                classes = concatStringsWithSpace(classes, value);
            }
            else if (mode == 2 /* AttributeMarker.Styles */) {
                const style = value;
                const styleValue = attrs[++i];
                styles = concatStringsWithSpace(styles, style + ': ' + styleValue + ';');
            }
        }
    }
    writeToHost ? tNode.styles = styles : tNode.stylesWithoutHost = styles;
    writeToHost ? tNode.classes = classes : tNode.classesWithoutHost = classes;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljX3N0eWxpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL3N0eWxpbmcvc3RhdGljX3N0eWxpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDNUQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBR2hELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFFbEM7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sVUFBVSxvQkFBb0IsQ0FDaEMsS0FBWSxFQUFFLEtBQXVCLEVBQUUsV0FBb0I7SUFDN0QsU0FBUztRQUNMLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxFQUFFLG9EQUFvRCxDQUFDLENBQUM7SUFDNUYsSUFBSSxNQUFNLEdBQWdCLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzVELElBQUksT0FBTyxHQUFnQixXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUM5RCxJQUFJLElBQUksR0FBc0IsQ0FBQyxDQUFDO0lBQ2hDLElBQUksS0FBSyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDdEMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQzlCLElBQUksR0FBRyxLQUFLLENBQUM7WUFDZixDQUFDO2lCQUFNLElBQUksSUFBSSxtQ0FBMkIsRUFBRSxDQUFDO2dCQUMzQyxPQUFPLEdBQUcsc0JBQXNCLENBQUMsT0FBTyxFQUFFLEtBQWUsQ0FBQyxDQUFDO1lBQzdELENBQUM7aUJBQU0sSUFBSSxJQUFJLGtDQUEwQixFQUFFLENBQUM7Z0JBQzFDLE1BQU0sS0FBSyxHQUFHLEtBQWUsQ0FBQztnQkFDOUIsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFXLENBQUM7Z0JBQ3hDLE1BQU0sR0FBRyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxHQUFHLElBQUksR0FBRyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDM0UsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBQ0QsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQztJQUN2RSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsT0FBTyxDQUFDO0FBQzdFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtjb25jYXRTdHJpbmdzV2l0aFNwYWNlfSBmcm9tICcuLi8uLi91dGlsL3N0cmluZ2lmeSc7XG5pbXBvcnQge2Fzc2VydEZpcnN0Q3JlYXRlUGFzc30gZnJvbSAnLi4vYXNzZXJ0JztcbmltcG9ydCB7IEF0dHJpYnV0ZU1hcmtlciB9IGZyb20gJy4uL2ludGVyZmFjZXMvYXR0cmlidXRlX21hcmtlcic7XG5pbXBvcnQge1RBdHRyaWJ1dGVzLCBUTm9kZX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9ub2RlJztcbmltcG9ydCB7Z2V0VFZpZXd9IGZyb20gJy4uL3N0YXRlJztcblxuLyoqXG4gKiBDb21wdXRlIHRoZSBzdGF0aWMgc3R5bGluZyAoY2xhc3Mvc3R5bGUpIGZyb20gYFRBdHRyaWJ1dGVzYC5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBiZSBjYWxsZWQgZHVyaW5nIGBmaXJzdENyZWF0ZVBhc3NgIG9ubHkuXG4gKlxuICogQHBhcmFtIHROb2RlIFRoZSBgVE5vZGVgIGludG8gd2hpY2ggdGhlIHN0eWxpbmcgaW5mb3JtYXRpb24gc2hvdWxkIGJlIGxvYWRlZC5cbiAqIEBwYXJhbSBhdHRycyBgVEF0dHJpYnV0ZXNgIGNvbnRhaW5pbmcgdGhlIHN0eWxpbmcgaW5mb3JtYXRpb24uXG4gKiBAcGFyYW0gd3JpdGVUb0hvc3QgV2hlcmUgc2hvdWxkIHRoZSByZXN1bHRpbmcgc3RhdGljIHN0eWxlcyBiZSB3cml0dGVuP1xuICogICAtIGBmYWxzZWAgV3JpdGUgdG8gYFROb2RlLnN0eWxlc1dpdGhvdXRIb3N0YCAvIGBUTm9kZS5jbGFzc2VzV2l0aG91dEhvc3RgXG4gKiAgIC0gYHRydWVgIFdyaXRlIHRvIGBUTm9kZS5zdHlsZXNgIC8gYFROb2RlLmNsYXNzZXNgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlU3RhdGljU3R5bGluZyhcbiAgICB0Tm9kZTogVE5vZGUsIGF0dHJzOiBUQXR0cmlidXRlc3xudWxsLCB3cml0ZVRvSG9zdDogYm9vbGVhbik6IHZvaWQge1xuICBuZ0Rldk1vZGUgJiZcbiAgICAgIGFzc2VydEZpcnN0Q3JlYXRlUGFzcyhnZXRUVmlldygpLCAnRXhwZWN0aW5nIHRvIGJlIGNhbGxlZCBpbiBmaXJzdCB0ZW1wbGF0ZSBwYXNzIG9ubHknKTtcbiAgbGV0IHN0eWxlczogc3RyaW5nfG51bGwgPSB3cml0ZVRvSG9zdCA/IHROb2RlLnN0eWxlcyA6IG51bGw7XG4gIGxldCBjbGFzc2VzOiBzdHJpbmd8bnVsbCA9IHdyaXRlVG9Ib3N0ID8gdE5vZGUuY2xhc3NlcyA6IG51bGw7XG4gIGxldCBtb2RlOiBBdHRyaWJ1dGVNYXJrZXJ8MCA9IDA7XG4gIGlmIChhdHRycyAhPT0gbnVsbCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXR0cnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gYXR0cnNbaV07XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICBtb2RlID0gdmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKG1vZGUgPT0gQXR0cmlidXRlTWFya2VyLkNsYXNzZXMpIHtcbiAgICAgICAgY2xhc3NlcyA9IGNvbmNhdFN0cmluZ3NXaXRoU3BhY2UoY2xhc3NlcywgdmFsdWUgYXMgc3RyaW5nKTtcbiAgICAgIH0gZWxzZSBpZiAobW9kZSA9PSBBdHRyaWJ1dGVNYXJrZXIuU3R5bGVzKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gdmFsdWUgYXMgc3RyaW5nO1xuICAgICAgICBjb25zdCBzdHlsZVZhbHVlID0gYXR0cnNbKytpXSBhcyBzdHJpbmc7XG4gICAgICAgIHN0eWxlcyA9IGNvbmNhdFN0cmluZ3NXaXRoU3BhY2Uoc3R5bGVzLCBzdHlsZSArICc6ICcgKyBzdHlsZVZhbHVlICsgJzsnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgd3JpdGVUb0hvc3QgPyB0Tm9kZS5zdHlsZXMgPSBzdHlsZXMgOiB0Tm9kZS5zdHlsZXNXaXRob3V0SG9zdCA9IHN0eWxlcztcbiAgd3JpdGVUb0hvc3QgPyB0Tm9kZS5jbGFzc2VzID0gY2xhc3NlcyA6IHROb2RlLmNsYXNzZXNXaXRob3V0SG9zdCA9IGNsYXNzZXM7XG59XG4iXX0=