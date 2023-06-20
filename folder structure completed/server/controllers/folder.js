import Folder from "../models/folder.js"


export const getAllFolders = async (req, res) => {
    try {
        const result = await Folder.find().sort({ folderName: 1 });

        res.status(200).json({ result })
        // console.log('result of getAllFolders - controllers ', result)
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
        let isNameHaveSpaces = folderName.includes(" ")             // if folderName have spaces


        if (isNameNull) {                                   // if folderName has no character
            res.status(400).json({ message: 'folderName should have atleast 1 character' })
        }
        else if (isNameHaveSpaces) {                        // if folderName have spaces
            res.status(400).json({ message: 'spaces in folderName is not allowed' })
        }
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
        let isNameHaveSpaces = folderName.includes(" ") || parentFolder.includes(" ")
        let isFolderFieldExist = typeof (folderName) == 'undefined'


        if (isNameNull) {                                   // if folderName has no character
            res.status(400).json({ message: 'folder should have atleast 1 character' })
        }
        else if (isNameHaveSpaces) {                        // if folderName contain spaces
            res.status(400).json({ message: 'spaces in folderName is not allowed' })
        }
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
        console.log("error in createFolder-controllers", error)
        res.status(500).json({ error, message: "error in createFolder-controllers" })
    }
}







