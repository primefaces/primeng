import { FilterService } from './filterservice';
describe('FilterService Suite', () => {
    let data: any = [
        { brand: 'VW', year: 2012, color: { name: 'Orange' }, vin: 'dsad231ff', price: '1000.0' },
        { brand: 'Audi', year: 2011, color: { name: 'Black' }, vin: 'gwregre345', price: '4000.0' },
        { brand: 'Renault', year: 2005, color: { name: 'Black' }, vin: 'h354htr', price: '5000.0' },
        { brand: 'BMW', year: 2003, color: { name: 'Blue' }, vin: 'j6w54qgh', price: '3000.0000000' },
        { brand: 'Mercedes', year: 1995, color: { name: 'Red' }, vin: 'hrtwy34', price: '2000.0' },
        { brand: 'Volvo', year: 2005, color: { name: 'Orange' }, vin: 'jejtyj', price: '2000.0' },
        { brand: 'Honda', year: 2012, color: { name: 'Blue' }, vin: 'g43gr', price: '4000.0' },
        { brand: 'Jaguar', year: 2013, color: { name: 'Black' }, vin: 'greg34', price: '1000.0' },
        { brand: 'Ford', year: 2000, color: { name: 'White' }, vin: 'h54hw5', price: '2000.0' },
        { brand: 'Fiat', year: 2013, color: { name: 'Yellow' }, vin: '245t2s', price: '5000.0' }
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
        filteredValue = filterService.filter(data, ['price'], 3000, 'equals');
        expect(filteredValue.length).toEqual(1);
        filteredValue = filterService.filter(data, ['year'], 2012, 'equals');
        expect(filteredValue.length).toEqual(2);
    });
    it('Should filter by notEquals', () => {
        let filteredValue = filterService.filter(data, ['brand'], 'BMW', 'notEquals');
        expect(filteredValue.length).toEqual(9);
        filteredValue = filterService.filter(data, ['brand'], '', 'notEquals');
        expect(filteredValue.length).toEqual(0);
        filteredValue = filterService.filter(data, [''], 'BMW', 'notEquals');
        expect(filteredValue.length).toEqual(10);
        filteredValue = filterService.filter(data, ['price'], 3000, 'notEquals');
        expect(filteredValue.length).toEqual(9);
        filteredValue = filterService.filter(data, ['year'], 2012, 'notEquals');
        expect(filteredValue.length).toEqual(8);
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
