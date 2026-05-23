function PageLayout({ children }) {
  return (
    <div className="flex flex-col gap-12 p-4 text-center md:gap-18">
      {children}
    </div>
  );
}

export default PageLayout;