export const createFile = async (req, res) => {
    try {
        const { parentFolder, subParentFolder, fileName } = req.body;  // their names/titles

        const isParent = typeof (subParentFolder) == 'undefined'

        var existingFolders = await Folder.find({ parentFolder })       // if there is no document matches the find method, it will return the all documents
        var parent = existingFolders.find((folder) => folder.folderName == parentFolder)    // parent/root Folder

        if (parent?.folderName !== parentFolder) {                      // if parent/root folder does not exist
            res.status(400).json({ message: 'parent does not exist' })
        }

        // if file is to create in parent/root folder
        else if (isParent) {
            const index = parent?.files?.findIndex((file) => fileName == file.fileName)

            let isNameNull = parentFolder.length == 0 || fileName.length == 0
            let isFileFieldExist = typeof (fileName) == 'undefined'             // if fileName field does not exist
            let isFolderFieldExist = typeof (parentFolder) == 'undefined'       // if folderName field does not exist
            let isNameHaveSpaces = parentFolder.includes(" ") || fileName.includes(" ")


            if (isNameNull) {                                   // if fileName has not character
                res.status(400).json({ message: 'file/folder name should have atleast 1 character' })
            }
            else if (isNameHaveSpaces) {                        // if fileName contain spaces
                res.status(400).json({ message: 'spaces in file/folder name is not allowed' })
            }
            else if (isFolderFieldExist) {                      // if parentFolder filed is missing
                res.status(400).json({ message: 'you need to provide folderName (parentFolder)' })
            }
            else if (isFileFieldExist) {                        // if fileName contain spaces
                res.status(400).json({ message: 'you need to provide fileName field ' })
            }
            else if (index !== -1) {                            // if file already exist
                res.status(400).json({ message: 'file already exist' })
            }
            else {                                              // creating file in root/parent folder
                parent?.files.push({ fileName, icon: fileName.charAt(0) })
                var result = await Folder.findByIdAndUpdate(parent._id, parent, { new: true })
                res.status(200).json({ result, message: 'file created successfully!' })
                console.log('result of createFile - controllers ', result)
            }
        }

        // if file is to create in sub folder
        else {
            const subParent = parent?.folders?.find((folder) => subParentFolder == folder.folderName)
            const index = subParent?.files?.findIndex((file) => fileName == file.fileName)

            let isNameNull = parentFolder.length == 0 || subParentFolder.length == 0 || fileName.length == 0
            let isFileFieldExist = typeof (fileName) == 'undefined'             // if fileName does not exist
            let isFolderFieldExist = typeof (parentFolder) == 'undefined'       // if folderName does not exist
            let isNameHaveSpaces = parentFolder.includes(" ") || subParentFolder.includes(" ") || fileName.includes(" ")

            if (isNameNull) {                                   // if parentFolder has not character
                res.status(400).json({ message: 'file/folder name should have atleast 1 character' })
            }
            else if (isNameHaveSpaces) {                        // if fileName contain spaces
                res.status(400).json({ message: 'spaces in file/folder name is not allowed' })
            }
            else if (isFolderFieldExist) {                      // if parentFolder field does not exist
                res.status(400).json({ message: 'you need to provide parentFolder field' })
            }
            else if (isFileFieldExist) {                        // if fileName field is does not exist
                res.status(400).json({ message: 'you need to provide fileName field' })
            }
            else if (typeof (index) == 'undefined') {           // if subParentFolder does not exist
                res.status(400).json({ message: 'subParentFolder does not exist' })
            }
            else if (index !== -1) {                            // if file is already exist
                res.status(400).json({ message: 'file with this name already exist' })
            }
            else {                                              // creating file in subFolder
                subParent?.files.push({ fileName, icon: fileName.charAt(0) })
                var result = await Folder.findByIdAndUpdate(parent._id, parent, { new: true })
                res.status(200).json({ result, message: 'file created successfully!' })
                console.log('result of createFile - controllers ', result)
            }
        }

    } catch (error) {
        console.log("error in createFile-controllers", error)
        res.status(500).json({ error, message: "error in createFile-controllers" })
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
        let isNameHaveSpaces = newFolderName?.includes(" ")        // if folderName has spaces in it


        if (isNameNull) {                   // if folderName has no character
            res.status(400).json({ message: 'folderName should have atleast 1 character' })
        }
        else if (isNameHaveSpaces) {        // if folderName contain spaces
            res.status(400).json({ message: 'spaces in folderName is not allowed' })
        }
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
        let isNameHaveSpaces = newFolderName.includes(" ") || parentFolder.includes(" ")


        if (isNameNull) {                                   // if folderName has no character
            res.status(400).json({ message: 'folder should have atleast 1 character' })
        }
        else if (isNameHaveSpaces) {                        // if folderName contain spaces
            res.status(400).json({ message: 'spaces in folderName is not allowed' })
        }
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





export const updateFile = async (req, res) => {
    try {
        const { parentFolder, subParentFolder, fileName } = req.body;   // parentFolder,subParentFolder are used to reach that particular file to update , and that particular file name will be replaced by the "filenName"
        const { id } = req.params                                       // the id of the file to update

        const isParent = typeof (subParentFolder) == 'undefined'

        var existingFolders = await Folder.find({ folderName: parentFolder })       // if there is no document matches the find method, it will return the all documents
        var parent = existingFolders?.find((folder) => folder.folderName == parentFolder)   // rootFolder 

        var isParentFolderFieldExist = typeof (parentFolder) == 'undefined'         // if folderName does not exist
        var isFileFieldExist = typeof (fileName) == 'undefined'                     // if fileName does not exist
        var isNameNull = parentFolder?.length == 0 || fileName?.length == 0         // if fileName/parentFolder has no character
        var isNameHaveSpaces = parentFolder?.includes(" ") || fileName?.includes(" ")


        if (isParentFolderFieldExist) {                     // if fileName contain spaces
            res.status(400).json({ message: 'you need to provide parentFolder field' })
        }
        else if (isNameNull) {                              // if file/folder have no character
            res.status(400).json({ message: 'file/folder name should have atleast 1 character' })
        }
        else if (isNameHaveSpaces) {                        // if fileName contain spaces
            res.status(400).json({ message: 'spaces in file/folder name is not allowed' })
        }
        else if (isFileFieldExist) {                        // if fileName field does not exist
            res.status(400).json({ message: 'you need to provide fileName field' })
        }
        else if (parent?.folderName !== parentFolder) {     // parent does not exist with this "parentFolder" name
            res.status(400).json({ message: 'parent does not exist' })
        }


        // if file is to create in parent/root folder
        else if (isParent) {

            const fileToUpdate = parent?.files.filter((file) => JSON.stringify(file._id) == JSON.stringify(id))[0]
            const filteredFiles = parent?.files.filter((file) => JSON.stringify(file._id) !== JSON.stringify(id)) // removing current folder from existingFolders

            const index = filteredFiles?.findIndex((file) => fileName == file.fileName)

            if (typeof (fileToUpdate) == 'undefined') {         // if fileToUpdate is not found
                res.status(400).json({ message: 'id is wrong - no file exist with this id in current depth' })
            }
            else if (index !== -1) {                            // if file already exist with this name (fileName)
                res.status(400).json({ message: 'file already exist' })
            }
            else {                                              // creating file in root/parent folder
                fileToUpdate.fileName = fileName
                var result = await Folder.findByIdAndUpdate(parent._id, parent, { new: true })
                res.status(200).json({ result, message: 'file updated successfully!' })
                console.log('result of updateFile - controllers ', result)
            }
        }


        // if file is to create in sub folder
        else {
            const subParent = parent?.folders?.find((folder) => subParentFolder == folder.folderName)

            const fileToUpdate = subParent?.files.filter((file) => JSON.stringify(file._id) == JSON.stringify(id))[0]
            const filteredFiles = subParent?.files.filter((file) => JSON.stringify(file._id) !== JSON.stringify(id)) // removing current folder from existingFolders

            const index = filteredFiles?.findIndex((file) => fileName == file.fileName)


            let isNameNull = parentFolder.length == 0 || subParentFolder.length == 0 || fileName.length == 0
            let isNameHaveSpaces = parentFolder.includes(" ") || subParentFolder.includes(" ") || fileName.includes(" ")

            if (isNameNull) {                                   // if parentFolder has not character
                res.status(400).json({ message: 'file/folder name should have atleast 1 character' })
            }
            else if (isNameHaveSpaces) {                        // if fileName contain spaces
                res.status(400).json({ message: 'spaces in file/folder name is not allowed' })
            }
            else if (typeof (index) == 'undefined') {           // if subParentFolder does not exist
                res.status(400).json({ message: 'subParentFolder does not exist' })
            }
            else if (index !== -1) {                            // if file is already exist
                res.status(400).json({ message: 'file with this name already exist' })
            }
            else {                                              // creating file in subFolder
                fileToUpdate.fileName = fileName
                var result = await Folder.findByIdAndUpdate(parent._id, parent, { new: true })
                res.status(200).json({ result, message: 'file updated successfully!' })
                console.log('result of updateFile - controllers ', result)
            }
        }


    } catch (error) {
        console.log("error in updateFile-controllers", error)
        res.status(500).json({ error, message: "error in updateFile-controllers" })
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

        if (isParentFolderFieldExist) {                     // if fileName contain spaces
            res.status(400).json({ message: 'you need to provide parentFolder field' })
        }
        else if (isParentFolderNull) {                      // if file/folder have no character
            res.status(400).json({ message: 'folder name should have atleast 1 character' })
        }
        else if (isParentFolderHaveSpaces) {                        // if fileName contain spaces
            res.status(400).json({ message: 'spaces in parentFolder is not allowed' })
        }
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
        console.log("error in deleteFolder-controllers", error)
        res.status(500).json({ error, message: "error in deleteFolder-controllers" })
    }
}





export const deleteFile = async (req, res) => {
    try {
        const { parentFolder, subParentFolder } = req.body;
        const { id } = req.params
        const isParent = typeof (subParentFolder) == 'undefined'

        var existingFolders = await Folder.find({ folderName: parentFolder })
        var parent = existingFolders?.find((folder) => folder.folderName == parentFolder)

        var isParentFolderFieldExist = typeof (parentFolder) == 'undefined'         // if parentFolder does not exist
        var isParentFolderNull = parentFolder?.length == 0                          // if parentFolder has no character
        var isNameHaveSpaces = parentFolder?.includes(" ")                          // if parentFolder have spaces


        if (isParentFolderFieldExist) {                     // if fileName contain spaces
            res.status(400).json({ message: 'you need to provide parentFolder field' })
        }
        else if (isParentFolderNull) {                      // if file/folder have no character
            res.status(400).json({ message: 'folder name should have atleast 1 character' })
        }
        else if (isNameHaveSpaces) {                        // if fileName contain spaces
            res.status(400).json({ message: 'spaces in folder name is not allowed' })
        }
        else if (parent?.folderName !== parentFolder) {     // if parentfolder does not exist
            res.status(400).json({ message: 'parent does not exist' })
        }

        // deleting file of root folder
        else if (isParent) {
            parent.files = parent.files.filter((file) => JSON.stringify(file._id) !== JSON.stringify(id))
            const result = await Folder.findByIdAndUpdate(parent._id, parent, { new: true })
            res.status(200).json({ result, message: 'file deleted successfully!' })
            console.log('result of deleteFile - controllers ', result)
        }

        // deleting file of subfolder
        else {
            const subFolder = parent.folders.find((folder) => folder.folderName == subParentFolder)

            let isSubParentNull = subParentFolder.length == 0           // if subFolder has no characater
            let isSubParentHaveSpaces = subParentFolder.includes(" ")   // if subFolderName incudes spaces

            if (isSubParentNull) {                          //if subParent has no character
                res.status(400).json({ message: 'folder name should have atleast 1 character' })
            }
            else if (isSubParentHaveSpaces) {               // if subParent has spaces
                res.status(400).json({ message: 'spaces are in folder name not allowed' })
            }
            else if (typeof (subFolder) == 'undefined') {   // if subParent does not exist
                res.status(400).json({ message: 'subParentFolder does not exist' })
            }
            else {                                          // deleting file of subFolder
                subFolder.files = subFolder.files.filter((file) => JSON.stringify(file._id) !== JSON.stringify(id))
                var result = await Folder.findByIdAndUpdate(parent._id, parent, { new: true })
                res.status(200).json({ result, message: 'file deleted successfully!' })
                console.log('result of deleteFile - controllers ', result)
            }
        }



    } catch (error) {
        console.log("error in deleteFile-controllers", error)
        res.status(500).json({ error, message: "error in deleteFile-controllers" })
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