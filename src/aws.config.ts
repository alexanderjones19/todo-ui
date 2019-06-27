const awsConfig = {
  Auth: {
    identityPoolId: process.env['IDENTITY_POOL_ID'],
    region: process.env['REGION'],
    userPoolId: process.env['USER_POOL_ID'],
    userPoolWebClientId: process.env['USER_POOL_WEB_CLIENT_ID']
  },
  API: {
    appsyncGraphqlEndpoint: process.env['GRAPHQL_URL'] || '',
    appsyncRegion: process.env['APPSYNC_REGION'] || '',
    appsyncAuthenticationType: process.env['APPSYNC_AUTH_TYPE'] || ''
  }
};

export default awsConfig;