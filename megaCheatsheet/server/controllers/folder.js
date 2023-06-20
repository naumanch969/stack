import Folder from "../models/folder.js"


export const getAllFolders = async (req, res) => {
    try {
        const result = await Folder.find().sort({ folderName: 1 });

        res.status(200).json({ result })
    } catch (error) {
        console.log("error in getAllFolders-controllers", error)
        res.status(500).json({ error, message: "error in getAllFolders-controllers" })
    }
}





export const createFolder = async (req, res) => {
    try {
        const { folderName } = req.body;  // folderName is name of folder to be created, parentFolder is name of root folder in second case - creating subfolder
        const user = req.userId

        var existingFolders = await Folder.find({ folderName })

        let isNameNull = folderName.length == 0                     // if folderName has no character
        let isFolderFieldExist = typeof (folderName) == 'undefined' // if folderName field does not exist
        let isParentHaveSpaces = folderName.includes(" ")             // if folderName have spaces


        if (isNameNull) {                                   // if folderName has no character
            res.status(400).json({ message: 'folderName should have atleast 1 character' })
        }
        // else if (isParentHaveSpaces) {                        // if folderName have spaces
        //     res.status(400).json({ message: 'spaces in folderName is not allowed' })
        // }
        else if (isFolderFieldExist) {                      // if folderName field does not exist
            res.status(400).json({ message: 'you need to provide folderName field' })
        }
        else if (existingFolders.length > 0) {              // if folder (parent/root) already exist
            res.status(400).json({ message: 'folder already exist' })
        }
        else {                                              // creating parent/root folder
            var result = await Folder.create({ user, folderName })
            res.status(200).json({ result, message: 'folder created successfully!' })
            // console.log('result of createdFolder - controllers ', result)
        }

    } catch (error) {
        console.log("error in createFolder-controllers", error)
        res.status(500).json({ error, message: "error in createFolder-controllers" })
    }
}





export const createSubFolder = async (req, res) => {
    try {
        const { parentFolder, folderName } = req.body;
        // folderName is name of folder to create
        //parentFolder is name of folder in which folder is to be created

        var existingFolders = await Folder.find({ folderName: parentFolder })
        var parent = existingFolders.find((folder) => folder.folderName == parentFolder)        // existingFolders is an array of finded folder, even thogh it contains only object, lekin sirf error se bachne ke liye find method use kr liya h 

        const index = parent?.folders?.findIndex((folder) => folderName == folder.folderName)   // to check if the folder has already exist or not

        let isNameNull = folderName?.length == 0 || parentFolder.length == 0
        let isParentHaveSpaces = folderName.includes(" ") || parentFolder.includes(" ")
        let isFolderFieldExist = typeof (folderName) == 'undefined'


        if (isNameNull) {                                   // if folderName has no character
            res.status(400).json({ message: 'folder should have atleast 1 character' })
        }
        // else if (isParentHaveSpaces) {                        // if folderName contain spaces
        //     res.status(400).json({ message: 'spaces in folderName is not allowed' })
        // }
        else if (isFolderFieldExist) {                      // if folderName field is missing
            res.status(400).json({ message: 'you need to provide folderName field' })
        }
        else if (typeof (index) == 'undefined') {           // if subParentFolder does not exist
            res.status(400).json({ message: 'parent does not exist' })
        }
        else if (index !== -1) {                            // if folder already exist
            res.status(400).json({ message: 'folder already exist' })
        }
        else {                                              // creating folder in another folder
            parent?.folders.push({ folderName, files: [] })
            var result = await Folder.findByIdAndUpdate(parent?._id, parent, { new: true })
            res.status(200).json({ result, message: 'subfolder created successfully!' })
            // console.log('result of createdSubFolder - controllers ', result)
        }

    } catch (error) {
        console.log("error in createSubFolder-controllers", error)
        res.status(500).json({ error, message: "error in createSubFolder-controllers" })
    }
}





export const updateFolder = async (req, res) => {
    try {
        const { folderName: newFolderName } = req.body;     // folderName is name of folder to be updated, parentFolder is name of root folder
        const { id } = req.params                           // id of folder which is to update

        var existingFolders = await Folder.find()       // all root folders
        var parent = await Folder.findById(id)          // root folder

        const filteredFolders = existingFolders.filter((folder) => JSON.stringify(folder?._id) !== JSON.stringify(parent?._id))   // removing current folder from existingFolders
        const index = filteredFolders?.findIndex((folder) => newFolderName == folder.folderName)   //to check if the folderName entered by the user is already taken by another folder

        let isNameNull = newFolderName?.length == 0                // if folderName has no character
        let isNameExist = typeof (newFolderName) == 'undefined'    // if folderName field does not exist
        let isParentHaveSpaces = newFolderName?.includes(" ")        // if folderName has spaces in it


        if (isNameNull) {                   // if folderName has no character
            res.status(400).json({ message: 'folderName should have atleast 1 character' })
        }
        // else if (isParentHaveSpaces) {        // if folderName contain spaces
        //     res.status(400).json({ message: 'spaces in folderName is not allowed' })
        // }
        else if (isNameExist) {             // if folderName contain spaces
            res.status(400).json({ message: 'you need to provide folderName field ' })
        }
        else if (index !== -1) {            // if folderName is the name of another folder 
            res.status(400).json({ message: 'folder with this name already exist' })
        }
        else {                              // creating parent/root folder
            parent.folderName = newFolderName
            var result = await Folder.findByIdAndUpdate(parent._id, parent, { new: true })
            res.status(200).json({ result, message: 'folder updated successfully!' })
            console.log('result of updateFolder - controllers ', result)

        }






    } catch (error) {
        console.log("error in updateFolder-controllers", error)
        res.status(500).json({ error, message: "error in updateFolder-controllers" })
    }
}





