import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AvatarGroup } from './avatargroup';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AvatarGroup', () => {

	let button: AvatarGroup;
	let fixture: ComponentFixture<AvatarGroup>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NoopAnimationsModule
			],
			declarations: [
				AvatarGroup
			]
		});

		fixture = TestBed.createComponent(AvatarGroup);
		button = fixture.componentInstance;
	});
});
