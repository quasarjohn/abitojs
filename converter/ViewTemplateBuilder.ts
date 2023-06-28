const buildReadOnlyFunction = (
  functionName: string,
  paramsWithType: string,
  params: string,
  returnType: string
) => {
  let template = `$$functionName($$paramsWithType) {
    return new Promise<$$returnType>(async (resolve, reject) => {
        try {
          return resolve(await this.contract.methods.$$functionName($$params).call());
        } catch (error) {
          reject(error);
        }
      })
    }
    
    `
  template = template.split('$$functionName').join(functionName)
  template = template.split('$$paramsWithType').join(paramsWithType)
  template = template.split('$$params').join(params)
  template = template.split('$$returnType').join(returnType)

  return template
}

export { buildReadOnlyFunction }
