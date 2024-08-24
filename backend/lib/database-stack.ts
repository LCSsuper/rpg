import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";

// Table format:

// PartitionKey: characterId
// The partitionKey defines what character the records belong to.

// SortKey: key
// The sortKey defines the type of record. It can be 'character', 'quest', 'inventory' or 'item'. When multiple of the same type are stored, the key additionally gets a UUID: type#UUID.

// Character:
// | characterId                           | key       | name  | xp | charisma_xp | empathy_xp | strength_xp | endurance_xp | nutrition_xp | sleep_hygiene_xp | finance_xp | time_management_xp | mental_clarity_xp | creativity_xp | wisdom_xp | tech_proficiency_xp | maintenance_xp | art_xp | writing_xp | music_xp |
// | 777c3f1f-165a-4c46-b7e6-e2fa375f035d  | character | Lucas | 0  | 0           | 0          | 0           | 0            | 0            | 0                | 0          | 0                  | 0                 | 0             | 0         | 0                   | 0              | 0      | 0          | 0        |

// Quest:
// | characterId                          | key                                        | title          | skill    | xp |
// | 777c3f1f-165a-4c46-b7e6-e2fa375f035d | quest#40c47ab6-5796-4135-875a-eaf8451953e8 | Do 100 pushups | Strength | 1  |

// Inventory:
// | characterId                          | key       | items                                                                      | gold |
// | 777c3f1f-165a-4c46-b7e6-e2fa375f035d | inventory | f287d3f6-3c0c-4624-9dda-bc05fa9d0aa7, b6c8ab39-63df-498d-ab2f-3d3608dab854 | 0    |

// Authorization:
// | characterId | key           | token |
// | all         | authorization | 1234  |

export class DatabaseStack extends cdk.Stack {
    public readonly rpgTable: Table;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.rpgTable = new Table(this, "RPGTable", {
            tableName: "RPGTable",
            partitionKey: {
                name: "characterId",
                type: AttributeType.STRING,
            },
            sortKey: { name: "key", type: AttributeType.STRING },
            billingMode: BillingMode.PAY_PER_REQUEST,
        });
    }
}
