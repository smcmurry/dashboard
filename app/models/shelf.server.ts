import arc from "@architect/functions";

import type { User } from "./user.server";

export type Frame = {
  uuid: string;
  shelf_id: string;
  timestamp: string;
  object_id: string;
  pose: string;
};

export async function getShelfData({
    object_id,
  }: Pick<Frame, "object_id">): Promise<Array<Pick<Frame, "pose" | "object_id" | "uuid" | "timestamp">>> {
    const db = await arc.tables();

    const table = await db.csfsposturedata.scan({
        FilterExpression: "object_id = :object_id",
        ExpressionAttributeValues: { ":object_id": object_id },
    });
    console.log(table);
    //const element = await db.csfsposturedata.get({uuid: "edf99f7a-c504-4bf0-8c4e-8b1db5992c9a"});
    //const table = await db.csfsposturedata.scan({FilterExpression: "objectId = :objectId", ExpressionAttributeValues: {":objectId": 1}});
    return table.Items.map((n: any) => ({
        object_id: n.object_id,
        pose: n.pose,
        uuid: n.uuid,
        time: n.time,
    }));
}
