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
adminRouter.post("/create-mock1", AuthController.createMock1);
adminRouter.post("/fetch-mock", AuthController.fetchMock);
adminRouter.post("/fetch-mock-single", AuthController.fetchMockSingle);
adminRouter.post("/delete-mock", AuthController.deleteMock);
adminRouter.post("/delete-selected-mock", AuthController.deleteSelectedMock);
adminRouter.post("/download-excel", AuthController.downloadMock);
adminRouter.post("/update-mock", AuthController.updateMock);



module.exports = adminRouter;
