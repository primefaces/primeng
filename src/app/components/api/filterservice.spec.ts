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
});
