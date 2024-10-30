/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ApplicationRef } from '@angular/core';
export class ChangeDetectionPerfRecord {
    constructor(msPerTick, numTicks) {
        this.msPerTick = msPerTick;
        this.numTicks = numTicks;
    }
}
/**
 * Entry point for all Angular profiling-related debug tools. This object
 * corresponds to the `ng.profiler` in the dev console.
 */
export class AngularProfiler {
    constructor(ref) {
        this.appRef = ref.injector.get(ApplicationRef);
    }
    // tslint:disable:no-console
    /**
     * Exercises change detection in a loop and then prints the average amount of
     * time in milliseconds how long a single round of change detection takes for
     * the current state of the UI. It runs a minimum of 5 rounds for a minimum
     * of 500 milliseconds.
     *
     * Optionally, a user may pass a `config` parameter containing a map of
     * options. Supported options are:
     *
     * `record` (boolean) - causes the profiler to record a CPU profile while
     * it exercises the change detector. Example:
     *
     * ```
     * ng.profiler.timeChangeDetection({record: true})
     * ```
     */
    timeChangeDetection(config) {
        const record = config && config['record'];
        const profileName = 'Change Detection';
        // Profiler is not available in Android browsers without dev tools opened
        if (record && 'profile' in console && typeof console.profile === 'function') {
            console.profile(profileName);
        }
        const start = performance.now();
        let numTicks = 0;
        while (numTicks < 5 || (performance.now() - start) < 500) {
            this.appRef.tick();
            numTicks++;
        }
        const end = performance.now();
        if (record && 'profileEnd' in console && typeof console.profileEnd === 'function') {
            console.profileEnd(profileName);
        }
        const msPerTick = (end - start) / numTicks;
        console.log(`ran ${numTicks} change detection cycles`);
        console.log(`${msPerTick.toFixed(2)} ms per check`);
        return new ChangeDetectionPerfRecord(msPerTick, numTicks);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uX3Rvb2xzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvYnJvd3Nlci90b29scy9jb21tb25fdG9vbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGNBQWMsRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUUzRCxNQUFNLE9BQU8seUJBQXlCO0lBQ3BDLFlBQW1CLFNBQWlCLEVBQVMsUUFBZ0I7UUFBMUMsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVE7SUFBRyxDQUFDO0NBQ2xFO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLGVBQWU7SUFHMUIsWUFBWSxHQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCw0QkFBNEI7SUFDNUI7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsbUJBQW1CLENBQUMsTUFBVztRQUM3QixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sV0FBVyxHQUFHLGtCQUFrQixDQUFDO1FBQ3ZDLHlFQUF5RTtRQUN6RSxJQUFJLE1BQU0sSUFBSSxTQUFTLElBQUksT0FBTyxJQUFJLE9BQU8sT0FBTyxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUUsQ0FBQztZQUM1RSxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFDRCxNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDaEMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLE9BQU8sUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUN6RCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ25CLFFBQVEsRUFBRSxDQUFDO1FBQ2IsQ0FBQztRQUNELE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLE1BQU0sSUFBSSxZQUFZLElBQUksT0FBTyxJQUFJLE9BQU8sT0FBTyxDQUFDLFVBQVUsS0FBSyxVQUFVLEVBQUUsQ0FBQztZQUNsRixPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFDRCxNQUFNLFNBQVMsR0FBRyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLFFBQVEsMEJBQTBCLENBQUMsQ0FBQztRQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFcEQsT0FBTyxJQUFJLHlCQUF5QixDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM1RCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBcHBsaWNhdGlvblJlZiwgQ29tcG9uZW50UmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNsYXNzIENoYW5nZURldGVjdGlvblBlcmZSZWNvcmQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbXNQZXJUaWNrOiBudW1iZXIsIHB1YmxpYyBudW1UaWNrczogbnVtYmVyKSB7fVxufVxuXG4vKipcbiAqIEVudHJ5IHBvaW50IGZvciBhbGwgQW5ndWxhciBwcm9maWxpbmctcmVsYXRlZCBkZWJ1ZyB0b29scy4gVGhpcyBvYmplY3RcbiAqIGNvcnJlc3BvbmRzIHRvIHRoZSBgbmcucHJvZmlsZXJgIGluIHRoZSBkZXYgY29uc29sZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEFuZ3VsYXJQcm9maWxlciB7XG4gIGFwcFJlZjogQXBwbGljYXRpb25SZWY7XG5cbiAgY29uc3RydWN0b3IocmVmOiBDb21wb25lbnRSZWY8YW55Pikge1xuICAgIHRoaXMuYXBwUmVmID0gcmVmLmluamVjdG9yLmdldChBcHBsaWNhdGlvblJlZik7XG4gIH1cblxuICAvLyB0c2xpbnQ6ZGlzYWJsZTpuby1jb25zb2xlXG4gIC8qKlxuICAgKiBFeGVyY2lzZXMgY2hhbmdlIGRldGVjdGlvbiBpbiBhIGxvb3AgYW5kIHRoZW4gcHJpbnRzIHRoZSBhdmVyYWdlIGFtb3VudCBvZlxuICAgKiB0aW1lIGluIG1pbGxpc2Vjb25kcyBob3cgbG9uZyBhIHNpbmdsZSByb3VuZCBvZiBjaGFuZ2UgZGV0ZWN0aW9uIHRha2VzIGZvclxuICAgKiB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgVUkuIEl0IHJ1bnMgYSBtaW5pbXVtIG9mIDUgcm91bmRzIGZvciBhIG1pbmltdW1cbiAgICogb2YgNTAwIG1pbGxpc2Vjb25kcy5cbiAgICpcbiAgICogT3B0aW9uYWxseSwgYSB1c2VyIG1heSBwYXNzIGEgYGNvbmZpZ2AgcGFyYW1ldGVyIGNvbnRhaW5pbmcgYSBtYXAgb2ZcbiAgICogb3B0aW9ucy4gU3VwcG9ydGVkIG9wdGlvbnMgYXJlOlxuICAgKlxuICAgKiBgcmVjb3JkYCAoYm9vbGVhbikgLSBjYXVzZXMgdGhlIHByb2ZpbGVyIHRvIHJlY29yZCBhIENQVSBwcm9maWxlIHdoaWxlXG4gICAqIGl0IGV4ZXJjaXNlcyB0aGUgY2hhbmdlIGRldGVjdG9yLiBFeGFtcGxlOlxuICAgKlxuICAgKiBgYGBcbiAgICogbmcucHJvZmlsZXIudGltZUNoYW5nZURldGVjdGlvbih7cmVjb3JkOiB0cnVlfSlcbiAgICogYGBgXG4gICAqL1xuICB0aW1lQ2hhbmdlRGV0ZWN0aW9uKGNvbmZpZzogYW55KTogQ2hhbmdlRGV0ZWN0aW9uUGVyZlJlY29yZCB7XG4gICAgY29uc3QgcmVjb3JkID0gY29uZmlnICYmIGNvbmZpZ1sncmVjb3JkJ107XG4gICAgY29uc3QgcHJvZmlsZU5hbWUgPSAnQ2hhbmdlIERldGVjdGlvbic7XG4gICAgLy8gUHJvZmlsZXIgaXMgbm90IGF2YWlsYWJsZSBpbiBBbmRyb2lkIGJyb3dzZXJzIHdpdGhvdXQgZGV2IHRvb2xzIG9wZW5lZFxuICAgIGlmIChyZWNvcmQgJiYgJ3Byb2ZpbGUnIGluIGNvbnNvbGUgJiYgdHlwZW9mIGNvbnNvbGUucHJvZmlsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS5wcm9maWxlKHByb2ZpbGVOYW1lKTtcbiAgICB9XG4gICAgY29uc3Qgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICBsZXQgbnVtVGlja3MgPSAwO1xuICAgIHdoaWxlIChudW1UaWNrcyA8IDUgfHwgKHBlcmZvcm1hbmNlLm5vdygpIC0gc3RhcnQpIDwgNTAwKSB7XG4gICAgICB0aGlzLmFwcFJlZi50aWNrKCk7XG4gICAgICBudW1UaWNrcysrO1xuICAgIH1cbiAgICBjb25zdCBlbmQgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICBpZiAocmVjb3JkICYmICdwcm9maWxlRW5kJyBpbiBjb25zb2xlICYmIHR5cGVvZiBjb25zb2xlLnByb2ZpbGVFbmQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUucHJvZmlsZUVuZChwcm9maWxlTmFtZSk7XG4gICAgfVxuICAgIGNvbnN0IG1zUGVyVGljayA9IChlbmQgLSBzdGFydCkgLyBudW1UaWNrcztcbiAgICBjb25zb2xlLmxvZyhgcmFuICR7bnVtVGlja3N9IGNoYW5nZSBkZXRlY3Rpb24gY3ljbGVzYCk7XG4gICAgY29uc29sZS5sb2coYCR7bXNQZXJUaWNrLnRvRml4ZWQoMil9IG1zIHBlciBjaGVja2ApO1xuXG4gICAgcmV0dXJuIG5ldyBDaGFuZ2VEZXRlY3Rpb25QZXJmUmVjb3JkKG1zUGVyVGljaywgbnVtVGlja3MpO1xuICB9XG59XG4iXX0=