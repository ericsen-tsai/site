import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mx-auto mb-6 flex max-w-4xl flex-col items-center rounded-xl bg-white/10 px-8 py-3 text-sm shadow-sm">
      <div>
        &copy; {new Date().getFullYear()} Ericsen,&nbsp;
        <Link href={"https://www.google.com/search?q=taiwan"} target="_blank">
          made in Taiwan
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
