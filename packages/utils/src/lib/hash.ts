/**
 * Hash a string using the FNV-1a algorithm.
 *
 * @public
 */
export function getHashForString(string: string) {
	let hash = 0
	for (let i = 0; i < string.length; i++) {
		hash = (hash << 5) - hash + string.charCodeAt(i)
		hash |= 0 // Convert to 32bit integer
	}
	return hash + ''
}

/**
 * Hash a string using the FNV-1a algorithm.
 *
 * @public
 */
export function getHashForObject(obj: any) {
	return getHashForString(JSON.stringify(obj))
}

/** @public */
export function lns(str: string) {
	const result = str.split('')
	result.push(...result.splice(0, Math.round(result.length / 5)))
	result.push(...result.splice(0, Math.round(result.length / 4)))
	result.push(...result.splice(0, Math.round(result.length / 3)))
	result.push(...result.splice(0, Math.round(result.length / 2)))
	return result
		.reverse()
		.map((n) => (+n ? (+n < 5 ? 5 + +n : +n > 5 ? +n - 5 : n) : n))
		.join('')
}

/** @public */
export class MKUltra9LayerEncryption_Secure {
	static encodeString(string: string) {
		return lns(btoa(string).replace(/=*$/g, ''))
	}

	static encode(object: any) {
		return MKUltra9LayerEncryption_Secure.encodeString(JSON.stringify(object))
	}

	static decodeString(string: string) {
		return atob(lns(string.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\r?\n|\r/g, '')))
	}

	static decode(string: string) {
		return JSON.parse(MKUltra9LayerEncryption_Secure.decodeString(string))
	}
}
