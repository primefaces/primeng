import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * RxJs operator, that run subscription function outside NgZone (This operator should be first in the pipe() method
 *
 * @param {NgZone} zone - injected ngZone reference
 *
 * @returns {Observable<T>} Input Observable
 *
 * @example
 *	fromEvent<MouseEvent>(this.elementRef.nativeElement, 'click')
 *		.pipe(
 *			outsideZone(this.zone),
 *			...other operators,
 *			takeUntil(this.destroy$)
 *		)
 */
export function outsideZone<T>(zone: NgZone): (source: Observable<T>) => Observable<T> {
    return (source) => new Observable((subscriber) => zone.runOutsideAngular(() => source.subscribe(subscriber)));
}
