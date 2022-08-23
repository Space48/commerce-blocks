export const removeAllNonWordCharacters = (string: string): string => {
  return string.replace(/^[^_\-a-zA-Z]/, '-')
    .replace(/[\W+]/g, '-')
    // Replace double hyphens with a single hyphen.
    .replace(/-{2,}/, '-')
    // Remove any trailing hyphens.
    .replace(/(.)-$/, '$1')
}

export const toKebab = (string: string): string => {
  return string
    .split('')
    .map((letter) => {
      if (/[A-Z]/.test(letter)) {
        return ` ${letter.toLowerCase()}`
      }
      return letter
    })
    .join('')
    .trim()
    .replace(/[_\s]+/g, '-')
}

export const toCamel = (string: string): string => {
  return toKebab(string)
    .split('-')
    .map((word, index) => {
      if (index === 0) return word
      return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join('')
}

export const toTitle = (string: string): string => {
  return toKebab(string)
    .split('-')
    .map(word => {
      return word.slice(0, 1).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

export const toSentence = (string: string): string => {
  const interim = toKebab(string)
    .replace(/-/g, ' ')
  return interim.slice(0, 1).toUpperCase() + interim.slice(1)
}
