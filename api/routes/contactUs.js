var nodemailer = require('nodemailer');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/contactme', function (req, res) {

    var requestBody = req.body;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'djrio2008@gmail.com',
        }
    });

    var mailOptions = {
        from: req.body.email,
        to: 'mario.rodr.214@gmail.com',
        subject: req.body.name,
        text: req.body.comment
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });


});


module.exports = router;
