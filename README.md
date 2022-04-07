## shmn7iii blog

fork from easy-notion-blog

## local development

init,

```bash
# (install yarn)
$ nodenv install 12.0.0
$ nodenv local 12.0.0
$ cat <<EOF > .env.local
NOTION_API_SECRET=<YOUR_NOTION_API_SECRET>
DATABASE_ID=<YOUR_DATABASE_ID>
EOF

$ yarn install
```

dev,

```bash
yarn dev
```

[http://localhost:3000](http://localhost:3000)

## lint & test

```bash
yarn lint
yarn test
yarn jest --updateSnapshot
```
