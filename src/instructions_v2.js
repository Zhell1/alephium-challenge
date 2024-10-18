import { blake2b } from 'blakejs'; // Import the blake2b function from blakejs


const immutables = [100n, 9876543210n] // args
let balance = 0n

/*
const instructions = [
    { name: 'MethodSelector', code: 211, selector: 199891480 },
    { name: 'LoadLocal', code: 22, index: 1 },
    { name: 'U256Const', code: 19, value: 9876543210n },
    { name: 'U256Lt', code: 49 },
    { name: 'IfFalse', code: 76, offset: 6 },
    { name: 'U256Const0', code: 12 },
    { name: 'ConstFalse', code: 4 },
    { name: 'Swap', code: 124 },
    { name: 'AssertWithErrorCode', code: 123 },
    { name: 'Pop', code: 24 },
    { name: 'Jump', code: 74, offset: 53 },
    { name: 'LoadLocal', code: 22, index: 1 },
    { name: 'U256Const', code: 19, value: 9876543210n },
    { name: 'U256Const', code: 19, value: 10n },
    { name: 'U256Mul', code: 44 },
    { name: 'U256Gt', code: 51 },
    { name: 'IfFalse', code: 76, offset: 6 },
    { name: 'U256Const1', code: 13 },
    { name: 'ConstFalse', code: 4 },
    { name: 'Swap', code: 124 },
    { name: 'AssertWithErrorCode', code: 123 },
    { name: 'Pop', code: 24 },
    { name: 'Jump', code: 74, offset: 41 },
    { name: 'LoadLocal', code: 22, index: 1 },
    { name: 'U256Const', code: 19, value: 9876543210n },
    { name: 'U256Const5', code: 17 },
    { name: 'U256Mul', code: 44 },
    { name: 'U256Lt', code: 49 },
    { name: 'IfFalse', code: 76, offset: 12 },
    { name: 'LoadLocal', code: 22, index: 1 },
    { name: 'U256To8Byte', code: 105 },
    { name: 'Blake2b', code: 78 },
    { name: 'LoadImmField', code: 206, index: 1 },
    { name: 'ByteVecEq', code: 65 },
    { name: 'U256Const2', code: 14 },
    { name: 'AssertWithErrorCode', code: 123 },
    { name: 'LoadLocal', code: 22, index: 0 },
    { name: 'LoadImmField', code: 206, index: 0 },
    { name: 'TransferAlphToSelf', code: 169 },
    { name: 'Return', code: 2 },
    { name: 'Jump', code: 74, offset: 23 },
    { name: 'LoadLocal', code: 22, index: 1 },
    { name: 'U256Const', code: 19, value: 9876543210n },
    { name: 'U256Const5', code: 17 },
    { name: 'U256Mul', code: 44 },
    { name: 'U256Gt', code: 51 },
    { name: 'IfFalse', code: 76, offset: 12 },
    { name: 'LoadLocal', code: 22, index: 1 },
    { name: 'U256To8Byte', code: 105 },
    { name: 'Blake2b', code: 78 },
    { name: 'LoadImmField', code: 206, index: 1 },
    { name: 'ByteVecEq', code: 65 },
    { name: 'U256Const3', code: 15 },
    { name: 'AssertWithErrorCode', code: 123 },
    { name: 'LoadLocal', code: 22, index: 0 },
    { name: 'LoadImmField', code: 206, index: 0 },
    { name: 'TransferAlphFromSelf', code: 168 },
    { name: 'Return', code: 2 },
    { name: 'Jump', code: 74, offset: 5 },
    { name: 'U256Const4', code: 16 },
    { name: 'ConstFalse', code: 4 },
    { name: 'Swap', code: 124 },
    { name: 'AssertWithErrorCode', code: 123 },
    { name: 'Pop', code: 24 },
    { name: 'U256Const5', code: 17 },
    { name: 'ConstFalse', code: 4 },
    { name: 'Swap', code: 124 },
    { name: 'AssertWithErrorCode', code: 123 },
    { name: 'Pop', code: 24 }
]
    */

