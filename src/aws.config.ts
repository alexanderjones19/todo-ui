import Amplify from 'aws-amplify';

const awsConfig = {
  Auth: {
    identityPoolId: 'us-east-1:f3ebde16-e35c-4fdb-bb30-6bab1b507271',
    region: 'us-east-1',
    userPoolId: 'us-east-1_bK7ABJ0b2',
    userPoolWebClientId: '2vl97sln41jb9lc9tgfn4cfdno'
  }
};

export default awsConfig;

console.log('aws configure');