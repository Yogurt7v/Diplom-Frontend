export const transformSession = (dbSession) => {
    if (!dbSession) {
        return null;
    }
    return {
        id: dbSession._id,
        hash: dbSession.hash,
        user: dbSession.user
    };
};


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
  
export const getSessionFetch = async (hash) => {
  try {
    const response = await fetch(`http://localhost:3005/sessions/${hash}`);
    
    if (response.status === 404) {
      return null;
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const session = await response.json();
    return transformSession(session);
  } catch (error) {
    console.error('Error fetching session:', error);
    return null;
  }
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
    try {
      const session = await getSessionFetch(hash);
      if (!session) {
        console.log('Session not found for removal');
        return;
      }
      await deleteSessionFetch(session.id);
    } catch (error) {
      console.error('Error removing session:', error);
    }
  },
  
  async access (hash, accessRoles) {
      const dbSession = await getSessionFetch(hash);
      return !!dbSession?.user && accessRoles.includes(dbSession.user.roleId)
  }
};