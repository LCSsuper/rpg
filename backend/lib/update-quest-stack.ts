import * as cdk from "aws-cdk-lib";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import {
    Code,
    Function,
    FunctionUrlAuthType,
    Runtime,
} from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface UpdateQuestStackProps extends cdk.StackProps {
    readonly rpgTable: Table;
}

export class UpdateQuestsStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: UpdateQuestStackProps) {
        super(scope, id, props);

        const lambda = new Function(this, "UpdateQuest", {
            runtime: Runtime.NODEJS_20_X,
            handler: "index.updateQuestHandler",
            code: Code.fromAsset("src/lib"),
            functionName: "RPG-UpdateQuest",
            reservedConcurrentExecutions: 1,
            environment: {
                RPG_TABLE_NAME: props.rpgTable.tableName,
            },
        });

        props.rpgTable.grantReadWriteData(lambda);

        const functionUrl = lambda.addFunctionUrl({
            authType: FunctionUrlAuthType.NONE,
        });

        new cdk.CfnOutput(this, "UpdateQuestFunctionUrl", {
            value: functionUrl.url,
        });
    }
}
