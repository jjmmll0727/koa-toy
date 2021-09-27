import { RouterContext } from '@koa/router';
import {sign, verify} from '../modules/jwt';
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

export async function checkToken(ctx: RouterContext, next: any){
    const token = ctx.req.headers.authorization;
    if (!token) {
        ctx.body = {
            status: 400,
            error: true,
            message: "token이 없습니다.",
          };
          return;
    }
    const user = await verify(token);

    if (user === TOKEN_EXPIRED) {
        ctx.body = {
            status: 400,
            error: true,
            message: "token 만료",
        };
        return;    
    }
    if (user === TOKEN_INVALID) {
        ctx.body = {
            status: 400,
            error: true,
            message: "token이 유효하지 않습니다.",
        };
        return;   
    }
    if (user === undefined) {
        ctx.body = {
            status: 400,
            error: true,
            message: "사용자가 정의되지 않았습니다.",
        };
        return;
    }    
    ctx.request.body = user;
    return next();
}
// export const verifyToken = {
//   checkToken: async (ctx: RouterContext, next: any) => {
//     const token = ctx.req.headers.authorization;
//     if (!token) {
//         ctx.body = {
//             status: 400,
//             error: true,
//             message: "token이 없습니다.",
//           };
//           return;
//     }
//     const user = await verify(token);

//     if (user === TOKEN_EXPIRED) {
//         ctx.body = {
//             status: 400,
//             error: true,
//             message: "token 만료",
//         };
//         return;    
//     }
//     if (user === TOKEN_INVALID) {
//         ctx.body = {
//             status: 400,
//             error: true,
//             message: "token이 유효하지 않습니다.",
//         };
//         return;   
//     }
//     if (user === undefined) {
//         ctx.body = {
//             status: 400,
//             error: true,
//             message: "사용자가 정의되지 않았습니다.",
//         };
//         return;
//     }    
//     ctx.request.body = user;
//     return next();
//   },
// };
