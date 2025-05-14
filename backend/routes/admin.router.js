const express = require("express");
const adminRouter = express.Router();
let errorHandler = require('../middleware/errorHandler');
errorHandler = errorHandler.errorHandler
const passport = require("passport");
require("../middleware/passport")(passport);
const adminMidd = require('../middleware/admin.middleware');
const AuthController = require("../controllers/admin/auth.controller");
// user authentication AuthController
adminRouter.post("/login", AuthController.login);
adminRouter.post("/register", AuthController.Register);
adminRouter.post("/send-otp", AuthController.sendOtp);
adminRouter.post("/get-otp", AuthController.checkOtp);
adminRouter.post("/reset-password", AuthController.updateRegister);
adminRouter.post("/assets-port", AuthController.assetMap);
adminRouter.post("/assets-charging", AuthController.assetMap1);
adminRouter.post("/assets-import-port", AuthController.uploadExcelToDatabase);
adminRouter.post("/assets-import-charging", AuthController.uploadExcelToDatabase1);
adminRouter.post("/assets-import", AuthController.importAsset);


//admin access
adminRouter.post("/active-user",adminMidd.adminUser, AuthController.activeUsers);
adminRouter.post("/create-mock",adminMidd.adminUser, AuthController.createMock);
adminRouter.post("/create-mock1",adminMidd.adminUser, AuthController.createMock1);
adminRouter.post("/fetch-mock",adminMidd.adminUser, AuthController.fetchMock);
adminRouter.post("/fetch-mock-single", adminMidd.adminUser, AuthController.fetchMockSingle);
adminRouter.post("/delete-mock", adminMidd.adminUser,AuthController.deleteMock);
adminRouter.post("/delete-selected-mock",adminMidd.adminUser, AuthController.deleteSelectedMock);
adminRouter.post("/download-excel",adminMidd.adminUser, AuthController.downloadMock);
adminRouter.post("/update-mock", adminMidd.adminUser,AuthController.updateMock);

// user access
adminRouter.post("/fetch-mock-single-user",adminMidd.checkUser, AuthController.fetchMockSingle); 
adminRouter.post("/update-mock-user", adminMidd.checkUser,AuthController.updateMock);

module.exports = adminRouter;
