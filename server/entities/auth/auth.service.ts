import prisma from "../../express";

export const checkUserQuery = async ({
    email,
    password
}: {
    email: string,
    password: string
}) =>{
    const user = prisma.user.findFirst({
        where: {
          'AND': [
            {email: email},
            {password: password}
          ]
        }
    })
    return user;
}

export const addUserMut = async ({
    email,
    password,
    username    
}: {
    email: string,
    password: string,
    username: string
}) => {
    const user = await prisma.user.create({
        data: {
            email: email,
            password: password,
            username: username
        }
    });
    return user
}