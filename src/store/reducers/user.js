const user = (state = null, action) => {
  switch(action.type) {
    case 'SET_USER':
      return action.user
    default:
      return null
  }
}

export default user;