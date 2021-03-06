import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getUserId from '../utils/getUserId';
import generateToken from '../utils/generateToken';
import hashPassword from '../utils/hashPassword';

const Mutation = {

    async login(parent, args, { prisma }, info) {
        const user = await prisma.query.user({
            where: {
                email: args.data.email
            }
        });

        if(!user) {
            throw new Error('Unable to login!')
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password);

        if(!isMatch) {
            throw new Error('Unable to login!')
        }

        return {
            user,
            token: generateToken(user.id)
        };
    },

    async createUser(parent, args, { prisma }, info) {

        const hashPasswordx = await hashPassword(args.data.password);

        const email = await prisma.exists.User({
            email: args.data.email
        });

        if(email) {
            throw new Error('Email taken')
        }

        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                password: hashPasswordx
            }
        });

        return {
            user,
            token: generateToken(user.id)
        };
    },
    async deleteUser(parent, args, { prisma, request }, info) {
       
        const userId = getUserId(request);
       
        const userExists = await prisma.exists.User({
           id: userId
       });

       if(!userExists) {
           throw new Error('User not found');
       }

       return prisma.mutation.deleteUser({
           where: {
               id: userId
           }
       });
    },
    async updateUser(parent, args, { prisma, request }, info) {
        
        const userId = getUserId(request);

        if(typeof args.data.password === 'string') {
            args.data.password = await hashPassword(args.data.password);
        }
        
        return prisma.mutation.updateUser({
            where: {
                id: userId
            },
            data: args.data
        }, info);
    },
    async createPost(parent, args, { prisma, request }, info) {
         
        const userId = getUserId(request);
        
        return prisma.mutation.createPost({
            data: {
               title: args.data.title,
               body: args.data.body,
               published: args.data.published,
               author: {
                   connect: {
                       id: userId
                   }
               } 
            }
         }, info);
    },
    async deletePost(parent, args, { prisma, request }, info) {
        
        const userId = getUserId(request);

        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        });

        if(!postExists) {
            throw new Error('Unable to delete post');
        }
        
        return prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        });
    },
    async updatePost(parent, args, { prisma, request }, info) {
        
        const userId = getUserId(request);
        const postExists = await prisma.exists.Post({
           
                id: args.id,
                author: {
                    id: userId
                }
            
        });

        const isPublished = await prisma.exists.Post({ id: args.id, published: true})

        if(!postExists){
            throw new Error('Unable to update post');
        }

        if(isPublished && args.data.published === false) {
            await prisma.mutation.deleteManyComments({ where : { post: { id: args.id } } })
        }
        
        return prisma.mutation.updatePost({
            where: {
                id: args.id
            },
            data: args.data
        }, info);
    },
    async createComment(parent, args, { prisma, request }, info) {
       
        const userId = getUserId(request);
        const postExists = await prisma.exists.Post({
            id: args.data.post,
            published: true
        });

        if(!postExists) {
            throw new Error('Unable to find post')
        }
        

        return prisma.mutation.createComment({
            data: {
                text: args.data.text,
                author: {
                    connect: {
                        id: userId
                    }
                },
                post: {
                    connect: {
                        id: args.data.post
                    }
                }
            }
        }, info);
    },
    async updateComment(parent, args, { prisma }, info) {
        
        const userId = getUserId(request);

        const commentExists = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        });

        if(!commentExists) {
            throw new Error('Unable to update Comment');
        }
       
        return prisma.mutation.updateComment({
           where: {
               id: args.id
           },
           data: args.data
       }, info); 
    },
    async deleteComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);

        const commentExists = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        });

        if(!commentExists) {
            throw new Error('Unable to delete Comment');
        }

        return prisma.mutation.deleteComment({
            where: {
                id: args.id
            }
        }, info);
    }
};

export { Mutation as default }; 