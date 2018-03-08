const Web3 = require('web3')
/* eslint-disable */
let myWeb3
let isMetaMask = false
if (typeof web3 !== 'undefined') {
  myWeb3 = new Web3(web3.currentProvider)
  isMetaMask = true
} else {
  //Should be deleted production
  myWeb3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"))
  console.error('No browser web3 client found')
}


// Initiate contracts
let network = '4447'
import * as jsonBaseContract from '../../contracts/Base.json'

let BaseContract = new myWeb3.eth.Contract(jsonBaseContract.abi, jsonBaseContract.networks[network].address)

// import shop from '../../api/shop'
const namespaced = true

// initial state
const state = {
  clientAccount: null,
  welcomeText: "",
  isMetaMask: isMetaMask,
  animals: {},
  animalList: []
}

// getters
const getters = {
  isMetaMask: state => state.isMetaMask,
  clientAccount: state => state.clientAccount,
  welcomeText: state => state.welcomeText,
  animals: state => state.animals,
  animalList: state => state.animalList
}

/* eslint-enable */
// actions
const actions = {
  async start({dispatch}) {
    await dispatch('getCoinbase')
    dispatch('syncWelcomeText')
    dispatch('syncAnimalByOwner', {address: state.clientAccount})
  },
  getCoinbase({commit}) {
    return new Promise(resolve => {
      myWeb3.eth.getCoinbase()
        .then(res => {
          if (res === undefined) {
            console.error('web3 address was undefined')
          } else {
            commit('setClientAccount', res)
            resolve()
          }
        })
    })
  },
  syncWelcomeText({commit}) {
    BaseContract.methods.getWelcomeText()
      .call({from: state.clientAccount}, function (error, res) {
        if (error !== null) {
          console.error('getWelcomeText ', error)
        } else {
          commit('updateWelcomeText', {text: res})
        }
      })
  },
  syncAnimalByOwner({commit, dispatch}, data) {
    BaseContract.methods.getAnimalByOwner(data.address)
      .call({from: state.clientAccount}, function (error, res) {
        if (error !== null) {
          console.error('getAnimalByOwner ', error)
        } else {
          console.log(res)
          let ids = res.map(id => parseInt(id))
          for (let id in ids) {
            dispatch('syncAnimal', {id: id})
          }
          commit('updateAnimalList', {list: ids})
          dispatch('watchAnimals')
        }
      })
  },
  watchAnimals({commit}, data) {
    BaseContract.events.NewAnimal(
      {
        filter: {myIndexedParam: [20, 23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
        fromBlock: 0
      }, function (error, event) {
        if (error !== null) {
          console.error('watchAnimals ', error)
        } else {
          console.log(event)
        }
      }
    )
  },
  syncAnimal({commit}, data) {
    BaseContract.methods.getAnimal(data.id)
      .call({from: state.clientAccount}, function (error, res) {
        if (error !== null) {
          console.error('getAnimal ', error)
        } else {
          commit('updateAnimal', {animal: res})
        }
      })
  },
  createNewAnimal({commit}, data) {
    BaseContract.methods.createAnimal(
      data.name,
      data.age,
      state.clientAccount)
      .send({from: state.clientAccount}, function (error, res) {
        if (error !== null) {
          console.error('getAnimal ', error)
        } else {
          console.log(res)
        }
      })
  },
  changeWelcomeText({dispatch}, data) {
    BaseContract.methods.setWelcomeText(data.text)
      .send({from: state.clientAccount})
      .on('transactionHash', function (hash) {
        console.log("Event #transactionHash: " + hash)
      })
      .on('receipt', function (receipt) {
        console.log("Event #receipt: ")
        console.log(receipt)
        // Just example, better to subscribe to events. See animals function for events. 10 seconds should be enough for the chain to create a block.
        setTimeout(() => {
          dispatch('syncWelcomeText')
        }, 10000)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        console.log("Event #confirmation: ")
        console.log(confirmationNumber)
      })
      .on('error', console.error)
  }
}

// mutations
const mutations = {
  setClientAccount(state, address) {
    state.clientAccount = address
  },
  updateWelcomeText(state, data) {
    state.welcomeText = data.text
  },
  updateAnimalList(state, data) {
    state.animalList = data.list
  },
  updateAnimal(state, data) {
    //
    state.animals = {...state.animals, [data.animal.id]: data.animal}
  }
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
