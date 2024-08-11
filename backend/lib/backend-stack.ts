import * as cdk from "aws-cdk-lib";
import {
    Code,
    Function,
    FunctionUrlAuthType,
    Runtime,
} from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class RPGBackendStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const getCharacterLambda = new Function(this, "GetCharacter", {
            runtime: Runtime.NODEJS_20_X,
            handler: "index.getCharacter",
            code: Code.fromAsset("src/lib"),
        });

        // TODO @Lucas make a Lambda that is executed on budget alert and disables the functions

        const getCharacterFunctionUrl = getCharacterLambda.addFunctionUrl({
            authType: FunctionUrlAuthType.NONE,
        });

        new cdk.CfnOutput(this, "getCharacterFunctionUrl", {
            value: getCharacterFunctionUrl.url,
        });
    }
}
