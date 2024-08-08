export const logout = () => {
    localStorage.removeItem('username');
    window.location.href = '/';
}