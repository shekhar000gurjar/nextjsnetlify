import mongoose from 'mongoose';

const companiesDetailsSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        company_name: {
            type: String,
            default: '',
            trim: true,
            maxlength: [100, 'Company name cannot be more than 100 characters'],
        },
        company_email: {
            type: String,
            default: '',
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email address',
            ],
        },
        position: {
            type: String,
            required: [true, 'Please provide position'],
            default: '',
            trim: true,
            maxlength: [100, 'Position cannot be more than 100 characters'],
        },
        current_location: {
            type: String,
            default: '',
            trim: true,
            // maxlength: [100, 'Current location cannot be more than 100 characters'],
        },
        last_college: {
            type: String,
            default: '',
            trim: true,
            // maxlength: [100, 'Last college cannot be more than 100 characters'],
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.models.CompaniesDetails || mongoose.model('CompaniesDetails', companiesDetailsSchema);
