declare var process: any
export const BUILD_VERSION = process.env.EASYQUIZ_VERSION || 'DEV'
export const BUILD_COMMIT = process.env.EASYQUIZ_COMMIT || 'local'
