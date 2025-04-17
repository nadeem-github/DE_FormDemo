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
adminRouter.post("/create-mock", AuthController.createMock);

//admin login
adminRouter.post("/create-mock1",adminMidd.adminUser, AuthController.createMock1);
adminRouter.post("/fetch-mock",adminMidd.adminUser, AuthController.fetchMock);
adminRouter.post("/fetch-mock-single", adminMidd.adminUser, AuthController.fetchMockSingle);
adminRouter.post("/fetch-mock-single-user",adminMidd.checkUser, AuthController.fetchMockSingle); //this one is checkuser
adminRouter.post("/delete-mock", adminMidd.adminUser,AuthController.deleteMock);
adminRouter.post("/delete-selected-mock",adminMidd.adminUser, AuthController.deleteSelectedMock);
adminRouter.post("/download-excel",adminMidd.adminUser, AuthController.downloadMock);
adminRouter.post("/update-mock", adminMidd.adminUser,AuthController.updateMock);
adminRouter.post("/update-mock-user", adminMidd.checkUser,AuthController.updateMock);//this one is checkuser



module.exports = adminRouter;
