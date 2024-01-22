import CryptoJS from 'crypto-js';

export function decryptSeed({
	encryptedSeed,
	password
}: {
	encryptedSeed: string;
	password: string;
}) {
	const decrypted = CryptoJS.AES.decrypt(encryptedSeed, password).toString(CryptoJS.enc.Utf8);
	return convertToActualSeed(decrypted);
}

export function isSeedValid(str: string) {
	// Regular expression to check if string is a valid hexadecimal
	const regexp = /^[0-9A-Fa-f]{64}$/;
	// Test if the string matches the regular expression
	return regexp.test(str);
}

function hexToUint8(hexValue: string) {
	const length = (hexValue.length / 2) | 0;
	const uint8 = new Uint8Array(length);
	for (let i = 0; i < length; i++) uint8[i] = parseInt(hexValue.substr(i * 2, 2), 16);

	return uint8;
}

function uint8ToHex(uintValue: Uint8Array) {
	let hex = '';
	let aux: string;
	for (let i = 0; i < uintValue.length; i++) {
		aux = uintValue[i].toString(16).toUpperCase();
		if (aux.length == 1) aux = '0' + aux;
		hex += aux;
		aux = '';
	}

	return hex;
}

function convertToActualSeed(s: string) {
	return uint8ToHex(hexToUint8(s));
}
