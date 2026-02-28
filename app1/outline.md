
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
- get data from prisma
- possibly  deploy app to vercel, if free
- save data to database
- create a jwt token 



## general commands
```
# to start the next.js server
npm run dev


# to generate the prisma client
# needed to connect to database and .env also needs to be present
npx prisma generate

```

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



