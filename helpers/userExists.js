import { users } from '../DB/users.json';

export const userExists = (email) => {
    let error = false;
    
    const userFinded = users.find(user => user.email === email);
    
    if(userFinded !== undefined){
        error = true;
    }

    return error;
}