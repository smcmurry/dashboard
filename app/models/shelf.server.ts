import arc from "@architect/functions";

import type { User } from "./user.server";

export type Frame = {
  uuid: string;
  shelfId: string;
  time: string;
  objectId: string;
  pose: string;
};

export async function modelData({
    objectId,
  }: Pick<Frame, "objectId">): Promise<Array<Pick<Frame, "pose" | "objectId">>> {
    const db = await arc.tables();

    const table = await db.csfsposturedata.query({
        KeyConditionExpression: "objectId = :objectId",
        ExpressionAttributeValues: { ":objectId": objectId },
    });

    //const element = await db.csfsposturedata.get({uuid: "edf99f7a-c504-4bf0-8c4e-8b1db5992c9a"});
    //const table = await db.csfsposturedata.scan({FilterExpression: "objectId = :objectId", ExpressionAttributeValues: {":objectId": 1}});
    return table;
}
