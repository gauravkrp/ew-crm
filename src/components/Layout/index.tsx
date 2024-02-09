import Header from "./Header";

// eslint-disable-next-line react/display-name
const withLayout = (PageComponent: any) => (props: any) => {
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
