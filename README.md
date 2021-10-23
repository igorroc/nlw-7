# Como rodar:

Para iniciar o projeto, você deve criar um arquivo **.env** dentro da pasta **node/** e colocar as seguintes variáveis de ambiente:

```env
GITHUB_CLIENT_ID=seu_id_do_github
GITHUB_CLIENT_SECRET=seu_secret_do_github

JWT_SECRET=sequencia_de_numeros_e_letras_aleatorio
```

Para pegar as variaveis do GitHub, acesse [Github OAuth Apps](https://github.com/settings/developers) e crie uma nova aplicação.

Após as variaveis de ambiente estarem configuradas, é necessário baixar as dependencias em ambas as pastas (**node/**, **web/**) com o seguinte comando:

```bash
npm i
```

Agora é necessário pegar novamente as migrations do prisma, para isso acesse a pasta **node/** e rode o comando:

```bash
npx prisma migrate dev
```

Depois de todos esses passos, abra 2 terminais separados, um em cada pasta, e rode o comando a seguir em ambos os terminais:

```bash
npm run dev
```

Finalmente, você pode entrar na página principal acessando o [localhost na porta 3000](http://localhost:3000)
