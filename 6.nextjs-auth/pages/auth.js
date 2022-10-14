import { getSession, useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import AuthForm from "../components/auth/auth-form";
import { useRouter } from "next/router";

function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        console.log('entered');
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if(isLoading){
    return <p>Loading...</p>
  }else{
    return <AuthForm />
  }


  
}

export default AuthPage;
