## Table des matières

- [A propos](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Développement](#development)
- [License](#license)

## A propos

Ce projet permet de lancer des commandes propres au framework et aux applications myway

## Installation

Installation par npm::
```
npm install -g generic-cli
```

## Documentation


## Développement

### Ajout d'une nouvelle commande
Pour ajouter une nouvelle commande il faut dans un premier temps créer deux classes:
- la classe de configuration de la commande
- la classe de la commande

Ces deux classes sont à rajouter dans un répertoire dédié "macommande" dans le répertoire src/commands/ :
- src/commands/macommande/macommande.ts
- src/commands/macommande/macommande-config.ts
- src/commands/macommande/index.ts

Le fichier index.ts contient la déclaration de l'ensemble des fichiers du répertoire de la commande à exporter :

```typescript
export * from './macommande';
export * from './macommande-config';
```

La classe de configuration de la commande doit :
- étendre la classe **CommandConfig**
- avoir l'annotation **@JsonObject** au dessus du nom de sa classe
- avoir l'annotation **@JsonProperty** au dessus de chacune des propriétés de configuration 
- chacune des propriétés de configuration doit être instancié par une valeur par défaut

PS: pour la documentation sur les annotations voir: https://www.npmjs.com/package/json2typescript

```typescript
import { CommandConfig } from '../command-config';
import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject
export class MaCommandeConfig extends CommandConfig {

    @JsonProperty("property1", String)
    private _property1: string = undefined;

    get property1(): string {
        return this._property1;
    }

    set property1(property1: string) {
        this._property1 = property1;
    }
}
```

La classe de la commande doit : 
- étendre la classe **Command** qui est typé, avec comme type générique la classe de configuration (MaCommandeConfig dans le cas présent)
- le constructeur de la commande doit avoir en 1er paramètre cette classe de config, puis son nom, sa description, ses alias, et ses options
- avoir l'annotation **@CmdConfig** au dessus du nom de sa classe qui prend comme paramètre la configuration des paramètres par défaut correspondant à la classe de configuration

```typescript
import { Command } from '../command';
import { Option } from '../option';
import { Constants } from '../../core/constants';
import { CmdConfig } from '../class-cmd-config.decorator';
import { HelpConfig } from './help-config';
import { CleanConfig } from "../clean/clean-config";

/**
 * Commande d'aide
 */
@CmdConfig({
    "property1": "value1"
})
export class Macommande extends Command<MaCommandeConfig> {

    constructor() {
        let availableOptions: Option[] = [
            
        ];

        super(MaCommandeConfig, 'macommande', 'mc', [], availableOptions);
    }

    public beforeRun(args: string[]): Promise<any> {
        return Promise.resolve();
    }

    public run(): Promise<any> {
        console.log('HELP COMMAND RUN : ' +this.context.getProject().root);
        console.log('HELP COMMAND RUN CONFIG : ');
        console.log(JSON.stringify(this.config));
        return Promise.resolve('Method beforeRun inside Help command not implemented.');
    }
}
```

**Le nom de la classe est très important**: en effet quand vous lancerez la commande via gcl :  ```mw macommande```, macommande doit correspondre exactement au paramètre passé au constructeur

**Un fichier de configuration permet de changer les paramètres par défaut si besoin**: pour cela il faut le créer à la racine du projet. Sa nomenclature correspond au nom de la classe suivi de .config.json, dans notre exemple **macommande.config.json**
Les prpriétés entre ce fichier de configuration, et la configuration par défaut situés dans l'annotation sont mergées. Mais si une propriétés est présente dans le fichier de configuration et dans l'annotation, c'est cette première qui est prise en compte.


### Déclaration d'une nouvelle commande

Une fois la commande et sa configuration créés il faut déclarer la commande dans le système. Pour cela il faut modifier le fichier **entrypoint.ts**.

Il y 3 lignes à ajouter:
- en début de fichier, ajouter l'import : 

```typescript import { MaCommande } from "../commands/macommande";```

- en dessous la fonction entrypoint, ajouter la déclaration : 

```typescript let macommande: MaCommande = new MaCommande();```

- dans le then de la promesse, ajouter la commande à la liste des commandes : 

```typescript commands.push(macommande);```

## Testing
```
npm install -g karma-cli
```
Run `npm run test` pour exécuter des tests.


## License

MIT

# Authors

* **Albuisson Stéphane** - *Initial work* - [Site Web](http://stephane-albuisson.com)
