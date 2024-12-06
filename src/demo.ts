`
function addBinary(bin1: string, bin2: string): string {
  const maxLength: number = Math.max(bin1.length, bin2.length);
  bin1 = bin1.padStart(maxLength, '0');
  bin2 = bin2.padStart(maxLength, '0');

  let carry: number = 0;
  let result: string = '';

  for (let i: number = maxLength - 1; i >= 0; i--) {
    const sum: number = Number(bin1[i]) + Number(bin2[i]) + carry;
    result = (sum % 2).toString() + result;
    carry = Math.floor(sum / 2);
  }

  if (carry) {
    result = carry.toString() + result;
  }

  return result;
}

const binary1: string = '1011';
const binary2: string = '1101';
const sum: string = addBinary(binary1, binary2);
console.log(\`The sum of \${binary1} and \${binary2} is \${sum}\`);
`