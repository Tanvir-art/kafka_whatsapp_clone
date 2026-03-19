import bcryptjs from "bcryptjs";

export const hashPassword = async (password) => {
    try {
        if (!password) {
            throw new Error("Password is required");
        }
        const salt = await bcryptjs.genSalt(10);
        const hashPassword= await bcryptjs.hash(password, salt);
        return hashPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw error;
    }
}

export const comparePassword = async (password, hashPassword) => {
    try {
        if (!password || !hashPassword) {
            return false;
        }
        const isMatch =  await bcryptjs.compare(password, hashPassword);
        return isMatch;
    } catch (error) {
        console.error("Error comparing password:", error);
        throw error;
    }
}
