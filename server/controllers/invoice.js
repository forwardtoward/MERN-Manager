const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const GoogleCloudStorage = require("../Utilities/googleCloudStorage");
const { Invoice, Income, ClientContact } = require("../models/index/index");
const { SendMail } = require("../service/sendMail");
const { invoiceEmailTemplate } = require("../constants/emailTemplates");
var moment = require("moment");

exports.createInvoice = asyncHandler(async (req, res) => {
  try {
    let { _id: userId } = req.user;
    userId = mongoose.Types.ObjectId(userId);
    var url = "";
    const { bank, items } = req.body;
    let newObj = Object.assign({}, req.body, { bank: JSON.parse(bank), items: JSON.parse(items) });
    if (req.file) {
      url = await GoogleCloudStorage.upload(req.file);
    }
    //const tax = newObj.tax || 0;
    //const discount = newObj.discount || 0;

    const lastInvoice = await Invoice.findOne({}, {}, { sort: { createdAt: -1 } });
    let no = 1;
    if (lastInvoice) {
      no = (Number(lastInvoice.no) + 1).toString();
    }
    //const subTotal = newObj.items.reduce((total, item) => total + item.quantity * item.rate, 0);
    //let totalAmount = subTotal - subTotal * discount;
    //totalAmount += subTotal * tax;

    let newItems = [];
    for (const item of newObj.items) {
      let i = { ...item, itemId: mongoose.Types.ObjectId(item.itemId) };
      newItems.push(i);
    }

    let status = "DRAFT";
    if (newObj.payNow < newObj.totalAmount - (newObj.discount || 0) + (newObj.tax || 0)) {
      status = "PARTIAL PAYMENT";
    }

    const payload = {
      userId,
      logoUrl: url,
      no,
      ...newObj,
      items: newItems,
      status,
    };

    const data = await Invoice.create(payload);

    return res.status(201).send({ success: true, data: data });
  } catch (error) {
    const user = req.user;
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false, user });
  }
});

