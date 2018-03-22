module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine', 'karma-typescript'],

    plugins: [
        'karma-jasmine',
        'karma-typescript',
        'karma-chrome-launcher',
        'karma-coverage',
        'karma-mocha-reporter',
        'karma-code-reporter'
    ],

    files: [
        { pattern: 'src/**/*.ts' },
        { pattern: 'test/fixtures/notimplementedcmd/*.ts' },
        { pattern: 'test/mocks.ts' },
        { pattern: 'test/**/*.spec.ts' }
    ],

    exclude: [
        'src/@types/**/*.ts'
    ],

    preprocessors: {
        'test/**/notimplementedcmd/*.ts': ['karma-typescript'],
        'test/**/mocks.ts': ['karma-typescript'],
        'src/**/!(*.spec).ts': ['karma-typescript', 'coverage'],
        'test/**/*.spec.ts': ['karma-typescript'],
        'src/**/*.ts': ['coverage'],
    },

    webpackMiddleware: {
        noInfo: true,
        stats: 'errors-only'
    },

    karmaTypescriptConfig: {
        tsconfig: './tsconfig.json',
        bundlerOptions: {
            ignore: ['fs-extra'],
            ignore: ['graceful-fs']
        },
        coverageReporter: {
            dir: './toto/toto'
        },
        reports: {
            'cobertura': {
                'directory': './output/coverage',
                'subdirectory': 'cobertura',
                'filename': 'cobertura.xml'
            },
            'html': {
                'directory': './output/coverage',
                'subdirectory': 'html',
                'filename': 'index.html'
            },
            'clover': './output/coverage',
            'json-summary': './output/coverage',
            'json': './output/coverage',
            'lcovonly': './output/coverage',
            'teamcity': './output/coverage',
            'text-summary': './output/coverage',
            'text': './output/coverage'
        }
    },

    reporters: ['progress', 'karma-typescript', 'code', 'mocha', 'coverage'],

    // Port du serveur Web
    port: 9876,

    colors: true,

    // Niveau de logging
    // Valeurs possibles: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Activer/Désactiver la surveillance des fichiers et l'ex�cution des tests qaund un fichier change
    autoWatch: true,

    browsers: ['Chrome'],

    singleRun: false,

    concurrency: Infinity,

    // Configurer la reporter Mocha
    mochaReporter: {
        colors: {
            success: 'green',
            info: 'blue',
            warning: 'orange',
            error: 'red'
        }
    },

    codeReporter: {
        outputPath: './output/code',
        testFiles: ['test/**/*.test.ts']
    }
  })
}
