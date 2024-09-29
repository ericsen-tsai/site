import Link from "next/link";

const Footer = () => {
  return (
    <div className="mx-auto mb-6 flex max-w-4xl flex-col items-center font-[family-name:var(--font-montserrat)] text-sm">
      <footer className="w-full rounded-xl bg-white/10 px-8 py-3 shadow-sm">
        <div className="flex items-center justify-center">
          &copy; {new Date().getFullYear()} Ericsen,&nbsp;
          <Link
            href="/reading-timeline"
            className="text-primary/80 hover:underline"
          >
            <div className="text-inherit">an avid reader</div>
          </Link>{" "}
          &nbsp;made in&nbsp;
          <Link
            href={"https://www.google.com/search?q=taiwan"}
            target="_blank"
            className="hover:underline"
          >
            Taiwan
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
