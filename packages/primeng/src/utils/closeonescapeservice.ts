import { DestroyRef, Injectable, Injector } from '@angular/core';

type ClosableWithEscape = ClosableWithEscapeSingle | ClosableWithEscapeGlobal;

type ClosableWithEscapeSingle = {
    kind: 'single';
    closeOnEscape(event: Event): boolean;
};
type ClosableWithEscapeGlobal = {
    kind: 'global';
    closeOnEscape(event: Event): void;
    onlyCloseForFocussedElements?: () => HTMLElement[];
};

@Injectable({ providedIn: 'root' })
export class CloseOnEscapeService {
    private readonly _targets = new Set<ClosableWithEscape>();

    constructor() {
        document.addEventListener('keydown', (event) => {
            if (event.key !== 'Escape') {
                return;
            }
            const singleTargets: ClosableWithEscapeSingle[] = Array.from(this._targets).filter((target) => target.kind === 'single') as ClosableWithEscapeSingle[];
            if (singleTargets.length > 0) {
                const closed = singleTargets.map((target) => target.closeOnEscape(event));
                if (closed.some((closed) => closed)) {
                    return;
                }
            }
            const globalTargets: ClosableWithEscapeGlobal[] = Array.from(this._targets).filter((target) => target.kind === 'global') as ClosableWithEscapeGlobal[];
            const activeElement = document.activeElement ?? document.body;
            globalTargets
                .filter((x) => !x.onlyCloseForFocussedElements || activeElement === document.body || x.onlyCloseForFocussedElements().some((x) => x.contains(activeElement)))
                .forEach((target) => {
                    target.closeOnEscape(event);
                });
        });
    }

    public closeOnEscape(target: ClosableWithEscape, injector: Injector) {
        this._targets.add(target);
        const destroyRef = injector.get(DestroyRef);
        destroyRef.onDestroy(() => {
            this._targets.delete(target);
        });
    }
}
