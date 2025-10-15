function toCamelCase(str) {
    return str
        .split(/[\s_-]+/)
        .map((word, idx) => {
            if (idx === 0) {
                return word.toLowerCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join('');
}

// Example usage:
console.log(toCamelCase("hello world"));             // Output: "helloWorld"
console.log(toCamelCase("convert_to_camel_case"));   // Output: "convertToCamelCase"
console.log(toCamelCase("Make-this-camel-case"));    // Output: "makeThisCamelCase"