"use client";

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import {
  IconHome,
  IconUser,
  IconDeviceDesktop,
  IconBriefcase,
  IconFileText,
  IconSchool,
  IconMail,
  IconWorld,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconLayoutNavbarCollapse,
} from "@tabler/icons-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  submenu?: NavItem[];
}

export const FloatingDock = ({
  desktopClassName,
  mobileClassName,
}: {
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  const links: NavItem[] = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-foreground/80" />,
      href: "#home",
    },
    {
      title: "About",
      icon: <IconUser className="h-full w-full text-foreground/80" />,
      href: "#about",
    },
    {
      title: "Projects",
      icon: <IconDeviceDesktop className="h-full w-full text-foreground/80" />,
      href: "#projects",
    },
    {
      title: "Experience",
      icon: <IconBriefcase className="h-full w-full text-foreground/80" />,
      href: "#experience",
    },
    {
      title: "Resume",
      icon: <IconFileText className="h-full w-full text-foreground/80" />,
      href: "/resume.pdf",
    },
    {
      title: "Education",
      icon: <IconSchool className="h-full w-full text-foreground/80" />,
      href: "#education",
    },
    {
      title: "Contact",
      icon: <IconMail className="h-full w-full text-foreground/80" />,
      href: "#contact",
    },
    {
      title: "Socials",
      icon: <IconWorld className="h-full w-full text-foreground/80" />,
      href: "#",
      submenu: [
        {
          title: "GitHub",
          icon: <IconBrandGithub className="h-full w-full text-foreground/80" />,
          href: "https://github.com/SaiManojK16",
        },
        {
          title: "LinkedIn",
          icon: <IconBrandLinkedin className="h-full w-full text-foreground/80" />,
          href: "https://www.linkedin.com/in/sai-manoj-kartala-592ab9239/",
        },
        {
          title: "Instagram",
          icon: <IconBrandInstagram className="h-full w-full text-foreground/80" />,
          href: "https://www.instagram.com/kartalamanoj",
        },
      ],
    },
  ];

  return (
    <>
      <FloatingDockDesktop items={links} className={desktopClassName} />
      <FloatingDockMobile items={links} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: NavItem[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <div className={cn("fixed bottom-8 left-8 z-[100] block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2 items-start"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                className="relative"
              >
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => setOpenSubmenu(openSubmenu === item.title ? null : item.title)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border hover:bg-accent/10"
                    >
                      <div className="h-4 w-4">{item.icon}</div>
                    </button>
                    <AnimatePresence>
                      {openSubmenu === item.title && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="absolute left-full top-0 ml-2 flex flex-row gap-2"
                        >
                          {item.submenu.map((subitem) => (
                            <a
                              key={subitem.title}
                              href={subitem.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border hover:bg-accent/10"
                            >
                              <div className="h-4 w-4">{subitem.icon}</div>
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <a
                    href={item.href}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border hover:bg-accent/10"
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <div className="h-4 w-4">{item.icon}</div>
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-background border border-border hover:bg-accent/10 shadow-lg"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-foreground/80" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: NavItem[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e: React.MouseEvent) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] hidden h-16 items-end gap-4 rounded-2xl bg-background/80 backdrop-blur-md border border-border px-4 pb-3 md:flex shadow-lg",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer
          mouseX={mouseX}
          key={item.title}
          {...item}
        />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  submenu,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  submenu?: NavItem[];
}) {
  let ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);

  let distance = useTransform(mouseX, (val: number) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const Container = submenu ? 'div' : 'a';
  const containerProps = submenu
    ? {
        onClick: () => setShowSubmenu(!showSubmenu),
      }
    : {
        href,
        target: href.startsWith('http') ? '_blank' : undefined,
        rel: href.startsWith('http') ? 'noopener noreferrer' : undefined,
      };

  return (
    <div className="relative">
      <Container
        {...containerProps}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.div
          ref={ref}
          style={{ width, height }}
          className="relative flex aspect-square items-center justify-center rounded-full bg-accent/10 hover:bg-accent/20 transition-colors"
        >
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: 2, x: "-50%" }}
                className="absolute -top-8 left-1/2 w-fit rounded-md border border-border bg-background/80 backdrop-blur-md px-2 py-0.5 text-xs whitespace-pre text-foreground"
              >
                {title}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            style={{ width: widthIcon, height: heightIcon }}
            className="flex items-center justify-center"
          >
            {icon}
          </motion.div>
        </motion.div>
      </Container>

      {submenu && showSubmenu && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex flex-col gap-2 items-center"
        >
          {submenu.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-md border border-border hover:bg-accent/10 transition-colors"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <div className="h-4 w-4">{item.icon}</div>
            </a>
          ))}
        </motion.div>
      )}
    </div>
  );
} 