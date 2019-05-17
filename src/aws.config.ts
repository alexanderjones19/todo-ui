import Amplify from 'aws-amplify';

const awsConfig = {
  Auth: {
    identityPoolId: process.env['REACT_APP_IDENTITY_POOL_ID'],
    region: process.env['REACT_APP_REGION'],
    userPoolId: process.env['REACT_APP_USER_POOL_ID'],
    userPoolWebClientId: process.env['REACT_APP_USER_POOL_WEB_CLIENT_ID']
  }
};

export default awsConfig;

console.log('aws configure', awsConfig);