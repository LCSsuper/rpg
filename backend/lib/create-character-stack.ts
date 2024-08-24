import * as cdk from "aws-cdk-lib";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import {
    Code,
    Function,
    FunctionUrlAuthType,
    Runtime,
} from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface CreateCharacterStackProps extends cdk.StackProps {
    readonly rpgTable: Table;
}

export class CreateCharacterStack extends cdk.Stack {
    constructor(
        scope: Construct,
        id: string,
        props: CreateCharacterStackProps
    ) {
        super(scope, id, props);

        const lambda = new Function(this, "CreateCharacter", {
            runtime: Runtime.NODEJS_20_X,
            handler: "index.createCharacterHandler",
            code: Code.fromAsset("src/lib"),
            functionName: "RPG-CreateCharacter",
            reservedConcurrentExecutions: 1,
            environment: {
                RPG_TABLE_NAME: props.rpgTable.tableName,
            },
        });

        props.rpgTable.grantReadWriteData(lambda);

        const functionUrl = lambda.addFunctionUrl({
            authType: FunctionUrlAuthType.NONE,
        });

        new cdk.CfnOutput(this, "CreateCharacterFunctionUrl", {
            value: functionUrl.url,
        });
    }
}
