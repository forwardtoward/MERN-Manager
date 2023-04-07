const User = require("../models/User");
const LivechatSetting = require("../models/LivechatSetting");
const { SendMail } = require("../service/sendMail");

exports.save_livechat_widget_setting = async (req, res) => {
  try {
    const { user } = req;
    const {
      bar,
      theme,
      themeColor,
      align,
      sideSpacing,
      switchValueEmail,
      switchValueWeb,
      switchValuePrivacy,
      bottomSpacing,
      logo,
    } = req.body;

    // Check Email exist or not
    if (user !== "") {
      const livechat_widget_setting = await LivechatSetting.findOne({
        userId: user._id,
      });
      if (livechat_widget_setting) {
        livechat_widget_setting.minimized = bar;
        livechat_widget_setting.theme = theme;
        livechat_widget_setting.themeColor = themeColor;
        livechat_widget_setting.align = align;
        livechat_widget_setting.sideSpacing = sideSpacing;
        livechat_widget_setting.bottomSpacing = bottomSpacing;
        livechat_widget_setting.switchValueEmail = switchValueEmail;
        livechat_widget_setting.switchValueWeb = switchValueWeb;
        livechat_widget_setting.switchValuePrivacy = switchValuePrivacy;
        livechat_widget_setting.logo = logo.url;

        await livechat_widget_setting.save((err, success) => {
          if (err) {
            throw Error(err);
          } else {
            res.status(200).json({ msg: "Successfully Updated" });
          }
        });
      } else {
        const newChatWidgetSetting = new LivechatSetting({
          userId: user._id,
          minimized: bar,
          theme,
          themeColor,
          align,
          sideSpacing,
          switchValueEmail,
          switchValueWeb,
          bottomSpacing,
          logo: logo.url,
        });
        newChatWidgetSetting.save((err, success) => {
          if (err) {
            throw Error(err);
          } else {
            return res.status(201).json({
              success: "Save Livechat setting successfully",
            });
          }
        });
      }
    } else {
      throw Error({ msg: "Not Found" });
    }
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.send_livechat_code = async (req, res) => {
  try {
    const { user } = req;
    const { devs, code } = req.body;
    if (devs.length) {
      devs.map((dev, index) => {
        SendMail({
          recipient: dev,
          from: `admin@mymanager.com`,
          replyTo: `admin@mymanager.com`,
          attachments: {},
          body: `<html>
                
                            <head>
                
                            </head>
                
                            <body style='background-color: #f5f6fb; font-size: 11px;'>
                
                                <div
                                    style='width: 80%; max-width: 500px; background-color: white; margin: auto; padding: 20px; margin-top: 20px; margin-bottom: 20px;'>
                                    <div style='padding:10px; border-bottom: 1px solid #bea1a1;'>
                                        <span style='color: black;'>##-Please accept invitation by visiting that url below this line-##</span>
                                    </div>
                                    <div style='padding: 10px; font-size: 12px;'>
                                    <h5>${
                                      user.fullName + " " + user.lastName
                                    } send you this code for Live chat widget.</h5>
                                        <p style='color: #1b1a1a;'> 
                                            Code is : ${code}
                                            <br>
                                            <br>  
                                        </p>
                                    </div>
                                    <div style='padding: 10px; border-top: 1px solid #bea1a1;'>
                                        <div style='color: black; line-height: 1.7;'>This email is a service from Https://mymanager.com</div>
                                        <div style='color: black;'>Delivered by Mymember</div>
                                    </div>
                                </div>
                            </body>
                
                            </html>`,
        });
      });
    }
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};
exports.set_livechat_widget_setting = async (req, res) => {
  try {
    const {
      userId,
      maximized,
      minimized,
      theme,
      themeColor,
      moreOptions,
      alignTo,
      sideSpacing,
      bottomSpacing,
    } = req.body;
    await User.findByIdAndUpdate(userId, {
      ...req.body,
    });
    const newUser = await User.findById(userId);
    res.json(newUser);
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.get_livechat_widget_setting = async (req, res) => {
  const { userId } = req.params;
  try {
    const livechatSetting = await LivechatSetting.findOne({ userId: userId });
    res.json({
      maximized: livechatSetting.maximized,
      minimized: livechatSetting.minimized,
      theme: livechatSetting.theme,
      themeColor: livechatSetting.themeColor,
      align: livechatSetting.align,
      sideSpacing: livechatSetting.sideSpacing,
      switchValueEmail: livechatSetting.switchValueEmail,
      switchValueWeb: livechatSetting.switchValueWeb,
      bottomSpacing: livechatSetting.bottomSpacing,
      logo: livechatSetting.logo,
    });
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};
