import { checkPassword } from './validate';

export const addRules = {
    password: [
        {
            validator: checkPassword,
            trigger: 'blur'
        }
    ]
};
