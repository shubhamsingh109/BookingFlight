import { useRef, useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUpService } from '../service/nodeApiService';
import StoreContext from '../store/store-context';
export default function SignUp() {
    const userName = useRef();
    const userEmail = useRef();
    const userPhone = useRef();
    const userPassword = useRef();
    const storeCtx = useContext(StoreContext);
    const navigate = useNavigate();
    let [isEmailExist, setEmailExistance] = useState(false);
    function submitSignUp(event) {
        event.preventDefault();
        setEmailExistance(false);
        const user = {
            name: userName.current.value,
            email: userEmail.current.value,
            phoneNumber: userPhone.current.value,
            password: userPassword.current.value
        };
        signUpService(user).then(response => {
            if (response.status === 200) {
                if (response.data.code === 1) {
                    // sign up successful
                    const userInfo = {
                        email: user.email,
                        name: user.name
                    }
                    storeCtx.setUser(userInfo);
                    navigate('/');
                } else if (response.data.code === 0) {
                    // user alredy exist
                    setEmailExistance(true);
                }
            }
        }).catch(err => {
            console.log(err);
        });
    }

    return <div>
        <div className="span3 well">
            <legend>New to App? Sign up!</legend>
            <form onSubmit={submitSignUp}>
                <div className="row">
                    <div className="col-sm-4">
                        <input className="form-control" name="name" placeholder="Full Name" type="text" required ref={userName} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <input className="form-control" name="email" placeholder="Email" type="email" required ref={userEmail} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <input className="form-control" name="phoneNumber" placeholder="Phone Number" type="tel" pattern="[0-9]{10}" ref={userPhone} />
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
                        <button className="btn btn-warning">Sign up</button>&nbsp;&nbsp;
                        <span>Have Account </span><span><Link to="/signIn">Sign In</Link></span>
                    </div>
                </div>
            </form>
            <div>{isEmailExist ? 'Email Already Exist' : ''}</div>
        </div>
    </div>
}