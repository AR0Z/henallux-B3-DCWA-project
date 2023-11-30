// regex for grid conditional formatting

export function emailFormat(value: string) {
	const emailRegex = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;
	return emailRegex.test(value);
}

export function phoneFormat(value: string) {
    const phoneRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
    return phoneRegex.test(value);
}