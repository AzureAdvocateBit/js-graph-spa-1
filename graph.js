
    // Create an authentication provider
    const authProvider = {
        getAccessToken: async () => {
            // Call getToken in auth.js
            return await getToken();
        }
    };
    // Initialize the Graph client
    const graphClient = MicrosoftGraph.Client.initWithMiddleware({ authProvider });
    //Get user info from Graph
    async function getUser() {
        return await graphClient
            .api('/me')
            .select('id,displayName,mail')
            .get();
    }


    // Upload file to OneDrive
    async function uploadFile(elem) {
        let file = elem.files[0];
        try {
            let response = await largeFileUpload(graphClient, file, file.name);
            console.log(response);
            console.log("File Uploaded Successfully.!!");
            return response;
        } catch (error) {
            console.error(error);
        }
    }
    
    async function largeFileUpload(client, file) {
        try {
            let options = {
                path: "/Documents",
                fileName: file.name,
                rangeSize: 1024 * 1024 // must be a multiple of 320 KiB
            };
            const uploadTask = await MicrosoftGraph.OneDriveLargeFileUploadTask.create(client, file, options);
            const response = await uploadTask.upload();
            return response;
        } catch (err) {
            throw err;
        }
    }