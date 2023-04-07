const { Kanban } = require("../models/index/index");
const { QRCodeLibrary } = require("../models/index/index");
const GoogleCloudStorage = require("../Utilities/googleCloudStorage");

/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable radix */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */

exports.newQRCode = (req, res) => {
  try {
    const bodyData = req.body;
    console.log(bodyData);
    const newQRCode = new QRCodeLibrary(bodyData);
    // eslint-disable-next-line no-unused-vars
    newQRCode.save((err2, success) => {
      if (err2) {
        console.log(err2);
        return res.status(500).json({
          errors: { common: { msg: err2.message } },
        });
      }
      return res.status(201).json({
        success: "New Kanban created successfull",
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.getAllQRCode = (req, res) => {
  try {
    const { userid } = req.params;
    console.log("userid", userid);
    QRCodeLibrary.find({
      isDelete: false,
    }).exec((err, qrcodeData) => {
      return res.status(200).send(qrcodeData);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.getQRCode = (req, res) => {
  try {
    const { qrcodeuuid } = req.params;
    QRCodeLibrary.find({
      uuid: qrcodeuuid,
      isDelete: false,
    }).exec((err, qrcodeData) => {
      return res.status(200).send(qrcodeData[0]);
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.deleteQRCode = async (req, res) => {
  try {
    const { qrcodes } = req.body.source;
    console.log(qrcodes);
    const deleteQRCodes = qrcodes.map(async (qrcode) => {
      console.log(qrcode);
      const updateRes = await QRCodeLibrary.updateMany(
        {
          _id: qrcode._id,
        },
        {
          isDelete: true,
        }
      );
      return updateRes;
    });
    return res.status(200).json({
      msg: {
        comment: "succcessfully deleted",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.updateTaskKanban = async (req, res) => {
  try {
    let url;

    if (req.file) {
      url = await GoogleCloudStorage.upload(req.file);
    }

    const selectedTask = JSON.parse(req.body.selectedTask);
    const data = JSON.parse(req.body.data);

    const { dueDate, labels, description, assignedTo } = req.body;
    const { _id, id, boardId, attachments, comments } = selectedTask;
    const { title } = data;

    const kanbanList = await Kanban.find({ _id });
    const boardList = await Board.find({ _id: boardId });

    const kanban = kanbanList[0];
    const newBoardId = boardList[0]._id;

    if (!kanban) {
      return res.status(404).json({
        errors: { common: { msg: "No kanban data found by id: ", _id } },
      });
    }

    let labelArray = [];
    labelArray = labels.split(",");

    kanban.id = id || kanban.id;
    kanban.title = title || kanban.title;
    kanban.labels = labels ? labelArray : kanban.labels;
    kanban.boardId = newBoardId || kanban.boardId;
    kanban.description =
      description !== "undefined" && description ? description : kanban.description;
    kanban.dueDate = dueDate !== "undefined" && dueDate ? dueDate : kanban.dueDate;
    kanban.attachments = attachments || kanban.attachments;
    kanban.comments = comments || kanban.comments;
    kanban.assignedTo = assignedTo.length ? JSON.parse(assignedTo) : kanban.assignedTo;
    kanban.coverImage = url || kanban.coverImage;

    await kanban.save();

    return res.status(200).json({
      success: "kanbanTask updated successful",
    });
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.updateTaskBoardId = async (req, res) => {
  try {
    const { taskId, newBoardId } = req.body;
    const kanbanList = await Kanban.find({ _id: taskId });
    const boardList = await Board.find({ _id: newBoardId });
    const kanban = kanbanList[0];
    const boardId = boardList[0]._id;
    if (!kanban) {
      return res.status(404).json({
        errors: { common: { msg: "No kanban data found by id: ", taskId } },
      });
    }
    kanban.boardId = boardId || kanban.boardId;
    await kanban.save();
    return res.status(200).json({
      success: "kanbanTask updated successful",
    });
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.reorderTaskKanban = async (req, res) => {
  try {
    const { taskId, targetTaskId } = req.body;
    console.log(taskId, targetTaskId);
    const KanbanData = await Kanban.find({});
    const srcIndex = KanbanData.filter((x) => x._id.toString() === taskId);
    const targetIndex = KanbanData.filter((x) => x._id.toString() === targetTaskId);
    const srcIndexData = srcIndex[0];
    const targetIndexData = targetIndex[0];
    const srcIndexDataInt = srcIndexData.id;
    const targetIndexDataInt = targetIndexData.id;

    console.log(srcIndexDataInt, targetIndexDataInt);
    // Exchange the task id for the reorder option
    if (srcIndexDataInt > targetIndexDataInt) {
      for (let i = srcIndexDataInt - 1; i >= targetIndexDataInt; i--) {
        const momentKanban = KanbanData.filter((x) => x.id === i);
        const momentKanbanData = momentKanban[0];
        const CorrectId = i + 1;
        momentKanbanData.id = CorrectId;
        await momentKanbanData.save();
      }
    } else if (srcIndexDataInt < targetIndexDataInt) {
      for (let i = srcIndexDataInt + 1; i <= targetIndexDataInt; i++) {
        const momentKanban = KanbanData.filter((x) => x.id === i);
        const momentKanbanData = momentKanban[0];
        const CorrectId = i - 1;
        momentKanbanData.id = CorrectId;
        await momentKanbanData.save();
      }
    }
    srcIndexData.id = targetIndexDataInt;
    await srcIndexData.save();
    return res.status(201).json({
      success: "The task kanban recorded successful",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

// Clear the kanban tasks for the selected board by update the isDelete flag to true
exports.clearTasks = async (req, res) => {
  try {
    const { boardId } = req.params;
    const deleteByBoardId = await Kanban.updateMany(
      {
        boardId,
      },
      {
        isDelete: true,
      }
    );
    if (deleteByBoardId.modifiedCount >= 1) {
      return res.status(201).json({
        msg: "The task kanban cleared successfully",
        success: true,
      });
    }
    return res.send({ msg: "not cleared", success: false });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};
