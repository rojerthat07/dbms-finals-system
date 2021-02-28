const state = {
  information: {},
  // account: {},
  // contact: {},
  // personal: {},
  // educationalBackground: {},
  // schedule: {},
};
const getters = { allApplicant: (state) => state };
const actions = {
  async updateInformation({ commit }, info) {
    commit("setInformation", info);
  },
  async clearInformation({ commit }) {
    commit("clearInformation");
  },
};
const mutations = {
  setInformation: (state, information) => {
    state.information = information;
    console.log(state.information);
  },
  clearInformation: (state) => {
    state.information = {};
  },
};

export default { state, getters, actions, mutations };
