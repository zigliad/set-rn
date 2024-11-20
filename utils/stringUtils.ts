export const toHumanCase = (str: string) => {
	return (
		str
			// Replace non-alphanumeric characters or camelCase with spaces
			.replace(/([a-z])([A-Z])/g, "$1 $2") // Handle camelCase
			.replace(/[_-]+/g, " ") // Replace _ or - with space
			// Capitalize the first letter of each word
			.replace(/\b\w/g, (char) => char.toUpperCase())
	);
};
