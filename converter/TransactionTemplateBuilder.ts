const buildTransactionFunction = (
  functionName: string,
  paramsWithType: string,
  params: string,
  returnType: string
) => {
  let transactions = 'tx, '

  if (params.endsWith('$amount')) {
    transactions += `$amount`
    params = params.replace('$amount', '')
  }

  let template = `async $$functionName($$paramsWithType) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        let tx = this.contract.methods.$$functionName($$params);
        await this.sendTransaction(${transactions});
        resolve();
      } catch (error) {
        reject();
      }
    })
  }`

  template = template.split('$$functionName').join(functionName)
  template = template.split('$$paramsWithType').join(paramsWithType)
  template = template.split('$$params').join(params)
  template = template.split('$$returnType').join(returnType)

  return template
}

export { buildTransactionFunction }
