const { ContactType } = require("../models/index/index");
const asyncHandler = require("express-async-handler");

const initialContactTypes = [
  {
    name: "Clients",
    icon: "mark",
    userType: "normal",
  },
  {
    name: "Employee",
    icon: "mark",
    userType: "normal",
  },
  {
    name: "Lead",
    icon: "mark",
    userType: "normal",
  },
  {
    name: "Relationships",
    icon: "mark",
    userType: "normal",
  },
  {
    name: "Vendor",
    icon: "mark",
    userType: "normal",
  },
  {
    name: "Members",
    icon: "mark",
    userType: "normal",
  },
];

/**
 * Method to add contact-type
 * @method  POST
 * @param   {Object} data  Object of the contact-type
 * @return  {JSON}         status message
 */
exports.addContactType = async (req, res) => {
  const userId = req.user._id;
  const { organization_id } = req.headers;
  const data = req.body;
  const payload = {
    userid: userId,
    organizationId: organization_id ? organization_id : null,
    ...data,
  };
  let ContactTypeObj = new ContactType(payload);
  ContactTypeObj.save((err, data) => {
    if (err) {
      return res.status(400).json({
        status: false,
        message: "error",
        error: err,
      });
    }
    res.send({ status: true, message: "success", data: data });
  });
};

/**
 * Method to get contact-type by userId
 * @method  GET
 * @return  status message
 */
exports.getContactTypeByUserId = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { organization_id } = req.headers;

  try {
    if (organization_id) {
      // ** Code for users who belongs to organization.
      // Do your code here
    } else {
      const contactType = await ContactType.find({
        userType: "normal",
        isDelete: false,
      });
      if (contactType.length > 0) {
        return res.status(200).json(contactType);
      } else {
        let promises = [];
        for (let i = 0; i < initialContactTypes.length; i++) {
          let newContactTypePromise = new Promise((resolve, reject) => {
            let { name, icon, userType } = initialContactTypes[i];
            const initialContactType = new ContactType({
              userId,
              name,
              icon,
              userType,
            });
            initialContactType.save((err, success) => {
              if (err) {
                reject({
                  errors: { msg: err.message },
                });
              } else {
                resolve(success);
              }
            });
          });
          promises.push(newContactTypePromise);
        }
        Promise.all(promises)
          .then((resAll) => {
            return res.status(200).send(resAll);
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({
              errors: {
                common: { msg: err.message },
              },
            });
          });
      }
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message.replace(/"/g, ""),
    });
  }
});

exports.getContactTypeByOrgId = asyncHandler(async (req, res) => {
  const { organization_id } = req.headers;
  try {
    const contactType = await ContactType.find({
      organizationId: organization_id,
    });
    return res.status(200).json(contactType);
  } catch (error) {
    return res.send({
      success: false,
      message: error.message.replace(/"/g, ""),
    });
  }
});

/**
 * Method to get contact-type
 * @method  POST
 * @param   {String}  name  contact-type name
 * @param   {String}  icon  contact-type icon
 * @param   {String}  creatorType  the type of creator
 * @return  {JSON}  status message
 */
exports.updateContactTypeById = asyncHandler(async (req, res) => {
  //   await ContactType.find().populate("userid").
  // const userId = req.user._id;
  const { _id } = req.body;

  try {
    const contactType = await ContactType.find({ _id });
    const { name, icon, creatorType } = data;
    originalContactType = contactType[0];

    originalContactType.name = name ? name : originalContactType.name;
    originalContactType.icon = icon ? icon : originalContactType.icon;
    originalContactType.creatorType = creatorType ? creatorType : originalContactType.creatorType;
    originalContactType.save((err, data) => {
      if (err) {
        return res.status(400).json({
          status: false,
          message: "error",
          error: err,
        });
      }
      res.send({
        status: true,
        message: "success",
        data: data,
      });
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message.replace(/"/g, ""),
    });
  }
});

/**
 * Method to get contact-type
 * @method  POST
 * @param   {ObjectId}  id  the type of creator
 * @return  {JSON}  status message
 */
exports.delContactType = async (req, res) => {
  try {
    await ContactType.deleteOne({
      _id: req.params.id,
    });
    res.send({
      msg: "ContactType deleted succesfully",
      success: true,
    });
  } catch (err) {
    res.send({
      msg: err.message.replace(/\"/g, ""),
      success: false,
    });
  }
};
