import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product:
      'https://p9b7weogqi.execute-api.eu-west-1.amazonaws.com/dev/products',
    order: 'https://vu33zb3hje.execute-api.eu-west-1.amazonaws.com/dev',
    import: 'https://nlncth237b.execute-api.eu-west-1.amazonaws.com',
    bff: 'https://vu33zb3hje.execute-api.eu-west-1.amazonaws.com/dev',
    cart: 'https://vu33zb3hje.execute-api.eu-west-1.amazonaws.com/dev',
  },
  apiEndpointsEnabled: {
    product: true,
    order: false,
    import: true,
    bff: false,
    cart: false,
  },
};
