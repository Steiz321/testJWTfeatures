import React, {useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import UserService from "./service/UserServices";

const App: React.FC = () => {
    const { store } = useContext(Context);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if(localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, [])

    const getUsers = async () => {
        try {
            const response = await UserService.fetchUsers();
            // @ts-ignore
            setUsers(response.data)
        } catch (err) {
            console.log(err);
        }
    }

    if(store.isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    if(!store.isAuth) {
        return (
            <LoginForm />
        );
    }

    return (
      <div>
          <h1>{store.isAuth ? `user ${store.user.email}` : 'user logged out'}</h1>
          <h1>{store.user.isActivated ? 'Account approved' : 'Please activate your account'}</h1>
          <button onClick={() => store.logout()}>Logout</button>
          <button onClick ={getUsers}>Get all users</button>
          <div>
              {/* @ts-ignore */}
              {users.map(user => <div key={user.email}>{user.email}</div>)}
          </div>
      </div>
  );
}

export default observer(App);
