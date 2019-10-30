import { ObjectUtils } from './objectutils';

describe('ObjectUtils Suite', () => {

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

    it('Should resolve field data', () => {
        let obj = {
            firstname: 'Silvio',
            lastname: 'Andolini',
            address: {
                country: {
                    name: 'Italy'
                },
                city: 'Corleone'
            }
        }

        expect(ObjectUtils.resolveFieldData(obj, 'firstname')).toBe('Silvio');
        expect(ObjectUtils.resolveFieldData(obj, 'lastname')).toBe('Andolini');
        expect(ObjectUtils.resolveFieldData(obj, 'address.city')).toBe('Corleone');
        expect(ObjectUtils.resolveFieldData(obj, 'address.country.name')).toBe('Italy');
        expect(ObjectUtils.resolveFieldData(obj, 'age')).toBeUndefined();
    });

    it('Should relocate an item in array', () => {
        let arr: string[] = ['New York', 'Istanbul', 'Paris', 'Barcelona', 'London'];
        ObjectUtils.reorderArray(arr, 3, 1);
        expect(arr).toEqual(['New York', 'Barcelona', 'Istanbul', 'Paris', 'London']);
    });

    it('Should inject an item as indexed', () => {
        let sourceArr: string[] = ['New York', 'Istanbul', 'Paris', 'Barcelona', 'London'];
        let arr: string[] = [];

        ObjectUtils.insertIntoOrderedArray('Istanbul', 1, arr, sourceArr);
        expect(arr).toEqual(['Istanbul']);

        ObjectUtils.insertIntoOrderedArray('Paris', 2, arr, sourceArr);
        ObjectUtils.insertIntoOrderedArray('New York', 0, arr, sourceArr);
        ObjectUtils.insertIntoOrderedArray('London', 4, arr, sourceArr);
        ObjectUtils.insertIntoOrderedArray('Barcelona', 3, arr, sourceArr);
        expect(arr).toEqual(['New York', 'Istanbul', 'Paris', 'Barcelona', 'London']);
    });

    it('Should check if simple objects are equal', () => {
      const [data0, data1] = data.slice(0, 2);
      expect(ObjectUtils.equals(data0, data0)).toBe(true);
      expect(ObjectUtils.equals(data0, Object.assign({}, data0))).toBe(true);
      expect(ObjectUtils.equals(data0, data1)).toBe(false);
    });

    it('Should check if nested objects are equal', () => {
      const arr = [1, 2, [3, 4]];
      expect(ObjectUtils.equals(arr, [1, 2, [3, 4]])).toBe(true);

      const arr2 = [1, 2, [3, 4, 5]];
      expect(ObjectUtils.equals(arr, arr2)).toBe(false);

      const obj = {a: 1, b: {c: 3, d: 4}};
      expect(ObjectUtils.equals(obj, Object.assign({}, obj))).toBe(true);

      const obj2 = {a: 1, b: {c: 3, d: 5}};
      expect(ObjectUtils.equals(obj, obj2)).toBe(false);
    });

    it('Should be able to compare frozen nested objects', () => {
      const obj1 = {a: 1, b: {c: 3, d: 4}};
      const obj2 = {a: 1, b: {c: 3, d: 4}};
      Object.preventExtensions(obj1);
      Object.preventExtensions(obj2);
      expect(ObjectUtils.equals(obj1, obj2)).toBe(true);
    });

    it('Should be able to compare dates', () => {
        const obj1 = new Date(2018, 0, 1);
        const obj2 = new Date(2018, 0, 1);
        const obj3 = new Date(2020, 0, 1);
        expect(ObjectUtils.equals(obj1, obj2)).toBe(true);
        expect(ObjectUtils.equals(obj1, obj3)).toBe(false);
    });
});
