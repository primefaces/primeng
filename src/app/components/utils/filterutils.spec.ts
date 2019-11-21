import { FilterUtils } from './filterutils';

describe('FilterUtils Suite', () => {

    let data: any = [
        {brand: "VW", year: 2012, color: {name:"Orange"}, vin: "dsad231ff"},
        {brand: "Audi", year: 2011, color: {name:"Black"}, vin: "gwregre345"},
        {brand: "Renault", year: 2005, color: {name:"Black"}, vin: "h354htr"},
        {brand: "BMW", year: 2003, color: {name:"Blue"}, vin: "j6w54qgh"},
        {brand: "Mercedes", year: 1995, color: {name:"Red"}, vin: "hrtwy34"},
        {brand: "Volvo", year: 2005, color: {name:"Orange"}, vin: "jejtyj"},
        {brand: "Honda", year: 2012, color: {name:"Blue"}, vin: "g43gr"},
        {brand: "Jaguar", year: 2013,color: {name:"Black"}, vin: "greg34"},
        {brand: "Ford", year: 2000, color: {name:"White"}, vin: "h54hw5"},
        {brand: "Fiat", year: 2013, color: {name:"Yellow"}, vin: "245t2s"}
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
