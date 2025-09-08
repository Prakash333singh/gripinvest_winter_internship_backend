export function suggestStrongPassword(password: string) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return 'Weak password, try adding numbers, symbols, and uppercase letters';
    if (score <= 4) return 'Moderate password, consider adding more variety';
    return 'Strong password!';
}
