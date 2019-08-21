import { FilterUtils } from './filterutils';

describe('FilterUtils Suite', () => {

    let data: any = [
        {brand: "VW", year: 2012, color: {name:"Orange"}, vin: "dsad231ff", dealers: ['Philadelphia', 'Boston']},
        {brand: "Audi", year: 2011, color: {name:"Black"}, vin: "gwregre345", dealers: ['Philadelphia']},
        {brand: "Renault", year: 2005, color: {name:"Black"}, vin: "h354htr", dealers: ['New York', 'Chicago']},
        {brand: "BMW", year: 2003, color: {name:"Blue"}, vin: "j6w54qgh", dealers: ['Dallas']},
        {brand: "Mercedes", year: 1995, color: {name:"Red"}, vin: "hrtwy34", dealers: []},
        {brand: "Volvo", year: 2005, color: {name:"Orange"}, vin: "jejtyj", dealers: []},
        {brand: "Honda", year: 2012, color: {name:"Blue"}, vin: "g43gr" , dealers: ['Baltimore', 'Denver']},
        {brand: "Jaguar", year: 2013,color: {name:"Black"}, vin: "greg34", dealers: ['Denver', 'Washington']},
        {brand: "Ford", year: 2000, color: {name:"White"}, vin: "h54hw5", dealers: []},
        {brand: "Fiat", year: 2013, color: {name:"Yellow"}, vin: "245t2s", dealers: ['Portland']}
    ];
    let timeData  = [
        {date:'Tue Aug 04 2019 00:00:00 GMT+0300 (GMT+03:00)'},
        {date:'Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)'},
        {date:'Tue Aug 07 2019 00:00:00 GMT+0300 (GMT+03:00)'}
    ];

    it('Should filter by startsWith', () => {
        let filteredValue = FilterUtils.filter(data,['brand'],'f','startsWith');
        expect(filteredValue.length).toEqual(2);
        filteredValue = FilterUtils.filter(data,['brand'],'','startsWith');
        expect(filteredValue.length).toEqual(10);
        filteredValue = FilterUtils.filter(data,[''],'f','startsWith');
        expect(filteredValue.length).toEqual(0);
        expect(FilterUtils.startsWith(null,"brand")).toBeFalsy();
    });

    it('Should filter by contains', () => {
        let filteredValue = FilterUtils.filter(data,['brand'],'f','contains');
        expect(filteredValue.length).toEqual(2);
        filteredValue = FilterUtils.filter(data,['brand'],'','contains');
        expect(filteredValue.length).toEqual(10);
        filteredValue = FilterUtils.filter(data,[''],'f','contains');
        expect(filteredValue.length).toEqual(0);
        expect(FilterUtils.contains(null,"brand")).toBeFalsy();
    });

    it('Should filter by endsWith', () => {
        let filteredValue = FilterUtils.filter(data,['brand'],'t','endsWith');
        expect(filteredValue.length).toEqual(2);
        filteredValue = FilterUtils.filter(data,['brand'],'','endsWith');
        expect(filteredValue.length).toEqual(10);
        filteredValue = FilterUtils.filter(data,[''],'t','endsWith');
        expect(filteredValue.length).toEqual(0);
        expect(FilterUtils.endsWith(null,"brand")).toBeFalsy();
    });

    it('Should filter by equals', () => {
        let filteredValue = FilterUtils.filter(data,['brand'],'BMW','equals');
        expect(filteredValue.length).toEqual(1);
        filteredValue = FilterUtils.filter(data,['brand'],'','equals');
        expect(filteredValue.length).toEqual(10);
        filteredValue = FilterUtils.filter(data,[''],'BMW','equals');
        expect(filteredValue.length).toEqual(0);
        expect(FilterUtils.equals(null,"brand")).toBeFalsy();
    });

    it('Should filter by notEquals', () => {
        let filteredValue = FilterUtils.filter(data,['brand'],'BMW','notEquals');
        expect(filteredValue.length).toEqual(9);
        filteredValue = FilterUtils.filter(data,['brand'],'','notEquals');
        expect(filteredValue.length).toEqual(0);
        filteredValue = FilterUtils.filter(data,[''],'BMW','notEquals');
        expect(filteredValue.length).toEqual(10);
        expect(FilterUtils.notEquals(null,"brand")).toBeTruthy();
    });

    it('Should filter by in', () => {
        let filteredValue = FilterUtils.filter(data, ['brand'], ['BMW', 'Jaguar', 'Subaru'], 'in');
        expect(filteredValue.length).toEqual(2);
        filteredValue = FilterUtils.filter(data, ['brand'], undefined, 'in');
        expect(filteredValue.length).toEqual(10);
        filteredValue = FilterUtils.filter(data, ['brand'], null, 'in');
        expect(filteredValue.length).toEqual(10);
        filteredValue = FilterUtils.filter(data, ['brand'], [], 'in');
        expect(filteredValue.length).toEqual(10);
        filteredValue = FilterUtils.filter(data, ['brand'], ['Kia'], 'in');
        expect(filteredValue.length).toEqual(0);
        expect(FilterUtils.in('Test', ['Some', 'Allowed', 'Test', 'Values'])).toBe(true);
        expect(FilterUtils.in(undefined, [new Date('Mon Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)')])).toBe(false);
        expect(FilterUtils.in(null, [new Date('Mon Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)')])).toBe(false);
        expect(FilterUtils.in('Mon Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)', undefined)).toBe(true);
        expect(FilterUtils.in('Mon Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)', null)).toBe(true);
        expect(FilterUtils.in('Mon Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)', [])).toBe(true);
        expect(FilterUtils.in('Mon Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)', [])).toBe(true);
        expect(FilterUtils.in(new Date('Tue Aug 06 2019 00:00:00 GMT+0300 (GMT+03:00)'), [new Date('Tue Aug 06 2019 00:00:00 GMT+0300 (GMT+03:00)')])).toBe(true);
        expect(FilterUtils.in(new Date('Tue Aug 06 2019 00:00:00 GMT+0300 (GMT+03:00)'), [new Date('Mon Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)')])).toBe(false);
        expect(FilterUtils.in(new Date('Tue Aug 06 2019 00:00:00 GMT+0300 (GMT+03:00)'), [new Date('Mon Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)'), new Date('Tue Aug 06 2019 00:00:00 GMT+0300 (GMT+03:00)')])).toBe(true);
    });

    it('Should filter by containsAny', () => {
        let filteredValue = FilterUtils.filter(data, ['dealers'], ['Denver', 'Philadelphia'], 'containsAny');
        expect(filteredValue.length).toEqual(4);
        filteredValue = FilterUtils.filter(data, ['dealers'], ['Lima', 'Santiago'], 'containsAny');
        expect(filteredValue.length).toEqual(0);
        filteredValue = FilterUtils.filter(data, ['dealers'], [], 'containsAny');
        expect(filteredValue.length).toEqual(10);
        filteredValue = FilterUtils.filter(data, [], ['Dallas'], 'containsAny');
        expect(filteredValue.length).toEqual(0);
        expect(FilterUtils.containsAny(['A', 'Test'], undefined)).toBe(true);
        expect(FilterUtils.containsAny(['A', 'Test'], null)).toBe(true);
        expect(FilterUtils.containsAny(['A', 'Test'], [])).toBe(true);
        expect(FilterUtils.containsAny(undefined, ['Value'])).toBe(false);
        expect(FilterUtils.containsAny(null, ['Value'])).toBe(false);
        expect(FilterUtils.containsAny([], ['Value'])).toBe(false);
        expect(FilterUtils.containsAny(['A', 'Test'], ['Some', 'Allowed', 'Test', 'Values'])).toBe(true);
        expect(FilterUtils.containsAny(['One', 'Two'], ['Three', 'Four'])).toBe(false);
    });

    it('Should filter by lt', () => {
        let filteredValue = FilterUtils.filter(timeData,['date'],'Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)','lt');
        expect(filteredValue.length).toEqual(1);
        filteredValue = FilterUtils.filter(timeData,['date'],'','lt');
        expect(filteredValue.length).toEqual(0);
        filteredValue = FilterUtils.filter(timeData,[''],'Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)','lt');
        expect(filteredValue.length).toEqual(3);
        expect(FilterUtils.lt('Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)',null)).toBeTruthy();
        expect(FilterUtils.lt(null,'Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)')).toBeFalsy();
        expect(FilterUtils.lt(new Date('Tue Aug 06 2019 00:00:00 GMT+0300 (GMT+03:00)'),new Date('Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)'))).toBeFalsy();
    });

    it('Should filter by lte', () => {
        let filteredValue = FilterUtils.filter(timeData,['date'],'Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)','lte');
        expect(filteredValue.length).toEqual(2);
        filteredValue = FilterUtils.filter(timeData,['date'],'','lte');
        expect(filteredValue.length).toEqual(0);
        filteredValue = FilterUtils.filter(timeData,[''],'Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)','lte');
        expect(filteredValue.length).toEqual(3);
        expect(FilterUtils.lte('Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)',null)).toBeTruthy();
        expect(FilterUtils.lte(null,'Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)')).toBeFalsy();
        expect(FilterUtils.lte(new Date('Tue Aug 06 2019 00:00:00 GMT+0300 (GMT+03:00)'),new Date('Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)'))).toBeFalsy();
    });

    it('Should filter by gt', () => {
        let filteredValue = FilterUtils.filter(timeData,['date'],'Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)','gt');
        expect(filteredValue.length).toEqual(1);
        filteredValue = FilterUtils.filter(timeData,['date'],'','gt');
        expect(filteredValue.length).toEqual(3);
        filteredValue = FilterUtils.filter(timeData,[''],'Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)','gt');
        expect(filteredValue.length).toEqual(0);
        expect(FilterUtils.gt('Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)',null)).toBeTruthy();
        expect(FilterUtils.gt(null,'Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)')).toBeFalsy();
        expect(FilterUtils.gt(new Date('Tue Aug 06 2019 00:00:00 GMT+0300 (GMT+03:00)'),new Date('Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)'))).toBeTruthy();
    });

    it('Should filter by gte', () => {
        let filteredValue = FilterUtils.filter(timeData,['date'],'Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)','gte');
        expect(filteredValue.length).toEqual(2);
        filteredValue = FilterUtils.filter(timeData,['date'],'','gte');
        expect(filteredValue.length).toEqual(3);
        filteredValue = FilterUtils.filter(timeData,[''],'Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)','gte');
        expect(filteredValue.length).toEqual(0);
        expect(FilterUtils.gte('Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)',null)).toBeTruthy();
        expect(FilterUtils.gte(null,'Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)')).toBeFalsy();
        expect(FilterUtils.gte(new Date('Tue Aug 06 2019 00:00:00 GMT+0300 (GMT+03:00)'),new Date('Tue Aug 05 2019 00:00:00 GMT+0300 (GMT+03:00)'))).toBeTruthy();
    });
});
