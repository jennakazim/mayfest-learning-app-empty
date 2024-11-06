import { footerSections, socialMediaLinks } from "@/utils/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mx-auto mt-48 w-full max-w-screen-xl px-4 sm:px-6">
      <div className="grid grid-cols-2 gap-x-2 gap-y-8 pb-12 sm:grid-cols-4 sm:gap-6 xl:grid-cols-6">
        <div className="col-span-full mb-2 sm:mb-8 xl:col-span-2 xl:mb-0">
          <Link className="-ml-1 inline-block dark:invert" href="/">
            <Image
              src="https://developer.spotify.com/images/guidelines/design/icon1.svg"
              alt="Spotify Logo"
              width={40}
              height={40}
            />
          </Link>
          <p className="mt-5 text-sm leading-[1.75] text-neutral-500 dark:text-neutral-400">
            Statsify is a web application that allows you to view your personal
            Spotify statistics and insights.
          </p>
        </div>
        {footerSections.map(({ title, links }, idx) => (
          <div key={idx}>
            <h5 className="font-semibold">{title}</h5>
            <ul className="mt-4 space-y-2 text-neutral-500 dark:text-neutral-400">
              {links.map(({ text, href, target = "_self" }, idx) => (
                <li key={idx}>
                  <Link
                    href={href}
                    target={target}
                    className="hover:text-primary-600 text-sm"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h5 className="font-semibold">Github Project Link</h5>
          <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
            Interested in how we built Statsify? Check out the source code on
            Github! You can find the repository{" "}
            <Link
              href="https://github.com/ethanpaneraa/mayfest-learning-app"
              className="text-primary-700 underline-offset-1 hover:underline"
            >
              here
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-2.5 border-t py-3.5 text-neutral-500 dark:text-neutral-400 sm:flex-row-reverse">
        <div className="-mr-2 flex items-center gap-1">
          {socialMediaLinks.map(({ icon: Icon, link }) => (
            <Button
              key={link}
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <Link href={link} target="_blank" rel="noopener noreferrer">
                <Icon className="h-5 w-5" />
              </Link>
            </Button>
          ))}
        </div>
        <span className="text-sm">
          &copy; {new Date().getFullYear()} Mayfest Productions - All rights
          reserved. Built by Ethan Pineda
        </span>
      </div>
    </footer>
  );
}
