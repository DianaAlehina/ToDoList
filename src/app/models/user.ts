export interface User {
  id: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  image: string,
  token: string
}

export function createUser(userAPI: any): User {

  if (userAPI){
    return {
      id: userAPI.id,
      username: userAPI.username,
      email: userAPI.email,
      firstName: userAPI.firstName,
      lastName: userAPI.lastName,
      image: userAPI.image,
      token: userAPI.token
    };
  }
  return {
    id: -1,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    image: '',
    token: '',
  };

}
