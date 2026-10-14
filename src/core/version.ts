declare var process: any
export const BUILD_VERSION = (typeof process !== 'undefined' && process.env?.EASYQUIZ_VERSION) || 'v3.9.0'
export const BUILD_COMMIT = (typeof process !== 'undefined' && process.env?.EASYQUIZ_COMMIT) || 'main'
