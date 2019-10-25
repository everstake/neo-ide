
export const addLog = (text, group) => ({
  type: 'ADD_LOG',
  text: text,
  group: group
})


export const addUserWallet = (address, coin_type, amount, network) => ({
  type:'ADD_WALLET',
  address: address, 
  coin_type: coin_type,
  amount: amount,
  network:network
})



export const addNeo = (neo) => ({
  type: 'ADD_NEO',
  neo: neo
})