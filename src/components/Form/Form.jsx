import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [firstname, setFirstname] = useState('');
    const [nname, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [bdate, setBdate] = useState('');
    const [passser, setPassser] = useState('');
    const [subject, setSubject] = useState('physical');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            firstname,
            nname,
            lastname,
            bdate,
            passser
        }
        tg.sendData(JSON.stringify(data));
    }, [firstname, lastname, nname])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Составить договор'
        })
    }, [])

    useEffect(() => {
        if(!firstname ) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [firstname])

    const onChangeFirstname = (e) => {
        setFirstname(e.target.value)
    }

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChangeLastname = (e) => {
        setLastname(e.target.value)
    }
    const onChangeBdate = (e) => {
        setBdate(e.target.value)
    }
    const onChangePassser = (e) => {
        setPassser(e.target.value)
    }
    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Введите данные</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Фамилия'}
                value={firstname}
                onChange={onChangeFirstname}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Имя'}
                value={nname}
                onChange={onChangeName}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Отчество'}
                value={lastname}
                onChange={onChangeLastname}
            />
            <input
                className={'input'}
                type="date"
                placeholder={'Дата рождения'}
                value={bdate}
                onChange={onChangeBdate}
            />
            <input
                className={'input'}
                type="number"
                placeholder={'Серия паспорта'}
                value={passser}
                onChange={onChangePassser}
            />
        </div>
    );
};

export default Form;
