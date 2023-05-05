import { reactive } from "vue";
import * as fetcher from './fetcher';

const session = reactive({
    user: null as User | null
});

export function api(url: string, method: string, data?: any, headers?: any ) {
    if(session.user?.token){
        
        headers = {
            "Authorization": `Bearer ${session.user.token}`,
            ...headers,
        }
    }

    return fetcher.rest(url, method, data, headers)
        .catch(err => {
            console.error({err});
        })
}

interface User {
    id?: number;
    name: string;
    email?: string;
    password?: string;
    photo?: string;
    token?: string;
    role?: string;
}

export function useSession() {
    return session;
}

export async function useLogin(email: string | undefined, password: string | undefined) {
    const userData = {
        email: email,
        password: password
    }
    /*
        const userDataDefault = {
            email: "wheed1@newpaltz.edu",
            password: "pass2"
        }
    */
    const response = await api("users/login", "POST", userData); //change this to userData after testing
    
    session.user = response.data.user; //update the user
    if(session.user) {
        session.user.token = response.data.token;
    }
    return response;
}

export function useLogout() {
    session.user = null; 
}



/*
export function setLogin(email: string, password: string) {

    for(let i = 0; i < database.users.length; i++){
        if(database.users[i].email == email && database.users[i].password == password){
            session.user = {
                id: database.users[i].id,
                name: database.users[i].name,
                email: database.users[i].email,
                photo: database.users[i].photo
            }
            return true;
        }
    }
    return false;
}
*/