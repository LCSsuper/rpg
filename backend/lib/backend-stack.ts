import * as cdk from "aws-cdk-lib";
import { CfnBudget } from "aws-cdk-lib/aws-budgets";
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

        const getCharacterFunctionUrl = getCharacterLambda.addFunctionUrl({
            authType: FunctionUrlAuthType.NONE,
        });

        new cdk.CfnOutput(this, "getCharacterFunctionUrl", {
            value: getCharacterFunctionUrl.url,
        });

        // TODO @Lucas create an SNS topic to receive budget alerts
        // TODO @Lucas create an SQS queue to receive budget alerts from SNS
        // TODO @Lucas create a Lambda that is executed on budget alert and disables the functions

        new CfnBudget(this, "RPGBudget", {
            budget: {
                budgetName: "RPGBudget",
                budgetType: "COST",
                timeUnit: "MONTHLY",
                budgetLimit: { amount: 5, unit: "USD" },
            },
            notificationsWithSubscribers: [
                {
                    notification: {
                        notificationType: "ACTUAL",
                        comparisonOperator: "GREATER_THAN",
                        threshold: 80, // percent
                    },
                    subscribers: [
                        {
                            subscriptionType: "SNS",
                            address: "lcssuper@gmail.com", // TODO @Lucas set topic ARN
                        },
                    ],
                },
            ],
        });
    }
}