exports.getInvoices = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    //  let invoices = await Invoice.find({ userId: _id });
    let invoices = await Invoice.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(_id),
          isDelete: false,
        },
      },
      {
        $lookup: {
          from: "client-contacts",
          let: { customerId: "$customerId" },
          as: "customer",
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$customerId"] } } },
            { $project: { fullName: 1, email: 1, address: 1, contact: 1 } },
          ],
        },
      },
    ]);
    invoices = invoices.map((i) => {
      const paidAmount = i.paidAmount || 0;
      const balance = i.totalAmount > paidAmount ? i.totalAmount - paidAmount : 0;
      // return { ...i.toObject({ versionKey: false }), balance };
      i["balance"] = balance;
      return i;
    });
    return res.status(200).json(invoices);
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getInvoiceById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let invoice;
    invoice = await Invoice.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
          isDelete: false,
        },
      },
      {
        $lookup: {
          from: "client-contacts",
          let: { customerId: "$customerId" },
          as: "customer",
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$customerId"] } } },
            { $project: { fullName: 1, email: 1, address: 1, contact: 1 } },
          ],
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "items.itemId",
          foreignField: "_id",
          as: "products",
        },
      },
      // {
      //   $lookup: {
      //     from: "memberships",
      //     localField: "items.itemId",
      //     foreignField: "_id",
      //     as: "memberships"
      //   }
      // },
      //   {
      //     $addFields: {
      //         data: {
      //             $switch: {
      //                 branches: [
      //                     {
      //                         case: {
      //                             '$eq': [
      //                                 '$itemType', 'products'
      //                             ]
      //                         },
      //                         then: [{

      //                         }]
      //                     },
      //                     {
      //                       case: {
      //                           '$eq': [
      //                               '$itemType', 'memberships'
      //                           ]
      //                       },
      //                       then: [{
      //                         $lookup: {
      //                           from: "memberships",
      //                           localField: "items.itemId",
      //                           foreignField: "_id",
      //                           as: "memberships"
      //                         }
      //                       }]
      //                   }
      //                 ],
      //                 default: '$products'
      //             }
      //         }
      //     }
      // }
    ]);
    if (invoice.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      invoice = invoice[0];
      const paidAmount = invoice.paidAmount || 0;
      const balance = invoice.totalAmount > paidAmount ? invoice.totalAmount - paidAmount : 0;
      invoice = { ...invoice, balance };
      return res.status(200).json(invoice);
    }
    return res.status(404).json({ success: false, msg: "Not found" });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.updateInvoiceById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let payload = req.body;
    let url = "";
    const { bank, companyAddress } = req.body;

    if (req.file) {
      url = await GoogleCloudStorage.upload(req.file);
    }
    const invoice = await Invoice.findOne({ _id: mongoose.Types.ObjectId(id) });
    if (invoice.totalAmount + invoice?.tax - invoice?.discount <= invoice.paidAmount) {
      payload = { ...payload, status: "PAID" };
    } else if (
      invoice.payNow > 0 &&
      invoice.payNow < invoice.totalAmount + invoice?.tax - invoice?.discount
    ) {
      payload = { ...payload, status: "PARTIAL PAYMENT" };
    }
    let newObj = Object.assign({}, payload, {
      bank: JSON.parse(bank),
      companyAddress: JSON.parse(companyAddress),
    });
    payload = {
      ...newObj,
      logoUrl: url,
    };
    await invoice.update(payload);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.addPayment = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let payload = {
      ...req.body,
    };
    if (req.body.totalAmount + req.body?.tax - req.body?.discount <= req.body.paidAmount) {
      payload = { ...payload, status: "PAID" };
    } else if (req.body.payNow > 0) {
      payload = { ...payload, status: "PARTIAL PAYMENT" };
    }
    const data = await Invoice.findByIdAndUpdate(mongoose.Types.ObjectId(id), payload);

    const incomePayload = {
      userId: data.userId,
      clientId: data.customerId,
      amount: data.payments[data.payments.length - 1].amount,
      note: "from invoice #" + data.no,
      date: new Date(),
      invoiceUrl: `https://mymanager.com/invoice-preview/${id}`,
    };
    await Income.create(incomePayload);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.deleteInvoiceById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    // const data = await Invoice.findByIdAndDelete(mongoose.Types.ObjectId(id));
    // if (data !== null) return res.status(200).send({ success: true, msg: "Delete invoice" });
    // return res
    //   .status(404)
    //   .json({ success: false, msg: `Invoice with id ${id} not found hence not deleted` });

    const invoice = await Invoice.findOne({ _id: mongoose.Types.ObjectId(id) });

    await invoice.update({ isDelete: true });
    return res.status(200).json({
      success: true,
      msg: "Delete invoice successfully.",
    });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.sendInvoiceEmail = asyncHandler(async (req, res) => {
  const { email: invoiceOwner } = req.user;
  const { recipient, subject, message, invoiceId } = req.body;
  // need to put custom data for invoice template code

  try {
    const invoice = await Invoice.findOne({ _id: mongoose.Types.ObjectId(invoiceId) });
    const address = `${invoice?.companyAddress.street},${invoice?.companyAddress.city},${invoice?.companyAddress.state},${invoice?.companyAddress.zipCode},${invoice?.companyAddress.country}`;

    const emailBody = invoiceEmailTemplate({
      invoiceNo: invoice.no,
      dueDate: moment(invoice.dueDate).format("MM/DD/YYYY"),
      pay: invoice.payNow,
      message: message === "undefined" ? "" : message,
      address: address.includes("undefined") ? "" : address,
      email: invoiceOwner,
      logo: invoice.logoUrl === "" || invoice.logoUrl === undefined ? null : invoice.logoUrl,
      invoiceId: invoice._id,
      invoiceLink: `https://mymanager.com/invoice-preview/${invoice._id}`,
    });
    const data = await Invoice.findByIdAndUpdate(invoice._id, { status: "SENT" });
    SendMail({
      from: `via MyManager <hello@mymanager.com>`,
      recipient,
      subject: `Invoice #${invoice.no} | ${subject} `,
      body: emailBody,
      replyTo: invoiceOwner,
    });
    return res.status(200).send({ success: true });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.filterInvoice = asyncHandler(async (req, res) => {
  try {
    let filter = req.params.TypeOfDate;
    let dateObj = {};
    switch (filter) {
      case "this-month":
        dateObj = [
          {
            $month: "$createdAt",
          },
          {
            $month: new Date(),
          },
        ];
        break;
      case "this-week":
        dateObj = [
          {
            $week: "$createdAt",
          },
          {
            $week: new Date(),
          },
        ];
        break;
      case "next-month":
        var d = new Date();
        d.setMonth(d.getMonth() + 1, 1);
        nextMonth = new Date(d);

        dateObj = [
          {
            $month: "$createdAt",
          },
          {
            $month: nextMonth,
          },
        ];
        break;
      default:
        throw new Error("No date value found!");
    }
    const { _id } = req.user;
    let invoices = await Invoice.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(_id),
          $expr: {
            $eq: dateObj,
          },
        },
      },
      {
        $lookup: {
          from: "customers",
          let: { customerId: "$customerId" },
          as: "customer",
          pipeline: [{ $project: { fullName: 1, email: 1, address: 1, contact: 1 } }],
        },
      },
    ]);
    invoices = invoices.map((i) => {
      const paidAmount = i.paidAmount || 0;
      const balance = i.totalAmount > paidAmount ? i.totalAmount - paidAmount : 0;
      i["balance"] = balance;
      return i;
    });
    return res.status(200).json(invoices);
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.filterByStatusInvoice = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    let text = req.params.statusType;
    let regex = new RegExp(text, "i");
    let invoices = await Invoice.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(_id),
          $or: [{ status: regex }],
        },
      },
      {
        $lookup: {
          from: "customers",
          let: { customerId: "$customerId" },
          as: "customer",
          pipeline: [{ $project: { fullName: 1, email: 1, address: 1, contact: 1 } }],
        },
      },
    ]);
    invoices = invoices.map((i) => {
      const paidAmount = i.paidAmount || 0;
      const balance = i.totalAmount > paidAmount ? i.totalAmount - paidAmount : 0;
      i["balance"] = balance;
      return i;
    });
    return res.status(200).json(invoices);
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.searchTextInvoice = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    let search = req.query.search;
    let regex = new RegExp(search, "i");
    let invoices = await Invoice.aggregate([
      {
        $lookup: {
          from: "customers",
          let: { customerId: "$customerId" },
          as: "customer",
          pipeline: [{ $project: { fullName: 1, email: 1, address: 1, contact: 1 } }],
        },
      },
      {
        $match: {
          userId: mongoose.Types.ObjectId(_id),
          customer: {
            $elemMatch: {
              $or: [
                {
                  fullName: {
                    $regex: regex,
                    $options: "i",
                  },
                },
                {
                  email: {
                    $regex: regex,
                    $options: "i",
                  },
                },
              ],
            },
          },
        },
      },
    ]);
    invoices = invoices.map((i) => {
      const paidAmount = i.paidAmount || 0;
      const balance = i.totalAmount > paidAmount ? i.totalAmount - paidAmount : 0;
      i["balance"] = balance;
      return i;
    });
    return res.status(200).json(invoices);
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});
