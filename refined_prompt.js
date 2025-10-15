/**
 * Converts a given string to camelCase format.
 *
 * The function removes all special characters except spaces, underscores, and hyphens,
 * treats these separators as word boundaries, and then converts the string to camelCase.
 * The first word is in lowercase, and subsequent words are capitalized.
 *
 * @param {string} input - The input string to convert.
 * @returns {string} The camelCase formatted string. Returns an empty string if input is empty or contains no valid characters.
 * @throws {TypeError} Throws if the input is not a string.
 *
 * @example
 * toCamelCase('---hello__world'); // returns "helloWorld"
 * toCamelCase('  my--variable_name!@# '); // returns "myVariableName"
 */
 
/**
 * Converts a given string to dot.case format.
 *
 * The function removes all special characters except spaces, underscores, and hyphens,
 * treats these separators as word boundaries, and then converts the string to dot.case.
 * All words are converted to lowercase and joined by dots.
 *
 * @param {string} input - The input string to convert.
 * @returns {string} The dot.case formatted string. Returns an empty string if input is empty or contains no valid characters.
 * @throws {TypeError} Throws if the input is not a string.
 *
 * @example
 * toDotCase('---hello__world'); // returns "hello.world"
 * toDotCase('  my--variable_name!@# '); // returns "my.variable.name"
 */
function toCamelCase(input) {
    if (typeof input !== 'string') {
        throw new TypeError('Input must be a string');
    }

    // Remove all non-alphanumeric separators, replace with space
    // Only keep letters and numbers, treat separators as word boundaries
    const cleaned = input
        .replace(/[^a-zA-Z0-9\s_-]+/g, '') // Remove special characters except separators
        .replace(/[\s_-]+/g, ' ')          // Normalize all separators to single space
        .trim();                           // Remove leading/trailing spaces

    if (cleaned === '') return '';

    const words = cleaned.split(' ').filter(Boolean);

    return words
        .map((word, idx) => {
            const lower = word.toLowerCase();
            if (idx === 0) return lower;
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join('');
}

function toDotCase(input) {
    if (typeof input !== 'string') {
        throw new TypeError('Input must be a string');
    }

    // Remove all non-alphanumeric separators, replace with space
    // Only keep letters and numbers, treat separators as word boundaries
    const cleaned = input
        .replace(/[^a-zA-Z0-9\s_-]+/g, '') // Remove special characters except separators
        .replace(/[\s_-]+/g, ' ')          // Normalize all separators to single space
        .trim();                           // Remove leading/trailing spaces

    if (cleaned === '') return '';

    const words = cleaned.split(' ').filter(Boolean);

    return words.map(word => word.toLowerCase()).join('.');
}

// Example usage:
// console.log(toCamelCase('---hello__world')); // "helloWorld"
// console.log(toCamelCase('  my--variable_name!@# ')); // "myVariableName"