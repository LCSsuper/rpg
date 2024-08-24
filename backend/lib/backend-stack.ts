import * as cdk from "aws-cdk-lib";
import {
    Code,
    Function,
    FunctionUrlAuthType,
    Runtime,
} from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { BudgetLambdaDisabledStack } from "./budget-lambda-disabler-stack";

export class RPGBackendStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        new BudgetLambdaDisabledStack(this, "BudgetLambdaDisabledStack");

        const getCharacterLambda = new Function(this, "GetCharacter", {
            runtime: Runtime.NODEJS_20_X,
            handler: "index.getCharacterHandler",
            code: Code.fromAsset("src/lib"),
            functionName: "RPG-GetCharacter",
            reservedConcurrentExecutions: 1,
        });

        const getCharacterFunctionUrl = getCharacterLambda.addFunctionUrl({
            authType: FunctionUrlAuthType.NONE,
        });

        new cdk.CfnOutput(this, "getCharacterFunctionUrl", {
            value: getCharacterFunctionUrl.url,
        });
    }
}
