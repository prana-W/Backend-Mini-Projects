const authService = new Map()

const setUser = (sessionId, user) => {
    return authService.set(sessionId, user)
}

const getUser = (sessionId) => {
    return authService.get(sessionId)
}

module.exports = {
    setUser,
    getUser
}