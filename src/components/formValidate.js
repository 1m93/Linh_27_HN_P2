export const emailValidate = (email) => {
	const regEmail = /^[a-z][a-z0-9_]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm;
	return regEmail.test(email);
};

export const passwordValidate = (password) => {
	const regPass = /^(?=[\w]).{6,}$/gm;
	return regPass.test(password);
};

export const repasswordValidate = (password, repassword) => {
	return password === repassword;
};

export const checkAllTrue = (obj) => {
	for (var o in obj) if (!obj[o]) return false;
	return true;
}
