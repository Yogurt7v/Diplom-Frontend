export const transformSession = (dbSession) => ({
    id: dbSession._id,
    hash: dbSession.hash,
    user: dbSession.user
});


export const addSessionFetch = (hash, user) => {
    fetch("http://localhost:3005/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        hash,
        user: user.res,
      }),
    });
  };
  
export const getSessionFetch = async (hash) =>{

  const result = await fetch(`http://localhost:3005/sessions/${hash}`)
  .then((loadedSession) =>loadedSession.json()).then((session) => transformSession(session))
  return result

}
export const deleteSessionFetch = async (sessionId) => {


    fetch(`http://localhost:3005/sessions/${sessionId}`, {
      method: "DELETE",
    });
  };
  

export const sessions = {
  create(user) {

    const hash = Math.random().toFixed(50);

    addSessionFetch(hash, user);

    return hash;
  },

  async remove(hash) {

    const session = await getSessionFetch(hash);
    if (!session) {
      return
    }
    deleteSessionFetch(session.id);
  },
  
  async access (hash, accessRoles) {
      const dbSession = await getSessionFetch(hash);
      return !!dbSession?.user && accessRoles.includes(dbSession.user.roleId)
  }
};