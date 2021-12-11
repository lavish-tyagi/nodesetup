const { Sample } = require("../models/schema/SampleSchema");
class SampleController {

  static save = async (req, res) => {
    try {
      let where = {
        name: req?.body?.name
      }
      if (req?.body?.id) {
        where = {
          id: req?.body?.id
        }
      }
      let checkSample = await Sample.findAll({
        where: where
      });
      if (checkSample && checkSample.length) {
        await Sample.update(req?.body, {
          where: {
            id: checkSample[0].id
          }
        });
      } else {
        await Sample.create(req?.body);
      }
      checkSample = await Sample.findAll({
        where: {
          name: req?.body?.name
        }
      });
      return res.status(200).json({ data: checkSample[0] || null, status: true, message: "Sample created successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ data: null, status: false, message: error || "Error in creating sample." });
    }
  }

  static getAllSample = async (req, res) => {
    try {
      let data = await Sample.findAll()
      return res.status(200).json({ data: data || [], status: true, message: "Samples fetched successfully." });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ data: null, status: false, message: error || error?.data || "Error in fetching sample." });
    }
  }

}

module.exports = SampleController;
