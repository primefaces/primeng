import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Skeleton, SkeletonModule } from './skeleton';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Skeleton', () => {

	let tag: Skeleton;
	let fixture: ComponentFixture<Skeleton>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NoopAnimationsModule
			],
			declarations: [
				SkeletonModule
			]
		});

		fixture = TestBed.createComponent(Skeleton);
		tag = fixture.componentInstance;
	});
});
