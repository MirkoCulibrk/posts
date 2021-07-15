import axios from 'axios';
const signIn = async (user) => {
    const result = await axios.post('http://localhost:5000/auth/signin', user);
    return result;
};
const signUp = async (user) => {
    const result = await axios.post('http://localhost:5000/auth/signup', user);
    return result;
};
const hasSignned = async () => {
    const result = await axios.get('http://localhost:5000/auth/hassignned', {
        withCredentials: true,
    });
    return result;
};
export { signIn, signUp, hasSignned };
