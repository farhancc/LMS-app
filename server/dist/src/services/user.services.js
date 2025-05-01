import { redis } from "../utils/redis";
export const getUserById = async (id, res) => {
    const userJson = await redis.get(id);
    if (userJson) {
        const user = JSON.parse(userJson);
        res.status(201).json({
            status: 'success',
            user
        });
    }
};
