import React, { useState } from 'react';
import s2 from '../../s1-main/App.module.css';
import s from './HW13.module.css';
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton';
import axios, { AxiosError } from 'axios';
import success200 from './images/200.svg';
import error400 from './images/400.svg';
import error500 from './images/500.svg';
import errorUnknown from './images/error.svg';

/*
 * 1 - дописана функция send
 * 2 - кнопки дизэйблятся пока идёт запрос
 * 3 - стили соответствуют дизайну
 */

const HW13 = () => {
    const [code, setCode] = useState('');
    const [text, setText] = useState('');
    const [info, setInfo] = useState('');
    const [image, setImage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Управление состоянием кнопок

    const send = (x?: boolean | null) => async () => {
        const url =
            x === null
                ? 'https://xxxxxx.ccc' // Некорректный адрес
                : 'https://samurai.it-incubator.io/api/3.0/homework/test';

        setCode('');
        setImage('');
        setText('');
        setInfo('...loading');
        setIsLoading(true); // Блокируем кнопки

        try {
            const res = await axios.post(url, { success: x });
            setCode('Код 200!');
            setImage(success200);
            setText(res.data.message || '...всё ок)');
            setInfo('код 200 - обычно означает что скорее всего всё ок)');
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (x === null) {
                    setImage(errorUnknown);
                    setText('Ошибка');
                    setInfo('Error');
                } else if (e.response?.status === 400) {
                    setImage(error400);
                    setText('Ты не отправил success в body вообще!');
                    setInfo('ошибка 400 - обычно означает что скорее всего фронт отправил что-то не то на бэк!');
                } else if (e.response?.status === 500) {
                    setImage(error500);
                    setText('эмитация ошибки на сервере');
                    setInfo('ошибка 500 - обычно означает что что-то сломалось на сервере, например база данных)');
                } else {
                    setImage(errorUnknown);
                    setText('Неизвестная ошибка - некорректный адрес.');
                    setInfo('Что-то пошло не так...');
                }
                setCode(`Ошибка ${e.response?.status || 'Unknown'}`);
            } else {
                setImage(errorUnknown);
                setText('Произошла неизвестная ошибка.');
                setInfo('Ошибка: не удалось определить тип.');
                setCode('Unknown Error');
            }
        } finally {
            setIsLoading(false); // Разблокируем кнопки
        }
    };

    return (
        <div id={'hw13'}>
            <div className={s2.hwTitle}>Homework #13</div>

            <div className={s2.hw}>
                <div className={s.buttonsContainer}>
                    <SuperButton
                        id={'hw13-send-true'}
                        onClick={send(true)}
                        xType={'secondary'}
                        disabled={isLoading} // Блокируем кнопку, если запрос выполняется
                    >
                        Send true
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-false'}
                        onClick={send(false)}
                        xType={'secondary'}
                        disabled={isLoading} // Блокируем кнопку, если запрос выполняется
                    >
                        Send false
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-undefined'}
                        onClick={send(undefined)}
                        xType={'secondary'}
                        disabled={isLoading} // Блокируем кнопку, если запрос выполняется
                    >
                        Send undefined
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-null'}
                        onClick={send(null)} // Некорректный запрос
                        xType={'secondary'}
                        disabled={isLoading} // Блокируем кнопку, если запрос выполняется
                    >
                        Send null
                    </SuperButton>
                </div>

                <div className={s.responseContainer}>
                    <div className={s.imageContainer}>
                        {image && <img src={image} className={s.image} alt="status" />}
                    </div>

                    <div className={s.textContainer}>
                        <div id={'hw13-code'} className={s.code}>
                            {code}
                        </div>
                        <div id={'hw13-text'} className={s.text}>
                            {text}
                        </div>
                        <div id={'hw13-info'} className={s.info}>
                            {info}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HW13;
