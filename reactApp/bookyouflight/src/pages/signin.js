import { useRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../service/nodeApiService';
import StoreContext from '../store/store-context';
export default function SignIn() {
    const userEmail = useRef();
    const userPassword = useRef();
    const storeCtx = useContext(StoreContext);
    const [islogIn, setLogin] = useState(false);
    const navigate = useNavigate();
    function submitLogin(event) {
        event.preventDefault();
        setLogin(false);
        const user = {
            email: userEmail.current.value,
            password: userPassword.current.value
        };
        signIn(user).then(response => {
            if (response.status === 200) {
                if (response.data.code === 1) {
                    storeCtx.setUser({
                        email: user.email,
                        name: response.data.data
                    });
                    navigate('/');
                } else {
                    setLogin(true);
                }
            }
        })
    }

    return <div>
        <div className="span3 well">
            <legend>Sign In!</legend>
            <form onSubmit={submitLogin}>

                <div className="row">
                    <div className="col-sm-4">
                        <input className="form-control" name="email" placeholder="Email" type="email" required ref={userEmail} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <input className="form-control" name="password" placeholder="Password" type="password" required ref={userPassword} />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-sm-4">
                        <button className="btn btn-warning">Sign In</button>
                    </div>
                </div>
            </form>
            <div>{islogIn ? 'Invalid Credential' : ''}</div>
        </div>
    </div>
}