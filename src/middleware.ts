import {withAuth, NextRequestWithAuth} from "next-auth/middleware";
import {NextResponse} from "next/server";


export default withAuth(
    function middleware(request: NextRequestWithAuth){
        const token = request.nextauth.token;
        const isAuthenticated = !!token

        const isAuthPage = request.nextUrl.pathname.startsWith("/admin-login") || 
        request.nextUrl.pathname.startsWith("/register")

        // *** redirecting to dashboard if "admin & user" is already logged in ***
        if (isAuthPage){
            if(isAuthenticated && request.nextauth.token?.role === "admin") {
                return NextResponse.redirect(new URL("/dashboard", request.url))
            }
            // if(isAuthenticated && request.nextauth.token?.role === "user") {
            //     return NextResponse.redirect(new URL("/user", request.url))
            // }
        }

        // *** checking routes for admin ***
        if(!isAuthenticated && request.nextUrl.pathname.startsWith("/dashboard")
        && request.nextauth.token?.role !== "admin") {
            return NextResponse.rewrite(new URL("/admin-login", request.url))
        }

        // *** checking routes for user ***
        // if (!isAuthenticated && request.nextUrl.pathname.startsWith("/user")
        // && request.nextauth.token?.role !== "user"){
        //     return NextResponse.rewrite(new URL("/login", request.url))
        // }
    },
    {
        callbacks:{
            async authorized(){
                // We return true here so that the middleware function above is always called.
                return true;
            }
        },
    }

)

export const config = {
    matcher: ["/dashboard/:path*", "/admin-login", "/register"],
  }