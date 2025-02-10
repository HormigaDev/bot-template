export class Reply extends Error {
    constructor(message: string | string[], separator: string = ' ') {
        let msg: string;
        if (Array.isArray(message)) {
            msg = message.join(separator);
        } else {
            msg = message;
        }
        super(msg);
        this.name = 'BotMessageReply';
    }
}
