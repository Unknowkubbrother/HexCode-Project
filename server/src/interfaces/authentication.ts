interface RegisterBody {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface LoginBody {
    username: string;
    password: string;
}

export {
    RegisterBody,
    LoginBody
}