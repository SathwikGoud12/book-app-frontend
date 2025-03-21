function getImgUrl(name) {
    if (!name) return "/default-book.jpg";  // ✅ Fallback image

    // ✅ If it's already a full URL (e.g., external image links)
    if (name.startsWith("http")) {
        return name;
    }

    // ✅ Ensure environment variable is used correctly
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    // ✅ Return correct full URL
    return `${API_URL}/uploads/books/${name}`;
}

export { getImgUrl };
