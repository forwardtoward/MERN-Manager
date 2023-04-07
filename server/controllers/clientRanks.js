const {
  Progression,
  Contact,
  RankCategory,
  Category,
  ClientRanks,
} = require("../models/index/index");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.addClientsInProgression = async (req, res) => {
  const { clientIds } = req.body;
  const objectIds = clientIds.map((id) => ObjectId(id));
  try {
    const clients = await Contact.find({
      _id: { $in: objectIds },
      isDelete: false,
      userId: req.user._id,
    });
    if (clients) {
      const clientData = clients.map((client) => ({
        clientName: client.fullName,
        clientId: client._id,
        userId: req.user._id,
      }));
      const existingClients = await ClientRanks.find({ clientId: { $in: objectIds } });
      const newClients = clientData.filter(
        (client) =>
          !existingClients.some((existingClient) => existingClient.clientId.equals(client.clientId))
      );

      // Update isprogression field for existing clients
      existingClients.forEach((existingClient) => {
        const clientToUpdate = clientData.find((client) =>
          existingClient.clientId.equals(client.clientId)
        );
        if (clientToUpdate) {
          existingClient.isprogression = true;
          existingClient.save();
        }
      });

      if (newClients.length > 0) {
        await ClientRanks.insertMany(newClients);
        return res.send({
          msg: `Added ${newClients.length} new clients to the into progression and  ${existingClients.length} existing clients added into progression by updated their isprogression Field.`,
          success: true,
        });
      }
      return res.send({
        msg: ` ${existingClients.length} existing clients added into pregression.`,
        success: true,
      });
    }
  } catch (err) {
    return res.send({ error: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.promoteClientRanks = async (req, res) => {
  try {
    const { clientProgressions } = req.body;

    console.log("clientProgressions", clientProgressions);
    const updatedClientRanks = [];

    for (const clientProg of clientProgressions) {
      const { clientId, progressionId, categoryId } = clientProg;
      const progression = await Progression.findOne({
        _id: progressionId,
        isDeleted: false,
        userId: req.user._id,
      });
      if (!progression) {
        console.log(`Progression with Id ${progressionId} does not exist.`);
      }
      const category = await Category.aggregate([
        {
          $match: {
            _id: ObjectId(categoryId),
            isDeleted: false,
            userId: ObjectId(req.user._id),
          },
        },
        {
          $lookup: {
            from: "rankcategories",
            localField: "_id",
            foreignField: "categoryId",
            as: "ranks",
          },
        },
      ]);
      let clientRank = await ClientRanks.findOne({ clientId: clientId, userId: req.user._id });
      console.log("clientRank", { clientId: clientId, userId: req.user._id });
      if (
        clientRank.currentRankName.length === 0 &&
        clientRank.nextRankName.length === 0 &&
        clientRank.lastPromoteRankName.length === 0 &&
        clientRank.ispromoted == false &&
        category[0].ranks.length
      ) {
        clientRank.progressionId = progressionId;
        clientRank.progressionName = progression.progressionName;
        clientRank.categoryId = categoryId;
        clientRank.categoryName = category[0].categoryName;
        clientRank.currentRankName = category[0].ranks[0].rankName;
        clientRank.currentRankOrder = category[0].ranks[0].rankOrder;
        clientRank.currentRankImage = category[0].ranks[0].rankImage;
        if (category[0].ranks.length > 1) {
          clientRank.nextRankName = category[0].ranks[1].rankName;
          clientRank.nextRankOrder = category[0].ranks[1].rankOrder;
          clientRank.nextRankImage = category[0].ranks[1].rankImage;
        }
        clientRank.ispromoted = true;
        clientRank.isprogression = false;
        clientRank = await clientRank.save();
        console.log(`Updated clientRank for clientId ${clientId}.`);
        updatedClientRanks.push(clientRank);
      } else if (
        clientRank.ispromoted == false &&
        category[0].ranks.length &&
        clientRank.currentRankName.length
      ) {
        const ranks = category[0].ranks;
        const obj = {};
        let currRank;
        let nextRank;
        for (let rank in ranks) {
          if (ranks[rank].rankOrder == clientRank.currentRankOrder) {
            obj.lastPromoteRankOrder = ranks[rank].rankOrder;
            obj.lastPromoteRankImage = ranks[rank].rankImage;
            obj.lastPromoteRankName = ranks[rank].rankName;

            currRank = parseInt(rank) + 1;
            nextRank = parseInt(rank) + 2;
          }
        }
        obj.currentRankOrder = ranks[currRank] == undefined ? 0 : ranks[currRank].rankOrder;
        obj.currentRankImage = ranks[currRank] == undefined ? "" : ranks[currRank].rankImage;
        obj.currentRankName = ranks[currRank] == undefined ? "" : ranks[currRank].rankName;
        obj.nextRankOrder = ranks[nextRank] == undefined ? 0 : ranks[nextRank].rankOrder;
        obj.nextRankImage = ranks[nextRank] == undefined ? "" : ranks[nextRank].rankImage;
        obj.nextRankName = ranks[nextRank] == undefined ? "" : ranks[nextRank].rankName;
        obj.isprogression = false;
        obj.ispromoted = true;
        let update = await ClientRanks.updateOne({ _id: ObjectId(clientRank._id) }, { $set: obj });
        if (update.modifiedCount > 0) {
          updatedClientRanks.push(obj);
        }
      } else if (
        (clientRank.ispromoted == false &&
          category[0].ranks.length &&
          clientRank.nextRankName.length === 0) ||
        clientRank.lastPromoteRankName.length
      ) {
        clientRank.progressionId = progressionId;
        clientRank.progressionName = progression.progressionName;
        clientRank.categoryId = categoryId;
        clientRank.categoryName = category[0].categoryName;
        clientRank.currentRankName = category[0].ranks[0].rankName;
        clientRank.currentRankOrder = category[0].ranks[0].rankOrder;
        clientRank.currentRankImage = category[0].ranks[0].rankImage;
        clientRank.lastPromoteRankName = "";
        clientRank.lastPromoteRankOrder = 0;
        clientRank.lastPromoteRankImage = "";
        if (category[0].ranks.length > 1) {
          clientRank.nextRankName = category[0].ranks[1].rankName;
          clientRank.nextRankOrder = category[0].ranks[1].rankOrder;
          clientRank.nextRankImage = category[0].ranks[1].rankImage;
        }
        clientRank.ispromoted = true;
        clientRank.isprogression = false;
        clientRank = await clientRank.save();
        console.log(`Updated clientRank for clientId ${clientId}.`);
        updatedClientRanks.push(clientRank);
      }
    }
    res.status(200).json({ updatedClientRanks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.removePromoted = async (req, res) => {
  const { clientRankId } = req.body;
  try {
    let update = await ClientRanks.updateOne(
      { _id: ObjectId(clientRankId), userId: req.user._id },
      { ispromoted: false }
    );
    if (update.modifiedCount > 0) {
      return res.send({
        msg: "removed from  promoted ",
        success: true,
      });
    }
    return res.send({
      msg: "not removed ",
      success: false,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.notPromotedList = async (req, res) => {
  try {
    let data = await ClientRanks.find({
      userId: req.user._id,
      ispromoted: false,
      isprogression: true,
    });
    if (data) {
      return res.send({
        data: data,
        success: true,
      });
    }
    return res.send({
      msg: "There is not client Ranks in this user",
      success: false,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.promotedList = async (req, res) => {
  try {
    let data = await ClientRanks.find({
      userId: ObjectId(req.user._id),
      ispromoted: true,
      isprogression: false,
    });
    if (data) {
      return res.send({
        data: data,
        success: true,
      });
    }
    return res.send({
      msg: "There is not client Ranks in this user",
      success: false,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
