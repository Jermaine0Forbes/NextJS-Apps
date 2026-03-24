
# Outline

- ~~create a login and register page~~
- ~~apply shadcn to navigation~~
- ~~install sass~~
- ~~learn how to create a form into the register page~~
- ~~create a service to handle registration data~~
- ~~add zod schema to registration form~~
- ~~show errors if validation fails~~
- ~~signup to vercel account~~
- ~~learn how to connect to database~~ 
- ~~learn how to create models in next.js~~
- ~~possibly  deploy app to vercel, if free~~
- ~~get data from prisma~~
- ~~add faker data to prisma~~
- ~~save data to database~~
- ~~wipe database~~
- ~~update user model to add password, role~~
-  seed data of users and posts
- install auth.js
- add auth configuration
- register a user through form
- hash password when saved
- create a token and set it to cookie once user register/logs in
- create a logout api 



## general commands
```
# to start the next.js server
npm run dev


# to generate the prisma client
# needed to connect to database and .env also needs to be present
npx prisma generate

```


## 3-24-26

### to clear your prisma tables
`npx prisma migrate reset`

### prisma-default production rant
Okay, I was very confused for a long time as to how to push data to the `prisma-default` database that I have connected to vercel. However, I realized that
`postgres://2a99fd09e874a5341dfaf4b503...` is the connection to `prisma-default`, in other words, the production database. I guess I was really confused because my `.env` files are not holding the connections. Naturally, I'm thought the .env file would hold the production connection string, but it held the local connection, and the `.env.local` holds the production connection. I just needed to state this because this confused the hell out of me for hours. To be fair, it's all my fault, so I'm not blaming prisma or next.js


## 3-10-26

install prisma extension in vscode in order to have proper syntax highlighting in `schema.prisma`


## 3-3-26

### database differences

So I finally was able to get next.js to show the seeded data that I generated in prisma. But throughout this whole session, I was trying to figure out why the prisma database that I called `prisma-default` had data inside of it, but in my local server it did not. I'm thinking that when I first successfully deployed my app to vercel, it automatically seeded the data to `prisma-default` so I initially thought that when I was accessing postgres from prisma, I'm connecting to that the server. But in reality, I'm only connecting a local postgres server on my machine. I would do more testing in the future, but I think I understand what's going on. Didn't think I would put this much time into it though.

### if you get a 404 error when running next.js

There's a possiblity that the issue might have to do with naming another directory `app` in a prisma example when trying to generate a prisma db with this command `npx prisma init --db --output ../app/generated/prisma`.  You are supposed to put it in the `src` directory, not in the root folder. So if you did all the steps to set prisma up and then you run your next.js app, it's looking for the first app directory it can find. And since it finds the `app/generate/prisma` it's looking for any files that will be used. So the solution is to either rename `app/generate/prisma` or put the directory in the original app.

## 2-27-26

To generate your prisma client that will have your models and other essential files you need to use this command

```
npx prisma generate

```
Since your database env variable will not be stored in git, you need to log into vercel and go to your app's [storage page](https://vercel.com/jermaine0forbes-projects/app1/integrations/prisma/icfg_0lvHHa8P8Mr1neCLUTRFMB3I/resources/storage/store_OkgNLos6lWuM5OMR/guides) that will have the necessary environment variables



## 2-24-26

If you try to seed your data, but you get an error saying that a table doesn't exist.
Do this

```
npx prisma migrate dev --name init
```


To see your data within prisma studio

```
npx prisma studio
```

Make sure to add npx whenever using vercel cli

```
# like so 
npx vercel link
```


[prisma storage in vercel page](https://vercel.com/jermaine0forbes-projects/~/integrations/prisma/icfg_0lvHHa8P8Mr1neCLUTRFMB3I/resources/storage/store_OkgNLos6lWuM5OMR/guides)

to install vercel globally 

```
npm install -g vercel
```

[connect prisma to next.js](https://www.prisma.io/docs/guides/frameworks/nextjs)
```
npm install prisma tsx @types/pg --save-dev

npm install @prisma/client @prisma/adapter-pg dotenv pg

npx prisma init --db --output ../app/generated/prisma
```

[change colors in tailwind](https://tailwindcss.com/docs/color)

[How to flatten errors in zod](https://www.google.com/search?q=zod+flatten+errors&oq=zod+flatten+errors&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQABgWGB4yDQgCEAAYhgMYgAQYigUyCggDEAAYgAQYogTSAQg1OTAxajBqN6gCALACAA&sourceid=chrome&ie=UTF-8)


## 2-20-26

- [defining schemas with zod](https://zod.dev/api#strings)
- [useActionState](https://react.dev/reference/react/useActionState)
- [authentication in next.js](https://nextjs.org/docs/app/guides/authentication#3-create-a-user-or-check-user-credentials)



