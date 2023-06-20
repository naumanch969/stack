import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        text: {
            type: String,
            default: ''
        },
        selected: {
            type: [{
                start: Number,
                end: Number,
                styles: [{
                    type: String,
                    enum: ['bold','italic','underline','strikethrough','subscript','superscript','justifyLeft','justifyCenter','justifyRight','justifyFull','insertOrderedList','insertUnorderedList','insertHorizontalRule','backColor','foreColor','fontName','fontSize']
            }]
            }],
            default: []
        }
    },
    images: {
        type: Array, // array of urls
        default: []
    },
    tags: {
        type: [{
            name: {        //  containing the name of the user being tagged
                type: String,
            },
            user: {        // (if type is "user"), referencing a User model
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
        }],
        default: []
    },
    hashTags: {
        type: [String],
        default: []
    },
    likes: [{       // An array of mongoose.Schema.Types.ObjectId - referencing User models
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    styles: {
        type: Object,
    },
    comments: {
        type: [{
            user: {     // mongoose.Schema.Types.ObjectId - referencing a User model
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            content: {
                type: String,
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }]
    },
    shares: {
        type: [{
            from: {     // the user who share the post
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            to: {     // the user whom the post is shared
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            
          createdAT  : {
                type: Date,
                default: Date.now
            }
        }],
        default: []
    },
    visibility: {
        type: String,
        enum: [
            'private',
            'public',
            'friends only',
            'all friends except',
            'only share with',
        ],
        default: 'public'
    },
},{timestamps:true});

const Post = mongoose.model('Post',
    postSchema);

export default Post



// location: {  // location from where user is being posting
//     type: {
//         type: String,
//     },
//     // indicating the type of location ("city" or "country")
//     name: {
//         type: String,
//     },
//     //  indicating the type of location ("city" or "country")
//     coordinates: {
//         lat: {
//             type: Number,
//         },
//         //  containing the latitude of the location
//         lng: {
//             type: Number,
//         }
//         // containing the longitude of the location
//     }
// }
