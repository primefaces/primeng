import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DockModule, Dock } from './dock';

describe('Dock', () => {

	let dock: Dock;
	let fixture: ComponentFixture<Dock>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NoopAnimationsModule
			],
			declarations: [
				DockModule
			]
		});

		fixture = TestBed.createComponent(Dock);
		dock = fixture.componentInstance;
	});
});
