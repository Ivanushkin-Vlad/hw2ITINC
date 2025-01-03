import React, { useState } from 'react';
import s from './HW11.module.css';
import s2 from '../../s1-main/App.module.css';
import { restoreState } from '../hw06/localStorage/localStorage';
import SuperRange from './common/c7-SuperRange/SuperRange';

/*
 * 1 - передать значения в оба слайдера
 * 2 - дописать типы и логику функции change
 * 3 - сделать стили в соответствии с дизайном
 */

function HW11() {
    // Инициализация значений для слайдеров
    const [value1, setValue1] = useState(restoreState<number>('hw11-value1', 0));
    const [value2, setValue2] = useState(restoreState<number>('hw11-value2', 100));

    // Универсальная функция изменения значений
    const change = (event: any, value: number | number[]) => {
        if (Array.isArray(value)) {
            // Если пришёл массив, обновляем оба значения
            setValue1(value[0]);
            setValue2(value[1]);
        } else {
            // Если одно значение, обновляем только value1
            setValue1(value);
        }
    };

    return (
        <div id="hw11">
            <div className={s2.hwTitle}>Homework #11</div>

            <div className={s2.hw}>
                <div className={s.container}>
                    {/* Одиночный слайдер */}
                    <div className={s.wrapper}>
                        <span id="hw11-value" className={s.number}>
                            {value1}
                        </span>
                        <SuperRange
                            id="hw11-single-slider"
                            value={value1}
                            onChange={change} // Используем общую функцию
                        />
                    </div>

                    {/* Двойной слайдер */}
                    <div className={s.wrapper}>
                        <span id="hw11-value-1" className={s.number}>
                            {value1}
                        </span>
                        <SuperRange
                            id="hw11-double-slider"
                            value={[value1, value2]} // Передаём массив значений
                            onChange={change} // Используем общую функцию
                        />
                        <span id="hw11-value-2" className={s.number}>
                            {value2}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HW11;