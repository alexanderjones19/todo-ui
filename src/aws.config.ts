import Amplify from 'aws-amplify';

const awsConfig = {
  Auth: {
    identityPoolId: 'us-east-1:65afeb7f-4178-4cbb-872d-844eb4877380',
    region: 'us-east-1',
    userPoolId: 'us-east-1_ij3Qve1hQ',
    userPoolWebClientId: '49s8pahduiampbh56ci8gsejc2'
  }
};

export default awsConfig;

console.log('aws configure');