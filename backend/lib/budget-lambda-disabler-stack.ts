import * as cdk from "aws-cdk-lib";
import { CfnBudget } from "aws-cdk-lib/aws-budgets";
import { Topic } from "aws-cdk-lib/aws-sns";
import { Queue } from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { SqsSubscription } from "aws-cdk-lib/aws-sns-subscriptions";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

export class BudgetLambdaDisabledStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const autoDisableTopic = new Topic(this, "auto-disable-topic", {
            topicName: "auto-disable-RPG-topic",
        });

        const autoDisableQueue = new Queue(this, "auto-disable-queue", {
            queueName: "auto-disable-RPG-queue",
        });

        autoDisableTopic.addSubscription(new SqsSubscription(autoDisableQueue));

        const RPGDisableLambda = new Function(this, "auto-disable-lambda", {
            runtime: Runtime.NODEJS_20_X,
            handler: "index.disableRPGBackendHandler",
            code: Code.fromAsset("src/lib"),
            functionName: "auto-disable-RPG-lambda",
        });

        RPGDisableLambda.addEventSource(new SqsEventSource(autoDisableQueue));

        RPGDisableLambda.addToRolePolicy(
            new PolicyStatement({
                actions: [
                    "lambda:PutFunctionConcurrency",
                    "lambda:ListFunctions",
                ],
                resources: ["*"],
                effect: Effect.ALLOW,
            })
        );

        new CfnBudget(this, "zero-spent-RPG-budget", {
            budget: {
                budgetName: "zero-spent-RPG-budget",
                budgetType: "COST",
                timeUnit: "MONTHLY",
                budgetLimit: { amount: 1, unit: "USD" },
            },
            notificationsWithSubscribers: [
                {
                    notification: {
                        notificationType: "ACTUAL",
                        comparisonOperator: "GREATER_THAN",
                        threshold: 100,
                    },
                    subscribers: [
                        {
                            subscriptionType: "SNS",
                            address: autoDisableTopic.topicArn,
                        },
                    ],
                },
            ],
        });
    }
}
