import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/events?category=Robotics", label: "Categories" },
  { href: "/events", label: "Register" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-cyan-300/30 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="font-display text-lg tracking-[0.25em] text-yellow-300 glow-text">
          TECHURJA 2K26
        </Link>

        <nav className="flex items-center gap-4 text-sm uppercase tracking-[0.13em] md:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="border-b border-transparent pb-1 text-zinc-200 transition hover:border-cyan-300 hover:text-cyan-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
