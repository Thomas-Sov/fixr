
function addBinary(bin1, bin2) {
    let maxLength = Math.max(bin1.length, bin2.length);
    bin1 = bin1.padStart(maxLength, '0');
    bin2 = bin2.padStart(maxLength, '0');
  
    let carry = 0; 
    let result = '';
  
    for (let i = maxLength - 1; i >= 0; i--) {
      let sum = parseInt(bin1[i], 2) + parseInt(bin2[i], 2) + carry;
      result = (sum % 2).toString() + result;
      carry = Math.floor(sum / 2);
    }

    if (carry) {
      result = carry.toString() + result;
    }
  
    return result; 
  }
  
  let binary1 = '1011';
  let binary2 = '1101';
  let sum = addBinary(binary1, binary2);
  console.log(`The sum of ${binary1} and ${binary2} is ${sum}`);
  