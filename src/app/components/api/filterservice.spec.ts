import { FilterService } from './filterservice';
describe('FilterService Suite', () => {
    let data: any = [
        { brand: 'VW', year: 2012, color: { name: 'Orange' }, vin: 'dsad231ff' },
        { brand: 'Audi', year: 2011, color: { name: 'Black' }, vin: 'gwregre345' },
        { brand: 'Renault', year: 2005, color: { name: 'Black' }, vin: 'h354htr' },
        { brand: 'BMW', year: 2003, color: { name: 'Blue' }, vin: 'j6w54qgh' },
        { brand: 'Mercedes', year: 1995, color: { name: 'Red' }, vin: 'hrtwy34' },
        { brand: 'Volvo', year: 2005, color: { name: 'Orange' }, vin: 'jejtyj' },
        { brand: 'Honda', year: 2012, color: { name: 'Blue' }, vin: 'g43gr' },
        { brand: 'Jaguar', year: 2013, color: { name: 'Black' }, vin: 'greg34' },
        { brand: 'Ford', year: 2000, color: { name: 'White' }, vin: 'h54hw5' },
        { brand: 'Fiat', year: 2013, color: { name: 'Yellow' }, vin: '245t2s' }
    ];

    let timeData = [{ date: 'Tue Aug 04 2019 00:00:00 GMT+0300 (GMT+03:00)' }, { date: 'Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)' }, { date: 'Tue Aug 07 2019 00:00:00 GMT+0300 (GMT+03:00)' }];

    let filterService = new FilterService();

    it('Should filter by startsWith', () => {
        let filteredValue = filterService.filter(data, ['brand'], 'f', 'startsWith');
        expect(filteredValue.length).toEqual(2);
        filteredValue = filterService.filter(data, ['brand'], '', 'startsWith');
        expect(filteredValue.length).toEqual(10);
        filteredValue = filterService.filter(data, [''], 'f', 'startsWith');
        expect(filteredValue.length).toEqual(0);
    });
    it('Should filter by contains', () => {
        let filteredValue = filterService.filter(data, ['brand'], 'f', 'contains');
        expect(filteredValue.length).toEqual(2);
        filteredValue = filterService.filter(data, ['brand'], '', 'contains');
        expect(filteredValue.length).toEqual(10);
        filteredValue = filterService.filter(data, [''], 'f', 'contains');
        expect(filteredValue.length).toEqual(0);
    });
    it('Should filter by endsWith', () => {
        let filteredValue = filterService.filter(data, ['brand'], 't', 'endsWith');
        expect(filteredValue.length).toEqual(2);
        filteredValue = filterService.filter(data, ['brand'], '', 'endsWith');
        expect(filteredValue.length).toEqual(10);
        filteredValue = filterService.filter(data, [''], 't', 'endsWith');
        expect(filteredValue.length).toEqual(0);
    });
    it('Should filter by equals', () => {
        let filteredValue = filterService.filter(data, ['brand'], 'BMW', 'equals');
        expect(filteredValue.length).toEqual(1);
        filteredValue = filterService.filter(data, ['brand'], '', 'equals');
        expect(filteredValue.length).toEqual(10);
        filteredValue = filterService.filter(data, [''], 'BMW', 'equals');
        expect(filteredValue.length).toEqual(0);
    });
    it('Should filter by notEquals', () => {
        let filteredValue = filterService.filter(data, ['brand'], 'BMW', 'notEquals');
        expect(filteredValue.length).toEqual(9);
        filteredValue = filterService.filter(data, ['brand'], '', 'notEquals');
        expect(filteredValue.length).toEqual(0);
        filteredValue = filterService.filter(data, [''], 'BMW', 'notEquals');
        expect(filteredValue.length).toEqual(10);
    });
    it('Should filter by lt', () => {
        let filteredValue = filterService.filter(timeData, ['date'], 'Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)', 'lt');
        expect(filteredValue.length).toEqual(1);
        filteredValue = filterService.filter(timeData, ['date'], '', 'lt');
        expect(filteredValue.length).toEqual(0);
        filteredValue = filterService.filter(timeData, [''], 'Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)', 'lt');
        expect(filteredValue.length).toEqual(0);
    });
    it('Should filter by lte', () => {
        let filteredValue = filterService.filter(timeData, ['date'], 'Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)', 'lte');
        expect(filteredValue.length).toEqual(2);
        filteredValue = filterService.filter(timeData, ['date'], '', 'lte');
        expect(filteredValue.length).toEqual(0);
        filteredValue = filterService.filter(timeData, [''], 'Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)', 'lte');
        expect(filteredValue.length).toEqual(0);
    });
    it('Should filter by gt', () => {
        let filteredValue = filterService.filter(timeData, ['date'], 'Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)', 'gt');
        expect(filteredValue.length).toEqual(1);
        filteredValue = filterService.filter(timeData, ['date'], '', 'gt');
        expect(filteredValue.length).toEqual(3);
        filteredValue = filterService.filter(timeData, [''], 'Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)', 'gt');
        expect(filteredValue.length).toEqual(0);
    });
    it('Should filter by gte', () => {
        let filteredValue = filterService.filter(timeData, ['date'], 'Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)', 'gte');
        expect(filteredValue.length).toEqual(2);
        filteredValue = filterService.filter(timeData, ['date'], '', 'gte');
        expect(filteredValue.length).toEqual(3);
        filteredValue = filterService.filter(timeData, [''], 'Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)', 'gte');
        expect(filteredValue.length).toEqual(0);
    });
    it('Should filter by in', () => {
        let filteredValue = filterService.filter(data, ['brand'], ['BMW', 'Mercedes', 'Ford'], 'in');
        expect(filteredValue.length).toEqual(3);
        filteredValue = filterService.filter(data, ['brand'], ['BMW'], 'in');
        expect(filteredValue.length).toEqual(1);

        filteredValue = filterService.filter(data, ['brand'], ['Chevrolet'], 'in');
        expect(filteredValue.length).toEqual(0);

        filteredValue = filterService.filter(data, ['brand'], undefined, 'in');
        expect(filteredValue.length).toEqual(10);
        filteredValue = filterService.filter(data, ['brand'], null, 'in');
        expect(filteredValue.length).toEqual(10);
        filteredValue = filterService.filter(data, ['brand'], [], 'in');
        expect(filteredValue.length).toEqual(10);

        filteredValue = filterService.filter(data, [''], 'BMW', 'in');
        expect(filteredValue.length).toEqual(0);
    });
});
