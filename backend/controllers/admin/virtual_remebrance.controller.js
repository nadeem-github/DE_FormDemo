var { VertualRem } = require("../../models");
const { to, ReE, ReS, TE } = require("../../services/util.service");
const { Op, Sequelize } = require("sequelize");
const app = require('../../services/app.service');
const config = require('../../config/app.json')[app['env']];
const fs = require("fs");
const path = require("path");

const createRmembrance = async function (req, res) {
  try {
    let body = req.body;
    let relativePathRemSymbol = "";
    let imagePath = "";
    if (body.symbol === "poppy") {
       imagePath = './storage/images/users/Poppy.png';
    }
    if (body.symbol === "wattle") {
       imagePath = './storage/images/users/Wattle.png';
    }
    if (body.symbol === "rosemary") {
       imagePath = './storage/images/users/Rosemary.png';
    }
    // const imagePath = './storage/images/users/Poppy.png';  familiesofvetera_remembrance_db
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/users`;
    const imageBuffer = fs.readFileSync(imagePath);
    const fileName = Date.now() + 'remebrance.png';
    relativePathRemSymbol = "users/" + fileName;
    const newImagePath = path.join(baseFileUploadPath, fileName);
    fs.writeFileSync(newImagePath, imageBuffer);



    const data = await VertualRem.create({
      first_name:body.first_name,
      last_name:body.last_name,
      email:body.email,
      tribute_memory:body.tribute_memory,
      tribute_message:body.tribute_message,
      regiment:body.regiment,
      rem_symbol: relativePathRemSymbol,
    })
    if (data) {
      return ReS(res, { message: "success." }, 200);
    }

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};

const fetchRmembrance = async function (req, res) {
  try {
    const data = await VertualRem.findAll({
      attributes: [
         'first_name', 'last_name', 'email', 'tribute_memory', 'tribute_message', 'regiment', 'rem_symbol',
      ],
      order: [['id', 'DESC']],
    });
    if (!data) {
      return ReE(res, { message: "No Data Found" }, 200);
    }
    return ReS(res, { data: data, message: "success"});
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};


module.exports = {
  createRmembrance,
  fetchRmembrance,
};
