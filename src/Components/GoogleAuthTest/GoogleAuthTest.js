import React, { useEffect, useContext } from 'react';
import { FirebaseContext, login, addOnAuthChange } from '../../shared/Firebase.config';
import btnGoogleLogin from '../../images/btn_google_login.png';
import { useHistory } from 'react-router-dom';

const GoogleAuthTest = () => {
    const { user, setUser } = useContext(FirebaseContext);
	const history = useHistory();

	useEffect(() => {
		addOnAuthChange(setUser);
	});

	useEffect(() => {
		if (user) {
			history.push('/list');
		}
	}, [user])

    const handleLoginClick = () => {
		const loginPromise = login(user);

		if (loginPromise) {
			loginPromise.then((result) => {
				if (result !== null && typeof result === 'object' && result.hasOwnProperty('user')) {
					result = result.user;
				}
				setUser(result);
				history.push('/list');
			});
		}
	}
	

    return (
        <div>
            <button className="btn" onClick={handleLoginClick}><img src={btnGoogleLogin} alt="" /></button>
            {/* <button onClick={handleLogoutClick}>logout</button> */}
        </div>
    )
};

export default GoogleAuthTest;