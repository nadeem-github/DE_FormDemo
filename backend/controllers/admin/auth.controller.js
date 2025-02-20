var { User, MockVerify } = require("../../models");
const authService = require("../../services/auth.service");
const { to, ReE, ReS, TE } = require("../../services/util.service");
const { Op, Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const bcrypt_p = require('bcrypt-promise');
const CONFIG = require("../../config/config.json");
const app = require('../../services/app.service');
const config = require('../../config/app.json')[app['env']];
const jwt = require("jsonwebtoken");
const helper = require("../../helpers/fileupload.helper");
const sequelize = new Sequelize('mysql://user:password@localhost:3306/mydb');
const readXlsxFile = require('read-excel-file/node')
const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");


const login = async function (req, res) {
  const body = req.body;
  let checkUser = await User.findOne({
    attributes: [
      'id', 'name', 'email', 'password', 'interprice', 'otp', 'status', 'is_profile_flag',
      [sequelize.fn('CONCAT', 'http://165.232.142.62:8002/storage/images/', sequelize.col('profile_pic')), 'fullurl']
    ],

    where: {
      email: body.email
    }
  });

  if (!checkUser) return ReE(res, { message: "Please enter the registered email address. The user not registered with us" }, 400);

  const result = await bcrypt_p.compare(body.password, checkUser.password)
  if (!result) return ReE(res, { message: "The password you entered is incorrect please try again to login" }, 400);
  const token = jwt.sign({ user_id: checkUser.id, email: checkUser.email }, CONFIG.jwt_encryption, { expiresIn: '365d' });
  return ReS(res, { user: checkUser, token: token });
};
const Register = async function (req, res) {
  try {
    let body = req.body;
    let checkUser = await User.findOne({
      where: {
        email: body.email
      }
    });
    if (checkUser) return ReE(res, { message: "User already exits please login!" }, 400);
    const user = await User.create({
      email: body.email,
      password: body.password,
      is_profile_flag: '0',
    });

    if (user) {
      return ReS(res, { user: user, message: "User Register successfully." }, 200);
    }

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchUser = async function (req, res) {
  try {
    let body = req.body;
    let userId = req.user.id
    const data = await User.findOne({
      attributes: [
        'id', 'email', 'profile_pic', 'interprice', 'otp', 'status', 'is_profile_flag'
        // [sequelize.fn('CONCAT', 'http://165.232.142.62:8002/storage/images/', sequelize.col('profile_pic')), 'fullurl']
      ],
      where: { id: userId }
    });
    if (!data) {
      return ReE(res, { message: "No Data Found" }, 200);
    }
    return ReS(res, { data: data, message: "success" });
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};

const updateRegister = async function (req, res) {

  try {
    const body = req.body;
    const files = req.files;
    let userId = req.user.id
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/profile_pic`;
    let relativePath = "";
    if (files) {
      if (files.profile_pic) {
        const fileName = Date.now() + '-' + files.profile_pic.name;
        relativePath = "profile_pic/" + fileName;
        const fileUpload = await helper.fileUpload(fileName, files.profile_pic, baseFileUploadPath);
        if (!fileUpload) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
    }
    const getUserImage = await User.findOne({
      where: {
        id: userId
      }
    });

    await User.update({
      name: body.name,
      status: body.status,
      interprice: body.interprice,
      is_profile_flag: "1",
      profile_pic: relativePath !== "" ? relativePath : getUserImage.profile_pic,
    },
      {
        where: { id: userId }
      });

    return ReS(res, { message: "User has been updated successfully." }, 200);
  } catch (error) {
    console.log(error);
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }

};
const deleteUser = async function (req, res) {
  try {
    let userId = req.user.id
    const user = await User.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "User has been deleted successfully." }, 200);
    }).catch(function (err) {
      return ReE(res, { message: "Somthing Went Wrong", err: err.errors }, 200);
    });

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
}
const createMock = async function (req, res) {
  try {
    let body = req.body;
    const files = req.files;
    const selectedOptions = req.body['options[]'];
    const zcvalue = parseFloat(body?.zc);
    // const zcvalue = 123123;
    // console.log(typeof(zcvalue))
    // return
    // if (result.length > 0) {
    //   const savedOptions = result[0].options.split(','); // Convert the string back to an array
    //   res.render('edit-form', { savedOptions }); // Render the edit form with saved options
    // } e
    //   <select name="options" multiple>
    //   <option value="Option1" <%= savedOptions.includes('Option1') ? 'selected' : '' %>>Option 1</option>
    //   <option value="Option2" <%= savedOptions.includes('Option2') ? 'selected' : '' %>>Option 2</option>
    //   <option value="Option3" <%= savedOptions.includes('Option3') ? 'selected' : '' %>>Option 3</option>
    //   <option value="Option4" <%= savedOptions.includes('Option4') ? 'selected' : '' %>>Option 4</option>
    // </select>
    const optionsString = Array.isArray(selectedOptions)
      ? selectedOptions.join(',')
      : selectedOptions;
    const ttiawovalue = body.ttiawo === 'true' ? true : false;


    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/users`;
    let relativePathundlf = "";
    let relativePathunp = "";
    let relativePathuncf = "";
    let relativePathuncf1 = "";
    let relativePathuncf2 = "";
    let relativePathunlf = "";
    let relativePathunlf1 = "";
    let relativePathunlf2 = "";
    let relativePathunlf3 = "";

    if (files) {
      if (files.undlf) {
        const fileNameundlf = Date.now() + '-' + files.undlf.name;
        relativePathundlf = "users/" + fileNameundlf;
        const fileUploadundlf = await helper.fileUpload(fileNameundlf, files.undlf, baseFileUploadPath);
        if (!fileUploadundlf) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.unp) {
        const fileNameunp = Date.now() + '-' + files.unp.name;
        relativePathunp = "users/" + fileNameunp;
        const fileUploadunp = await helper.fileUpload(fileNameunp, files.unp, baseFileUploadPath);
        if (!fileUploadunp) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.uncf) {
        const fileNameuncf = Date.now() + '-' + files.uncf.name;
        relativePathuncf = "users/" + fileNameuncf;
        const fileUploaduncf = await helper.fileUpload(fileNameuncf, files.uncf, baseFileUploadPath);
        if (!fileUploaduncf) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.uncf1) {
        const fileNameuncf1 = Date.now() + '-' + files.uncf1.name;
        relativePathuncf1 = "users/" + fileNameuncf1;
        const fileUploaduncf1 = await helper.fileUpload(fileNameuncf1, files.uncf1, baseFileUploadPath);
        if (!fileUploaduncf1) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.uncf2) {
        const fileNameuncf2 = Date.now() + '-' + files.uncf2.name;
        relativePathuncf2 = "users/" + fileNameuncf2;
        const fileUploaduncf2 = await helper.fileUpload(fileNameuncf2, files.uncf2, baseFileUploadPath);
        if (!fileUploaduncf2) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.unlf) {
        const fileNameunlf = Date.now() + '-' + files.unlf.name;
        relativePathunlf = "users/" + fileNameunlf;
        const fileUploadunlf = await helper.fileUpload(fileNameunlf, files.unlf, baseFileUploadPath);
        if (!fileUploadunlf) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.unlf1) {
        const fileNameunlf1 = Date.now() + '-' + files.unlf1.name;
        relativePathunlf1 = "users/" + fileNameunlf1;
        const fileUploadunlf1 = await helper.fileUpload(fileNameunlf1, files.unlf1, baseFileUploadPath);
        if (!fileUploadunlf1) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.unlf2) {
        const fileNameunlf2 = Date.now() + '-' + files.unlf2.name;
        relativePathunlf2 = "users/" + fileNameunlf2;
        const fileUploadunlf2 = await helper.fileUpload(fileNameunlf2, files.unlf2, baseFileUploadPath);
        if (!fileUploadunlf2) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.unlf3) {
        const fileNameunlf3 = Date.now() + '-' + files.unlf3.name;
        relativePathunlf3 = "users/" + fileNameunlf3;
        const fileUploadunlf3 = await helper.fileUpload(fileNameunlf3, files.unlf3, baseFileUploadPath);
        if (!fileUploadunlf3) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
    }
    const data = await MockVerify.create({
      fn: body.fn,
      ln: body.ln,
      a: body.a,
      sol: body.sol,
      ed: body.ed,
      pn: body.pn,
      ssn: body.ssn,
      city: body.city,
      in: body.in,
      ecn: body.ecn,
      pn1: body.pn1,
      state: body.state,
      zc: zcvalue,
      undlf: relativePathundlf,
      ecn1: body.ecn1,
      pn2: body.pn2,
      l: body.l,
      l1: body.l1,
      ttiawo: ttiawovalue,
      bc: body.bc,
      r: body.r,
      sc: body.sc,
      tae: body.tae,
      toc: body.toc,
      ed1: body.ed1,
      sr: body.sr,
      in1: body.in1,
      unp: relativePathunp,
      uncf: relativePathuncf,
      toc1: body.toc1,
      ed2: body.ed2,
      toc2: body.toc2,
      ed3: body.ed3,
      tol: body.tol,
      ed4: body.ed4,
      thoth: body.thoth,
      in2: body.in2,
      in3: body.in3,
      uncf1: relativePathuncf1,
      uncf2: relativePathuncf2,
      unlf: relativePathunlf,
      tol1: body.tol1,
      ed5: body.ed5,
      tol2: body.tol2,
      ed6: body.ed6,
      tol3: body.tol3,
      ed7: body.ed7,
      in4: body.in4,
      in5: body.in5,
      in6: body.in6,
      unlf1: relativePathunlf1,
      unlf2: relativePathunlf2,
      unlf3: relativePathunlf3,
      fvsc: body.fvsc,
      uc: body.uc,
      cc: body.cc,
      tpe: body.tpe,
      vc: body.vc,
      hvsc: body.hvsc,
      rc: body.rc,
      pv: body.pv,
      ev: body.ev,
      btv: body.btv,
      thermal: body.thermal,
      options: optionsString,
      t: body.t,
      t1: body.t1,
      s: body.s,
      in7: body.in7,
      ed8: body.ed8,
      in8: body.in8,
      ed9: body.ed9,
      ev: body.ev,
      bes: body.bes,
      t2: body.t2,
      pn3: body.pn3,
      ed10: body.ed10,
      pn4: body.pn4,
      ed11: body.ed11,
      en9: body.en9,
      ed12: body.ed12,
      c: body.c,
      tae1: body.tae1,
      tolcp: body.tolcp,

    })
    if (data) {
      return ReS(res, { data: data, message: "User Register successfully." }, 200);
    }

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const createMock1 = async function (req, res) {

  try {

    let body = req.body;
    const files = req.files;
    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/users`;
    let relativePathundlf = "";

    if (files) {
      if (files.excelFile) {
        const fileNameundlf = Date.now() + '-' + files.excelFile.name;
        relativePathundlf = "users/" + fileNameundlf;
        const fileUploadundlf = await helper.fileUpload(fileNameundlf, files.excelFile, baseFileUploadPath);
        if (!fileUploadundlf) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
        let headers = {};
        let headerRowIndex = -1;
        await readXlsxFile(`storage/images/${relativePathundlf}`).then((rows) => {
          // Find header row dynamically
          for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
      
            if (row.includes("First Name") && row.includes("Last Name")
              && row.includes("Company") && row.includes("Address") 
            && row.includes("City") && row.includes("State") 
            && row.includes("Zip") && row.includes("Country")
            && row.includes("Phone 1") && row.includes("Phone 2") 
            && row.includes("Email") && row.includes("Website")
            && row.includes("Contact") && row.includes("Certification")) {
              // Found the header row
              headerRowIndex = i;
              row.forEach((col, index) => {
                headers[col.toLowerCase()] = index; // Mapping header name to column index
              });
              break;
            }
          }
          if (headerRowIndex === -1) {
            return ReE(res, { message: "Header row not found" }, 400);
          }
           // Read data rows after the header row
    for (let i = headerRowIndex + 1; i < rows.length; i++) {
      const row = rows[i];

      let orderData = {
        fn: row[headers["first name"]] || "",  // Dynamic column mapping
        ln: row[headers["last name"]] || "",
        a: row[headers["address"]] || "",
        sol: row[headers["phone 1"]] || "",
        city: row[headers["city"]] || "",
        in: row[headers["email"]] || "",
        undlf: row[headers["company"]] || "",
        ecn1: row[headers["website"]] || "",
        s: row[headers["state"]] || "",
        tol1: row[headers["zip"]] || "",
        c: row[headers["country"]] || "",
        ecn: row[headers["phone 2"]] || "",
        state: row[headers["contact"]] || "",
        r: row[headers["certification"]] || "",
      };

      MockVerify.create(orderData);
    }
  });
}

          // below is the old code
    //     await readXlsxFile(`storage/images/${relativePathundlf}`).then((rows) => {
    //       rows.slice(1).forEach(function (number) {
    //         let orderData = {
    //           fn: number[6],
    //           ln: number[7],
    //           a: number[1],
    //           sol: number[2],
    //           city: number[3],
    //           in: number[4],
    //           undlf: number[0],
    //           ecn1: number[5],
    //         }
    //         const data = MockVerify.create(orderData)

    //       });
    //       // each row being an array of cells.
    //     })
    //   }
    }
    // await console.log(relativePathundlf,'reeee') storage\images\users\1737448862404-g.xlsx

    //       return
    return ReS(res, { message: "excel inserted successfully." }, 200);

    // if (data) {
    //   return ReS(res, { data: data, message: "User Register successfully." }, 200);
    // }

  } catch (error) {
    console.log(error)
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchMock = async function (req, res) {
  try {
    const data = await MockVerify.findAll({
      order: [['id', 'DESC']],
    });
    const count = await MockVerify.count();
    if (!data) {
      return ReE(res, { message: "No Data Found" }, 200);
    }
    return ReS(res, { data: data, message: "success", count });
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const fetchMockSingle = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const data = await MockVerify.findOne({
      where: { id: userId }
    });
    if (!data) {
      return ReE(res, { message: "No Data Found" }, 200);
    }
    return ReS(res, { data: data, message: "success" });
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
};
const deleteMock = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const user = await MockVerify.destroy({
      where: { id: userId }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "User has been deleted successfully." }, 200);
    }).catch(function (err) {
      return ReE(res, { message: "Somthing Went Wrong", err: err.errors }, 200);
    });

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
}
const deleteSelectedMock = async function (req, res) {
  try {
    let body = req.body;
    let userId = body.id
    const userIds = body.deleteMultiple;
    const user = await MockVerify.destroy({
      where: { id: { [Op.in]: userIds } }
    }).then(function (result) {
      if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
      return ReS(res, { message: "User has been deleted successfully." }, 200);
    }).catch(function (err) {
      return ReE(res, { message: "Somthing Went Wrong", err: err.errors }, 200);
    });

  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }
}
const updateMock = async function (req, res) {

  try {
    let body = req.body;
    const files = req.files;
    const selectedOptions = req.body['options[]'];
    const zcvalue = parseFloat(body?.zc);
    const optionsString = Array.isArray(selectedOptions)
      ? selectedOptions.join(',')
      : selectedOptions;
    const ttiawovalue = body.ttiawo === 'true' ? true : false;


    const baseFileUploadPath = `${config.IMAGE_RELATIVE_PATH}/users`;
    let relativePathundlf = "";
    let relativePathunp = "";
    let relativePathuncf = "";
    let relativePathuncf1 = "";
    let relativePathuncf2 = "";
    let relativePathunlf = "";
    let relativePathunlf1 = "";
    let relativePathunlf2 = "";
    let relativePathunlf3 = "";

    if (files) {
      if (files.undlf) {
        const fileNameundlf = Date.now() + '-' + files.undlf.name;
        relativePathundlf = "users/" + fileNameundlf;
        const fileUploadundlf = await helper.fileUpload(fileNameundlf, files.undlf, baseFileUploadPath);
        if (!fileUploadundlf) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.unp) {
        const fileNameunp = Date.now() + '-' + files.unp.name;
        relativePathunp = "users/" + fileNameunp;
        const fileUploadunp = await helper.fileUpload(fileNameunp, files.unp, baseFileUploadPath);
        if (!fileUploadunp) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.uncf) {
        const fileNameuncf = Date.now() + '-' + files.uncf.name;
        relativePathuncf = "users/" + fileNameuncf;
        const fileUploaduncf = await helper.fileUpload(fileNameuncf, files.uncf, baseFileUploadPath);
        if (!fileUploaduncf) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.uncf1) {
        const fileNameuncf1 = Date.now() + '-' + files.uncf1.name;
        relativePathuncf1 = "users/" + fileNameuncf1;
        const fileUploaduncf1 = await helper.fileUpload(fileNameuncf1, files.uncf1, baseFileUploadPath);
        if (!fileUploaduncf1) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.uncf2) {
        const fileNameuncf2 = Date.now() + '-' + files.uncf2.name;
        relativePathuncf2 = "users/" + fileNameuncf2;
        const fileUploaduncf2 = await helper.fileUpload(fileNameuncf2, files.uncf2, baseFileUploadPath);
        if (!fileUploaduncf2) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.unlf) {
        const fileNameunlf = Date.now() + '-' + files.unlf.name;
        relativePathunlf = "users/" + fileNameunlf;
        const fileUploadunlf = await helper.fileUpload(fileNameunlf, files.unlf, baseFileUploadPath);
        if (!fileUploadunlf) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.unlf1) {
        const fileNameunlf1 = Date.now() + '-' + files.unlf1.name;
        relativePathunlf1 = "users/" + fileNameunlf1;
        const fileUploadunlf1 = await helper.fileUpload(fileNameunlf1, files.unlf1, baseFileUploadPath);
        if (!fileUploadunlf1) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.unlf2) {
        const fileNameunlf2 = Date.now() + '-' + files.unlf2.name;
        relativePathunlf2 = "users/" + fileNameunlf2;
        const fileUploadunlf2 = await helper.fileUpload(fileNameunlf2, files.unlf2, baseFileUploadPath);
        if (!fileUploadunlf2) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
      if (files.unlf3) {
        const fileNameunlf3 = Date.now() + '-' + files.unlf3.name;
        relativePathunlf3 = "users/" + fileNameunlf3;
        const fileUploadunlf3 = await helper.fileUpload(fileNameunlf3, files.unlf3, baseFileUploadPath);
        if (!fileUploadunlf3) {
          return ReE(res, { message: "Something went wrong" }, 200);
        }
      }
    }

    await MockVerify.update({
      fn: body.fn,
      ln: body.ln,
      a: body.a,
      sol: body.sol,
      ed: body.ed,
      pn: body.pn,
      ssn: body.ssn,
      city: body.city,
      in: body.in,
      ecn: body.ecn,
      pn1: body.pn1,
      state: body.state,
      zc: zcvalue,
      undlf: relativePathundlf,
      ecn1: body.ecn1,
      pn2: body.pn2,
      l: body.l,
      l1: body.l1,
      ttiawo: ttiawovalue,
      bc: body.bc,
      r: body.r,
      sc: body.sc,
      tae: body.tae,
      toc: body.toc,
      ed1: body.ed1,
      sr: body.sr,
      in1: body.in1,
      unp: relativePathunp,
      uncf: relativePathuncf,
      toc1: body.toc1,
      ed2: body.ed2,
      toc2: body.toc2,
      ed3: body.ed3,
      tol: body.tol,
      ed4: body.ed4,
      thoth: body.thoth,
      in2: body.in2,
      in3: body.in3,
      uncf1: relativePathuncf1,
      uncf2: relativePathuncf2,
      unlf: relativePathunlf,
      tol1: body.tol1,
      ed5: body.ed5,
      tol2: body.tol2,
      ed6: body.ed6,
      tol3: body.tol3,
      ed7: body.ed7,
      in4: body.in4,
      in5: body.in5,
      in6: body.in6,
      unlf1: relativePathunlf1,
      unlf2: relativePathunlf2,
      unlf3: relativePathunlf3,
      fvsc: body.fvsc,
      uc: body.uc,
      cc: body.cc,
      tpe: body.tpe,
      vc: body.vc,
      hvsc: body.hvsc,
      rc: body.rc,
      pv: body.pv,
      ev: body.ev,
      btv: body.btv,
      thermal: body.thermal,
      options: optionsString,
      t: body.t,
      t1: body.t1,
      s: body.s,
      in7: body.in7,
      ed8: body.ed8,
      in8: body.in8,
      ed9: body.ed9,
      ev: body.ev,
      bes: body.bes,
      t2: body.t2,
      pn3: body.pn3,
      ed10: body.ed10,
      pn4: body.pn4,
      ed11: body.ed11,
      en9: body.en9,
      ed12: body.ed12,
      c: body.c,
      tae1: body.tae1,
      tolcp: body.tolcp,
    },
      {
        where: { id: body.id }
      });

    return ReS(res, { message: "User has been updated successfully." }, 200);
  } catch (error) {
    return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  }

};

const downloadMock = async function (req, res) {

  try {
    const rows = await MockVerify.findAll({
      attributes: ["fn", "ln", "a", "sol", "city", "in", "undlf", "ecn1"],
    });
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");
    const extractedData = rows.map(row => row.dataValues);

    if (extractedData.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    const headers = ["Company", "Address", "Phone 1", "Phone 2", "Email", "Website", "First Name", "Last Name"]; // Custom header names
    worksheet.addRow(headers);

    // Add data rows
    extractedData.forEach(obj => {
      worksheet.addRow([obj.undlf, obj.a, obj.sol, obj.city, obj.in, obj.ecn1, obj.fn, obj.ln]); // Map data manually
    });
    // Save and send file
    // const fileName = "data.xlsx";
    const timestamp = new Date().toISOString().replace(/[-:.]/g, ""); // Remove special chars
    const fileName = `export_${timestamp}.xlsx`; // Example: export_20250210084500.xlsx
    const filePath = path.join(__dirname, fileName);
    // console.log(filePath);
    await workbook.xlsx.writeFile(filePath);

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(500).json({ message: "Error downloading file" });
      }
      else {
        console.log("File downloaded successfully:", filePath);
        // Optionally delete the file after sending
        setTimeout(() => fs.unlinkSync(filePath), 10000); // Delete after 10 seconds
      }
    });
    // res.json({ filePath, message: "File ready for download" });
    // return ReS(res, { message: "Exported.",filePath }, 200);
  } catch (error) {
    console.error("Error generating Excel file:", error);
    res.status(500).send("Internal Server Error");
  }

};

module.exports = {
  login,
  Register,
  fetchUser,
  updateRegister,
  deleteUser,
  createMock,
  fetchMock,
  fetchMockSingle,
  deleteMock,
  updateMock,
  createMock1,
  deleteSelectedMock,
  downloadMock
};
