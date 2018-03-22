import { Option } from '../../src/commands';

describe('Option', () => {

    let option: Option;

    beforeEach(() => {
        option = new Option('test', Boolean, false, ['t'], 'Description de l\'option test')
    });

    it('Instanciation de l\'option', () => {
        expect(option).toBeDefined();
        expect(option.name).toEqual('test');
        expect(option.type).toEqual(Boolean);
        expect(option.default).toEqual(false);
        expect(option.aliases).toEqual(['t']);
        expect(option.description).toEqual('Description de l\'option test');
    });

});
