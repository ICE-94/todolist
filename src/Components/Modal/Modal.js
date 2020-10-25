import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';

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
      <div className="dim"
        onClick={handleOnClickCancle}
      ></div>
      <div className="modal">
        <button className="modal__close-btn btn" onClick={handleOnClickCancle}><CloseIcon /></button>
        <h4 className="modal__tit">일정 등록하기</h4>
        <div className="modal__con">
          <div class="col-6">
            <label className="modal__label">제목</label>
            <input
              placeholder="제목"
              className="modal__input-txt"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div class="col-6">
            <label className="modal__label">날짜</label>
            <div class="custom-datapicker">
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
          </div>
          <div class="col-12">
            <label className="modal__label">내용</label>
            <textarea className="modal__input-txta"
            placeholder="내용"
            rows="10"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></textarea>
          </div>
          {imagePreview ? imagePreview : undefined}
          <label className="modal__label-btn"><AddPhotoAlternateOutlinedIcon />
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                e.preventDefault(); //이전 값이랑 같으면 동작안함

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
          </label>
        </div>

        <div className="modal__bottom-btn">
          <button className="btn btn-primary btn-md"
            onClick={() => {
              const date = new Date();
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
          
        </div>
      </div>
    </div>
  );
};

export default Modal;
