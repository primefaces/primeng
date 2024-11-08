import { Injectable, signal } from '@angular/core';
//@todo handle nav scroll here
@Injectable()
export class AppDocService {
    activeTab = signal<number>(0);

    currentHeader = signal<string>('');
}
