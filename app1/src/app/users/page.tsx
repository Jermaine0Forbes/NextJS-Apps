import prisma from "@/lib/prisma";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { IUsers } from "@/lib/definitions";
import UserTable from "@/components/tables/UserTable";



const columns: ColumnDef<IUsers>[] = [
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "name",
        header: "First Name",
    },
];


export default async function Users() {

    const users = await prisma.user.findMany();

    console.log('users')
    console.log(users)



    return (
        <main id="users" className="@container">

            <section className="mx-auto max-w-md mt-4">
                this the users page

                {
                    users &&
                    (
                        <UserTable data={users} columns={columns} />
                    )
                }
            </section>

        </main>
    )
}