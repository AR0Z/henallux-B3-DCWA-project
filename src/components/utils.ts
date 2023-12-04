// regex for grid conditional formatting

export function phoneFormat(value: string) {
	const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;
	return phoneRegex.test(value);
}

export function emailFormat(value: string) {
	const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
	return emailRegex.test(value);
}

export function passwordFormat(value: string) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
    return passwordRegex.test(value);
}
