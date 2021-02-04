import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Splitter, SplitterModule } from './splitter';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Splitter', () => {

	let tag: Splitter;
	let fixture: ComponentFixture<Splitter>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NoopAnimationsModule
			],
			declarations: [
				SplitterModule
			]
		});

		fixture = TestBed.createComponent(Splitter);
		tag = fixture.componentInstance;
	});
});
