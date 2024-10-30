/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵɵinjectAttribute } from '../render3/instructions/di_attr';
/**
 * Creates a token that can be used to inject static attributes of the host node.
 *
 * @usageNotes
 * ### Injecting an attribute that is known to exist
 * ```typescript
 * @Directive()
 * class MyDir {
 *   attr: string = inject(new HostAttributeToken('some-attr'));
 * }
 * ```
 *
 * ### Optionally injecting an attribute
 * ```typescript
 * @Directive()
 * class MyDir {
 *   attr: string | null = inject(new HostAttributeToken('some-attr'), {optional: true});
 * }
 * ```
 * @publicApi
 */
export class HostAttributeToken {
    constructor(attributeName) {
        this.attributeName = attributeName;
        /** @internal */
        this.__NG_ELEMENT_ID__ = () => ɵɵinjectAttribute(this.attributeName);
    }
    toString() {
        return `HostAttributeToken ${this.attributeName}`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9zdF9hdHRyaWJ1dGVfdG9rZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9kaS9ob3N0X2F0dHJpYnV0ZV90b2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUVsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLFlBQW9CLGFBQXFCO1FBQXJCLGtCQUFhLEdBQWIsYUFBYSxDQUFRO1FBRXpDLGdCQUFnQjtRQUNoQixzQkFBaUIsR0FBRyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFIcEIsQ0FBQztJQUs3QyxRQUFRO1FBQ04sT0FBTyxzQkFBc0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3BELENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge8m1ybVpbmplY3RBdHRyaWJ1dGV9IGZyb20gJy4uL3JlbmRlcjMvaW5zdHJ1Y3Rpb25zL2RpX2F0dHInO1xuXG4vKipcbiAqIENyZWF0ZXMgYSB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGluamVjdCBzdGF0aWMgYXR0cmlidXRlcyBvZiB0aGUgaG9zdCBub2RlLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiAjIyMgSW5qZWN0aW5nIGFuIGF0dHJpYnV0ZSB0aGF0IGlzIGtub3duIHRvIGV4aXN0XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBARGlyZWN0aXZlKClcbiAqIGNsYXNzIE15RGlyIHtcbiAqICAgYXR0cjogc3RyaW5nID0gaW5qZWN0KG5ldyBIb3N0QXR0cmlidXRlVG9rZW4oJ3NvbWUtYXR0cicpKTtcbiAqIH1cbiAqIGBgYFxuICpcbiAqICMjIyBPcHRpb25hbGx5IGluamVjdGluZyBhbiBhdHRyaWJ1dGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIEBEaXJlY3RpdmUoKVxuICogY2xhc3MgTXlEaXIge1xuICogICBhdHRyOiBzdHJpbmcgfCBudWxsID0gaW5qZWN0KG5ldyBIb3N0QXR0cmlidXRlVG9rZW4oJ3NvbWUtYXR0cicpLCB7b3B0aW9uYWw6IHRydWV9KTtcbiAqIH1cbiAqIGBgYFxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY2xhc3MgSG9zdEF0dHJpYnV0ZVRva2VuIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpIHt9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfX05HX0VMRU1FTlRfSURfXyA9ICgpID0+IMm1ybVpbmplY3RBdHRyaWJ1dGUodGhpcy5hdHRyaWJ1dGVOYW1lKTtcblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBgSG9zdEF0dHJpYnV0ZVRva2VuICR7dGhpcy5hdHRyaWJ1dGVOYW1lfWA7XG4gIH1cbn1cbiJdfQ==