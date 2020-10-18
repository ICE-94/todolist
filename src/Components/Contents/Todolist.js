import React from 'react';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import Fab from '@material-ui/core/Fab';

const todolist = (props) => {
  const startDate = props.startDate;

  return (
    <>
      <div className="img-wrap">
        {props.image !== undefined ? (
          typeof props.image === 'object' ? (
            <img src={URL.createObjectURL(props.image)} alt="" />
          ) : (
            <img src={props.image} alt="" />
          )
        ) : undefined}
      </div>
      <div className="txt-wrap">
        <h3 className="txt-wrap tit">{props.title}</h3>
        <p className="txt-wrap txt">{props.content}</p>
      </div>
      <div className="state-wrap">
        <span className="date">
          {`${props.selectedDate.getFullYear()}.${props.selectedDate.getMonth()}.${props.selectedDate.getDay()} ${props.selectedDate.getHours()}:${props.selectedDate.getMinutes()}`}{' '}
          까지
        </span>
        <span className="count">1일 13시간 33분 남았어요!</span>
        <div className="state">
          <div className="state-bar" style={{ width: '20%' }}></div>
        </div>
      </div>
      <Fab variant="extended" className="btn btn-primary btn-icon">
        <CreateOutlinedIcon />
      </Fab>
    </>
  );
};

export default todolist;
