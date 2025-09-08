// import onFinished from 'on-finished';
// import { prisma } from '../prisma.js';


// export function transactionLogger(req, res, next) {
//     onFinished(res, async (err, resp) => {
//         try {
//             const userId = req.user?.id ?? null;
//             const email = req.user?.email ?? null;
//             await prisma.transactionLog.create({
//                 data: {
//                     user_id: userId,
//                     email,
//                     endpoint: req.originalUrl,
//                     http_method: req.method,
//                     status_code: res.statusCode,
//                     error_message: err ? String(err) : (res.locals.errorMessage ?? null)
//                 }
//             });
//         } catch (e) {
//             // avoid crashing on logger failure
//             console.error('failed to write transaction log', e);
//         }
//     });
//     next();
// }