export default `import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

export default class BaseContract {
  web3: Web3;
  contract: Contract;
  abi: any[];

  $$events

  constructor(_web3: Web3, _contractAddress: string) {
    this.web3 = _web3;
    this.abi = $$abi
    this.contract = new _web3.eth.Contract(this.abi, _contractAddress);
  }

  $$placeholder

  account() {
    return new Promise(async (resolve, reject) => {
      let accounts = await this.web3.eth.getAccounts();
      resolve(accounts[0]);
    });
  }

  sendTransaction(tx: any, value?: string) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        let opts = {
          from: await this.account(),
        };
        if (value) {
          //@ts-ignore
          opts.value = value;
        }
        let gas = await tx.estimateGas(opts);
        let gasPrice = await this.web3.eth.getGasPrice();

        //@ts-ignore
        opts.gas = gas;
        //@ts-ignore
        opts.gasPrice = gasPrice;
        await tx.send(opts);
        resolve();
      } catch (error) {
        reject(error);
      }
    })
  }
}
`
