import { publicProcedure, router } from "../../trpc";
import { authValidation } from "./auth.validation";
import { addUserMut, checkUserQuery } from "./auth.service";

const authRouter = router({
    login: publicProcedure
    .input(authValidation.login)
    .query(async (opts) => {
      const { input } = opts;
      try{
        const user = await checkUserQuery(input)
        return user;
      }
      catch(e){
        console.log(e);
      }
    }),
    register: publicProcedure
      .input(authValidation.register)
      .mutation(({ input }) => {
        const user = input;
        try{
          const created = addUserMut(user);
          return created;
        }
        catch(e){
          console.log(e);
        }
      }),
  });

  export default authRouter;