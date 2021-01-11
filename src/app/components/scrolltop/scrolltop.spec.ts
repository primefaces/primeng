import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ScrollTop, ScrollTopModule } from './scrolltop';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ScrollTop', () => {

	let tag: ScrollTop;
	let fixture: ComponentFixture<ScrollTop>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NoopAnimationsModule
			],
			declarations: [
				ScrollTopModule
			]
		});

		fixture = TestBed.createComponent(ScrollTop);
		tag = fixture.componentInstance;
	});
});
