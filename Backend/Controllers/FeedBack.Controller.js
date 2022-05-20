const FeedBack = require("../Models/Feedback.Model");

exports.feedBackComment = async (req, res) => {
	try {
		const userCommentid = req.User._id;
		const date = Date.now();

		const feedback = new FeedBack({
			Commentatorid: userCommentid,
			Message: req.body.Message,
			Date: date,
		});

		const saveFeedback = await feedback.save();

		return res.status(200).json({
			message: "Comment added",
			data: saveFeedback,
			statusCode: 200,
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: error.message, statusCode: 400 });
	}
};

exports.getFeedback = async (req, res) => {
	FeedBack.find()
		.then((feedbacks) => {
			return res.status(200).json({
				message: "Feedbacks Retrieved",
				data: feedbacks,
				statusCode: 200,
			});
		})
		.catch((err) => {
			s;
			res.status(500).send({
				message: err.message || "Error",
			});
		});
};
