﻿import { JsonObject, JsonProperty } from 'json2typescript';
import { ReplaceTokensOptions } from './replacetokens-options';
import { CommandConfig } from '../../../command-config';

/**
 * Configuration pour la commande ReplaceToken
 */
@JsonObject
export class ReplaceTokensConfig extends CommandConfig {
 
    @JsonProperty('dir')
    private _dir: string[] = undefined;

    @JsonProperty('options')
    private _options: ReplaceTokensOptions = undefined;

    get dir(): string[] {
        return this._dir;
    }

    get options(): ReplaceTokensOptions {
        return this._options;
    }

}