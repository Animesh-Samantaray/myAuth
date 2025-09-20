import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: 'Not authorized' });
    }

    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecoded.id) {
            req.user = { userId: tokenDecoded.id }; 
        } else {
            return res.json({ success: false, message: 'Not authorized' });
        }

        next();
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export default userAuth;
