import { TestBed } from '@angular/core/testing';

import { FilterOperator } from 'primeng/api';
import { FiltersArg } from '../api/fitlersarg';
import { globalFilterFieldName, TableService } from './table';

let service: TableService;

beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [TableService]
    });
    service = TestBed.inject(TableService);
});

describe('TableService', () => {
    describe('filter entries', () => {
        describe('general edge cases', () => {
            it('should return empty array when data is falsy', () => {
                const filters: FiltersArg = {
                    name: { value: 'foo', matchMode: 'startsWith' }
                };

                const result = service.filter(undefined, filters, [], undefined);

                expect(result).toEqual([]);
            });

            it('should return empty array when data is empty', () => {
                const data = [];

                const filters: FiltersArg = {
                    name: { value: 'foo', matchMode: 'startsWith' }
                };

                const result = service.filter(data, filters, [], undefined);

                expect(result).toEqual([]);
            });

            it('should return same data when filters are empty', () => {
                const data = [{ name: 'foo' }, { name: 'bar' }];

                const filters: FiltersArg = {};

                const result = service.filter(data, filters, [], undefined);

                expect(result).toEqual(data);
            });

            it('should return same data when filters are undefined', () => {
                const data = [{ name: 'foo' }, { name: 'bar' }];

                const filters: FiltersArg = undefined;

                const result = service.filter(data, filters, [], undefined);

                expect(result).toEqual(data);
            });

            it('should return same data when filters are null', () => {
                const data = [{ name: 'foo' }, { name: 'bar' }];

                const filters: FiltersArg = null;

                const result = service.filter(data, filters, [], undefined);

                expect(result).toEqual(data);
            });
        });

        describe('edge cases', () => {
            describe('(global) date filters return empty data when not a date', () => {
                describe('dateIs', () => {
                    it('should return empty data when no date in data', () => {
                        const data = [
                            { name: 'foo', city: 'New York' },
                            { name: 'bar', city: 'Los Angeles' }
                        ];

                        const filters: FiltersArg = {
                            date: { value: new Date(2021, 1, 1), matchMode: 'dateIs' }
                        };

                        const result = service.filter(data, filters, ['name', 'city'], undefined);

                        expect(result).toEqual([]);
                    });

                    it('should return empty data when no date in filter', () => {
                        const data = [
                            { city: 'New York', date: new Date(2021, 1, 1) },
                            { city: 'Los Angeles', date: new Date(2021, 1, 1) }
                        ];

                        const filters: FiltersArg = {
                            date: { value: 'today is 1th of Veb 2021', matchMode: 'dateIs' }
                        };

                        const result = service.filter(data, filters, ['city', 'date'], undefined);

                        expect(result).toEqual([]);
                    });
                });

                describe('dateIsNot', () => {
                    it('should return empty data when no date in data', () => {
                        const data = [
                            { name: 'foo', city: 'New York' },
                            { name: 'bar', city: 'Los Angeles' }
                        ];

                        const filters: FiltersArg = {
                            date: { value: new Date(2021, 1, 1), matchMode: 'dateIsNot' }
                        };

                        const result = service.filter(data, filters, ['name', 'city'], undefined);

                        expect(result).toEqual([]);
                    });

                    it('should return empty data when no date in filter', () => {
                        const data = [
                            { city: 'New York', date: new Date(2021, 1, 1) },
                            { city: 'Los Angeles', date: new Date(2021, 1, 1) }
                        ];

                        const filters: FiltersArg = {
                            date: { value: 'der erste Ferbruar zwanzig einungzwanzig', matchMode: 'dateIsNot' }
                        };

                        const result = service.filter(data, filters, ['city', 'date'], undefined);

                        expect(result).toEqual(data);
                    });
                });

                describe('dateBefore', () => {
                    it('should return empty data when no date in data', () => {
                        const data = [
                            { name: 'foo', city: 'New York' },
                            { name: 'bar', city: 'Los Angeles' }
                        ];

                        const filters: FiltersArg = {
                            date: { value: new Date(2021, 1, 1), matchMode: 'dateBefore' }
                        };

                        const result = service.filter(data, filters, ['name', 'city'], undefined);

                        expect(result).toEqual([]);
                    });

                    it('should return empty data when no date in filter', () => {
                        const data = [
                            { city: 'New York', date: new Date(2021, 1, 1) },
                            { city: 'Los Angeles', date: new Date(2021, 1, 1) }
                        ];

                        const filters: FiltersArg = {
                            date: { value: 'today is 1th of Veb 2021', matchMode: 'dateBefore' }
                        };

                        const result = service.filter(data, filters, ['city', 'date'], undefined);

                        expect(result).toEqual([]);
                    });
                });

                describe('dateAfter', () => {
                    it('should return empty data when no date in data', () => {
                        const data = [
                            { name: 'foo', city: 'New York' },
                            { name: 'bar', city: 'Los Angeles' }
                        ];

                        const filters: FiltersArg = {
                            date: { value: new Date(2021, 1, 1), matchMode: 'dateAfter' }
                        };

                        const result = service.filter(data, filters, ['name', 'city'], undefined);

                        expect(result).toEqual([]);
                    });

                    it('should return empty data when no date in filter', () => {
                        const data = [
                            { city: 'New York', date: new Date(2021, 1, 1) },
                            { city: 'Los Angeles', date: new Date(2021, 1, 1) }
                        ];

                        const filters: FiltersArg = {
                            date: { value: 'today is 1th of Veb 2021', matchMode: 'dateAfter' }
                        };

                        const result = service.filter(data, filters, ['city', 'date'], undefined);

                        expect(result).toEqual([]);
                    });
                });
            });
        });

        describe('by single field aka locally', () => {
            describe('typical cases', () => {
                it('should filter with startsWith', () => {
                    const data = [{ name: 'foo' }, { name: 'bar' }];

                    const filters: FiltersArg = {
                        name: { value: 'f', matchMode: 'startsWith' }
                    };

                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ name: 'foo' }]);
                });

                it('should filter items with contains', () => {
                    const data = [{ name: 'apple' }, { name: 'banana' }, { name: 'apricot' }];

                    const filters: FiltersArg = {
                        name: { value: 'an', matchMode: 'contains' }
                    };

                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ name: 'banana' }]);
                });

                it('should filter items with notContains', () => {
                    const data = [{ name: 'apple' }, { name: 'banana' }, { name: 'apricot' }];

                    const filters: FiltersArg = {
                        name: { value: 'an', matchMode: 'notContains' }
                    };

                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ name: 'apple' }, { name: 'apricot' }]);
                });

                it('should filter items with endsWith', () => {
                    const data = [{ name: 'apple' }, { name: 'banana' }, { name: 'apricot' }];

                    const filters: FiltersArg = {
                        name: { value: 'le', matchMode: 'endsWith' }
                    };

                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ name: 'apple' }]);
                });

                it('should filter items with equals', () => {
                    const data = [{ name: 'apple' }, { name: 'banana' }, { name: 'apricot' }];

                    const filters: FiltersArg = {
                        name: { value: 'banana', matchMode: 'equals' }
                    };

                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ name: 'banana' }]);
                });

                it('should filter items with notEquals', () => {
                    const data = [{ name: 'apple' }, { name: 'banana' }, { name: 'apricot' }];

                    const filters: FiltersArg = {
                        name: { value: 'banana', matchMode: 'notEquals' }
                    };

                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ name: 'apple' }, { name: 'apricot' }]);
                });

                it('should filter items with in', () => {
                    const data = [{ name: 'apple' }, { name: 'banana' }, { name: 'apricot' }];

                    const filters: FiltersArg = {
                        name: { value: ['apple', 'apricot'], matchMode: 'in' }
                    };

                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ name: 'apple' }, { name: 'apricot' }]);
                });

                it('should filter items with between', () => {
                    const data = [{ value: 5 }, { value: 10 }, { value: 15 }];

                    const filters: FiltersArg = {
                        value: { value: [5, 10], matchMode: 'between' }
                    };

                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ value: 5 }, { value: 10 }]);
                });

                it('should filter items with lt', () => {
                    const data = [{ value: 5 }, { value: 10 }, { value: 15 }];

                    const filters: FiltersArg = {
                        value: { value: 10, matchMode: 'lt' }
                    };

                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ value: 5 }]);
                });

                it('should filter items with lte', () => {
                    const data = [{ value: 5 }, { value: 10 }, { value: 15 }];

                    const filters: FiltersArg = {
                        value: { value: 10, matchMode: 'lte' }
                    };

                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ value: 5 }, { value: 10 }]);
                });

                it('should filter items with gt', () => {
                    const data = [{ value: 5 }, { value: 10 }, { value: 15 }];

                    const filters: FiltersArg = {
                        value: { value: 10, matchMode: 'gt' }
                    };

                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ value: 15 }]);
                });

                it('should filter items with gte', () => {
                    const data = [{ value: 5 }, { value: 10 }, { value: 15 }];

                    const filters: FiltersArg = {
                        value: { value: 10, matchMode: 'gte' }
                    };

                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ value: 10 }, { value: 15 }]);
                });

                it('should filter items with is', () => {
                    const data = [{ name: 'apple' }, { name: 'banana' }];

                    const filters: FiltersArg = {
                        name: { value: 'banana', matchMode: 'is' }
                    };

                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ name: 'banana' }]);
                });

                it('should filter items with isNot', () => {
                    const data = [{ name: 'apple' }, { name: 'banana' }];

                    const filters: FiltersArg = {
                        name: { value: 'banana', matchMode: 'isNot' }
                    };

                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ name: 'apple' }]);
                });

                it('should filter items with before', () => {
                    const data = [{ value: new Date(2020, 1, 1) }, { value: new Date(2021, 1, 1) }];

                    const filters: FiltersArg = {
                        value: { value: new Date(2021, 1, 1), matchMode: 'before' }
                    };

                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ value: new Date(2020, 1, 1) }]);
                });

                it('should filter items with after', () => {
                    const data = [{ value: new Date(2020, 1, 1) }, { value: new Date(2021, 1, 1) }];

                    const filters: FiltersArg = {
                        value: { value: new Date(2020, 1, 1), matchMode: 'after' }
                    };

                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ value: new Date(2021, 1, 1) }]);
                });

                it('should filter items with dateIs', () => {
                    const data = [{ value: new Date(2020, 1, 1) }, { value: new Date(2021, 1, 1) }];

                    const filters: FiltersArg = {
                        value: { value: new Date(2021, 1, 1), matchMode: 'dateIs' }
                    };

                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ value: new Date(2021, 1, 1) }]);
                });

                it('should filter items with dateIsNot', () => {
                    const data = [{ value: new Date(2020, 1, 1) }, { value: new Date(2021, 1, 1) }];

                    const filters: FiltersArg = {
                        value: { value: new Date(2021, 1, 1), matchMode: 'dateIsNot' }
                    };

                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ value: new Date(2020, 1, 1) }]);
                });

                it('should filter items with dateBefore', () => {
                    const data = [{ value: new Date(2020, 1, 1) }, { value: new Date(2021, 1, 1) }];

                    const filters: FiltersArg = {
                        value: { value: new Date(2021, 1, 1), matchMode: 'dateBefore' }
                    };

                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ value: new Date(2020, 1, 1) }]);
                });

                it('should filter items with dateAfter', () => {
                    const data = [{ value: new Date(2020, 1, 1) }, { value: new Date(2021, 1, 1) }];

                    const filters: FiltersArg = {
                        value: { value: new Date(2020, 1, 1), matchMode: 'dateAfter' }
                    };

                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ value: new Date(2021, 1, 1) }]);
                });
            });
            describe('edge cases', () => {
                it('should filter by combined filters equals and notEquals with default and', () => {
                    const data = [{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }];

                    const filters: FiltersArg = {
                        name: [
                            { value: 'baz', matchMode: 'equals' },
                            { value: 'bar', matchMode: 'notEquals' }
                        ]
                    };
                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ name: 'baz' }]);
                });

                it('should filter by combined filters equals or notEquals', () => {
                    const data = [{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }];

                    const filters: FiltersArg = {
                        name: [
                            { value: 'baz', matchMode: 'equals', operator: FilterOperator.OR },
                            { value: 'bar', matchMode: 'notEquals' }
                        ]
                    };
                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ name: 'foo' }, { name: 'baz' }]);
                });

                it('should filter by combined filters equals and/or notEquals', () => {
                    const data = [{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }, { name: 'fly' }];

                    const filters: FiltersArg = {
                        name: [
                            // Don't break the filter loop by the OR operator
                            // otherwise this test will fail!
                            { value: 'baz', matchMode: 'equals', operator: FilterOperator.OR },
                            { value: 'bar', matchMode: 'notEquals', operator: FilterOperator.AND },
                            // Also making sure the operator of the last filter is ignored
                            { value: 'fly', matchMode: 'notEquals', operator: FilterOperator.AND }
                        ]
                    };
                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ name: 'foo' }, { name: 'baz' }]);
                });

                it('should filter by combined filters and notEquals', () => {
                    const data = [{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }];

                    const filters: FiltersArg = {
                        name: [
                            { value: 'baz', matchMode: 'notEquals', operator: FilterOperator.AND },
                            { value: 'bar', matchMode: 'notEquals', operator: FilterOperator.AND },
                            { value: 'foo', matchMode: 'notEquals', operator: FilterOperator.AND }
                        ]
                    };
                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([]);
                });

                it('should filter multiple props', () => {
                    const data = [
                        { name: 'foo', val: 1 },
                        { name: 'bar', val: 2 },
                        { name: 'baz', val: 3 }
                    ];

                    const filters: FiltersArg = {
                        name: { value: 'baz', matchMode: 'equals' },
                        val: { value: 3, matchMode: 'equals' }
                    };
                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ name: 'baz', val: 3 }]);
                });

                it('should filter compare string and number', () => {
                    const data = [
                        { name: 'foo', val: 1 },
                        { name: 'bar', val: 2 },
                        { name: 'baz', val: 3 }
                    ];

                    const filters: FiltersArg = {
                        name: { value: 'baz', matchMode: 'equals' },
                        val: { value: '3 ', matchMode: 'equals' }
                    };
                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ name: 'baz', val: 3 }]);
                });

                it('should filter with startsWith by default', () => {
                    const data = [{ name: 'foo' }, { name: 'bar' }];

                    const filters: FiltersArg = {
                        name: { value: 'f' }
                    };

                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([{ name: 'foo' }]);
                });

                it('should return empty data by an unknown prop', () => {
                    const data = [{ name: 'foo' }, { name: 'bar' }];

                    const filters: FiltersArg = {
                        name: { value: 'bar', matchMode: 'contains' },
                        unknown: { value: 'foo', matchMode: 'contains' }
                    };

                    const result = service.filter(data, filters, [], undefined);

                    expect(result).toEqual([]);
                });
            });
        });

        describe('by multiple/all fields aka globally', () => {
            describe('typical cases', () => {
                it('should filter with startsWith', () => {
                    const data = [
                        { name: 'foo', age: 25, city: 'New York' },
                        { name: 'bar', age: 30, city: 'Los Angeles' }
                    ];

                    const filters: FiltersArg = {};
                    filters[globalFilterFieldName] = { value: 'new', matchMode: 'startsWith' };

                    const result = service.filter(data, filters, ['name', 'age', 'city'], undefined);

                    expect(result).toEqual([{ name: 'foo', age: 25, city: 'New York' }]);
                });

                it('should filter with contains', () => {
                    const data = [
                        { name: 'foo', age: 25, city: 'New York' },
                        { name: 'bar', age: 30, city: 'Los Angeles' }
                    ];

                    const filters: FiltersArg = {};
                    filters[globalFilterFieldName] = { value: 'ang', matchMode: 'contains' };

                    const result = service.filter(data, filters, ['name', 'age', 'city'], undefined);

                    expect(result).toEqual([{ name: 'bar', age: 30, city: 'Los Angeles' }]);
                });

                it('should filter with notContains', () => {
                    const data = [
                        { name: 'foo', age: 25, city: 'New York' },
                        { name: 'bar', age: 30, city: 'Los Angeles' }
                    ];

                    const filters: FiltersArg = {};
                    filters[globalFilterFieldName] = { value: 'ang', matchMode: 'notContains' };

                    const result = service.filter(data, filters, ['name', 'age', 'city'], undefined);

                    expect(result).toEqual([{ name: 'foo', age: 25, city: 'New York' }]);
                });

                it('should filter with endsWith', () => {
                    const data = [
                        { name: 'foo', age: 25, city: 'New York' },
                        { name: 'bar', age: 30, city: 'Los Angeles' }
                    ];

                    const filters: FiltersArg = {};
                    filters[globalFilterFieldName] = { value: 'York', matchMode: 'endsWith' };

                    const result = service.filter(data, filters, ['name', 'age', 'city'], undefined);

                    expect(result).toEqual([{ name: 'foo', age: 25, city: 'New York' }]);
                });

                it('should filter with equals', () => {
                    const data = [
                        { name: 'foo', age: 25, city: 'New York' },
                        { name: 'bar', age: 30, city: 'Los Angeles' }
                    ];

                    const filters: FiltersArg = {};
                    filters[globalFilterFieldName] = { value: 'New York', matchMode: 'equals' };

                    const result = service.filter(data, filters, ['name', 'age', 'city'], undefined);

                    expect(result).toEqual([{ name: 'foo', age: 25, city: 'New York' }]);
                });

                it('should filter with notEquals', () => {
                    const data = [
                        { name: 'foo', age: 25, city: 'New York' },
                        { name: 'bar', age: 30, city: 'Los Angeles' }
                    ];

                    const filters: FiltersArg = {};
                    filters[globalFilterFieldName] = { value: 'New York', matchMode: 'notEquals' };

                    const result = service.filter(data, filters, ['name', 'age', 'city'], undefined);

                    expect(result).toEqual([{ name: 'bar', age: 30, city: 'Los Angeles' }]);
                });

                it('should filter with in', () => {
                    const data = [
                        { name: 'foo', age: 25, city: 'New York' },
                        { name: 'bar', age: 30, city: 'Los Angeles' }
                    ];

                    const filters: FiltersArg = {};
                    filters[globalFilterFieldName] = { value: ['New York', 'Los Angeles'], matchMode: 'in' };

                    const result = service.filter(data, filters, ['name', 'age', 'city'], undefined);

                    expect(result).toEqual(data);
                });

                it('should filter with between', () => {
                    const data = [
                        { name: 'foo', age: 25, city: 'New York' },
                        { name: 'bar', age: 30, city: 'Los Angeles' }
                    ];

                    const filters: FiltersArg = {};
                    filters[globalFilterFieldName] = { value: [20, 30], matchMode: 'between' };

                    const result = service.filter(data, filters, ['name', 'age', 'city'], undefined);

                    expect(result).toEqual(data);
                });

                it('should filter with lt', () => {
                    const data = [
                        { name: 'foo', age: 25, city: 'New York' },
                        { name: 'bar', age: 30, city: 'Los Angeles' }
                    ];

                    const filters: FiltersArg = {};
                    filters[globalFilterFieldName] = { value: 30, matchMode: 'lt' };

                    const result = service.filter(data, filters, ['name', 'age', 'city'], undefined);

                    expect(result).toEqual([{ name: 'foo', age: 25, city: 'New York' }]);
                });

                it('should filter with lte', () => {
                    const data = [
                        { name: 'foo', age: 25, city: 'New York' },
                        { name: 'bar', age: 30, city: 'Los Angeles' }
                    ];

                    const filters: FiltersArg = {};
                    filters[globalFilterFieldName] = { value: 30, matchMode: 'lte' };

                    const result = service.filter(data, filters, ['name', 'age', 'city'], undefined);

                    expect(result).toEqual(data);
                });

                it('should filter with gt', () => {
                    const data = [
                        { name: 'foo', age: 25, city: 'New York' },
                        { name: 'bar', age: 30, city: 'Los Angeles' }
                    ];

                    const filters: FiltersArg = {};
                    filters[globalFilterFieldName] = { value: 25, matchMode: 'gt' };

                    const result = service.filter(data, filters, ['name', 'age', 'city'], undefined);

                    expect(result).toEqual([{ name: 'bar', age: 30, city: 'Los Angeles' }]);
                });

                it('should filter with gte', () => {
                    const data = [
                        { name: 'foo', age: 25, city: 'New York' },
                        { name: 'bar', age: 30, city: 'Los Angeles' }
                    ];

                    const filters: FiltersArg = {};
                    filters[globalFilterFieldName] = { value: 25, matchMode: 'gte' };

                    const result = service.filter(data, filters, ['name', 'age', 'city'], undefined);

                    expect(result).toEqual(data);
                });

                it('should filter with is', () => {
                    const data = [
                        { name: 'foo', age: 25, city: 'New York' },
                        { name: 'bar', age: 30, city: 'Los Angeles' }
                    ];

                    const filters: FiltersArg = {};
                    filters[globalFilterFieldName] = { value: 'New York', matchMode: 'is' };

                    const result = service.filter(data, filters, ['name', 'age', 'city'], undefined);

                    expect(result).toEqual([{ name: 'foo', age: 25, city: 'New York' }]);
                });

                it('should filter with isNot', () => {
                    const data = [
                        { name: 'foo', age: 25, city: 'New York' },
                        { name: 'bar', age: 30, city: 'Los Angeles' }
                    ];

                    const filters: FiltersArg = {};
                    filters[globalFilterFieldName] = { value: 'New York', matchMode: 'isNot' };

                    const result = service.filter(data, filters, ['name', 'age', 'city'], undefined);

                    expect(result).toEqual([{ name: 'bar', age: 30, city: 'Los Angeles' }]);
                });

                it('should filter with before', () => {
                    const data = [
                        { name: 'foo', age: 25, city: 'New York' },
                        { name: 'bar', age: 30, city: 'Los Angeles' }
                    ];

                    const filters: FiltersArg = {};
                    filters[globalFilterFieldName] = { value: 30, matchMode: 'before' };

                    const result = service.filter(data, filters, ['name', 'age', 'city'], undefined);

                    expect(result).toEqual([{ name: 'foo', age: 25, city: 'New York' }]);
                });

                it('should filter with after', () => {
                    const data = [
                        { name: 'foo', age: 25, city: 'New York' },
                        { name: 'bar', age: 30, city: 'Los Angeles' }
                    ];

                    const filters: FiltersArg = {};
                    filters[globalFilterFieldName] = { value: 25, matchMode: 'after' };

                    const result = service.filter(data, filters, ['name', 'age', 'city'], undefined);

                    expect(result).toEqual([{ name: 'bar', age: 30, city: 'Los Angeles' }]);
                });

                it('should filter with dateIs', () => {
                    const data = [
                        { name: 'foo', age: 25, date: new Date(2020, 1, 1) },
                        { name: 'bar', age: 30, date: new Date(2021, 1, 1) }
                    ];

                    const filters: FiltersArg = {};
                    filters[globalFilterFieldName] = { value: new Date(2021, 1, 1), matchMode: 'dateIs' };

                    const result = service.filter(data, filters, ['name', 'age', 'date'], undefined);

                    expect(result).toEqual([{ name: 'bar', age: 30, date: new Date(2021, 1, 1) }]);
                });

                it('should filter with dateIsNot', () => {
                    const data = [
                        { name: 'foo', age: 25, date: new Date(2020, 1, 1) },
                        { name: 'bar', age: 30, date: new Date(2021, 1, 1) }
                    ];

                    const filters: FiltersArg = {};
                    filters[globalFilterFieldName] = { value: new Date(2021, 1, 1), matchMode: 'dateIsNot' };

                    const result = service.filter(data, filters, ['name', 'age', 'date'], undefined);

                    expect(result).toEqual([{ name: 'foo', age: 25, date: new Date(2020, 1, 1) }]);
                });

                it('should filter with dateBefore', () => {
                    const data = [
                        { name: 'foo', age: 25, date: new Date(2020, 1, 1) },
                        { name: 'bar', age: 30, date: new Date(2021, 1, 1) }
                    ];

                    const filters: FiltersArg = {};
                    filters[globalFilterFieldName] = { value: new Date(2021, 1, 1), matchMode: 'dateBefore' };

                    const result = service.filter(data, filters, ['name', 'age', 'date'], undefined);

                    expect(result).toEqual([{ name: 'foo', age: 25, date: new Date(2020, 1, 1) }]);
                });

                it('should filter with dateAfter', () => {
                    const data = [
                        { name: 'foo', age: 25, date: new Date(2020, 1, 1) },
                        { name: 'bar', age: 30, date: new Date(2021, 1, 1) }
                    ];

                    const filters: FiltersArg = {};
                    filters[globalFilterFieldName] = { value: new Date(2020, 1, 1), matchMode: 'dateAfter' };

                    const result = service.filter(data, filters, ['name', 'age', 'date'], undefined);

                    expect(result).toEqual([{ name: 'bar', age: 30, date: new Date(2021, 1, 1) }]);
                });
            });

            describe('edge cases', () => {
                it('should fail when match mode does not exist', () => {
                    const data = [{ name: 'foo' }, { name: 'bar' }];

                    const filters: FiltersArg = {};
                    filters[globalFilterFieldName] = { value: 'new', matchMode: 'notExistingMatchMode' };

                    expect(() => {
                        service.filter(data, filters, ['name', 'age', 'city'], undefined);
                    }).toThrowError('Unsupported match mode: notExistingMatchMode');
                });

                it('should work with missing props', () => {
                    const data = [
                        { name: 'foo', age: 25, city: 'New York' },
                        { name: 'bar', age: 25, city: 'Los Angeles', global: 'development' },
                        { name: 'baz', age: 35, city: 'Vancouver', global: 'research' }
                    ];

                    const filters: FiltersArg = {};
                    filters[globalFilterFieldName] = { value: 'development', matchMode: 'notContains' };

                    const result = service.filter(data, filters, ['name', 'age', 'city', 'global'], undefined);

                    expect(result).toEqual([
                        { name: 'foo', age: 25, city: 'New York' },
                        { name: 'baz', age: 35, city: 'Vancouver', global: 'research' }
                    ]);
                });
            });
        });

        describe('by multiple/all fields aka global and single field(s) aka local', () => {
            describe('typical cases', () => {
                it('should filter with startsWith and notContains', () => {
                    const data = [
                        { name: 'foo', age: 25, city: 'New York' },
                        { name: 'bar', age: 30, city: 'Los Angeles' },
                        { name: 'baz', age: 35, city: 'New York' }
                    ];

                    const filters: FiltersArg = {
                        name: { value: 'ba', matchMode: 'startsWith' }
                    };
                    filters[globalFilterFieldName] = { value: 'new', matchMode: 'notContains' };

                    const result = service.filter(data, filters, ['name', 'age', 'city'], undefined);

                    expect(result).toEqual([{ name: 'bar', age: 30, city: 'Los Angeles' }]);
                });

                it('should filter with contains and notContains', () => {
                    const data = [
                        { name: 'foo', age: 25, city: 'New York' },
                        { name: 'bar', age: 30, city: 'Los Angeles' },
                        { name: 'baz', age: 35, city: 'New York' }
                    ];

                    const filters: FiltersArg = {
                        name: { value: 'oo', matchMode: 'contains' }
                    };
                    filters[globalFilterFieldName] = { value: 'ang', matchMode: 'notContains' };

                    const result = service.filter(data, filters, ['name', 'age', 'city'], undefined);

                    expect(result).toEqual([{ name: 'foo', age: 25, city: 'New York' }]);
                });

                it('should return empty data when filter results not overlap', () => {
                    const data = [
                        { name: 'foo', age: 25, city: 'Berlin' },
                        { name: 'bar', age: 30, city: 'Los Angeles' },
                        { name: 'baz', age: 35, city: 'New York' }
                    ];

                    const filters: FiltersArg = {
                        name: { value: 'ba', matchMode: 'notContains' }
                    };
                    filters[globalFilterFieldName] = { value: '25', matchMode: 'notContains' };

                    const result = service.filter(data, filters, ['name', 'age', 'city'], undefined);

                    expect(result).toEqual([]);
                });

                it('should work with a prop `global`', () => {
                    const data = [
                        { name: 'foo', age: 25, city: 'New York', global: 'research' },
                        { name: 'bar', age: 25, city: 'Los Angeles', global: 'development' },
                        { name: 'baz', age: 35, city: 'Vancouver', global: 'research' }
                    ];

                    const filters: FiltersArg = {
                        age: { value: '25', matchMode: 'lte' }
                    };
                    filters[globalFilterFieldName] = { value: 'development', matchMode: 'notContains' };

                    const result = service.filter(data, filters, ['name', 'age', 'city', 'global'], undefined);

                    expect(result).toEqual([{ name: 'foo', age: 25, city: 'New York', global: 'research' }]);
                });

                it('should work with missing props', () => {
                    const data = [
                        { name: 'foo', age: 25, city: 'New York' },
                        { name: 'bar', age: 25, city: 'Los Angeles', global: 'development' },
                        { name: 'baz', age: 35, city: 'Vancouver', global: 'research' }
                    ];

                    const filters: FiltersArg = {
                        age: { value: '25', matchMode: 'lte' }
                    };
                    filters[globalFilterFieldName] = { value: 'development', matchMode: 'notContains' };

                    const result = service.filter(data, filters, ['name', 'age', 'city', 'global'], undefined);

                    expect(result).toEqual([{ name: 'foo', age: 25, city: 'New York' }]);
                });
            });
        });
    });
});
