import mongoose from 'mongoose';
import RefferalRequast from './RefferalRequast';

const requestVerificationSchema = new mongoose.Schema(
    {
        request_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RefferalRequast',
            required: true
        },
        attachment: {
            type: [String],  // This will store an array of photo URLs or file paths
            validate: [arrayLimit, 'Cannot exceed 5 photos'],  // Custom validator for photo count
        },
        verified: {
            type: Boolean,
            default: false,
        },
        remark: {
            type: String,
            default: ""
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// Custom validator for vehiclePhotos array to ensure no more than 10 photos can be stored
function arrayLimit(val) {
    return val.length <= 5;
}


export default mongoose.models.RequestVerification || mongoose.model('RequestVerification', requestVerificationSchema);