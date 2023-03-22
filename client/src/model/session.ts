import { reactive } from "vue";
import database from '../../data/database.json';

const session = reactive({
    user: null as User | null
});

interface User {
    id?: number;
    name: string;
    email?: string;
    photo?: string;
    token?: string;
}

export function useSession() {
    return session;
}

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