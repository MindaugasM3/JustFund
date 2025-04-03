export const error500 = (err, res) => res.status(500).json({success: false, data: err});
export const error400 = (res, customCode=0) => res.status(400).json({
    msg: {type: 'error', text: 'Invalid request. code: ' + customCode}
});
export const error401 = (res, message) => res.status(401).json({
    msg: {type: 'error', text: message}
});
