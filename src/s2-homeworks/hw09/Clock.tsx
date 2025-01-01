import React, {useState} from 'react';
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton';
import {restoreState} from '../hw06/localStorage/localStorage';
import s from './Clock.module.css';

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined);
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())));
    const [show, setShow] = useState<boolean>(false);

    const start = () => {
        const id = setInterval(() => {
            setDate(new Date());
        }, 1000);
        setTimerId(id as unknown as number); // Приведение типа для устранения ошибки
    };

    const stop = () => {
        if (timerId !== undefined) {
            clearInterval(timerId);
            setTimerId(undefined);
        }
    };

    const onMouseEnter = () => {
        setShow(true);
    };

    const onMouseLeave = () => {
        setShow(false);
    };

    const stringTime = date.toLocaleTimeString('en-GB'); // Формат HH:MM:SS
    const stringDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
    // Формат DD/MM/YYYY

    const stringDay = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(date); // День недели
    const stringMonth = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(date); // Месяц

    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'}>{stringDay}</span>,{' '}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-month'}>{stringMonth}</span>,{' '}
                            <span id={'hw9-date'}>{stringDate}</span>
                        </>
                    ) : (
                        <>
                            <br/>
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={!!timerId} // Заблокировать, если таймер запущен
                    onClick={start}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={!timerId} // Заблокировать, если таймер не запущен
                    onClick={stop}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    );
}

export default Clock;