import { reactive } from "vue";
import database from '../../data/database.json';
import { api } from './fetcher';
import { useRouter } from 'vue-router';

const session = reactive({
    user: null as User | null
});

interface User {
    id?: number;
    name: string;
    email?: string;
    password?: string;
    photo?: string;
    token?: string;
}

export function useSession() {
    return session;
}

export async function useLogin(email: string | undefined, password: string | undefined) {
    const router = useRouter();
    const userData = {
        email: email,
        password: password
    }

    const userDataDefault = {
        email: "wheed1@newpaltz.edu",
        password: "pass2"
    }

    const response = await api("users/login", "POST", userDataDefault); //change this to userData after testing
    session.user = response.data.user; //update the user
    if(session.user) {
        session.user.token = response.data.token;
        router.push('/stats'); //send the user to /stats
    }
    return response.isSuccess;
}

export function useLogout() {
    const router = useRouter();
    session.user = null; 
    router.push('/');
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