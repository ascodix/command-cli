import { IStream } from '../src/core/output/console';

export module Mocks {

    let globalConfig: any;

    class OutputStream {
        public write(data: string) {}
    }

    class InputStream {
        public write (data: string) {}
    }

    class ErrorStream {
        public write (data: string) {}
    }

    export interface IGlobalConfig {
        stream: IStream;
    }

    export function GlobalConfig(): IGlobalConfig {
        let stream: IStream = {
            outputStream: new OutputStream(),
            inputStream: new InputStream(),
            errorStream: new ErrorStream()
        };

        if (!globalConfig) {
            globalConfig = {
                stream: stream
            }
        }

        return globalConfig;
    }
}