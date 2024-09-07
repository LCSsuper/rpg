import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import { BudgetLambdaDisabledStack } from "./budget-lambda-disabler-stack";
import { DatabaseStack } from "./database-stack";
import { CompleteQuestsStack } from "./complete-quest-stack";
import { CreateQuestStack } from "./create-quest-stack";
import { DeleteQuestStack } from "./delete-quest-stack";
import { GetCharacterStack } from "./get-character-stack";
import { GetQuestsStack } from "./get-quests-stack";
import { UpdateQuestsStack } from "./update-quest-stack";
import { GetItemsStack } from "./get-items-stack";
import { CreateCharacterStack } from "./create-character-stack";
import { BuyOrSellItemStack } from "./buy-or-sell-item-stack";
import { SendFeedbackStack } from "./send-feedback-stack";
import { DeleteCharacterStack } from "./delete-character-stack";

export class RPGBackendStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        new BudgetLambdaDisabledStack(this, "BudgetLambdaDisabledStack");

        const { rpgTable } = new DatabaseStack(this, "DatabaseStack");

        new CompleteQuestsStack(this, "CompleteQuestsStack", {
            rpgTable,
        });

        new CreateCharacterStack(this, "CreateCharacterStack", {
            rpgTable,
        });

        new CreateQuestStack(this, "CreateQuestStack", {
            rpgTable,
        });

        new DeleteQuestStack(this, "DeleteQuestStack", {
            rpgTable,
        });

        new GetCharacterStack(this, "GetCharacterStack", {
            rpgTable,
        });

        new GetItemsStack(this, "GetItemsStack", {
            rpgTable,
        });

        new GetQuestsStack(this, "GetQuestsStack", {
            rpgTable,
        });

        new UpdateQuestsStack(this, "UpdateQuestsStack", {
            rpgTable,
        });

        new BuyOrSellItemStack(this, "BuyOrSellItemStack", {
            rpgTable,
        });

        new SendFeedbackStack(this, "SendFeedbackStack", {
            rpgTable,
        });

        new DeleteCharacterStack(this, "DeleteCharacterStack", {
            rpgTable,
        });
    }
}
