## shmn7iii blog

https://blog.shmn7iii.net

Fork from [easy-notion-blog](https://github.com/otoyo/easy-notion-blog).

## local development

init,

```bash
# pre
$ npm install -g yarn
$ anyenv install nodenv

# Apple Silicon mac requires running the terminal via rosetta2.
$ nodenv install 12.22.10
$ nodenv local 12.22.10

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

## lint

```bash
$ yarn lint
```
