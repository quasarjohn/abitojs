import ContractTemplate from './ContractTemplate'
import { buildEventListenerFunction } from './EventListenerTemplateBuilder'
import { buildTransactionFunction } from './TransactionTemplateBuilder'
import { buildReadOnlyFunction } from './ViewTemplateBuilder'

const convertAbiToTs = (abi: any[]) => {
  let conversion = ContractTemplate
  let readOnlyFunctions = ''
  let nonPayableFunctions = ''
  let payableFunctions = ''
  let events = ''
  let eventFunctions = ''

  abi.forEach((field: any) => {
    if (field.type == 'function') {
      let functionParamsWithTypes = buildFunctionParamsWithTypes(field.inputs)
      let functionParams = buildFunctionParams(field.inputs)
      let returnType = 'string'

      if (field.outputs.length == 1) {
        if (field.outputs[0].type == 'bool') {
          returnType = 'boolean'
        }
      }

      if (field.stateMutability == 'view') {
        readOnlyFunctions += buildReadOnlyFunction(
          field.name,
          functionParamsWithTypes,
          functionParams,
          returnType
        )
      } else if (
        field.stateMutability == 'payable' ||
        field.stateMutability == 'nonpayable'
      ) {
        if (field.stateMutability == 'payable') {
          functionParamsWithTypes += `$amount: string`
          functionParams += '$amount'
        }

        let t = buildTransactionFunction(
          field.name,
          functionParamsWithTypes,
          functionParams,
          returnType
        )

        if (field.stateMutability == 'payable') payableFunctions += t
        else if (field.stateMutability == 'nonpayable') nonPayableFunctions += t
      }
    } else if (field.type == 'event') {
      let e = field.name.charAt(0).toLowerCase() + field.name.slice(1)
      events += `${e}Listener: any;\n`
      eventFunctions += buildEventListenerFunction(field.name)
    }
  })

  console.log(payableFunctions, nonPayableFunctions)

  conversion = conversion.split('$$events').join(events + '')

  conversion = conversion
    .split('$$placeholder')
    .join(readOnlyFunctions + `$$placeholder`)

  conversion = conversion
    .split('$$placeholder')
    .join(payableFunctions + `$$placeholder`)

  conversion = conversion
    .split('$$placeholder')
    .join(nonPayableFunctions + `$$placeholder`)

  conversion = conversion.split('$$placeholder').join(eventFunctions)

  conversion = conversion.replace('$$abi', JSON.stringify(abi))

  return conversion
}

const buildFunctionParamsWithTypes = (inputs: any[]) => {
  if (inputs.length == 0) return ''
  let params = ''

  inputs.forEach((input, index) => {
    let name = input.name.length > 1 ? input.name : input.type
    params += `${name}: string, `
  })

  return params
}

const buildFunctionParams = (inputs: any[]) => {
  if (inputs.length == 0) return ''
  let params = ''

  inputs.forEach((input, index) => {
    let name = input.name.length > 1 ? input.name : input.type
    params += `${name}, `
  })

  return params
}

export { convertAbiToTs }
