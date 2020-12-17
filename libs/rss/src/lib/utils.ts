export const log = (message, ...optionalParams) => {
  console.log(`${message}`, ...optionalParams);
};

//https://github.com/scullyio/scully/blob/4cb72cbad82a266dcad015b43c21ec42fd6152ff/libs/plugins/base-href-rewrite/src/lib/plugins-base-href-rewrite.ts
export const pluralizer = (num, singular, plural) => {
  return num === 1 ? singular : plural;
};

export const dropEndingSlash = (str) =>
  str.endsWith('/') ? str.slice(0, -1) : str;

export function nth_occurrence(text, searchString, nth) {
  const firstIndex = text.indexOf(searchString);
  const lengthUpToFirstIndex = firstIndex + 1;

  if (nth === 1) {
    return firstIndex;
  } else {
    const stringAfterFirstOccurrence = text.slice(lengthUpToFirstIndex);
    const nextOccurrence = nth_occurrence(
      stringAfterFirstOccurrence,
      searchString,
      nth - 1
    );

    if (nextOccurrence === -1) {
      return -1;
    } else {
      return lengthUpToFirstIndex + nextOccurrence;
    }
  }
}
