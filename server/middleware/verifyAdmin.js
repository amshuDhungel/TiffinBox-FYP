export const verifyAdmin = async (req, res, next) => {
  try {
    console.log(req.user);
    const adminRole = req.user.isAdmin;
    if (!adminRole) {
      return res.status(403).send("Access Denied");
    }

    // res.status(200).send({ msg: req.user.IsAdmin });
    next();
  } catch (error) {
    res.status(404).send(error.message);
  }
};
