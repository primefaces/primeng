/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Defines the CSS styles encapsulation policies for the {@link Component} decorator's
 * `encapsulation` option.
 *
 * See {@link Component#encapsulation encapsulation}.
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/ts/metadata/encapsulation.ts region='longform'}
 *
 * @publicApi
 */
export var ViewEncapsulation;
(function (ViewEncapsulation) {
    // TODO: consider making `ViewEncapsulation` a `const enum` instead. See
    // https://github.com/angular/angular/issues/44119 for additional information.
    /**
     * Emulates a native Shadow DOM encapsulation behavior by adding a specific attribute to the
     * component's host element and applying the same attribute to all the CSS selectors provided
     * via {@link Component#styles styles} or {@link Component#styleUrls styleUrls}.
     *
     * This is the default option.
     */
    ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
    // Historically the 1 value was for `Native` encapsulation which has been removed as of v11.
    /**
     * Doesn't provide any sort of CSS style encapsulation, meaning that all the styles provided
     * via {@link Component#styles styles} or {@link Component#styleUrls styleUrls} are applicable
     * to any HTML element of the application regardless of their host Component.
     */
    ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
    /**
     * Uses the browser's native Shadow DOM API to encapsulate CSS styles, meaning that it creates
     * a ShadowRoot for the component's host element which is then used to encapsulate
     * all the Component's styling.
     */
    ViewEncapsulation[ViewEncapsulation["ShadowDom"] = 3] = "ShadowDom";
})(ViewEncapsulation || (ViewEncapsulation = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL21ldGFkYXRhL3ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUg7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsTUFBTSxDQUFOLElBQVksaUJBNEJYO0FBNUJELFdBQVksaUJBQWlCO0lBQzNCLHdFQUF3RTtJQUN4RSw4RUFBOEU7SUFFOUU7Ozs7OztPQU1HO0lBQ0gsaUVBQVksQ0FBQTtJQUVaLDRGQUE0RjtJQUU1Rjs7OztPQUlHO0lBQ0gseURBQVEsQ0FBQTtJQUVSOzs7O09BSUc7SUFDSCxtRUFBYSxDQUFBO0FBQ2YsQ0FBQyxFQTVCVyxpQkFBaUIsS0FBakIsaUJBQWlCLFFBNEI1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIERlZmluZXMgdGhlIENTUyBzdHlsZXMgZW5jYXBzdWxhdGlvbiBwb2xpY2llcyBmb3IgdGhlIHtAbGluayBDb21wb25lbnR9IGRlY29yYXRvcidzXG4gKiBgZW5jYXBzdWxhdGlvbmAgb3B0aW9uLlxuICpcbiAqIFNlZSB7QGxpbmsgQ29tcG9uZW50I2VuY2Fwc3VsYXRpb24gZW5jYXBzdWxhdGlvbn0uXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvcmUvdHMvbWV0YWRhdGEvZW5jYXBzdWxhdGlvbi50cyByZWdpb249J2xvbmdmb3JtJ31cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBlbnVtIFZpZXdFbmNhcHN1bGF0aW9uIHtcbiAgLy8gVE9ETzogY29uc2lkZXIgbWFraW5nIGBWaWV3RW5jYXBzdWxhdGlvbmAgYSBgY29uc3QgZW51bWAgaW5zdGVhZC4gU2VlXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzQ0MTE5IGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uLlxuXG4gIC8qKlxuICAgKiBFbXVsYXRlcyBhIG5hdGl2ZSBTaGFkb3cgRE9NIGVuY2Fwc3VsYXRpb24gYmVoYXZpb3IgYnkgYWRkaW5nIGEgc3BlY2lmaWMgYXR0cmlidXRlIHRvIHRoZVxuICAgKiBjb21wb25lbnQncyBob3N0IGVsZW1lbnQgYW5kIGFwcGx5aW5nIHRoZSBzYW1lIGF0dHJpYnV0ZSB0byBhbGwgdGhlIENTUyBzZWxlY3RvcnMgcHJvdmlkZWRcbiAgICogdmlhIHtAbGluayBDb21wb25lbnQjc3R5bGVzIHN0eWxlc30gb3Ige0BsaW5rIENvbXBvbmVudCNzdHlsZVVybHMgc3R5bGVVcmxzfS5cbiAgICpcbiAgICogVGhpcyBpcyB0aGUgZGVmYXVsdCBvcHRpb24uXG4gICAqL1xuICBFbXVsYXRlZCA9IDAsXG5cbiAgLy8gSGlzdG9yaWNhbGx5IHRoZSAxIHZhbHVlIHdhcyBmb3IgYE5hdGl2ZWAgZW5jYXBzdWxhdGlvbiB3aGljaCBoYXMgYmVlbiByZW1vdmVkIGFzIG9mIHYxMS5cblxuICAvKipcbiAgICogRG9lc24ndCBwcm92aWRlIGFueSBzb3J0IG9mIENTUyBzdHlsZSBlbmNhcHN1bGF0aW9uLCBtZWFuaW5nIHRoYXQgYWxsIHRoZSBzdHlsZXMgcHJvdmlkZWRcbiAgICogdmlhIHtAbGluayBDb21wb25lbnQjc3R5bGVzIHN0eWxlc30gb3Ige0BsaW5rIENvbXBvbmVudCNzdHlsZVVybHMgc3R5bGVVcmxzfSBhcmUgYXBwbGljYWJsZVxuICAgKiB0byBhbnkgSFRNTCBlbGVtZW50IG9mIHRoZSBhcHBsaWNhdGlvbiByZWdhcmRsZXNzIG9mIHRoZWlyIGhvc3QgQ29tcG9uZW50LlxuICAgKi9cbiAgTm9uZSA9IDIsXG5cbiAgLyoqXG4gICAqIFVzZXMgdGhlIGJyb3dzZXIncyBuYXRpdmUgU2hhZG93IERPTSBBUEkgdG8gZW5jYXBzdWxhdGUgQ1NTIHN0eWxlcywgbWVhbmluZyB0aGF0IGl0IGNyZWF0ZXNcbiAgICogYSBTaGFkb3dSb290IGZvciB0aGUgY29tcG9uZW50J3MgaG9zdCBlbGVtZW50IHdoaWNoIGlzIHRoZW4gdXNlZCB0byBlbmNhcHN1bGF0ZVxuICAgKiBhbGwgdGhlIENvbXBvbmVudCdzIHN0eWxpbmcuXG4gICAqL1xuICBTaGFkb3dEb20gPSAzXG59XG4iXX0=