import Folder from "../models/folder.js"


export const createFile = async (req, res) => {
    try {
        const { parentFolder, fileName } = req.body;                    // their names/titles

        var existingFolders = await Folder.find({ parentFolder })       // if there is no document matches the find method, it will return the all documents
        var parent = existingFolders.find((folder) => folder.folderName == parentFolder)    // parent/root Folder

        if (parent?.folderName !== parentFolder) {                      // if parent/root folder does not exist
            res.status(400).json({ message: 'parent does not exist' })
        }

        // if file is to create in parent/root folder
        const index = parent?.files?.findIndex((file) => fileName == file.fileName)

        let isNameNull = parentFolder?.length == 0 || fileName?.length == 0
        let fileFieldMissing = typeof (fileName) == 'undefined'             // if fileName field does not exist
        let isParentFieldMissing = typeof (parentFolder) == 'undefined'       // if folderName field does not exist
        let isParentHaveSpaces = parentFolder.includes(" ") || fileName.includes(" ")


        if (isNameNull) {                                       // if fileName has not character
            res.status(400).json({ message: 'file name should have atleast 1 character' })
        }
        // else if (isParentHaveSpaces) {                          // if fileName contain spaces
        //     res.status(400).json({ message: 'spaces in file name is not allowed' })
        // }
        else if (isParentFieldMissing) {                        // if parentFolder filed is missing
            res.status(400).json({ message: 'you need to provide parentFolder fielid' })
        }
        else if (fileFieldMissing) {                            // if fileName contain spaces
            res.status(400).json({ message: 'you need to provide fileName field ' })
        }
        else if (index !== -1) {                                // if file already exist
            res.status(400).json({ message: 'file already exist' })
        }
        else {                                              // creating file in root/parent folder
            parent?.files.push({ fileName, icon: fileName.charAt(0) })
            var result = await Folder.findByIdAndUpdate(parent._id, parent, { new: true })
            res.status(200).json({ result, message: 'file created successfully!' })
            console.log('result of createFile - controllers ', result)
        }


    } catch (error) {
        console.log("error in createFile-controllers", error)
        res.status(500).json({ error, message: "error in createFile-controllers" })
    }
}





export const createSubFile = async (req, res) => {
    try {
        const { parentFolder, subParentFolder, fileName } = req.body;  // their names/titles

        var existingFolders = await Folder.find({ parentFolder })       // if there is no document matches the find method, it will return the all documents
        var parent = existingFolders.find((folder) => folder.folderName == parentFolder)    // parent/root Folder

        if (parent?.folderName !== parentFolder) {                      // if parent/root folder does not exist
            res.status(400).json({ message: 'parent does not exist' })
        }

        // if file is to create in sub folder
        else {
            const subParent = parent?.folders?.find((folder) => subParentFolder == folder.folderName)
            const index = subParent?.files?.findIndex((file) => fileName == file.fileName)

            let isNameNull = parentFolder.length == 0 || subParentFolder.length == 0 || fileName.length == 0
            let isFileFieldExist = typeof (fileName) == 'undefined'             // if fileName does not exist
            let isFolderFieldExist = typeof (parentFolder) == 'undefined'       // if folderName does not exist
            let isParentHaveSpaces = parentFolder.includes(" ") || subParentFolder.includes(" ") || fileName.includes(" ")

            if (isNameNull) {                                   // if parentFolder has not character
                res.status(400).json({ message: 'file name should have atleast 1 character' })
            }
            // else if (isParentHaveSpaces) {                        // if fileName contain spaces
            //     res.status(400).json({ message: 'spaces in file name is not allowed' })
            // }
            else if (isFolderFieldExist) {                      // if parentFolder field does not exist
                res.status(400).json({ message: "you need to provide parentFolder field. this is developer's error" })
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
                res.status(200).json({ result, message: 'subFile created successfully!' })
                console.log('result of createSubFile - controllers ', result)
            }
        }

    } catch (error) {
        console.log("error in createSubFile-controllers", error)
        res.status(500).json({ error, message: "error in createSubFile-controllers" })
    }
}





