import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import { getShelfData } from "~/models/shelf.server";

type LoaderData = {
    shelfData: Awaited<ReturnType<typeof getShelfData>>;
}

export const loader: LoaderFunction = async ({ request }) => {
    //const userId = await requireUserId(request);
    const shelf_id = "1";
    const shelfData = await getShelfData({ shelf_id });
    return json<LoaderData>({ shelfData });
};

export default function ShelvesPage() {
    const data = useLoaderData() as LoaderData;
    var total_customers = 0
    var total_interactions = 0
    var avg_interactions_per_person = 0.0
    var total_customer_time_spent = 0
    var avg_time_spent = 0
    var num_frames = 0
    var people = [""]
    for (var i = 0; i < data.shelfData.length; i++) {
        var unique = true
        for (var j = 0; j < people.length; j++) {
            if (data.shelfData[i].object_id + " " + data.shelfData[i].session_id == people[j]) {
                unique = false
                break
            }
        }
        if (unique) {
            people.push(data.shelfData[i].object_id + " " + data.shelfData[i].session_id)
            total_customers++
        }
        if (data.shelfData[i].pose == "Reaching Left" || data.shelfData[i].pose == "Reaching Right") {
            total_interactions++
        }
        //total_customer_time_spent += data.shelfData[i].timestamp
        num_frames++
    }
    avg_interactions_per_person = total_interactions / total_customers

    return (
        <div className="flex h-full min-h-screen flex-col">
          <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
            <h1 className="text-3xl font-bold">
              <Link to=".">Dashboard</Link>
            </h1>
            <p>shelves dashboard</p>
            <Form action="/logout" method="post">
              <button
                type="submit"
                className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
              >
                Logout
              </button>
            </Form>
          </header>
    
          <main className="flex h-full bg-white">
            <div className="h-full w-80 border-r bg-gray-50">
              <li>
                <p>shelf 1</p>
                <p>shelf 2</p>
              </li>
            </div>
    
            <div className="flex-1 p-6">
                <div>
                    <ol>
                        <p>Total Customers: </p>{total_customers}
                        <p>Total Interactions: </p>{total_interactions}
                        <p>Average Interactions per Person: </p>{avg_interactions_per_person}
                    </ol>
                </div>
            </div>
          </main>
        </div>
    );

}