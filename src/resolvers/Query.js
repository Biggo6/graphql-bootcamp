import getUserId from "../utils/getUserId";

const Query = {
    users(parent, args, {db, prisma}, info) {
        const opArgs = {};
        if(args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }, {
                    email_contains: args.query
                }]
            }
        }
        return prisma.query.users(opArgs, info);
    },


    async post(parent, args, { prisma, request }, info) {
        const userId = getUserId(request, false); 

        const posts = await prisma.query.posts({
            where: {
                id: args.id
            }
        }, info);
    },

    comments(parent, args, {db, prisma}, info) {
        const opArgs = {};
        if(args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }, {
                    email_contains: args.query
                }]
            }
        }
        return prisma.query.comments(opArgs, info);
    },

    posts(parent, args, { prisma}, info) {
        const opArgs = {};
        if(args.query) {
            opArgs.where = {
                OR: [{
                    title_contains: args.query
                }, {
                    body_contains: args.query
                }]
            }
        }
        return prisma.query.posts(opArgs, info);
    }
}

export { Query as default };