export const updateFile = async (req, res) => {
    try {
        const { parentFolder, fileName } = req.body;                   // parentFolder,subParentFolder are used to reach that particular file to update , and that particular file name will be replaced by the "filenName"
        const { id } = req.params                                       // the id of the file to update


        var existingFolders = await Folder.find({ folderName: parentFolder })       // if there is no document matches the find method, it will return the all documents
        var parent = existingFolders?.find((folder) => folder.folderName == parentFolder)   // rootFolder 

        var isParentFieldMissing = typeof (parentFolder) == 'undefined'         // if folderName does not exist
        var isFileFieldMissing = typeof (fileName) == 'undefined'                     // if fileName does not exist
        var isNameNull = parentFolder?.length == 0 || fileName?.length == 0         // if fileName/parentFolder has no character
        var isParentHaveSpaces = parentFolder?.includes(" ") || fileName?.includes(" ")


        if (isParentFieldMissing) {                             // if fileName contain spaces
            res.status(400).json({ message: 'you need to provide parentFolder field' })
        }
        else if (isFileFieldMissing) {                          // if fileName field does not exist
            res.status(400).json({ message: 'you need to provide fileName field' })
        }
        else if (isNameNull) {                                  // if file/folder have no character
            res.status(400).json({ message: 'file/folder name should have atleast 1 character' })
        }
        // else if (isParentHaveSpaces) {                          // if fileName contain spaces
        //     res.status(400).json({ message: 'spaces in file/folder name is not allowed' })
        // }
        else if (parent?.folderName !== parentFolder) {         // parent does not exist with this "parentFolder" name
            res.status(400).json({ message: 'parent does not exist' })
        }



        var fileToUpdate = parent?.files.filter((file) => JSON.stringify(file._id) == JSON.stringify(id))[0]
        const filesOtherThanFTU = parent?.files.filter((file) => JSON.stringify(file._id) !== JSON.stringify(id)) // removing current folder from existingFolders
        console.log('filetoUpdate', fileToUpdate)
        const index = filesOtherThanFTU?.findIndex((file) => fileName == file.fileName)

        if (typeof (fileToUpdate) == 'undefined') {         // if fileToUpdate is not found
            res.status(400).json({ message: "id is wrong - no file exist with this id in current depth. This is developer's error" })
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

    } catch (error) {
        console.log("error in updateFile-controllers", error)
        res.status(500).json({ error, message: "error in updateFile-controllers" })
    }
}





export const updateSubFile = async (req, res) => {
    try {
        const { parentFolder, subParentFolder, fileName } = req.body;       // parentFolder,subParentFolder are used to reach that particular file to update , and that particular file name will be replaced by the "filenName"
        const { id } = req.params                                           // the id of the file to update

        var existingFolders = await Folder.find({ folderName: parentFolder })       // if there is no document matches the find method, it will return the all documents
        var parent = existingFolders?.find((folder) => folder.folderName == parentFolder)   // rootFolder 

        var isParentFieldMissing = typeof (parentFolder) == 'undefined'               // if folderName does not exist
        var fileFieldMissing = typeof (fileName) == 'undefined'                     // if fileName does not exist


        if (parent?.folderName !== parentFolder) {     // parent does not exist with this "parentFolder" name
            res.status(400).json({ message: 'parent does not exist' })
        }
        // if file is to create in sub folder
        else {
            const subParent = parent?.folders?.find((folder) => subParentFolder == folder.folderName)

            const fileToUpdate = subParent?.files.filter((file) => JSON.stringify(file._id) == JSON.stringify(id))[0]
            const filteredFiles = subParent?.files.filter((file) => JSON.stringify(file._id) !== JSON.stringify(id)) // removing current folder from existingFolders

            const index = filteredFiles?.findIndex((file) => fileName == file.fileName)


            let isNameNull = parentFolder.length == 0 || subParentFolder.length == 0 || fileName.length == 0
            let isParentHaveSpaces = parentFolder.includes(" ") || subParentFolder.includes(" ") || fileName.includes(" ")

            if (isNameNull) {                                   // if parentFolder has not character
                res.status(400).json({ message: 'file/parent/subParent name should have atleast 1 character' })
            }
            // else if (isParentHaveSpaces) {                        // if fileName contain spaces
            //     res.status(400).json({ message: 'spaces in file/parent/subParent name is not allowed' })
            // }
            else if (isParentFieldMissing) {                       // if parentFolder is not exist
                res.status(400).json({ message: 'you need to provide parentFolder field' })
            }
            else if (fileFieldMissing) {                        // if fileName is not exist
                res.status(400).json({ message: 'you need to provide fileName field' })
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
                res.status(200).json({ result, message: 'subFile updated successfully!' })
                console.log('result of updateSubFile - controllers ', result)
            }
        }


    } catch (error) {
        console.log("error in updateSubFile-controllers", error)
        res.status(500).json({ error, message: "error in updateSubFile-controllers" })
    }
}





export const deleteFile = async (req, res) => {
    try {
        const { parentFolder } = req.body;
        const { id } = req.params

        var existingFolders = await Folder.find({ folderName: parentFolder })
        var parent = existingFolders?.find((folder) => folder.folderName == parentFolder)

        var isParentFieldMissing = typeof (parentFolder) == 'undefined'         // if parentFolder does not exist
        var isParentFolderNull = parentFolder?.length == 0                          // if parentFolder has no character
        var isParentHaveSpaces = parentFolder?.includes(" ")                          // if parentFolder have spaces


        if (isParentFieldMissing) {                         // if parentFolder field is not provided
            res.status(400).json({ message: 'you need to provide parentFolder field' })
        }
        else if (isParentFolderNull) {                      // if parentFolder have no character
            res.status(400).json({ message: 'parentFolder name should have atleast 1 character' })
        }
        // else if (isParentHaveSpaces) {                      // if parentFolder contain spaces
        //     res.status(400).json({ message: 'spaces in folder name is not allowed' })
        // }
        else if (parent?.folderName !== parentFolder) {     // if parentfolder does not exist
            res.status(400).json({ message: 'parent does not exist' })
        }

        // deleting file of root folder
        else {
            parent.files = parent.files.filter((file) => JSON.stringify(file._id) !== JSON.stringify(id))
            const result = await Folder.findByIdAndUpdate(parent._id, parent, { new: true })
            res.status(200).json({ result, message: 'file deleted successfully!' })
            console.log('result of deleteFile - controllers ', result)
        }

    } catch (error) {
        console.log("error in deleteFile-controllers", error)
        res.status(500).json({ error, message: "error in deleteFile-controllers" })
    }
}





export const deleteSubFile = async (req, res) => {
    try {
        const { parentFolder, subParentFolder } = req.body;
        const { id } = req.params

        var existingFolders = await Folder.find({ folderName: parentFolder })
        var parent = existingFolders?.find((folder) => folder.folderName == parentFolder)
        const subFolder = parent?.folders.find((folder) => folder.folderName == subParentFolder)

        var isParentFieldMissing = typeof (parentFolder) == 'undefined'             // if parentFolder does not exist
        var isParentFolderNull = parentFolder?.length == 0                              // if parentFolder has no character
        var isParentHaveSpaces = parentFolder?.includes(" ")                            // if parentFolder have spaces
        var isSubParentFieldMissing = typeof (subParentFolder) == 'undefined'           // if parentFolder does not exist
        let isSubParentNull = subParentFolder.length == 0           // if subFolder has no characater
        let isSubParentHaveSpaces = subParentFolder.includes(" ")   // if subFolderName incudes spaces


        if (isParentFieldMissing) {                         // if parentFolder field is not provided
            res.status(400).json({ message: 'you need to provide parentFolder field' })
        }
        else if (isParentFolderNull) {                      // if parentFolder has no character
            res.status(400).json({ message: 'parentFolder name should have atleast 1 character' })
        }
        // else if (isParentHaveSpaces) {                      // if parentFolder contain spaces
        //     res.status(400).json({ message: 'spaces in folder name is not allowed' })
        // }
        else if (parent?.folderName !== parentFolder) {     // if parentfolder is not exist
            res.status(400).json({ message: 'parent does not exist' })
        }
        else if (isSubParentFieldMissing) {                 // if subParentFolder field is not provided
            res.status(400).json({ message: 'you need to provide subParentFolder field' })
        }
        else if (isSubParentNull) {                         // if subParent has no character
            res.status(400).json({ message: 'folder name should have atleast 1 character' })
        }
        // else if (isSubParentHaveSpaces) {                   // if subParent has spaces
        //     res.status(400).json({ message: 'spaces are in folder name not allowed' })
        // }
        if (typeof (subFolder) == 'undefined') {            // if subParent does not exist
            res.status(400).json({ message: 'subParentFolder does not exist' })
        }
        else {
            subFolder.files = subFolder.files.filter((file) => JSON.stringify(file._id) !== JSON.stringify(id))
            var result = await Folder.findByIdAndUpdate(parent._id, parent, { new: true })
            res.status(200).json({ result, message: 'sub File deleted successfully!' })
            console.log('result of deleteFile - controllers ', result)
        }


    } catch (error) {
        console.log("error in deleteSubFile-controllers", error)
        res.status(500).json({ error, message: "error in deleteSubFile-controllers" })
    }
}