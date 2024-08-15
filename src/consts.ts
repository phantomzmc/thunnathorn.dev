// This is your config file, place any global data here.
// You can import this data from anywhere in your site by using the `import` keyword.

type Config = {
  title: string;
  description: string;
  lang: string;
  profile: {
    author: string;
    description?: string;
  };
};

type SocialLink = {
  icon: string;
  friendlyName: string; // for accessibility
  link: string;
};

export const siteConfig: Config = {
  title: "thunnathorn.dev",
  description: "",
  lang: "en-EN",
  profile: {
    author: "Thunnathorn Yuwasin",
    description: "Senior Software Engineer at Deftdev Tech",
  },
};

/** 
  These are you social media links. 
  It uses https://github.com/natemoo-re/astro-icon#readme
  You can find icons @ https://icones.js.org/
*/
export const socialLinks: Array<SocialLink> = [
  {
    icon: "mdi:github",
    friendlyName: "Github",
    link: "https://github.com/phantomzmc",
  },
  {
    icon: "mdi:linkedin",
    friendlyName: "LinkedIn",
    link: "https://www.linkedin.com/in/thannathorn-yuwasin-3437061a1/",
  },
  {
    icon: "mdi:email",
    friendlyName: "email",
    link: "mailto:sirkiiky@gmail.com",
  },
];

export const NAV_LINKS: Array<{ title: string; path: string }> = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Blog",
    path: "/blog",
  },
  {
    title: "Projects",
    path: "/projects",
  },
  // {
  //   title: "Archive",
  //   path: "/archive",
  // },
];
