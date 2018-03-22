﻿import { JsonObject, JsonProperty } from 'json2typescript';
import { CommandConfig } from '../../command-config';

/**
 * Configuration pour la commande LintHtml
 */
@JsonObject
export class LintHtmlConfig extends CommandConfig {

    @JsonProperty('dir')
    private _dir: string = undefined;

    get dir(): string {
        return this._dir;
    }

    @JsonProperty('options')
    private _options: string[] = undefined;

    get options(): string[] {
        return this._options;
    }

}