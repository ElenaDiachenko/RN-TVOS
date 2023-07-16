export  const validateInputField = (field: string, value: string): string | undefined => {
    switch (field) {
        case 'username':
            if (!value) {
                return 'Username is required';
            } else if (value.length < 3) {
                return 'Username must be at least 3 characters long';
            }
            break;
        case 'email':
            if (!value) {
                return 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                return 'Invalid email format';
            }
            break;
        case 'password':
            if (!value) {
                return 'Password is required';
            } else if (value.length < 6) {
                return 'Password must be at least 6 characters long';
            }
            break;
        default:
            break;
    }
    return undefined;
};