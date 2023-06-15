import { log } from "console";
import Link from "next/link";
import { prisma } from "../db";
import { redirect } from "next/navigation";

async function createTodo(data: FormData){
    "use server"

    const title = data.get("title")?.valueOf()
    if (typeof title !== "string" || title.length === 0) {
        throw new Error("Invalid Title")
    }

    await prisma.todo.create({data: { title, complete: false}})
    redirect("/")
}

export default function Page() {
  return (
    <>
      <header className="flex justify-between item-centre mb-4">
        <h1 className="text-2x1">New</h1>
      </header>
      <form action={createTodo} className="flex gap-2-col">
        <input
          type="text"
          name="title"
          className="border border-slate-300 bg-transparent px-2 py-1 rounded focus-within:border-slate-100 outline-none"
        />
        <div className="flex gap-1 justify-end">
          <Link
            href=".."
            className="border border-slate-300 text-slate-300  px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border border-slate-300 text-slate-300  px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >Create</button>
        </div>
      </form>
    </>
  );
}
