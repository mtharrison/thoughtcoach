import { Session, AuthHandler, GoogleAdapter } from 'sst/node/auth';
import { NextjsSite } from 'sst/node/site';

const GOOGLE_CLIENT_ID =
  '488752998486-e07s4d3b1p5sbrs9di4gngqgav0bpebs.apps.googleusercontent.com';

declare module 'sst/node/auth' {
  export interface SessionTypes {
    user: {
      userID: string;
      email?: string;
    };
  }
}

export const handler = AuthHandler({
  providers: {
    google: GoogleAdapter({
      mode: 'oidc',
      clientID: GOOGLE_CLIENT_ID,
      onSuccess: async (tokenset) => {
        const claims = tokenset.claims();

        console.log(NextjsSite);

        return Session.parameter({
          //@ts-ignore
          redirect: 'http://localhost:3000/',
          type: 'user',
          properties: {
            userID: claims.sub,
            email: claims.email,
          },
        });
      },
    }),
  },
});
