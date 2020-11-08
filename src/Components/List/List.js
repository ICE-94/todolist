import React, {
	useState,
	useEffect,
	useContext,
} from 'react';

import {
	FirebaseContext,
	getFireDB,
	setTest,
	test,
	logout,
	download,
} from '../../shared/Firebase.config';

import Todolist from './Contents/Todolist';
import Header from './Header/Header';
import ContentsTop from './Contents/ContentsTop';

import { useHistory } from 'react-router-dom';

const List = () => {
	const [list, setList] = useState([]);
	const [modal, setModal] = useState(null);
	const [data, setData] = useState(null);

	const { user, setUser } = useContext(
		FirebaseContext
	);
	const history = useHistory();

	useEffect(() => {
		if (user === null) {
			history.push('');
		}
	});

	useEffect(() => {
		download()
			.then((todos) => {
				const _list = [];

				Object.keys(todos).forEach((key) => {
					const todo = todos[key];

					if (todo !== null) {
						_list.push(
							<Todolist
								id={key}
								title={todo.title}
								content={todo.content}
								endDate={todo.endDate}
								startDate={todo.startDate}
								image={todo.imageURL}
							/>
						);
					}
				});

				setList(_list);
			})
			.catch((error) => {
				if (error === 'data not found') {
					//데이터가 없는 경우
				}
			});

		// const _list = [];

		// const testTitle = `세탁기 돌리기`;
		// const testContent = `세탁기 돌릴 때 섬유유연제는 버넬이 냄새가 좋다. 돌린후에 건조기에
		//   넣어서 건조시키도록하자 어쩌고저쩌고 텍스트텟스트텍스트`;
		// const testSelectedDate = new Date();
		// const testStartDate = new Date();
		// const testImage = `https://i.pinimg.com/736x/61/57/8f/61578fcaff4659caf862f76d1b9fd747.jpg`;

		// for (let i = 0; i < 10; i++) {
		// 	switch (i) {
		// 		case 0:
		// 		case 3:
		// 		case 6:
		// 		case 7:
		// 		case 8:
		// 			_list.push(
		// 				<Todolist
		// 					title={testTitle}
		// 					content={testContent}
		// 					selectedDate={testSelectedDate}
		// 					startDate={testStartDate}
		// 					image={testImage}
		// 				/>
		// 			);
		// 			break;
		// 		default:
		// 			_list.push(
		// 				<Todolist
		// 					title={testTitle}
		// 					content={testContent}
		// 					selectedDate={testSelectedDate}
		// 					startDate={testStartDate}
		// 				/>
		// 			);
		// 			break;
		// 	}
		// }

		// setList(_list);
	}, []);

	useEffect(() => {
		if (data !== null) {
			setList([
				...list,
				<Todolist
					id={data.id}
					title={data.title}
					content={data.content}
					selectedDate={data.selectedDate}
					startDate={data.startDate}
					image={data.image}
				/>,
			]);
		}
	}, [data]);

	/*
      [props]
          title,
          content,
          selectedDate,
          startDate: date,
          image,
    */

	const handleLogoutClick = () => {
		logout().then((result) => {
			setUser(null);
		});
	};

	return (
		<>
			<Header />
			{/* <div>
              <button onClick={handleLogoutClick}>test</button>
          </div> */}
			<div className="contents">
				<ContentsTop setData={setData} />
				<div className="m-todolist-wrap">
					<ul className="todolist">
						{list.map((item, idx) => {
							return (
								<li
									className="todolist__item"
									key={idx}>
									{item}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</>
	);
};

export default List;
