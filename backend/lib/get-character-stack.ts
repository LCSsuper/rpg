import * as cdk from "aws-cdk-lib";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import {
    Code,
    Function,
    FunctionUrlAuthType,
    Runtime,
} from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface GetCharacterStackProps extends cdk.StackProps {
    readonly rpgTable: Table;
}

export class GetCharacterStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: GetCharacterStackProps) {
        super(scope, id, props);

        const lambda = new Function(this, "GetCharacter", {
            runtime: Runtime.NODEJS_20_X,
            handler: "index.getCharacterHandler",
            code: Code.fromAsset("src/lib"),
            functionName: "RPG-GetCharacter",
            reservedConcurrentExecutions: 1,
            environment: {
                RPG_TABLE_NAME: props.rpgTable.tableName,
            },
        });

        props.rpgTable.grantReadData(lambda);

        const functionUrl = lambda.addFunctionUrl({
            authType: FunctionUrlAuthType.NONE,
        });

        new cdk.CfnOutput(this, "getCharacterFunctionUrl", {
            value: functionUrl.url,
        });
    }
}
