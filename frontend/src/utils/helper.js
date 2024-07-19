// Email Regular Expression Validation

export const validateEmail = (email) => {
    const regex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/
    return regex.test(email);
}

export const getInitials = (name) => {
    if(!name) return ""

    const words = name.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
        
    }

    return initials.toUpperCase();
}