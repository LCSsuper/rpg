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

interface UpdateCharacterStackProps extends cdk.StackProps {
    readonly rpgTable: Table;
}

export class UpdateCharactersStack extends cdk.Stack {
    constructor(
        scope: Construct,
        id: string,
        props: UpdateCharacterStackProps
    ) {
        super(scope, id, props);

        const lambda = new Function(this, "UpdateCharacter", {
            runtime: Runtime.NODEJS_20_X,
            handler: "index.updateCharacterHandler",
            code: Code.fromAsset("src/lib"),
            functionName: "RPG-UpdateCharacter",
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
                allowedHeaders: ["authorization", "content-type"],
                allowedMethods: [HttpMethod.POST],
                allowedOrigins: ["*"],
            },
        });

        new cdk.CfnOutput(this, "UpdateCharacterFunctionUrl", {
            value: functionUrl.url,
        });
    }
}
