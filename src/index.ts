import dotenv from 'dotenv';
dotenv.config();

import { Socket } from 'net';
import {
  createAdvancedServer,
  DbRawCommand,
  IAdvanceServerSession,
  IResponseWriter,
} from 'pg-server';

const res = {
  command: 'SELECT',
  rowCount: 0,
  oid: null,
  rows: [],
  fields: [],
  _parsers: [],
  _types: {},
  RowCtor: null,
  rowAsArray: false,
  _prebuildEmptyResultObject: null,
};

const server = createAdvancedServer(
  class implements IAdvanceServerSession {
    onConnect(socket: Socket) {
      console.log('👤 Client connected, IP: ', socket.remoteAddress);
    }

    // A handler which will be called on each received instuction.
    onCommand({ command }: DbRawCommand, response: IResponseWriter) {
      // use the "response" writer
      // to react to the "command"  argument
      console.log('🤖 command: ', command);

      switch (command.type) {
        case 0:
          console.log('🤖 type: ', 'startupMessage');
          response.authenticationOk();
          break;
        case 88:
        default:
          console.log('🤖 type: ', 'readyForQuery');
          response.readyForQuery();
          break;
      }
    }

    onQuery(query: string) {
      // Ok, proceed to this query, unmodified.
      // You could also choose to modify the query.
      // return query;
      // // ... or return an error
      // return { error: 'Forbidden !' };

      if (query.startsWith('CREATE')) return { ...res, command: 'CREATE' };
      if (query.startsWith('INSERT')) return { ...res, command: 'INSERT' };
      if (query.startsWith('SELECT')) return { ...res, command: 'SELECT' };
    }
  }
);

server.listen(process.env.PORT, () => {
  console.log(
    `⚡️[server]: Postgres memory server is running at ${process.env.PORT}`
  );
});
