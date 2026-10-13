declare const process: any
export const BUILD_VERSION = (typeof process !== 'undefined' && process.env?.EASYQUIZ_VERSION) || 'v3.4.8'
