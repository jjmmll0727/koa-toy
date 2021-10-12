# koa-toy
side-toy project based on koa framework<br>
전세계의 뉴스를 한 곳에서 볼 수 있도록 하는 서비스<br>
원하는 나라의 코드를 입력하면 그 나라의 현재 뉴스를 볼 수 있다 <br>
***

> ### env setting

#### 1

`$ mkdir koa-server`<br>
`$ cd koa-server`<br>
`$ yarn init --y`<br>

>yarn init v1.22.11<br>
question name (koa-server):<br>
question version (1.0.0):<br>
question description:<br>
question entry point (index.js):<br>
question repository url:<br>
question author:<br>
question license (MIT):<br>
question private:<br>
success Saved package.json<br>
✨  Done in 7.08s.<br>

press enter and enter and enter ... <br><br>

#### 2

`$ yarn add koa`<br>
`$ yarn add koa-router`<br>
`$ yarn add koa-bodyparser`<br>
<br><br>

`$ yarn add -D typescript`<br>
`$ yarn add -D ts-node`<br>
`$ yarn add -D nodemon`<br>
`$ yarn add -D @types/koa`<br>
`$ yarn add -D @types/koa-router`<br>
`$ yarn add -D @types/koa-bodyparser`<br>

<strong>node version should now low (> 12.0.0)</strong>

`how to upgrade node version`

[here](https://phoenixnap.com/kb/update-node-js-version)
<br><br>

#### 3

`$ tsc --init` -> make tsconfig.json file

***

> ### structure

- models : virtual mongodb to control well
- controller : receive request and send response with using services logic
- service : crucial function to activate in controller dir & access to database directly
- interface : for DTO for post http method
- modules : useful function 
- routes : routing dir
- types : types for country code
- middleware : jwt verify
<br><br>

> ### skills

1. crawling weather from [https://www.estesparkweather.net/index.php](https://www.estesparkweather.net/index.php)
2. get worldwide news from `newsapi` [https://newsapi.org/docs/get-started#search](https://newsapi.org/docs/get-started#search)
- how to get articles [https://www.npmjs.com/package/ts-newsapi?activeTab=readme](https://www.npmjs.com/package/ts-newsapi?activeTab=readme)
<br><br>

> ### result

![kr](./img/kr.png)<br>
![us](./img/us.png)

***

#### notice

```ts
try{
    const {userId, password} = ctx.request.body;
    const user : any = await findUserById(userId) 
    const result = await bcrypt.compare(password, user.password);
    if(!result){
        ctx.body = {
            exceptions: "",
            status: 500,
            error: false,
            message: "wrong pw",
            };     
    }
    const token = await sign(result)
    ctx.body = {
        exceptions: "",
        status: 200,
        error: true,
        message: "success to loign",
        token: token
        };
        return;
        
```

- status 500 ctx.body will be `overwritten` by status 200 ctx.body
- ctx.body does not stop functin like return would do
- must comment `return` below ctv.body like `status 200 ctx.body`
- [https://github.com/koajs/discussions/issues/12](https://github.com/koajs/discussions/issues/12)

<br><br><br>

