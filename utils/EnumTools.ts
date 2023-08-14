export const getEnumKey = (myEnum: any, enumValue: any): string =>
  Object.keys(myEnum).find(x => myEnum[x] === enumValue) || 'Enum value not found'
