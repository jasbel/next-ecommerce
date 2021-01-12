import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BasicLayout from '../layouts/BasicLayout';
import { getMeApi } from '../api/user';
import useAuth from '../hooks/useAuth';
import ChangeNameForm from '../components/Account/ChangeNameForm';



export default function account() {
    const [user, setUser] = useState(undefined);
    const { auth, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const response = await getMeApi(logout);
            setUser(response || null)
        })();
    }, [auth]);

    if (user === undefined ) return null;
    if (!auth && !user) {
        router.replace("/");
        return null;
    };


    return (
        <BasicLayout className="account" >
            <Configuration user={user} />
        </BasicLayout>
    )
}

function Configuration({user}) {
    return (
        <div className="account__configuration">
            <div className="title">Configuracion</div>
            <ChangeNameForm user={user}/>
        </div>
    )
}


