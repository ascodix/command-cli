import { ICliOptions } from '../../src/cli';
import { ExternalsService } from '../../src/services';
import { Mocks } from '../mocks';
import entrypoint from '../../src/cli/entrypoint';

describe('Entrypoint', () => {

    let fs: any;
    let options: ICliOptions = {
        args: [],
        basedir: '.',
        stream: Mocks.GlobalConfig().stream
    };
    let badJson: any = {};
    let json: any = {
        'project': {
            'name': 'test generic-cli'
        },
        'report': {
            'path': 'report'
        }
    };

    beforeEach(() => {
        
        fs = {
            readJson: (filepath: string): Promise<any> => {
                return Promise.resolve(json);
            }
        }

        ExternalsService.setFs(fs);
        ExternalsService.setGetModule((pFile: string): Promise<any> => {
            const lGlobal: any = global;
            for (const key in lGlobal.__karmaTypescriptModules__) {
                if (key.endsWith(pFile) && !key.includes('node_modules')) {
                    return Promise.resolve(lGlobal.__karmaTypescriptModules__[key].exports);
                }
            }
            return Promise.reject('Module ' + pFile + ' not found!');
        });
    });

    it('Instanciation du point d\'entrée avec un fichier json correct', (done) => {
        entrypoint(options).then(function (json: any) {
            expect(json).toEqual(0);
            done();
        }).catch((error) => {
            done.fail();
        });
        
    });

    /*it('Instanciation du point d\'entrée avec un fichier json incorrect doit lancer une exception', (done) => {
        fs = {
            readJson: (filepath: string): Promise<any> => {
                return Promise.resolve(badJson);
            }
        }

        entrypoint(options).then(function (json: any) {
            done.fail();
        }).catch((error) => {
            expect(true).toBe(true);
            done();
        });
    });*/

});
