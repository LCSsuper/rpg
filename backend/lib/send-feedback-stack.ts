import * as cdk from "aws-cdk-lib";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import {
    Code,
    Function,
    FunctionUrlAuthType,
    HttpMethod,
    Runtime,
} from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface SendFeedbackStackProps extends cdk.StackProps {
    readonly rpgTable: Table;
}

export class SendFeedbackStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: SendFeedbackStackProps) {
        super(scope, id, props);

        const lambda = new Function(this, "SendFeedback", {
            runtime: Runtime.NODEJS_20_X,
            handler: "index.sendFeedbackHandler",
            code: Code.fromAsset("src/lib"),
            functionName: "RPG-SendFeedback",
            reservedConcurrentExecutions: 1,
            environment: {
                RPG_TABLE_NAME: props.rpgTable.tableName,
            },
        });

        lambda.addToRolePolicy(
            new PolicyStatement({
                actions: ["ses:SendEmail"],
                resources: ["*"],
                effect: Effect.ALLOW,
            })
        );

        props.rpgTable.grantReadData(lambda);

        const functionUrl = lambda.addFunctionUrl({
            authType: FunctionUrlAuthType.NONE,
            cors: {
                allowCredentials: true,
                allowedHeaders: ["authorization", "content-type"],
                allowedMethods: [HttpMethod.POST],
                allowedOrigins: ["*"],
            },
        });

        new cdk.CfnOutput(this, "SendFeedbackFunctionUrl", {
            value: functionUrl.url,
        });
    }
}
