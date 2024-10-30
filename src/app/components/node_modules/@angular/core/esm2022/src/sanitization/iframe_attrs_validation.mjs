/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { RuntimeError } from '../errors';
import { getTemplateLocationDetails } from '../render3/instructions/element_validation';
import { RENDERER } from '../render3/interfaces/view';
import { nativeRemoveNode } from '../render3/node_manipulation';
import { getLView, getSelectedTNode } from '../render3/state';
import { getNativeByTNode } from '../render3/util/view_utils';
import { trustedHTMLFromString } from '../util/security/trusted_types';
/**
 * Validation function invoked at runtime for each binding that might potentially
 * represent a security-sensitive attribute of an <iframe>.
 * See `IFRAME_SECURITY_SENSITIVE_ATTRS` in the
 * `packages/compiler/src/schema/dom_security_schema.ts` script for the full list
 * of such attributes.
 *
 * @codeGenApi
 */
export function ɵɵvalidateIframeAttribute(attrValue, tagName, attrName) {
    const lView = getLView();
    const tNode = getSelectedTNode();
    const element = getNativeByTNode(tNode, lView);
    // Restrict any dynamic bindings of security-sensitive attributes/properties
    // on an <iframe> for security reasons.
    if (tNode.type === 2 /* TNodeType.Element */ && tagName.toLowerCase() === 'iframe') {
        const iframe = element;
        // Unset previously applied `src` and `srcdoc` if we come across a situation when
        // a security-sensitive attribute is set later via an attribute/property binding.
        iframe.src = '';
        iframe.srcdoc = trustedHTMLFromString('');
        // Also remove the <iframe> from the document.
        nativeRemoveNode(lView[RENDERER], iframe);
        const errorMessage = ngDevMode &&
            `Angular has detected that the \`${attrName}\` was applied ` +
                `as a binding to an <iframe>${getTemplateLocationDetails(lView)}. ` +
                `For security reasons, the \`${attrName}\` can be set on an <iframe> ` +
                `as a static attribute only. \n` +
                `To fix this, switch the \`${attrName}\` binding to a static attribute ` +
                `in a template or in host bindings section.`;
        throw new RuntimeError(-910 /* RuntimeErrorCode.UNSAFE_IFRAME_ATTRS */, errorMessage);
    }
    return attrValue;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lX2F0dHJzX3ZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9zYW5pdGl6YXRpb24vaWZyYW1lX2F0dHJzX3ZhbGlkYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBbUIsTUFBTSxXQUFXLENBQUM7QUFDekQsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFHdEYsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3BELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUM1RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUM1RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUdyRTs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSx5QkFBeUIsQ0FBQyxTQUFjLEVBQUUsT0FBZSxFQUFFLFFBQWdCO0lBQ3pGLE1BQU0sS0FBSyxHQUFHLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLE1BQU0sS0FBSyxHQUFHLGdCQUFnQixFQUFHLENBQUM7SUFDbEMsTUFBTSxPQUFPLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBd0IsQ0FBQztJQUV0RSw0RUFBNEU7SUFDNUUsdUNBQXVDO0lBQ3ZDLElBQUksS0FBSyxDQUFDLElBQUksOEJBQXNCLElBQUksT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLFFBQVEsRUFBRSxDQUFDO1FBQzNFLE1BQU0sTUFBTSxHQUFHLE9BQTRCLENBQUM7UUFFNUMsaUZBQWlGO1FBQ2pGLGlGQUFpRjtRQUNqRixNQUFNLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNoQixNQUFNLENBQUMsTUFBTSxHQUFHLHFCQUFxQixDQUFDLEVBQUUsQ0FBc0IsQ0FBQztRQUUvRCw4Q0FBOEM7UUFDOUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTFDLE1BQU0sWUFBWSxHQUFHLFNBQVM7WUFDMUIsbUNBQW1DLFFBQVEsaUJBQWlCO2dCQUN4RCw4QkFBOEIsMEJBQTBCLENBQUMsS0FBSyxDQUFDLElBQUk7Z0JBQ25FLCtCQUErQixRQUFRLCtCQUErQjtnQkFDdEUsZ0NBQWdDO2dCQUNoQyw2QkFBNkIsUUFBUSxtQ0FBbUM7Z0JBQ3hFLDRDQUE0QyxDQUFDO1FBQ3JELE1BQU0sSUFBSSxZQUFZLGtEQUF1QyxZQUFZLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1J1bnRpbWVFcnJvciwgUnVudGltZUVycm9yQ29kZX0gZnJvbSAnLi4vZXJyb3JzJztcbmltcG9ydCB7Z2V0VGVtcGxhdGVMb2NhdGlvbkRldGFpbHN9IGZyb20gJy4uL3JlbmRlcjMvaW5zdHJ1Y3Rpb25zL2VsZW1lbnRfdmFsaWRhdGlvbic7XG5pbXBvcnQge1ROb2RlVHlwZX0gZnJvbSAnLi4vcmVuZGVyMy9pbnRlcmZhY2VzL25vZGUnO1xuaW1wb3J0IHtSQ29tbWVudCwgUkVsZW1lbnR9IGZyb20gJy4uL3JlbmRlcjMvaW50ZXJmYWNlcy9yZW5kZXJlcl9kb20nO1xuaW1wb3J0IHtSRU5ERVJFUn0gZnJvbSAnLi4vcmVuZGVyMy9pbnRlcmZhY2VzL3ZpZXcnO1xuaW1wb3J0IHtuYXRpdmVSZW1vdmVOb2RlfSBmcm9tICcuLi9yZW5kZXIzL25vZGVfbWFuaXB1bGF0aW9uJztcbmltcG9ydCB7Z2V0TFZpZXcsIGdldFNlbGVjdGVkVE5vZGV9IGZyb20gJy4uL3JlbmRlcjMvc3RhdGUnO1xuaW1wb3J0IHtnZXROYXRpdmVCeVROb2RlfSBmcm9tICcuLi9yZW5kZXIzL3V0aWwvdmlld191dGlscyc7XG5pbXBvcnQge3RydXN0ZWRIVE1MRnJvbVN0cmluZ30gZnJvbSAnLi4vdXRpbC9zZWN1cml0eS90cnVzdGVkX3R5cGVzJztcblxuXG4vKipcbiAqIFZhbGlkYXRpb24gZnVuY3Rpb24gaW52b2tlZCBhdCBydW50aW1lIGZvciBlYWNoIGJpbmRpbmcgdGhhdCBtaWdodCBwb3RlbnRpYWxseVxuICogcmVwcmVzZW50IGEgc2VjdXJpdHktc2Vuc2l0aXZlIGF0dHJpYnV0ZSBvZiBhbiA8aWZyYW1lPi5cbiAqIFNlZSBgSUZSQU1FX1NFQ1VSSVRZX1NFTlNJVElWRV9BVFRSU2AgaW4gdGhlXG4gKiBgcGFja2FnZXMvY29tcGlsZXIvc3JjL3NjaGVtYS9kb21fc2VjdXJpdHlfc2NoZW1hLnRzYCBzY3JpcHQgZm9yIHRoZSBmdWxsIGxpc3RcbiAqIG9mIHN1Y2ggYXR0cmlidXRlcy5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtXZhbGlkYXRlSWZyYW1lQXR0cmlidXRlKGF0dHJWYWx1ZTogYW55LCB0YWdOYW1lOiBzdHJpbmcsIGF0dHJOYW1lOiBzdHJpbmcpIHtcbiAgY29uc3QgbFZpZXcgPSBnZXRMVmlldygpO1xuICBjb25zdCB0Tm9kZSA9IGdldFNlbGVjdGVkVE5vZGUoKSE7XG4gIGNvbnN0IGVsZW1lbnQgPSBnZXROYXRpdmVCeVROb2RlKHROb2RlLCBsVmlldykgYXMgUkVsZW1lbnQgfCBSQ29tbWVudDtcblxuICAvLyBSZXN0cmljdCBhbnkgZHluYW1pYyBiaW5kaW5ncyBvZiBzZWN1cml0eS1zZW5zaXRpdmUgYXR0cmlidXRlcy9wcm9wZXJ0aWVzXG4gIC8vIG9uIGFuIDxpZnJhbWU+IGZvciBzZWN1cml0eSByZWFzb25zLlxuICBpZiAodE5vZGUudHlwZSA9PT0gVE5vZGVUeXBlLkVsZW1lbnQgJiYgdGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaWZyYW1lJykge1xuICAgIGNvbnN0IGlmcmFtZSA9IGVsZW1lbnQgYXMgSFRNTElGcmFtZUVsZW1lbnQ7XG5cbiAgICAvLyBVbnNldCBwcmV2aW91c2x5IGFwcGxpZWQgYHNyY2AgYW5kIGBzcmNkb2NgIGlmIHdlIGNvbWUgYWNyb3NzIGEgc2l0dWF0aW9uIHdoZW5cbiAgICAvLyBhIHNlY3VyaXR5LXNlbnNpdGl2ZSBhdHRyaWJ1dGUgaXMgc2V0IGxhdGVyIHZpYSBhbiBhdHRyaWJ1dGUvcHJvcGVydHkgYmluZGluZy5cbiAgICBpZnJhbWUuc3JjID0gJyc7XG4gICAgaWZyYW1lLnNyY2RvYyA9IHRydXN0ZWRIVE1MRnJvbVN0cmluZygnJykgYXMgdW5rbm93biBhcyBzdHJpbmc7XG5cbiAgICAvLyBBbHNvIHJlbW92ZSB0aGUgPGlmcmFtZT4gZnJvbSB0aGUgZG9jdW1lbnQuXG4gICAgbmF0aXZlUmVtb3ZlTm9kZShsVmlld1tSRU5ERVJFUl0sIGlmcmFtZSk7XG5cbiAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBuZ0Rldk1vZGUgJiZcbiAgICAgICAgYEFuZ3VsYXIgaGFzIGRldGVjdGVkIHRoYXQgdGhlIFxcYCR7YXR0ck5hbWV9XFxgIHdhcyBhcHBsaWVkIGAgK1xuICAgICAgICAgICAgYGFzIGEgYmluZGluZyB0byBhbiA8aWZyYW1lPiR7Z2V0VGVtcGxhdGVMb2NhdGlvbkRldGFpbHMobFZpZXcpfS4gYCArXG4gICAgICAgICAgICBgRm9yIHNlY3VyaXR5IHJlYXNvbnMsIHRoZSBcXGAke2F0dHJOYW1lfVxcYCBjYW4gYmUgc2V0IG9uIGFuIDxpZnJhbWU+IGAgK1xuICAgICAgICAgICAgYGFzIGEgc3RhdGljIGF0dHJpYnV0ZSBvbmx5LiBcXG5gICtcbiAgICAgICAgICAgIGBUbyBmaXggdGhpcywgc3dpdGNoIHRoZSBcXGAke2F0dHJOYW1lfVxcYCBiaW5kaW5nIHRvIGEgc3RhdGljIGF0dHJpYnV0ZSBgICtcbiAgICAgICAgICAgIGBpbiBhIHRlbXBsYXRlIG9yIGluIGhvc3QgYmluZGluZ3Mgc2VjdGlvbi5gO1xuICAgIHRocm93IG5ldyBSdW50aW1lRXJyb3IoUnVudGltZUVycm9yQ29kZS5VTlNBRkVfSUZSQU1FX0FUVFJTLCBlcnJvck1lc3NhZ2UpO1xuICB9XG4gIHJldHVybiBhdHRyVmFsdWU7XG59XG4iXX0=