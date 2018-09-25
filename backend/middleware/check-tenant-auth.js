const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    try {

        const token = req.headers.tenantauthorization.split(" ")[1];
        const decodedTenantToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = { email: decodedTenantToken.email, userId: decodedTenantToken.tenantUserId }
        next();

    } catch (error) {
        res.status(401).json({ message: "Auth Failed check-tenant-auth" });
    }
}