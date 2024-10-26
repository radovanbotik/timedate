import "server-only";

type TMap = {
  home: {
    greeting: string;
    location: string;
    currentTime: string;
  };
};

const dictionaries = {
  en: () => import("../dictionary/en.json").then(module => module.default),
  hu: () => import("../dictionary/hu.json").then(module => module.default),
  sk: () => import("../dictionary/sk.json").then(module => module.default),
};

//@ts-ignore
export const getDictionary = async (locale: string): Promise<TMap> => dictionaries[locale]();
