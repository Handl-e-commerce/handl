import { setupServer, SetupServer } from 'msw/node'
import { handlers } from './handlers';

const server: SetupServer = setupServer(...handlers)

export {server};