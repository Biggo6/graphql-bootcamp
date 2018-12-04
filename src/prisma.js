import { Prisma } from 'prisma-binding';
import { fragmentReplacements } from './resolvers/index';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
    secret: 'izwebishot!',
    fragmentReplacements
});

export { prisma as default };

// function log(data, ind=4) {
//     console.log(JSON.stringify(data, null, ind));
// }

// // prisma.exists.User({
// //     id: 'cjp12pd7x000l0a07t9r3xlrf',
// //     name: 'Andrew'
// // }).then((exists) => {
// //     log(exists);
// // });

// const createPOstForUser = async (authorId, data) => {
   
//     const userExists = await prisma.exists.User({
//         id: authorId
//     });

//     if(!userExists) {
//         throw new Error('User not found')
//     }
   
//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data,
//             author: {
//                 connect: {
//                     id: authorId
//                 }
//             }
//         }
//     }, '{ id }');

//     const user = await prisma.query.user({
//         where: {
//             id: authorId
//         }
//     }, '{ id name email posts { id title published } }');

//     return user;

// };

// createPOstForUser('cjp12pd7x000l0a07t9r3xlrf',{
//     title: 'Great follow!',
//     body: 'The war is here',
//     published: true
// }).then(data => log(data, 2)).catch(error => log(error));

// // prisma.query.users(null, '{ id name posts { id title } }').then((data) => {
// //     console.log(JSON.stringify(data, null, 4));
// // });

// // prisma.query.comments(null, '{ id text }').then((data) => {
// //     console.log(JSON.stringify(data, null, 4));
// // });

// // prisma.mutation.createPost({
// //     data: {
// //         title: "My new GraphQL POST",
// //         body: "You can find the new course",
// //         published: true,
// //         author: {
// //             connect: {
// //                 id: "cjp12pd7x000l0a07t9r3xlrf"
// //             }
// //         }  
// //     }
// // }, '{ id title body published }').then((data) => {
// //     console.log(JSON.stringify(data, null, 4));
// // });


// //prisma.query.posts(null, '{ id title }').then(data => console.log(JSON.stringify(data, null, 2)));