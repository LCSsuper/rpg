import * as cdk from "aws-cdk-lib";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import {
    Code,
    Function,
    FunctionUrlAuthType,
    HttpMethod,
    Runtime,
} from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface CompleteQuestStackProps extends cdk.StackProps {
    readonly rpgTable: Table;
}

export class CompleteQuestsStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: CompleteQuestStackProps) {
        super(scope, id, props);

        const lambda = new Function(this, "CompleteQuest", {
            runtime: Runtime.NODEJS_20_X,
            handler: "index.completeQuestHandler",
            code: Code.fromAsset("src/lib"),
            functionName: "RPG-CompleteQuest",
            reservedConcurrentExecutions: 1,
            environment: {
                RPG_TABLE_NAME: props.rpgTable.tableName,
            },
        });

        props.rpgTable.grantReadWriteData(lambda);

        const functionUrl = lambda.addFunctionUrl({
            authType: FunctionUrlAuthType.NONE,
            cors: {
                allowCredentials: true,
                allowedHeaders: ["authorization"],
                allowedMethods: [HttpMethod.GET],
                allowedOrigins: ["*"],
            },
        });

        new cdk.CfnOutput(this, "CompleteQuestFunctionUrl", {
            value: functionUrl.url,
        });
    }
}
