export const log = (message, ...optionalParams) => {
  console.log(`${message}`, ...optionalParams);
};

//https://github.com/scullyio/scully/blob/4cb72cbad82a266dcad015b43c21ec42fd6152ff/libs/plugins/base-href-rewrite/src/lib/plugins-base-href-rewrite.ts
export const pluralizer = (num, singular, plural) => {
  return num === 1 ? singular : plural;
};

export const dropEndingSlash = (str) =>
  str.endsWith('/') ? str.slice(0, -1) : str;
