import prisma from "@/lib/prisma";



export default async function Users() {

 const users = await prisma.user.findMany();

  console.log('users')
  console.log(users)

    return (
        <main id="users" className="@container">

            <section className="mx-auto max-w-md mt-4">
                this the users page
            </section>

        </main>
    )
}