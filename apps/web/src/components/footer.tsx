import Link from "next/link";

const Footer = () => {
  return (
    <div className="mx-auto mb-6 flex max-w-6xl flex-col items-center px-4 font-[family-name:var(--font-montserrat)] text-sm">
      <footer className="w-full rounded-xl bg-white/10 px-8 py-3 font-medium shadow-sm">
        <div className="flex flex-wrap items-center justify-center sm:flex-nowrap">
          &copy; {new Date().getFullYear()} Ericsen,&nbsp;
          <Link href="/reading-timeline" className="text-primary/80 hover:underline">
            <div className="text-inherit">an avid reader</div>
          </Link>{" "}
          <div className="flex items-center">
            &nbsp;made in&nbsp;
            <Link
              href={"https://www.google.com/search?q=taiwan"}
              target="_blank"
              className="hover:underline"
            >
              Taiwan
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
