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
 * 匹配权限列表
 * @param matchAuth 所需权限列表
 * @param userAuth  用户拥有权限列表
 * @returns
 */
const matchAuthority = (matchAuth: string[], userAuth: string[]) => {
  return matchArray(matchAuth, userAuth);
};

/**
 * 匹配当前用户权限
 * @param authoriths 路由所需权限列表
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
 * 匹配角色列表
 * @param matchRole 所需角色列表
 * @param userRole  用户拥有角色列表
 * @returns
 */
const matchRole = (matchRole: string[], userRole: string[]) => {
  return matchArray(matchRole, userRole);
};

/**
 * 匹配当前用户角色
 * @param authoriths 路由所需角色列表
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