const instructions = [
    { "name": 'MethodSelector', "selector": 199891480 },
    { "name": "LoadLocal", "index": 1 },
    { "name": "U256Const", "value": 9876543210n },
    { "name": "U256Lt" },
    { "name": "IfFalse", "offset": 6 },
    { "name": "U256Const0" },
    { "name": "ConstFalse" },
    { "name": "Swap" },
    { "name": "AssertWithErrorCode" },
    { "name": "Pop" },
    { "name": "Jump", "offset": 53 },
    { "name": "LoadLocal", "index": 1 },
    { "name": "U256Const", "value": 9876543210n },
    { "name": "U256Const", "value": 10n },
    { "name": "U256Mul" },
    { "name": "U256Gt" },
    { "name": "IfFalse", "offset": 6 },
    { "name": "U256Const1" },
    { "name": "ConstFalse" },
    { "name": "Swap" },
    { "name": "AssertWithErrorCode" },
    { "name": "Pop" },
    { "name": "Jump", "offset": 41 },
    { "name": "LoadLocal", "index": 1 },
    { "name": "U256Const", "value": 9876543210n },
    { "name": "U256Const5" },
    { "name": "U256Mul" },
    { "name": "U256Lt" },
    { "name": "IfFalse", "offset": 12 },
    { "name": "LoadLocal", "index": 1 },
    { "name": "U256To8Byte" },
    { "name": "Blake2b" },
    { "name": "LoadImmField", "index": 1 },
    { "name": "ByteVecEq" },
    { "name": "U256Const2" },
    { "name": "AssertWithErrorCode" },
    { "name": "LoadLocal", "index": 0 },
    { "name": "LoadImmField", "index": 0 },
    { "name": "TransferAlphToSelf" },
    { "name": "Return" },
    { "name": "Jump", "offset": 23 },
    { "name": "LoadLocal", "index": 1 },
    { "name": "U256Const", "value": 9876543210n },
    { "name": "U256Const5" },
    { "name": "U256Mul" },
    { "name": "U256Gt" },
    { "name": "IfFalse", "offset": 12 },
    { "name": "LoadLocal", "index": 1 },
    { "name": "U256To8Byte" },
    { "name": "Blake2b" },
    { "name": "LoadImmField", "index": 1 },
    { "name": "ByteVecEq" },
    { "name": "U256Const3" },
    { "name": "AssertWithErrorCode" },
    { "name": "LoadLocal", "index": 0 },
    { "name": "LoadImmField", "index": 0 },
    { "name": "TransferAlphFromSelf" },
    { "name": "Return" },
    { "name": "Jump", "offset": 5 },
    { "name": "U256Const4" },
    { "name": "ConstFalse" },
    { "name": "Swap" },
    { "name": "AssertWithErrorCode" },
    { "name": "Pop" },
    { "name": "U256Const5" },
    { "name": "ConstFalse" },
    { "name": "Swap" },
    { "name": "AssertWithErrorCode" },
    { "name": "Pop" }
]