export const updateSubFolder = async (req, res) => {
    try {
        const { parentFolder, folderName: newFolderName } = req.body;     // folderName is name of folder to be updated, parentFolder is name of root folder
        const { id } = req.params                           // id of folder which is to update


        var existingFolders = await Folder.find({ folderName: parentFolder })            // array of root folder of name as "parentFolder"
        var parent = existingFolders.find((folder) => folder.folderName == parentFolder) // root folder of name "parentFolder"    
        var subParent = parent?.folders?.find((subFolder) => JSON.stringify(subFolder._id) == JSON.stringify(id))   // subParent/RootFolder which is to update

        const filteredFolders = parent?.folders.filter((subFolder) => subFolder._id !== subParent._id)  // removing subParentFolder from the existing array , this is to check if other folders have the same name as that of entered by the user "subParentFoldre"
        const index = filteredFolders?.findIndex((subFolder) => newFolderName == subFolder.folderName)     // to check if the folder already exist with this name - (same comment as above line)

        let isNameNull = newFolderName.length == 0 || parentFolder.length == 0
        let isParentHaveSpaces = newFolderName.includes(" ") || parentFolder.includes(" ")


        if (isNameNull) {                                   // if folderName has no character
            res.status(400).json({ message: 'folder should have atleast 1 character' })
        }
        // else if (isParentHaveSpaces) {                        // if folderName contain spaces
        //     res.status(400).json({ message: 'spaces in folderName is not allowed' })
        // }
        else if (typeof (index) == 'undefined') {           // if ParentFolder does not exist
            res.status(400).json({ message: 'parent does not exist' })
        }
        else if (index !== -1) {                            // if folder already exist
            res.status(400).json({ message: 'folder already exist' })
        }
        else {                                              // creating folder in another folder
            subParent.folderName = newFolderName
            var result = await Folder.findByIdAndUpdate(parent._id, parent, { new: true })
            res.status(200).json({ result, message: 'SubFolder updated successfully!' })
            console.log('result of updateSubFolder - controllers ', result)
        }



    } catch (error) {
        console.log("error in updateSubFolder-controllers", error)
        res.status(500).json({ error, message: "error in updateSubFolder-controllers" })
    }
}





export const deleteFolder = async (req, res) => {
    try {
        const { id } = req.params               // id of folder to delete

        var result = await Folder.findByIdAndDelete(id)
        res.status(200).json({ result, message: 'folder deleted successfully!' })
        console.log('result of deleteFolder parent - controllers ', result)

    } catch (error) {
        console.log("error in deleteFolder-controllers", error)
        res.status(500).json({ error, message: "error in deleteFolder-controllers" })
    }
}





export const deleteSubFolder = async (req, res) => {
    try {

        const { parentFolder } = req.body;
        const { id } = req.params               // id of folder to delete

        var existingFolders = await Folder.find({ folderName: parentFolder })               // root Folder - its an array
        var parent = existingFolders?.find((folder) => folder.folderName == parentFolder)   // parent root folder                      

        var isParentFolderFieldExist = typeof (parentFolder) == 'undefined'         // is folderName missing or not
        var isParentFolderNull = parentFolder?.length == 0                          // if parentFolder is null
        var isParentFolderHaveSpaces = parentFolder?.includes(" ")                          // if parentFolder includes spaces

        if (isParentFolderFieldExist) {                     // if fileName is not provided
            res.status(400).json({ message: 'you need to provide parentFolder field' })
        }
        else if (isParentFolderNull) {                      // if file/folder have no character
            res.status(400).json({ message: 'folder name should have atleast 1 character' })
        }
        // else if (isParentFolderHaveSpaces) {                        // if fileName contain spaces
        //     res.status(400).json({ message: 'spaces in parentFolder is not allowed' })
        // }
        else if (parent?.folderName !== parentFolder) {     // parentFolder does not exist
            res.status(400).json({ message: 'parent does not exist' })
        }
        else {
            parent.folders = parent.folders.filter((folder) => JSON.stringify(folder._id) !== JSON.stringify(id))
            var result = await Folder.findByIdAndUpdate(parent._id, parent, { new: true })
            res.status(200).json({ result, message: 'folder subDeleted successfully!' })
            console.log('result of deleteSubFolder subFolder - controllers ', result)
        }


    } catch (error) {
        console.log("error in deleteSubFolder-controllers", error)
        res.status(500).json({ error, message: "error in deleteSubFolder-controllers" })
    }
}





export const deleteFolderCollection = async (req, res) => {
    try {
        const result = await Folder.deleteMany();

        res.status(200).json({ result, message: 'whole collection deleted' })
        console.log('result of createdFolder - controllers ', result)

    } catch (error) {
        console.log("error in delete whole collection -controllers", error)
        res.status(500).json({ error, message: "error in deleting whole collection-controllers" })
    }
}