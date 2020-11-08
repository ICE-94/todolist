import React, {
	useState,
	useEffect,
	useRef,
} from 'react';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import Fab from '@material-ui/core/Fab';

const Todolist = (props) => {
	const startDate = new Date(props.startDate);
	const endDate = new Date(props.endDate);
	const duration =
		props.endDate - props.startDate;
	const progressRef = useRef();
	const [time, setTime] = useState(0);

	useEffect(() => {
		let _time = props.endDate - Date.now();
		setTime(
			_time < 0 ? '지난 일정입니다.' : _time
		);
		let progress = (_time / duration) * 100;
		progress = Math.floor(progress);
		console.log('props.endDate' + props.endDate);
		console.log(
			'props.startDate' + props.startDate
		);
		console.log('time' + _time);
		console.log('duration' + duration);
		console.log('progress' + progress);

		progressRef.current.style.width = `${
			100 -
			(progress >= 100 ? 100 : 100 - progress)
		}%`;
	}, []);

	return (
		<>
			<div className="img-wrap">
				{props.image !== undefined ? (
					typeof props.image === 'object' ? (
						props.image.name ? (
							<img
								src={URL.createObjectURL(
									props.image
								)}
								alt=""
							/>
						) : (
							<img src={props.image[0]} alt="" />
						)
					) : (
						<img src={props.image} alt="" />
					)
				) : undefined}
			</div>
			<div className="txt-wrap">
				<h3 className="txt-wrap tit">
					{props.title}
				</h3>
				<p className="txt-wrap txt">
					{props.content}
				</p>
			</div>
			<div className="state-wrap">
				<span className="date">
					{`${endDate.getFullYear()}.${
						endDate.getMonth() + 1
					}.${endDate.getDate()} ${endDate.getHours()}:${endDate.getMinutes()}`}{' '}
					까지
				</span>
				<span className="count">{time}</span>
				<div className="state">
					<div
						ref={progressRef}
						className="state-bar"
						style={{ width: `0%` }}></div>
				</div>
			</div>
			<Fab
				variant="extended"
				className="btn btn-primary btn-icon"
				onClick={() => {
					console.log(props.id);
				}}>
				<CreateOutlinedIcon />
			</Fab>
		</>
	);
};

export default Todolist;
