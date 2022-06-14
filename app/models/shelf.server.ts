import arc from "@architect/functions";

import type { User } from "./user.server";

export type Frame = {
  uuid: string;
  object_id: string;
  pose: string;
  session_id: string;
  shelf_id: string;
  timestamp: string;
};

export async function getShelfData({
    shelf_id,
  }: Pick<Frame, "shelf_id">): Promise<Array<Pick<Frame, "pose" | "object_id" | "uuid" | "timestamp" | "session_id" | "shelf_id">>> {
    const db = await arc.tables();

    const table = await db.csfsposturedata.scan({
        FilterExpression: "shelf_id = :shelf_id",
        ExpressionAttributeValues: { ":shelf_id": shelf_id },
    });
    console.log(table);
    //const element = await db.csfsposturedata.get({uuid: "edf99f7a-c504-4bf0-8c4e-8b1db5992c9a"});
    //const table = await db.csfsposturedata.scan({FilterExpression: "objectId = :objectId", ExpressionAttributeValues: {":objectId": 1}});
    return table.Items.map((n: any) => ({
        object_id: n.object_id,
        pose: n.pose,
        uuid: n.uuid,
        time: n.time,
        session_id: n.session_id,
        shelf_id: n.shelf_id,
    }));
}
