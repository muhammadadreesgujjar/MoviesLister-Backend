const UserPermission = require("../models/userPermissions.model");
const User = require("../models/auth.model");
const Permision = require('../models/permisions.model');

const getAdminPermisions = async (req, res) => {
    try {

        const response = await UserPermission.aggregate(
            [
                {
                    $group: {
                        _id: '$userId',
                        'permission': {
                            $push: '$permissionId'
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'email'
                    }
                },
                {
                    $unwind: '$email'
                },
                {
                    $lookup: {
                        from: 'permisions',
                        localField: 'permission',
                        foreignField: '_id',
                        as: 'permisionDeatials'
                    }
                },
                {
                    $project: {
                        'email': '$email.email',
                        'permisions': '$permisionDeatials.name'
                    }
                }
            ]
        )

        return res.status(200).json({
            status: "success",
            message: "Fecth SuccessFully",
            data: response
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error while saving",
        })
    }
}

const getUserPermisions = async (req, res) => {
    try {

        const email = req.email;
        if (!email) {
            return res.status(400).json({
                status: "error",
                message: "Email is required"
            });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({
                status: "error",
                message: "User not found",
            })
        }

        const response = await aggregate(email);

        return res.status(200).json({
            status: "success",
            message: "Fecth SuccessFully",
            data: response[0]
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error while saving",
        })
    }
}

const updateUserPermisions = async (req, res) => {
    try {
        const { email, permisionType } = req.body;

        let response = null;
        if (!email || !permisionType) {
            return res.status(400).json({
                status: "error",
                message: "Something is mising"
            });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({
                status: "error",
                message: "User not found",
            })
        }

        const permision = await Permision.findOne({ name: permisionType });
        if (!permision) {
            return res.status(401).json({
                status: "error",
                message: "Permision not found",
            })
        }

        const userpermision = await UserPermission.findOne({ userId: user._id, permissionId: permision._id });
        if (!userpermision) {
            const mainPermision = new UserPermission({
                userId: user._id,
                permissionId: permision._id
            });
            await mainPermision.save();
            response = await aggregate(email);
            return res.status(200).json({
                status: "success",
                message: "Save Permision SuccessFully",
                data: response[0]
            });
        }
        await UserPermission.findOneAndDelete(
            { userId: user._id.toString(), permissionId: permision._id.toString() }, { new: true }
        );
        response = await aggregate(email);
        return res.status(200).json({
            status: "success",
            message: "Deleted SuccessFully",
            data: response[0]
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error while saving",
        })
    }
}

module.exports = { getAdminPermisions, getUserPermisions, updateUserPermisions };

async function aggregate(email) {
    return await UserPermission.aggregate(
        [
            {
                $group: {
                    _id: '$userId',
                    'permission': {
                        $push: '$permissionId'
                    }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'email'
                }
            },
            {
                $unwind: '$email'
            },
            {
                $lookup: {
                    from: 'permisions',
                    localField: 'permission',
                    foreignField: '_id',
                    as: 'permisionDeatials'
                }
            },
            {
                $project: {
                    'email': '$email.email',
                    'permisions': '$permisionDeatials.name'
                }
            },
            {
                $match: {
                    'email': email
                }
            }
        ]
    )
}
