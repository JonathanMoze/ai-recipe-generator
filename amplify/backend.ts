import { defineBackend } from "@aws-amplify/backend";
import { data } from "./data/resource";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { auth } from "./auth/resource";

const backend = defineBackend({
  auth,
  data,
});

const bedrockDataSource = backend.data.resources.graphqlApi.addHttpDataSource(
  "bedrockDS",
  "https://bedrock-runtime.eu-west-3.amazonaws.com",
  {
    authorizationConfig: {
      signingRegion: "eu-west-3",
      signingServiceName: "bedrock",
    },
  }
);

bedrockDataSource.grantPrincipal.addToPrincipalPolicy(
  new PolicyStatement({
    resources: [
      "arn:aws:bedrock:eu-west-3::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0",
    ],
    actions: ["bedrock:InvokeModel"],
    
  })
);