import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Observable abstraction over ngOnDestroy to use with takeUntil
 * @example
 *@Component({
 * 	selector: 'app-example',
 * 	templateUrl: './example.component.html',
 * 	styleUrls: [ './example.component.scss' ],
 * 	providers: [ OnDestroyService ]  <=== add to the element providers section
 *})
 *export class ExampleComponent implements OnInit, OnDestroy {
 *	 private stream$ = interval(200);
 *
 *	 constructor(@Self() private readonly destroy$: OnDestroyService) { <=== Inject, using @Self()
 *	 }
 *
 *	 public ngOnInit(): void {
 *	 	this.stream$.pipe(
 *	 		map((i: number) => i * 2),
 *	 		takeUntil(this.destroy$) <=== Use in takeUntil() operator
 *	 	).subscribe();
 *	 }
 *}
 */
@Injectable()
export class OnDestroyService extends Subject<null> implements OnDestroy {
    public ngOnDestroy(): void {
        this.next(null);
        this.complete();
    }
}
