export const getRolesFetch = async() => {
    
    const roles= await fetch("http://localhost:3005/roles").then(
    (loadedRoles) => loadedRoles.json()
  );

  return roles
}