function ramdonString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function generateOrderNumber(ordersLength: number): string {
  return `ORD-MANUAL#${ordersLength.toString().padStart(6, '0')}`;
}

export { ramdonString, generateOrderNumber };
