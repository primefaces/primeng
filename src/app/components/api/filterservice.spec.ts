import { FilterService } from './filterservice';

describe('FilterService', () => {
  describe('startsWith()', () => {
    const startsWith = new FilterService().filters.startsWith;

    it('deve retornar true se o filtro for undefined, null ou uma string em branco', () => {
      expect(startsWith('Leandro Lo', undefined)).toBe(true);
      expect(startsWith('Leandro Lo', null)).toBe(true);
      expect(startsWith('Leandro Lo', '')).toBe(true);
      expect(startsWith('Leandro Lo', ' ')).toBe(true);
    });

    it('deve retornar false se o valor for undefined ou null', () => {
      expect(startsWith(undefined, 'Jansen Gomes')).toBe(false)
      expect(startsWith(undefined, 'Jansen Gomes')).toBe(false)
    })

    it('deve retornar true se as strings começarem igual', () => {
      expect(startsWith('Micael Galvão', 'Mica')).toBe(true)
    })

    it('deve retornar false se as strings não começarem igual', () => {
      expect(startsWith('Fabrício Andrey', 'Diogo')).toBe(false)
    })
  });

  describe('contains()', () => {
    const contains = new FilterService().filters.contains

    it('deve retornar true se o filtro for undefined, null ou uma string em branco', () => {
      expect(contains('Leandro Lo', undefined)).toBe(true);
      expect(contains('Leandro Lo', null)).toBe(true);
      expect(contains('Leandro Lo', '')).toBe(true);
      expect(contains('Leandro Lo', ' ')).toBe(true);
    })

    it('deve retornar false se o valor for undefined ou null', () => {
      expect(contains(undefined, 'Jansen Gomes')).toBe(false)
      expect(contains(undefined, 'Jansen Gomes')).toBe(false)
    })

    it('deve retornar true se a string de valor contém o filtro', () => {
      expect(contains('Leandro Lo', 'Lo')).toBe(true)
    })

    it('deve retornar false se a string de valor não contém o filtro', () => {
      expect(contains('Leandro Lo', 'Leo')).toBe(false)
    })
  })

  describe('notContains()', () => {
    const notContains = new FilterService().filters.notContains

    it('deve retornar true se o filtro for undefined, null ou uma string em branco', () => {
      expect(notContains('Leandro Lo', undefined)).toBe(true);
      expect(notContains('Leandro Lo', null)).toBe(true);
      expect(notContains('Leandro Lo', '')).toBe(true);
      expect(notContains('Leandro Lo', ' ')).toBe(true);
    })

    it('deve retornar false se o valor for undefined ou null', () => {
      expect(notContains(undefined, 'Jansen Gomes')).toBe(false)
      expect(notContains(undefined, 'Jansen Gomes')).toBe(false)
    })

    it('deve retornar true se a string de valor não contém o filtro', () => {
        expect(notContains('Leandro Lo', 'Leo')).toBe(true)
      })

      it('deve retornar false se a string de valor contém o filtro', () => {
        expect(notContains('Leandro Lo', 'Lo')).toBe(false)
    })
  })

  describe('endsWith()', () => {
    const endsWith = new FilterService().filters.endsWith

    it('deve retornar true se o filtro for undefined, null ou uma string em branco', () => {
      expect(endsWith('Leandro Lo', undefined)).toBe(true);
      expect(endsWith('Leandro Lo', null)).toBe(true);
      expect(endsWith('Leandro Lo', '')).toBe(true);
      expect(endsWith('Leandro Lo', ' ')).toBe(true);
    })

    it('deve retornar false se o valor for undefined ou null', () => {
      expect(endsWith(undefined, 'Jansen Gomes')).toBe(false)
      expect(endsWith(undefined, 'Jansen Gomes')).toBe(false)
    })

    it('deve retornar true se o valor termina com o filtro', () => {
        expect(endsWith('Leandro Lo', 'Lo')).toBe(true)
      })

      it('deve retornar false se o valor não termina com o filtro', () => {
        expect(endsWith('Leandro Lo', 'Leandro')).toBe(false)
    })
  })

  describe('equals()', () => {
    const equals = new FilterService().filters.equals

    it('deve retornar true se o filtro for undefined, null ou uma string em branco', () => {
      expect(equals('Leandro Lo', undefined)).toBe(true);
      expect(equals('Leandro Lo', null)).toBe(true);
      expect(equals('Leandro Lo', '')).toBe(true);
      expect(equals('Leandro Lo', ' ')).toBe(true);
    })

    it('deve retornar false se o valor for undefined ou null', () => {
      expect(equals(undefined, 'Jansen Gomes')).toBe(false)
      expect(equals(undefined, 'Jansen Gomes')).toBe(false)
    })

    it('deve retornar true se o valor é igual ao filtro', () => {
        expect(equals('Leandro Lo', 'Leandro Lo')).toBe(true)
      })

    it('deve retornar false se o valor não é igual ao filtro', () => {
        expect(equals('Leandro Lo', 'Leandro')).toBe(false)
    })
  })

  describe('notEquals()', () => {
    const notEquals = new FilterService().filters.notEquals

    it('deve retornar false se o filtro for undefined, null ou uma string em branco', () => {
      expect(notEquals('Leandro Lo', undefined)).toBe(false);
      expect(notEquals('Leandro Lo', null)).toBe(false);
      expect(notEquals('Leandro Lo', '')).toBe(false);
      expect(notEquals('Leandro Lo', ' ')).toBe(false);
    })

    it('deve retornar true se o valor for undefined ou null', () => {
      expect(notEquals(undefined, 'Jansen Gomes')).toBe(true)
      expect(notEquals(undefined, 'Jansen Gomes')).toBe(true)
    })

    it('deve retornar true se o valor é diferente filtro', () => {
      expect(notEquals('Leandro Lo', 'Mica Galvão')).toBe(true)
    })

    it('deve retornar false se o valor é igual ao filtro', () => {
      expect(notEquals('Leandro Lo', 'Leandro Lo')).toBe(false)
    })
  })
});
