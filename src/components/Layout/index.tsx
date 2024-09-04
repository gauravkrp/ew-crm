// components/withAuth.tsx
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "./NewHeader";

const WithAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    const isAuthenticated =
      typeof window !== "undefined" && !!localStorage.getItem("TOKEN");

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated]);

    return (
      <div className="w-full min-h-[100dvh]">
        <Header isAuthorized={isAuthenticated} />
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default WithAuth;
