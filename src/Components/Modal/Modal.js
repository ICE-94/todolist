import React, { useState } from 'react';

//
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const Modal = (props) => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState(null);

  const handleOnClickCancle = () => {
    props.setModal(null);
  };

  return (
    <div>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          left: '0',
          top: '0',
          zIndex: '99',
          backgroundColor: 'rgba(0,0,0,.5)',
        }}
        onClick={handleOnClickCancle}
      ></div>
      <div
        style={{
          width: '500px',
          height: '500px',
          backgroundColor: '#fff',
          position: 'fixed',
          left: 'calc(50% - 250px)',
          top: 'calc(50% - 250px)',
          zIndex: '100',
        }}
      >
        <div>
          title
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          content
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
        </div>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk
              variant="inline"
              inputVariant="outlined"
              format="MM/dd/yyyy"
              value={selectedDate}
              InputAdornmentProps={{ position: 'start' }}
              onChange={(date) => handleDateChange(date)}
            />
          </MuiPickersUtilsProvider>
        </div>
        {imagePreview ? imagePreview : undefined}
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            e.preventDefault(); //이전 값이랑 같으면 무시하는거임

            if (e.target.files[0] === null && e.target.files[0] === undefined) {
              return;
            }

            setImage(e.target.files[0]);
            setImagePreview(
              <img
                src={URL.createObjectURL(e.target.files[0])}
                alt=""
                style={{ width: '100px', height: '100px' }}
              />
            );
          }}
        />
        <div>
          <button
            onClick={() => {
              const date = new Date();

              // const time = `${date.getFullYear()}.${date.getMonth()}.${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;

              const data = {
                title,
                content,
                selectedDate,
                startDate: date,
                image,
              };

              props.setData(data);

              handleOnClickCancle();
            }}
          >
            추가
          </button>
          <button onClick={handleOnClickCancle}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
