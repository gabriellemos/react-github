# Running project locally

After cloning and installing dependencies do the following.

## Configure Environment Variables

At your project root folder, create the following file `.env.local`

```
NEXT_PUBLIC_GITHUB_API_URL=https://api.github.com/graphql
NEXT_PUBLIC_GITHUB_API_TOKEN=<INSERT_PERSONAL_ACCESS_TOKEN_HERE>
```

> Check [this tutorial](https://docs.github.com/en/enterprise-server@2.22/github/authenticating-to-github/creating-a-personal-access-token) on how to create a personal access tokens.

> Your token must have the following permissions: **read:user** and **user:email**

## Running the project

Use the following command to run the project locally.

```
npm run dev
```
