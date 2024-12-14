import { WardenGlobalThis } from '../context';

const matchArray = (matchArray: string[], userArray: string[]) => {
  if (!matchArray || matchArray.length < 1) {
    return true;
  }
  if (!userArray || userArray.length < 1) {
    return false;
  }
  if (userArray.length > userArray.length) {
    return false;
  }
  return matchArray.every((auth: string) => {
    return userArray.includes(auth);
  });
}

/**
 * Match permission list
 * @param matchAuth List of required permissions
 * @param userAuth  User has permission list
 * @returns
 */
const matchAuthority = (matchAuth: string[], userAuth: string[]) => {
  return matchArray(matchAuth, userAuth);
};

/**
 * Match current user permissions
 * @param authoriths List of required permissions for routing
 * @returns
 */
const hasAuthority = (authoriths: string[]) => {
  if (!authoriths || authoriths.length < 1) {
    return true;
  }
  const currentUser = WardenGlobalThis.currentUser
  if(currentUser){
    return matchAuthority(authoriths, currentUser.access);
  }
  return false;
};

/**
 * Match Role List
 * @param matchRole List of required roles
 * @param userRole  The user has a list of roles
 * @returns
 */
const matchRole = (matchRole: string[], userRole: string[]) => {
  return matchArray(matchRole, userRole);
};

/**
 * Match the current user role
 * @param authoriths List of roles required for routing
 * @returns
 */
const hasRole = (roles: string[]) => {
  if (!roles || roles.length < 1) {
    return true;
  }
  const currentUser = WardenGlobalThis.currentUser;
  if(currentUser && currentUser.roles){
    return matchRole(roles, currentUser.roles);
  }  
  return false
}

export {
  matchAuthority,
  hasAuthority,
  matchRole,
  hasRole,
}
