
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
    async function uploadFile(file) {
        try {
            let options = {
                path: "/Documents",
                fileName: file.name,
                rangeSize: 1024 * 1024 // must be a multiple of 320 KiB
            };
            const uploadTask = await MicrosoftGraph.OneDriveLargeFileUploadTask.create(graphClient, file, options);
            const response = await uploadTask.upload();
            console.log(`File ${response.name} of ${response.size} bytes uploaded`);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    // Get files in root of user's OneDrive
    async function listFiles() {
        try {
            const response = await graphClient
                .api('/me/drive/root/children')
                .get();
            return response.value;
        } catch (error) {
            console.error(error);
        }
    }