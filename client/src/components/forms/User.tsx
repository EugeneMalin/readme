import { Button, TextField, Theme, withStyles, createStyles } from '@material-ui/core';
import { useState } from 'react';
import { isUniqueLogin, isUniqueEmail } from '../../data/Network';
import { isValidEmail } from '../../data/Helpers';
import { MIN_LOGIN_SIZE, MIN_PASSWORD_SIZE, USER_FIELDS } from '../Const';
import { IUserErrors } from '../interface/IUserErrors';
import { IUserForm } from '../interface/IUserForm';
import { IUserInput } from '../interface/IUserInput';

const styles = (theme: Theme) => createStyles({
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    button: {
        width: 100,
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1)
    }
});

/**
 * Gets validation for user
 * @param userTemplate draft user
 */
export function isValid(userTemplate: IUserInput): [boolean, IUserErrors] {
    const validation: IUserErrors = {};
    let result = true;
    
    //Check for required fields
    USER_FIELDS.filter(field => field.required).forEach((field) => {
        if (!userTemplate[field.field]) {
            //@ts-ignore
            validation[field.field] = `${field.label} is required.`;
            result = false;
        }
    })

    if (!validation['login'] && userTemplate.login.length < MIN_LOGIN_SIZE - 1) {
        validation['login'] = `${userTemplate.login} is short login. Add ${MIN_LOGIN_SIZE - userTemplate.login.length} symbols.`
        result = false;
    }

    if (!validation['login'] && !isUniqueLogin(userTemplate.login)) {
        validation['login'] = `${userTemplate.login} is not unique.`
        result = false;
    }

    if (!validation['email'] && !isValidEmail(userTemplate.email)) {
        validation['email'] = `${userTemplate.email} is not valid email address.`
        result = false;
    }

    if (!validation['email'] && !isUniqueEmail(userTemplate.email)) {
        validation['email'] = `${userTemplate.email} is not unique.`
        result = false;
    }

    if (!validation['password'] && userTemplate.password.length < MIN_PASSWORD_SIZE - 1) {
        validation['password'] = 'Your password is too short.'
        result = false;
    }

    if (!validation['password'] && !validation['rPassword'] && userTemplate.password !== userTemplate.rPassword) {
        validation['rPassword'] = 'It is not match password.'
        result = false;
    }

    return [result, validation];
}

/**
 * User editing form
 */
export const User = withStyles(styles)((props: IUserForm) => {
    const [values, setValues] = useState<IUserInput>({
        password: '',
        rPassword: '',
        login: '',
        email: '',
        name: '',
        surname: '',
        patronymic: '',

        gender: undefined,
        about: ''
    });

    const [errors, setErrors] = useState<IUserErrors>({});

    const handleChange = (prop: keyof IUserInput) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return <>
        {USER_FIELDS.map(field => (
            <TextField 
                key={field.field}
                error={!!errors[field.field]}
                value={values[field.field]}
                type={field.type}
                label={field.label}
                required={field.required}
                onChange={handleChange(field.field)} 
                helperText={errors[field.field] || field.helper}
            />
        ))}

        <div className={props.classes?.buttons}>
            <Button className={props.classes?.button} variant="contained" onClick={ () => {
                props.onReject();
            }}>Cancel</Button>
            <Button className={props.classes?.button} variant="contained" color="primary" onClick={ () => {
                const [valid, validation] = isValid(values);

                if (!valid) {
                    setErrors({...validation})
                    return;
                }
                setErrors({})
                props.onCommit({
                    name: values.name,
                    surname: values.surname,
                    patronymic: values.patronymic,
                    password: values.password,
                    email: values.email,
                    login: values.login
                });
            }}>
                Save
            </Button>
        </div>
    </>
});