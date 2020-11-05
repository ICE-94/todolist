import React, { useContext } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import {FirebaseContext} from '../../../shared/Firebase.config';

const Header = () => {
	const {user} = useContext(FirebaseContext);
	return (
		<div className="header">
			<h1 className="header-left">
				<CheckIcon />
				To Do List
			</h1>
			<div className="header-right">
				<span className="header-right__txt">
					안녕하세요, {user ? user.prajoviderData ? user.providerData[0] ? user.providerData[0].displayName : undefined : undefined : undefined}님!
				</span>
				<div className="header-right__photo-wrap">
					<PersonOutlineIcon />
					<img src={user ? user.providerData ? user.providerData[0] ? user.providerData[0].photoURL : undefined : undefined : undefined} alt="" />
				</div>
			</div>
		</div>
	);
};

export default Header;
