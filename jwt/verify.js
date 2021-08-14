const jwt = require('jsonwebtoken')

const secret = 'secret';

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNCwiaWF0IjoxNjI4OTIwNzI1LCJleHAiOjE2MjkwMDcxMjV9.AjHVsweGVZuhkStoXNSRMSHEMDW3qqW-sKvlhA7i2tg`

const valid = jwt.verify(token, secret);

console.log(valid);