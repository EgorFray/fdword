function PageLayout({ children }) {
  return (
    <div className="flex flex-col gap-5 p-4 text-center sm:gap-7">
      {children}
    </div>
  );
}

export default PageLayout;
