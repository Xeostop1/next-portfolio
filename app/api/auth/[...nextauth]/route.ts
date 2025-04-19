import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

//NextAuth: 인증을 처리해주는 라이브러리
// GoogleProvider: 구글 로그인을 위한 설정을 도와주는 provider

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

// 겟은 대표적으로 로그아웃 post 로그인 둘다 사용 가능해 
export { handler as GET, handler as POST };
