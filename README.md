# Ajna Watercolors

A static storefront for original watercolor art prints.

## Deploying to Vercel

1. Sign in to [Vercel](https://vercel.com) using the GitHub account that can access this repository.
2. Select **Add New...** > **Project**, then import `Ajna605/artbyajna`.
3. Keep the detected static-site settings. No build command or environment variables are required.
4. Select **Deploy**. Vercel will provide a temporary `vercel.app` address for reviewing the site.

Future pushes to the connected branch automatically deploy a new preview. Merges to the production branch deploy to the production URL.

## Connecting a GoDaddy domain

After the first Vercel deployment:

1. In the Vercel project, open **Settings** > **Domains** and enter the domain you purchased from GoDaddy.
2. Vercel will show the exact DNS records required for the apex domain and `www` subdomain.
3. In GoDaddy, open the domain's **DNS** settings and add or replace only the records Vercel specifies. Remove conflicting `@` or `www` records if Vercel asks you to.
4. Return to Vercel and wait for domain verification. SSL is issued automatically after DNS is verified.

Do not add payment details, bank-transfer instructions, or other private information to the public DNS records or repository.

## Local preview

Run the following from the project folder:

```powershell
python -m http.server 8000
```

Then browse to [http://localhost:8000](http://localhost:8000).
