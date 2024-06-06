import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [firstname, setFirstname] = useState('');
    const [nname, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [bdate, setBdate] = useState('');
    // const [passser, setPassser] = useState('');
    
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            firstname,
            nname,
            lastname,
            bdate,

        }
        tg.sendData(JSON.stringify(data));
    }, [firstname, lastname, nname, bdate])

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
    const dd = new Date();

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
                placeholder={dd.toString()}
                value={bdate}
                onChange={onChangeBdate}
            />

        </div>
    );
};

export default Form;
