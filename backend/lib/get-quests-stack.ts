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

interface GetQuestsStackProps extends cdk.StackProps {
    readonly rpgTable: Table;
}

export class GetQuestsStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: GetQuestsStackProps) {
        super(scope, id, props);

        const lambda = new Function(this, "GetQuests", {
            runtime: Runtime.NODEJS_20_X,
            handler: "index.getQuestsHandler",
            code: Code.fromAsset("src/lib"),
            functionName: "RPG-GetQuests",
            reservedConcurrentExecutions: 1,
            environment: {
                RPG_TABLE_NAME: props.rpgTable.tableName,
            },
        });

        props.rpgTable.grantReadData(lambda);

        const functionUrl = lambda.addFunctionUrl({
            authType: FunctionUrlAuthType.NONE,
            cors: {
                allowCredentials: true,
                allowedHeaders: ["authorization"],
                allowedMethods: [HttpMethod.GET],
                allowedOrigins: ["*"],
            },
        });

        new cdk.CfnOutput(this, "getQuestsFunctionUrl", {
            value: functionUrl.url,
        });
    }
}
