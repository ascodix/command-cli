export function CmdConfig(defaultConfig: object) {

    return function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {

        return class extends constructor {
            configFile = constructor.name.toLowerCase() + '.config.json';
            defaultConfig = defaultConfig;
        }
    }
}