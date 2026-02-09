import {
  isValidTimeZone,
  normalizeTimeZone,
} from 'src/contexts/shared/utils/timezone-validator.util';

describe('TimeZone Validator', () => {
  describe('isValidTimeZone', () => {
    it('debería retornar true para UTC', () => {
      expect(isValidTimeZone('UTC')).toBe(true);
    });

    it('debería retornar true para America/Lima', () => {
      expect(isValidTimeZone('America/Lima')).toBe(true);
    });

    it('debería retornar true para Europe/Madrid', () => {
      expect(isValidTimeZone('Europe/Madrid')).toBe(true);
    });

    it('debería retornar true para Asia/Tokyo', () => {
      expect(isValidTimeZone('Asia/Tokyo')).toBe(true);
    });

    it('debería retornar false para timezone inválido', () => {
      expect(isValidTimeZone('Invalid/Timezone')).toBe(false);
    });

    it('debería retornar false para string vacío', () => {
      expect(isValidTimeZone('')).toBe(false);
    });

    it('debería retornar false para string con espacios', () => {
      expect(isValidTimeZone('   ')).toBe(false);
    });
  });

  describe('normalizeTimeZone', () => {
    it('debería retornar UTC cuando no se pasa timezone', () => {
      expect(normalizeTimeZone(undefined)).toBe('UTC');
    });

    it('debería retornar el timezone cuando es válido', () => {
      expect(normalizeTimeZone('America/Lima')).toBe('America/Lima');
    });

    it('debería retornar el timezone cuando es UTC', () => {
      expect(normalizeTimeZone('UTC')).toBe('UTC');
    });

    it('debería retornar UTC cuando el timezone es inválido', () => {
      expect(normalizeTimeZone('Foo/Bar')).toBe('UTC');
    });

    it('debería hacer trim del timezone', () => {
      expect(normalizeTimeZone('  UTC  ')).toBe('UTC');
    });

    it('debería hacer trim del timezone válido', () => {
      expect(normalizeTimeZone('  America/Lima  ')).toBe('America/Lima');
    });

    it('debería retornar UTC cuando es string vacío', () => {
      expect(normalizeTimeZone('')).toBe('UTC');
    });
  });
});
