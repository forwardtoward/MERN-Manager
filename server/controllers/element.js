const mongoose = require("mongoose");

const asyncHandler = require("express-async-handler");

const { Element } = require("../models/index/index");

// @desc Create a New Menu
// @route POST /{prefix}/nlm/menu
// @access Private
// exports.createMenu = asyncHandler(async (req, res) => {
//   const { id, isMainMenu, mainMenuId, title, icon, navLink } = req.body;
//   const { user } = req;

//   // Check if menu already exist
//   const idExist = await MenuData?.findOne({ id });
//   const titleExist = await MenuData?.findOne({ title });

//   if (idExist) {
//     res.status(400);
//     throw new Error("Menu Item with this id already exist!");
//   }
//   if (titleExist) {
//     res.status(400);
//     throw new Error("Menu Item with this Title already exist!");
//   }

//   // Generate Menu Id
//   const menuId = title.toLowerCase().replace(" ", "_");

//   //   Create Menu Item
//   const menu = await MenuData?.create({
//     userId: user._id,
//     id: menuId,
//     isMainMenu,
//     mainMenuId,
//     title,
//     icon,
//     navLink,
//   });

//   if (menu) {
//     res.status(200).json({
//       _id: menu._id,
//       userId: menu.userId,
//       id: menu.id,
//       isMainMenu: menu.isMainMenu,
//       mainMenuId: menu.mainMenuId,
//       title: menu.title,
//       icon: menu.icon,
//       navLink: menu.navLink,
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid given data");
//   }
// });

// @desc Get Admins
// @route GET /{prefix}/nlm/admin
// @access Private
// exports.getMenu = asyncHandler(async (req, res) => {
//   try {
//     const menuData = await MenuData.find();

//     if (menuData) {
//       return res.status(200).json(menuData);
//     }
//   } catch (err) {
//     return res.status(500).json({
//       errors: { common: { msg: err.message } },
//     });
//   }
// });

exports.createElement = asyncHandler(async (req, res) => {
  const payload = req.body;
  const data = await Element.create(payload);
  return res.status(200).json(data);
});

exports.getElement = asyncHandler(async (req, res) => {
  const { organization_id } = req.headers;
  let data = await Element.find({
    // $or: [
    // {
    organizationId: mongoose.Types.ObjectId(organization_id),
    // },
    // {
    //   organizationId: null,
    // },
    // ],
  });
  // const removeOriginal = [];
  // data.forEach((d) => {
  //   if (d.defaultId) {
  //     removeOriginal.push(d.defaultId.toString());
  //   }
  // });
  // data = data.filter((d) => {
  //   if (removeOriginal.indexOf(d._id.toString()) < 0) {
  //     if (d.defaultId !== null) d._id = d.defaultId;
  //     return d;
  //   }
  // });
  return res.status(200).json(data);
});
exports.getElementsByOrgId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    let data = await Element.find({
      organizationId: mongoose.Types.ObjectId(id),
    });

    return res.status(200).json(data);
  } catch {}
});

// exports.createCustomizedElement = asyncHandler(async (req, res) => {
//   const { defaultId } = req.params;
//   const { organization_id } = req.headers;
//   const { title } = req.body;
//   const updated = await Element.findOneAndUpdate(
//     { defaultId, organizationId: organization_id },
//     { title },
//     { new: true }
//   );
//   if (updated) {
//     return res.status(200).send(updated);
//   } else {
//     res.send({ success: false, message: "Element not updated" });
//   }
// });

exports.updateElement = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //const { organization_id } = req.headers;
  const { title } = req.body;
  const updated = await Element.findOneAndUpdate(
    { _id:mongoose.Types.ObjectId(id) },
    { title },
    { new: true }
  );
  if (updated) {
    return res.status(200).send({success:true,data:updated});
  } else {
    res.send({ success: false, message: "Element not updated" });
  }
});

// exports.createCustomizedElement = asyncHandler(async (req, res) => {
//   if (!req.body.defaultId) {
//     return res.status(400).json({ success: false, message: "Default id is required" });
//   }
//   const { organization } = req.user;
//   const payload = req.body;
//   payload.organizationId = organization.id;
//   let data;
//   if (payload.isModified) {
//     data = await Element.findOneAndUpdate(
//       {
//         organizationId: organization.id,
//         defaultId: mongoose.Types.ObjectId(payload.defaultId),
//         isModified: true,
//       },
//       payload,
//       { new: true, runValidators: true }
//     );
//   } else {
//     payload.isModified = true;
//     data = await Element.create(payload);
//   }
//   return res.status(200).json(data);
// });
