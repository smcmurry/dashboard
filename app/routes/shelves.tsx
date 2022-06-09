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
    const object_id = "1";
    const shelfData = await getShelfData({ object_id });
    return json<LoaderData>({ shelfData });
};

export default function ShelvesPage() {
    const data = useLoaderData() as LoaderData;

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
                {data.shelfData.map((shelf) => (
                    <ol key= {shelf.uuid}>
                        {shelf.pose}
                    </ol>
                ))}
                <p>shelf 1</p>
              </li>
            </div>
    
            <div className="flex-1 p-6">
                <div>
                    <ol>
                        {data.shelfData.map((shelf) => (
                            <li key={shelf.object_id}>
                                {shelf.pose}
                                {shelf.object_id}
                                {shelf.timestamp}
                                {shelf.uuid}
                            </li>
                        ))
                        }
                    </ol>
                </div>
            </div>
          </main>
        </div>
    );

}