const FanMail = require("../../models/FanMail");

// Üzenet elküldése
exports.sendMessage = async (req, res) => {
    try {
        const { username, message } = req.body;

        if (!username || !message) {
            return res.status(400).json({ msg: "Hiányzó mezők" });
        }

        const newMessage = new FanMail({ username, message });
        await newMessage.save();

        res.status(201).json({ msg: "Üzenet elküldve", newMessage });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
};

// Üzenetek lekérése
exports.getMessages = async (req, res) => {
    try {
        const messages = await FanMail.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
};
