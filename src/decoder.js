import { codec, Contract } from '@alephium/web3'

// const artifact: Contract = // contract artifact
const contract_bytecode = "0201407f01010202004045d30bea1a18160113c1024cb016ea314c060c047c7b184a4035160113c1024cb016ea130a2c334c060d047c7b184a4029160113c1024cb016ea112c314c0c1601694ece01410e7b1600ce00a9024a17160113c1024cb016ea112c334c0c1601694ece01410f7b1600ce00a8024a0510047c7b1811047c7b18"


// Ensure the bytecode is a Buffer if required by the codec
const bytecodeBuffer = Buffer.from(contract_bytecode, 'hex');
const decoded = codec.contract.contractCodec.decodeContract(bytecodeBuffer)
console.log("decoded:", decoded)
console.log("instrs:", decoded.methods[0].instrs)

