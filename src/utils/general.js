export function hashCode(str) {
	let hash = 0;

	if (!str.length) {
		return hash;
	}

	for (const c of str) {
		const charCode = c.charCodeAt(0);
		hash = ((hash << 5) - hash) + charCode;
		hash &= hash; // Convert to 32bit integer
	}
	return hash;
}