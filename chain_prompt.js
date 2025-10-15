function toKebabCase(input) {
    if (typeof input !== 'string') {
        return '';
        // Alternatively, you could throw an error:
        // throw new TypeError('Input must be a string');
    }

    return input
        // Replace underscores with spaces
        .replace(/_/g, ' ')
        // Insert space before capital letters (for camelCase)
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        // Replace multiple spaces with a single space
        .replace(/\s+/g, ' ')
        // Trim leading/trailing spaces
        .trim()
        // Convert to lowercase
        .toLowerCase()
        // Replace spaces with hyphens
        .replace(/ /g, '-');
}

// Example test cases:
console.log(toKebabCase('Hello_World'));         // Output: "hello-world"
console.log(toKebabCase('thisIsA Test'));        // Output: "this-is-a-test"
console.log(toKebabCase(12345));                 // Output: ""