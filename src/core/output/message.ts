import {EMessageType} from "./e-message-type";

export class Message {

    /**
     * Type de message
     */
    private _type: EMessageType = EMessageType.INFO;

    /**
     * Contenu du message
     */
    private _content: string;


    /**
     * Constructeur
     *
     * @param {EMessageType} type
     * @param {string} content
     */
    constructor(content: string) {
        this._content = content;
    }

    set type(value: EMessageType) {
        this._type = value;
    }

    get type(): EMessageType {
        return this._type;
    }

    set content(value: string) {
        this._content = value;
    }

    get content(): string {
        return this._content;
    }
}