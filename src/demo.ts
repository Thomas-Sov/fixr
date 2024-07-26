/**
 * Function to add two binary strings
 * @param {string} bin1 - The first binary string
 * @param {string} bin2 - The second binary string
 * @returns {string} The result of the binary addition
 */
// ts-ignore
function addBinary(bin1, bin2) {
    // Ensure both binary strings are of the same length by padding the shorter string with leading zeros
    let maxLength = Math.max(bin1.length, bin2.length);
    bin1 = bin1.padStart(maxLength, '0');
    bin2 = bin2.padStart(maxLength, '0');
  
    let carry = 0; // Initialize carry to 0
    let result = ''; // Initialize result as an empty string
  
    // Iterate over the binary strings from the last character to the first
    for (let i = maxLength - 1; i >= 0; i--) {
      // Perform binary addition for the current bits and the carry
      let sum = parseInt(bin1[i], 2) + parseInt(bin2[i], 2) + carry;
      
      // Calculate the bit to be added to the result (sum % 2)
      result = (sum % 2).toString() + result;
      
      // Calculate the new carry (sum / 2)
      carry = Math.floor(sum / 2);
    }
  
    // If there is a carry left after the loop, add it to the result
    if (carry) {
      result = carry.toString() + result;
    }
  
    return result; // Return the result of the binary addition
  }
  
  // Example usage:
  let binary1 = '1011';
  let binary2 = '1101';
  let sum = addBinary(binary1, binary2);
  console.log(`The sum of ${binary1} and ${binary2} is ${sum}`);
  // Output: The sum of 1011 and 1101 is 11000
  