import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SpeedDialModule, SpeedDial } from './speeddial';

describe('SpeedDial', () => {

	let speedDial: SpeedDial;
	let fixture: ComponentFixture<SpeedDial>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NoopAnimationsModule
			],
			declarations: [
				SpeedDialModule
			]
		});

		fixture = TestBed.createComponent(SpeedDial);
		speedDial = fixture.componentInstance;
	});
});