function bigintToBuffer(value) {
    const hex = value.toString(16);
    const length = Math.ceil(hex.length / 2);
    const buffer = Buffer.alloc(length);
    for (let i = 0; i < length; i++) {
        buffer[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    }
    return buffer;
}

function deepCopy(original) {
    if (original === null || typeof original !== 'object') {
        return original; // Return the value if not an object
    }

    // Handle BigInt
    if (typeof original === 'bigint') {
        return BigInt(original); // Create a new BigInt
    }

    // Handle Date
    if (original instanceof Date) {
        return new Date(original); // Create a new Date
    }

    // Handle Array
    if (Array.isArray(original)) {
        return original.map(item => deepCopy(item)); // Recursively copy elements
    }

    // Handle Objects
    const newObj = {};
    for (const key in original) {
        newObj[key] = deepCopy(original[key]); // Recursively copy properties
    }
    return newObj;
}

function executeInstructions(instrs) {
    const stack = [];
    let pc = 0; // Program counter
    let context = deepCopy(immutables)
    console.log("context:", context)

    while (pc < instrs.length) {
        const instr = instrs[pc];

        switch (instr.name) {
            case 'LoadLocal':
                const localValue = context[instr.index]; // Retrieve the variable
                console.log("load local val, index", instr.index, "localValue:", localValue)
                stack.push(localValue); // Push the value onto the stack
                break;

            case 'U256Const':
                stack.push(instr.value);
                break;

            case 'U256Const0':
                stack.push(0n); // Push 0 to stack
                break;

            case 'U256Const1':
                stack.push(1n); // Push 1 to stack
                break;

            case 'U256Const2':
                stack.push(2n); // Push 2 to stack
                break;

            case 'U256Const3':
                stack.push(3n); // Push 3 to stack
                break;

            case 'U256Const4':
                stack.push(4n); // Push 4 to stack
                break;

            case 'U256Const5':
                stack.push(5n); // Push 5 to stack
                break;

            case 'U256Lt':
                const aLt = stack.pop();
                const bLt = stack.pop();
                stack.push(bLt < aLt); // Compare and push result
                break;

            case 'U256Gt':
                const aGt = stack.pop();
                const bGt = stack.pop();
                stack.push(bGt > aGt); // Compare and push result
                break;

            case 'IfFalse':
                if (!stack.pop()) {
                    pc += instr.offset; // Jump to the given offset if false
                }
                break;

            case 'MethodSelector':
                // Implement logic for MethodSelector TODO
                console.log(`Method selector invoked: ${instr.selector}`);
                break;

            case 'U256Mul':
                const aMul = stack.pop();
                const bMul = stack.pop();
                stack.push(aMul * bMul); // Multiply and push result
                break;

            case 'AssertWithErrorCode':
                const condition = stack.pop();
                console.log("AssertWithErrorCode: condition:", condition)
                if (!condition) {
                    const errmess = `Assertion failed! Error code: ${instr.code}`
                    console.log(errmess)
                    throw new Error(errmess);
                }
                break;

            case 'Pop':
                stack.pop(); // Remove the top element
                break;

            case 'Jump':
                pc += instr.offset; // Move the program counter
                continue; // Skip the pc++ increment below

            case 'Return':
                return stack.pop();

            case 'ConstFalse':
                stack.push(false); // Push false onto the stack
                break;

            case 'Swap':
                // Swap the top two elements of the stack
                const a = stack.pop();
                const b = stack.pop();
                stack.push(a); // Push first element back
                stack.push(b); // Push second element back
                break;

            case 'U256To8Byte':
                // Ensure there is a value on the stack to convert
                const value = stack.pop(); // Assume the top of the stack has the U256 value
                if (typeof value !== 'bigint') {
                    throw new Error(`Expected a bigint, got ${typeof value}`);
                }

                // Convert U256 (BigInt) to an 8-byte representation
                if (value < 0n || value >= (1n << 64n)) {
                    throw new Error(`Value ${value} is out of range for 8-byte representation`);
                }

                // Convert to a regular number (assuming safe to do so)
                const eightByteValue = Number(value); // May lose precision if value exceeds Number.MAX_SAFE_INTEGER
                stack.push(eightByteValue);
                break;


            case 'Blake2b':
                const input = stack.pop(); // Retrieve the input data

                // Ensure the input is a Buffer or a string
                let bufferInput;
                if (Buffer.isBuffer(input)) {
                    bufferInput = input; // It's already a Buffer
                } else if (typeof input === 'string') {
                    bufferInput = Buffer.from(input, 'utf-8'); // Convert string to Buffer
                } else if (typeof input === 'number') {
                    bufferInput = Buffer.from(input.toString()); // Convert number to Buffer
                } else {
                    throw new Error('Input for Blake2b must be a Buffer or a string.');
                }

                // Perform the Blake2b hashing
                const hash = blake2b(bufferInput); // Directly use blake2b function

                // Push the hash result back onto the stack
                stack.push(hash);
                console.log('Hash:', Buffer.from(hash).toString('hex')); // Display hash in hexadecimal
                break;

            case 'LoadImmField':
                // Logic to load an immutable field by instr.index
                const fieldValue = immutables[instr.index]; // Access the field value from context
                console.log("loadImmField, index=" + instr.index + ", value=" + fieldValue)
                if (fieldValue !== undefined) {
                    stack.push(fieldValue); // Push the loaded field value onto the stack
                } else {
                    throw new Error(`Field index ${instr.index} not found in context.`);
                }
                break;

            case 'ByteVecEq':
                const byteVec2 = stack.pop(); // Get the second byte vector
                const byteVec1 = stack.pop(); // Get the first byte vector

                const byteVec1Buffer = Buffer.from(byteVec1); // Convert Uint8Array to Buffer
                const byteVec2Buffer = bigintToBuffer(byteVec2); // Convert bigint to Buffer

                // Check if both are Buffer objects
                if (!Buffer.isBuffer(byteVec1Buffer) || !Buffer.isBuffer(byteVec2Buffer)) {
                    throw new Error(`Both values must be byte vectors (Buffers) for comparison, got byteVec1=${typeof byteVec1Buffer}, byteVec2=${typeof byteVec2Buffer}`);
                }

                // Compare the byte vectors
                const areEqual = byteVec1Buffer.equals(byteVec2Buffer); // Use Buffer's equals method

                // Push the result (true or false) onto the stack
                stack.push(areEqual ? 1n : 0n); // Assuming you use 1n for true and 0n for false
                break;

            case 'TransferAlphToSelf':
                const amount = stack.pop(); // Get the amount to transfer from the stack
                if (typeof amount !== 'bigint') {
                    throw new Error('TransferAlphToSelf expects amount to be a bigint');
                }

                // Perform the transfer
                balance += amount; // Increase the balance by the amount transferred

                console.log(`Transferred ${amount} to self. New balance: ${balance}`);
                break;

            // Handle additional cases as needed
            default:
                throw new Error(`Unknown instruction: ${instr.name}`)
        }

        pc++; // Move to the next instruction
    }
}

const result = executeInstructions(instructions)
console.log("result:", result)
