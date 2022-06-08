import arc from "@architect/functions";

import type { User } from "./user.server";

export type Frame = {
  userId: User["id"];
  uuid: string;
  time: string;
  objectId: string;
  pose: string;
};

type NoteItem = {
  uuid: Frame["uuid"];
};

export async function modelData() {
    const db = await arc.tables();
    const table = await db.csfsposturedata.scan({});
    console.log(table);
    return null;
}
