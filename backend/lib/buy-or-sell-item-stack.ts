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

interface BuyOrSellItemStackProps extends cdk.StackProps {
    readonly rpgTable: Table;
}

export class BuyOrSellItemStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: BuyOrSellItemStackProps) {
        super(scope, id, props);

        const lambda = new Function(this, "BuyOrSellItem", {
            runtime: Runtime.NODEJS_20_X,
            handler: "index.buyOrSellItemHandler",
            code: Code.fromAsset("src/lib"),
            functionName: "RPG-BuyOrSellItem",
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

        new cdk.CfnOutput(this, "BuyOrSellItemFunctionUrl", {
            value: functionUrl.url,
        });
    }
}
