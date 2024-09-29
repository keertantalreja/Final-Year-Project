const { RegisterValidation, LoginValidation } = require('../../middleware/Validation/admin/accountValidation');
const { RegisterAdminService, LoginAdminService, GetAdminService, sendOtp, verifyOtp, changePassword, GetSingleAdminService } = require('../../services/Admin/accountService');

const router = require('express').Router();

router.post('/admin/register',RegisterValidation,RegisterAdminService)
router.post('/admin/login',LoginValidation,LoginAdminService)

router.post('/admin/forget/password/send/otp',sendOtp)
router.post('/admin/forget/password/verify/otp',verifyOtp)
router.post('/admin/forget/password/change/password',changePassword)
router.get('/admin/single/:id',GetSingleAdminService)








module.exports = router