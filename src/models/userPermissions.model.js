const mongoose = require("mongoose");

const userPermissionSchema = new mongoose.Schema({
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    permissionId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Permision' }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
}
);

const UserPermission = mongoose.model("UserPermission", userPermissionSchema);

module.exports = UserPermission;
