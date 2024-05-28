const SetModel = require("../model/Setmodel");
const mongoose = require("mongoose");

exports.home = async (req, res) => {
    const messages = req.flash("info");
    const locals = {
        title: "Save Set Th",
        description: "Bord Set"
    };

    let listpage = 12;
    let page = req.query.page || 1;

    try {
        const setCompany = await SetModel.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(listpage * page - listpage)
            .limit(listpage)
            .exec();

        const total = await SetModel.countDocuments({});

        res.render("index", {
            locals,
            setCompany,
            current: page,
            pages: Math.ceil(total / listpage),
            messages,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.addSet = async (req, res) => {
    const locals = {
        title: "Add Set name",
        description: "Buid to set",
    };
    res.render("group/add", locals);
};

exports.postSet = async (req, res) => {
    console.log(req.body);

    const newSet = new SetModel({
        company: req.body.company,
        setname: req.body.setname,
        group: req.body.group,
        Priceaverage: req.body.Priceaverage,
        Profitaverage: req.body.Profitaverage,
        Averagedividend: req.body.Averagedividend,
        margin: req.body.margin,
    });
    try {
        await SetModel.create(newSet);
        req.flash("info", "New set to broad");
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
};

exports.view = async (req, res) => {
    try {
        const setmodel = await SetModel.findOne({ _id: req.params.id });

        const locals = {
            title: 'View Data SetTh',
            description: "View Borad Data list set"
        };

        res.render("group/views", {
            locals,
            setmodel,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.editSet = async (req, res) => {
    try {
        const setmodel = await SetModel.findOne({ _id: req.params.id });

        const locals = {
            title: "Edit DataView",
            description: "Test Edit",
        };

        res.render("group/edit", {
            locals,
            setmodel,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.editPost = async (req, res) => {
    try {
        await SetModel.findByIdAndUpdate(req.params.id, {
            company: req.body.company,
            setname: req.body.setname,
            group: req.body.group,
            Priceaverage: req.body.Priceaverage,
            Profitaverage: req.body.Profitaverage,
            Averagedividend: req.body.Averagedividend,
            margin: req.body.margin,
            updatedAt: Date.now(),
        });

        res.redirect(`/edit/${req.params.id}`);

        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
};

exports.deleteSet = async (req, res) => {
    try {
        await SetModel.deleteOne({ _id: req.params.id });
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
};
