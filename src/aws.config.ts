const awsConfig = {
  Auth: {
    identityPoolId: process.env['REACT_APP_IDENTITY_POOL_ID'],
    region: process.env['REACT_APP_REGION'],
    userPoolId: process.env['REACT_APP_USER_POOL_ID'],
    userPoolWebClientId: process.env['REACT_APP_USER_POOL_WEB_CLIENT_ID']
  },
  API: {
    appsyncGraphqlEndpoint: process.env['REACT_APP_GRAPHQL_URL'] || '',
    appsyncRegion: process.env['REACT_APP_APPSYNC_REGION'] || '',
    appsyncAuthenticationType: process.env['REACT_APP_APPSYNC_AUTH_TYPE'] || ''
  }
};

export default awsConfig;