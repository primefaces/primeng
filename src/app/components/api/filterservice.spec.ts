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
});
