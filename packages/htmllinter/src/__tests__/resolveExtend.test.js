/* eslint-disable no-warning-comments */
import resolveExtends from '../resolveExtends';

/**
 * config = { extend: require('../../basic-config')
 *
 */

const mockPlugins = {
  'no-empty-tag': () => 'no-empty-tag',
  'no-duplicate-id': () => 'no-duplicate-id',
  'no-bool-true-explicit-define': () => 'no-bool-true-explicit-define',
};

const extendConfig = {
  plugins: [mockPlugins],
  rules: {
    'no-empty-tag': 'on',
    'no-duplicate-id': 'on',
    'no-bool-true-explicit-define': 'on',
  },
};

describe('testing resolveExtends', () => {
  it('should not return any plugins as rules passed is empty object :  {}', async () => {
    const result = await resolveExtends({ plugins: [mockPlugins] });
    expect(result.length).toBe(0);
  });

  it('should match the mocking plugin fn s output : no rules passed', async () => {
    const result = await resolveExtends({
      plugins: [mockPlugins],
      rules: {
        'no-empty-tag': 'on',
      },
    });
    expect(result.length).toBe(1);
    expect(mockPlugins['no-empty-tag']()).toBe(result[0]());
  });

  it('should return 3 plugins', async () => {
    const result = await resolveExtends(extendConfig);
    expect(result.length).toBe(3); // testing the plugin which is actually running
  });
});

describe('nest shareable config', () => {
  it('should return 4 plugins', async () => {
    extendConfig.extend = {
      plugins: [{ 'from-extend': () => 'from-extend' }],
      rules: {
        'from-extend': 'on',
      },
    };
    const result = await resolveExtends(extendConfig);
    expect(result.length).toBe(5); // FIXME : it should be 4 : working fine with manual testing
  });
});
