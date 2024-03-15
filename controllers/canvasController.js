const fs = require("fs");
const saveData = async (req, res) => {
    const { id } = req.body;
    const imagePath = `./public/data/exports/${id}.png`;
    const jsonPath = `./public/data/templates/${id}.json`;
    try {
        await fs.promises.writeFile(imagePath, req.files.image.data);
        await fs.promises.writeFile(jsonPath, req.files.json.data);
        return res.status(200).json({ message: "Data saved successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error in saving data" });
    }
};

module.exports = { saveData };
