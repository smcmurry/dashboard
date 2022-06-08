import arc from "@architect/functions";

import type { User } from "./user.server";

export type Frame = {
  userId: User["id"];
  uuid: string;
  time: string;
  objectId: string;
  pose: string;
};

export async function modelData() {
    const db = await arc.tables();
    const table = await db.csfsposturedata.scan({FilterExpression: "objectId = :objectId", ExpressionAttributeValues: {":objectId": 1}});
    console.log(table);
    return null;
}
