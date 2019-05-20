import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import { Auth } from 'aws-amplify';
import aws_config from './aws.config';

const client = new AWSAppSyncClient({
  url: aws_config.API.appsyncGraphqlEndpoint,
  region: aws_config.API.appsyncRegion,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
  }
});

export default client;