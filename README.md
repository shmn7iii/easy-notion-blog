## shmn7iii blog

https://www.shmn7iii.net

Fork from [easy-notion-blog](https://github.com/otoyo/easy-notion-blog).

## local development

init,

```bash
# pre
$ npm install -g yarn
$ anyenv install nodenv

# Apple Silicon mac requires running the terminal via rosetta2.
$ nodenv install $(v16 or higher)
$ nodenv local $(v16 or higher)

# setting env
$ cat <<EOF > .env.local
NOTION_API_SECRET=<YOUR_NOTION_API_SECRET>
DATABASE_ID=<YOUR_DATABASE_ID>
EOF

# install
$ yarn install
```

dev,

```bash
$ yarn dev

# or (vercel cli needed)
$ vercel dev
```

## test & lint

```bash
$ yarn test
$ yarn lint
```
