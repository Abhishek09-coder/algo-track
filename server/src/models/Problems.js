const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    title : {
        type : String,
        required: [true,"title is required"],
        trim : true,
        minLength: [3, "Title's length should be atleast 3"]
    },
    platform : {
        type : String,
        enum : ['LeetCode', 'GFG', 'CodeStudio', 'Codeforces', 'Other'],
        default : 'Other',
    },
    url : {
        type : String, 
        trim : true
    },
    difficulty : {
        type : String,
        enum : ["Easy","Medium","Hard"],
        default : "easy"
    },
     topics: {
      type: [String],
      default: [],   // VERY IMPORTANT
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    isPublic: {
      type: Boolean,
      default: false, // only admin will create public problems later
    },
    isArchived: {
      type: Boolean,
      default: false, // for soft delete if needed
    },
},
    {
        timestamps : true
    }
)

const Problem = mongoose.model('Problem',problemSchema);
module.exports = Problem;