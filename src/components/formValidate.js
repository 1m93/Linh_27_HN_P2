export const emailValidate = (email) => {
	const regEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
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
	const key = ["email", "password", "firstname", "lastname", "phone"];
	for (let i = 0; i < key.length; i++) {
		if (!obj[key[i]]) return false;
	}
	return true;
};
