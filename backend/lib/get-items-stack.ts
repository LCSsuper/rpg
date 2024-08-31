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

interface GetItemsStackProps extends cdk.StackProps {
    readonly rpgTable: Table;
}

export class GetItemsStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: GetItemsStackProps) {
        super(scope, id, props);

        const lambda = new Function(this, "GetItems", {
            runtime: Runtime.NODEJS_20_X,
            handler: "index.getItemsHandler",
            code: Code.fromAsset("src/lib"),
            functionName: "RPG-GetItems",
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

        new cdk.CfnOutput(this, "GetItemsFunctionUrl", {
            value: functionUrl.url,
        });
    }
}
