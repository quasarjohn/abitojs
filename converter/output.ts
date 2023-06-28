import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'

export default class BaseContract {
  web3: Web3
  contract: Contract
  abi: any[]

  OnNewPurchaseListener: any
  OnPresaleEndedListener: any
  OnPresaleUpdatedListener: any
  OnProceedsClaimedListener: any
  OwnershipTransferredListener: any

  constructor(_web3: Web3, _contractAddress: string) {
    this.web3 = _web3
    this.abi = [
      {
        inputs: [
          { internalType: 'address', name: '_invoker', type: 'address' },
          { internalType: 'address', name: '_tokenAddress', type: 'address' },
          {
            internalType: 'address',
            name: '_recipientWallet',
            type: 'address',
          },
          { internalType: 'uint256', name: '_taxPercentage', type: 'uint256' },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'buyer',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'time',
            type: 'uint256',
          },
        ],
        name: 'OnNewPurchase',
        type: 'event',
      },
      { anonymous: false, inputs: [], name: 'OnPresaleEnded', type: 'event' },
      { anonymous: false, inputs: [], name: 'OnPresaleUpdated', type: 'event' },
      {
        anonymous: false,
        inputs: [],
        name: 'OnProceedsClaimed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        inputs: [],
        name: '_owner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'bnbClaimed',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'bnbDeposited',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'claimDate',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'endDate',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'maxAmount',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minAmount',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'receipt',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'startDate',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'taxPercentage',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'tokenAddress',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalAmountBought',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalDepositedTokens',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalPriceOfDepositedTokens',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalTokensClaimed',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'newOwner', type: 'address' },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getUnlockTime',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getTime',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'uint256', name: 'time', type: 'uint256' }],
        name: 'lock',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'unlock',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'withdrawTokens',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_totalPriceOfDepositedTokens',
            type: 'uint256',
          },
          { internalType: 'uint256', name: '_minAmount', type: 'uint256' },
          { internalType: 'uint256', name: '_maxAmount', type: 'uint256' },
          { internalType: 'uint256', name: '_startDate', type: 'uint256' },
          { internalType: 'uint256', name: '_endDate', type: 'uint256' },
          { internalType: 'uint256', name: '_claimDate', type: 'uint256' },
        ],
        name: 'startPresale',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'startPresaleNow',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'endPresaleNow',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'launchNow',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'uint256', name: '_endDate', type: 'uint256' },
        ],
        name: 'updatePresaleEndDate',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'uint256', name: '_claimDate', type: 'uint256' },
        ],
        name: 'updateClaimDate',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'uint256', name: 'extension', type: 'uint256' },
        ],
        name: 'extendPresaleEndDate',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'uint256', name: 'extension', type: 'uint256' },
        ],
        name: 'extendPresaleClaimDate',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'claimBnb',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'bnbEarnedBySeller',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalTax',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'unsoldTokens',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'buy',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cancelPurchase',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'uint256', name: 'bnbAmount', type: 'uint256' },
        ],
        name: 'estimateClaimableTokens',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'claimableTokens',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'claimTokens',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'presaleEnded',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'presaleStarted',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'claimable',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'percentSold',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
    ]
    this.contract = new _web3.eth.Contract(this.abi, _contractAddress)
  }

  _owner() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        return resolve(await this.contract.methods._owner().call())
      } catch (error) {
        reject(error)
      }
    })
  }

  bnbClaimed() {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        return resolve(await this.contract.methods.bnbClaimed().call())
      } catch (error) {
        reject(error)
      }
    })
  }

  bnbDeposited(address: string) {
    return new Promise<string>(async (resolve, reject) => {
      try {
        return resolve(await this.contract.methods.bnbDeposited(address).call())
      } catch (error) {
        reject(error)
      }
    })
  }

  claimDate() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        return resolve(await this.contract.methods.claimDate().call())
      } catch (error) {
        reject(error)
      }
    })
  }

  endDate() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        return resolve(await this.contract.methods.endDate().call())
      } catch (error) {
        reject(error)
      }
    })
  }

  maxAmount() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        return resolve(await this.contract.methods.maxAmount().call())
      } catch (error) {
        reject(error)
      }
    })
  }

  minAmount() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        return resolve(await this.contract.methods.minAmount().call())
      } catch (error) {
        reject(error)
      }
    })
  }

  receipt(address: string) {
    return new Promise<string>(async (resolve, reject) => {
      try {
        return resolve(await this.contract.methods.receipt(address).call())
      } catch (error) {
        reject(error)
      }
    })
  }

  startDate() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        return resolve(await this.contract.methods.startDate().call())
      } catch (error) {
        reject(error)
      }
    })
  }

  taxPercentage() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        return resolve(await this.contract.methods.taxPercentage().call())
      } catch (error) {
        reject(error)
      }
    })
  }

  tokenAddress() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        return resolve(await this.contract.methods.tokenAddress().call())
      } catch (error) {
        reject(error)
      }
    })
  }

  totalAmountBought() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        return resolve(await this.contract.methods.totalAmountBought().call())
      } catch (error) {
        reject(error)
      }
    })
  }

  totalDepositedTokens() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        return resolve(
          await this.contract.methods.totalDepositedTokens().call()
        )
      } catch (error) {
        reject(error)
      }
    })
  }

  totalPriceOfDepositedTokens() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        return resolve(
          await this.contract.methods.totalPriceOfDepositedTokens().call()
        )
      } catch (error) {
        reject(error)
      }
    })
  }

  totalTokensClaimed() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        return resolve(await this.contract.methods.totalTokensClaimed().call())
      } catch (error) {
        reject(error)
      }
    })
  }

  owner() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        return resolve(await this.contract.methods.owner().call())
      } catch (error) {
        reject(error)
      }
    })
  }

  getUnlockTime() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        return resolve(await this.contract.methods.getUnlockTime().call())
      } catch (error) {
        reject(error)
      }
    })
  }

  getTime() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        return resolve(await this.contract.methods.getTime().call())
      } catch (error) {
        reject(error)
      }
    })
  }

  bnbEarnedBySeller() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        return resolve(await this.contract.methods.bnbEarnedBySeller().call())
      } catch (error) {
        reject(error)
      }
    })
  }

  totalTax() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        return resolve(await this.contract.methods.totalTax().call())
      } catch (error) {
        reject(error)
      }
    })
  }

  unsoldTokens() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        return resolve(await this.contract.methods.unsoldTokens().call())
      } catch (error) {
        reject(error)
      }
    })
  }

  estimateClaimableTokens(bnbAmount: string) {
    return new Promise<string>(async (resolve, reject) => {
      try {
        return resolve(
          await this.contract.methods.estimateClaimableTokens(bnbAmount).call()
        )
      } catch (error) {
        reject(error)
      }
    })
  }

  claimableTokens() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        return resolve(await this.contract.methods.claimableTokens().call())
      } catch (error) {
        reject(error)
      }
    })
  }

  presaleEnded() {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        return resolve(await this.contract.methods.presaleEnded().call())
      } catch (error) {
        reject(error)
      }
    })
  }

  presaleStarted() {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        return resolve(await this.contract.methods.presaleStarted().call())
      } catch (error) {
        reject(error)
      }
    })
  }

  claimable() {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        return resolve(await this.contract.methods.claimable().call())
      } catch (error) {
        reject(error)
      }
    })
  }

  percentSold() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        return resolve(await this.contract.methods.percentSold().call())
      } catch (error) {
        reject(error)
      }
    })
  }

  async buy($amount: string) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        let tx = this.contract.methods.buy($amount)
        await this.sendTransaction(tx, $amount)
        resolve()
      } catch (error) {
        reject()
      }
    })
  }
  onNewPurchase(fun: Function, block = 0) {
    this.OnNewPurchaseListener = this.contract.events.OnNewPurchase(
      {
        fromBlock: block,
      },
      function (_: any, event: any) {
        fun(event)
      }
    )
  }

  unsubscribeOnNewPurchaseListener() {
    this.OnNewPurchaseListener.unsubscribe()
    this.OnNewPurchaseListener = null
  }

  onPresaleEnded(fun: Function, block = 0) {
    this.OnPresaleEndedListener = this.contract.events.OnPresaleEnded(
      {
        fromBlock: block,
      },
      function (_: any, event: any) {
        fun(event)
      }
    )
  }

  unsubscribeOnPresaleEndedListener() {
    this.OnPresaleEndedListener.unsubscribe()
    this.OnPresaleEndedListener = null
  }

  onPresaleUpdated(fun: Function, block = 0) {
    this.OnPresaleUpdatedListener = this.contract.events.OnPresaleUpdated(
      {
        fromBlock: block,
      },
      function (_: any, event: any) {
        fun(event)
      }
    )
  }

  unsubscribeOnPresaleUpdatedListener() {
    this.OnPresaleUpdatedListener.unsubscribe()
    this.OnPresaleUpdatedListener = null
  }

  onProceedsClaimed(fun: Function, block = 0) {
    this.OnProceedsClaimedListener = this.contract.events.OnProceedsClaimed(
      {
        fromBlock: block,
      },
      function (_: any, event: any) {
        fun(event)
      }
    )
  }

  unsubscribeOnProceedsClaimedListener() {
    this.OnProceedsClaimedListener.unsubscribe()
    this.OnProceedsClaimedListener = null
  }

  ownershipTransferred(fun: Function, block = 0) {
    this.OwnershipTransferredListener =
      this.contract.events.OwnershipTransferred(
        {
          fromBlock: block,
        },
        function (_: any, event: any) {
          fun(event)
        }
      )
  }

  unsubscribeOwnershipTransferredListener() {
    this.OwnershipTransferredListener.unsubscribe()
    this.OwnershipTransferredListener = null
  }

  account() {
    return new Promise(async (resolve, reject) => {
      let accounts = await this.web3.eth.getAccounts()
      resolve(accounts[0])
    })
  }

  sendTransaction(tx: any, value?: string) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        let opts = {
          from: await this.account(),
        }
        if (value) {
          //@ts-ignore
          opts.value = this.web3.utils.toWei(value.toString(), 'ether')
        }
        let gas = await tx.estimateGas(opts)
        let gasPrice = await this.web3.eth.getGasPrice()

        //@ts-ignore
        opts.gas = gas
        //@ts-ignore
        opts.gasPrice = gasPrice
        await tx.send(opts)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }
}
