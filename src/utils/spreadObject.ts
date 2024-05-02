export const ifSpreadArray = <T>(condition: boolean, data: T) =>
  condition ? [data] : []
