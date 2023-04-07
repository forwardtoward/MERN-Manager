const { Workspace } = require("../models/index/index");
const { Board } = require("../models/index/index");
const { Kanban } = require("../models/index/index");

const initTitles = ["Personal", "Business"];
const initBoards = [
  ["TODO", "DO TODAY", "IN PROGRESS", "DONE"],
  ["OPEN", "IN PROGRESS", "UNDER REVIEW", "COMPLETE", "CANCELLED"],
  [],
];

const newTaskBoard = async (data) => {
  return new Promise((resolve, reject) => {
    const { id, title } = data;
    const newBodyData = {
      id: id,
      title: title,
    };
    const newBoard = new Board(newBodyData);
    newBoard.save((err, boardRes) => {
      if (err) {
        console.log("Error: new board additon: ", title);
        reject({
          msg: err.message,
        });
      } else {
        resolve(boardRes._id);
      }
    });
  });
};

exports.newWorkspace = async (req, res) => {
  try {
    const bodyData = req.body;
    console.log(bodyData);
    const newWorkspace = new Workspace(bodyData);
    const workspaceList = await Workspace.find({ title: bodyData.title });
    if (workspaceList.length > 0) {
      const _id = workspaceList[0]._id;
      const updateWorkspace = await Workspace.updateOne({ _id: _id });
      if (updateWorkspace.modifiedCount >= 1) {
        return res.send({ msg: "The old task workspace updated successfully", success: true });
      }
      return res.send({ msg: "not created", success: false });
    } else {
      newWorkspace.save((err, success) => {
        if (err) {
          if (err) {
            return res.status(500).json({
              errors: { common: { msg: err.message } },
            });
          }
        }
        return res.status(201).json({
          success: "Workspace created successfull",
        });
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.getAllWorkspace = async (req, res) => {
  try {
    const { userId } = req.params;
    const workspaceData = await Workspace.find({
      userId: userId,
      isDelete: false,
    });

    let rtnData = [];

    if (workspaceData.length > 0) {
      return res.status(200).send(workspaceData);
    } else {
      let promises = [];
      for (let i = 0; i < initTitles.length; i++) {
        let workspacePromise = new Promise((resolve, reject) => {
          const initialWorkspace = new Workspace({
            userId: userId,
            title: initTitles[i],
            boards: [],
          });

          initialWorkspace.save((err, success) => {
            if (err) {
              reject({
                errors: { msg: err.message },
              });
            } else {
              let boardPromises = [];
              for (let j = 0; j < initBoards[i].length; j++) {
                const boardPromise = new Promise((resolve, reject) => {
                  const callNewBoardData = {
                    id: initBoards[i][j].toLowerCase().split(" ").join("-"),
                    title: initBoards[i][j],
                  };
                  newTaskBoard(callNewBoardData)
                    .then((res) => {
                      resolve(res);
                    })
                    .catch((err) => {
                      reject(err);
                    });
                });
                boardPromises.push(boardPromise);
              }
              Promise.all(boardPromises)
                .then((res) => {
                  console.log("boardPromises--End", res);
                  success.boards = res;
                  success.save((err, updateRes) => {
                    if (err) {
                      console.log("Error: update workspace's board additon: ", boardRes._id);
                      reject({
                        msg: err.message,
                      });
                    } else {
                      console.log("Update workspace id: ", updateRes._id);
                      resolve(updateRes);
                    }
                  });
                })
                .catch((err) => {
                  console.log(err);
                  reject(err);
                });
              resolve(success);
            }
          });
        });
        promises.push(workspacePromise);
      }
      Promise.all(promises)
        .then((res) => {
          console.log("res", res);
          return res.status(200).send(rtnData);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            errors: { common: { msg: err.message } },
          });
        });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.getWorkspace = (req, res) => {
  try {
    const { workspaceId } = req.params;
    console.log("workspaceId", workspaceId);
    Workspace.find({
      _id: workspaceId,
    })
      .populate("boards")
      .exec(async (err, workspaceData) => {
        if (err) {
          return res.status(500).json({
            errors: { common: { msg: err } },
          });
        }
        const workspace = workspaceData[0];
        const boardList = workspace.boards;
        const boardIds = boardList.map((board) => board._id.toString());
        const taskData = await Kanban.find({ isDelete: false });
        const taskList = taskData.filter((task) => boardIds.indexOf(task.boardId.toString()) > -1);
        return res.status(201).json({
          boards: boardList,
          tasks: taskList,
        });
      });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.getCollabrators = async (req, res) => {
  try {
    const workspace = await Workspace.findOne({ _id: id }).populate("value");
    return res.status(201).json({
      success: "Collabrator successfull",
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.shareWorkspace = async (req, res) => {
  try {
    console.log(req.body);
    const { id, assignedTo } = req.body;
    const workspace = await Workspace.find({ _id: id });
    if (!workspace) {
      return res.status(404).json({
        errors: { common: { msg: `No workspace data found by id: ${id}` } },
      });
    }
    workspaceData = workspace[0];
    let tmpArr = workspaceData.collaborators.concat(assignedTo);
    workspaceData.collaborators = tmpArr;
    workspaceData.save((err, success) => {
      if (err) {
        if (err) {
          return res.status(500).json({
            errors: { common: { msg: err } },
          });
        }
      }
      return res.status(201).json({
        success: "Workspace updated successfull",
        data: success,
      });
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.shareRevertWorkspace = async (req, res) => {
  try {
    const { id, member } = req.body;
    const workspace = await Workspace.find({ _id: id });
    if (!workspace) {
      return res.status(404).json({
        errors: { common: { msg: `No workspace data found by id: ${id}` } },
      });
    }
    workspaceData = workspace[0];
    let tmpArr = workspaceData.collaborators.filter((x) => x._id.toString() !== member._id);
    workspaceData.collaborators = tmpArr;
    workspaceData.save((err, success) => {
      if (err) {
        if (err) {
          return res.status(500).json({
            errors: { common: { msg: err } },
          });
        }
      }
      return res.status(201).json({
        success: "Workspace updated successfull",
        data: success,
      });
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.updateWorkspace = async (req, res) => {
  try {
    const { id, title } = req.body;
    const workspace = await Workspace.find({ _id: id });
    if (!workspace) {
      return res.status(404).json({
        errors: { common: { msg: `No workspace data found by id: ${id}` } },
      });
    }
    workspaceData = workspace[0];
    workspaceData.title = title ? title : workspaceData.title;
    workspaceData.save((err, success) => {
      if (err) {
        if (err) {
          return res.status(500).json({
            errors: { common: { msg: err } },
          });
        }
      }
      return res.status(201).json({
        success: "Workspace updated successfull",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.deleteWorkspace = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteWorkspace = await Workspace.updateOne({ _id: _id }, { isDelete: true });
    if (deleteWorkspace.modifiedCount >= 1) {
      return res.send({ msg: "The task workspace deleted successfully", success: true });
    }
    return res.send({ msg: "not deleted", success: false });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};
