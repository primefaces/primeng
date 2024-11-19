import { TestBed } from '@angular/core/testing';

import { FiltersArg } from '../api/fitlersarg';
import { TableService } from './table.service';

describe('TableService', () => {
    describe('filter entries', () => {
        describe('by single field aka locally', () => {
            let service: TableService;

            beforeEach(() => {
                // DEBUG! Prove this in the official docs
                TestBed.configureTestingModule({
                    providers: [TableService]
                });
                service = TestBed.inject(TableService);
            });

            it('should filter by starts with', () => {
                const data = [{ name: 'foo' }, { name: 'bar' }];
                const filters: FiltersArg = {
                    name: {
                        value: 'f',
                        matchMode: 'startsWith'
                    }
                };

                const result = service.filter(data, filters, [], 'startsWith');
                expect(result).toEqual([{ name: 'foo' }]);
            });
        });
        describe('by all fields aka globally', () => {});
    });
});
