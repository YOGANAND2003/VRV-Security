const rbac = (allowedRoles) => (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: "You don't have permission to access this resource" });
    }
    next();
};

module.exports = rbac;
