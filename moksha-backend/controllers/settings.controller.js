const Settings = require('../models/Settings.model');
const ActivityLog = require('../models/ActivityLog.model');

exports.updateSetting = async (req, res) => {
  try {
    const { key, value, type, section } = req.body;

    let setting = await Settings.findOne({ key });

    if (setting) {
      setting.value = value;
      setting.type = type || setting.type;
      setting.section = section || setting.section;
    } else {
      setting = new Settings({ key, value, type, section });
    }

    await setting.save();

    await ActivityLog.create({
      admin: req.admin._id,
      action: 'UPDATE',
      module: 'Settings',
      documentId: setting._id,
      changes: { key, value }
    });

    res.json({ success: true, data: setting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSetting = async (req, res) => {
  try {
    const setting = await Settings.findOne({ key: req.params.key });
    if (!setting) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: setting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSettingsBySection = async (req, res) => {
  try {
    const settings = await Settings.find({ section: req.params.section });
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllSettings = async (req, res) => {
  try {
    const settings = await Settings.find();
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
