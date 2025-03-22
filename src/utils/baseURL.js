const getBaseUrl = () => {
    return "https://book-app-backend-rho.vercel.app".replace(/\/$/, ""); // Removes trailing slash if present
}

export default getBaseUrl;
