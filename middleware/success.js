const successHandler = ( req, res, next) => {
    res.status(200).json({
        success: true,
        message: res.body
    });
}

export default successHandler;
