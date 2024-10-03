function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto min-h-screen max-w-4xl px-8 pb-10 pt-24">{children}</div>;
}

export default Container;
