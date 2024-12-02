export function isSameDate(date1: Date, date2: Date) {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() && // Months are zero-based
		date1.getDate() === date2.getDate()
	);
}

const MS_IN_A_DAY = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

export function daysDifference(date1: Date, date2: Date) {
	// Get the time difference in milliseconds
	const timeDifference = date2.getTime() - date1.getTime();
	// Convert milliseconds to days
	const daysDifference = timeDifference / MS_IN_A_DAY;
	// Use Math.ceil or Math.round if needed
	return Math.floor(daysDifference);
}
