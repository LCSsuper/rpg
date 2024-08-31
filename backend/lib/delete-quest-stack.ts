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

interface DeleteQuestStackProps extends cdk.StackProps {
    readonly rpgTable: Table;
}

export class DeleteQuestStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: DeleteQuestStackProps) {
        super(scope, id, props);

        const lambda = new Function(this, "DeleteQuest", {
            runtime: Runtime.NODEJS_20_X,
            handler: "index.deleteQuestHandler",
            code: Code.fromAsset("src/lib"),
            functionName: "RPG-DeleteQuest",
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

        new cdk.CfnOutput(this, "DeleteQuestFunctionUrl", {
            value: functionUrl.url,
        });
    }
}
