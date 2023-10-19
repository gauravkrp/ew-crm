import Head from "next/head";
import { NextPage } from "next";

import Header from "./Header";

const withLayout = (PageComponent: NextPage) => (props: any) => {
  return (
    <>
      <div className="w-full h-full bg-gray-50">
        <Header />
        <main className="page-wrapper">
          <PageComponent {...props} />
        </main>
      </div>
    </>
  );
};

export default withLayout;
