const buildEventListenerFunction = (eventName: string) => {
  let e = eventName.charAt(0).toLowerCase() + eventName.slice(1)

  let template = `
  on${eventName}(fun: Function, block = 0) {
    this.${e}Listener = this.contract.events.$$eventName(
      {
        fromBlock: block,
      },
      function (_: any, event: any) {
        fun(event)
      }
    )
  }
  
  unsubscribe$$eventNameListener() {
    this.${e}Listener.unsubscribe()
    this.${e}Listener = null
  }

  `

  template = template.split('$$eventName').join(eventName)
  return template
}

export { buildEventListenerFunction }
