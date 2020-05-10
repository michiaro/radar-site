// вставляет неразрывный пробел после предлога
export function glueUpPrepositions(string) {
  if (string === null) {
    return '';
  }
  return string.replace(/(\s(в|на|к|с|о|об|для)\s)/g, ' $2\xa0');
}