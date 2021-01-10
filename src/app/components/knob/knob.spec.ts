import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Knob, KnobModule } from './knob';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Knob', () => {

	let tag: Knob;
	let fixture: ComponentFixture<Knob>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NoopAnimationsModule
			],
			declarations: [
				KnobModule
			]
		});

		fixture = TestBed.createComponent(Knob);
		tag = fixture.componentInstance;
	});
});
