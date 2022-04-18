// import { DynamicModule  } from '@nestjs/common';
// import { Connection, createConnection } from 'typeorm';


// @Module({
//   providers: [
//     {
//       provide: 'CONNECTION',
//       useValue: createConnection({
//         type: 'postgres',
//         host: 'localhost',
//         port: 5432,
//       }),
//     },
//   ],
// })

// // @Module({})
// // export class DatabaseModule {
// //   static register(options: ConnectionOptions): DynamicModule {
// //     return {
// //       module: DatabaseModule,
// //       providers: [
// //         { provide: 'CONNECTION', useValue: createConnection(options) },
// //       ],
// //     };
// //   }
// // }
