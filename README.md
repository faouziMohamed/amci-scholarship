<p align="center">
<img src='public/logo/acem-modern-logo.png'  width='300' height=
'300' alt="ACEM's logo" />
</p>

# Recupération des codes du bourse de l'AMCI

This project show in a convenient way the scholarships code used that students will use to get their scholarship fees.

## Getting Started

In this project i'm using yarn as package manager. Make sure if you contribute to this project to use yarn instead of npm.
This project is built using:

- [Next.js](https://nextjs.org/) (React) for the frontend and serverless functions
- [Chakra UI](https://chakra-ui.com/) for the UI
- MySQL Database from [Planetscale](https://planetscale.com/). _You can use any database you want._
- [Prisma](https://www.prisma.io/) as an ORM for the database

### Install the dependencies

```bash
yarn install
```

Make sure to create a .env file in the root of the project and add the following variables:

```.dotenv
DATABASE_URL=<your database url>
NEXT_PUBLIC_SITE_URL=http://localhost:3000 # or your production url eg: https://bourse.acem.org
```

### Create the database

> You can have a ready to use database using Planetscale. You can create a free account [here](https://planetscale.com/) and then copy the database url from the database page.

- If you are using Planetscale, make sure to select the connection for prisma. Otherwise, running the migration may fail.

Run the following command to create the database:

```bash
yarn prisma generate
yarn prisma db push
```

### Run the project

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Add data to the database

The to use to init the database must be stored on the path [`src/Repository/data/code_amci.csv`](src/Repository/data/code_amci.csv) and it's mandatory to be in csv format with the following 5 columns and no header should be present:

| country           | matricule | name                           | passport_name     | periode_code | scholarship_code |
| ----------------- | --------- | ------------------------------ | ----------------- | ------------ | ---------------- |
| Union des Comores | 20161136  | MOHAMED FAOUZI FAOUZOUDINE     | true passport num | 81680        | 1113569          |
| Union des Comores | 20161141  | HOUZAIMATA IBRAHIM             | true passport num | 81680        | 1113570          |
| Union des Comores | 20170952  | MOHAMED NASROUDINE SOULAIMANA  | true passport num | 81680        | 1113612          |
| Union des Comores | 20170955  | BEN HALIDI IGRAH SOYABA        | true passport num | 81680        | 1113613          |
| Union des Comores | 20170967  | HARIBOU ABDOUL KADER ATTOUMANI | true passport num | 81680        | 1113614          |
| Union des Comores | 20171029  | SEIFILMOULOUK SAID             | true passport num | 81680        | 1113618          |
| ...               | ...       | ...                            | true passport num | ...          | ...              |

In your browser or http client (Insomnia, Postman, Thunder Client, etc), make a GET request to the following url:

- in development: `http://localhost:3000/api/v1/data-init`
- in production: `https://your-production-url/api/v1/data-init`

This will add the data to the database. You can start using the app.

Hooray 🎉🎉🎉
